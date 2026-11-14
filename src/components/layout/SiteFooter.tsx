import { FOOTER_LINKS, SITE } from "@/content/site";
import { ArrowRightIcon, ArrowUpIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__col">
          <span className="site-footer__brand">
            <span className="site-footer__mark" aria-hidden="true" />
            {SITE.name}
          </span>
          <span className="site-footer__tagline">{SITE.tagline}</span>
        </div>

        <nav className="site-footer__col" aria-label="Stopka">
          <span className="label">Strona</span>
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__col">
          <span className="label">Kontakt</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          <span className="site-footer__tagline">{SITE.availability}</span>
        </div>

        <div className="site-footer__col">
          <span className="label">Nowy projekt?</span>
          <a className="button button--primary" href="#kontakt">
            Wyceń projekt
            <ArrowRightIcon />
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <a className="site-footer__top" href="#top">
          Do góry
          <ArrowUpIcon size={14} />
        </a>
      </div>
    </footer>
  );
}
