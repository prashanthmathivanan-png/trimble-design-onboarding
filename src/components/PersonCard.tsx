import Image from "next/image";
import clsx from "clsx";
import type { Person } from "@/data/jay-plan";

export function PersonCard({
  person,
  featured = false,
}: {
  person: Person;
  featured?: boolean;
}) {
  const seed = person.avatarSeed ?? person.id;
  const avatarSize = featured ? "w-20 h-20" : "w-14 h-14";
  return (
    <div
      className={clsx(
        "glass-soft rounded-xl flex items-start h-full",
        featured
          ? "p-[var(--space-md)] gap-[var(--space-md)] flex-col"
          : "p-[var(--space-sm)] gap-[var(--space-sm)] flex-row"
      )}
    >
      <div className={clsx("relative rounded-full overflow-hidden shrink-0 bg-[var(--color-bg-elev)]", avatarSize)}>
        <Image
          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffb347,c96a2c,ffd4a3`}
          alt={person.name}
          fill
          sizes={featured ? "80px" : "56px"}
          unoptimized
        />
      </div>
      <div className="min-w-0">
        <div
          className={clsx(
            "font-semibold leading-tight tracking-[-0.005em]",
            featured ? "text-[length:var(--text-xl)]" : "text-[length:var(--text-md)]"
          )}
        >
          {person.name}
        </div>
        <div
          className={clsx(
            "text-[var(--color-fg-muted)] mt-[var(--space-3xs)] leading-snug",
            featured ? "text-[length:var(--text-md)]" : "text-[length:var(--text-sm)]"
          )}
        >
          {person.role}
        </div>
        {person.note && (
          <div
            className={clsx(
              "text-[var(--color-fg)]/80 italic leading-snug",
              featured
                ? "text-[length:var(--text-md)] mt-[var(--space-md)] max-w-[36ch]"
                : "text-[length:var(--text-sm)] mt-[var(--space-2xs)]"
            )}
          >
            {person.note}
          </div>
        )}
      </div>
    </div>
  );
}
