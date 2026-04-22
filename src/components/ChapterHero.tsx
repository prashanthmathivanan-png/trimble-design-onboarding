"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
  // B3 — ghost number drifts slower than the page scroll for subtle depth.
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={heroRef} className="relative min-h-[92vh] overflow-hidden">
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
            <motion.div
              style={{ y: ghostY }}
              className="type-display opacity-15 select-none will-change-transform"
            >
              {number}
            </motion.div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pt-4">
              <div className="label-xs text-[var(--color-fg-muted)]">
                {verb.toUpperCase()}
              </div>
              <div className="label-xs text-[var(--color-accent-secondary)] mt-1">
                {duration}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <h1 className="type-display max-w-5xl">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-[var(--color-fg-muted)] font-light">
            {tagline}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-10 max-w-xl text-[var(--color-fg)]/80">
            {summary}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
