"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useReadingMode } from "@/lib/reading-mode";
import { cn } from "@/lib/utils";

/**
 * Docs shell for all /learn/* pages: left sidebar + content area.
 * The per-page "on this page" TOC lives inside each lesson view.
 * Reading mode collapses the sidebar for a distraction-free column.
 */
export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { readingMode } = useReadingMode();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className={cn("flex", !readingMode && "lg:gap-8")}>
        {!readingMode && <Sidebar />}
        <main id="main" className="min-w-0 flex-1 py-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
