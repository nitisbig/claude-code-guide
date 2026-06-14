---
name: claude-code-overview-source
description: Key facts from the official Claude Code overview and quickstart docs — canonical source for introduction lesson
metadata:
  type: reference
---

Source URLs:
- https://code.claude.com/docs/en/overview.md
- https://code.claude.com/docs/en/quickstart.md

Core definition (verbatim from docs):
"Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."

Key capabilities (from "What you can do" section):
- Write tests, fix lint errors, resolve merge conflicts, update dependencies, write release notes
- Build features and fix bugs across multiple files from plain-language descriptions
- Create commits and pull requests (git-native)
- Connect external tools via MCP (Model Context Protocol)
- Customize with CLAUDE.md, skills, and hooks
- Run multi-agent teams (sub-agents) for parallel work
- Pipe logs, script CI tasks, bulk operations via CLI
- Schedule recurring tasks (Routines, Desktop scheduled tasks, /loop)
- Work across surfaces (terminal, VS Code, JetBrains, Desktop app, Web, Slack, GitHub Actions)

Surfaces (all share the same engine, CLAUDE.md, settings, MCP servers):
- Terminal CLI (full-featured)
- VS Code extension (inline diffs, @-mentions, plan review)
- JetBrains plugin (IntelliJ, PyCharm, WebStorm)
- Desktop app (visual diffs, multiple sessions, cloud sessions)
- Web (claude.ai/code — no local setup)
- Slack, GitHub Actions, GitLab CI/CD, Chrome

Key CLI commands:
- `claude` — start interactive mode
- `claude "task"` — run one-time task
- `claude -p "query"` — run one-off query then exit
- `claude -c` — continue most recent conversation
- `tail -200 app.log | claude -p "Slack me if you see anomalies"` — piping
- `git diff main --name-only | claude -p "review for security issues"` — chaining

Session commands: /help, /clear, /exit, /login, /resume

Agentic loop: reads files as needed, proposes changes, asks for approval, then edits. Always asks before modifying files.

CLAUDE.md: project-level markdown file read at start of every session. Sets coding standards, architecture decisions, preferences.

Skills: packageable repeatable workflows (e.g. /review-pr, /deploy-staging).
Hooks: shell commands before/after Claude Code actions (auto-format after edit, lint before commit).
Sub-agents: multiple Claude Code agents working in parallel on different subtasks.
MCP: open standard connecting Claude Code to external data sources (Jira, Slack, Google Drive, custom tools).
