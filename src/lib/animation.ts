/** Ile etapow ma sekwencja hero na desktopie i na telefonie. */
export const HERO_STAGES_DESKTOP = 4;
export const HERO_STAGES_MOBILE = 2;

/**
 * Zamienia postep 0..1 na numer aktywnego etapu (1-indeksowany).
 * Ostatni etap trzyma sie do konca zakresu, zeby zdanie nie znikalo przy dojezdzie.
 */
export function stageFromProgress(progress: number, stages: number): number {
  const raw = Math.floor(progress * stages) + 1;
  return Math.min(stages, Math.max(1, raw));
}
