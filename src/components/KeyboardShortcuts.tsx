"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * C1 — Discoverable keyboard shortcuts for the design-crowd audience.
 *
 *   0    → home
 *   1    → /learn
 *   2    → /level
 *   3    → /lead
 *   ?    → toggle shortcut sheet
 *   Esc  → close sheet
 *
 * Shortcuts never fire while the user is typing in an input, textarea,
 * or contenteditable surface.
 */
const ROUTES: Record<string, string> = {
  "0": "/",
  "1": "/learn",
  "2": "/level",
  "3": "/lead",
};

export function KeyboardShortcuts() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target.isContentEditable
        ) {
          return;
        }
      }
      // Don't steal keys that have modifiers — leave the platform shortcuts alone.
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const route = ROUTES[e.key];
      if (route) {
        e.preventDefault();
        setOpen(false);
        router.push(route);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-[60] grid place-items-center"
      onClick={() => setOpen(false)}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[var(--bg)]/70 backdrop-blur-sm"
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="kbd-enter surface relative rounded-2xl p-8 max-w-sm w-full mx-6 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.25)]"
      >
        <div className="label-xs text-[var(--color-fg-muted)]">
          KEYBOARD SHORTCUTS
        </div>
        <div className="mt-5 grid gap-3">
          {[
            { k: "0", label: "Home" },
            { k: "1", label: "Chapter 01 · Learn" },
            { k: "2", label: "Chapter 02 · Level" },
            { k: "3", label: "Chapter 03 · Lead" },
            { k: "?", label: "Show / hide shortcuts" },
            { k: "Esc", label: "Close" },
          ].map(({ k, label }) => (
            <div key={k} className="flex items-center justify-between gap-4">
              <span className="text-[var(--color-fg)]/90">
                {label}
              </span>
              <kbd className="label-xs px-2 py-1 rounded-md bg-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-fg)]">
                {k}
              </kbd>
            </div>
          ))}
        </div>
        <button
          onClick={() => setOpen(false)}
          className="mt-6 w-full label-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
