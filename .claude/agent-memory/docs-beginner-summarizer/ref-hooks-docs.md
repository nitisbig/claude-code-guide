---
name: ref-hooks-docs
description: Technical facts, JSON structure, event names, exit codes, and beginner pitfalls from the hooks docs at code.claude.com/docs/en/hooks.md
metadata:
  type: reference
---

Source: https://code.claude.com/docs/en/hooks.md

## Core concept
Hooks are user-defined shell commands (or HTTP endpoints / LLM prompts) that execute automatically at specific points in Claude Code's lifecycle. They let you run arbitrary automation — auto-format, lint, block dangerous commands — without manual intervention.

## Exact JSON structure (settings.json)
Three levels: hooks -> EventName -> array of matcher groups -> hooks array of handlers.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH"
          }
        ]
      }
    ]
  }
}
```

Key fields:
- `matcher` — string filter: exact tool name, pipe-separated list, or JS regex
- `hooks` — array of handler objects
- `type` — "command", "http", "mcp_tool", "prompt", or "agent"
- `command` — shell command string (for type:"command")
- `if` (optional) — permission-rule syntax filter, e.g. "Bash(rm *)"
- `timeout` (optional) — seconds

## Hook events (most important for beginners)
- PreToolUse — before any tool call (can block with exit 2)
- PostToolUse — after a tool call succeeds (great for formatting, linting)
- UserPromptSubmit — before Claude processes a user prompt
- Stop — when Claude finishes a response
- SessionStart — when a session begins

Full list has ~30 events including SubagentStart, WorktreeCreate, PreCompact, etc.

## Exit codes
- Exit 0 = success; stdout optionally parsed as JSON decision object
- Exit 2 = blocking error; stderr is fed back to Claude; tool call is blocked (PreToolUse)
- Any other code = non-blocking error; execution continues

IMPORTANT: Exit 1 does NOT block. Only exit 2 blocks.

## Beginner pitfalls
1. Using exit 1 expecting it to block — it won't. Use exit 2.
2. The `if` filter fails open — if it can't parse the command, hook runs anyway. Don't rely on it for hard security enforcement.
3. stdout must contain ONLY the JSON object — shell startup noise breaks JSON parsing.
4. Hooks run with full user permissions — malicious hooks (e.g. from a cloned project's settings.local.json) are dangerous.

## Config file locations
- ~/.claude/settings.json — all projects (user scope)
- .claude/settings.json — single project (committable)
- .claude/settings.local.json — single project (gitignored, for sensitive hooks)

## Path placeholder
${CLAUDE_PROJECT_DIR} — resolves to the project root directory.

## Analogy used in lesson
Hooks are like git hooks (pre-commit, post-commit) but for Claude's tool calls instead of git operations.
