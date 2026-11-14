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
    "Platforma e-learningowa do angielskiego prawniczego i modowego: kursy, quizy, testy poziomujące, gry językowe i certyfikaty. Jej panel administratora obsługuje też blog Lawish.eu. Jako główny wykonawca zbudowaliśmy ją od podstaw.",
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
  /** Rodzaj współpracy: zlecenie klienta, outsourcing dla innego programisty albo aplikacja PWA. */
  kind: string;
  /** Publiczny adres platformy. Brak href = brak linku w oknie szczegolow. */
  href?: string;
  linkLabel?: string;
};

export const PAST_PROJECTS: readonly PastProject[] = [
  {
    id: "jodogym",
    title: "JodoGym.pl",
    description:
      "Strona klubu fitness z grafikiem zajęć, cennikiem i aktualnościami oraz aplikacja mobilna na iOS i Androida. Panel administratora zarządza karnetami, zajęciami i użytkownikami, a karnet klubowicza i rezerwacje są w aplikacji.",
    kind: "Zlecenie",
    href: "https://jodogym.pl",
    linkLabel: "Zobacz jodogym.pl",
  },
  {
    id: "lawish",
    title: "Lawish.eu",
    description:
      "Dwujęzyczna (PL/EN) strona specjalistki od prawa mody i angielskiego prawniczego: wizytówka z kwalifikacjami oraz blog „Fashionably Legal”. Blog redagujemy z panelu administratora Lingish.eu (to ten sam klient).",
    kind: "Zlecenie",
    href: "https://lawish.eu",
    linkLabel: "Zobacz lawish.eu",
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
    href: "https://booking.ooo",
    linkLabel: "Zobacz booking.ooo",
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
    href: "https://czytacz.com",
    linkLabel: "Zobacz czytacz.com",
  },
] as const;

export type ProjectStatus = "active" | "nda" | "done";

/** Szczegoly pokazywane w oknie projektu po kliknieciu w kafel lub wiersz. */
export type ProjectDetails = {
  status: ProjectStatus;
  sector: string;
  client: string;
  role: string;
  collaboration: string;
  /** Najwazniejsze elementy zakresu prac — krotkie, rzeczowe punkty. */
  scope: readonly string[];
  stack: readonly string[];
};

export const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  lingish: {
    status: "active",
    sector: "Edukacja online",
    client: "Klient indywidualny",
    role: "Główny wykonawca",
    collaboration: "Zlecenie · budowa od zera",
    scope: [
      "Kursy online: wideo, materiały do pobrania i ćwiczenia interaktywne",
      "Quizy po lekcjach oraz testy poziomujące do doboru kursu",
      "Gry językowe: MatchWords i Fill-Blanks",
      "Konto kursanta: rejestracja e-mailem lub przez Google, śledzenie postępów",
      "Generowanie certyfikatów ukończenia kursu",
      "Płatności online i dostęp do kursów (obecnie kursy są bezpłatne)",
      "Wersje językowe PL i EN, zgody, cookies i zapis do newslettera z potwierdzeniem",
      "Panel administratora obsługujący też blog Lawish.eu",
    ],
    stack: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Docker"],
  },
  ev: {
    status: "nda",
    sector: "E-mobility",
    client: "Klient korporacyjny",
    role: "Programista w zespole klienta",
    collaboration: "Rozwój istniejącego systemu",
    scope: [
      "Rozwój funkcji w domenie ładowania pojazdów elektrycznych",
      "Integracje z usługami i systemami klienta",
      "Utrzymanie jakości: testy i code review",
    ],
    stack: ["Java", "Spring Boot", "REST", "Kafka"],
  },
  dealers: {
    status: "nda",
    sector: "Motoryzacja",
    client: "Klient korporacyjny",
    role: "Programista w zespole klienta",
    collaboration: "Rozwój istniejącego systemu",
    scope: [
      "Zarządzanie siecią dealerów i ich danymi",
      "Nowe moduły i rozbudowa istniejących procesów",
      "Integracje z systemami wewnętrznymi klienta",
    ],
    stack: ["Java", "Spring Boot", "Angular", "Oracle DB"],
  },
  jodogym: {
    status: "done",
    sector: "Fitness",
    client: "Siłownia JodoGym",
    role: "Wykonawca end-to-end",
    collaboration: "Zlecenie",
    scope: [
      "Strona klubu: oferta, grafik zajęć, cennik i honorowane karty sportowe",
      "Aktualności ze zdjęciami i wideo, archiwum pogrupowane miesiącami",
      "Sklep klubowy oraz podstrona partnera z katalogiem produktów i kategoriami",
      "Regulamin i polityka prywatności dla siłowni oraz aplikacji",
      "Panel administratora: karnety, zajęcia, użytkownicy",
      "Aplikacja mobilna (App Store i Google Play) z karnetem klubowicza",
      "Rezerwacje zajęć, historia wejść i zakupów, wyzwania oraz powiadomienia push",
    ],
    stack: ["Java", "Spring Boot", "Angular", "React Native"],
  },
  lawish: {
    status: "done",
    sector: "Edukacja · prawo",
    client: "Klient indywidualny (ten sam co Lingish.eu)",
    role: "Wykonawca",
    collaboration: "Zlecenie",
    scope: [
      "Strona-wizytówka: o autorce, kwalifikacje, certyfikaty i nagrody",
      "Blog „Fashionably Legal”: artykuły, wywiady i relacje z wydarzeń",
      "Wersje językowe PL i EN",
      "Licznik wyświetleń i lista popularnych wpisów",
      "Newsletter z potwierdzeniem zapisu (double opt-in)",
      "Regulaminy i polityka prywatności z wersją PDF do pobrania",
      "Przejście do platformy Lingish.eu",
      "Blog zasilany z panelu administratora Lingish.eu",
    ],
    stack: ["Java", "Spring Boot", "Angular"],
  },
  "kork-pys": {
    status: "done",
    sector: "Budownictwo · usługi",
    client: "Kork-Pyś",
    role: "Wykonawca",
    collaboration: "Zlecenie",
    scope: [
      "Strona firmowa z prezentacją usług",
      "Sekcje: HDS, usługi ekologiczne, wynajem sprzętu i rusztowań",
      "Kontakt i zapytania od klientów",
    ],
    stack: ["TypeScript", "Angular", "SCSS"],
  },
  booking: {
    status: "done",
    sector: "Rezerwacje · bilety",
    client: "Inny programista",
    role: "Backend i panel administratora",
    collaboration: "Outsourcing",
    scope: [
      "Nowy backend w Springu na istniejącym schemacie bazy",
      "Panel administratora napisany od zera",
      "Repertuar, bilety i szkoły",
      "Wysyłka SMS-ów i e-maili",
    ],
    stack: ["Java", "Spring Boot", "Hibernate / JPA", "Angular", "MySQL"],
  },
  "bus-control": {
    status: "done",
    sector: "Transport miejski",
    client: "Inny programista",
    role: "Aplikacja na tablety",
    collaboration: "Outsourcing",
    scope: [
      "Nowa wersja aplikacji dla kierowców autobusów",
      "Kolejne przystanki, sygnał dźwiękowy i godziny przyjazdu",
      "Integracja z istniejącym systemem zarządzania liniami",
    ],
    stack: ["Android", "Room DB", "REST"],
  },
  czytacz: {
    status: "done",
    sector: "Motoryzacja · szkody",
    client: "Kosztorysownia",
    role: "Wykonawca",
    collaboration: "Zlecenie · PWA",
    scope: [
      "Skanowanie kodów Aztec z dowodów rejestracyjnych",
      "Dekodowanie danych pojazdu",
      "Synchronizacja z kontem użytkownika w Kosztorysowni",
    ],
    stack: ["TypeScript", "PWA", "Spring Boot"],
  },
};
