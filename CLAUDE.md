# CLAUDE.md — claude-code-guide

Project memory for future Claude Code sessions. Read this first.

## What this is

A web learning app where developers explore and learn Claude Code's core concepts
(installation, MCP, skills, subagents, slash commands, hooks, memory, configuration),
best practices, and practical examples. Built for a **minimal, focused-reading**
experience — typography-first, low chrome, distraction-free.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS 3** + `@tailwindcss/typography` (prose styling)
- **next-themes** (light/dark/system, no flash)
- **lucide-react** (icons), `clsx` + `tailwind-merge` (`cn()` helper)
- Fonts via `next/font`: Inter (sans) + JetBrains Mono (mono)

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (also type-checks + prerenders all lessons)
npm run start   # serve the production build
npm run lint    # eslint (next/core-web-vitals)
```

Note: on Windows/git-bash, probe the dev server with `127.0.0.1`, not `localhost`
(IPv6 resolution can refuse the connection).

## Project phases

1. **Phase 1 — DONE:** layout + UI/UX foundation with placeholder content.
2. **Phase 2 — next:** real lesson content from the actual Claude Code docs.
3. **Phase 3 — later:** interactivity — quizzes + practice problems + progress tracking.

See `ROADMAP.md` for the live checklist.

## Architecture & conventions

### The single source of truth: `lib/`

- **`lib/concepts.ts`** — the content layer. Defines the data model (`Concept`, `Section`,
  `Block` union, `Difficulty`), the ordered `SECTIONS`, and the `CONCEPTS` registry. Each
  concept has a structured `body: Block[]`. Phase 1 bodies are generated placeholders
  (`placeholderBody`). Also exports `getLessonHeadings()` + `slugifyHeading()` so TOC anchor
  ids stay in lockstep with rendered heading ids.
- **`lib/navigation.ts`** — derives all structure from the registry: `getNavTree()`,
  `getOrderedConcepts()`, `getAllSlugs()`, `getConcept()`, `getAdjacentConcepts()`,
  `getFirstConcept()`. **Sidebar, landing page, routing, and prev/next pagination all read
  from here.** Add a concept to `CONCEPTS` and it appears everywhere automatically.
- **`lib/reading-mode.tsx`** — React context for distraction-free reading mode (hides
  sidebar + TOC), persisted to `localStorage`.
- **`lib/utils.ts`** — `cn()` (class merge) and a generic `slugify()`.

### Components (modular, grouped by role)

- `components/ui/` — presentational primitives: `Card`, `Badge`/`DifficultyBadge`,
  `Callout` (note/tip/warning), `CodeBlock` (copy button), `Pagination`, `Icon`
  (resolves a lucide icon by string name).
- `components/layout/` — app chrome: `TopBar`, `ThemeToggle`, `ReadingModeToggle`,
  `Sidebar` + `SidebarNav`, `MobileNav` (drawer), `TableOfContents` (scroll-spy),
  `Footer`, `SkipLink`.
- `components/learn/` — learning UI: `LearningPath`, `ConceptCard`, `LessonHeader`,
  `BlockRenderer` (Block[] → markup), `LessonView` (reading column + TOC, reading-mode
  aware).

### Routing (`app/`)

- `app/layout.tsx` — root; fonts, `Providers`, global `TopBar`/`Footer`/`SkipLink`.
- `app/providers.tsx` — wraps `ThemeProvider` + `ReadingModeProvider` (keeps root a
  server component).
- `app/page.tsx` — landing page (hero + `LearningPath`).
- `app/learn/layout.tsx` — docs shell (sidebar + content); **client** (reads reading mode).
- `app/learn/[slug]/page.tsx` — **server**; `generateStaticParams` + `generateMetadata`
  from the registry, renders the client `LessonView`.
- `app/not-found.tsx`, `app/icon.svg` (favicon).

### Styling conventions

- **Semantic color tokens only.** Use `bg`, `bg-subtle`, `surface`, `border`, `fg`,
  `fg-muted`, `fg-subtle`, `accent`, `accent-fg` (defined as CSS vars in `app/globals.css`,
  mapped in `tailwind.config.ts`). Don't hardcode `gray-*`/`black`/`white` for theme
  surfaces — the tokens flip automatically for dark mode.
- Reading column width is `max-w-reading` (~68ch). Keep it.
- Lesson prose is wrapped in `prose`; custom blocks (`Callout`, `CodeBlock`) carry
  `not-prose` so typography doesn't double-style them.
- Accent (terracotta) is used **sparingly** — links, active states, one CTA.

## How to extend

- **Add a lesson:** append a `Concept` to `CONCEPTS` in `lib/concepts.ts` (pick a `sectionId`,
  a lucide `icon` name, `difficulty`, `estMinutes`, and a `body`). Nothing else to wire.
- **Add a section:** add to `SECTIONS` (order matters — it drives everything).
- **New content block type:** extend the `Block` union in `concepts.ts`, then handle it in
  `components/learn/BlockRenderer.tsx`. This is the seam for the Phase 2 MDX swap.
- **New block/primitive UI:** add to `components/ui/` and keep it token-based + `not-prose`
  if it renders inside lesson prose.

## Gotchas

- Client components needing the theme/reading-mode hooks must live under `Providers`.
- Heading anchor ids come from `slugifyHeading()` — if you change it, the TOC links break;
  keep `BlockRenderer` and `getLessonHeadings` using the same function.
- `Icon` falls back to a `Circle` if an icon name is misspelled (no crash, wrong glyph).
