"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

export type SlideItem = { kicker?: string; content: ReactNode };

/**
 * SlideReel — scroll-pinned storytelling section with a pure dissolve
 * between slides and a single anchored kicker header.
 *
 * Layout:
 *   - Outer wrapper has height = n × 100svh (the "scroll runway").
 *   - An inner sticky element pins at the top of the viewport for that
 *     entire runway.
 *   - Each slide is absolutely stacked inside the sticky container;
 *     opacity is the only animated property (compositor-only), shaped
 *     so the midpoint between two slides is a faint ghost rather than
 *     two stacked headlines.
 *   - The "NN / total — KICKER" header is NOT inside the animated
 *     layers; it's rendered once in the sticky container using the
 *     exact same flex-centered layout as Slide, so it sits in the
 *     same spot visually but doesn't scale/fade/move with the slides.
 *     Only the kicker *text* crossfades when `active` changes.
 *   - Dot pagination sits on the right edge, vertical.
 *
 * Behaviour:
 *   - When the user stops scrolling mid-transition, a debounced snap
 *     handler smoothly pulls the scroll to the nearest slide's home
 *     position. Guarded so click-to-navigate + snap don't fight.
 */
export function SlideReel({ slides }: { slides: SlideItem[] }) {
  const n = slides.length;
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  // Manual scroll progress, 0..1 across the section's runway.
  const scrollYProgress = useMotionValue(0);

  // Flag set while we're programmatically scrolling (dot click or
  // snap-to-nearest) so our scroll-idle handler doesn't re-snap us.
  const programmaticRef = useRef(false);
  const programmaticTimer = useRef<number | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const runway = el.offsetHeight - window.innerHeight;
      if (runway <= 0) {
        scrollYProgress.set(0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / runway));
      scrollYProgress.set(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive((prev) => (prev === i ? prev : i));
  });

  const scrollToSlide = useCallback(
    (i: number) => {
      const el = wrapperRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(i, n - 1));
      const rect = el.getBoundingClientRect();
      const wrapperTop = window.scrollY + rect.top;
      const runway = el.offsetHeight - window.innerHeight;
      const target = wrapperTop + (clamped / (n - 1)) * runway;

      // Mark this scroll as programmatic. Re-clear after the smooth
      // scroll has had time to settle (~700ms covers Lenis + native).
      programmaticRef.current = true;
      if (programmaticTimer.current !== null) {
        window.clearTimeout(programmaticTimer.current);
      }
      programmaticTimer.current = window.setTimeout(() => {
        programmaticRef.current = false;
      }, 700);

      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [n]
  );

  // Scroll-idle snap. When the user stops scrolling inside the reel's
  // runway, smoothly pull them to the nearest slide's home so they
  // never end up parked mid-dissolve. Debounced, guarded, and bails
  // if scroll is outside the reel or already at a home.
  useEffect(() => {
    if (reduced) return;
    const el = wrapperRef.current;
    if (!el) return;

    let idleTimer: number | null = null;

    const onScroll = () => {
      if (idleTimer !== null) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (programmaticRef.current) return;
        const node = wrapperRef.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const runway = node.offsetHeight - window.innerHeight;
        if (runway <= 0) return;

        const scrolled = -rect.top;
        // Only snap while the reel is pinned (scrolled position
        // inside [0, runway]). Outside this band we're in the hero
        // or the next section and should not snap.
        if (scrolled < 0 || scrolled > runway) return;

        const p = scrolled / runway;
        const nearest = Math.round(p * (n - 1));
        const targetP = nearest / (n - 1);
        // Already within ~1% of a home? No need to snap.
        if (Math.abs(p - targetP) < 0.01) return;

        scrollToSlide(nearest);
      }, 160);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer !== null) window.clearTimeout(idleTimer);
    };
  }, [n, reduced, scrollToSlide]);

  // Keyboard nav while the reel is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
      if (!onScreen) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        scrollToSlide(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToSlide(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, scrollToSlide]);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${n * 100}svh` }}
      aria-roledescription="carousel"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Animated slide layers — pure opacity dissolve, no scale
            or translate so nothing appears to move between slides. */}
        {slides.map((s, i) => (
          <SlideLayer
            key={i}
            index={i}
            total={n}
            progress={scrollYProgress}
            active={active}
          >
            {s.content}
          </SlideLayer>
        ))}

        {/* Anchored kicker header — mirrors the Slide layout exactly
            so it sits at the same visual position, but lives outside
            the animated layers so it never moves, scales, or fades
            in aggregate. Only the changing kicker TEXT crossfades
            when active changes. */}
        <AnchoredKicker
          active={active}
          total={n}
          kickers={slides.map((s) => s.kicker)}
        />

        {/* Vertical dot pagination — right edge, centered. */}
        <nav
          role="tablist"
          aria-label="Section slides"
          className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3 surface rounded-full py-4 px-2"
        >
          {Array.from({ length: n }).map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToSlide(i)}
                className="relative grid place-items-center w-5 h-5 rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[var(--color-fg)]"
                      : "w-1.5 h-1.5 bg-[var(--color-fg-muted)] opacity-50 hover:opacity-90"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

/**
 * Anchored kicker header. Positioned with a fixed top padding that
 * matches Slide's `pt-[28vh]`, so it always sits at the exact same
 * y regardless of which slide is active (slide content heights vary,
 * which is why a flex-centered approach can't keep the kicker
 * anchored).
 *
 * Only the kicker *text* is animated (crossfade + tiny y-shift)
 * when the active slide changes. The "NN / NN" counter re-renders
 * its text but keeps its box in place.
 */
function AnchoredKicker({
  active,
  total,
  kickers,
}: {
  active: number;
  total: number;
  kickers: (string | undefined)[];
}) {
  const kicker = kickers[active];

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      <div className="relative mx-auto max-w-[1400px] w-full h-full px-6 md:pl-20 md:pr-28 pt-[28vh] flex flex-col items-start text-left">
        <div className="flex items-center gap-4 label-xs text-[var(--color-fg-muted)]">
          <span className="tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="w-8 h-px bg-[var(--color-fg-muted)]" />
          {/* Keep min-width so width doesn't collapse between
              exit/enter; keep the motion span in normal inline flow
              (no absolute positioning) so its text baseline aligns
              with the "NN / NN" counter next to it. */}
          <span className="inline-flex items-center min-w-[7ch]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={kicker ?? "empty"}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="text-[var(--color-accent-secondary)]"
              >
                {kicker ?? ""}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * One layer in the pinned stack. Pure opacity dissolve — no scale
 * or translate — so nothing physically moves between slides. The
 * opacity curve compresses the "both visible" moment into a short
 * scroll window with a faint ghost (8% peak) rather than 50% stacked
 * headlines.
 */
function SlideLayer({
  index,
  total,
  progress,
  active,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: number;
  children: ReactNode;
}) {
  const step = total > 1 ? 1 / (total - 1) : 1;
  const home = index * step;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const leftStop = Math.max(0, home - step);
  const leftMid = Math.max(0, home - step / 3);
  const rightMid = Math.min(1, home + step / 3);
  const rightStop = Math.min(1, home + step);

  const opacity = useTransform(
    progress,
    [leftStop, leftMid, home, rightMid, rightStop],
    [
      isFirst ? 1 : 0,
      isFirst ? 1 : 0.08,
      1,
      isLast ? 1 : 0.08,
      isLast ? 1 : 0,
    ]
  );

  const isActive = active === index;

  return (
    <motion.div
      className="absolute inset-0 will-change-opacity"
      style={{ opacity, pointerEvents: isActive ? "auto" : "none" }}
      aria-hidden={!isActive}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide shell — the visual frame for each layer's content.
 *
 * Uses a fixed top padding (`pt-[28vh]`) matching the anchored
 * kicker, plus a small gap (`mt-10`) before the real content so
 * every slide's headline starts at exactly the same y-position
 * regardless of the slide's content length. This is what keeps
 * the anchored kicker + headline combo from visually shifting
 * between slides.
 */
export function Slide({
  align = "left",
  children,
}: {
  align?: "left" | "center" | "right";
  children: ReactNode;
}) {
  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <div className="relative h-full w-full flex">
      <div
        className={`relative mx-auto max-w-[1400px] w-full h-full px-6 md:pl-20 md:pr-28 pt-[28vh] pb-16 md:pb-24 flex flex-col ${alignClass}`}
      >
        {/* Gap reserving the kicker row's height + its bottom margin,
            so the first real child (headline) sits below the anchored
            kicker at the same offset the inline kicker used to. */}
        <div aria-hidden className="h-10 shrink-0" />
        {children}
      </div>
    </div>
  );
}
