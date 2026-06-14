import { icons, type LucideProps } from "lucide-react";

/**
 * Resolve a lucide-react icon by name (concepts store icon names as
 * strings in the registry). Falls back to a neutral dot if missing.
 */
export function Icon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? icons.Circle;
  return <LucideIcon {...props} />;
}
