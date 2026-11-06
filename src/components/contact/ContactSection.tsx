import { SITE } from "@/content/site";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const TOPICS = ["Platforma webowa", "System dla firmy", "Aplikacja mobilna", "API i integracje"] as const;

const LINKS = [
  { label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: `Telefon · ${SITE.availability.toLowerCase()}`, value: SITE.phone, href: SITE.phoneHref },
] as const;

export function ContactSection() {
  return (
    <section className="section" id="kontakt" aria-labelledby="kontakt-heading">
      <Reveal className="contact">
        <div className="contact__copy">
          <div>
            <span className="eyebrow">05 — Kontakt</span>
            <h2 className="contact__title" id="kontakt-heading">
              Porozmawiajmy o Twojej <span>platformie.</span>
            </h2>
            <p className="contact__lead">
              Opisz krótko pomysł albo problem. Odpowiem z propozycją kolejnych kroków.
            </p>
          </div>

          <ul className="contact__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a className="contact__link" href={link.href}>
                  <span>
                    <span className="label">{link.label}</span>
                    {link.value}
                  </span>
                  <ArrowRightIcon size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Formularz otwiera klienta poczty — serwis nie ma backendu do odbioru wiadomosci. */}
        <form
          className="contact-form"
          action={`mailto:${SITE.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="contact-form__pair">
            <label className="field">
              <span className="label">Imię i nazwisko</span>
              <input className="input" type="text" name="imie" placeholder="Jan Kowalski" autoComplete="name" required />
            </label>
            <label className="field">
              <span className="label">E-mail</span>
              <input className="input" type="email" name="email" placeholder="jan@firma.pl" autoComplete="email" required />
            </label>
          </div>

          <fieldset className="field">
            <legend className="label">Czego dotyczy projekt</legend>
            <div className="choices">
              {TOPICS.map((topic, index) => (
                <label key={topic} className="choice">
                  <input type="radio" name="temat" value={topic} defaultChecked={index === 0} />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span className="label">Wiadomość</span>
            <textarea className="input" name="wiadomosc" rows={5} placeholder="Co chcesz zbudować i na kiedy?" />
          </label>

          <div className="contact-form__foot">
            <span>Odpowiadam zwykle w ciągu jednego dnia roboczego.</span>
            <button type="submit" className="button button--primary">
              Wyślij wiadomość
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
