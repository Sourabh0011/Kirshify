import { LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <ComingSoon
      icon={LayoutDashboard}
      title="Your farm dashboard"
      description="One place to track your listings, offers, earnings, crop health scans and weather alerts."
      features={["Active listings and new offers", "Earnings this season vs. last", "Crop health scan history", "Rain and pest alerts for your village"]}
      cta={{ label: "List a crop", href: "/sell" }}
    />
  );
}
