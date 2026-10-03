import { MessageSquare } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <ComingSoon
      icon={MessageSquare}
      title="Messages"
      description="Chat directly with buyers and sellers about price, quality and pickup — no middlemen."
      features={["One thread per listing", "Voice notes in your language", "Share photos of the lot", "SMS fallback on slow networks"]}
    />
  );
}
