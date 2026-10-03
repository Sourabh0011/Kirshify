import { ScanLine } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "AI Crop Doctor" };

export default function DiseaseScannerPage() {
  return (
    <ComingSoon
      icon={ScanLine}
      title="AI Crop Doctor"
      description="Snap a photo of a sick leaf and get a diagnosis with a confidence score and organic-first remedies. Connects to the ResNet-50 / MobileNet inference service (FastAPI)."
      features={["Camera capture or photo upload", "Disease name with confidence score", "Organic-first treatment guide", "Scan history per field"]}
      cta={{ label: "See how it works", href: "/#features" }}
    />
  );
}
