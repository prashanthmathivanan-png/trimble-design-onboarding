import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ChapterHero } from "./ChapterHero";
import { ChecklistGroupView } from "./Checklist";
import { Reveal } from "./Reveal";
import { PersonCard } from "./PersonCard";
import { jayPlan, type Chapter } from "@/data/jay-plan";

const CHAPTER_ORDER = ["learn", "level", "lead"] as const;

export function ChapterPage({ chapter }: { chapter: Chapter }) {
  const idx = CHAPTER_ORDER.indexOf(chapter.slug);
  const prev = idx > 0 ? jayPlan.chapters[idx - 1] : null;
  const next = idx < CHAPTER_ORDER.length - 1 ? jayPlan.chapters[idx + 1] : null;

  const showLeaders = chapter.slug === "learn";

  return (
    <>
      <ChapterHero
        number={chapter.number}
        duration={chapter.duration}
        verb={chapter.verb}
        title={chapter.title}
        tagline={chapter.tagline}
        summary={chapter.summary}
        heroImage={chapter.heroImage}
      />

      {/* Checklist groups */}
      <section className="relative mx-auto max-w-[1600px] px-6 md:px-20 py-20">
        <div className="grid md:grid-cols-2 gap-5 auto-rows-fr">
          {chapter.groups.map((group, i) => (
            <ChecklistGroupView key={group.id} group={group} index={i} />
          ))}
        </div>
      </section>

      {/* Leaders callout (Learn chapter only) */}
      {showLeaders && (
        <section className="relative mx-auto max-w-[1600px] px-6 md:px-20 py-20">
          <Reveal>
            <div className="label-xs text-[var(--color-fg-muted)]">
              PEOPLE TO MEET
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 type-heading max-w-3xl">
              Leaders to sync with.
            </h2>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-2 gap-10">
            <div>
              <div className="label-xs text-[var(--color-accent)] mb-4">
                TUX GLOBAL
              </div>
              <div className="grid gap-3">
                {jayPlan.leaders.tuxGlobal.map((p) => (
                  <PersonCard key={p.id} person={p} />
                ))}
              </div>
            </div>
            <div>
              <div className="label-xs text-[var(--color-accent)] mb-4">
                INDIA LEADERSHIP
              </div>
              <div className="grid gap-3">
                {jayPlan.leaders.indiaLeadership.map((p) => (
                  <PersonCard key={p.id} person={p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Chapter-to-chapter nav */}
      <section className="relative mx-auto max-w-[1600px] px-6 md:px-20 py-24 border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {prev ? (
            <Link
              href={`/${prev.slug}`}
              transitionTypes={["nav-back"]}
              className="group flex items-center gap-4 text-left"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="label-xs text-[var(--color-fg-muted)]">
                  PREVIOUS · {prev.number}
                </div>
                <div className="font-semibold mt-1">{prev.verb}.</div>
              </div>
            </Link>
          ) : (
            <Link
              href="/"
              transitionTypes={["nav-back"]}
              className="group flex items-center gap-4 text-left"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="label-xs text-[var(--color-fg-muted)]">
                  PREVIOUS · 00
                </div>
                <div className="font-semibold mt-1">Welcome.</div>
              </div>
            </Link>
          )}

          {next && (
            <Link
              href={`/${next.slug}`}
              transitionTypes={["nav-forward"]}
              className="group flex items-center gap-4 text-right"
            >
              <div>
                <div className="label-xs text-[var(--color-fg-muted)]">
                  NEXT · {next.number}
                </div>
                <div className="font-semibold mt-1">{next.verb}.</div>
              </div>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>

      <footer className="relative border-t hairline">
        <div className="mx-auto max-w-[1600px] px-6 md:px-20 py-12 label-xs text-[var(--color-fg-muted)]">
          Jay's Quarterly Onboarding & Leadership Plan · Chapter {chapter.number}
        </div>
      </footer>
    </>
  );
}
