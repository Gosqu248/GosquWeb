export type CurrentProject = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  /** Brak href = projekt objety NDA, bez linku. */
  href?: string;
  linkLabel?: string;
  icon?: "bolt" | "car";
};

/** Projekty, nad ktorymi pracuje sie teraz. Pierwszy jest wyrozniony duzym kaflem. */
export const FEATURED_PROJECT: CurrentProject = {
  id: "lingish",
  kicker: "Edukacja · produkt własny",
  title: "Lingish.eu",
  description: "Platforma kursowa online. Ostatni większy projekt, zbudowany od podstaw.",
  href: "https://lingish.eu",
  linkLabel: "Zobacz lingish.eu",
};

export const NDA_PROJECTS: readonly CurrentProject[] = [
  {
    id: "ev",
    kicker: "E-mobility · korporacja",
    title: "Ładowarki EV",
    description: "Rozwój systemu w domenie ładowania samochodów elektrycznych dla dużej firmy.",
    icon: "bolt",
  },
  {
    id: "dealers",
    kicker: "Motoryzacja · korporacja",
    title: "Sieć dealerska",
    description: "System do zarządzania dealerami dla firmy z branży motoryzacyjnej.",
    icon: "car",
  },
] as const;

export type PastProject = {
  id: string;
  title: string;
  description: string;
  kind: string;
};

export const PAST_PROJECTS: readonly PastProject[] = [
  { id: "jodogym", title: "JodoGym.pl", description: "Web + mobile", kind: "Komercyjny" },
  { id: "lawish", title: "Lawish.eu", description: "Platforma online", kind: "Komercyjny" },
  {
    id: "kork-pys",
    title: "Kork-Pyś",
    description: "Portal klienta: zlecenia, wynajem, dane klientów",
    kind: "Komercyjny",
  },
  {
    id: "bus-control",
    title: "Bus Control",
    description: "Kontrola kursów autobusowych na Androidzie",
    kind: "Komercyjny",
  },
  {
    id: "webstaurator",
    title: "Webstaurator",
    description: "Platforma gastronomiczna web + mobile",
    kind: "Własny · R&D",
  },
] as const;
