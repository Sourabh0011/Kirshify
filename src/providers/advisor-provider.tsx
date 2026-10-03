"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type AskHandler = (question: string) => void;

interface AdvisorContextValue {
  open: boolean;
  /** Opens the advisor; with a question, it is sent straight away. */
  openAdvisor: (question?: string) => void;
  closeAdvisor: () => void;
  toggleAdvisor: () => void;
  /** The chat widget registers how to send a question. Returns an unregister function. */
  registerAskHandler: (handler: AskHandler) => () => void;
}

const AdvisorContext = createContext<AdvisorContextValue | null>(null);

/** Lets any button on the page open the floating AI advisor, optionally with a question. */
export function AdvisorProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const askHandler = useRef<AskHandler | null>(null);

  const openAdvisor = useCallback((question?: string) => {
    setOpen(true);
    if (question) askHandler.current?.(question);
  }, []);
  const closeAdvisor = useCallback(() => setOpen(false), []);
  const toggleAdvisor = useCallback(() => setOpen((o) => !o), []);
  const registerAskHandler = useCallback((handler: AskHandler) => {
    askHandler.current = handler;
    return () => {
      if (askHandler.current === handler) askHandler.current = null;
    };
  }, []);

  const value = useMemo(
    () => ({ open, openAdvisor, closeAdvisor, toggleAdvisor, registerAskHandler }),
    [open, openAdvisor, closeAdvisor, toggleAdvisor, registerAskHandler],
  );
  return <AdvisorContext.Provider value={value}>{children}</AdvisorContext.Provider>;
}

export function useAdvisor(): AdvisorContextValue {
  const ctx = useContext(AdvisorContext);
  if (!ctx) throw new Error("useAdvisor must be used inside <AdvisorProvider>");
  return ctx;
}
