import nodemailer from "nodemailer";
import { validateContact, type ContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;

/** Limit na IP w pamieci procesu — wystarcza dla pojedynczego kontenera; przy wielu instancjach trzeba wspolnego magazynu. */
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string, now: number): boolean {
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }
  requestLog.set(ip, [...recent, now]);
  return false;
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Usuwa znaki nowej linii, zeby wartosc z formularza nie trafila do naglowka maila jako nowy naglowek. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

interface MailConfig {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly pass: string;
  readonly to: string;
  readonly from: string;
}

function readMailConfig(): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    return null;
  }
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: CONTACT_TO,
    from: CONTACT_FROM || SMTP_USER,
  };
}

function buildMail(config: MailConfig, data: ContactPayload) {
  const subject = `Zapytanie ze strony: ${data.topic} — ${singleLine(data.name)}`;
  const text = [
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    `Temat: ${data.topic}`,
    "",
    data.message,
  ].join("\n");
  const html = `
    <p><strong>Imię i nazwisko:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Temat:</strong> ${escapeHtml(data.topic)}</p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  return {
    from: config.from,
    to: config.to,
    replyTo: { name: singleLine(data.name), address: data.email },
    subject,
    text,
    html,
  };
}

function json(body: { ok: boolean; error?: string }, status: number): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request): Promise<Response> {
  if (isRateLimited(clientIp(request), Date.now())) {
    return json({ ok: false, error: "Zbyt wiele prób. Spróbuj ponownie za kilka minut." }, 429);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Wiadomość jest zbyt długa." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, error: "Nieprawidłowe dane formularza." }, 400);
  }

  // Pole-pulapka: ludzie go nie widza, boty wypelniaja. Odpowiadamy sukcesem, zeby nie uczyc bota.
  if (typeof payload === "object" && payload !== null && "website" in payload) {
    const trap = (payload as Record<string, unknown>).website;
    if (typeof trap === "string" && trap.length > 0) {
      return json({ ok: true }, 200);
    }
  }

  const validation = validateContact(payload);
  if (!validation.ok) {
    return json({ ok: false, error: validation.error }, 400);
  }

  const config = readMailConfig();
  if (!config) {
    console.error("[contact] Brak konfiguracji SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO).");
    return json({ ok: false, error: "Wysyłka chwilowo niedostępna. Napisz bezpośrednio na adres e-mail." }, 503);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });
    await transporter.sendMail(buildMail(config, validation.data));
    return json({ ok: true }, 200);
  } catch (error: unknown) {
    console.error("[contact] Nie udało się wysłać wiadomości.", error);
    return json({ ok: false, error: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio." }, 502);
  }
}
