"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "span" | "p" | "h1" | "h2" | "h3";
};

/**
 * Reveal — fade-and-lift entry animation.
 *
 * Only opacity + translateY are animated. Both are compositor-only
 * properties (no paint, no layout), which keeps a whole page of
 * staggered Reveals at 60fps. An earlier version animated
 * `filter: blur(8px) → blur(0)` for a soft-focus effect — that forced
 * a new GPU layer per Reveal and a full blur recomputation every frame,
 * which stacked up quickly on pages with 10+ entries (e.g. the home
 * hero + reel) and caused visible jank on Vercel/production builds.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  once = true,
  className,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"];

  if (reduced) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
