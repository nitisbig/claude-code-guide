import { getNavTree } from "@/lib/navigation";
import { ConceptCard } from "./ConceptCard";

/**
 * LearningPath — the full, sectioned overview of every lesson, shown on
 * the landing page. Derives entirely from the concept registry.
 */
export function LearningPath() {
  const tree = getNavTree();

  return (
    <div className="flex flex-col gap-14">
      {tree.map((section, index) => (
        <section key={section.id} aria-labelledby={`section-${section.id}`}>
          <div className="mb-5 flex items-baseline gap-3">
            <span className="font-mono text-sm text-fg-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2
                id={`section-${section.id}`}
                className="text-xl font-semibold text-fg"
              >
                {section.title}
              </h2>
              <p className="mt-0.5 text-sm text-fg-muted">
                {section.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {section.concepts.map((concept) => (
              <ConceptCard key={concept.slug} concept={concept} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
