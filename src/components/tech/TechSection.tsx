import { TECH_GROUPS } from "@/content/tech";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

export function TechSection() {
  return (
    <section className="section" id="technologie" aria-labelledby="technologie-heading">
      <SectionHead id="technologie-heading" eyebrow="04 — Stos" title="Technologie." />
      <div className="tech-grid">
        {TECH_GROUPS.map((group, index) => (
          <Reveal key={group.id} as="div" className="card tech-card" delay={(index % 3) * 70}>
            <h3 className="tech-card__title">{group.label}</h3>
            <ul className="chip-list">
              {group.items.map((item) => (
                <li key={item} className="chip chip--dark">
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
