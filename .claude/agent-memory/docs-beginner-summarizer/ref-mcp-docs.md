---
name: ref-mcp-docs
description: Key facts, commands, scopes, and security notes from the official MCP reference and quickstart docs
metadata:
  type: reference
---

Source pages read: https://code.claude.com/docs/en/mcp.md and https://code.claude.com/docs/en/mcp-quickstart.md

## Core CLI commands (accurate as of June 2026)

- `claude mcp add --transport http <name> <url>` — add a hosted HTTP server
- `claude mcp add <name> -- <command> [args...]` — add a local stdio server (default transport)
- `claude mcp add --scope project --transport http <name> <url>` — project scope (writes .mcp.json)
- `claude mcp add --scope user --transport http <name> <url>` — user scope (all projects)
- `claude mcp list` — list servers and their status
- `claude mcp remove <name>` — remove a server
- `claude mcp get <name>` — details/scope of a specific server
- `/mcp` — in-session: check status, authenticate OAuth, reconnect

## Transports

- **stdio** (default): runs a local process; use `--` separator before the command
- **http**: hosted/cloud service; recommended for remote servers
- **sse**: deprecated, prefer http
- **ws** (WebSocket): bidirectional push; configured via `claude mcp add-json` or `.mcp.json` only

## Scopes

| Scope | Default? | File | Shared? |
|---|---|---|---|
| local | yes | ~/.claude.json (per-project key) | no |
| project | no | .mcp.json in project root | yes (commit it) |
| user | no | ~/.claude.json (top-level key) | no |

Project scope `.mcp.json` requires explicit approval from each user on first load.

## How tools appear

- Claude picks tools automatically; you don't need to name a server in every prompt
- Tool calls in output are labeled with the server name
- First use of a new tool asks for permission
- `/mcp` shows connected servers, tool counts, and status

## Resources

- Type `@` in a prompt to see resources from connected servers
- Format: `@servername:protocol://resource/path`

## MCP prompts as commands

- MCP servers can expose prompts; these appear in the `/` menu
- Format: `/mcp__servername__promptname [args...]`

## Security note from docs

"Verify you trust each server before connecting it. Servers that fetch external content can expose you to prompt injection risk."

## Context window note

Each connected server takes space in the context window (tool names + server instructions load per session). Remove unused servers.

## Beginner pitfall

SSE is deprecated — use HTTP. Local scope is the default; if a server "disappears" in another project, re-add it with `--scope user`.
