export const TECH_GROUPS = [
  {
    id: "backend",
    label: "Backend",
    items: ["Java", "Spring Boot", "Hibernate / JPA", "REST", "Kafka", "ActiveMQ", "Redis", "JUnit", "Swagger"],
  },
  { id: "frontend", label: "Frontend", items: ["TypeScript", "Angular", "React", "Next.js", "SCSS", "Tailwind"] },
  { id: "mobile", label: "Mobile", items: ["React Native", "Android", "Room DB", "Expo"] },
  { id: "bazy", label: "Bazy danych", items: ["PostgreSQL", "MySQL", "Oracle DB", "PL/SQL", "MongoDB"] },
  { id: "cloud", label: "Cloud & DevOps", items: ["Docker", "Kubernetes", "AWS", "Nginx", "Linux", "CI/CD"] },
  { id: "narzedzia", label: "Narzędzia", items: ["Git", "Maven", "Gradle", "Postman", "IntelliJ"] },
] as const;

/** Skrocona lista na przewijana tasme — powrot pomyslu z poprzedniej strony. */
export const MARQUEE_TECH = [
  "Spring Boot", "Angular", "React Native", "PostgreSQL", "Kafka", "ActiveMQ",
  "Docker", "Kubernetes", "AWS", "Oracle DB", "PL/SQL", "Redis", "Hibernate",
  "TypeScript", "Nginx", "Linux",
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Analiza",
    description:
      "Poznajemy proces, który ma wspierać system. Wymagania, ograniczenia i integracje spisujemy przed pierwszą linią kodu.",
    accent: "var(--brand-orange)",
  },
  {
    number: "02",
    title: "Projekt",
    description:
      "Architektura, model danych i interfejs. Dostajesz makiety do akceptacji, zanim zaczniemy budować.",
    accent: "var(--brand-magenta)",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Praca w iteracjach z działającą wersją na środowisku testowym. Testy jednostkowe i integracyjne od początku.",
    accent: "var(--brand-violet)",
  },
  {
    number: "04",
    title: "Wdrożenie",
    description:
      "Konteneryzacja, uruchomienie produkcyjne, monitoring i dalsze utrzymanie systemu.",
    accent: "var(--brand-cyan)",
  },
] as const;
