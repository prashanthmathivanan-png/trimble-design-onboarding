import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { PersonCard } from "@/components/PersonCard";
import { TrimbleDesignAPAC } from "@/components/TrimbleDesignAPAC";
import { SlideReel, Slide } from "@/components/SlideReel";
import { jayPlan } from "@/data/jay-plan";

export default function WelcomePage() {
  const { person, team, chapters } = jayPlan;

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="relative mx-auto max-w-[1600px] px-6 md:px-20 pt-40 md:pt-56 pb-24">
          <Reveal>
            <div className="label-xs text-[var(--color-accent)]">WELCOME</div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="mt-6 type-display">
              Welcome,
              <br />
              <span className="italic text-[var(--color-accent)]">{person.firstName}.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-10 max-w-xl text-[var(--color-fg)]/85 font-light">
              A 90-day onboarding and leadership plan — from the{" "}
              <TrimbleDesignAPAC className="text-[var(--color-fg)]" /> team to our new{" "}
              <span className="text-[var(--color-fg)]">Senior UX Design Manager.</span>
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/learn"
                transitionTypes={["nav-forward"]}
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-full glass-selected text-[var(--color-fg)] font-semibold hover:brightness-110 transition"
              >
                Begin Chapter 01
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#team"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:bg-[var(--glass-highlight)] transition"
              >
                <Compass size={16} weight="duotone" />
                Meet the team first
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 label-xs text-[var(--color-fg-muted)]">
          SCROLL ↓
        </div>
      </section>

      {/* ========== SLIDE REEL: About / Mission / Vision / Strategy ========== */}
      <section id="team">
        <SlideReel
          slides={[
            // 01 — About — huge brand lockup, left aligned
            <Slide key="about" index={0} total={4} kicker="ABOUT" align="left">
              <h2 className="type-display max-w-5xl">
                <TrimbleDesignAPAC />.
              </h2>
              <p className="mt-10 max-w-2xl text-[var(--color-fg)]/80 font-light">
                {team.about}
              </p>
            </Slide>,

            // 02 — Mission
            <Slide
              key="mission"
              index={1}
              total={4}
              kicker="MISSION"
              align="left"
            >
              <h2 className="type-heading max-w-5xl">
                {team.mission.title}
              </h2>
              <p className="mt-10 max-w-2xl text-[var(--color-fg-muted)] font-light">
                {team.mission.body}
              </p>
            </Slide>,

            // 03 — Vision
            <Slide
              key="vision"
              index={2}
              total={4}
              kicker="VISION"
              align="left"
            >
              <h2 className="type-heading max-w-5xl">
                {team.vision.title}
              </h2>
              <p className="mt-10 max-w-2xl text-[var(--color-fg-muted)] font-light">
                {team.vision.body}
              </p>
            </Slide>,

            // 04 — Strategy + 3 pillars inline
            <Slide
              key="strategy"
              index={3}
              total={4}
              kicker="STRATEGY"
              align="left"
            >
              <h2 className="type-heading max-w-4xl">
                {team.strategy.title}
              </h2>
              <div className="mt-12 grid md:grid-cols-3 gap-4 w-full">
                {team.strategy.pillars.map((pillar, i) => (
                  <div
                    key={pillar.name}
                    className="glass-soft rounded-xl p-6 h-full"
                  >
                    <div className="label-xs text-[var(--color-fg-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 font-semibold">
                      {pillar.name}
                    </div>
                    <p className="mt-3 text-[var(--color-fg-muted)] font-light">
                      {pillar.body}
                    </p>
                  </div>
                ))}
              </div>
            </Slide>,
          ]}
        />
      </section>

      {/* ========== YOUR CREW ========== */}
      <section className="relative mx-auto max-w-[1600px] px-6 md:px-20 py-32">
        <Reveal>
          <div className="label-xs text-[var(--color-fg-muted)]">YOUR CREW</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 type-heading max-w-4xl">
            You report to Victor.
            <br />
            <span className="text-[var(--color-fg-muted)]">Nawaz &amp; Prashanth have your back.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-4 max-w-4xl">
          <PersonCard person={person.reportsTo} />
          {person.buddies.map((b) => (
            <PersonCard key={b.id} person={b} />
          ))}
        </div>
      </section>

      {/* ========== CHAPTER NAV ========== */}
      <section className="relative mx-auto max-w-[1600px] px-6 md:px-20 py-32">
        <Reveal>
          <div className="label-xs text-[var(--color-fg-muted)]">THE JOURNEY</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 type-heading max-w-4xl">
            Three chapters.
            <br />
            Ninety days.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {chapters.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <Link
                href={`/${c.slug}`}
                transitionTypes={["nav-forward"]}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
              >
                <Image
                  src={c.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex items-start justify-end">
                    <div className="type-heading opacity-15">
                      {c.number}
                    </div>
                  </div>
                  <div>
                    <div className="label-xs text-[var(--color-accent)] mb-2">
                      {c.duration}
                    </div>
                    <div className="type-heading">
                      {c.verb}.
                    </div>
                    <p className="mt-3 opacity-80 max-w-xs font-light">
                      {c.tagline}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 font-semibold">
                      Enter chapter
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative border-t hairline mt-20">
        <div className="mx-auto max-w-[1600px] px-6 md:px-20 py-16">
          <p className="type-heading max-w-xl">
            Made for {person.firstName}, by the <TrimbleDesignAPAC /> team.
          </p>
        </div>
      </footer>
    </>
  );
}
