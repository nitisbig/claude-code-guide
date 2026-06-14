"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { ReadingModeProvider } from "@/lib/reading-mode";

/**
 * App-wide client providers: color theme (next-themes) + reading mode.
 * Kept in one place so the root layout stays a server component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReadingModeProvider>{children}</ReadingModeProvider>
    </ThemeProvider>
  );
}
