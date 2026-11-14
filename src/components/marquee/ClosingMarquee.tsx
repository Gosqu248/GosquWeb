import { CLOSING_WORDS } from "@/content/tech";

/** Dekoracyjna tasma przed stopka — slowa na zmiane obrysowane i pelne. */
export function ClosingMarquee() {
  return (
    <div className="marquee closing-ticker" aria-hidden="true">
      <div className="marquee__track marquee__track--reverse">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee__group">
            {CLOSING_WORDS.map((word, index) => (
              <span key={`${copy}-${word}`} className="marquee__item">
                <span className={index % 2 === 0 ? "closing-ticker__outline" : undefined}>{word}</span>
                <span className="marquee__dot">●</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
