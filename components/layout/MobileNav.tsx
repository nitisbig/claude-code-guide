"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SidebarNav } from "./SidebarNav";

/**
 * MobileNav — hamburger button + slide-in drawer holding the lesson
 * nav. Shown below the `lg` breakpoint where the static sidebar hides.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open; close on Escape.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="inline-flex size-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-fg/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Lessons navigation"
            className="scrollbar-thin absolute inset-y-0 left-0 w-72 max-w-[80vw] overflow-y-auto border-r border-border bg-bg p-5 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-fg">Lessons</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex size-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
