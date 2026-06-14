import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "note" | "tip" | "warning";

const config: Record<
  Variant,
  { icon: typeof Info; label: string; accent: string }
> = {
  note: {
    icon: Info,
    label: "Note",
    accent: "border-l-sky-500/70 text-sky-600 dark:text-sky-400",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    accent: "border-l-emerald-500/70 text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: TriangleAlert,
    label: "Warning",
    accent: "border-l-amber-500/70 text-amber-600 dark:text-amber-400",
  },
};

/**
 * Callout — note / tip / warning block for highlighting key guidance
 * inside lessons. Kept low-saturation to fit the minimal aesthetic.
 */
export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: IconCmp, label, accent } = config[variant];
  return (
    <div
      className={cn(
        "not-prose my-6 rounded-r-lg border border-l-4 border-border bg-bg-subtle p-4",
        accent,
      )}
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        <IconCmp className="size-4 shrink-0" aria-hidden />
        <span>{title ?? label}</span>
      </div>
      <div className="mt-1.5 text-sm leading-relaxed text-fg-muted">
        {children}
      </div>
    </div>
  );
}
