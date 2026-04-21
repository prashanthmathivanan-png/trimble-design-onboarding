"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Chapter, ChecklistItem } from "@/data/jay-plan";

export const PROGRESS_STORAGE_KEY = "td-onboarding-progress";

export type ProgressMap = Record<string, boolean>;

/**
 * Shared progress store. Reads + writes a single localStorage key and
 * keeps every mounted consumer in sync via a window event.
 *
 * This unlocks chapter-level celebrations (A3) — multiple Checklist groups
 * and a ChapterCompleteLetter can all observe the same source of truth
 * without lifting state into a context provider.
 */
export function useProgress() {
  const [done, setDone] = useState<ProgressMap>({});

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (raw) setDone(JSON.parse(raw));
      } catch {}
    };
    load();
    const onSync = () => load();
    window.addEventListener("td-progress-sync", onSync);
    window.addEventListener("storage", onSync);
    return () => {
      window.removeEventListener("td-progress-sync", onSync);
      window.removeEventListener("storage", onSync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event("td-progress-sync"));
      } catch {}
      return next;
    });
  }, []);

  return { done, toggle };
}

export function flatIds(items: ChecklistItem[]): string[] {
  return items.flatMap((i) =>
    i.children ? [i.id, ...flatIds(i.children)] : [i.id]
  );
}

export function chapterItemIds(chapter: Chapter): string[] {
  return chapter.groups.flatMap((g) => flatIds(g.items));
}

/** Percentage completion (0-100) for a list of item ids. */
export function useCompletion(ids: string[]) {
  const { done } = useProgress();
  return useMemo(() => {
    const total = ids.length;
    if (total === 0) return { pct: 0, completed: 0, total: 0 };
    const completed = ids.filter((id) => done[id]).length;
    return { pct: Math.round((completed / total) * 100), completed, total };
  }, [done, ids]);
}
