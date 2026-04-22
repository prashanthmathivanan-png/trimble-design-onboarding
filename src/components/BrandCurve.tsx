import clsx from "clsx";

/**
 * BrandCurve — Trimble's signature "confidence at every turn" arc.
 *
 * Brand guidelines v8.0 (p.31) call out "The curve" as a core visual
 * device: a single, confident sweep that communicates motion and
 * unfolding journey. Used intentionally, never as background noise.
 *
 * Two variants:
 *   - `hero`    atmospheric arc anchored in a viewport corner
 *   - `journey` a thin arc with three markers tracing the 90-day path
 */

type CurveVariant = "hero" | "journey";
type CurveTone = "accent" | "secondary" | "muted";

const TONE: Record<CurveTone, string> = {
  accent: "var(--color-accent)",
  secondary: "var(--color-accent-secondary)",
  muted: "var(--color-fg-muted)",
};

export function BrandCurve({
  variant,
  tone = "accent",
  className,
}: {
  variant: CurveVariant;
  tone?: CurveTone;
  className?: string;
}) {
  const stroke = TONE[tone];

  if (variant === "journey") {
    // Ascending arc: a 90-day climb from Welcome (low-left) through
    // Level (mid) to Lead (high-right). Spans edge-to-edge of the
    // viewport and fades in/out at each side so it reads as a
    // fragment of a much longer journey.
    const gradientId = `journey-fade-${tone}`;

    return (
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className={clsx("block w-full h-[56px] md:h-[72px]", className)}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={stroke} stopOpacity="0" />
            <stop offset="12%" stopColor={stroke} stopOpacity="0.9" />
            <stop offset="88%" stopColor={stroke} stopOpacity="0.9" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 70 C 400 65, 800 10, 1200 5"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  // Hero variant — a large, confident arc sweeping through the negative
  // space to the right of the hero copy. Stretches with the viewport
  // via preserveAspectRatio="none" but the stroke stays crisp thanks to
  // vectorEffect="non-scaling-stroke".
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      className={clsx(
        "absolute inset-0 w-full h-full pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      <path
        d="M 720 -40 C 1600 40, 1620 520, 1480 1000"
        stroke={stroke}
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.4"
      />
    </svg>
  );
}
