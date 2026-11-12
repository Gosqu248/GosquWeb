"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { CONTACT_LIMITS, CONTACT_TOPICS } from "@/lib/contact";

type Status =
  | { readonly state: "idle" }
  | { readonly state: "sending" }
  | { readonly state: "sent" }
  | { readonly state: "error"; readonly message: string };

const NETWORK_ERROR = "Nie udało się połączyć z serwerem. Spróbuj ponownie lub napisz bezpośrednio.";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);

    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          topic: values.get("topic"),
          message: values.get("message"),
          website: values.get("website"),
        }),
      });
      const result: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setStatus({ state: "error", message: result.error ?? NETWORK_ERROR });
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: NETWORK_ERROR });
    }
  }

  const isSending = status.state === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__pair">
        <label className="field">
          <span className="label">Imię i nazwisko</span>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Jan Kowalski"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            required
          />
        </label>
        <label className="field">
          <span className="label">E-mail</span>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="jan@firma.pl"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            required
          />
        </label>
      </div>

      <fieldset className="field">
        <legend className="label">Czego dotyczy projekt</legend>
        <div className="choices">
          {CONTACT_TOPICS.map((topic, index) => (
            <label key={topic} className="choice">
              <input type="radio" name="topic" value={topic} defaultChecked={index === 0} />
              <span>{topic}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span className="label">Wiadomość</span>
        <textarea
          className="input"
          name="message"
          rows={5}
          placeholder="Co chcesz zbudować i na kiedy?"
          maxLength={CONTACT_LIMITS.message}
          required
        />
      </label>

      {/* Pole-pułapka dla botów: niewidoczne dla ludzi i czytników ekranu. */}
      <div className="contact-form__trap" aria-hidden="true">
        <label>
          Nie wypełniaj tego pola
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="contact-form__foot">
        <span>Odpowiadamy zwykle w ciągu jednego dnia roboczego.</span>
        <button type="submit" className="button button--primary" disabled={isSending}>
          {isSending ? "Wysyłanie…" : "Wyślij wiadomość"}
          <ArrowRightIcon size={18} />
        </button>
      </div>

      <p
        className={`contact-form__status${status.state === "error" ? " contact-form__status--error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status.state === "sent" && "Dziękujemy! Wiadomość została wysłana — odezwiemy się wkrótce."}
        {status.state === "error" && status.message}
      </p>
    </form>
  );
}
