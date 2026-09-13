export type Offer = {
  id: string;
  title: string;
  description: string;
  chips: readonly string[];
  accent: string;
  /** Ile kolumn zajmuje kafel w 12-kolumnowej siatce bento. */
  span: 4 | 5 | 7;
};

export const OFFERS: readonly Offer[] = [
  {
    id: "systemy-dedykowane",
    title: "Systemy dedykowane — TMS, ERP, panele operacyjne",
    description:
      "Gdy gotowe oprogramowanie nie pasuje do procesu, budujemy system wokół procesu. Modelowanie domeny, integracje z systemami księgowymi, panele administracyjne i raportowanie.",
    chips: ["Spring Boot", "PostgreSQL", "Comarch ERP XT", "Raportowanie"],
    accent: "var(--brand-cyan)",
    span: 7,
  },
  {
    id: "gps",
    title: "GPS i telematyka",
    description:
      "Śledzenie pojazdów w czasie rzeczywistym, geofencing, optymalizacja tras i zarządzanie flotą. Obszar, w którym mamy najwięcej wdrożeń.",
    chips: ["Geofencing", "Optymalizacja tras", "Real-time"],
    accent: "var(--brand-magenta)",
    span: 5,
  },
  {
    id: "web",
    title: "Aplikacje webowe",
    description:
      "SPA i PWA w Angularze lub Reakcie — z panelem administracyjnym, kontrolą dostępu i trybem offline.",
    chips: ["Angular", "React", "PWA"],
    accent: "var(--brand-blue)",
    span: 4,
  },
  {
    id: "mobile",
    title: "Aplikacje mobilne",
    description:
      "React Native i natywny Android. Powiadomienia push, praca offline, publikacja w App Store i Google Play.",
    chips: ["React Native", "Android", "Push"],
    accent: "var(--brand-violet)",
    span: 4,
  },
  {
    id: "integracje",
    title: "API i integracje",
    description:
      "Łączymy systemy, które nie były projektowane, by ze sobą rozmawiać — REST, kolejki, ETL, płatności.",
    chips: ["REST", "Kafka", "PayU"],
    accent: "var(--brand-orange)",
    span: 4,
  },
] as const;
