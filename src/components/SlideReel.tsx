"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type PanInfo } from "motion/react";

/**
 * SlideReel — a single-viewport horizontal carousel.
 *
 * The section occupies one screen (no scroll-jacking). The user advances
 * through slides via:
 *   - Clicking a dot in the pill pagination
 *   - Arrow keys (← / →)
 *   - Dragging / swiping the slide horizontally
 *
 * Reduced motion: transitions become instant, drag still works.
 */
export function SlideReel({ slides }: { slides: ReactNode[] }) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const goTo = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(i, n - 1))),
    [n]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, n - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipe = Math.abs(info.offset.x) * info.velocity.x;
    const threshold = 8000;
    if (info.offset.x < -80 || swipe < -threshold) goTo(active + 1);
    else if (info.offset.x > 80 || swipe > threshold) goTo(active - 1);
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="flex h-full will-change-transform cursor-grab active:cursor-grabbing"
          style={{ width: `${n * 100}%` }}
          animate={{ x: `-${(100 / n) * active}%` }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 110, damping: 22, mass: 0.6 }
          }
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={handleDragEnd}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="shrink-0 h-full"
              style={{ width: `${100 / n}%` }}
              aria-hidden={i !== active}
            >
              {slide}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot pill pagination */}
      <div className="relative pb-12 flex justify-center">
        <div
          role="tablist"
          aria-label="Carousel slides"
          className="glass-bare rounded-full px-4 py-3 flex items-center gap-3"
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
        </div>
      </div>
    </section>
  );
}

/**
 * Slide shell — consistent padding, max-width, slide number / kicker.
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
        className={`relative mx-auto max-w-[1400px] w-full px-6 md:px-20 py-16 md:py-24 flex flex-col justify-center ${alignClass}`}
      >
        <div className="flex items-center gap-4 mb-6 label-xs text-[var(--color-fg-muted)]">
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {kicker && (
            <>
              <span className="w-8 h-px bg-[var(--color-fg-muted)]" />
              <span className="text-[var(--color-accent)]">{kicker}</span>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
