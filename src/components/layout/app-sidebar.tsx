"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CropArt } from "@/components/ui/crop-art";
import { LogoMark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

import { isActivePath, sidebarNav } from "./app-nav-items";

export function AppSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex flex-col gap-5", className)}>
      <nav aria-label="Account" className="flex flex-col gap-1 rounded-3xl border border-line-soft bg-white p-3">
        {sidebarNav.map(({ label, href, icon: Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition-colors",
                active ? "bg-forest text-white" : "text-ink-soft hover:bg-sage hover:text-forest",
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.9} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="relative overflow-hidden rounded-3xl bg-forest text-white">
        <div className="h-36 opacity-90">
          <CropArt cropSlug="wheat" alt="" variant={3} />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <LogoMark tone="dark" size={30} />
          <p className="text-sm leading-snug font-bold">Direct from farmers. Better prices. Better future.</p>
          <Link href="/sell" className="text-sm font-extrabold text-leaf underline underline-offset-4">
            List your crop
          </Link>
        </div>
      </div>
    </aside>
  );
}
