---
name: project-content-model
description: Block union type and lesson structure conventions for the claude-code-guide learning app
metadata:
  type: project
---

The content layer lives in `lib/concepts.ts`. Each lesson body is `Block[]`.

Block union (exact):
- { type: "heading"; level: 2 | 3; text: string }
- { type: "paragraph"; text: string }
- { type: "list"; items: string[] }
- { type: "callout"; variant: "note" | "tip" | "warning"; title?: string; text: string }
- { type: "code"; language?: string; code: string }

Lesson skeleton:
1. Short intro paragraph (what it is, why it matters)
2. 3-5 H2 sections with paragraph + code/list as needed
3. Callouts sparingly (genuine tips/gotchas)
4. End with a "Key takeaways" tip callout linking to canonical docs

Target length: 8-14 blocks total. Reading column is ~68ch (max-w-reading).

H2 heading text must be short, unique within lesson (becomes TOC anchor via slugifyHeading()).

Output format requested by user: raw TypeScript array literal only — no prose wrapping, no markdown fences, no variable assignment.

**Why:** Lessons are consumed by BlockRenderer.tsx; structured blocks are the seam for Phase 2.
**How to apply:** Always return the array literal starting with `[` and ending with `]`.
