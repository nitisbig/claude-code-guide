import Link from "next/link";

/**
 * Footer — quiet, minimal site footer.
 */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Claude Code Guide — a community learning resource. Not affiliated with
          Anthropic.
        </p>
        <Link
          href="/learn/introduction"
          className="text-fg-muted transition-colors hover:text-fg"
        >
          Start learning →
        </Link>
      </div>
    </footer>
  );
}
