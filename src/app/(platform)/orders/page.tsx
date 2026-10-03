import { Package } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <ComingSoon
      icon={Package}
      title="Orders"
      description="Track every accepted offer from confirmation to pickup and payment."
      features={["Order status from confirmed to delivered", "Pickup scheduling with the buyer", "Digital invoice for every trade", "1% facilitation fee shown up front"]}
    />
  );
}
