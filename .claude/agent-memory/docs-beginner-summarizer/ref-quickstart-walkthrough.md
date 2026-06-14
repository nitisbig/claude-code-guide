---
name: ref-quickstart-walkthrough
description: Quickstart walkthrough facts — install commands, auth flow, key session commands, and the step-by-step task loop for a complete feature build
metadata:
  type: reference
---

## Source URL
- https://code.claude.com/docs/en/quickstart.md

## Install commands
- macOS/Linux/WSL: `curl -fsSL https://claude.ai/install.sh | bash`
- Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
- Homebrew: `brew install --cask claude-code`

## Auth
- Run `claude` to start; auth browser prompt on first use
- `/login` to switch accounts from inside a session

## Essential shell commands
| Command | What it does |
|---------|-------------|
| `claude` | Start interactive mode |
| `claude "task"` | Run a one-time task |
| `claude -p "query"` | Run one-off query, then exit |
| `claude -c` | Continue most recent session |
| `claude -r` | Resume a previous session (picker) |

## Essential session commands
| Command | What it does |
|---------|-------------|
| `/clear` | Clear conversation history |
| `/help` | Show available commands |
| `/exit` or Ctrl+D | Exit |

## Task loop pattern (feature build)
1. Explore: "what does this project do?" / "explain the folder structure"
2. Plan: "analyze the database schema" / break task into steps
3. Implement: natural language request ("add input validation to the user registration form")
4. Verify: "write unit tests for the calculator functions" / "run the new tests and fix any failures"
5. Commit/PR: "commit my changes with a descriptive message" / "create a pr"

## Tips from quickstart
- Be specific: "fix the login bug where users see a blank screen after entering wrong credentials"
- Break complex tasks into numbered steps
- Let Claude explore before making changes
- `Shift+Tab` cycles permission modes
- `Tab` for command completion, `↑` for command history

## PR workflow
- "create a pr" triggers `gh pr create` — session auto-linked to PR
- Return to it later with `claude --from-pr <number>`

## Key beginner mental model
"Talk to Claude like you would a helpful colleague. Describe what you want to achieve, and it will help you get there."
