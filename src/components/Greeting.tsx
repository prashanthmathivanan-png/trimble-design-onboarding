"use client";

import { useEffect, useState } from "react";

type Greeting = { prefix: string; punct: "." | "," };

const FIRST_VISIT_KEY = "td-first-visit";
const LAST_VISIT_KEY = "td-last-visit";
const ALL_DONE_KEY = "td-onboarding-progress"; // reused; checks presence of keys
const TOTAL_ITEMS_HEURISTIC = 60; // keep under this for "not done yet"

/**
 * B1 — Time-aware hero greeting. Copy ladder (in Trimble voice — confident,
 * helpful, never cute):
 *   - First visit ever        → "Welcome,"
 *   - Return within 24h       → "Welcome back,"
 *   - Return after weekend    → "Monday again," / "Happy Friday,"
 *   - All checklist complete  → "Your 90 days,"
 *   - Otherwise (mid-journey) → "Welcome back," (safe default)
 */
function resolveGreeting(): Greeting {
  try {
    const now = Date.now();
    const first = localStorage.getItem(FIRST_VISIT_KEY);
    const last = localStorage.getItem(LAST_VISIT_KEY);
    const progressRaw = localStorage.getItem(ALL_DONE_KEY);
    const progress = progressRaw ? JSON.parse(progressRaw) : {};
    const doneCount = Object.values(progress).filter(Boolean).length;

    localStorage.setItem(LAST_VISIT_KEY, String(now));
    if (!first) {
      localStorage.setItem(FIRST_VISIT_KEY, String(now));
      return { prefix: "Welcome", punct: "," };
    }

    // Chapter-wide "done" state — if user has ticked most items.
    if (doneCount >= TOTAL_ITEMS_HEURISTIC) {
      return { prefix: "Your 90 days", punct: "," };
    }

    const day = new Date(now).getDay(); // 0 Sun … 6 Sat
    const lastMs = last ? parseInt(last, 10) : now;
    const hoursSince = (now - lastMs) / (1000 * 60 * 60);

    if (hoursSince > 48 && day === 1) {
      return { prefix: "Monday again", punct: "," };
    }
    if (day === 5) {
      return { prefix: "Happy Friday", punct: "," };
    }
    if (hoursSince < 24) {
      return { prefix: "Welcome back", punct: "," };
    }
    return { prefix: "Welcome back", punct: "," };
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
