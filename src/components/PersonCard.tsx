import Image from "next/image";
import type { Person } from "@/data/jay-plan";

export function PersonCard({ person }: { person: Person }) {
  const seed = person.avatarSeed ?? person.id;
  const hasPhoto = Boolean(person.photo);
  const src = hasPhoto
    ? (person.photo as string)
    : `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffb347,c96a2c,ffd4a3`;
  return (
    <div className="glass-soft rounded-xl p-4 flex items-start gap-4">
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
        <div className="text-[var(--color-fg-muted)] mt-1 font-light">{person.role}</div>
        {person.note && (
          <div className="text-[var(--color-fg)]/70 mt-2 italic font-light leading-snug">
            {person.note}
          </div>
        )}
      </div>
    </div>
  );
}
