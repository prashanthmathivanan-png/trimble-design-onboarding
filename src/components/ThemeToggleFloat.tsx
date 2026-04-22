"use client";

import { Sun, Moon } from "@phosphor-icons/react";
import { useRef } from "react";
import { useTheme } from "./ThemeProvider";

type WithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished?: Promise<void> };
};

/**
 * B2 — Radial View-Transition on theme swap.
 *
 * When `document.startViewTransition` is available, we pin a temporary
 * view-transition-name onto <html> and set CSS custom properties for the
 * origin of the wipe (the toggle button's screen position). The keyframes
 * in globals.css clip-path the new frame out from that origin.
 *
 * If the browser doesn't support it, the theme just swaps instantly.
 */
export function ThemeToggleFloat() {
  const { mode, toggle } = useTheme();
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    const doc = document as WithVT;
    if (!doc.startViewTransition || typeof window === "undefined") {
      toggle();
      return;
    }

    // Compute the origin of the radial wipe from the button's center.
    const rect = ref.current?.getBoundingClientRect();
    const cx = rect
      ? `${Math.round(((rect.left + rect.width / 2) / window.innerWidth) * 100)}%`
      : "10%";
    const cy = rect
      ? `${Math.round(((rect.top + rect.height / 2) / window.innerHeight) * 100)}%`
      : "95%";
    document.documentElement.style.setProperty("--vt-x", cx);
    document.documentElement.style.setProperty("--vt-y", cy);
    document.documentElement.style.viewTransitionName = "theme-swap";

    const transition = doc.startViewTransition(() => toggle());
    transition.finished?.finally(() => {
      document.documentElement.style.viewTransitionName = "";
    });
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      aria-label="Toggle theme"
      className="surface fixed bottom-6 left-6 z-40 w-10 h-10 grid place-items-center rounded-full text-[var(--color-fg)] hover:bg-[var(--color-bg)] transition"
    >
      {mode === "dark" ? (
        <Sun size={18} weight="duotone" />
      ) : (
        <Moon size={18} weight="duotone" />
      )}
    </button>
  );
}
