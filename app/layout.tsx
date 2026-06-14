import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = {
  name: "Claude Code Guide",
  description:
    "Learn Claude Code from the ground up — installation, MCP, skills, subagents, commands, best practices, and hands-on examples.",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Learn Claude Code, practically`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    "Claude Code",
    "MCP",
    "skills",
    "subagents",
    "slash commands",
    "AI coding",
    "developer tools",
  ],
  openGraph: {
    title: `${SITE.name} — Learn Claude Code, practically`,
    description: SITE.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <Providers>
          <SkipLink />
          <div className="flex min-h-dvh flex-col">
            <TopBar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
