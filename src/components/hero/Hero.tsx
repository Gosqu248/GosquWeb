"use client";

import { useRef } from "react";
import { StackDiagram } from "./StackDiagram";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { useHeroMotion } from "@/hooks/useHeroMotion";
import { usePersistentFlag } from "@/hooks/usePersistentFlag";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./hero.css";

const PAUSE_STORAGE_KEY = "gosqu:hero-motion-paused";

/** Zdanie dopisuje kolejne czlony, w rytm narastania diagramu. */
const HEADLINE_PARTS = [
  { text: "Od schematu bazy danych", tone: "lead" },
  { text: "przez logikę domenową", tone: "muted" },
  { text: "i bezpieczne API", tone: "muted" },
  { text: "po ostatni piksel.", tone: "accent" },
] as const;

export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = usePersistentFlag(PAUSE_STORAGE_KEY);

  const { stage, tail } = useHeroMotion({
    track: trackRef,
    canvas: canvasRef,
    bar: barRef,
    reducedMotion: prefersReducedMotion,
    paused,
  });

  const pauseLabel = paused ? "Wznów animację tła" : "Zatrzymaj animację tła";

  return (
    <section
      ref={trackRef}
      className={`hero ${prefersReducedMotion ? "hero--static" : ""}`}
      aria-labelledby="hero-heading"
    >
      <div className="hero__viewport">
        <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
        <div className="hero__veil" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span className="hero__rule" />
              Software house · platformy webowe i mobilne
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

            <div className="hero__tail" data-visible={tail}>
              <p className="hero__lead">
                Jeden zespół odpowiada za całą warstwę — od modelu danych po interfejs, który
                widzi klient.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#kontakt">
                  Porozmawiajmy o projekcie
                  <ArrowRightIcon />
                </a>
                <a className="button button--outline" href="#realizacje">
                  Zobacz realizacje
                </a>
              </div>
            </div>
          </div>

          <StackDiagram stage={stage} tail={tail} />
        </div>

        <div className="hero__progress" aria-hidden="true">
          <span ref={barRef} />
        </div>

        {!prefersReducedMotion && (
          <button
            type="button"
            className="hero__pause"
            aria-pressed={paused}
            title={pauseLabel}
            onClick={() => setPaused(!paused)}
          >
            <span className="visually-hidden">{pauseLabel}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {paused ? (
                <path d="M7 4v16l13-8z" />
              ) : (
                <>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
