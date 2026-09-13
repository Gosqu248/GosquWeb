"use client";

import { useRef } from "react";
import { HeroMedia } from "./HeroMedia";
import { StackDiagram } from "./StackDiagram";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { HERO_STAGES_DESKTOP, stageFromProgress } from "@/lib/animation";
import "./hero.css";

/** Zdanie dopisuje kolejne czlony, w rytm narastania diagramu. */
const HEADLINE_PARTS = [
  { text: "Od schematu bazy danych", tone: "lead" },
  { text: "przez logikę domenową", tone: "muted" },
  { text: "i bezpieczne API", tone: "muted" },
  { text: "po ostatni piksel.", tone: "accent" },
] as const;

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const progress = useScrollProgress(trackRef, !prefersReducedMotion);
  const stage = stageFromProgress(progress, HERO_STAGES_DESKTOP);

  return (
    <section
      ref={trackRef}
      className={`hero ${prefersReducedMotion ? "hero--static" : ""}`}
      aria-labelledby="hero-heading"
    >
      <div className="hero__viewport">
        <HeroMedia prefersReducedMotion={prefersReducedMotion} />

        <div className="hero__content">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span className="hero__rule" />
              Software house · Tarnów
            </p>

            <h1 id="hero-heading" className="hero__headline">
              {HEADLINE_PARTS.map((part, index) => (
                <span
                  key={part.text}
                  className={`hero__line hero__line--${part.tone}`}
                  data-visible={stage >= index + 1}
                >
                  {part.text}
                </span>
              ))}
            </h1>

            <div className="hero__tail" data-visible={stage >= HERO_STAGES_DESKTOP}>
              <p className="hero__lead">
                Jeden zespół odpowiada za całą warstwę — od modelu danych po interfejs,
                który widzi klient.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#kontakt">
                  Porozmawiajmy o projekcie
                </a>
                <a className="button button--ghost" href="#realizacje">
                  Zobacz realizacje
                </a>
              </div>
            </div>
          </div>

          <aside className="hero__diagram" aria-label="Nasz stos technologiczny">
            <p className="hero__diagram-title">Nasz stos</p>
            <StackDiagram stage={prefersReducedMotion ? HERO_STAGES_DESKTOP : stage} />
          </aside>
        </div>

        <div className="hero__progress" aria-hidden="true">
          <span style={{ transform: `scaleY(${prefersReducedMotion ? 1 : progress})` }} />
        </div>
      </div>
    </section>
  );
}
