"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * Postep przewijania elementu przez okno, w zakresie 0..1.
 *
 * Odczyt idzie przez requestAnimationFrame, a nasluch jest pasywny —
 * zaden handler nie liczy layoutu synchronicznie przy kazdym zdarzeniu scroll.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, enabled = true): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(1);
        return;
      }

      const ratio = -rect.top / scrollable;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    // Pierwszy pomiar tez idzie przez rAF — nigdy synchronicznie w efekcie.
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, enabled]);

  // Bez animacji pokazujemy stan koncowy — wyliczany, nie ustawiany w efekcie.
  return enabled ? progress : 1;
}
