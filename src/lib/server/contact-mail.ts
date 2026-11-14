import nodemailer from "nodemailer";
import type { ContactPayload } from "@/lib/contact";

export interface MailConfig {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly pass: string;
  readonly to: string;
  readonly from: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Usuwa znaki nowej linii, zeby wartosc z formularza nie trafila do naglowka maila jako nowy naglowek. */
export function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

/** Zwraca null, gdy brakuje wymaganych zmiennych srodowiskowych. */
export function readMailConfig(): MailConfig | null {
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

export function buildMail(config: MailConfig, data: ContactPayload) {
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

export async function sendContactMail(config: MailConfig, data: ContactPayload): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });
  await transporter.sendMail(buildMail(config, data));
}
