import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/concepts";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

/** Neutral, low-emphasis pill. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-bg-subtle px-2 py-0.5 text-xs font-medium text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const difficultyStyles: Record<Difficulty, string> = {
  beginner: "text-emerald-600 dark:text-emerald-400",
  intermediate: "text-amber-600 dark:text-amber-400",
  advanced: "text-rose-600 dark:text-rose-400",
};

const difficultyLabel: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

/** Difficulty pill with a small colored dot. */
export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <Badge className={className}>
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full bg-current",
          difficultyStyles[difficulty],
        )}
      />
      {difficultyLabel[difficulty]}
    </Badge>
  );
}
