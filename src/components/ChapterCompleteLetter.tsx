"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { chapterItemIds, useCompletion } from "@/hooks/useProgress";
import type { Chapter } from "@/data/jay-plan";

type Copy = { heading: string; body: string; signature: string };

/** Chapter-specific letters. Written in Trimble voice per brand guidelines v8.0:
 *  confident, helpful, direct, not cute. Each chapter signs with the
 *  appropriate member of the TD APAC team. */
const LETTERS: Record<Chapter["slug"], Copy> = {
  learn: {
    heading: "You've met us.",
    body:
      "The listening tour is over. You know the studio, the people, and the leaders you'll partner with. Now let's get you set up to ship.",
    signature: "Victor — Global Director, Trimble UX",
  },
  level: {
    heading: "You're in the system.",
    body:
      "Every tool, every ritual, every folder. Sixty days in and you've already turned observation into quick wins. Ready to lead.",
    signature: "Nawaz & Prashanth — Trimble Design APAC",
  },
  lead: {
    heading: "Welcome home, Jay.",
    body:
      "Ninety days. A roadmap that's yours. A team that's ready. From here, the direction is yours to set — with confidence at every turn.",
    signature: "The Trimble Design APAC team",
  },
};

const dismissKey = (slug: string) => `td-chapter-letter-dismissed-${slug}`;

export function ChapterCompleteLetter({ chapter }: { chapter: Chapter }) {
  const ids = useRef(chapterItemIds(chapter)).current;
  const { pct } = useCompletion(ids);
  const [dismissed, setDismissed] = useState(true);

  // Restore dismissed state from storage on mount
  useEffect(() => {
    try {
      setDismissed(
        localStorage.getItem(dismissKey(chapter.slug)) === "1"
      );
    } catch {}
  }, [chapter.slug]);

  // Re-open the letter whenever pct transitions back up to 100 — but only if
  // the user hasn't already dismissed it for this chapter.
  const prevPct = useRef(pct);
  useEffect(() => {
    if (pct === 100 && prevPct.current < 100) {
      try {
        localStorage.removeItem(dismissKey(chapter.slug));
      } catch {}
      setDismissed(false);
    }
    prevPct.current = pct;
  }, [pct, chapter.slug]);

  const onDismiss = () => {
    try {
      localStorage.setItem(dismissKey(chapter.slug), "1");
    } catch {}
    setDismissed(true);
  };

  if (pct < 100) return null;
  if (dismissed) {
    // Even after dismissal, leave a hairline persistence marker in the footer
    return (
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-20 pt-8 pb-2">
        <div className="flex items-center gap-3 label-xs text-[var(--accent)]">
          <span aria-hidden>✓</span>
          <span>CHAPTER {chapter.number} · COMPLETE</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
          <button
            onClick={() => setDismissed(false)}
            className="hover:text-[var(--color-fg)] transition"
          >
            Re-open letter
          </button>
        </div>
      </div>
    );
  }

  const copy = LETTERS[chapter.slug];

  return (
    <section
      aria-label={`Chapter ${chapter.number} complete`}
      className="relative mx-auto max-w-[1600px] px-6 md:px-20 py-16"
    >
      <div
        className="letter-rise rounded-2xl p-8 md:p-12 max-w-3xl relative overflow-hidden border border-[var(--color-line)]"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--accent) 10%, var(--bg-elev)) 0%, var(--bg-elev) 65%)",
        }}
      >
        <button
          onClick={onDismiss}
          aria-label="Dismiss letter"
          className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full hover:bg-[var(--color-bg)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition"
        >
          <X size={16} />
        </button>

        <div className="label-xs text-[var(--accent)]">
          CHAPTER {chapter.number} · COMPLETE
        </div>
        <h2 className="mt-4 type-heading max-w-2xl">{copy.heading}</h2>
        <p className="type-lead mt-6 max-w-xl text-[var(--color-fg)]/90 leading-relaxed">
          {copy.body}
        </p>
        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--accent)]" />
          <span className="label-xs text-[var(--color-fg-muted)]">
            {copy.signature}
          </span>
        </div>
      </div>
    </section>
  );
}
