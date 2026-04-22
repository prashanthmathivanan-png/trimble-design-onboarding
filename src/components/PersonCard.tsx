import Image from "next/image";
import clsx from "clsx";
import type { Person } from "@/data/jay-plan";

type PersonCardVariant = "compact" | "featured";

export function PersonCard({
  person,
  variant = "compact",
}: {
  person: Person;
  variant?: PersonCardVariant;
}) {
  const seed = person.avatarSeed ?? person.id;
  const hasPhoto = Boolean(person.photo);
  const src = hasPhoto
    ? (person.photo as string)
    : `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffb347,c96a2c,ffd4a3`;

  if (variant === "featured") {
    // Breaking Frames (brand guidelines v8.0 p.33): the portrait
    // intentionally overlaps the card's top edge, escaping the
    // rectangle to create visual energy and a clear hero-person read.
    return (
      <div className="relative pt-12 md:pt-14">
        <div className="surface rounded-2xl px-6 md:px-7 pb-6 md:pb-7 pt-12 md:pt-14 h-full">
          <div
            className="absolute top-0 left-6 md:left-7 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden
                       ring-4 ring-[var(--color-bg)] bg-[var(--color-bg-elev)]"
          >
            <Image
              src={src}
              alt={person.name}
              fill
              sizes="(min-width: 768px) 96px, 80px"
              unoptimized={!hasPhoto}
              className="object-cover"
            />
          </div>

          <div className="font-semibold leading-tight text-lg md:text-xl">
            {person.name}
          </div>
          <div className="text-[var(--color-fg-muted)] mt-1 text-sm">
            {person.role}
          </div>
          {person.note && (
            <div className="text-[var(--color-fg)]/85 mt-4 italic font-light leading-snug text-sm border-t border-[var(--color-line)] pt-4">
              {person.note}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("surface rounded-xl p-4 flex items-start gap-4")}>
      <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-[var(--color-bg-elev)]">
        <Image
          src={src}
          alt={person.name}
          fill
          sizes="56px"
          unoptimized={!hasPhoto}
        />
      </div>
      <div className="min-w-0">
        <div className="font-semibold leading-tight">{person.name}</div>
        <div className="text-[var(--color-fg-muted)] mt-1 text-sm">{person.role}</div>
        {person.note && (
          <div className="text-[var(--color-fg)]/80 mt-2 italic font-light leading-snug text-sm">
            {person.note}
          </div>
        )}
      </div>
    </div>
  );
}
