import { UserRound } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <ComingSoon
      icon={UserRound}
      title="Your profile"
      description="Your farm details, verification status and language preferences."
      features={["Farm size, crops and village", "KYC and verification badge", "Preferred language for advice"]}
    />
  );
}
