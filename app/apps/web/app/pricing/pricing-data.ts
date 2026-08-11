import type { FaqEntry } from '../../lib/seo/jsonLd';

/**
 * Pricing page FAQ (discovery §5.4) — shared by the visible FAQ block and the
 * server-rendered FAQPage JSON-LD. Plain data module: safe to import from
 * both server (JSON-LD) and client (visible block).
 */
export const PRICING_FAQ: FaqEntry[] = [
  {
    question: 'Is JoinOrigin free right now?',
    answer:
      'Yes. JoinOrigin is in early access and joining the waitlist is free. Early members keep free access when the community OS launches.',
  },
  {
    question: 'What will plans cost?',
    answer:
      'Full plan details are announced with the beta. Until then we are not publishing prices — we would rather be honest than invent numbers.',
  },
  {
    question: 'Do I have to pay to join a community?',
    answer:
      'No. Joining communities is free during early access, and individuals keep a free tier when paid plans launch.',
  },
  {
    question: 'Can I self-host?',
    answer:
      'The architecture is open — communication runs on the open Matrix protocol and the platform is designed to be self-hostable.',
  },
];
