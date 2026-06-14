# Roadmap — claude-code-guide

A web app for learning Claude Code's core concepts, best practices, and practical
examples. Tracked across three phases. Check items off as they land.

---

## Phase 1 — Layout & UI Foundation ✅ (complete)

Goal: the best possible minimal, focused-reading experience, with placeholder content
and a structure that Phases 2 & 3 plug into cleanly.

- [x] Scaffold project + configs (Next.js 15, TS strict, Tailwind + typography, ESLint)
- [x] Global styles, design tokens, fonts, light/dark/system theming (no flash)
- [x] Core utils + concept registry (`lib/concepts.ts`, `lib/navigation.ts` — single
      source of truth)
- [x] UI primitives (`Card`, `Badge`/`DifficultyBadge`, `Callout`, `CodeBlock` w/ copy,
      `Pagination`, `Icon`)
- [x] Layout chrome (`TopBar`, theme + reading-mode toggles, `Sidebar`/`SidebarNav`,
      `MobileNav` drawer, `Footer`, `SkipLink`)
- [x] Landing page + sectioned learning path (`LearningPath`, `ConceptCard`)
- [x] Docs reading shell (sidebar + centered reading column, reading-mode aware)
- [x] Concept dynamic route + `BlockRenderer` + "on this page" TOC (scroll-spy) +
      prev/next pagination + `generateStaticParams`/`generateMetadata`
- [x] Polish: 404 page, skip-to-content, focus states, responsive, favicon, OG metadata
- [x] Docs: `CLAUDE.md` + this `ROADMAP.md`
- [x] Verified: `npm run build` clean (19 static pages), dev server serves `/` (200),
      `/learn/<slug>` (200), unknown slug (404), no console errors

## Phase 2 — Real Content 🔜 (next)

Goal: replace placeholder bodies with practical, understandable lessons drawn from the
actual Claude Code docs.

- [x] Read the official Claude Code docs; extract the most useful, practical concepts
- [x] Decide content pipeline: structured `Block[]` (current) vs MDX (`BlockRenderer` is
      the swap seam) — kept `Block[]`; no renderer changes needed
- [x] Write real lessons: Getting Started (intro, installation, first session)
- [x] Write real lessons: Core Concepts (slash commands, MCP, skills, subagents, hooks,
      memory/CLAUDE.md, configuration)
- [x] Write real lessons: Best Practices (prompting, project setup, workflows)
- [x] Write the end-to-end practical walkthrough
- [x] Per-lesson "key takeaways" + links to official docs (closing `tip` callout per lesson)
- [ ] Real syntax highlighting for code blocks (e.g. Shiki)
- [ ] Search across lessons

## Phase 3 — Interactivity 🔮 (later)

Goal: make it active learning, not just reading.

- [ ] Quiz model + UI (per-lesson multiple choice / check-your-understanding)
- [ ] Practice problems with guided solutions
- [ ] Progress tracking (completed lessons, quiz scores) persisted to `localStorage`
- [ ] Progress indicators in sidebar + on the learning path
- [ ] Optional gamification (streaks, completion badges)
- [ ] Hooks already in place: `difficulty`/`estMinutes` metadata; reserve a
      `ProgressProvider` alongside `ReadingModeProvider`

---

### Notes for future sessions
- `lib/navigation.ts` derives all structure from `lib/concepts.ts` — extend content there.
- Keep the minimal, typography-first aesthetic and the semantic color tokens.
- See `CLAUDE.md` for architecture, conventions, and how-to-extend details.
