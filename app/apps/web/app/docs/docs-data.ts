import type { FaqEntry } from '../../lib/seo/jsonLd';

/**
 * Docs page FAQ (discovery §5.5) — shared by the visible FAQ block and the
 * server-rendered FAQPage JSON-LD. Plain data module: safe to import from
 * both server (JSON-LD) and client (visible block).
 */
export const DOCS_FAQ: FaqEntry[] = [
  {
    question: 'What is JoinOrigin built on?',
    answer:
      'React, TypeScript, and Next.js on the web; NestJS, PostgreSQL, Redis, and Docker in the backend. Communication runs on the open Matrix protocol.',
  },
  {
    question: 'What is Matrix?',
    answer:
      'Matrix is an open, decentralized communication protocol with end-to-end encryption. Origin runs on it, so conversations — and the network graph behind them — are portable and persist forever.',
  },
  {
    question: 'Is JoinOrigin self-hostable?',
    answer:
      'No. Origin is a hosted product run by JoinOrigin, so there is nothing to self-host. Your network graph and connections persist forever via the open Matrix protocol, and your data stays portable.',
  },
  {
    question: 'When is the MVP launching?',
    answer:
      'JoinOrigin is in early access. The Community Foundation (Phase 1) is the MVP and ships to waitlist members first.',
  },
];
