/**
 * Concept data model — the content layer of the app.
 *
 * Phase 1 ships placeholder bodies so the layout, prose styling, and
 * "on this page" table-of-contents can be demonstrated. Phase 2 will
 * replace the placeholder `body` blocks with real lesson content
 * (likely sourced from MDX) without changing this shape, so every
 * component that reads a Concept keeps working.
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
 * Placeholder body generator (Phase 1 only).
 * Produces a realistic-looking lesson with H2 sections so the TOC and
 * typography are visible. Replaced by real content in Phase 2.
 */
function placeholderBody(title: string, sections: string[]): Block[] {
  const blocks: Block[] = [
    {
      type: "paragraph",
      text: `This lesson on ${title} is a Phase 1 placeholder. The layout, navigation, reading column, and "on this page" outline are all live — real, practical content lands in Phase 2.`,
    },
    {
      type: "callout",
      variant: "note",
      title: "Placeholder content",
      text: "The structure below demonstrates how a finished lesson will read: short sections, callouts for tips and gotchas, and copy-ready command examples.",
    },
  ];

  sections.forEach((heading, i) => {
    blocks.push({ type: "heading", level: 2, text: heading });
    blocks.push({
      type: "paragraph",
      text: `Placeholder text for "${heading}". In the final version this section explains the concept in plain language, then shows exactly how to apply it in a real project.`,
    });
    if (i === 0) {
      blocks.push({
        type: "code",
        language: "bash",
        code: "# Example command (placeholder)\nclaude --help",
      });
    }
    if (i === 1) {
      blocks.push({
        type: "list",
        items: [
          "A concrete, real-world use case.",
          "The exact steps to reproduce it.",
          "Common pitfalls and how to avoid them.",
        ],
      });
      blocks.push({
        type: "callout",
        variant: "tip",
        title: "Pro tip",
        text: "Practical tips like this will appear throughout each lesson to highlight the fastest path to results.",
      });
    }
  });

  return blocks;
}

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
    body: placeholderBody("What is Claude Code", [
      "Why an agentic CLI",
      "What it can do",
      "How this guide is structured",
    ]),
  },
  {
    slug: "installation",
    title: "Installation & Setup",
    summary: "Get Claude Code running on macOS, Windows, or Linux in minutes.",
    sectionId: "getting-started",
    estMinutes: 8,
    difficulty: "beginner",
    icon: "Download",
    body: placeholderBody("Installation & Setup", [
      "Requirements",
      "Installing the CLI",
      "Authentication",
      "Verifying your setup",
    ]),
  },
  {
    slug: "first-session",
    title: "Your First Session",
    summary: "Open a project, ask for a change, and watch Claude Code work.",
    sectionId: "getting-started",
    estMinutes: 10,
    difficulty: "beginner",
    icon: "Play",
    body: placeholderBody("Your First Session", [
      "Starting Claude Code",
      "Giving your first instruction",
      "Reviewing and accepting changes",
    ]),
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
    body: placeholderBody("Slash Commands", [
      "What slash commands are",
      "Creating a custom command",
      "Arguments and frontmatter",
    ]),
  },
  {
    slug: "mcp",
    title: "MCP (Model Context Protocol)",
    summary: "Connect Claude Code to external tools, data, and services.",
    sectionId: "core-concepts",
    estMinutes: 14,
    difficulty: "intermediate",
    icon: "Plug",
    body: placeholderBody("MCP", [
      "The problem MCP solves",
      "Adding an MCP server",
      "Using MCP tools and resources",
    ]),
  },
  {
    slug: "skills",
    title: "Skills",
    summary: "Package expertise and instructions Claude loads on demand.",
    sectionId: "core-concepts",
    estMinutes: 12,
    difficulty: "intermediate",
    icon: "Wand2",
    body: placeholderBody("Skills", [
      "What a skill is",
      "Anatomy of a skill",
      "When skills trigger",
    ]),
  },
  {
    slug: "subagents",
    title: "Subagents",
    summary: "Delegate focused work to parallel agents with their own context.",
    sectionId: "core-concepts",
    estMinutes: 13,
    difficulty: "advanced",
    icon: "Users",
    body: placeholderBody("Subagents", [
      "Why delegate to subagents",
      "Built-in vs custom agents",
      "Running agents in parallel",
    ]),
  },
  {
    slug: "hooks",
    title: "Hooks",
    summary: "Run your own scripts automatically at key points in a session.",
    sectionId: "core-concepts",
    estMinutes: 11,
    difficulty: "advanced",
    icon: "Webhook",
    body: placeholderBody("Hooks", [
      "What hooks are for",
      "Hook events",
      "Writing your first hook",
    ]),
  },
  {
    slug: "memory-claude-md",
    title: "Memory & CLAUDE.md",
    summary: "Give Claude durable project context that persists across sessions.",
    sectionId: "core-concepts",
    estMinutes: 9,
    difficulty: "beginner",
    icon: "BookMarked",
    body: placeholderBody("Memory & CLAUDE.md", [
      "How memory works",
      "Writing an effective CLAUDE.md",
      "What to include (and avoid)",
    ]),
  },
  {
    slug: "configuration",
    title: "Configuration & Settings",
    summary: "Tune permissions, models, and behavior with settings.json.",
    sectionId: "core-concepts",
    estMinutes: 10,
    difficulty: "intermediate",
    icon: "Settings2",
    body: placeholderBody("Configuration & Settings", [
      "Settings files and precedence",
      "Permissions",
      "Useful options",
    ]),
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
    body: placeholderBody("Effective Prompting", [
      "Be specific about intent",
      "Give context, not just commands",
      "Iterate in small steps",
    ]),
  },
  {
    slug: "project-setup",
    title: "Project Setup",
    summary: "Structure a repo so Claude Code is productive from minute one.",
    sectionId: "best-practices",
    estMinutes: 10,
    difficulty: "intermediate",
    icon: "FolderTree",
    body: placeholderBody("Project Setup", [
      "The files that matter",
      "Documenting conventions",
      "Setting guardrails",
    ]),
  },
  {
    slug: "workflows",
    title: "Workflows",
    summary: "Proven loops: plan, implement, verify, and review.",
    sectionId: "best-practices",
    estMinutes: 12,
    difficulty: "advanced",
    icon: "Workflow",
    body: placeholderBody("Workflows", [
      "Plan before you build",
      "Verify as you go",
      "Reviewing the diff",
    ]),
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
    body: placeholderBody("Build a Feature End-to-End", [
      "Framing the task",
      "Planning with Claude",
      "Implementing and verifying",
      "Wrapping up",
    ]),
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
