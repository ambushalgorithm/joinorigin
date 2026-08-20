import { GLOSSARY_HUB_PATH, guidePageEntries } from './guides';
import { FLAGSHIP_CITIES } from './locationData';
import { LOCATION_HUB_PATH } from './locationPages';
import { absoluteUrl } from './url';

/**
 * LLM-crawler index (`/llms.txt`) content (discovery §8.1, arch §3.9,
 * design §9.3).
 *
 * Single `LLMS_ENTRIES` array drives the plain-text route handler at
 * `app/llms.txt/route.ts` — keep the doc under ~3 KB so LLM crawlers can
 * hold it in context (the 12-guide set, TASK-353, raised the original ~2 KB
 * budget for 7 guides). **Curated, not exhaustive**: Locations lists the hub
 * + the two flagship city pages (NYC + Berlin) — the long tail lives in the
 * sitemap, never here (design §9.3). Every link points to an LLM-parseable
 * HTML page; no links to the waitlist modal or `/api/*`.
 *
 * All-routes-prefixed (TASK-464 + TASK-466): every link targets the EN
 * canonical `/en/**` surface (the unprefixed `/**` tree 307-redirects at the
 * proxy). `guidePageEntries()` already returns `/en/guides/...` paths, so the
 * guide links below stay in sync automatically; static links carry the
 * `/en` prefix explicitly.
 *
 * Design source: `app/docs/design/sprint-4-discovery.md` §8.1,
 * `app/docs/design/sprint-11-seo-content-engine.md` §9.3.
 */
export interface LlmsEntry {
  heading: string;
  links: Array<{ path: string; description: string }>;
}

/** The EN canonical surface path for an unprefixed route — `/en/...`. */
function enSurfacePath(path: string): string {
  return path === '/' ? '/en' : `/en${path}`;
}

/** Curated flagship city links — the hub + the 2 MVP flagships only. */
function flagshipLinks(): Array<{ path: string; description: string }> {
  return FLAGSHIP_CITIES.map((flagship) => ({
    path: enSurfacePath(
      `/location/${flagship.countrySlug}/${flagship.regionSlug}/${flagship.slug}`,
    ),
    description: `Communities in ${flagship.displayName}.`,
  }));
}

/** Curated guide links — all 12 L1 guides, terse descriptions. */
function guideLinks(): Array<{ path: string; description: string }> {
  const terse = new Map<string, string>([
    ['start-a-community', 'Start a community.'],
    ['organize-a-meetup', 'Organize a meetup.'],
    ['first-10-members', 'Get your first 10 members.'],
    ['find-a-co-founder', 'Find a co-founder.'],
    ['keep-a-community-active', 'Keep a community active.'],
    ['hybrid-communities', 'Run hybrid communities.'],
    ['moderation', 'Moderate a community.'],
    ['publish-an-idea', 'Publish an idea.'],
    ['create-a-project', 'Create a project.'],
    ['create-a-group', 'Create a group.'],
    ['publish-a-small-business-idea', 'Publish a small business idea.'],
    ['publish-a-startup-concept', 'Publish a startup concept.'],
  ]);
  return guidePageEntries().map((entry) => ({
    path: entry.path,
    description: terse.get(entry.slug) ?? `${entry.title}.`,
  }));
}

export const LLMS_ENTRIES: readonly LlmsEntry[] = [
  {
    heading: 'Overview',
    links: [
      { path: '/en', description: 'What Origin is and how to get started.' },
      {
        path: '/en/about',
        description: 'Mission and principles — the operating system for human collaboration.',
      },
      { path: '/en/community', description: 'Values and the 2,400+ member network.' },
    ],
  },
  {
    heading: 'Features',
    links: [
      {
        path: '/en/features',
        description: 'Profiles, ideas, communities, chat, projects.',
      },
    ],
  },
  {
    heading: 'Locations',
    links: [
      { path: enSurfacePath(LOCATION_HUB_PATH), description: 'Find or start communities by city.' },
      ...flagshipLinks(),
    ],
  },
  {
    heading: 'Guides',
    links: guideLinks(),
  },
  {
    heading: 'Glossary',
    links: [
      {
        path: enSurfacePath(GLOSSARY_HUB_PATH),
        description: 'Core community-building terms.',
      },
    ],
  },
  {
    heading: 'Docs',
    links: [
      {
        path: '/en/docs',
        description: 'Concepts, roadmap, and architecture.',
      },
    ],
  },
  {
    heading: 'Contact',
    links: [{ path: '/en/contact', description: 'Contact and support.' }],
  },
  {
    heading: 'Legal',
    links: [
      { path: '/en/privacy', description: 'Privacy policy.' },
      { path: '/en/terms', description: 'Terms of service.' },
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
    '> Origin is a social collaboration network — a community OS where people',
    '> post ideas, form communities, and build projects together.',
    '> Live and growing — join us.',
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
