'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import WaitlistModal from './WaitlistModal';

/**
 * Waitlist modal trigger contract (spec §9.1) — "any button".
 *
 * A single `WaitlistModalProvider` exposes `openWaitlist()` and renders the
 * modal once at page level. Every CTA across the page (header `Get Started`,
 * hero `Start Project`, footer `Join the waitlist`) calls the same context
 * function. Any element with `data-open-waitlist` also opens the modal.
 */

interface WaitlistContextValue {
  openWaitlist: () => void;
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

  const openWaitlist = useCallback(() => setOpen(true), []);
  const closeWaitlist = useCallback(() => setOpen(false), []);

  // Future-proof contract: any element with `data-open-waitlist` opens the modal.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest('[data-open-waitlist]')) {
        setOpen(true);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <WaitlistContext.Provider value={{ openWaitlist }}>
      {children}
      <WaitlistModal open={open} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

export default WaitlistModalProvider;
