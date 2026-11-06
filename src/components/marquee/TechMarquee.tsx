import { MARQUEE_TECH } from "@/content/tech";

export function TechMarquee() {
  return (
    <div className="marquee ticker" aria-hidden="true">
      <div className="marquee__track">
        {/* Lista podwojona, zeby petla zamykala sie bez skoku. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee__group">
            {MARQUEE_TECH.map((tech) => (
              <span key={`${copy}-${tech}`} className="marquee__item">
                {tech}
                <b className="marquee__star">✶</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
