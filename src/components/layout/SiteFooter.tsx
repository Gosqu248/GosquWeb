import Image from "next/image";
import { SITE } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <hr className="hairline" />
      <div className="site-footer__inner">
        <Image src="/brand/GS.png" alt="" width={26} height={26} />
        <span>
          © {new Date().getFullYear()} {SITE.name} · {SITE.city}
        </span>
        <nav className="site-footer__links" aria-label="Stopka">
          <a href="#kontakt">Kontakt</a>
          <a href="https://github.com/Gosqu248" rel="noopener noreferrer" target="_blank">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
