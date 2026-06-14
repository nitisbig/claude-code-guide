import { cn } from "@/lib/utils";

/**
 * Card — a quiet container with a subtle hover lift. Renders as <div>
 * by default; pass `asChild`-style usage via the `interactive` prop to
 * get hover affordances for clickable cards (wrap in a Link yourself).
 */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5 transition-colors",
        interactive &&
          "hover:border-fg-subtle/40 hover:bg-bg-subtle focus-within:border-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
