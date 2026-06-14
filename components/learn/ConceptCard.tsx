import Link from "next/link";
import { Clock } from "lucide-react";
import type { Concept } from "@/lib/concepts";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

/**
 * ConceptCard — a single lesson preview used on the landing learning-path.
 * The whole card is a link to the lesson.
 */
export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <Link href={`/learn/${concept.slug}`} className="block">
      <Card interactive className="h-full">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-accent">
            <Icon name={concept.icon} className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 className="font-medium text-fg">{concept.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">
              {concept.summary}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={concept.difficulty} />
              <span className="inline-flex items-center gap-1 text-xs text-fg-subtle">
                <Clock className="size-3.5" aria-hidden />
                {concept.estMinutes} min
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
