/** Znacznik brakujacych danych — trafia do interfejsu, zeby luka byla widoczna. */
export function Placeholder({ children }: { children: string }) {
  return <span className="placeholder">[{children}]</span>;
}
