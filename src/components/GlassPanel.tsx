import clsx from "clsx";
import type { ReactNode } from "react";

export function GlassPanel({
  children,
  className,
  soft,
}: {
  children: ReactNode;
  className?: string;
  soft?: boolean;
}) {
  return (
    <div
      className={clsx(
        soft ? "glass-soft" : "glass",
        "rounded-2xl p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
