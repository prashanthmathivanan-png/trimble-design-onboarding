"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Chapter, ChecklistItem } from "@/data/jay-plan";

export const PROGRESS_STORAGE_KEY = "td-onboarding-progress";

export type ProgressMap = Record<string, boolean>;

/**
 * Module-level store for onboarding progress.
 *
 * All `useProgress` consumers subscribe to the same in-memory map and the
 * same localStorage key, so a toggle in one Checklist group instantly
 * updates every other group, the chapter progress rail, and the
 * ChapterCompleteLetter — without lifting state into a context provider.
 *
 * We use useSyncExternalStore so that:
 *   1. updates are atomic (no setState-during-render across instances), and
 *   2. cross-tab `storage` events feed the same notify path as in-tab toggles.
 */

const EMPTY: ProgressMap = Object.freeze({}) as ProgressMap;

let snapshot: ProgressMap = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function readFromStorage(): ProgressMap {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as ProgressMap) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function notify() {
  for (const l of listeners) l();
}

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  snapshot = readFromStorage();
  window.addEventListener("storage", (e) => {
    if (e.key && e.key !== PROGRESS_STORAGE_KEY) return;
    snapshot = readFromStorage();
    notify();
  });
}

function subscribe(listener: () => void) {
  ensureInitialized();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ProgressMap {
  ensureInitialized();
  return snapshot;
}

function getServerSnapshot(): ProgressMap {
  return EMPTY;
}

function setProgress(next: ProgressMap) {
  snapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }
  notify();
}

export function useProgress() {
  const done = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    setProgress({ ...snapshot, [id]: !snapshot[id] });
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
