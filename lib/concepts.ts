/**
 * Concept data model — the content layer of the app.
 *
 * Phase 2: each concept carries real, practical lesson content drawn from the
 * official Claude Code docs (https://code.claude.com/docs/en/...), authored as
 * structured `Block[]`. The shape is unchanged from Phase 1, so every component
 * that reads a Concept keeps working. The `Block` union is the natural seam if a
 * future phase swaps in an MDX renderer.
 */

export type Difficulty = "beginner" | "intermediate" | "advanced";

/** A single renderable block within a lesson body. */
export type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "callout";
      variant: "note" | "tip" | "warning";
      title?: string;
      text: string;
    }
  | { type: "code"; language?: string; code: string };

export type Concept = {
  slug: string;
  title: string;
  /** One-line description shown on cards and lesson headers. */
  summary: string;
  /** Section this concept belongs to (see SECTIONS in navigation.ts). */
  sectionId: string;
  estMinutes: number;
  difficulty: Difficulty;
  /** lucide-react icon name, resolved in the UI layer. */
  icon: string;
  body: Block[];
};

export type Section = {
  id: string;
  title: string;
  /** Short blurb shown on the landing learning-path. */
  description: string;
};

/**
 * Ordered learning sections. Order here defines order everywhere
 * (sidebar, landing page, prev/next pagination).
 */
export const SECTIONS: Section[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Install Claude Code and run your first productive session.",
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    description:
      "The building blocks — commands, MCP, skills, subagents, hooks, and memory.",
  },
  {
    id: "best-practices",
    title: "Best Practices",
    description: "Habits and workflows that make Claude Code dramatically more effective.",
  },
  {
    id: "practical-guides",
    title: "Practical Guides",
    description: "End-to-end walkthroughs that tie the concepts together.",
  },
];

/**
 * The concept registry. Adding a concept here automatically wires it
 * into the sidebar, landing page, routing, and prev/next pagination.
 */
export const CONCEPTS: Concept[] = [
  // ── Getting Started ────────────────────────────────────────────────
  {
    slug: "introduction",
    title: "What is Claude Code?",
    summary: "Meet Claude Code — an agentic coding tool that lives in your terminal.",
    sectionId: "getting-started",
    estMinutes: 5,
    difficulty: "beginner",
    icon: "Sparkles",
    body: [
      {
        type: "paragraph",
        text: "Claude Code is an agentic coding tool built by Anthropic. It reads your codebase, edits files, runs commands, and works across your development tools — all from a conversation in plain English. It is the fastest way to get a capable AI collaborator working inside your actual project, not just answering questions about code in a chat window.",
      },
      { type: "heading", level: 2, text: "An agentic coding tool" },
      {
        type: "paragraph",
        text: "Most AI chat tools answer questions. Claude Code takes actions. It reads the files in your project, proposes changes, runs tests, and commits to git — then asks for your approval before anything is saved. Think of it less like a search engine and more like a junior developer who can see your whole codebase and do real work, but always checks in before touching anything.",
      },
      {
        type: "callout",
        variant: "note",
        title: "Agentic means it acts, not just answers",
        text: "Claude Code reads your project files as needed without you manually copying and pasting code into a chat. It proposes changes and always asks for permission before modifying files.",
      },
      { type: "heading", level: 2, text: "What you can do with it" },
      {
        type: "paragraph",
        text: "Once Claude Code is running in your project directory, you can hand it real tasks in plain language. Here are some common examples straight from the docs:",
      },
      {
        type: "list",
        items: [
          "Write tests for untested code, run them, and fix failures",
          "Build a new feature across multiple files from a single description",
          "Fix a bug by pasting the error message — it traces the root cause and patches it",
          "Create git commits and open pull requests with descriptive messages",
          "Refactor, update documentation, or resolve merge conflicts",
          "Pipe in log output and ask for an anomaly analysis",
          "Review changed files for security issues before a merge",
        ],
      },
      {
        type: "code",
        language: "bash",
        code: "# Run a one-off task without opening an interactive session\nclaude \"write tests for the auth module, run them, and fix any failures\"\n\n# Pipe shell output directly into Claude\ntail -200 app.log | claude -p \"let me know if you see any anomalies\"\n\n# Review changed files for security issues\ngit diff main --name-only | claude -p \"review these changed files for security issues\"",
      },
      { type: "heading", level: 2, text: "Where it runs" },
      {
        type: "paragraph",
        text: "Claude Code is not a single app — it is an engine available across several surfaces. Your project instructions (CLAUDE.md), settings, and connected tools work the same way everywhere:",
      },
      {
        type: "list",
        items: [
          "Terminal CLI — the full-featured experience; edit files, run commands, pipe data",
          "VS Code and JetBrains extensions — inline diffs and context sharing inside your editor",
          "Desktop app — visual diff review, multiple sessions side by side, scheduled tasks",
          "Web (claude.ai/code) — no local setup required; start tasks from any browser",
          "GitHub Actions / GitLab CI/CD — automated code review and issue triage in CI",
          "Slack — mention @Claude with a bug report and receive a pull request back",
        ],
      },
      { type: "heading", level: 2, text: "How this guide is organized" },
      {
        type: "paragraph",
        text: "This guide takes you from zero to productive in a structured order. You will start with installation and your first session, then move into the features that make Claude Code powerful for daily work: memory and project instructions, slash commands, MCP tool connections, hooks for automation, and running sub-agents for bigger tasks. Each lesson is focused and practical — read them in order or jump to what you need.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Claude Code is an agentic tool that reads your whole codebase and takes real actions — writing code, running commands, committing to git — while always asking before it changes anything. It runs in your terminal, your editor, a desktop app, and the browser, and the same settings follow you everywhere. The next lessons cover installation and your first session. For the complete feature overview, see the official docs at code.claude.com/docs/en/overview.",
      },
    ],
  },
  {
    slug: "installation",
    title: "Installation & Setup",
    summary: "Get Claude Code running on macOS, Windows, or Linux in minutes.",
    sectionId: "getting-started",
    estMinutes: 8,
    difficulty: "beginner",
    icon: "Download",
    body: [
      {
        type: "paragraph",
        text: "Claude Code is a CLI tool that runs in your terminal. Getting it installed and logged in takes about five minutes — this lesson walks you through exactly that.",
      },
      { type: "heading", level: 2, text: "Requirements" },
      {
        type: "paragraph",
        text: "Before you install, make sure your machine qualifies. Claude Code needs a supported OS, enough RAM, a network connection, and a paid Anthropic account.",
      },
      {
        type: "list",
        items: [
          "Operating system: macOS 13+, Windows 10 1809+ / Server 2019+, Ubuntu 20.04+, Debian 10+, or Alpine 3.19+",
          "Hardware: 4 GB+ RAM, x64 or ARM64 processor",
          "Network: a live internet connection (Claude Code calls Anthropic's servers for every request)",
          "Account: a Claude Pro, Max, Team, Enterprise, or Anthropic Console subscription — the free Claude.ai plan does not include CLI access",
          "Country: your location must be in an Anthropic-supported country (anthropic.com/supported-countries)",
        ],
      },
      { type: "heading", level: 2, text: "Install the CLI" },
      {
        type: "paragraph",
        text: "The recommended method is the native installer — a single command that downloads the binary, adds it to your PATH, and sets up auto-updates. Pick the command for your platform:",
      },
      {
        type: "code",
        language: "bash",
        code: "# macOS, Linux, or WSL\ncurl -fsSL https://claude.ai/install.sh | bash",
      },
      {
        type: "code",
        language: "powershell",
        code: "# Windows PowerShell\nirm https://claude.ai/install.ps1 | iex",
      },
      {
        type: "code",
        language: "batch",
        code: "# Windows CMD\ncurl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd",
      },
      {
        type: "paragraph",
        text: "Prefer a package manager? Homebrew and WinGet are supported alternatives:",
      },
      {
        type: "code",
        language: "bash",
        code: "# macOS — Homebrew\nbrew install --cask claude-code\n\n# Windows — WinGet\nwinget install Anthropic.ClaudeCode",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Homebrew and WinGet do not auto-update",
        text: "The native installer keeps itself up to date automatically in the background. Homebrew and WinGet do not — you need to run 'brew upgrade claude-code' or 'winget upgrade Anthropic.ClaudeCode' manually to get new versions.",
      },
      {
        type: "callout",
        variant: "note",
        title: "Windows: install Git for Windows for the best experience",
        text: "On native Windows, Claude Code uses PowerShell to run shell commands by default. Installing Git for Windows (git-scm.com/downloads/win) also gives Claude Code access to Git Bash, which is useful for Bash-based scripts and tooling. WSL users do not need Git for Windows — just run the Linux installer inside your WSL terminal.",
      },
      { type: "heading", level: 2, text: "Authenticate" },
      {
        type: "paragraph",
        text: "Once installed, navigate to any project folder and run 'claude'. Claude Code will open a browser window and ask you to log in with your Anthropic account. Follow the prompts — it takes about thirty seconds.",
      },
      {
        type: "code",
        language: "bash",
        code: "cd your-project\nclaude",
      },
      {
        type: "callout",
        variant: "note",
        title: "Browser did not open automatically?",
        text: "Press 'c' at the login prompt to copy the OAuth URL to your clipboard, then paste it into a browser manually. This also works in SSH sessions or WSL where the browser opens on a different machine.",
      },
      { type: "heading", level: 2, text: "Verify your setup" },
      {
        type: "paragraph",
        text: "After installation and login, confirm everything is working with two quick commands:",
      },
      {
        type: "code",
        language: "bash",
        code: "# Check the installed version\nclaude --version\n\n# Run a full diagnostic (checks auth, PATH, updates, and more)\nclaude doctor",
      },
      { type: "heading", level: 2, text: "If something goes wrong" },
      {
        type: "paragraph",
        text: "Two issues account for the vast majority of post-install problems:",
      },
      {
        type: "list",
        items: [
          "'command not found: claude' — the install directory is not in your PATH. On macOS/Linux, add 'export PATH=\"$HOME/.local/bin:$PATH\"' to your ~/.zshrc or ~/.bashrc, then restart your terminal. On Windows, add '%USERPROFILE%\\.local\\bin' to your User PATH in System Settings.",
          "Install script returns HTML or a 403 error — your network or region may be blocking claude.ai. Try Homebrew ('brew install --cask claude-code') on macOS or WinGet ('winget install Anthropic.ClaudeCode') on Windows as an alternative, or retry on a different network.",
          "403 Forbidden after login — check that your subscription is active at claude.ai/settings. If you use the Anthropic Console, confirm your account has the 'Claude Code' or 'Developer' role.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Install with the native one-liner for your platform, run 'claude' in your project to authenticate, and verify with 'claude --version' or 'claude doctor'. The native installer handles updates automatically; Homebrew and WinGet require manual upgrades. Full setup docs and a complete troubleshooting reference are at code.claude.com/docs/en/setup.",
      },
    ],
  },
  {
    slug: "first-session",
    title: "Your First Session",
    summary: "Open a project, ask for a change, and watch Claude Code work.",
    sectionId: "getting-started",
    estMinutes: 10,
    difficulty: "beginner",
    icon: "Play",
    body: [
      {
        type: "paragraph",
        text: "Once Claude Code is installed, starting a session takes one command — and from there you talk to it like a colleague, in plain language. This lesson walks you through launching Claude Code in a real project, exploring the codebase, making a change, reviewing the diff, and wrapping up with a commit.",
      },
      { type: "heading", level: 2, text: "Start Claude Code" },
      {
        type: "paragraph",
        text: "Navigate to any project directory in your terminal and run the claude command. That is all it takes to open an interactive session.",
      },
      {
        type: "code",
        language: "bash",
        code: "cd /path/to/your/project\nclaude",
      },
      {
        type: "paragraph",
        text: "You will see a prompt showing the current model and working directory. Type /help at any time to see available commands, or /exit (or Ctrl+D) to quit.",
      },
      { type: "heading", level: 2, text: "Ask your first question" },
      {
        type: "paragraph",
        text: "Start by asking Claude to explain the project. You do not need to point it at any files — it reads them automatically as needed.",
      },
      {
        type: "code",
        language: "bash",
        code: "what does this project do?\nexplain the folder structure\nwhere is the main entry point?",
      },
      {
        type: "callout",
        variant: "tip",
        title: "No manual context needed",
        text: "Claude Code reads your project files on its own. You never have to paste code into the prompt or tell it which files to look at — just ask your question and it figures out what to read.",
      },
      { type: "heading", level: 2, text: "Make your first change" },
      {
        type: "paragraph",
        text: "Describe what you want in plain English. Claude will find the right file, plan the edit, and show you exactly what it intends to do before touching anything.",
      },
      {
        type: "code",
        language: "bash",
        code: "add a hello world function to the main file\nthere's a bug where users can submit empty forms - fix it\nadd input validation to the user registration form",
      },
      {
        type: "list",
        items: [
          "Claude locates the relevant file on its own",
          "It shows you the proposed changes as a diff",
          "It waits for your approval before writing anything",
          "If tests exist, it can run them automatically",
        ],
      },
      { type: "heading", level: 2, text: "Review and accept edits" },
      {
        type: "paragraph",
        text: "After Claude proposes a change you will see the diff inline. You can approve it, reject it, or ask Claude to adjust the approach before applying anything. For longer sessions where you trust the direction, you can enable 'Accept all' mode so edits apply without a prompt each time — press Shift+Tab to cycle through permission modes.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Always review before accepting",
        text: "Claude is helpful but not infallible. Read the diff before you approve, especially for changes to core logic or configuration files. You can always ask it to explain a change: 'why did you modify that file?'",
      },
      { type: "heading", level: 2, text: "Keep the loop going" },
      {
        type: "paragraph",
        text: "Once your changes look good, you can ask Claude to handle git as well — in the same conversational style.",
      },
      {
        type: "code",
        language: "bash",
        code: "what files have I changed?\ncommit my changes with a descriptive message\ncreate a new branch called feature/quickstart",
      },
      {
        type: "paragraph",
        text: "You can keep building on the same session: ask for a refactor, request new tests, or have it review your own changes. Use the up-arrow key for history, Tab for command completion, and /clear to reset the conversation when you want a fresh start on a new task.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Run claude inside your project directory to start. Ask questions in plain language — Claude reads your files automatically. Every file change is shown as a diff and requires your approval before it is applied. Git operations work the same way: just describe what you want. For the full quickstart reference, see code.claude.com/docs/en/quickstart.",
      },
    ],
  },

  // ── Core Concepts ──────────────────────────────────────────────────
  {
    slug: "slash-commands",
    title: "Slash Commands",
    summary: "Reusable, parameterized prompts you trigger with /command.",
    sectionId: "core-concepts",
    estMinutes: 9,
    difficulty: "beginner",
    icon: "Slash",
    body: [
      {
        type: "paragraph",
        text: "Slash commands are shortcuts you type in the Claude Code prompt to trigger built-in actions or your own reusable workflows — one short command instead of re-explaining the same thing every session.",
      },
      { type: "heading", level: 2, text: "How commands work" },
      {
        type: "paragraph",
        text: "Type a forward slash at the start of any message to open the command menu. You can keep typing to filter the list. Whatever text you add after the command name is passed to it as arguments. Commands are only recognized at the very start of a message — mid-sentence slashes are treated as plain text.",
      },
      {
        type: "code",
        language: "text",
        code: "/help\n/clear\n/compact focus on the auth changes only\n/model opus",
      },
      { type: "heading", level: 2, text: "Built-in commands worth knowing" },
      {
        type: "paragraph",
        text: "Claude Code ships with dozens of built-in commands. These are the ones you will reach for most often as you get started:",
      },
      {
        type: "list",
        items: [
          "/help — list every available command with a short description",
          "/clear — wipe the conversation and start fresh (your CLAUDE.md memory is kept)",
          "/compact — summarize the conversation to free up context window space; pass optional focus instructions",
          "/config — open the settings panel to change theme, model, and other preferences",
          "/mcp — manage connected MCP server connections",
          "/agents — configure subagents Claude can delegate tasks to",
          "/init — generate a starter CLAUDE.md for a new project",
          "/memory — edit your CLAUDE.md memory files",
          "/model — switch the AI model mid-session",
          "/skills — list all loaded skills and their token costs",
        ],
      },
      {
        type: "callout",
        variant: "note",
        title: "Built-ins vs bundled skills",
        text: "Some commands (like /code-review and /debug) are labeled 'Skill' in the docs. They work identically from your perspective, but under the hood they are prompt-based instructions rather than hard-coded logic — which also means Claude can invoke them automatically when relevant.",
      },
      { type: "heading", level: 2, text: "Creating your own command" },
      {
        type: "paragraph",
        text: "Custom commands are just Markdown files saved in a special directory. Create a file and Claude Code immediately registers it as a slash command — no restart needed. There are two file layouts that both work:",
      },
      {
        type: "list",
        items: [
          "~/.claude/skills/<command-name>/SKILL.md — personal, available in every project",
          ".claude/skills/<command-name>/SKILL.md — project-scoped, committed with the repo",
          ".claude/commands/<name>.md — legacy path, still fully supported",
        ],
      },
      {
        type: "paragraph",
        text: "The directory name (or file name for the legacy path) becomes the command you type. A file at .claude/skills/summarize-pr/SKILL.md is invoked with /summarize-pr.",
      },
      { type: "heading", level: 2, text: "Anatomy of a skill file" },
      {
        type: "paragraph",
        text: "Every skill file has two parts: optional YAML frontmatter between --- markers that configures behavior, and plain Markdown content with the instructions Claude follows. Here is a minimal example that accepts an argument:",
      },
      {
        type: "code",
        language: "yaml",
        code: "# .claude/skills/open-issue/SKILL.md\n---\ndescription: Open a GitHub issue for a bug. Use when the user wants to file a bug report.\nargument-hint: <issue title>\n---\n\nCreate a GitHub issue with the title: $ARGUMENTS\n\nBefore creating:\n1. Check if a similar issue already exists with `gh issue list --search \"$ARGUMENTS\"`\n2. Write a short description summarizing the bug and reproduction steps\n3. Run: gh issue create --title \"$ARGUMENTS\" --body \"<description>\"",
      },
      {
        type: "paragraph",
        text: "You can now type /open-issue login page throws 500 on empty password and Claude will run the full workflow. The $ARGUMENTS placeholder expands to everything you typed after the command name.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Inject live data with shell commands",
        text: "Prefix a line with !`command` to run a shell command and inline its output before Claude sees the skill. This is useful for grounding Claude in real state — for example, !`git diff HEAD` pulls in your actual diff rather than relying on open files.",
      },
      { type: "heading", level: 2, text: "Controlling who invokes a skill" },
      {
        type: "paragraph",
        text: "By default, Claude can invoke a skill automatically when it judges the skill is relevant. Add disable-model-invocation: true to the frontmatter to make a skill manual-only — useful for destructive or deployment workflows you only want to trigger yourself. Pair it with user-invocable: false to hide a skill from the / menu entirely, making it background knowledge Claude loads quietly.",
      },
      {
        type: "code",
        language: "yaml",
        code: "---\ndescription: Deploy the application to production\ndisable-model-invocation: true\n---\n\n1. Run the test suite: npm test\n2. Build: npm run build\n3. Push: git push origin main",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Command name comes from the directory, not the frontmatter",
        text: "The name: field in frontmatter sets the display label shown in skill listings — it does not change what you type to invoke the skill. The invocation name always comes from the directory name (or filename for .claude/commands/ files). Renaming the frontmatter name: field will not change /command-name.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Type / to browse all commands; the most useful built-ins are /help, /clear, /compact, /config, and /mcp. Create custom commands by adding a SKILL.md file to .claude/skills/<name>/ — project-scoped or personal. Use $ARGUMENTS to pass input, !`shell command` to inject live context, and disable-model-invocation: true for workflows you want manual control over. Full reference: code.claude.com/docs/en/commands.",
      },
    ],
  },
  {
    slug: "mcp",
    title: "MCP (Model Context Protocol)",
    summary: "Connect Claude Code to external tools, data, and services.",
    sectionId: "core-concepts",
    estMinutes: 14,
    difficulty: "intermediate",
    icon: "Plug",
    body: [
      {
        type: "paragraph",
        text: "MCP (Model Context Protocol) is an open standard that lets Claude Code connect to external tools and data sources — GitHub, Jira, Slack, databases, and more — so instead of copy-pasting information into chat, Claude can read and act on those systems directly.",
      },
      { type: "heading", level: 2, text: "What MCP is for" },
      {
        type: "paragraph",
        text: "Without MCP, Claude only knows what you paste into the conversation. With an MCP server connected, Claude can query your issue tracker, pull a database schema, check a monitoring dashboard, or open a GitHub PR — all from a single prompt. Think of MCP servers as plugins: each one teaches Claude how to talk to a specific tool.",
      },
      {
        type: "list",
        items: [
          "\"Implement the feature described in JIRA-4521 and open a PR on GitHub.\"",
          "\"What are the most common Sentry errors in the last 24 hours?\"",
          "\"Find customers who haven't purchased in 90 days from our PostgreSQL database.\"",
        ],
      },
      { type: "heading", level: 2, text: "Add your first server" },
      {
        type: "paragraph",
        text: "Run these commands in your terminal before starting a Claude session. There are two common shapes: a hosted server you reach over HTTP, and a local server that runs as a process on your machine.",
      },
      {
        type: "code",
        language: "bash",
        code: "# Hosted HTTP server (recommended for cloud services)\nclaude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp\n\n# Local stdio server — use -- to separate Claude's flags from the server command\nclaude mcp add playwright -- npx -y @playwright/mcp@latest\n\n# Check what's connected and its status\nclaude mcp list\n\n# Remove a server when you no longer need it\nclaude mcp remove playwright",
      },
      {
        type: "paragraph",
        text: "After adding a server, start a Claude session and run /mcp to see connection status, authenticate OAuth servers, or reconnect a failed server. The first time Claude calls a new tool it will ask your permission — approve it to continue.",
      },
      {
        type: "callout",
        variant: "note",
        title: "The -- separator",
        text: "For local (stdio) servers, everything after -- is the command Claude runs to start the server. Without it, Claude misreads the server's own flags as its own options.",
      },
      { type: "heading", level: 2, text: "Server scopes" },
      {
        type: "paragraph",
        text: "The scope controls where the server configuration is stored and who can use it. The default is local — private to you, active only in the current project.",
      },
      {
        type: "list",
        items: [
          "local (default): stored in ~/.claude.json, tied to the current project only. Good for personal or experimental servers.",
          "project: written to .mcp.json in your project root. Commit that file and every teammate who clones the repo gets the same server. Each person approves it once on first load.",
          "user: stored in ~/.claude.json at the top level. Active in all your projects, private to you.",
        ],
      },
      {
        type: "code",
        language: "bash",
        code: "# Share a server with your whole team (writes .mcp.json)\nclaude mcp add --scope project --transport http notion https://mcp.notion.com/mcp\n\n# Use a server across all your projects\nclaude mcp add --scope user --transport http hubspot https://mcp.hubspot.com/anthropic",
      },
      { type: "heading", level: 2, text: "Using MCP tools" },
      {
        type: "paragraph",
        text: "Once a server is connected, Claude picks the right tools automatically — you don't need to name the server in every prompt. Tool calls appear in Claude's output labeled with the server name, so you always know where information came from. MCP servers can also expose resources (data objects like issues or schemas) and prompt templates.",
      },
      {
        type: "list",
        items: [
          "Type @ in a prompt to reference a resource by path, for example @github:issue://123.",
          "Type / to see MCP prompt commands, in the format /mcp__servername__promptname.",
          "Run /mcp inside a session to check status, authenticate, or reconnect.",
        ],
      },
      { type: "heading", level: 2, text: "Stay safe with third-party servers" },
      {
        type: "callout",
        variant: "warning",
        title: "Verify before connecting",
        text: "MCP servers can execute commands on your machine and make network requests on your behalf. Servers that fetch external content can expose you to prompt injection — where malicious content in an external resource tries to hijack Claude's actions. Only connect servers you trust. Browse reviewed connectors at claude.ai/directory rather than running arbitrary servers you find online.",
      },
      {
        type: "paragraph",
        text: "Each connected server also loads its tool names into every session, consuming space in Claude's context window. Remove servers you no longer use with claude mcp remove <name> to keep that space free.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "MCP servers are the bridge between Claude and your existing tools. Add a hosted server with claude mcp add --transport http <name> <url>, a local server with claude mcp add <name> -- <command>, and check status with claude mcp list or /mcp inside a session. Use project scope and a committed .mcp.json to share servers with your team. Full reference: code.claude.com/docs/en/mcp.",
      },
    ],
  },
  {
    slug: "skills",
    title: "Skills",
    summary: "Package expertise and instructions Claude loads on demand.",
    sectionId: "core-concepts",
    estMinutes: 12,
    difficulty: "intermediate",
    icon: "Wand2",
    body: [
      {
        type: "paragraph",
        text: "A Skill is a reusable set of instructions you package once and Claude loads on demand — solving the problem of pasting the same checklist or procedure into every chat session.",
      },
      { type: "heading", level: 2, text: "What a skill is" },
      {
        type: "paragraph",
        text: "Think of a skill like a saved recipe. Instead of explaining how to make the dish every time, you write it down once and hand it to the chef whenever you need it. In Claude Code, a skill is a directory containing a SKILL.md file. When relevant to the conversation, Claude reads those instructions automatically — or you can call it directly by typing /skill-name. Unlike content in CLAUDE.md (which loads every session), a skill's body only loads when it runs, so long reference material costs almost nothing until you need it.",
      },
      { type: "heading", level: 2, text: "Anatomy of a skill" },
      {
        type: "paragraph",
        text: "Every skill is a directory. The directory name becomes the slash command you type. Inside that directory, SKILL.md is the required file — it has two parts: a YAML frontmatter block (between --- markers) that tells Claude about the skill, and markdown content with the actual instructions Claude follows when the skill runs.",
      },
      {
        type: "code",
        language: "yaml",
        code: "---\nname: Summarize Changes\ndescription: Summarizes uncommitted changes and flags anything risky. Use when\n  the user asks what changed, wants a commit message, or asks to review their diff.\n---\n\n## Instructions\n\nSummarize the uncommitted changes in two or three bullet points.\nThen list any risks you notice, such as missing error handling or hardcoded values.",
      },
      {
        type: "list",
        items: [
          "description (recommended) — the most important field. Claude reads this to decide when to load the skill automatically. Write it as a plain-English statement of what the skill does and when to use it.",
          "name (optional) — a display label shown in skill listings. It does NOT change the slash command name; only the directory name does that.",
          "disable-model-invocation: true — prevents Claude from loading the skill automatically. Use this for actions with side effects (like /deploy) that you want to trigger yourself.",
          "allowed-tools — tools Claude can use without asking for your approval while the skill is active.",
        ],
      },
      { type: "heading", level: 2, text: "Where skills live" },
      {
        type: "paragraph",
        text: "Where you put a skill controls who can use it. Personal skills (under ~/.claude/skills/) are available across every project you work in. Project skills (under .claude/skills/ inside a repo) apply only to that project and can be committed to version control so your whole team shares them. Plugins can also bundle skills, namespaced as /plugin-name:skill-name to avoid conflicts.",
      },
      {
        type: "list",
        items: [
          "Personal — ~/.claude/skills/<skill-name>/SKILL.md — available in all your projects",
          "Project — .claude/skills/<skill-name>/SKILL.md — this project only; commit to share with teammates",
          "Plugin — <plugin>/skills/<skill-name>/SKILL.md — available wherever the plugin is enabled",
          "Enterprise — managed settings — deployed organization-wide by admins",
        ],
      },
      {
        type: "callout",
        variant: "note",
        title: "Live reloading",
        text: "Claude Code watches skill directories for changes. Editing a SKILL.md takes effect in the current session without restarting. Creating a brand-new skills directory (one that did not exist when the session started) requires a restart.",
      },
      { type: "heading", level: 2, text: "When skills trigger" },
      {
        type: "paragraph",
        text: "Claude loads skill descriptions into context at the start of every session so it knows what tools are available. When your message matches a skill's description, Claude invokes the skill automatically — the full SKILL.md content loads into the conversation and Claude follows the instructions. You can also invoke any user-invocable skill directly by typing /skill-name, with optional arguments after the name.",
      },
      {
        type: "list",
        items: [
          "Automatic — Claude reads description keywords and loads the skill when your message is a match.",
          "Manual slash command — type /skill-name (or /skill-name some argument) to invoke directly.",
          "Arguments — use the $ARGUMENTS placeholder in SKILL.md; /fix-issue 123 passes '123' as $ARGUMENTS.",
          "disable-model-invocation: true — removes the skill from Claude's auto-loading and keeps it user-only.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "If a skill is not triggering",
        text: "The most common cause is a vague description. Claude matches your words against the description text, so put the key use case first and use the natural phrasing a user would say ('summarize my diff', 'review uncommitted changes'). You can always invoke manually with /skill-name to bypass discovery.",
      },
      { type: "heading", level: 2, text: "Write a minimal skill" },
      {
        type: "paragraph",
        text: "Here is a complete working skill that summarizes your uncommitted git changes. Create the directory and file, then try asking Claude 'What did I change?' — it should load the skill automatically.",
      },
      {
        type: "code",
        language: "bash",
        code: "mkdir -p ~/.claude/skills/summarize-changes",
      },
      {
        type: "paragraph",
        text: "Save the following to ~/.claude/skills/summarize-changes/SKILL.md:",
      },
      {
        type: "code",
        language: "yaml",
        code: "---\ndescription: Summarizes uncommitted changes and flags anything risky. Use when\n  the user asks what changed, wants a commit message, or asks to review their diff.\n---\n\n## Current changes\n\n!`git diff HEAD`\n\n## Instructions\n\nSummarize the changes above in two or three bullet points, then list any risks\nyou notice such as missing error handling, hardcoded values, or tests that need\nupdating. If the diff is empty, say there are no uncommitted changes.",
      },
      {
        type: "paragraph",
        text: "The line starting with !` is dynamic context injection — Claude Code runs that shell command before sending the skill to Claude, replacing the line with the actual diff output. Claude sees real data, not a placeholder. You can now trigger the skill two ways: ask 'What did I change?' (automatic) or type /summarize-changes (direct).",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "A skill is a directory with a SKILL.md file — the directory name becomes the /command. The description field drives automatic discovery, so write it in plain language matching what users would actually say. Personal skills (~/.claude/skills/) work across all projects; project skills (.claude/skills/) are scoped to one repo and can be committed for your team. Use disable-model-invocation: true for actions you want to trigger yourself. Full reference: code.claude.com/docs/en/skills.",
      },
    ],
  },
  {
    slug: "subagents",
    title: "Subagents",
    summary: "Delegate focused work to parallel agents with their own context.",
    sectionId: "core-concepts",
    estMinutes: 13,
    difficulty: "advanced",
    icon: "Users",
    body: [
      {
        type: "paragraph",
        text: "A subagent is an isolated AI worker that handles a side task in its own context window and returns only the result to your main conversation — keeping your main session clean and focused.",
      },
      { type: "heading", level: 2, text: "Why use a subagent" },
      {
        type: "paragraph",
        text: "Every Claude Code session has a context window — a finite budget of tokens that holds your conversation, files, and tool results. When you run a task that produces a lot of output (test logs, search results, documentation fetches), that output fills your context and buries the things you actually need to reference later. A subagent handles that noisy work in a separate context window and returns only a summary. Your main conversation stays compact and on-topic.",
      },
      {
        type: "list",
        items: [
          "Preserve context: keep verbose output out of your main conversation",
          "Enforce constraints: limit which tools a subagent can use (e.g., read-only access)",
          "Control costs: route lightweight tasks to faster, cheaper models like Haiku",
          "Reuse configurations: define a specialist once and invoke it across every project",
        ],
      },
      { type: "heading", level: 2, text: "Built-in and custom agents" },
      {
        type: "paragraph",
        text: "Claude Code ships with three built-in subagents that Claude invokes automatically — you do not need to configure them.",
      },
      {
        type: "list",
        items: [
          "Explore — fast, read-only codebase search using the Haiku model. Skips your CLAUDE.md files for speed.",
          "Plan — read-only research used when you are in plan mode. Keeps exploration out of your main context.",
          "General-purpose — full tool access, inherits your model; handles complex multi-step tasks.",
        ],
      },
      {
        type: "callout",
        variant: "note",
        title: "Fresh context, every time",
        text: "Each subagent starts with an empty conversation. It does not see your chat history or the files Claude has already read. Claude writes a delegation message that describes the task, and the subagent works from there.",
      },
      { type: "heading", level: 2, text: "Create a custom subagent" },
      {
        type: "paragraph",
        text: "The easiest way is the /agents command. Run it inside Claude Code, switch to the Library tab, click Create new agent, and follow the prompts — including an option to have Claude generate the system prompt for you. Custom subagents are stored as Markdown files with a YAML frontmatter header. You can also create them by hand.",
      },
      {
        type: "paragraph",
        text: "Project-scoped subagents live in .claude/agents/ and can be checked into version control so your whole team shares them. User-scoped subagents live in ~/.claude/agents/ and are available across all your projects.",
      },
      {
        type: "code",
        language: "markdown",
        code: "---\nname: code-reviewer\ndescription: Reviews code for quality and best practices. Use proactively after code changes.\ntools: Read, Glob, Grep\nmodel: sonnet\n---\n\nYou are a code reviewer. Analyze code and provide actionable feedback\non quality, security, and best practices. Run git diff first to see\nrecent changes, then review modified files.",
      },
      {
        type: "paragraph",
        text: "The two required fields are name (lowercase letters and hyphens) and description. The description is what Claude reads to decide when to delegate to this subagent, so write it clearly. The tools field is an allowlist — omit it to inherit all tools from the main conversation. The model field accepts sonnet, opus, haiku, fable, or inherit (the default).",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Restart required for manual file edits",
        text: "If you add or edit a subagent file directly on disk, you need to restart your Claude Code session before it loads. Subagents created through the /agents interface take effect immediately without a restart.",
      },
      { type: "heading", level: 2, text: "Run agents in parallel" },
      {
        type: "paragraph",
        text: "You can ask Claude to research several independent areas at the same time. Claude runs the subagents in the background concurrently, then synthesizes their results once they finish.",
      },
      {
        type: "code",
        language: "text",
        code: "Research the authentication, database, and API modules in parallel using separate subagents",
      },
      {
        type: "paragraph",
        text: "Background subagents auto-deny any permission prompt that would normally require your input, so they can run unattended. If a subagent fails because it needed a permission it did not have, you can re-run the same task in the foreground to handle the prompts interactively. You can also @-mention a specific subagent by name to guarantee it handles a task: type @ and pick the agent from the typeahead, the same way you reference files.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Parallel results consume main context",
        text: "When background subagents complete, their summaries return to your main conversation. Running many in parallel that each return detailed results can still consume significant context. For very large jobs, consider dynamic workflows instead.",
      },
      { type: "heading", level: 2, text: "Subagents vs other approaches" },
      {
        type: "paragraph",
        text: "Claude Code has four ways to parallelize work. Choose based on who coordinates the work and whether tasks need to communicate.",
      },
      {
        type: "list",
        items: [
          "Subagents — best when a side task would flood your main conversation. Claude delegates and collects results inside one session.",
          "Agent view (claude agents) — best when you have several independent tasks you want to hand off and check on later from a single overview screen.",
          "Agent teams — best when you want Claude to plan a project, split it into pieces, and supervise a group of workers. Experimental and disabled by default.",
          "Dynamic workflows — best when a job is too large for a handful of subagents, or when you need findings cross-checked against each other (audits, large migrations, multi-angle research).",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Subagents keep your main conversation focused by doing noisy work in an isolated context. Use the /agents command to create custom ones — define a name, description, and optional tools list, and Claude will know when to call them. Store project subagents in .claude/agents/ and commit them so your team can share them. For everything beyond a handful of subagents, see the full parallelism guide at code.claude.com/docs/en/sub-agents.",
      },
    ],
  },
  {
    slug: "hooks",
    title: "Hooks",
    summary: "Run your own scripts automatically at key points in a session.",
    sectionId: "core-concepts",
    estMinutes: 11,
    difficulty: "advanced",
    icon: "Webhook",
    body: [
      {
        type: "paragraph",
        text: "Hooks let you attach your own shell commands to specific moments in Claude Code's workflow — so things like formatting, linting, or blocking risky operations happen automatically, without you having to remember to run them.",
      },
      { type: "heading", level: 2, text: "What hooks are for" },
      {
        type: "paragraph",
        text: "Think of hooks like git hooks (pre-commit, post-commit) but for Claude's tool calls instead of git operations. Every time Claude uses a tool — reading a file, writing code, running a shell command — hooks can fire before or after that action. You can use them to auto-format edited files, run a linter after every write, log activity, or outright block commands that match a dangerous pattern.",
      },
      {
        type: "list",
        items: [
          "Auto-run Prettier or ESLint after Claude edits a file",
          "Block shell commands that match a risky pattern (e.g. rm -rf)",
          "Send a desktop notification when Claude finishes a long task",
          "Inject extra context into every prompt before Claude sees it",
        ],
      },
      { type: "heading", level: 2, text: "Hook events" },
      {
        type: "paragraph",
        text: "Each hook is tied to a named event in Claude Code's lifecycle. The most useful ones for everyday automation are:",
      },
      {
        type: "list",
        items: [
          "PreToolUse — fires before any tool call; returning exit code 2 blocks the call entirely",
          "PostToolUse — fires after a tool call succeeds; ideal for formatting or linting",
          "UserPromptSubmit — fires when you submit a prompt, before Claude processes it",
          "Stop — fires when Claude finishes responding (useful for notifications)",
          "SessionStart — fires once when a session begins",
        ],
      },
      {
        type: "callout",
        variant: "note",
        title: "Many more events exist",
        text: "The full list includes additional events like SessionEnd, SubagentStop, PreCompact, and Notification. Start with PostToolUse and PreToolUse — they cover most automation needs.",
      },
      { type: "heading", level: 2, text: "Configure a hook" },
      {
        type: "paragraph",
        text: "Hooks live in a settings.json file. The structure has three levels: the event name, a matcher that filters which tool triggers the hook, and the hook handler itself. You can scope hooks to all your projects (~/.claude/settings.json) or to a single project (.claude/settings.json).",
      },
      {
        type: "code",
        language: "json",
        code: "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npx prettier --write \\\"$CLAUDE_FILE_PATHS\\\"\"\n          }\n        ]\n      }\n    ]\n  }\n}",
      },
      {
        type: "paragraph",
        text: "The matcher field filters which tool calls trigger the hook. Use an exact tool name (Edit), a pipe-separated list (Edit|Write), or a regex for more complex patterns. Omit the matcher entirely to match every tool call.",
      },
      { type: "heading", level: 2, text: "Example: auto-format on save" },
      {
        type: "paragraph",
        text: "The most common hook runs a formatter every time Claude writes or edits a file. Add this to your project's .claude/settings.json and Prettier will run automatically on every file Claude touches — no manual step needed.",
      },
      {
        type: "code",
        language: "json",
        code: "{\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"npx prettier --write \\\"$CLAUDE_FILE_PATHS\\\"\",\n            \"timeout\": 10\n          }\n        ]\n      }\n    ]\n  }\n}",
      },
      {
        type: "paragraph",
        text: "For blocking hooks (PreToolUse), exit with code 2 to prevent the tool call — Claude will see your stderr message and stop. Exit code 0 means success. Exit code 1 is a non-blocking error and does not stop anything.",
      },
      { type: "heading", level: 2, text: "Use hooks safely" },
      {
        type: "callout",
        variant: "warning",
        title: "Hooks run shell commands with your full permissions",
        text: "Any command in a hook executes as you, with access to everything you have access to. Never add hooks from untrusted sources (e.g. a cloned repo's .claude/settings.json) without reading them first. Treat hook scripts the same as any other code you run on your machine.",
      },
      {
        type: "list",
        items: [
          "Exit code 2 blocks an action; exit code 1 does NOT — it is treated as a non-blocking error",
          "stdout must contain only valid JSON if you return a decision object — stray output will break parsing",
          "Quote file-path variables in your commands so paths with spaces do not break",
          "For hard security enforcement, prefer Claude Code's permission system over a hook",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Hooks are shell commands that fire automatically at named lifecycle events (PreToolUse, PostToolUse, Stop, etc.). Configure them in settings.json with a matcher and a command. Use PostToolUse for formatting and linting, PreToolUse with exit 2 to block risky actions. Full reference: code.claude.com/docs/en/hooks.",
      },
    ],
  },
  {
    slug: "memory-claude-md",
    title: "Memory & CLAUDE.md",
    summary: "Give Claude durable project context that persists across sessions.",
    sectionId: "core-concepts",
    estMinutes: 9,
    difficulty: "beginner",
    icon: "BookMarked",
    body: [
      {
        type: "paragraph",
        text: "Claude Code starts every session with a blank slate — no memory of your last conversation. CLAUDE.md files are how you give Claude permanent context about your project so you never have to repeat yourself.",
      },
      { type: "heading", level: 2, text: "How memory works" },
      {
        type: "paragraph",
        text: "Claude Code has two memory systems that load at the start of every session. First, CLAUDE.md files: plain Markdown files you write containing instructions, conventions, and project facts. Second, auto memory: notes Claude writes to itself based on corrections and preferences it picks up during your sessions. Both end up in Claude's context window before you type your first message.",
      },
      {
        type: "callout",
        variant: "note",
        title: "Context, not enforcement",
        text: "CLAUDE.md is guidance, not a hard rule. Claude reads it and tries to follow it, but there is no guarantee of strict compliance — especially for vague instructions. For behavior that must always happen (like running a linter before every commit), use a hook instead.",
      },
      { type: "heading", level: 2, text: "Where memory lives" },
      {
        type: "paragraph",
        text: "Claude loads CLAUDE.md files from several locations. They are all concatenated together — none override the others. Here is the load order from broadest to most specific:",
      },
      {
        type: "list",
        items: [
          "Managed policy (org-wide, cannot be excluded) — macOS: /Library/Application Support/ClaudeCode/CLAUDE.md | Linux: /etc/claude-code/CLAUDE.md | Windows: C:\\Program Files\\ClaudeCode\\CLAUDE.md",
          "User (~/.claude/CLAUDE.md) — your personal preferences, applies to every project",
          "Project (./CLAUDE.md or ./.claude/CLAUDE.md) — team-shared, checked into source control",
          "Local (./CLAUDE.local.md) — your personal project-specific notes; add to .gitignore so it stays off source control",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Run /init to get started fast",
        text: "The /init command analyzes your codebase and generates a starter CLAUDE.md with build commands, test instructions, and conventions it discovers. If a CLAUDE.md already exists, it suggests improvements instead of overwriting.",
      },
      { type: "heading", level: 2, text: "Write an effective CLAUDE.md" },
      {
        type: "paragraph",
        text: "Think of CLAUDE.md as the onboarding doc you wish every new teammate had read. Write down what you would otherwise re-explain in chat. Keep entries concrete and verifiable — 'Use 2-space indentation' works far better than 'Format code nicely.' Target under 200 lines; longer files consume more context and Claude follows them less reliably.",
      },
      {
        type: "code",
        language: "markdown",
        code: "# My Project\n\n## Commands\n- Install: `npm install`\n- Dev server: `npm run dev`\n- Tests: `npm test` (always run before committing)\n\n## Conventions\n- Use 2-space indentation, single quotes in JS/TS\n- API handlers live in `src/api/handlers/`\n- New components go in `src/components/`, one file per component\n- Never push directly to `main`\n\n## Architecture\n- Auth is handled by the `auth` service — do not duplicate logic elsewhere\n- All DB queries go through the repository layer in `src/db/`",
      },
      {
        type: "paragraph",
        text: "You can also pull in other files using @path imports. Put an @path reference anywhere in your CLAUDE.md and Claude will expand that file into context at load time:",
      },
      {
        type: "code",
        language: "markdown",
        code: "# Project Instructions\n\nSee @README.md for the full project overview.\nAvailable npm scripts: @package.json\n\n# Git workflow\n@docs/git-workflow.md",
      },
      { type: "heading", level: 2, text: "Quick-add with #" },
      {
        type: "paragraph",
        text: "The fastest way to save something is the # shortcut. Start any message with # and Claude saves that note to memory for you — choosing which CLAUDE.md (or auto-memory) file it belongs in. You can also just tell Claude in plain English: 'add this to CLAUDE.md' and it will edit the file for you. To browse everything that has been loaded or saved, run /memory in any session.",
      },
      {
        type: "code",
        language: "bash",
        code: "# always use pnpm, not npm\n# the staging API is at https://api-staging.example.com",
      },
      { type: "heading", level: 2, text: "What to leave out" },
      {
        type: "paragraph",
        text: "Not everything belongs in CLAUDE.md. Overloading it makes Claude less likely to follow any of it.",
      },
      {
        type: "list",
        items: [
          "Multi-step procedures for a specific workflow — put those in a skill file instead (they load on demand, not every session)",
          "Instructions that only apply to one subdirectory — use a nested CLAUDE.md in that directory so it loads only when relevant",
          "Personal preferences in a shared project file — use CLAUDE.local.md (gitignored) or ~/.claude/CLAUDE.md",
          "Anything over ~200 lines total — trim, split, or move detail into imported files",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Conflicting instructions",
        text: "If two CLAUDE.md files give different guidance for the same behavior, Claude may pick one arbitrarily. Review your files periodically and remove outdated or contradictory entries.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "CLAUDE.md files give Claude permanent context across sessions — write what you would otherwise retype each time. Use the project file for team standards, ~/.claude/CLAUDE.md for personal preferences, and CLAUDE.local.md for private notes. The # shortcut saves a note instantly. Keep files under 200 lines and make every rule concrete. Full reference: code.claude.com/docs/en/memory.",
      },
    ],
  },
  {
    slug: "configuration",
    title: "Configuration & Settings",
    summary: "Tune permissions, models, and behavior with settings.json.",
    sectionId: "core-concepts",
    estMinutes: 10,
    difficulty: "intermediate",
    icon: "Settings2",
    body: [
      {
        type: "paragraph",
        text: "Claude Code's behavior is controlled by JSON settings files — you can tell it which commands to allow or deny, which model to use, and how to handle git attribution, all without touching any code.",
      },
      { type: "heading", level: 2, text: "Settings files and precedence" },
      {
        type: "paragraph",
        text: "Claude Code reads settings from several files layered on top of each other. When the same key appears in multiple files, the higher-priority file wins. Think of it as a stack of sticky notes — lower ones only show through where higher ones don't cover them.",
      },
      {
        type: "list",
        items: [
          "1 (lowest) — User: ~/.claude/settings.json — your personal defaults across all projects",
          "2 — Project: .claude/settings.json — committed to the repo, shared with your whole team",
          "3 — Local: .claude/settings.local.json — your personal overrides for this repo only (gitignored)",
          "4 — Command-line arguments — one-off flags for the current session only",
          "5 (highest) — Managed: enterprise IT-deployed policies — cannot be overridden by anything",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Which file should you edit?",
        text: "For personal preferences (your editor mode, preferred language), use ~/.claude/settings.json. For team-wide rules (what commands Claude is allowed to run in this repo), use .claude/settings.json and commit it. For personal tweaks that shouldn't go in git, use .claude/settings.local.json.",
      },
      { type: "heading", level: 2, text: "Permissions" },
      {
        type: "paragraph",
        text: "The permissions system lets you pre-approve or block specific actions so Claude doesn't have to stop and ask every time. You write rules as 'ToolName(pattern)' strings inside allow, deny, or ask arrays. Rules from all scopes are merged together — a deny in your user settings still applies even if the project settings have an allow.",
      },
      {
        type: "list",
        items: [
          "allow — Claude may run this without asking you first",
          "deny — Claude is blocked from running this entirely",
          "ask — Claude must pause and ask you before proceeding",
          "Patterns use prefixes and wildcards, e.g. Bash(npm run test:*) to allow a family of commands",
          "Examples: Bash(npm run test:*) allows any npm test script; Read(./.env) blocks reading your env file",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Permissions merge, they don't override",
        text: "Unlike most settings (where a higher-priority file wins), permission rules from all files stack together. If your user settings deny Bash(curl:*) and the project settings allow it, the deny still applies. Be intentional about what you put where.",
      },
      { type: "heading", level: 2, text: "Useful settings" },
      {
        type: "paragraph",
        text: "Beyond permissions, a handful of settings are worth knowing early on. Most take effect immediately — Claude Code hot-reloads settings files while running. The main exception is model, read at startup; use /model to switch mid-session.",
      },
      {
        type: "list",
        items: [
          "model — set a default model, e.g. 'claude-sonnet-4-6'",
          "env — environment variables injected into every session and subprocess Claude spawns",
          "hooks — shell commands to run at lifecycle events (before/after tool use, on session end)",
          "disableAllHooks — boolean; set true to turn off all hooks at once",
          "includeCoAuthoredBy — set false to drop the 'Co-authored-by Claude' line from commits and PRs",
          "cleanupPeriodDays — how many days to keep session transcripts (default 30)",
          "$schema — add the SchemaStore URL to get IDE autocomplete on your settings file",
        ],
      },
      { type: "heading", level: 2, text: "Example settings.json" },
      {
        type: "paragraph",
        text: "Here is a realistic project-level .claude/settings.json that pre-approves safe commands, blocks reading secrets, sets a model, and injects an environment variable.",
      },
      {
        type: "code",
        language: "json",
        code: "{\n  \"$schema\": \"https://json.schemastore.org/claude-code-settings.json\",\n  \"model\": \"claude-sonnet-4-6\",\n  \"env\": {\n    \"NODE_ENV\": \"development\"\n  },\n  \"permissions\": {\n    \"allow\": [\n      \"Bash(npm run lint)\",\n      \"Bash(npm run test:*)\",\n      \"Bash(npm run build)\"\n    ],\n    \"deny\": [\n      \"Bash(curl:*)\",\n      \"Read(./.env)\",\n      \"Read(./.env.*)\",\n      \"Read(./secrets/**)\"\n    ]\n  },\n  \"includeCoAuthoredBy\": true,\n  \"cleanupPeriodDays\": 14\n}",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Settings live in layered JSON files — user, project, local, and managed. Permissions use allow/deny/ask with tool-name patterns and merge across all files rather than override. Most settings hot-reload without a restart; model is read at startup. Full reference: code.claude.com/docs/en/settings.",
      },
    ],
  },

  // ── Best Practices ─────────────────────────────────────────────────
  {
    slug: "effective-prompting",
    title: "Effective Prompting",
    summary: "Communicate intent so Claude Code gets it right the first time.",
    sectionId: "best-practices",
    estMinutes: 11,
    difficulty: "intermediate",
    icon: "MessageSquareText",
    body: [
      {
        type: "paragraph",
        text: "Getting good results from Claude Code is less about magic words and more about clear communication — the same skills that make you effective when pairing with another engineer.",
      },
      { type: "heading", level: 2, text: "Be specific about intent" },
      {
        type: "paragraph",
        text: "Vague prompts force Claude to guess what you want. Specific prompts tell Claude exactly what to build, what to avoid, and what 'done' looks like. You don't need to write an essay — just answer the implicit questions: what file, what behavior, what constraints?",
      },
      {
        type: "list",
        items: [
          "Weak: 'add tests for foo.py' — Claude picks whatever it thinks is worth testing",
          "Strong: 'write a test for foo.py covering the edge case where the user is logged out. avoid mocks.' — scope, scenario, and constraints all present",
          "Weak: 'fix the login bug' — Claude has to guess what's broken",
          "Strong: 'users report login fails after session timeout. check src/auth/, especially token refresh. write a failing test that reproduces it, then fix it' — symptom, location, and success condition",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "When vague is fine",
        text: "Open-ended prompts like 'what would you improve in this file?' are useful when you're exploring and want Claude to surface things you haven't thought to ask about. Save specificity for when you know what you want.",
      },
      { type: "heading", level: 2, text: "Give context, not just commands" },
      {
        type: "paragraph",
        text: "Claude can read your files and run commands — but it can't read your mind. Point it at the right sources and paste the right details, and you'll get a much more accurate result on the first try.",
      },
      {
        type: "list",
        items: [
          "Use @ to reference files directly: 'look at @src/auth/session.ts and explain how tokens are refreshed'",
          "Paste error output inline rather than describing it: share the actual stack trace, not 'I got a weird error'",
          "Point to existing patterns: 'look at HotDogWidget.php as a reference — follow the same pattern for a new CalendarWidget'",
          "Pipe data in from the shell: cat error.log | claude sends file contents without copying manually",
        ],
      },
      {
        type: "code",
        language: "text",
        code: "# Weak\nadd a calendar widget\n\n# Strong\nlook at how existing widgets work in HotDogWidget.php.\nfollow that pattern to build a CalendarWidget that lets the\nuser pick a month and paginate forwards/backwards by year.\nno new libraries beyond what's already used.",
      },
      { type: "heading", level: 2, text: "Iterate in small steps" },
      {
        type: "paragraph",
        text: "Claude works best in tight feedback loops. Rather than describing an entire feature in one prompt and waiting, ask for one piece at a time. Review it, redirect if needed, then continue. Smaller steps mean mistakes stay small and are easier to catch.",
      },
      {
        type: "list",
        items: [
          "Ask Claude to implement one function, run the tests, then move on",
          "After each change, check the output before asking for the next step",
          "If something looks off, stop with Esc and redirect — don't let a wrong direction run for 10 more steps",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Correcting more than twice? Start fresh",
        text: "If you've corrected Claude on the same issue two or more times in a row, the conversation context has accumulated failed approaches that are actively confusing things. Run /clear and write a new, more specific prompt using what you learned. A clean session with a better prompt almost always beats a long session with accumulated corrections.",
      },
      { type: "heading", level: 2, text: "Plan before big changes" },
      {
        type: "paragraph",
        text: "When a change touches multiple files or you're not sure of the right approach, use plan mode. Claude reads your code and proposes a plan without touching anything on disk. You review it, edit it if needed, then approve. This separates 'figure out what to do' from 'actually do it' — and avoids implementing the wrong solution.",
      },
      {
        type: "code",
        language: "text",
        code: "# Step 1 — Enter plan mode (Shift+Tab or --permission-mode plan)\n# Ask Claude to explore first:\nread /src/auth and understand how sessions and login work.\nalso look at how we store secrets.\n\n# Step 2 — Ask for a plan:\nI want to add Google OAuth. What files need to change?\nWhat's the session flow? Create a detailed plan.\n\n# Step 3 — Switch out of plan mode, then implement:\nimplement the OAuth flow from your plan. write tests for the\ncallback handler, run them, and fix any failures.",
      },
      {
        type: "callout",
        variant: "note",
        title: "Skip planning for small tasks",
        text: "Plan mode adds overhead. If you can describe the change in one sentence — 'fix the typo on line 42' — just ask Claude to do it directly.",
      },
      { type: "heading", level: 2, text: "Course-correct early" },
      {
        type: "paragraph",
        text: "Claude occasionally solves problems on the first try, but more often you'll need to steer it. The earlier you redirect, the less you have to undo. Watch what Claude is doing and step in as soon as something looks wrong — don't wait until it's finished to point out a problem.",
      },
      {
        type: "list",
        items: [
          "Press Esc to stop Claude mid-action — your context is preserved so you can redirect immediately",
          "Press Esc twice (or run /rewind) to roll back to a previous checkpoint and try a different approach",
          "Say 'undo that' to have Claude revert its last changes",
          "Run /clear between unrelated tasks so old context doesn't bleed into new work",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Effective prompting comes down to a few habits: be specific about what you want and what done looks like, point Claude at real files and real error output instead of describing them, work in small reviewable steps, use plan mode when the approach is uncertain, and redirect early rather than letting a wrong direction run. For the full reference on these patterns and more, see code.claude.com/docs/en/best-practices.",
      },
    ],
  },
  {
    slug: "project-setup",
    title: "Project Setup",
    summary: "Structure a repo so Claude Code is productive from minute one.",
    sectionId: "best-practices",
    estMinutes: 10,
    difficulty: "intermediate",
    icon: "FolderTree",
    body: [
      {
        type: "paragraph",
        text: "A well-structured repo means Claude Code hits the ground running every session — no repeated explanations, no guesswork about your conventions, and automated guardrails that catch mistakes before you do.",
      },
      { type: "heading", level: 2, text: "Run /init first" },
      {
        type: "paragraph",
        text: "Before you write a single file by hand, run /init inside your project root. Claude analyzes your codebase — build system, test framework, file structure — and generates a starter CLAUDE.md with the basics already filled in. If a CLAUDE.md already exists, /init suggests improvements rather than overwriting it. Think of it as Claude interviewing your repo and writing its own onboarding notes.",
      },
      {
        type: "code",
        language: "bash",
        code: "# Inside your project root\n/init",
      },
      { type: "heading", level: 2, text: "The files that matter" },
      {
        type: "paragraph",
        text: "After /init, your project's Claude-aware structure looks like this. Most of it lives inside .claude/ so it stays organized and separate from your source code.",
      },
      {
        type: "code",
        language: "text",
        code: "your-project/\n├── CLAUDE.md               # Project instructions — check this into git\n├── CLAUDE.local.md         # Your personal notes — add to .gitignore\n├── .mcp.json               # MCP server config for this project\n└── .claude/\n    ├── settings.json        # Permissions, hooks, and other config\n    ├── settings.local.json  # Personal local overrides — gitignore this too\n    ├── skills/              # Custom skill directories\n    └── agents/              # Custom subagent definition files",
      },
      {
        type: "list",
        items: [
          "CLAUDE.md — the shared team handbook. Committed to git so everyone benefits. Keep it under 200 lines.",
          "CLAUDE.local.md — your sandbox-only notes: local URLs, personal test data. Never commit this.",
          ".mcp.json — tells Claude which external tools (databases, APIs, design tools) to connect. Add servers with claude mcp add.",
          ".claude/settings.json — technical enforcement: what Claude is allowed or denied to run.",
          ".claude/skills/ — reusable workflow files Claude applies on demand or when you invoke them directly.",
          ".claude/agents/ — definitions for specialized subagents Claude can delegate isolated tasks to.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Gitignore your local files",
        text: "Add CLAUDE.local.md and .claude/settings.local.json to your .gitignore. They contain personal preferences and local paths that have no business in your team's repository.",
      },
      { type: "heading", level: 2, text: "Document commands and conventions" },
      {
        type: "paragraph",
        text: "CLAUDE.md is the first thing Claude reads every session — think of it as the 'new hire handbook' you wish existed when you joined the project. Write down what Claude cannot figure out by reading the code alone.",
      },
      {
        type: "code",
        language: "markdown",
        code: "# CLAUDE.md\n\n## Commands\n- Build: `npm run build`\n- Test: `npm test -- --run` (run a single test, not the full suite)\n- Lint: `npm run lint`\n\n## Conventions\n- Use ES modules (import/export), not CommonJS (require)\n- API handlers live in `src/api/handlers/`\n- Branch names: `feat/<ticket-id>-short-description`\n\n## Architecture notes\n- Auth tokens are refreshed in `src/auth/refresh.ts` — never bypass this\n- Environment variables for secrets: see `.env.example`\n\n## Import useful context\nSee @README.md for project overview and @package.json for available scripts.",
      },
      {
        type: "callout",
        variant: "note",
        title: "What to include vs. skip",
        text: "Include build commands, code style rules that differ from defaults, testing instructions, repo etiquette, and non-obvious gotchas. Skip anything Claude can infer from the code itself, standard language conventions it already knows, and information that changes frequently.",
      },
      { type: "heading", level: 2, text: "Set guardrails" },
      {
        type: "paragraph",
        text: "CLAUDE.md instructions are advisory — Claude reads them and tries to follow them. For things that must happen every single time with no exceptions (running a formatter, blocking writes to a sensitive folder), you need hooks. Hooks are shell commands wired to lifecycle events in .claude/settings.json. They run deterministically, regardless of what Claude decides.",
      },
      {
        type: "code",
        language: "json",
        code: "// .claude/settings.json\n{\n  \"permissions\": {\n    \"allow\": [\"Bash(npm run lint)\", \"Bash(npm test:*)\"],\n    \"deny\": [\"Bash(git push --force:*)\"]\n  },\n  \"hooks\": {\n    \"PostToolUse\": [\n      {\n        \"matcher\": \"Edit|Write\",\n        \"hooks\": [\n          { \"type\": \"command\", \"command\": \"npm run lint -- --fix\" }\n        ]\n      }\n    ]\n  }\n}",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Let Claude write your hooks",
        text: "You do not have to write hooks by hand. Just ask: 'Write a hook that runs eslint after every file edit' or 'Write a hook that blocks writes to the migrations folder.' Claude will generate the settings.json entry for you.",
      },
      { type: "heading", level: 2, text: "Tune it over time" },
      {
        type: "paragraph",
        text: "Your project setup is not a one-time task — it compounds in value the more you maintain it. Two rules drive most of the ongoing work: add to CLAUDE.md when Claude makes the same mistake twice, and prune CLAUDE.md when it gets too long. Files over 200 lines cause adherence to drop as important rules get buried. When that happens, move topic-specific instructions into a nested CLAUDE.md in the directory they apply to.",
      },
      {
        type: "list",
        items: [
          "Run /memory at any time to see every instruction file loaded in your current session and to browse auto memory.",
          "Claude's auto memory saves its own learnings (build patterns, debugging habits) so they persist across sessions — you can read and edit these files.",
          "Check CLAUDE.md into git so teammates can contribute and benefit from accumulated context.",
          "In a monorepo, put a CLAUDE.md in each package so the right context loads when Claude works in that subtree.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "Run /init to generate your CLAUDE.md starter. Commit CLAUDE.md and gitignore CLAUDE.local.md and settings.local.json. Use CLAUDE.md for conventions and context; use settings.json hooks for deterministic enforcement. Keep CLAUDE.md under 200 lines and prune it like code. For the full reference: code.claude.com/docs/en/best-practices.",
      },
    ],
  },
  {
    slug: "workflows",
    title: "Workflows",
    summary: "Proven loops: plan, implement, verify, and review.",
    sectionId: "best-practices",
    estMinutes: 12,
    difficulty: "advanced",
    icon: "Workflow",
    body: [
      {
        type: "paragraph",
        text: "Claude Code works best when you follow a consistent loop: explore the code, plan your approach, implement with Claude's help, then verify the result. This lesson shows you the proven patterns that keep that loop tight and your sessions productive.",
      },
      { type: "heading", level: 2, text: "Explore first, then plan" },
      {
        type: "paragraph",
        text: "Before asking Claude to change anything, let it read the relevant code. This gives Claude accurate context and prevents it from guessing at structure it hasn't seen. Once you understand the territory, switch to plan mode — Claude proposes a written plan and makes no file edits until you approve it.",
      },
      {
        type: "code",
        language: "text",
        code: "# Option 1: start in plan mode from the terminal\nclaude --permission-mode plan\n\n# Option 2: toggle plan mode mid-session\n# Press Shift+Tab to cycle through permission modes",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why plan mode matters",
        text: "Plan mode lets you catch misunderstandings before any file is touched. Read Claude's plan, correct wrong assumptions with a follow-up message, then approve. It costs nothing to iterate on a plan.",
      },
      { type: "heading", level: 2, text: "Test-driven workflow" },
      {
        type: "paragraph",
        text: "Writing tests before or alongside implementation keeps Claude honest — passing tests are proof the code actually does what you intended, not just that it compiles. Claude reads your existing test files to match your project's style and framework.",
      },
      {
        type: "code",
        language: "text",
        code: "find functions in UserService.ts that are not covered by tests\nadd tests for the uncovered functions\nadd edge cases for invalid input and empty states\nrun the new tests and fix any failures",
      },
      { type: "heading", level: 2, text: "Review the diff before moving on" },
      {
        type: "paragraph",
        text: "After Claude makes changes, always read the diff before continuing. Claude shows you proposed edits and asks for approval — use that moment. You can also ask Claude to summarize what changed and why before you commit.",
      },
      {
        type: "code",
        language: "text",
        code: "summarize the changes you just made and flag anything I should double-check",
      },
      { type: "heading", level: 2, text: "Clear context between tasks" },
      {
        type: "paragraph",
        text: "Every message you send sits in Claude's context window. After you finish one task and move to an unrelated one, run /clear to start fresh. This prevents earlier conversation details from confusing Claude's understanding of the new task.",
      },
      {
        type: "code",
        language: "text",
        code: "/clear",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Do not use /clear mid-task",
        text: "/clear wipes everything Claude currently knows about the current task. Use it only when you are fully done with one piece of work and ready to start something new.",
      },
      { type: "heading", level: 2, text: "Resume sessions across sittings" },
      {
        type: "paragraph",
        text: "Claude Code saves every conversation locally. You never have to re-explain your project from scratch when you come back after a break.",
      },
      {
        type: "code",
        language: "bash",
        code: "# Resume the most recent session in this directory\nclaude --continue\n\n# Open a picker to choose from previous sessions\nclaude --resume",
      },
      {
        type: "callout",
        variant: "note",
        text: "Inside a running session, type /resume to open the same picker without leaving Claude Code. If --continue finds no prior session in the current directory, it exits with a message — that just means nothing has been saved here yet.",
      },
      { type: "heading", level: 2, text: "Dynamic workflows for large jobs" },
      {
        type: "paragraph",
        text: "For tasks that span dozens of files or need many simultaneous investigations — a codebase-wide audit, a 500-file migration, deep research with cross-checked sources — Claude Code can write and run a dynamic workflow: a script that orchestrates many subagents working in parallel while your session stays responsive. Run /workflows to see running and completed workflow runs.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Workflows use significantly more tokens",
        text: "A single workflow run can spawn dozens of agents. Test on a small slice of your project first (one directory, one file) to gauge cost before running it at full scale.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "The core loop: explore with Claude first, plan before editing (Shift+Tab), implement, verify with tests, review the diff, then commit. Use /clear between tasks. Use --continue or --resume to pick up where you left off. Reach for dynamic workflows only when a task is genuinely too large for a single conversation. Full reference: code.claude.com/docs/en/common-workflows.",
      },
    ],
  },

  // ── Practical Guides ───────────────────────────────────────────────
  {
    slug: "example-walkthrough",
    title: "Example: Build a Feature End-to-End",
    summary: "Apply every concept in one realistic, start-to-finish build.",
    sectionId: "practical-guides",
    estMinutes: 18,
    difficulty: "intermediate",
    icon: "Rocket",
    body: [
      {
        type: "paragraph",
        text: "Concepts are easier to remember when you see them working together. This lesson walks through a single realistic scenario — adding a search feature to a small web app — from the first prompt to a merged pull request. Each step maps to a real command or pattern.",
      },
      { type: "heading", level: 2, text: "Start: frame the task" },
      {
        type: "paragraph",
        text: "Before writing any code, tell Claude enough context to make good decisions. You do not need to manually point Claude at files — it will read what it needs. Start by orienting it to the project.",
      },
      {
        type: "code",
        language: "text",
        code: "what does this project do, and what's the main data model?",
      },
      {
        type: "code",
        language: "text",
        code: "I want to add a search endpoint that lets users filter products by name.\nExplain how the existing API routes are structured before we start.",
      },
      { type: "heading", level: 2, text: "Plan before touching files" },
      {
        type: "paragraph",
        text: "Once Claude understands the codebase, switch to plan mode so it proposes a detailed approach without making any edits yet. Press Shift+Tab to enter plan mode, then describe the feature.",
      },
      {
        type: "code",
        language: "text",
        code: "# Press Shift+Tab to enable plan mode, then:\nAdd a GET /api/products/search endpoint that accepts a ?query= param\nand returns matching products from the database. Show me the plan first.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Read the plan carefully. If Claude plans to put the route in the wrong file, or misses an auth middleware, correct it with a follow-up message before you approve. Fixing a plan costs nothing; fixing bad code does.",
      },
      { type: "heading", level: 2, text: "Implement with Claude" },
      {
        type: "paragraph",
        text: "Once the plan looks right, approve it. Claude will create or edit files, showing you each change for confirmation. If a single step looks wrong, reject it and explain what you expected — Claude will try again.",
      },
      {
        type: "code",
        language: "text",
        code: "looks good, go ahead and implement the search endpoint",
      },
      {
        type: "callout",
        variant: "note",
        text: "Claude asks for permission before each file write. You can approve edits one at a time, or enable 'Accept all' for the session if you trust the plan. You can switch back at any time by pressing Shift+Tab.",
      },
      { type: "heading", level: 2, text: "Verify with tests" },
      {
        type: "paragraph",
        text: "After implementation, ask Claude to write tests for the new endpoint. Claude reads your existing test files to match your testing framework and assertion style automatically.",
      },
      {
        type: "code",
        language: "text",
        code: "write tests for the new search endpoint covering:\n- a query that returns results\n- a query with no matches (expect empty array)\n- a missing ?query= param (expect 400 error)\n\nthen run the tests and fix any failures",
      },
      { type: "heading", level: 2, text: "Review the diff and commit" },
      {
        type: "paragraph",
        text: "Before committing, ask Claude to summarize what changed across all the files it touched. This is your final sanity check — a quick way to catch anything unexpected before it goes into version control.",
      },
      {
        type: "code",
        language: "text",
        code: "summarize all the changes you made and flag anything I should double-check",
      },
      {
        type: "code",
        language: "text",
        code: "commit my changes with a descriptive message",
      },
      { type: "heading", level: 2, text: "Open a pull request" },
      {
        type: "paragraph",
        text: "Claude can create the pull request directly. It writes a title and description based on the changes in the session. You can refine the description before submitting.",
      },
      {
        type: "code",
        language: "text",
        code: "create a pr\n\n# or for more control:\ncreate a pr with a description that explains the search algorithm\nand notes that it uses a case-insensitive LIKE query for now",
      },
      {
        type: "callout",
        variant: "tip",
        text: "Review Claude's generated PR description before submitting. You can ask Claude to add context, mention caveats, or flag follow-up work in the description.",
      },
      { type: "heading", level: 2, text: "Picking up later" },
      {
        type: "paragraph",
        text: "If review feedback comes in the next day, you do not start from scratch. Resume the session and pick up with full context intact.",
      },
      {
        type: "code",
        language: "bash",
        code: "# Resume the most recent session in this directory\nclaude --continue\n\n# Or choose from the session picker\nclaude --resume",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Key takeaways",
        text: "The full loop in six steps: (1) orient Claude to your codebase, (2) plan in plan mode before any edits, (3) approve and implement, (4) write and run tests, (5) review the diff then commit, (6) create a PR. Each step uses natural language — you are describing intent, not writing scripts. Full reference: code.claude.com/docs/en/quickstart.",
      },
    ],
  },
];

/**
 * Extract level-2 headings from a lesson body for the "on this page"
 * table of contents. Anchor ids are derived from the heading text and
 * must match the ids the BlockRenderer assigns.
 */
export function getLessonHeadings(
  concept: Concept,
): { id: string; text: string }[] {
  return concept.body
    .filter((b): b is Extract<Block, { type: "heading" }> => b.type === "heading")
    .filter((b) => b.level === 2)
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text }));
}

/** Local slugify kept here so content + TOC ids stay in lockstep. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
