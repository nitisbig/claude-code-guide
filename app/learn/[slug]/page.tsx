import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getConcept,
  getAdjacentConcepts,
} from "@/lib/navigation";
import { LessonView } from "@/components/learn/LessonView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render every lesson at build time from the registry. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) return { title: "Not found" };
  return {
    title: concept.title,
    description: concept.summary,
    openGraph: { title: concept.title, description: concept.summary },
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  const { prev, next } = getAdjacentConcepts(slug);

  return <LessonView concept={concept} prev={prev} next={next} />;
}
