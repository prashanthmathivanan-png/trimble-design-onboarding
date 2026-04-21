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
    <section className="relative min-h-[92vh] overflow-hidden">
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

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-20 pt-40 md:pt-56 pb-20">
        <div className="flex items-start gap-8 mb-6">
          <Reveal>
            <div className="font-display text-[10rem] md:text-[15rem] leading-[0.85] tracking-tighter opacity-15 select-none">
              {number}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pt-4">
              <div className="label-xs text-[var(--color-fg-muted)]">
                {verb.toUpperCase()}
              </div>
              <div className="label-xs text-[var(--color-accent)] mt-1">
                {duration}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 text-xl md:text-2xl max-w-2xl text-[var(--color-fg-muted)] leading-snug font-light">
            {tagline}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-10 max-w-xl text-base text-[var(--color-fg)]/80 leading-relaxed">
            {summary}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
