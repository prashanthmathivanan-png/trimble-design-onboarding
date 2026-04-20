import { ChapterPage } from "@/components/ChapterPage";
import { jayPlan } from "@/data/jay-plan";

export default function LearnPage() {
  const chapter = jayPlan.chapters.find((c) => c.slug === "learn")!;
  return <ChapterPage chapter={chapter} />;
}
