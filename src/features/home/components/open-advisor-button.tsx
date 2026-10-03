"use client";

import type { ComponentProps } from "react";

import { useAdvisor } from "@/providers/advisor-provider";

/** A button that opens the floating advisor — usable inside server components. */
export function OpenAdvisorButton({ question, ...props }: ComponentProps<"button"> & { question?: string }) {
  const { openAdvisor } = useAdvisor();
  return <button type="button" onClick={() => openAdvisor(question)} {...props} />;
}
