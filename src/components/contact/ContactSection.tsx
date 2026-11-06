import { SITE } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

const DETAILS = [
  { label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Telefon", value: SITE.phone, href: SITE.phoneHref },
  { label: "Dostępność", value: SITE.availability, href: null },
] as const;

export function ContactSection() {
  return (
    <section className="section" id="kontakt" aria-labelledby="kontakt-heading">
      <Reveal className="tile contact">
        <div className="contact__copy">
          <h2 className="section__title" id="kontakt-heading">
            Masz projekt do zbudowania?
          </h2>
          <p className="contact__lead">
            Opisz, co ma robić system. Odpowiemy z pierwszym szkicem rozwiązania i widełkami
            czasowymi — bez zobowiązań.
          </p>
          <a className="button button--primary" href={`mailto:${SITE.email}`}>
            Napisz do nas
          </a>
        </div>

        <dl className="contact__details">
          {DETAILS.map((detail) => (
            <div key={detail.label} className="contact__row">
              <dt className="contact__label">{detail.label}</dt>
              <dd className="contact__value">
                {detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
