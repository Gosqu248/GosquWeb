"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import { drawFloor } from "@/components/hero/drawFloor";
import {
  HERO_STAGE_COUNT,
  HERO_TAIL_THRESHOLD,
  clamp01,
  heroStageFromProgress,
} from "@/lib/animation";

interface HeroMotionOptions {
  track: RefObject<HTMLElement | null>;
  canvas: RefObject<HTMLCanvasElement | null>;
  bar: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  paused: boolean;
}

export interface HeroMotionState {
  stage: number;
  tail: boolean;
}

const FINAL_STATE: HeroMotionState = { stage: HERO_STAGE_COUNT, tail: true };
/** Wspolczynnik wygladzania postepu — im wyzszy, tym szybciej doganiamy przewijanie. */
const SMOOTHING = 6;
const MAX_FRAME_SECONDS = 0.05;
const START_TIME_SECONDS = 3;

/**
 * Jedna petla rAF napedza tlo canvas, pasek postepu i etap sekwencji.
 * Postep trzymamy poza stanem Reacta — setState leci tylko przy zmianie etapu.
 */
export function useHeroMotion({
  track,
  canvas,
  bar,
  reducedMotion,
  paused,
}: HeroMotionOptions): HeroMotionState {
  const [state, setState] = useState<HeroMotionState>({ stage: 1, tail: false });
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const trackEl = track.current;
    const canvasEl = canvas.current;
    const ctx = canvasEl?.getContext("2d");
    if (!trackEl || !canvasEl || !ctx) return;

    let width = 0;
    let height = 0;
    let progress = reducedMotion ? 1 : 0;
    let time = START_TIME_SECONDS;
    let lastTs = performance.now();
    let frame = 0;
    let visible = true;

    const draw = () => drawFloor(ctx, width, height, time, progress);

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvasEl.clientWidth;
      height = canvasEl.clientHeight;
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvasEl);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(trackEl);

    const syncBar = () => {
      if (bar.current) bar.current.style.transform = `scaleY(${progress})`;
    };

    if (reducedMotion) {
      // Bez ruchu: jedna klatka w stanie koncowym, zadnej petli.
      frame = requestAnimationFrame(() => {
        setState(FINAL_STATE);
        syncBar();
        draw();
      });
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        visibility.disconnect();
      };
    }

    const loop = (ts: number) => {
      frame = requestAnimationFrame(loop);
      const dt = Math.min(MAX_FRAME_SECONDS, (ts - lastTs) / 1000);
      lastTs = ts;
      if (!visible) return;

      const rect = trackEl.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const target = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
      progress += (target - progress) * Math.min(1, dt * SMOOTHING);

      syncBar();
      const stage = heroStageFromProgress(progress);
      const tail = progress >= HERO_TAIL_THRESHOLD;
      setState((prev) => (prev.stage === stage && prev.tail === tail ? prev : { stage, tail }));

      if (!pausedRef.current) {
        time += dt;
        draw();
      }
    };

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
    };
  }, [track, canvas, bar, reducedMotion]);

  return state;
}
