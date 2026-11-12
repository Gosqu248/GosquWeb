export const TECH_GROUPS = [
  {
    id: "backend",
    label: "Backend",
    items: ["Java", "Spring Boot", "Hibernate / JPA", "REST", "Kafka", "ActiveMQ", "Redis", "JUnit"],
  },
  { id: "frontend", label: "Frontend", items: ["TypeScript", "Angular", "React", "Next.js", "SCSS", "Tailwind"] },
  { id: "mobile", label: "Mobile", items: ["React Native", "Android", "Room DB", "Expo"] },
  { id: "bazy", label: "Bazy", items: ["PostgreSQL", "MySQL", "Oracle DB", "PL/SQL", "MongoDB"] },
  { id: "devops", label: "DevOps", items: ["Docker", "Kubernetes", "AWS", "Nginx", "Linux", "CI/CD"] },
  { id: "narzedzia", label: "Narzędzia", items: ["Git", "Maven", "Gradle", "Postman", "IntelliJ"] },
] as const;

/** Tekst przewijanej tasmy pod hero. */
export const MARQUEE_TECH = [
  "Java",
  "Spring Boot",
  "Angular",
  "React",
  "React Native",
  "Kafka",
  "Oracle",
  "Docker",
  "AWS",
] as const;

/** Slowa na tasmie przed stopka — co drugie obrysowane, co drugie pelne. */
export const CLOSING_WORDS = ["Platformy", "Systemy", "Mobile", "Integracje"] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Analiza",
    description:
      "Poznajemy proces, który ma wspierać system. Wymagania, ograniczenia i integracje spisujemy przed pierwszą linią kodu.",
  },
  {
    number: "02",
    title: "Projekt",
    description:
      "Architektura, model danych i interfejs. Dostajesz makiety do akceptacji, zanim zaczniemy budować.",
  },
  {
    number: "03",
    title: "Budowa",
    description:
      "Praca w iteracjach z działającą wersją na środowisku testowym. Testy jednostkowe i integracyjne od początku.",
  },
  {
    number: "04",
    title: "Wdrożenie",
    description: "Konteneryzacja, uruchomienie produkcyjne, monitoring i dalsze utrzymanie systemu.",
  },
] as const;
