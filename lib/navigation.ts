/**
 * Navigation — the single source of truth for app structure.
 *
 * Everything navigational derives from the concept registry in
 * `concepts.ts`: the sidebar, the landing learning-path, route
 * generation, and prev/next pagination. Add a concept there and it
 * appears everywhere automatically — no edits needed here.
 */
import { CONCEPTS, SECTIONS, type Concept, type Section } from "./concepts";

export type NavSection = Section & { concepts: Concept[] };

/** Concepts grouped by section, preserving SECTIONS order. */
export function getNavTree(): NavSection[] {
  return SECTIONS.map((section) => ({
    ...section,
    concepts: CONCEPTS.filter((c) => c.sectionId === section.id),
  }));
}

/** All concepts in canonical reading order (section order, then list order). */
export function getOrderedConcepts(): Concept[] {
  return getNavTree().flatMap((section) => section.concepts);
}

/** All slugs — used by generateStaticParams. */
export function getAllSlugs(): string[] {
  return CONCEPTS.map((c) => c.slug);
}

/** Look up a single concept by slug. */
export function getConcept(slug: string): Concept | undefined {
  return CONCEPTS.find((c) => c.slug === slug);
}

/** Resolve a section by id. */
export function getSection(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}

/** Previous/next concept in reading order, for pagination. */
export function getAdjacentConcepts(slug: string): {
  prev: Concept | null;
  next: Concept | null;
} {
  const ordered = getOrderedConcepts();
  const index = ordered.findIndex((c) => c.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

/** The first concept — target of the landing "Start learning" CTA. */
export function getFirstConcept(): Concept {
  return getOrderedConcepts()[0];
}

export const TOTAL_CONCEPTS = CONCEPTS.length;
