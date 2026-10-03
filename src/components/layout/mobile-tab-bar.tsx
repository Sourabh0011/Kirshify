"use client";

import { House, IndianRupee, MessageSquare, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { isActivePath } from "./app-nav-items";

const tabs = [
  { label: "Home", href: "/", icon: House },
  { label: "Market", href: "/marketplace", icon: ShoppingBag },
  { label: "Sell", href: "/sell", icon: Plus, primary: true },
  { label: "Mandi", href: "/mandi-prices", icon: IndianRupee },
  { label: "Advisor", href: "/advisor", icon: MessageSquare },
];

/** Thumb-friendly bottom navigation for phones; hidden on desktop where the sidebar shows. */
export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {tabs.map(({ label, href, icon: Icon, primary }) => {
          const active = isActivePath(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold",
                  active ? "text-forest" : "text-subtle",
                )}
              >
                {primary ? (
                  <span className="-mt-5 inline-flex size-12 items-center justify-center rounded-full bg-forest text-white shadow-[0_10px_24px_rgb(15_77_54/0.35)]">
                    <Icon className="size-6" strokeWidth={2.2} />
                  </span>
                ) : (
                  <Icon className="size-[22px]" strokeWidth={active ? 2.2 : 1.8} />
                )}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
