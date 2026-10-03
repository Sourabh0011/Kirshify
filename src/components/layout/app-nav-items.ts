import {
  ClipboardList,
  IndianRupee,
  LayoutDashboard,
  MessageSquare,
  Package,
  CirclePlus,
  ShoppingBag,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface AppNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Left sidebar of the signed-in platform. */
export const sidebarNav: AppNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "Sell Crop", href: "/sell", icon: CirclePlus },
  { label: "My Listings", href: "/my-listings", icon: ClipboardList },
  { label: "Mandi Prices", href: "/mandi-prices", icon: IndianRupee },
  { label: "Orders", href: "/orders", icon: Package },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
