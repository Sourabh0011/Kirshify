import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";
import { OpenAdvisorButton } from "@/features/home/components/open-advisor-button";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = { title: "AI Advisor" };

export default function AdvisorPage() {
  return (
    <ComingSoon
      icon={MessageCircle}
      title="AI Advisor"
      description="Ask anything about crop care, pests, fertiliser or weather — in Hindi, Marathi, Punjabi or English. A full-screen chat with history is on its way; the quick advisor already works."
      features={["Voice questions in regional languages", "Answers grounded in your crop and village weather", "Saved conversation history", "Links straight to remedies and mandi prices"]}
    >
      <OpenAdvisorButton className={buttonClasses()}>Ask a question now</OpenAdvisorButton>
    </ComingSoon>
  );
}
