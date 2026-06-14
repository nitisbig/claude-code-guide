"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; text: string };

/**
 * TableOfContents — "on this page" right rail with scroll-spy.
 * Highlights the heading currently in view. Hidden in reading mode by
 * the parent lesson view.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        On this page
      </p>
      <ul className="flex flex-col gap-1 border-l border-border">
        {items.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 transition-colors",
                activeId === id
                  ? "border-accent font-medium text-fg"
                  : "border-transparent text-fg-subtle hover:border-fg-subtle/40 hover:text-fg-muted",
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
