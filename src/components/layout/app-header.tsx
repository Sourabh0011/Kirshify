"use client";

import { Bell, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Logo } from "@/components/ui/logo";
import { appNav } from "@/config/site";
import { cn } from "@/lib/utils";

import { isActivePath, sidebarNav } from "./app-nav-items";

// TODO: read from the auth session (Clerk) once wired.
const currentUser = { name: "Ramesh Patel", role: "Farmer" };

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-17 max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Platform" className="hidden flex-1 items-center gap-1 text-sm font-semibold lg:flex">
          {appNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 transition-colors",
                  active ? "bg-sage text-forest" : "text-ink-soft hover:text-forest",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/messages"
            aria-label="Notifications, 2 unread"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-sage"
          >
            <Bell className="size-5" />
            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-marigold ring-2 ring-white" />
          </Link>
          <Link href="/profile" className="inline-flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1 hover:bg-sage">
            <Avatar name={currentUser.name} size="sm" className="bg-forest text-white" />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-bold">{currentUser.name}</span>
              <span className="text-xs text-muted">{currentUser.role}</span>
            </span>
            <ChevronDown className="hidden size-4 text-muted sm:block" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-line lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-line-soft bg-white lg:hidden">
          <nav aria-label="Mobile platform" className="mx-auto grid max-w-[1440px] gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6">
            {[...appNav.map((i) => ({ ...i, icon: undefined })), ...sidebarNav.filter((s) => !appNav.some((a) => a.href === s.href))].map(
              (item) => {
                const active = isActivePath(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-13 items-center gap-3 rounded-2xl px-4 text-[15px] font-bold",
                      active ? "bg-forest text-white" : "text-ink hover:bg-sage",
                    )}
                  >
                    {Icon && <Icon className="size-5" strokeWidth={1.9} />}
                    {item.label}
                  </Link>
                );
              },
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
