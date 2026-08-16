'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import WaitlistModal from './WaitlistModal';

/**
 * Waitlist modal trigger contract (spec §9.1) — "any button".
 *
 * A single `WaitlistModalProvider` exposes `openWaitlist()` and renders the
 * modal once at page level. Every CTA across the page (header `Get Started`,
 * hero `Start Project`, footer `Get discovered`) calls the same context
 * function. Any element with `data-open-waitlist` also opens the modal.
 */

interface WaitlistContextValue {
  openWaitlist: (trigger?: HTMLElement | null) => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist(): WaitlistContextValue {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistModalProvider');
  }
  return context;
}

export function WaitlistModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  // The element that opened the modal. Recorded so the modal can restore focus
  // to it on every close path (spec §9.2 a11y: "returns to trigger on close").
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const openWaitlist = useCallback((triggerElement?: HTMLElement | null) => {
    // Prefer the explicit trigger passed by the CTA. Fall back to the currently
    // focused element (browsers focus buttons on activation) for programmatic
    // calls that cannot pass one. Never store `<body>` as a trigger.
    const active = document.activeElement;
    const fallback = active instanceof HTMLElement && active !== document.body ? active : null;
    setTrigger(triggerElement instanceof HTMLElement ? triggerElement : fallback);
    setOpen(true);
  }, []);
  const closeWaitlist = useCallback(() => setOpen(false), []);

  // Future-proof contract: any element with `data-open-waitlist` opens the modal.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const triggerElement = target ? target.closest<HTMLElement>('[data-open-waitlist]') : null;
      if (triggerElement) {
        setTrigger(triggerElement);
        setOpen(true);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <WaitlistContext.Provider value={{ openWaitlist }}>
      {children}
      <WaitlistModal open={open} onClose={closeWaitlist} trigger={trigger} />
    </WaitlistContext.Provider>
  );
}

export default WaitlistModalProvider;
