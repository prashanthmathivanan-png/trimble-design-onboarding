import clsx from "clsx";

/**
 * The "Trimble Design APAC" brand lockup.
 * Renders in Helvetica with "Trimble" bolded and "Design APAC" regular.
 */
export function TrimbleDesignAPAC({ className }: { className?: string }) {
  return (
    <span className={clsx("font-helvetica whitespace-nowrap", className)}>
      <span className="font-bold">Trimble</span>
      <span className="font-normal"> Design APAC</span>
    </span>
  );
}
