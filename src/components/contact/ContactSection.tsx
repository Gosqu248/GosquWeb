import { SITE } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

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
              Opisz krótko pomysł albo problem. Odpowiemy z propozycją kolejnych kroków.
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

        <ContactForm />
      </Reveal>
    </section>
  );
}
