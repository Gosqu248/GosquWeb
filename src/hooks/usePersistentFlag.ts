"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function read(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false; // tryb prywatny albo zablokowane dane witryny
  }
}

/**
 * Flaga trzymana w localStorage, czytana bez setState w efekcie.
 * Zapis powiadamia wszystkie instancje hooka w tej karcie.
 */
export function usePersistentFlag(key: string): [boolean, (value: boolean) => void] {
  const subscribe = useCallback((onChange: () => void) => {
    listeners.add(onChange);
    window.addEventListener("storage", onChange);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const value = useSyncExternalStore(
    subscribe,
    useCallback(() => read(key), [key]),
    () => false,
  );

  const setValue = useCallback(
    (next: boolean) => {
      try {
        window.localStorage.setItem(key, next ? "1" : "0");
      } catch {
        // brak pamieci lokalnej nie moze psuc przycisku
      }
      emit();
    },
    [key],
  );

  return [value, setValue];
}
