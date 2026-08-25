'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes, ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import { usePathname } from 'next/navigation';

import { useReducedMotion } from './motion';

/**
 * Thin top navigation progress bar (Sprint 22 Story G / TASK-538).
 *
 * Shows ONLY when a route transition takes longer than `NAV_PROGRESS_DELAY_MS`
 * (~100ms) and disappears when the new route's content renders — it never
 * flashes on fast navigations. Mounted once in `app/layout.tsx` (global).
 *
 * Mechanism (App Router has no public global router-event emitter, so the
 * transition is measured with an equivalent client-side signal):
 *
 * 1. **Transition start** — a capture-phase document `click` listener
 *    records any anchor activation that targets a different internal route
 *    (Next `<Link>` renders an `<a>`; the capture phase runs before the
 *    Link's own handler starts the navigation). Browser back/forward
 *    (`popstate`) is treated the same way.
 * 2. **Threshold** — a `delayMs` timer is armed. If the current pathname is
 *    still unchanged when it fires, the transition exceeded the budget, so
 *    the bar is revealed.
 * 3. **Commit = hide** — `usePathname()` only updates when the router
 *    commits the new route tree (Next updates it at navigation commit, not
 *    at click time), i.e. exactly when the new route's content renders.
 *    That effect clears the pending timer and hides the bar.
 *
 * Fast navigations (<100ms) commit before the timer fires — the bar never
 * appears. Same-route links (identical pathname, hash-only anchors) and
 * external/new-tab links are ignored so they cannot leave the bar stuck.
 *
 * Reduced motion (`prefers-reduced-motion: reduce`): the bar still
 * communicates the slow transition, but appears/disappears instantly and
 * its fill is static — no keyframes, no opacity/transform transitions.
 *
 * Purely visual overlay: `position: fixed` + `pointer-events: none`, so it
 * never affects layout, scrolling, or interaction. Marked `aria-hidden`
 * because the destination content itself is the accessible status signal.
 */

/** Route-transition budget: the bar appears only after this many ms. */
export const NAV_PROGRESS_DELAY_MS = 100;

const fillSlide = keyframes`
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(410%);
  }
`;

const Track = styled.div<{ $visible: boolean; $reduced: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 90; /* above header (50) and language switcher (60), below modal (100) */
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(-100%)')};
  transition: ${({ $reduced }) => ($reduced ? 'none' : 'opacity 0.18s ease, transform 0.18s ease')};
`;

const Fill = styled.div<{ $reduced: boolean }>`
  height: 100%;
  width: 40%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primarySoft}
  );
  box-shadow: 0 0 12px ${({ theme }) => theme.colors.primary};
  animation: ${({ $reduced }) =>
    $reduced
      ? 'none'
      : css`
        ${fillSlide} 1.1s ease-in-out infinite
      `};
`;

export interface NavigationProgressProps {
  /**
   * Route-transition threshold (ms) before the bar appears.
   * Defaults to `NAV_PROGRESS_DELAY_MS` (100). Test seam / tuning knob.
   */
  delayMs?: number;
}

export function NavigationProgress({ delayMs = NAV_PROGRESS_DELAY_MS }: NavigationProgressProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const pathnameRef = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The route committed (new content is rendering): keep the ref current,
  // cancel any pending threshold timer, and hide the bar.
  useEffect(() => {
    pathnameRef.current = pathname;
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    const scheduleCheck = () => {
      if (timerRef.current !== null) {
        return;
      }
      const startPathname = pathnameRef.current;
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        // Still on the origin route → the transition exceeded the budget;
        // reveal the bar. If the route committed meanwhile, the hide effect
        // cleared this timer before it could fire (never flashes).
        if (pathnameRef.current === startPathname) {
          setVisible(true);
        }
      }, delayMs);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }
      const href = anchor.getAttribute('href') ?? '';
      const targetPath = href.split(/[?#]/)[0];
      // Non-navigating / non-app links never start a route transition:
      // empty hrefs, hash-only anchors, URI-scheme links (mailto:, tel:,
      // http(s):, ...), protocol-relative external URLs, and new-tab links.
      if (
        targetPath === '' ||
        targetPath.startsWith('#') ||
        /^[a-z][a-z0-9+.-]*:/i.test(href) ||
        href.startsWith('//') ||
        anchor.target === '_blank'
      ) {
        return;
      }
      // Same-route links (identical pathname, optional query/hash delta)
      // produce no route transition.
      if (targetPath === pathnameRef.current) {
        return;
      }
      scheduleCheck();
    };

    const onPopState = () => scheduleCheck();

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [delayMs]);

  return (
    <ThemeProvider theme={theme}>
      <Track
        $visible={visible}
        $reduced={reduced}
        aria-hidden="true"
        data-testid="navigation-progress"
        data-visible={visible ? 'true' : 'false'}
        data-reduced-motion={reduced ? 'true' : 'false'}
      >
        <Fill $reduced={reduced} />
      </Track>
    </ThemeProvider>
  );
}

export default NavigationProgress;
