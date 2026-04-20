"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const CHAPTERS = [
  { href: "/", label: "Welcome", num: "00" },
  { href: "/learn", label: "Learn", num: "01" },
  { href: "/level", label: "Level", num: "02" },
  { href: "/lead", label: "Lead", num: "03" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="shell pt-[var(--space-sm)]">
        <div className="glass-bare rounded-full flex items-center justify-end gap-[var(--space-sm)] px-[var(--space-sm)] py-[var(--space-2xs)] text-[var(--color-fg)]">
          <nav className="flex items-center gap-1">
            {CHAPTERS.map((c) => {
              const active = pathname === c.href;
              const currentIdx = CHAPTERS.findIndex(
                (x) => x.href === pathname
              );
              const targetIdx = CHAPTERS.findIndex((x) => x.href === c.href);
              const direction =
                targetIdx > currentIdx ? "nav-forward" : "nav-back";
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  // @ts-expect-error — transitionTypes is a Next 16 feature not yet in the types
                  transitionTypes={[direction]}
                  className={clsx(
                    "kicker px-3 py-1.5 rounded-full transition-all flex items-center gap-2",
                    active
                      ? "glass-selected text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  )}
                >
                  <span className="tnum opacity-60">{c.num}</span>
                  <span>{c.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
