"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — subtle inertial scroll via Lenis.
 *
 * Disabled on:
 *   - prefers-reduced-motion (user preference)
 *   - touch devices (native momentum is already smooth and Lenis
 *     actively fights it, creating double-scroll jank on iOS/Android)
 *
 * lerp is tuned toward "responsive" (higher = snappier). The earlier
 * value of 0.12 produced a floaty scroll that cost too much frame
 * budget alongside the page's entry animations.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;

    const lenis = new Lenis({
      lerp: 0.18,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
