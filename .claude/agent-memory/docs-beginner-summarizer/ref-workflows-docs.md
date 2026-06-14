---
name: ref-workflows-docs
description: Key facts from common-workflows.md and workflows.md — plan mode, Shift+Tab, session resumption flags, /clear, test-driven loop, dynamic workflows (ultracode), and /deep-research
metadata:
  type: reference
---

## Source URLs
- https://code.claude.com/docs/en/common-workflows.md
- https://code.claude.com/docs/en/workflows.md

## Plan mode
- Toggle with `Shift+Tab` mid-session (cycles permission modes)
- Or launch with `claude --permission-mode plan`
- Claude reads files and proposes a plan; makes NO edits until approved
- Official name: "plan mode" (doc calls it "analyze before you edit")

## Session resumption
- `claude --continue` (or `claude -c`) — resumes the most recent session in current directory
- `claude --resume` (or `claude -r`) — opens a session picker to choose from previous sessions
- `/resume` — works from inside a running session (opens picker)
- Returns `No conversation found to continue` if no session exists yet
- Sessions are saved locally

## /clear
- Clears conversation history within a session
- Use between unrelated tasks to keep context clean

## Test-driven workflow (from common-workflows.md)
- Pattern: find untested code → generate tests → add edge cases → run and fix failures
- Claude matches existing test style/frameworks by reading existing test files

## Dynamic workflows (workflows.md)
- Requires Claude Code v2.1.154+, all paid plans
- A "dynamic workflow" = a JS script that orchestrates many subagents
- Triggered by the keyword `ultracode` in a prompt, or `/effort ultracode`
- Built-in: `/deep-research <question>` — fans out web searches, cross-checks, returns cited report
- Manage with `/workflows` command — shows running/completed workflows
- Save a run as a command with `s` key in /workflows view
- Agent cap: 16 concurrent, 1000 total per run
- Cost warning: many more tokens than regular sessions

## Key distinction: subagents vs workflows
- Subagents: Claude decides turn-by-turn, results in context window
- Workflows: script holds the loop, context only sees final answer — repeatable and resumable

## Pipe/non-interactive usage
```bash
git log --oneline -20 | claude -p "summarize these recent commits"
```

## @ file references
- `@path/to/file.js` in prompts includes that file's content directly
- `@directory/` gives a directory listing (not full contents)

## PR from session
- `claude --from-pr <number>` or paste PR URL into `/resume` picker to return to a PR-linked session

## Beginner pitfalls
- `--continue` with no prior session just exits with an error — confusing on first use
- `ultracode` keyword is v2.1.160+; before that use the literal `workflow` keyword
- Dynamic workflows run in background — use `/workflows` to monitor, not the main session
