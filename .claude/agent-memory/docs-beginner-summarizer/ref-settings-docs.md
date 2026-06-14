---
name: ref-settings-docs
description: Settings files, precedence order, permissions model, and key settings fields from code.claude.com/docs/en/settings.md
metadata:
  type: reference
---

## Source
code.claude.com/docs/en/settings.md

## File locations (lowest to highest priority)
1. User — `~/.claude/settings.json` (all your projects)
2. Project — `.claude/settings.json` (committed to repo, shared with team)
3. Local — `.claude/settings.local.json` (gitignored, this repo only)
4. Command-line arguments (session only)
5. Managed — enterprise/IT-deployed, cannot be overridden

Also: `~/.claude.json` stores OAuth, per-project tool trust, MCP servers; `.mcp.json` for project MCP.

## Permissions model
- `permissions.allow` / `permissions.deny` / `permissions.ask` arrays
- Format: `"ToolName(pattern)"` — e.g. `"Bash(npm run test *)"`, `"Read(./.env)"`
- Wildcards: `*` (single segment), `**` (recursive)
- Rules MERGE across scopes (not override)
- Managed settings can lock with `allowManagedPermissionRulesOnly: true`

## Key settings fields
- `model` — default model; read once at session start, use `/model` to switch mid-session
- `fallbackModel` — array of fallback models when primary is overloaded (max 3, does not merge across scopes)
- `env` — env vars injected into every session and subprocesses
- `hooks` — lifecycle event commands (see [[ref-hooks-docs]])
- `disableAllHooks` — boolean, disables hooks entirely
- `includeCoAuthoredBy` — deprecated; use `attribution` instead
- `attribution` — `{commit, pr}` strings for git co-author lines
- `cleanupPeriodDays` — how long to keep session files (default 30, min 1; 0 is rejected)
- `apiKeyHelper` — shell script to generate auth key dynamically
- `editorMode` — `"normal"` or `"vim"`
- `language` — preferred response language
- `respectGitignore` — default true
- `autoUpdatesChannel` — `"stable"` or `"latest"`
- `$schema` — add `"https://json.schemastore.org/claude-code-settings.json"` for IDE autocomplete

## Validation behavior
- Managed settings parse tolerantly (invalid fields stripped, valid ones enforced)
- User/project/local settings are strict — a bad file is rejected as a whole
- Hot-reload: most settings (permissions, hooks) reload without restart; `model` and `outputStyle` need restart

## Beginner pitfalls
- Permissions MERGE (not override) — a deny in user settings still applies even if project allows
- `cleanupPeriodDays: 0` causes a validation error, use 1 as minimum
- `model` is read once; use `/model` slash command to change mid-session
- `.claude/settings.local.json` should be in `.gitignore` (personal overrides)
- `includeCoAuthoredBy` is deprecated; use `attribution` object instead

## Analogies used
- Precedence: "like a stack of sticky notes — lower ones show through only where higher ones don't cover them, except permissions which stack additionally"
