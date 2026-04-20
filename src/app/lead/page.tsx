import { ChapterPage } from "@/components/ChapterPage";
import { jayPlan } from "@/data/jay-plan";

export default function LeadPage() {
  const chapter = jayPlan.chapters.find((c) => c.slug === "lead")!;
  return <ChapterPage chapter={chapter} />;
}
