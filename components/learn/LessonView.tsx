"use client";

import type { Concept } from "@/lib/concepts";
import { getLessonHeadings } from "@/lib/concepts";
import { useReadingMode } from "@/lib/reading-mode";
import { LessonHeader } from "./LessonHeader";
import { BlockRenderer } from "./BlockRenderer";
import { Pagination } from "@/components/ui/Pagination";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { cn } from "@/lib/utils";

/**
 * LessonView — the reading column + "on this page" TOC for a single
 * lesson. Reading mode centers the column and hides the TOC. Rendered by
 * the server lesson page, which supplies the concept and adjacent links.
 */
export function LessonView({
  concept,
  prev,
  next,
}: {
  concept: Concept;
  prev: Concept | null;
  next: Concept | null;
}) {
  const { readingMode } = useReadingMode();
  const headings = getLessonHeadings(concept);

  return (
    <div className={cn("flex gap-12", readingMode && "justify-center")}>
      <article className="w-full max-w-reading">
        <LessonHeader concept={concept} />
        <div className="prose prose-base max-w-none">
          <BlockRenderer blocks={concept.body} />
        </div>
        <Pagination prev={prev} next={next} />
      </article>

      {!readingMode && headings.length > 0 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <div className="sticky top-20">
            <TableOfContents items={headings} />
          </div>
        </aside>
      )}
    </div>
  );
}
