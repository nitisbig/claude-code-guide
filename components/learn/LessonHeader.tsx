import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import type { Concept } from "@/lib/concepts";
import { getSection } from "@/lib/navigation";
import { DifficultyBadge } from "@/components/ui/Badge";

/**
 * LessonHeader — breadcrumb, title, summary, and meta (difficulty + time)
 * shown at the top of every lesson.
 */
export function LessonHeader({ concept }: { concept: Concept }) {
  const section = getSection(concept.sectionId);

  return (
    <header className="mb-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-1.5 text-sm text-fg-subtle"
      >
        <Link href="/" className="transition-colors hover:text-fg">
          Home
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span>{section?.title}</span>
      </nav>

      <h1 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {concept.title}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-fg-muted">
        {concept.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={concept.difficulty} />
        <span className="inline-flex items-center gap-1 text-xs text-fg-subtle">
          <Clock className="size-3.5" aria-hidden />
          {concept.estMinutes} min read
        </span>
      </div>
    </header>
  );
}
