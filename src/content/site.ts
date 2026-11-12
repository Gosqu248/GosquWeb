export const SITE = {
  name: "Gosqu Software",
  city: "Tarnów",
  email: "grzegorz.urban@gosqu-software.pl",
  phone: "+48 730 174 220",
  phoneHref: "tel:+48730174220",
  availability: "Pon–sob, 9:00–18:00",
  tagline: "Platformy webowe, systemy, aplikacje mobilne i integracje.",
} as const;

export const NAV_LINKS = [
  { href: "#oferta", label: "Oferta" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#proces", label: "Proces" },
  { href: "#technologie", label: "Technologie" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

/** Linki w stopce — bez „Kontakt”, ten ma osobna kolumne. */
export const FOOTER_LINKS = NAV_LINKS.filter((link) => link.href !== "#kontakt");
