import { SidebarNav } from "./SidebarNav";

/**
 * Sidebar — sticky desktop navigation rail. Hidden on small screens
 * (the mobile drawer takes over) and when reading mode is active
 * (the parent docs layout controls that).
 */
export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="scrollbar-thin sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4">
        <SidebarNav />
      </div>
    </aside>
  );
}
