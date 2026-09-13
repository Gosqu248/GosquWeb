import { OFFERS } from "@/content/offers";

export function OffersSection() {
  return (
    <section className="section" id="oferta" aria-labelledby="oferta-heading">
      <div className="section__head section__head--split">
        <div>
          <p className="section__eyebrow">01 — Oferta</p>
          <h2 className="section__title" id="oferta-heading">
            Co budujemy
          </h2>
        </div>
        <p className="section__note">
          Każdy projekt prowadzimy od analizy wymagań po wdrożenie produkcyjne i utrzymanie.
        </p>
      </div>

      <div className="bento">
        {OFFERS.map((offer, index) => (
          <article
            key={offer.id}
            className={`tile tile--interactive offer ${index === 0 ? "tile--raised" : ""}`}
            style={{ ["--span" as string]: offer.span }}
          >
            <span className="icon-badge" aria-hidden="true">
              <span className="offer__dot" style={{ background: offer.accent }} />
            </span>
            <h3 className="offer__title">{offer.title}</h3>
            <p className="offer__text">{offer.description}</p>
            <ul className="chip-row offer__chips">
              {offer.chips.map((chip) => (
                <li key={chip} className="chip">
                  {chip}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
