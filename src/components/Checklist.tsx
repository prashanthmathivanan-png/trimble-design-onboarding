"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import clsx from "clsx";
import { GlassPanel } from "./GlassPanel";
import { Reveal } from "./Reveal";
import type { ChecklistGroup, ChecklistItem } from "@/data/jay-plan";

const STORAGE_KEY = "td-onboarding-progress";

function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);
  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);
  return { done, toggle };
}

function flatIds(items: ChecklistItem[]): string[] {
  return items.flatMap((i) => (i.children ? [i.id, ...flatIds(i.children)] : [i.id]));
}

function Item({
  item,
  done,
  onToggle,
  depth = 0,
}: {
  item: ChecklistItem;
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
  depth?: number;
}) {
  const isDone = !!done[item.id];
  return (
    <div className={clsx("group", depth > 0 && "ml-6 border-l hairline pl-5 py-1")}>
      <button
        onClick={() => onToggle(item.id)}
        className="w-full flex items-start gap-3 py-2 text-left hover:opacity-100 transition"
      >
        <span
          className={clsx(
            "mt-0.5 shrink-0 transition-colors",
            isDone ? "text-[var(--color-accent)]" : "text-[var(--color-fg-muted)]"
          )}
        >
          {isDone ? (
            <CheckCircle size={20} weight="fill" />
          ) : (
            <Circle size={20} weight="regular" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={clsx(
              "block text-[length:var(--text-md)] leading-snug",
              isDone && "line-through text-[var(--color-fg-muted)]"
            )}
          >
            {item.label}
          </span>
          {item.hint && (
            <span className="block text-[length:var(--text-sm)] leading-snug mt-1 text-[var(--color-fg-muted)]">
              {item.hint}
            </span>
          )}
        </span>
      </button>
      {item.children && (
        <div className="mb-2">
          {item.children.map((c) => (
            <Item key={c.id} item={c} done={done} onToggle={onToggle} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ChecklistGroupView({
  group,
  index,
}: {
  group: ChecklistGroup;
  index: number;
}) {
  const { done, toggle } = useProgress();
  const ids = useMemo(() => flatIds(group.items), [group.items]);
  const completed = ids.filter((id) => done[id]).length;
  const total = ids.length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Reveal>
      <GlassPanel className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="kicker tnum text-[var(--color-fg-muted)]">
              {String(index + 1).padStart(2, "0")} · {group.title.toUpperCase()}
            </div>
            <div className="subhead-md mt-2">{group.title}</div>
            {group.blurb && (
              <p className="body-sm mt-2 text-[var(--color-fg-muted)]">
                {group.blurb}
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="kicker tnum text-[var(--color-fg-muted)]">
              {completed} / {total}
            </div>
            <div className="mt-1 w-20 h-1 rounded-full bg-[var(--line)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 -mx-1">
          {group.items.map((item) => (
            <Item key={item.id} item={item} done={done} onToggle={toggle} />
          ))}
        </div>
      </GlassPanel>
    </Reveal>
  );
}
