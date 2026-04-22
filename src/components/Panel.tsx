import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * Panel — a solid elevated surface with a hairline border.
 *
 * Replaces the old GlassPanel: no backdrop-filter, no blur. Aligns with
 * the brand guideline "less is more" (v8.0, p.21-22) and keeps the canvas
 * quiet so content, typography, and photography can carry the work.
 */
export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "surface rounded-2xl p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
