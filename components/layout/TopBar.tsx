"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { ReadingModeToggle } from "./ReadingModeToggle";

/**
 * TopBar — global, sticky, low-chrome header.
 * Shows the lesson drawer + reading-mode toggle only on /learn routes.
 */
export function TopBar() {
  const pathname = usePathname();
  const onLesson = pathname.startsWith("/learn");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {onLesson && <MobileNav />}

        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-fg"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-accent text-accent-fg">
            <Terminal className="size-4" aria-hidden />
          </span>
          <span className="hidden sm:inline">Claude Code Guide</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 text-sm">
          <Link
            href="/learn/introduction"
            className="rounded-md px-3 py-1.5 text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
          >
            Learn
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {onLesson && <ReadingModeToggle />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
