import { OFFERS, type Offer, type OfferVisual } from "@/content/offers";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

function OfferVisualArt({ visual }: { visual: OfferVisual }) {
  switch (visual) {
    case "number":
      return (
        <span className="offer__numeral" aria-hidden="true">
          01
        </span>
      );
    case "spinner":
      return (
        <svg className="offer__spinner" aria-hidden="true" width="72" height="72" viewBox="0 0 100 100">
          <path
            d="M50 4 58 38 92 30 64 50 92 70 58 62 50 96 42 62 8 70 36 50 8 30 42 38Z"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
          />
        </svg>
      );
    case "phone":
      return (
        <div className="offer__phone" aria-hidden="true">
          <span className="offer__phone-speaker" />
          <span className="offer__phone-dot" />
        </div>
      );
    case "pipeline":
      return (
        <div className="offer__pipeline hide-sm" aria-hidden="true">
          <span className="offer__node">API</span>
          <span className="offer__wire" />
          <span className="offer__node offer__node--core" />
          <span className="offer__wire" />
          <span className="offer__node">ETL</span>
        </div>
      );
  }
}

function OfferCard({ offer }: { offer: Offer }) {
  const classes = [
    "card",
    "offer",
    offer.size === "wide" ? "offer--wide bento__wide" : "bento__narrow",
    offer.featured && "offer--featured",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Reveal as="article" className={classes}>
      <OfferVisualArt visual={offer.visual} />
      <span className="offer__kicker">{offer.kicker}</span>
      <h3 className="offer__title">{offer.title}</h3>
      <p className="offer__text">{offer.description}</p>
      <ul className="chip-list">
        {offer.chips.map((chip) => (
          <li key={chip} className={`chip ${offer.featured ? "chip--on-accent" : ""}`}>
            {chip}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function OffersSection() {
  return (
    <section className="section" id="oferta" aria-labelledby="oferta-heading">
      <SectionHead
        id="oferta-heading"
        eyebrow="01 — Oferta"
        title="Co robię."
        aside={
          <p className="section-head__aside">
            Cztery obszary, w których biorę odpowiedzialność od pierwszej rozmowy do produkcji.
          </p>
        }
      />
      <div className="bento">
        {OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
