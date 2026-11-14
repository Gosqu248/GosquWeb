import { validateContact } from "@/lib/contact";
import { readMailConfig, sendContactMail } from "@/lib/server/contact-mail";
import { clientIp, createRateLimiter } from "@/lib/server/rate-limit";
import { readLimitedBody } from "@/lib/server/read-limited-body";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;

const rateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxPerKey: 5,
  maxGlobal: 30,
  maxTracked: 5_000,
});

function json(body: { ok: boolean; error?: string }, status: number): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request): Promise<Response> {
  if (rateLimiter.isLimited(clientIp(request))) {
    return json({ ok: false, error: "Zbyt wiele prób. Spróbuj ponownie za kilka minut." }, 429);
  }

  const rawBody = await readLimitedBody(request, MAX_BODY_BYTES);
  if (rawBody === null) {
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
    await sendContactMail(config, validation.data);
    return json({ ok: true }, 200);
  } catch (error: unknown) {
    console.error("[contact] Nie udało się wysłać wiadomości.", error);
    return json({ ok: false, error: "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio." }, 502);
  }
}
