"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/content/site";
import "./site-header.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="site-header__brand" href="#top">
        <Image src="/brand/GS.png" alt="" width={30} height={30} priority />
        <span>{SITE.name}</span>
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
        </a>
        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-controls="menu-mobilne"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Zamknij menu" : "Otwórz menu"}
        </button>
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
