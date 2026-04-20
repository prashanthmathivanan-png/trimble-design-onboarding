"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

type Props = {
  number: string;
  duration: string;
  verb: string;
  title: string;
  tagline: string;
  summary: string;
  heroImage: string;
};

export function ChapterHero({
  number,
  duration,
  verb,
  title,
  tagline,
  summary,
  heroImage,
}: Props) {
  return (
    <section className="relative min-h-[78svh] overflow-hidden flex flex-col">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/50 via-[var(--color-bg)]/20 to-[var(--color-bg)]" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(255,179,71,0.12), transparent 55%)",
        }}
      />

      <div className="relative shell hero-pt pb-[var(--space-xl)] flex-1 flex flex-col justify-center">
        <div className="flex items-start gap-[var(--space-md)] mb-[var(--space-md)]">
          <Reveal>
            <div className="font-display display-2xl tnum opacity-15 select-none leading-none">
              {number}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pt-[var(--space-xs)] stack-3xs">
              <div className="kicker text-[var(--color-fg-muted)]">
                {verb.toUpperCase()}
              </div>
              <div className="kicker text-[var(--color-accent)]">
                {duration}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="stack-md">
          <Reveal delay={0.15}>
            <h1 className="font-display display-lg max-w-5xl">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="lead-lg text-[var(--color-fg-muted)]">
              {tagline}
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <p className="body-md text-[var(--color-fg)]/85 pt-[var(--space-xs)]">
              {summary}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
