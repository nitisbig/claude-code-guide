---
name: ref-quickstart
description: Source doc mapping for the "first-session" lesson — what the quickstart covers and key facts to preserve
metadata:
  type: reference
---

Source: https://code.claude.com/docs/en/quickstart.md

Covers: launch with `claude` in a project dir, authentication (separate from lesson scope), plain-language prompts, Claude reading files automatically, showing proposed changes before applying, accepting edits, git via natural language, bug fixes, refactoring.

Key facts for the lesson:
- Launch command: `claude` (run inside project directory)
- Claude reads files automatically — no manual context needed
- Always asks for permission before modifying files
- Example exploration prompts: "what does this project do?", "explain the folder structure"
- Example change prompts: "add a hello world function to the main file", "there's a bug where users can submit empty forms - fix it"
- Example git prompts: "what files have I changed?", "commit my changes with a descriptive message"
- Shortcut tips: `/` to see commands, Tab for completion, up-arrow for history, Shift+Tab to cycle permission modes
- `/help` inside session for help
- "Accept all" mode available for a session

Lesson slug: first-session
Does NOT cover: installation, MCP, skills, hooks — those are separate lessons.

Related: [[lesson-first-session-blocks]]
