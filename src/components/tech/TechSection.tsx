import { TECH_GROUPS } from "@/content/tech";
import { Reveal } from "@/components/ui/Reveal";

export function TechSection() {
  return (
    <section className="section" id="technologie" aria-labelledby="technologie-heading">
      <div className="section__head">
        <p className="section__eyebrow">04 — Technologie</p>
        <h2 className="section__title" id="technologie-heading">
          Stos technologiczny
        </h2>
      </div>

      <div className="tile tech-sheet">
        {TECH_GROUPS.map((group, index) => (
          <Reveal key={group.id} delay={index * 60} className="tech-sheet__row">
            <span className="tech-sheet__label">{group.label}</span>
            <ul className="chip-row tech-sheet__chips">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
