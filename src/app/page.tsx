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
      <section className="relative min-h-[88svh] flex flex-col overflow-hidden">
        <div className="shell hero-pt pb-[var(--space-xl)] flex-1 flex flex-col justify-center">
          <div className="stack-md">
            <Reveal>
              <div className="kicker text-[var(--color-accent)]">WELCOME</div>
            </Reveal>

            <Reveal delay={0.15}>
              <h1 className="font-display display-lg">
                Welcome,
                <br />
                <span className="italic text-[var(--color-accent)]">{person.firstName}.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="lead-lg text-[var(--color-fg)]">
                A 90-day onboarding and leadership plan — from the{" "}
                <TrimbleDesignAPAC className="text-[var(--color-fg)]" /> team to our new{" "}
                <span className="text-[var(--color-fg)]">Senior UX Design Manager.</span>
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="flex flex-wrap items-center gap-[var(--space-xs)] pt-[var(--space-sm)]">
                <Link
                  href="/learn"
                  transitionTypes={["nav-forward"]}
                  className="group inline-flex items-center gap-[var(--space-xs)] px-5 py-3 rounded-full glass-selected text-[var(--color-fg)] text-[length:var(--text-md)] font-semibold hover:brightness-110 transition"
                >
                  Begin Chapter 01
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#team"
                  className="inline-flex items-center gap-[var(--space-xs)] px-5 py-3 rounded-full glass hover:bg-[var(--glass-highlight)] transition text-[length:var(--text-md)] font-semibold"
                >
                  <Compass size={18} weight="duotone" />
                  Meet the team first
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-[var(--space-md)] right-[var(--space-md)] kicker text-[var(--color-fg-muted)]">
          SCROLL ↓
        </div>
      </section>

      {/* ========== SLIDE REEL: About / Mission / Vision / Strategy ========== */}
      <section id="team">
        <SlideReel
          slides={[
            // 01 — About — huge brand lockup, left aligned
            <Slide key="about" index={0} total={4} kicker="ABOUT" align="left">
              <h2 className="font-display display-lg max-w-5xl">
                <TrimbleDesignAPAC />.
              </h2>
              <p className="lead-lg mt-8 text-[var(--color-fg)]/85">
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
              <h2 className="font-display display-md max-w-5xl">
                {team.mission.title}
              </h2>
              <p className="lead-md mt-8 text-[var(--color-fg-muted)]">
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
              <h2 className="font-display display-md max-w-5xl">
                {team.vision.title}
              </h2>
              <p className="lead-md mt-8 text-[var(--color-fg-muted)]">
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
              <h2 className="font-display display-sm max-w-4xl">
                {team.strategy.title}
              </h2>
              <div className="mt-12 grid md:grid-cols-3 gap-4 w-full">
                {team.strategy.pillars.map((pillar, i) => (
                  <div
                    key={pillar.name}
                    className="glass-soft rounded-xl p-6 h-full"
                  >
                    <div className="kicker tnum text-[var(--color-fg-muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="subhead-sm mt-3">
                      {pillar.name}
                    </div>
                    <p className="body-sm mt-3 text-[var(--color-fg-muted)]">
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
      <section className="relative shell section-y-md">
        <Reveal>
          <div className="kicker text-[var(--color-fg-muted)]">YOUR CREW</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-[var(--space-sm)] font-display display-sm max-w-4xl">
            You report to Victor.
            <br />
            <span className="text-[var(--color-fg-muted)]">Nawaz &amp; Prashanth have your back.</span>
          </h2>
        </Reveal>

        <div className="mt-[var(--space-lg)] grid md:grid-cols-3 gap-[var(--space-sm)] max-w-4xl">
          <PersonCard person={person.reportsTo} />
          {person.buddies.map((b) => (
            <PersonCard key={b.id} person={b} />
          ))}
        </div>
      </section>

      {/* ========== CHAPTER NAV ========== */}
      <section className="relative shell section-y-lg">
        <Reveal>
          <div className="kicker text-[var(--color-fg-muted)]">THE JOURNEY</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-[var(--space-sm)] font-display display-sm max-w-4xl">
            Three chapters.
            <br />
            Ninety days.
          </h2>
        </Reveal>

        <div className="mt-[var(--space-lg)] grid md:grid-cols-3 gap-[var(--space-md)]">
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
                <div className="absolute inset-0 p-[var(--space-md)] flex flex-col justify-between text-white">
                  <div className="flex items-start justify-end">
                    <div className="font-display display-xs tnum opacity-15">
                      {c.number}
                    </div>
                  </div>
                  <div className="stack-xs">
                    <div className="kicker text-[var(--color-accent)]">
                      {c.duration}
                    </div>
                    <div className="font-display display-xs">
                      {c.verb}.
                    </div>
                    <p className="body-sm opacity-85 max-w-[28ch]">
                      {c.tagline}
                    </p>
                    <div className="inline-flex items-center gap-[var(--space-2xs)] text-[length:var(--text-sm)] font-semibold pt-[var(--space-2xs)]">
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
      <footer className="relative border-t hairline">
        <div className="shell py-[var(--space-xl)]">
          <p className="font-display display-xs max-w-[32ch]">
            Made for {person.firstName}, by the <TrimbleDesignAPAC /> team.
          </p>
        </div>
      </footer>
    </>
  );
}
