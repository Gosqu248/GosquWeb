export type Project = {
  id: string;
  title: string;
  kind: string;
  description: string | null;
  stack: readonly string[];
  featured?: boolean;
};

/**
 * `description: null` i pusty `stack` oznaczaja dane, ktorych jeszcze nie mamy.
 * Interfejs renderuje je jako widoczna luke, nigdy jako zmyslona tresc.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "kork-pys",
    title: "Kork-Pyś — portal klienta i integracja z ERP",
    kind: "Komercyjny",
    description:
      "Portal dla firmy remontowo-transportowej: obsługa zleceń, wynajmu i danych klientów, z dwukierunkową synchronizacją faktur do Comarch ERP XT.",
    stack: ["Spring Boot", "Angular", "PostgreSQL", "JWT", "Docker", "Nginx"],
    featured: true,
  },
  {
    id: "bus-control",
    title: "Bus Control",
    kind: "Komercyjny · GPS",
    description:
      "Androidowy system kontroli kursów autobusowych: pozycja w czasie rzeczywistym, obsługa przystanków i praca bez zasięgu.",
    stack: ["Java", "Android", "Room DB"],
  },
  {
    id: "jodogym",
    title: "JodoGym.pl",
    kind: "Komercyjny · Web + Mobile",
    description: null,
    stack: [],
  },
  {
    id: "lawish",
    title: "Lawish.eu",
    kind: "Komercyjny",
    description: null,
    stack: [],
  },
  {
    id: "lingish",
    title: "Lingish.eu",
    kind: "Komercyjny · Platforma kursowa",
    description: null,
    stack: [],
  },
  {
    id: "gosqu-restaurant",
    title: "Gosqu Restaurant",
    kind: "Własny · R&D",
    description: "Zamówienia online z logowaniem Google, 2FA i płatnościami PayU.",
    stack: ["Angular", "Spring Boot", "PayU"],
  },
  {
    id: "webstaurator",
    title: "Webstaurator",
    kind: "Własny · R&D",
    description: "Platforma gastronomiczna web + mobile z wielojęzycznością i płatnościami.",
    stack: ["Angular", "React Native", "i18n"],
  },
] as const;
