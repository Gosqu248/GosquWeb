"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePersistentFlag } from "@/hooks/usePersistentFlag";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const PAUSE_STORAGE_KEY = "gosqu:hero-motion-paused";
const SLOW_CONNECTIONS = new Set(["slow-2g", "2g"]);
const DESKTOP_QUERY = "(min-width: 768px)";

/** Save-Data i wolne lacze zdejmuja material niezaleznie od szerokosci ekranu. */
function connectionAllowsVideo(): boolean {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && SLOW_CONNECTIONS.has(connection.effectiveType)) return false;
  return true;
}

export function HeroMedia({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [paused, setPaused] = usePersistentFlag(PAUSE_STORAGE_KEY);

  const videoEnabled = isDesktop && !prefersReducedMotion && connectionAllowsVideo();

  // Poza widokiem material stoi — nie ma powodu dekodowac klatek w tle.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoEnabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoEnabled, paused]);

  const togglePause = useCallback(() => setPaused(!paused), [paused, setPaused]);

  return (
    <div className="hero-media">
      {/* Plyta bazowa rysowana w CSS — wazy zero bajtow i dziala bez materialu. */}
      <div className="hero-plate" aria-hidden="true">
        <div className={`hero-plate__drift ${paused ? "is-paused" : ""}`}>
          <span className="hero-plate__haze hero-plate__haze--blue" />
          <span className="hero-plate__haze hero-plate__haze--violet" />
          <span className={`hero-plate__grid ${paused ? "is-paused" : ""}`} />
        </div>
        <span className="hero-plate__grain" />
      </div>

      {videoEnabled ? (
        <video
          ref={videoRef}
          className="hero-video"
          poster="/media/hero-poster.avif"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src="/media/hero.webm" type="video/webm" />
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className="hero-scrim" aria-hidden="true" />

      {/* WCAG 2.2.2 — ruch dluzszy niz 5 s musi dac sie zatrzymac. */}
      <button type="button" className="hero-media__control" onClick={togglePause} aria-pressed={paused}>
        {paused ? "Wznów animację tła" : "Zatrzymaj animację tła"}
      </button>
    </div>
  );
}
