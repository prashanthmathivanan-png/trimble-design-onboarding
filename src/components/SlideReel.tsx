"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * SlideReel — scroll-pinned storytelling section.
 *
 * Layout:
 *   - Outer wrapper has height = n × 100vh (the "scroll runway").
 *   - An inner sticky element pins at the top of the viewport for that
 *     entire runway, so as the user scrolls, the viewport stays locked
 *     on this section while each slide takes its turn.
 *   - Every slide is absolutely stacked inside the sticky container;
 *     opacity + translateY are driven by scroll progress (compositor-
 *     only, so no frame cost).
 *   - Dot pagination sits on the right edge, vertical. Each dot
 *     scroll-jumps to its slide's "home" position.
 *
 * Once all n slides are consumed, natural scroll continues to the next
 * section. Keyboard ArrowDown/ArrowUp jump between slides.
 */
export function SlideReel({ slides }: { slides: ReactNode[] }) {
  const n = slides.length;
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Map continuous scroll progress → integer active slide (for dot
  // highlights and a11y labels). Guard against updates while paused.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive((prev) => (prev === i ? prev : i));
  });

  // Scroll to a slide's "home" progress point. scroll progress 0..1 is
  // distributed evenly across n-1 transitions, so slide i lives at
  // i/(n-1). Convert that to a document scrollTop.
  const goTo = useCallback(
    (i: number) => {
      const el = wrapperRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(i, n - 1));
      const rect = el.getBoundingClientRect();
      const wrapperTop = window.scrollY + rect.top;
      const runway = el.offsetHeight - window.innerHeight;
      const target = wrapperTop + (clamped / (n - 1)) * runway;
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [n]
  );

  // Arrow-key navigation. Only acts when the pinned section is on
  // screen to avoid stealing keys from the rest of the page.
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
        goTo(active + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: `${n * 100}svh` }}
      aria-roledescription="carousel"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {slides.map((slide, i) => (
          <SlideLayer
            key={i}
            index={i}
            total={n}
            progress={scrollYProgress}
            active={active}
            reduced={!!reduced}
          >
            {slide}
          </SlideLayer>
        ))}

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
                onClick={() => goTo(i)}
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
 * One layer in the pinned stack. Each slide's "home" progress point is
 * i/(n-1); it crossfades in/out over a window of ±1/(n-1) around that.
 * Opacity is hard-clamped so slides fully disappear outside their
 * window (avoids subpixel ghosting on stacked text).
 */
function SlideLayer({
  index,
  total,
  progress,
  active,
  reduced,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: number;
  reduced: boolean;
  children: ReactNode;
}) {
  const step = total > 1 ? 1 / (total - 1) : 1;
  const home = index * step;

  // Opacity window: 0 → 1 → 0 across [home-step, home, home+step].
  // For reduced motion we collapse the crossfade to a step function.
  const opacity = useTransform(
    progress,
    reduced
      ? [home - step / 2, home - step / 2 + 0.0001, home + step / 2 - 0.0001, home + step / 2]
      : [home - step, home, home + step],
    reduced ? [0, 1, 1, 0] : [0, 1, 0]
  );

  // Subtle lift in / out. Kept small (32px) so it reads as a settle,
  // not a slide-show.
  const y = useTransform(
    progress,
    [home - step, home, home + step],
    reduced ? [0, 0, 0] : [32, 0, -32]
  );

  // Only the active layer should receive pointer events — otherwise
  // invisible layers eat clicks from links that land on them.
  const isActive = active === index;

  return (
    <motion.div
      className="absolute inset-0 will-change-[opacity,transform]"
      style={{ opacity, y, pointerEvents: isActive ? "auto" : "none" }}
      aria-hidden={!isActive}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide shell — the visual frame for each layer.
 *
 * Content is vertically centered within the pinned viewport so slides
 * read as balanced compositions rather than bottom-anchored moments.
 * Right padding is padded extra on desktop to clear the vertical dot
 * pagination.
 */
export function Slide({
  index,
  total,
  kicker,
  align = "left",
  children,
}: {
  index: number;
  total: number;
  kicker?: string;
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
        className={`relative mx-auto max-w-[1400px] w-full h-full px-6 md:pl-20 md:pr-28 py-16 md:py-24 flex flex-col justify-center ${alignClass}`}
      >
        <div className="flex items-center gap-4 mb-6 label-xs text-[var(--color-fg-muted)]">
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {kicker && (
            <>
              <span className="w-8 h-px bg-[var(--color-fg-muted)]" />
              <span className="text-[var(--color-accent-secondary)]">{kicker}</span>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
