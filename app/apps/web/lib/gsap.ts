import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single GSAP registration point (design spec sprint-10-menu-anim §5.10).
 *
 * `ScrollTrigger` is registered exactly once, client-side only (SSR-safe via
 * the `typeof window` guard — 'use client' components still render on the
 * server for the initial HTML). All animated components import `gsap` from
 * here so plugin registration never happens more than once.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
