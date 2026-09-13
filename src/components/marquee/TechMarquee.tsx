import { MARQUEE_TECH } from "@/content/tech";

export function TechMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {/* Lista podwojona, zeby petla zamykala sie bez skoku. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee__group">
            {MARQUEE_TECH.map((tech) => (
              <li key={`${copy}-${tech}`} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
