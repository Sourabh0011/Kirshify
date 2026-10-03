import { ScanLine } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "AI Crop Doctor" };

export default function DiseaseScannerPage() {
  return (
    <ComingSoon
      icon={ScanLine}
      title="AI Crop Doctor"
      description="Take a photo of a sick leaf to find out the likely disease, how sure the result is, and safe, organic-first remedies."
      features={["Take a photo or upload one", "Disease name and how sure the result is", "Step-by-step organic treatment", "Past scans for each field"]}
      cta={{ label: "See how it works", href: "/#features" }}
    />
  );
}
