import { ImageResponse } from 'next/og';

/**
 * Apple touch icon generated through the App Router metadata file
 * convention (`apple-icon`). Served at `/apple-icon` and auto-registered
 * as `<link rel="apple-touch-icon">` without touching `layout.tsx`
 * (owned by fe-seo).
 *
 * Keep `MARK_SVG` in sync with `public/assets/logo/joinorigin-mark.svg`.
 */

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="jo-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4F7DF9"/>
      <stop offset="100%" stop-color="#8AB4FF"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="92" height="92" rx="24" fill="url(#jo-gradient)"/>
  <path d="M25 36 H39 A5 5 0 0 1 44 41 V50 C44 61 37 67 29 67 C24.5 67 21 64 21 60 C21 57.5 22.5 55.5 25 55.5 C27.5 55.5 29 57.5 29 60" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="67" cy="49" r="11.5" fill="none" stroke="#FFFFFF" stroke-width="8"/>
</svg>`;

const markDataUri = `data:image/svg+xml,${encodeURIComponent(MARK_SVG)}`;

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
// Node.js runtime: the deprecated Edge Runtime is gone (Next.js 16.3) while
// `next/og` ImageResponse keeps rendering byte-equivalent PNG output.
export const runtime = 'nodejs';

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <img src={markDataUri} width={size.width} height={size.height} alt="" />
    </div>,
    { ...size },
  );
}
