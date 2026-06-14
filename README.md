# Claude Code Guide

A web learning app to explore and learn **Claude Code** — its core concepts
(installation, MCP, skills, subagents, slash commands, hooks, memory, configuration),
best practices, and practical, hands-on examples.

Designed for a **minimal, focused-reading** experience: typography-first, distraction-free,
with light/dark themes and a reading mode that hides all chrome.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build (type-checks + prerenders every lesson)
npm run start    # serve the production build
```

> On Windows/git-bash, use `http://127.0.0.1:3000` if `localhost` refuses the connection.

## Features (Phase 1)

- Sectioned learning path with concept cards (difficulty + estimated time)
- Distraction-free reading column (~68ch) with an "on this page" scroll-spy TOC
- Light / dark / system theming (no flash) + a reading mode toggle
- Responsive: collapsible sidebar → mobile drawer
- Prev/next lesson pagination, copy-able code blocks, note/tip/warning callouts
- Accessible: skip-to-content, visible focus rings, semantic landmarks

All lesson content in Phase 1 is **placeholder** — the structure is real, the words are not.
Real content arrives in Phase 2.

## Project structure

```
app/         routes (landing, /learn shell, /learn/[slug], 404), root layout, theming
components/  ui/ (primitives) · layout/ (chrome) · learn/ (learning UI)
lib/         concepts.ts (content + model) · navigation.ts (derived structure) · utils
```

## Roadmap

- **Phase 1 — ✅ Layout & UI foundation** (this release)
- **Phase 2 — 🔜 Real content** from the official Claude Code docs
- **Phase 3 — 🔮 Interactivity** — quizzes, practice problems, progress tracking

See [`ROADMAP.md`](./ROADMAP.md) for the detailed checklist and [`CLAUDE.md`](./CLAUDE.md)
for architecture and contribution notes.

---

A community learning resource. Not affiliated with Anthropic.
