import { TECH_GROUPS } from "@/content/tech";

export function TechSection() {
  return (
    <section className="section" id="technologie" aria-labelledby="technologie-heading">
      <div className="section__head">
        <p className="section__eyebrow">04 — Technologie</p>
        <h2 className="section__title" id="technologie-heading">
          Stos technologiczny
        </h2>
      </div>

      <div className="tech-grid">
        {TECH_GROUPS.map((group) => (
          <article key={group.id} className="tile tech-group">
            <h3 className="tech-group__label">{group.label}</h3>
            <ul className="chip-row">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
