---
name: ref-installation-docs
description: Key facts from the Claude Code installation/setup docs used for the "installation" lesson
metadata:
  type: reference
---

Source pages read: code.claude.com/docs/en/setup.md, /overview.md, /troubleshoot-install.md

## Requirements (from setup.md)
- macOS 13.0+, Windows 10 1809+ / Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+
- Hardware: 4 GB+ RAM, x64 or ARM64
- Network: internet required; must be in Anthropic supported countries
- Subscription: Pro, Max, Team, Enterprise, or Console (free plan NOT included)

## Canonical install commands
- macOS/Linux/WSL (native, recommended): `curl -fsSL https://claude.ai/install.sh | bash`
- Windows PowerShell (native, recommended): `irm https://claude.ai/install.ps1 | iex`
- Windows CMD: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`
- Homebrew (macOS): `brew install --cask claude-code`
- WinGet (Windows): `winget install Anthropic.ClaudeCode`
- npm: `npm install -g @anthropic-ai/claude-code` (do NOT use sudo npm)

## Verify
- `claude --version`
- `claude doctor` (full diagnostic)

## Authentication
- On first run, type `claude` and follow browser prompts
- Need Pro/Max/Team/Enterprise/Console — free plan excluded

## Key gotchas for beginners
- Native install auto-updates; Homebrew/WinGet do NOT (must run `brew upgrade claude-code` or `winget upgrade Anthropic.ClaudeCode`)
- Windows: use Git Bash (Git for Windows) for best Bash tool support; PowerShell works too
- Wrong shell = wrong install command (PS vs CMD confusion is common)
- `command not found` after install = PATH issue; fix: add `~/.local/bin` to PATH
- WSL users: install inside WSL terminal, not from PowerShell/CMD
- Do not use `sudo npm install -g`

## Top troubleshooting paths
- `command not found` → PATH not set, add `~/.local/bin` (macOS/Linux) or `%USERPROFILE%\.local\bin` (Windows)
- Install script returns HTML / 403 → regional restriction or network block; try Homebrew/WinGet
- TLS errors → update CA certs or check corporate proxy
- 403 after login → check subscription is active; Console users need "Claude Code" role
