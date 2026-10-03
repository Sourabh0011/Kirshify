import { Wallet } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Wallet" };

export default function WalletPage() {
  return (
    <ComingSoon
      icon={Wallet}
      title="Wallet"
      description="See payments received for every trade and the fees deducted — fully transparent."
      features={["Payments per order", "Facilitation fee breakdown", "Download statements", "Bank / UPI payout settings"]}
    />
  );
}
