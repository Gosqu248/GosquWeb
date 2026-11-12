export const CONTACT_TOPICS = [
  "Platforma webowa",
  "System dla firmy",
  "Aplikacja mobilna",
  "API i integracje",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly topic: ContactTopic;
  readonly message: string;
}

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactValidation =
  | { readonly ok: true; readonly data: ContactPayload }
  | { readonly ok: false; readonly error: string };

/** Walidacja danych z zewnatrz — uzywana po stronie serwera (i do wstepnego sprawdzenia w formularzu). */
export function validateContact(input: unknown): ContactValidation {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Nieprawidłowe dane formularza." };
  }
  const raw = input as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const topic = CONTACT_TOPICS.find((candidate) => candidate === raw.topic);

  if (!name || name.length > CONTACT_LIMITS.name) {
    return { ok: false, error: "Podaj imię i nazwisko." };
  }
  if (!EMAIL_PATTERN.test(email) || email.length > CONTACT_LIMITS.email) {
    return { ok: false, error: "Podaj poprawny adres e-mail." };
  }
  if (!topic) {
    return { ok: false, error: "Wybierz, czego dotyczy projekt." };
  }
  if (!message || message.length > CONTACT_LIMITS.message) {
    return { ok: false, error: "Wpisz wiadomość (maksymalnie 5000 znaków)." };
  }

  return { ok: true, data: { name, email, topic, message } };
}
