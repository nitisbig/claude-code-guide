---
name: ref-skills-docs
description: Key facts, terminology, and gotchas from the official Skills docs at code.claude.com/docs/en/skills.md
metadata:
  type: reference
---

Source: https://code.claude.com/docs/en/skills.md

## Core definition
A Skill is a `SKILL.md` file that packages reusable instructions Claude loads on demand. Skills solve the problem of repeatedly pasting the same instructions into chat — the skill's body only loads when needed, so it costs nothing until invoked.

## Anatomy
- Each skill is a **directory** (not just a file). The directory name = the slash command name.
- Required: `SKILL.md` with YAML frontmatter between `---` markers.
- Key frontmatter fields:
  - `description` (recommended) — drives automatic discovery; Claude reads this to decide when to load the skill. Truncated at 1,536 chars in the skill listing.
  - `name` (optional) — display label only; does NOT change the slash command name (except for plugin-root `SKILL.md`).
  - `disable-model-invocation: true` — prevents Claude from auto-loading; user-only invocation (e.g. `/deploy`).
  - `user-invocable: false` — hides from the `/` menu; Claude-only, background knowledge.
  - `allowed-tools` — tools Claude can use without approval prompts when this skill is active.
  - `context: fork` — run skill in an isolated subagent.
- Optional supporting files: templates, example outputs, scripts — reference them from SKILL.md.

## Where skills live
| Level      | Path                                           |
|------------|------------------------------------------------|
| Personal   | `~/.claude/skills/<name>/SKILL.md`             |
| Project    | `.claude/skills/<name>/SKILL.md`               |
| Plugin     | `<plugin>/skills/<name>/SKILL.md`              |
| Enterprise | Managed settings                               |

Precedence: enterprise > personal > project. Plugin skills are namespaced (e.g. `/my-plugin:review`).

Custom commands (`.claude/commands/`) still work and are equivalent, but skills are preferred — they add supporting files and more frontmatter options.

## Invocation
- Slash command: `/skill-name` (always works if user-invocable)
- Automatic: Claude reads the `description` field and loads the skill when relevant
- `$ARGUMENTS` placeholder to pass arguments: e.g. `/fix-issue 123`

## Dynamic context injection
`!`command`` syntax at the start of a line runs a shell command before Claude sees the skill content. Output is inlined. This is preprocessing, not Claude execution.

## Beginner pitfalls
- The directory name, not the `name` frontmatter, sets the slash command.
- Skill body stays in context for the whole session after first invocation (token cost).
- If skill isn't triggering: check description keywords match what users would naturally say.
- `.claude/commands/` files still work but if a skill and command share a name, skill wins.
- Live change detection: edits to SKILL.md take effect without restart. But creating a brand-new top-level skills directory requires a restart.

## Bundled skills
Claude Code ships with: `/code-review`, `/debug`, `/batch`, `/loop`, `/claude-api`, `/run`, `/verify`, `/run-skill-generator`.

Related: [[project-content-model]]
