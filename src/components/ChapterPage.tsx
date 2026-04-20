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
      <section className="relative shell section-y-md">
        <div className="grid md:grid-cols-2 gap-[var(--space-md)] auto-rows-fr">
          {chapter.groups.map((group, i) => (
            <ChecklistGroupView key={group.id} group={group} index={i} />
          ))}
        </div>
      </section>

      {/* Leaders callout (Learn chapter only) */}
      {showLeaders && (
        <section className="relative shell section-y-md">
          <div className="grid md:grid-cols-12 gap-[var(--space-lg)] items-start">
            <div className="md:col-span-4 stack-md md:sticky md:top-[var(--space-xl)]">
              <Reveal>
                <div className="kicker text-[var(--color-fg-muted)]">
                  PEOPLE TO MEET
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display display-sm">
                  Leaders to sync with.
                </h2>
              </Reveal>
            </div>

            <div className="md:col-span-8 grid md:grid-cols-2 gap-[var(--space-md)]">
              <div className="stack-sm">
                <div className="kicker text-[var(--color-accent)]">
                  TUX GLOBAL
                </div>
                <div className="grid gap-[var(--space-2xs)]">
                  {jayPlan.leaders.tuxGlobal.map((p) => (
                    <PersonCard key={p.id} person={p} />
                  ))}
                </div>
              </div>
              <div className="stack-sm">
                <div className="kicker text-[var(--color-accent)]">
                  INDIA LEADERSHIP
                </div>
                <div className="grid gap-[var(--space-2xs)]">
                  {jayPlan.leaders.indiaLeadership.map((p) => (
                    <PersonCard key={p.id} person={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Chapter-to-chapter nav */}
      <section className="relative shell section-y-sm border-t hairline">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[var(--space-md)]">
          {prev ? (
            <Link
              href={`/${prev.slug}`}
              transitionTypes={["nav-back"]}
              className="group flex items-center gap-[var(--space-sm)] text-left"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="kicker tnum text-[var(--color-fg-muted)]">
                  PREVIOUS · {prev.number}
                </div>
                <div className="subhead-sm mt-[var(--space-2xs)]">{prev.verb}.</div>
              </div>
            </Link>
          ) : (
            <Link
              href="/"
              transitionTypes={["nav-back"]}
              className="group flex items-center gap-[var(--space-sm)] text-left"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="kicker tnum text-[var(--color-fg-muted)]">
                  PREVIOUS · 00
                </div>
                <div className="subhead-sm mt-[var(--space-2xs)]">Welcome.</div>
              </div>
            </Link>
          )}

          {next && (
            <Link
              href={`/${next.slug}`}
              transitionTypes={["nav-forward"]}
              className="group flex items-center gap-[var(--space-sm)] text-right"
            >
              <div>
                <div className="kicker tnum text-[var(--color-fg-muted)]">
                  NEXT · {next.number}
                </div>
                <div className="subhead-sm mt-[var(--space-2xs)]">{next.verb}.</div>
              </div>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>

      <footer className="relative border-t hairline">
        <div className="shell py-[var(--space-lg)] kicker tnum text-[var(--color-fg-muted)]">
          Jay&apos;s Quarterly Onboarding &amp; Leadership Plan · Chapter {chapter.number}
        </div>
      </footer>
    </>
  );
}
