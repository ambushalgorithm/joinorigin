import { absoluteUrl } from './url';

/**
 * LLM-crawler index (`/llms.txt`) content (discovery §8.1, arch §3.9).
 *
 * Single `LLMS_ENTRIES` array drives the plain-text route handler at
 * `app/llms.txt/route.ts` — keep the doc under ~2 KB so LLM crawlers can
 * hold it in context. Every link points to an LLM-parseable HTML page; no
 * links to the waitlist modal or `/api/*`.
 *
 * Design source: `app/docs/design/sprint-4-discovery.md` §8.1.
 */
export interface LlmsEntry {
  heading: string;
  links: Array<{ path: string; description: string }>;
}

export const LLMS_ENTRIES: readonly LlmsEntry[] = [
  {
    heading: 'Overview',
    links: [
      { path: '/', description: 'What JoinOrigin is and how to join the waitlist.' },
      {
        path: '/about',
        description: 'Mission and principles — "the operating system for human collaboration".',
      },
      {
        path: '/community',
        description: 'Values, example communities, and the 2,400+ member network.',
      },
    ],
  },
  {
    heading: 'Features',
    links: [
      {
        path: '/features',
        description:
          'Core objects — profiles, communities, chat, feed, projects, companies, opportunities.',
      },
    ],
  },
  {
    heading: 'Pricing',
    links: [
      {
        path: '/pricing',
        description: 'Free during early access; future plan outline.',
      },
    ],
  },
  {
    heading: 'Docs',
    links: [
      {
        path: '/docs',
        description: 'Concepts, roadmap, and architecture explained.',
      },
    ],
  },
  {
    heading: 'Contact',
    links: [
      {
        path: '/contact',
        description: 'Contact form and support paths.',
      },
    ],
  },
  {
    heading: 'Optional',
    links: [
      { path: '/privacy', description: 'Privacy policy.' },
      { path: '/terms', description: 'Terms of service.' },
    ],
  },
];

/**
 * Serialize the LLM index to the llms.txt v2 format: H1 + blockquote
 * summary + H2 file lists with informative descriptions.
 */
export function buildLlmsText(): string {
  const lines: string[] = [
    '# JoinOrigin',
    '',
    '> JoinOrigin is a social collaboration network — a community OS where people',
    '> discover each other, form communities, start projects, and build companies',
    '> together. It combines profiles, communities, chat, feed, projects,',
    '> companies, and opportunities in one platform built around the social graph.',
    '',
    'Key facts:',
    '',
    '- JoinOrigin is not a chat app, project manager, or social feed — it is a',
    '  relationship network that enables collaboration.',
    '- The platform is organized around Communities (AI Builders, Startup Founders,',
    '  Quant Trading, Real Estate, Local Communities).',
    '- Communication runs on the open Matrix protocol; identity, profiles,',
    '  communities, and the social graph are owned by JoinOrigin.',
    '- Currently in early access; joining is free via the waitlist.',
    '',
  ];

  for (const section of LLMS_ENTRIES) {
    lines.push(`## ${section.heading}`, '');
    for (const link of section.links) {
      lines.push(`- [${link.path}](${absoluteUrl(link.path)}): ${link.description}`);
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd() + '\n';
}
