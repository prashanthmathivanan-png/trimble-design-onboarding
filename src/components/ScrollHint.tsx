"use client";

import { useEffect, useState } from "react";

/**
 * A4 — Teaches the scroll gesture with a quiet bob animation, and stops
 * the moment the user has scrolled > 100px. Respects reduced motion via
 * the CSS class itself.
 */
export function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) setHidden(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className={`absolute bottom-8 right-8 label-xs text-[var(--color-fg-muted)] transition-opacity duration-500 ${
        hidden ? "opacity-0" : "scroll-hint-bob"
      }`}
    >
      SCROLL ↓
    </div>
  );
}
