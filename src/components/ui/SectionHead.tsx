import type { ReactNode } from "react";

interface SectionHeadProps {
  /** Id naglowka — sekcja wskazuje go przez aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  /** Prawa strona: akapit albo znacznik statusu. */
  aside?: ReactNode;
}

export function SectionHead({ id, eyebrow, title, aside }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-head__title" id={id}>
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
