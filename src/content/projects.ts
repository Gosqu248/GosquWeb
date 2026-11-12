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
  kicker: "Edukacja · zlecenie klienta indywidualnego",
  title: "Lingish.eu",
  description:
    "Platforma kursowa online: kursy, quizy, testy poziomujące, płatności i certyfikaty. Jej panel administratora obsługuje też blog Lawish.eu. Jako główny wykonawca zbudowaliśmy ją od podstaw.",
  href: "https://lingish.eu",
  linkLabel: "Zobacz lingish.eu",
};

export const NDA_PROJECTS: readonly CurrentProject[] = [
  {
    id: "ev",
    kicker: "E-mobility · klient korporacyjny",
    title: "Ładowarki EV",
    description: "Rozwój systemu w domenie ładowania samochodów elektrycznych dla dużej firmy.",
    icon: "bolt",
  },
  {
    id: "dealers",
    kicker: "Motoryzacja · klient korporacyjny",
    title: "Sieć dealerska",
    description: "System do zarządzania dealerami dla firmy z branży motoryzacyjnej.",
    icon: "car",
  },
] as const;

export type PastProject = {
  id: string;
  title: string;
  description: string;
  /** Rodzaj współpracy: zlecenie klienta, outsourcing dla innego programisty albo projekt własny. */
  kind: string;
};

export const PAST_PROJECTS: readonly PastProject[] = [
  {
    id: "jodogym",
    title: "JodoGym.pl",
    description:
      "Strona z panelem administratora i aplikacja mobilna do zarządzania siłownią: karnety, zajęcia, użytkownicy. Karnet klubowicza jest w aplikacji.",
    kind: "Zlecenie",
  },
  {
    id: "lawish",
    title: "Lawish.eu",
    description:
      "Strona o prawie mody i angielskim prawniczym z blogiem. Blog redagujemy z panelu administratora Lingish.eu (to ten sam klient).",
    kind: "Zlecenie",
  },
  {
    id: "kork-pys",
    title: "Kork-Pyś",
    description:
      "Strona internetowa firmy usługowej z branży budowlanej: HDS, usługi ekologiczne, wynajem sprzętu i rusztowań.",
    kind: "Zlecenie",
  },
  {
    id: "booking",
    title: "booking.ooo",
    description:
      "Całkowicie nowy panel administratora i backend w Springu, napisane od zera na istniejącym schemacie bazy danych: repertuar, bilety, szkoły, SMS-y i e-maile.",
    kind: "Outsourcing",
  },
  {
    id: "bus-control",
    title: "Bus Control",
    description:
      "Nowa wersja aplikacji na tablety z Androidem dla kierowców autobusów miejskich: kolejne przystanki, sygnał dźwiękowy i godziny przyjazdu. Zintegrowana z istniejącym systemem zarządzania liniami.",
    kind: "Outsourcing",
  },
  {
    id: "czytacz",
    title: "Czytacz.com",
    description:
      "Aplikacja PWA do skanowania kodów Aztec z dowodów rejestracyjnych. Zsynchronizowana z Kosztorysownią: odczytane dane pojazdu trafiają do wskazanego użytkownika.",
    kind: "Aplikacja PWA",
  },
  {
    id: "webstaurator",
    title: "Webstaurator",
    description: "Platforma gastronomiczna web + mobile",
    kind: "Własny · R&D",
  },
] as const;
