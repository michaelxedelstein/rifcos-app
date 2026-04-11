"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview", icon: "◉" },
  { href: "/providers", label: "Providers", icon: "◎" },
  { href: "/requests", label: "Requests", icon: "↗" },
  { href: "/jobs", label: "Jobs", icon: "▶" },
  { href: "/pricing", label: "Pricing", icon: "$" },
  { href: "/zones", label: "Zones", icon: "◫" },
  { href: "/cancellations", label: "Cancellations", icon: "✕" },
  { href: "/analytics", label: "Analytics", icon: "⊞" },
  { href: "/support", label: "Support", icon: "?" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-sidebar flex flex-col">
      <div className="px-5 py-6 border-b border-white/10">
        <h1 className="text-lg font-bold text-white tracking-widest">RIFCO</h1>
        <p className="text-xs text-muted mt-0.5">Operations</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-sidebar-foreground/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-xs text-muted">RIFCO Admin v0.1</p>
      </div>
    </aside>
  );
}
