"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { Panel } from "./Panel";
import { Reveal } from "./Reveal";
import type { ChecklistGroup, ChecklistItem } from "@/data/jay-plan";
import { flatIds, useProgress } from "@/hooks/useProgress";

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
  // A1: a transient flag that fires the row shimmer for 450ms after a check.
  const [justChecked, setJustChecked] = useState(false);
  const prev = useRef(isDone);
  useEffect(() => {
    if (isDone && !prev.current) {
      setJustChecked(true);
      const t = setTimeout(() => setJustChecked(false), 650);
      prev.current = isDone;
      return () => clearTimeout(t);
    }
    prev.current = isDone;
  }, [isDone]);

  return (
    <div className={clsx("group", depth > 0 && "ml-6 border-l hairline pl-5 py-1")}>
      <button
        onClick={() => onToggle(item.id)}
        className="relative w-full flex items-start gap-3 py-2 text-left overflow-hidden"
      >
        {/* A1 — shimmer sweep. Only renders during the check transition. */}
        {justChecked && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, color-mix(in oklch, var(--accent) 28%, transparent) 50%, transparent 100%)",
              animation: "row-shimmer 650ms ease-out forwards",
            }}
          />
        )}

        {/* A1 — icon crossfade with a single settled overshoot */}
        <span
          className={clsx(
            "mt-0.5 shrink-0 transition-colors duration-200 relative w-5 h-5",
            isDone ? "text-[var(--accent)]" : "text-[var(--color-fg-muted)]"
          )}
        >
          <AnimatePresence initial={false} mode="wait">
            {isDone ? (
              <motion.span
                key="done"
                className="absolute inset-0"
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: [0.82, 1.12, 1], opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0, rotate: -18 }}
                transition={{
                  duration: 0.34,
                  times: [0, 0.55, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CheckCircle size={20} weight="fill" />
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                className="absolute inset-0"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Circle size={20} weight="regular" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span className="min-w-0 flex-1">
          {/* A1 — label with animated strike-through pseudo overlay */}
          <span
            className={clsx(
              "relative inline-block leading-snug transition-colors duration-300",
              isDone && "text-[var(--color-fg-muted)]"
            )}
          >
            {item.label}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-current origin-left"
              style={{
                transform: isDone ? "scaleX(1)" : "scaleX(0)",
                transition: isDone
                  ? "transform 360ms cubic-bezier(0.22, 1, 0.36, 1) 80ms"
                  : "transform 160ms ease-in",
                opacity: 0.7,
              }}
            />
          </span>
          {item.hint && (
            <span className="block mt-1 text-[var(--color-fg-muted)]">
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

  // A2 — celebrate the transition from <100% to 100%.
  const [justComplete, setJustComplete] = useState(false);
  const [complete, setComplete] = useState(pct === 100);
  const prevPct = useRef(pct);
  useEffect(() => {
    if (pct === 100 && prevPct.current < 100) {
      setJustComplete(true);
      setComplete(true);
      const t = setTimeout(() => setJustComplete(false), 1400);
      prevPct.current = pct;
      return () => clearTimeout(t);
    }
    setComplete(pct === 100);
    prevPct.current = pct;
  }, [pct]);

  return (
    <Reveal>
      <Panel className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="label-xs text-[var(--color-fg-muted)]">
              {String(index + 1).padStart(2, "0")} · {group.title.toUpperCase()}
            </div>
            <div className="type-heading mt-2">{group.title}</div>
            {group.blurb && (
              <p className="mt-2 text-[var(--color-fg-muted)] max-w-xl">
                {group.blurb}
              </p>
            )}
          </div>
          <div className="text-right shrink-0">
            {/* A2 — label swaps to "✓ COMPLETE" chip when group is 100% done */}
            <div
              className={clsx(
                "label-xs transition-colors",
                complete
                  ? "text-[var(--accent)]"
                  : "text-[var(--color-fg-muted)]"
              )}
            >
              {complete ? (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden>✓</span>
                  <span>COMPLETE</span>
                </span>
              ) : (
                <span>
                  {completed} / {total}
                </span>
              )}
            </div>
            {/* A2 — progress bar + one-shot accent glow on completion */}
            <div
              className={clsx(
                "mt-1 w-20 h-1 rounded-full bg-[var(--line)] overflow-visible relative",
                justComplete && "progress-just-complete"
              )}
            >
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all duration-700 ease-out"
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
      </Panel>
    </Reveal>
  );
}
