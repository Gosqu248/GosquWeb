"use client";

import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/content/site";
import { ArrowRightIcon } from "@/components/ui/Icons";
import "./site-header.css";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a className="site-header__brand" href="#top">
          <Image
            className="site-header__logo"
            src="/brand/GS.png"
            alt=""
            width={261}
            height={261}
            priority
          />
          {SITE.name}
        </a>

        <nav className="site-header__nav" aria-label="Nawigacja główna">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="button button--primary site-header__cta" href="#kontakt">
            Wyceń projekt
            <ArrowRightIcon />
          </a>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="menu-mobilne"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Zamknij menu" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        id="menu-mobilne"
        className="site-header__mobile"
        aria-label="Nawigacja mobilna"
        hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
