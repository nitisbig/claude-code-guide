import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — wired to CSS variables in globals.css so light/dark
        // themes share one set of class names.
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-subtle": "rgb(var(--bg-subtle) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        "fg-muted": "rgb(var(--fg-muted) / <alpha-value>)",
        "fg-subtle": "rgb(var(--fg-subtle) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-fg": "rgb(var(--accent-fg) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        reading: "44rem", // ~68ch comfortable reading column
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--fg-muted))",
            "--tw-prose-headings": "rgb(var(--fg))",
            "--tw-prose-links": "rgb(var(--accent))",
            "--tw-prose-bold": "rgb(var(--fg))",
            "--tw-prose-code": "rgb(var(--fg))",
            "--tw-prose-quotes": "rgb(var(--fg-muted))",
            "--tw-prose-bullets": "rgb(var(--border))",
            "--tw-prose-hr": "rgb(var(--border))",
            maxWidth: "none",
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
