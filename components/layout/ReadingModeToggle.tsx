"use client";

import { BookOpen, Maximize2 } from "lucide-react";
import { useReadingMode } from "@/lib/reading-mode";
import { cn } from "@/lib/utils";

/**
 * ReadingModeToggle — hides the sidebar + TOC for a distraction-free,
 * centered reading column. Only meaningful on lesson pages.
 */
export function ReadingModeToggle({ className }: { className?: string }) {
  const { readingMode, toggleReadingMode } = useReadingMode();

  return (
    <button
      type="button"
      onClick={toggleReadingMode}
      aria-pressed={readingMode}
      title={readingMode ? "Exit reading mode" : "Enter reading mode"}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full border border-border text-fg-subtle transition-colors hover:text-fg",
        readingMode && "bg-bg-subtle text-fg",
        className,
      )}
    >
      {readingMode ? (
        <Maximize2 className="size-4" aria-hidden />
      ) : (
        <BookOpen className="size-4" aria-hidden />
      )}
      <span className="sr-only">
        {readingMode ? "Exit reading mode" : "Enter reading mode"}
      </span>
    </button>
  );
}
