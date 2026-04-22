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
    // Level (mid) to Lead (high-right). Markers at 16.6%, 50%, 83.3%
    // sit on the curve; y-values are pre-computed from the cubic.
    const markers: Array<{ cx: number; cy: number }> = [
      { cx: 200, cy: 64 },
      { cx: 600, cy: 37 },
      { cx: 1000, cy: 11 },
    ];

    return (
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className={clsx("block w-full h-[56px] md:h-[72px]", className)}
        aria-hidden="true"
      >
        <path
          d="M 0 70 C 400 65, 800 10, 1200 5"
          stroke={stroke}
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.9"
        />
        {markers.map((m, i) => (
          <circle
            key={i}
            cx={m.cx}
            cy={m.cy}
            r="4"
            fill={stroke}
          />
        ))}
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
