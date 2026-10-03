import { ClipboardList } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "My listings" };

export default function MyListingsPage() {
  return (
    <ComingSoon
      icon={ClipboardList}
      title="My listings"
      description="Manage everything you have for sale — edit prices, mark lots as sold and respond to offers."
      features={["Edit price and quantity", "Pause or mark a lot as sold", "See views and offers per listing", "Re-list a crop in one tap"]}
      cta={{ label: "List a new crop", href: "/sell" }}
    />
  );
}
