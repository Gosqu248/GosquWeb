/** Ile etapow ma sekwencja hero: dane, domena, API, klienci. */
export const HERO_STAGE_COUNT = 4;

/** Postep przewijania, od ktorego pojawia sie lead i przyciski. */
export const HERO_TAIL_THRESHOLD = 0.8;

/** Postep, od ktorego aktywny jest ostatni etap (nie czekamy na sam koniec toru). */
const LAST_STAGE_THRESHOLD = 0.72;
const STAGE_WIDTH = 0.24;

/**
 * Zamienia wygladzony postep 0..1 na numer aktywnego etapu (1-indeksowany).
 * Progi pochodza z makiety hero v2 — ostatni etap wlacza sie wczesniej niz 4 rowne czesci.
 */
export function heroStageFromProgress(progress: number): number {
  if (progress >= LAST_STAGE_THRESHOLD) return HERO_STAGE_COUNT;
  return 1 + Math.floor(progress / STAGE_WIDTH);
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
