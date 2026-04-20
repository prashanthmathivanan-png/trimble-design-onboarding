import { ChapterPage } from "@/components/ChapterPage";
import { jayPlan } from "@/data/jay-plan";

export default function LevelPage() {
  const chapter = jayPlan.chapters.find((c) => c.slug === "level")!;
  return <ChapterPage chapter={chapter} />;
}
