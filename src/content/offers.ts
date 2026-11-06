export type OfferVisual = "number" | "spinner" | "phone" | "pipeline";

export type Offer = {
  id: string;
  /** Etykieta nad tytulem, np. „Web” albo „02 · Enterprise”. */
  kicker: string;
  title: string;
  description: string;
  chips: readonly string[];
  /** Szeroki kafel zajmuje 4 z 6 kolumn, waski 2. */
  size: "wide" | "narrow";
  /** Wypelniony akcentem — tylko jeden kafel w calej sekcji. */
  featured?: boolean;
  visual: OfferVisual;
};

export const OFFERS: readonly Offer[] = [
  {
    id: "web",
    kicker: "Web",
    title: "Platformy webowe",
    description:
      "Portale klienta, platformy kursowe i panele administracyjne w Angularze lub Reakcie, z kontrolą dostępu i płatnościami.",
    chips: ["Angular", "React", "Next.js"],
    size: "wide",
    featured: true,
    visual: "number",
  },
  {
    id: "enterprise",
    kicker: "02 · Enterprise",
    title: "Systemy dla dużych firm",
    description:
      "Rozwój systemów korporacyjnych w zespołach klienta: modelowanie domeny, wydajne backendy i panele operacyjne.",
    chips: ["Java", "Spring Boot", "Oracle DB"],
    size: "narrow",
    visual: "spinner",
  },
  {
    id: "mobile",
    kicker: "03 · Mobile",
    title: "Aplikacje mobilne",
    description:
      "React Native i natywny Android. Powiadomienia push, praca offline, publikacja w App Store i Google Play.",
    chips: ["React Native", "Android", "Push"],
    size: "narrow",
    visual: "phone",
  },
  {
    id: "integracje",
    kicker: "04 · Integracje",
    title: "API i integracje",
    description:
      "Łączę systemy, które nie były projektowane, by ze sobą rozmawiać: REST, kolejki, ETL, płatności.",
    chips: ["REST", "Kafka", "PayU"],
    size: "wide",
    visual: "pipeline",
  },
] as const;
