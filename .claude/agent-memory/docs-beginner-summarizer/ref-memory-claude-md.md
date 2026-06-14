---
name: ref-memory-claude-md
description: Key facts from the official CLAUDE.md / memory docs used for the "Memory & CLAUDE.md" lesson
metadata:
  type: reference
---

Source: https://code.claude.com/docs/en/memory.md

## Two memory systems
- **CLAUDE.md files** — you write them; persistent instructions loaded at session start.
- **Auto memory** — Claude writes itself; learnings/preferences saved to `~/.claude/projects/<project>/memory/MEMORY.md`.

## File locations and load order (broadest → most specific)
1. Managed policy: `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS), `/etc/claude-code/CLAUDE.md` (Linux), `C:\Program Files\ClaudeCode\CLAUDE.md` (Windows) — cannot be excluded.
2. User: `~/.claude/CLAUDE.md` — personal prefs, all projects.
3. Project: `./CLAUDE.md` or `./.claude/CLAUDE.md` — team-shared, checked into source control.
4. Local: `./CLAUDE.local.md` — personal project prefs, add to .gitignore.

All files are concatenated (not overriding); parent-dir files appear before child-dir files in context.

## # quick-add shortcut
Type `#` at the start of any message to save that text directly to memory (auto memory). To add to CLAUDE.md specifically, tell Claude "add this to CLAUDE.md" or edit via `/memory`.

## @path imports
Use `@path/to/file` syntax inside CLAUDE.md to pull in other files at load time. Relative paths resolve from the importing file. Max 4-hop recursion. External imports require one-time approval dialog.

## /memory command
Lists all loaded CLAUDE.md, CLAUDE.local.md, and rules files; lets you toggle auto memory; links to auto memory folder.

## /init command
Analyzes your codebase and generates a starter CLAUDE.md. If one exists, suggests improvements.

## What goes in CLAUDE.md
- Build/test commands
- Code style rules (specific, verifiable: "Use 2-space indentation" not "format code nicely")
- Architecture decisions and project layout
- Naming conventions, coding standards
- Common workflows

## What to AVOID
- Multi-step procedures that only apply to one part of the codebase (use skills instead)
- Task-specific instructions (use path-scoped rules in `.claude/rules/`)
- Personal preferences in a shared project CLAUDE.md (use CLAUDE.local.md or ~/.claude/CLAUDE.md)
- Files over 200 lines (reduces adherence)

## Auto memory details
- Requires Claude Code v2.1.59+
- Stored at `~/.claude/projects/<project>/memory/`
- First 200 lines of MEMORY.md (or 25KB) loaded every session
- Toggle with `/memory` command or `autoMemoryEnabled: false` in settings

## Pitfalls noted
- CLAUDE.md is context, not enforced config — use hooks for hard enforcement
- Conflicting instructions across files: Claude may pick arbitrarily
- Nested CLAUDE.md in subdirectories load on demand (not at launch), can seem "lost" after /compact
- HTML comments `<!-- ... -->` in CLAUDE.md are stripped before loading (good for maintainer notes)

[[project-content-model]]
