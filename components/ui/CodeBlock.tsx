"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * CodeBlock — styled code with a copy-to-clipboard button.
 * Phase 2 can layer real syntax highlighting on top; the markup and
 * copy behavior stay the same.
 */
export function CodeBlock({
  code,
  language,
  className,
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard may be unavailable (insecure context) — fail quietly
    }
  }

  return (
    <div
      className={cn(
        "not-prose group relative my-6 overflow-hidden rounded-lg border border-border bg-bg-subtle",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-1.5">
        <span className="font-mono text-xs text-fg-subtle">
          {language ?? "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fg-subtle transition-colors hover:bg-surface hover:text-fg"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="size-3.5" aria-hidden /> Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="scrollbar-thin overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-fg">{code}</code>
      </pre>
    </div>
  );
}
