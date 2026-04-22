"use client";

import { useEffect, useState } from "react";

type Greeting = { prefix: string; punct: "." | "," };

const FIRST_VISIT_KEY = "td-first-visit";
const LAST_VISIT_KEY = "td-last-visit";
const ALL_DONE_KEY = "td-onboarding-progress";
const TOTAL_ITEMS_HEURISTIC = 60;

/**
 * Hero greeting. Two states only — kept intentionally lean to match the
 * Trimble voice (confident, direct, results-driven; never cute). No
 * day-of-week or weather-style commentary.
 *
 *   - All checklist complete  → "Your 90 days,"
 *   - Otherwise               → "Welcome,"
 */
function resolveGreeting(): Greeting {
  try {
    const now = Date.now();
    const progressRaw = localStorage.getItem(ALL_DONE_KEY);
    const progress = progressRaw ? JSON.parse(progressRaw) : {};
    const doneCount = Object.values(progress).filter(Boolean).length;

    localStorage.setItem(LAST_VISIT_KEY, String(now));
    if (!localStorage.getItem(FIRST_VISIT_KEY)) {
      localStorage.setItem(FIRST_VISIT_KEY, String(now));
    }

    if (doneCount >= TOTAL_ITEMS_HEURISTIC) {
      return { prefix: "Your 90 days", punct: "," };
    }
    return { prefix: "Welcome", punct: "," };
  } catch {
    return { prefix: "Welcome", punct: "," };
  }
}

export function Greeting({ firstName }: { firstName: string }) {
  // Always render the conservative default on the server to avoid hydration
  // mismatches, then refine on the client.
  const [g, setG] = useState<Greeting>({ prefix: "Welcome", punct: "," });
  useEffect(() => {
    setG(resolveGreeting());
  }, []);

  return (
    <>
      {g.prefix}
      {g.punct}
      <br />
      <span className="italic text-[var(--accent)]">{firstName}.</span>
    </>
  );
}
