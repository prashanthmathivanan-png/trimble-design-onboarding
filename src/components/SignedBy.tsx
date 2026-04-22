"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

/**
 * C2 — A small, discoverable credit reveal at the bottom of the home page.
 *
 * Collapsed state: a hairline "signed by the team" line.
 * Expanded state: a short signature block from the three people who wrote
 *   this plan, in Trimble voice (direct, helpful, never cute).
 *
 * This replaces the static footer phrase with a living, interactive ending.
 */
type Signatory = { name: string; role?: string };

const SIGNATORIES: Signatory[] = [
  { name: "Victor Solano" },
  { name: "Aruna Chandroo" },
  { name: "Arushi Chandak" },
  { name: "Disha Singh Arora" },
  { name: "Mohammed Nawaz" },
  { name: "Nikhil Sanjay Pol" },
  { name: "Nupur Chauhan" },
  { name: "Prashanth Mathivanan" },
  { name: "Rakeshwar T" },
  { name: "Ramkumar SPS" },
  { name: "Seerat Sidhu" },
  { name: "Swati Bali" },
  { name: "Thulasi Priya" },
  { name: "Vasundhara Sridharan" },
  { name: "Vincy A" },
  { name: "Yash Vasant Dudhpachare" },
];

export function SignedBy() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 label-xs text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition"
      >
        <span className="h-px w-8 bg-current opacity-40" />
        <span>Signed by the team</span>
        <CaretDown
          size={12}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Fade + lift only — no height interpolation. Animating height to
          "auto" forces per-frame layout recalc across 16 children, which
          was the main source of lag when expanding. Opacity + transform
          are compositor-only and ~free. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="sigs"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-6 grid gap-4 max-w-md">
              {SIGNATORIES.map((s, i) => (
                <div
                  key={s.name}
                  className="sig-line flex items-baseline gap-3"
                  style={{ animationDelay: `${i * 28}ms` }}
                >
                  <span className="italic text-[var(--accent)]">
                    {s.name}
                  </span>
                  {s.role && (
                    <span className="label-xs text-[var(--color-fg-muted)]">
                      {s.role}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
