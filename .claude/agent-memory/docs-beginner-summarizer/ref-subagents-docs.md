---
name: ref-subagents-docs
description: Key facts from the official subagents and agents-parallelism docs for the "subagents" lesson
metadata:
  type: reference
---

Source URLs:
- https://code.claude.com/docs/en/sub-agents.md
- https://code.claude.com/docs/en/agents.md

## Core definition
A subagent is a specialized AI assistant that handles a side task in its own isolated context window and returns only a summary to the main conversation. Defined as Markdown files with YAML frontmatter.

## Why use subagents
- Preserve main context by offloading verbose output (test logs, search results, file contents)
- Enforce tool restrictions (e.g., read-only agent)
- Control costs by routing to faster/cheaper models like Haiku
- Reuse configurations across projects

## Built-in subagents (always available)
- **Explore**: Haiku model, read-only tools, fast codebase search. Skips CLAUDE.md for speed.
- **Plan**: Inherits main model, read-only, used in plan mode. Skips CLAUDE.md.
- **General-purpose**: All tools, inherits main model, complex multi-step tasks.
- Other helpers: statusline-setup (Sonnet), claude-code-guide (Haiku)

## Creating a custom subagent
Two ways:
1. Run `/agents` in Claude Code → Library tab → Create new agent (guided UI or "Generate with Claude")
2. Manually write a Markdown file with YAML frontmatter

### File locations (scope/priority)
- `.claude/agents/<name>.md` — project scope, can be checked into git (priority 3)
- `~/.claude/agents/<name>.md` — user scope, all projects (priority 4)
- Managed settings — org-wide (priority 1, highest)
- `--agents` CLI flag — session-only JSON (priority 2)

### YAML frontmatter fields
Required: `name` (lowercase-letters-and-hyphens), `description` (when Claude should delegate)
Optional: `tools` (allowlist), `disallowedTools` (denylist), `model` (sonnet/opus/haiku/fable/inherit), `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory` (user/project/local), `background`, `isolation`, `color`, `effort`, `initialPrompt`

### Minimal example file
```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices. Use proactively after code changes.
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. Analyze code and provide actionable feedback on quality, security, and best practices.
```

### Note on loading
Subagents created via /agents take effect immediately. Files added manually require a session restart.

## Parallel execution
- Claude automatically runs multiple subagents in the background when tasks are independent
- Ask explicitly: "Research X, Y, and Z in parallel using separate subagents"
- Background subagents auto-deny permission prompts they'd otherwise ask about; foreground ones prompt you

## Parallelism comparison (from agents.md)
| Approach | Use when |
|---|---|
| Subagents | Side task would flood main conversation; need tool restrictions; work is self-contained |
| Agent view (`claude agents`) | Several independent tasks you hand off and check back on later |
| Agent teams | Claude should split a project, assign pieces, keep workers in sync (experimental) |
| Dynamic workflows | Job too big for a handful of subagents; results need cross-checking |

## Invocation patterns
- Natural language: "Use the code-reviewer subagent to..."
- @-mention typeahead: @"code-reviewer (agent)" — guarantees that subagent runs
- Session-wide: `claude --agent code-reviewer`

## Forked subagents
A fork inherits the full conversation history instead of starting fresh. Useful when named subagent would need too much background. Created via `/fork <directive>`. Cannot spawn further forks.

## Beginner pitfalls
- Subagents start fresh — they do NOT see conversation history (unless it's a fork)
- Many parallel subagents returning detailed results can consume significant main context
- Files added directly to .claude/agents/ need session restart to load (not /agents UI)
- `name` must be unique within a scope; duplicates are silently dropped

## Standardized terminology for lessons
- "subagent" = the isolated AI worker (not "assistant" or "agent worker")
- "main conversation" = the primary session context (not "parent session")
- "context window" = the token budget for one session
