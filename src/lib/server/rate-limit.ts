export interface RateLimiterOptions {
  readonly windowMs: number;
  /** Maksymalna liczba prob jednego klucza (np. adresu IP) w oknie. */
  readonly maxPerKey: number;
  /** Twardy limit wszystkich prob w oknie, niezaleznie od klucza — chroni, gdy ktos podszywa sie pod wiele adresow. */
  readonly maxGlobal: number;
  /** Gorna granica sledzonych kluczy, zeby mapa nie rosla w nieskonczonosc. */
  readonly maxTracked: number;
}

export interface RateLimiter {
  /** Zwraca true, gdy zapytanie trzeba odrzucic; w przeciwnym razie rejestruje probe. */
  isLimited(key: string, now?: number): boolean;
}

/**
 * Limiter w pamieci procesu — wystarcza dla pojedynczego kontenera;
 * przy wielu instancjach trzeba wspolnego magazynu.
 */
export function createRateLimiter(options: RateLimiterOptions): RateLimiter {
  const { windowMs, maxPerKey, maxGlobal, maxTracked } = options;
  const requestLog = new Map<string, number[]>();
  let globalLog: number[] = [];

  function prune(now: number): void {
    for (const [key, times] of requestLog) {
      if (times.every((time) => now - time >= windowMs)) {
        requestLog.delete(key);
      }
    }
    // Mapa zachowuje kolejnosc wstawiania, wiec najstarsze klucze sa na poczatku.
    for (const key of requestLog.keys()) {
      if (requestLog.size <= maxTracked) break;
      requestLog.delete(key);
    }
  }

  return {
    isLimited(key, now = Date.now()) {
      globalLog = globalLog.filter((time) => now - time < windowMs);
      if (globalLog.length >= maxGlobal) {
        return true;
      }

      if (requestLog.size >= maxTracked) {
        prune(now);
      }
      const recent = (requestLog.get(key) ?? []).filter((time) => now - time < windowMs);
      if (recent.length >= maxPerKey) {
        return true;
      }

      // delete + set przesuwa klucz na koniec mapy (najswiezszy), co daje prosty wariant LRU.
      requestLog.delete(key);
      requestLog.set(key, [...recent, now]);
      globalLog = [...globalLog, now];
      return false;
    },
  };
}

/**
 * Adres klienta zgloszony przez nasz reverse proxy (Caddy/Traefik dopisuje go na koncu
 * X-Forwarded-For). Pierwsze wpisy moze wstawic sam klient, wiec bierzemy ostatni.
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const last = forwarded?.split(",").at(-1)?.trim();
  return last || request.headers.get("x-real-ip")?.trim() || "unknown";
}
