import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center"
    >
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-fg">
        This page wandered off
      </h1>
      <p className="mt-2 text-fg-muted">
        The lesson you&rsquo;re looking for doesn&rsquo;t exist (yet). Let&rsquo;s
        get you back on the path.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to home
      </Link>
    </main>
  );
}
