import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Concept } from "@/lib/concepts";
import { cn } from "@/lib/utils";

/**
 * Pagination — prev/next lesson links, derived from the concept order.
 * Renders a two-column row that collapses to a single column on mobile.
 */
export function Pagination({
  prev,
  next,
}: {
  prev: Concept | null;
  next: Concept | null;
}) {
  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <PaginationLink concept={prev} direction="prev" />
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <PaginationLink concept={next} direction="next" />
      ) : (
        <span className="hidden sm:block" />
      )}
    </nav>
  );
}

function PaginationLink({
  concept,
  direction,
}: {
  concept: Concept;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/learn/${concept.slug}`}
      className={cn(
        "group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:border-fg-subtle/40 hover:bg-bg-subtle",
        isNext && "sm:text-right",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-xs text-fg-subtle",
          isNext && "sm:justify-end",
        )}
      >
        {!isNext && <ArrowLeft className="size-3.5" aria-hidden />}
        {isNext ? "Next" : "Previous"}
        {isNext && <ArrowRight className="size-3.5" aria-hidden />}
      </span>
      <span className="font-medium text-fg transition-colors group-hover:text-accent">
        {concept.title}
      </span>
    </Link>
  );
}
