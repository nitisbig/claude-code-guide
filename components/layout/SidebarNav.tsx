"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavTree } from "@/lib/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * SidebarNav — the grouped concept navigation list. Shared by the
 * desktop sidebar and the mobile drawer so there's one source of nav UI.
 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const tree = getNavTree();

  return (
    <nav aria-label="Lessons" className="flex flex-col gap-7">
      {tree.map((section) => (
        <div key={section.id}>
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {section.title}
          </h2>
          <ul className="flex flex-col gap-0.5">
            {section.concepts.map((concept) => {
              const href = `/learn/${concept.slug}`;
              const active = pathname === href;
              return (
                <li key={concept.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-bg-subtle font-medium text-fg"
                        : "text-fg-muted hover:bg-bg-subtle hover:text-fg",
                    )}
                  >
                    <Icon
                      name={concept.icon}
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        active
                          ? "text-accent"
                          : "text-fg-subtle group-hover:text-fg-muted",
                      )}
                    />
                    <span className="truncate">{concept.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
