import type { FaqEntry } from '../../lib/menuPages/jsonLd';

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
      'Matrix is an open, decentralized communication protocol with end-to-end encryption. JoinOrigin uses it so conversations are portable and interoperable.',
  },
  {
    question: 'Is JoinOrigin self-hostable?',
    answer:
      'Yes. The architecture is open and the platform is designed so communities and organizations can self-host or federate.',
  },
  {
    question: 'When is the MVP launching?',
    answer:
      'JoinOrigin is in early access. The Community Foundation (Phase 1) is the MVP and ships to waitlist members first.',
  },
];
