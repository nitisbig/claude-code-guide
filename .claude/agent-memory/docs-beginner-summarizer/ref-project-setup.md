---
name: ref-project-setup
description: Key facts, file structure, and best practices for the "project-setup" lesson from memory.md + best-practices.md
metadata:
  type: reference
---

Source docs: code.claude.com/docs/en/memory.md and code.claude.com/docs/en/best-practices.md

## Key setup facts

### /init command
- Runs in the project root; analyzes codebase and generates a starter CLAUDE.md automatically.
- Detects build systems, test frameworks, code patterns.
- If CLAUDE.md already exists, /init suggests improvements rather than overwriting.
- `CLAUDE_CODE_NEW_INIT=1` enables an interactive multi-phase flow (asks about skills, hooks, CLAUDE.md then proposes a reviewable plan).

### .claude/ directory layout
```
your-project/
├── CLAUDE.md               # Project-level instructions (check into git)
├── CLAUDE.local.md         # Personal notes (gitignore this)
├── .mcp.json               # MCP server config for this project
├── .claude/
│   ├── settings.json       # Permissions, hooks, and other config
│   ├── settings.local.json # Personal local overrides (gitignore)
│   ├── rules/              # Path-scoped rule files (e.g., testing.md)
│   ├── skills/             # Custom skill directories (each has SKILL.md)
│   └── agents/             # Custom subagent definition files (*.md)
```

### What goes in CLAUDE.md vs settings.json
- CLAUDE.md: behavioral guidance (conventions, build commands, project layout, "always do X")
- settings.json: technical enforcement (permissions allow/deny lists, hooks)

### CLAUDE.md best practices
- Keep under 200 lines; longer files reduce adherence.
- Include: bash commands Claude can't guess, code style rules differing from defaults, testing instructions, repo etiquette, architectural decisions, env var quirks, gotchas.
- Exclude: things Claude can infer from code, standard language conventions, detailed API docs, frequently changing info.
- Use @path/to/import syntax to pull in README, package.json, or other files.
- CLAUDE.local.md for personal/sandbox notes that shouldn't be committed.

### Guardrails (permissions + hooks)
- `.claude/settings.json` contains `permissions.allow` and `permissions.deny` arrays.
- Hooks run scripts at lifecycle events (PostToolUse, PreToolUse, Stop, etc.) — deterministic, not advisory.
- Use hooks for formatting/linting after every file edit (e.g., "run eslint after every file edit").
- Claude can write hooks for you: "Write a hook that runs eslint after every file edit."

### .mcp.json
- Lives in project root; configures MCP servers for the project.
- Use `claude mcp add` to connect external tools (databases, Figma, Notion, etc.).

### Tuning over time
- Add to CLAUDE.md when Claude makes the same mistake twice.
- Prune CLAUDE.md when it gets too long (use path-scoped rules in .claude/rules/ instead).
- Auto memory saves Claude's own learnings to ~/.claude/projects/<project>/memory/.
- Run /memory to view and edit all loaded instruction files and auto memory.

## Beginner pitfalls
- Not gitignoring CLAUDE.local.md and settings.local.json.
- Bloated CLAUDE.md (rules get ignored past ~200 lines).
- Confusing CLAUDE.md (advisory) with hooks (deterministic enforcement).
- Forgetting that hooks go in settings.json, not CLAUDE.md.

## Effective analogy
- CLAUDE.md is like a "new hire handbook" for Claude: what to know before day one.
- Hooks are like linting rules baked into the CI pipeline — they always run, no matter what.

## Related lessons
- [[ref-memory-claude-md]] — deeper CLAUDE.md internals
- [[ref-hooks-docs]] — hooks detail
- [[ref-skills-docs]] — skills anatomy
- [[ref-subagents-docs]] — subagents anatomy
