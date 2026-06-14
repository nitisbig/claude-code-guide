import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { LearningPath } from "@/components/learn/LearningPath";
import { getFirstConcept, TOTAL_CONCEPTS } from "@/lib/navigation";

export default function HomePage() {
  const first = getFirstConcept();

  return (
    <main id="main">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1 text-xs font-medium text-fg-muted">
          <BookOpen className="size-3.5 text-accent" aria-hidden />
          A practical, hands-on guide
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Learn Claude Code,{" "}
          <span className="text-accent">the practical way</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-fg-muted">
          Master the core concepts — installation, MCP, skills, subagents,
          commands — and the workflows that make them click. Clear explanations,
          real examples, no fluff.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/learn/${first.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Start learning
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="#path"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
          >
            Browse the path
          </Link>
        </div>
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg-subtle">
          <Clock className="size-4" aria-hidden />
          {TOTAL_CONCEPTS} lessons across 4 sections
        </p>
      </section>

      {/* Learning path */}
      <section
        id="path"
        className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-24 sm:px-6"
      >
        <LearningPath />
      </section>
    </main>
  );
}
