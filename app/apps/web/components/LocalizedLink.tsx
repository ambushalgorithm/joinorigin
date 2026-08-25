'use client';

import Link, { type LinkProps } from 'next/link';
import type { ReactNode } from 'react';

import { useLocalizePath } from '../lib/seo/localePath';

/**
 * Shared locale-aware prefetch Link — Story F navigation performance
 * mechanism (TASK-537 / fe-nav-perf-fix).
 *
 * Next 16's default `<Link prefetch={null}>` prefetches ONLY the RSC payload;
 * the target route's JS chunks load on the click critical path
 * (`docs/design/sprint-22-nav-perf-baseline.md` RC3). `prefetch={true}`
 * prefetches the full route (RSC payload + JS chunks), so a click renders the
 * target route's primary content from data the browser already has.
 *
 * This wrapper composes the two things every nav link needs:
 *
 * 1. **Locale prefixing** — `useLocalizePath` applies the active locale's
 *    prefix to `href` (all-routes-prefixed, TASK-464) so links always carry
 *    `/<locale>/...` and never 307-redirect.
 * 2. **Full prefetch** — defaults `prefetch={true}` so the target route's
 *    JS chunks are warmed before the click. Pass `prefetch={false}` to opt
 *    out, or `prefetch={null}` for the RSC-only default.
 *
 * This is the SHARED mechanism for the Header/dropdown nav links (owned by
 * fe-header-footer) and any other nav surface: adopt it instead of a bare
 * `next/link` + `localizePath` to get the Story F click-path win. The role
 * boundary requires the mechanism to exist without editing those files; the
 * PM coordination note tracks adoption.
 *
 * All other `next/link` props (replace, scroll, onMouseEnter, …) pass
 * through unchanged, so this is a drop-in replacement for
 * `<Link href={localizePath(href)}>`.
 */
export function LocalizedLink({
  href,
  prefetch = true,
  children,
  ...rest
}: LinkProps & { href: string } & { children?: ReactNode }) {
  const localizePath = useLocalizePath();
  return (
    <Link href={localizePath(href)} prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
}

export type { LinkProps as LocalizedLinkProps };
export default LocalizedLink;
