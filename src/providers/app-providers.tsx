"use client";

import { AdvisorProvider } from "./advisor-provider";
import { LanguageProvider } from "./language-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AdvisorProvider>{children}</AdvisorProvider>
    </LanguageProvider>
  );
}
