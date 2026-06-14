---
name: ref-slash-commands
description: Source facts, file paths, frontmatter fields, and argument syntax for the slash-commands lesson from the official Claude Code docs
metadata:
  type: reference
---

Source docs: https://code.claude.com/docs/en/commands.md and https://code.claude.com/docs/en/skills.md

## Key facts

- Commands are typed at the START of a message; text after is passed as arguments.
- Type `/` to see all commands; filter by typing `/` + letters.
- Two kinds of commands: true built-ins (fixed logic in CLI) and bundled skills (prompt-based, marked "Skill").
- Custom commands merged into skills. Both `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` create `/deploy`.

## Built-in commands worth knowing for beginners

- `/help` — show all available commands
- `/clear` (aliases: /reset, /new) — start fresh conversation, keeps project memory
- `/compact [instructions]` — summarize conversation to free context window
- `/config` (alias: /settings) — open settings UI for theme, model, preferences
- `/mcp` — manage MCP server connections
- `/agents` — manage subagent configurations
- `/init` — generate a starter CLAUDE.md
- `/memory` — edit CLAUDE.md memory files
- `/plan [description]` — enter plan mode
- `/model [model]` — switch AI model
- `/skills` — list available skills

## Custom commands / skills file locations

| Scope | Path |
|-------|------|
| Personal (all projects) | `~/.claude/skills/<skill-name>/SKILL.md` |
| Project only | `.claude/skills/<skill-name>/SKILL.md` |
| Legacy (still works) | `.claude/commands/<name>.md` |

The directory name becomes the `/command-name`.

## SKILL.md frontmatter fields

- `name` — display label (not the command name)
- `description` — RECOMMENDED; Claude uses this to decide when to auto-invoke
- `argument-hint` — shown in autocomplete, e.g. `[issue-number]`
- `arguments` — named positional args for `$name` substitution
- `disable-model-invocation: true` — prevent Claude from auto-triggering; manual `/name` only
- `user-invocable: false` — hide from `/` menu entirely
- `allowed-tools` — tools allowed without permission prompt during this skill
- `context: fork` — run in a forked subagent

## Argument substitution variables

- `$ARGUMENTS` — all text typed after `/command-name`
- `$ARGUMENTS[0]` or `$0` — first argument
- `$name` — named arg declared in `arguments:` frontmatter

## Dynamic context injection

Prefix a line with `!` + backtick command to run a shell command and inline the output:

```
!`git diff HEAD`
```

## Effective analogies used in lesson

- Slash commands like keyboard shortcuts for common workflows — one keystroke instead of a paragraph.
- Custom skills like saved snippets you give a name to.
