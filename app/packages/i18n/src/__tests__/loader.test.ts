import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { SUPPORTED_LOCALES } from '../resolve';
import { getDictionary, getT, loadDictionary, lookup } from '../loader';
import type { Dictionary } from '../types';
import { PENDING_ADDITIONS, PENDING_REMOVALS } from '../../scripts/check-keys';

const LOCALES_DIR = join(__dirname, '..', '..', 'locales');

function flattenKeys(
  obj: Record<string, unknown>,
  prefix = '',
  keys: Set<string> = new Set(),
): Set<string> {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenKeys(value as Record<string, unknown>, full, keys);
    } else {
      keys.add(full);
    }
  }
  return keys;
}

describe('dictionary loading — every locale JSON (arch-i18n §10.1)', () => {
  it('exposes exactly the 21 supported locales', () => {
    expect(SUPPORTED_LOCALES).toHaveLength(21);
  });

  it('getDictionary strips the reserved dir metadata key', () => {
    const en = getDictionary('en');
    expect('dir' in en).toBe(false);
    expect(en.home).toBeDefined();
  });

  it('every locale parses and mirrors en.json key-for-key (minus dir)', () => {
    const enRaw = JSON.parse(readFileSync(join(LOCALES_DIR, 'en.json'), 'utf8')) as Record<
      string,
      unknown
    >;
    const enKeys = flattenKeys(enRaw);

    for (const locale of SUPPORTED_LOCALES) {
      const raw = JSON.parse(readFileSync(join(LOCALES_DIR, `${locale}.json`), 'utf8')) as Record<
        string,
        unknown
      >;
      const keys = flattenKeys(raw);

      // Sprint 18 (TASK-411): en.json gained new keys that the per-locale
      // i18n-{locale}-s18 roles translate in parallel, and dropped keys those
      // roles are still cleaning up. During the transition a locale may be
      // missing exactly PENDING_ADDITIONS and may carry exactly
      // PENDING_REMOVALS — any other diff is drift and fails (mirrors
      // scripts/check-keys.ts). Once all locales land, parity is exact again.
      const missing = [...enKeys].filter((key) => !keys.has(key));
      const extra = [...keys].filter((key) => !enKeys.has(key));
      for (const key of missing) {
        expect(PENDING_ADDITIONS.has(key)).toBe(true);
      }
      for (const key of extra) {
        expect(PENDING_REMOVALS.has(key)).toBe(true);
      }

      expect(raw.dir).toBe(locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr');
      expect(getDictionary(locale)).toBeDefined();
    }
  });

  it('loadDictionary resolves every locale asynchronously', async () => {
    for (const locale of SUPPORTED_LOCALES) {
      const dict = await loadDictionary(locale);
      expect(dict.home).toBeDefined();
    }
  });

  it('every value is a JSON string (arch-i18n §4.1 — no arrays/numbers/booleans)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const dict = getDictionary(locale);
      for (const value of Object.values(flattenValues(dict))) {
        expect(typeof value).toBe('string');
      }
    }
  });
});

function flattenValues(
  obj: Record<string, unknown>,
  prefix = '',
  out: Record<string, unknown> = {},
): Record<string, unknown> {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenValues(value as Record<string, unknown>, full, out);
    } else {
      out[full] = value;
    }
  }
  return out;
}

describe('getT — synchronous server t() (arch-i18n §3.3)', () => {
  it('resolves dotted keys', () => {
    const t = getT(getDictionary('en'));
    expect(t('header.logIn')).toBe('Log In');
    expect(t('footer.tagline')).toBe('Where teams find their Origin');
  });

  it('interpolates {{variables}}', () => {
    const t = getT(getDictionary('en'));
    expect(t('home.hero.trustAvatarsAlt', { number: 3 })).toBe('JoinOrigin member 3');
    expect(t('contact.mailtoSubject', { name: 'Ada' })).toBe('JoinOrigin contact — Ada');
  });

  it('returns the key when missing', () => {
    const t = getT(getDictionary('en'));
    expect(t('missing.key')).toBe('missing.key');
  });
});

describe('origin repositioning EN copy (TASK-565 — sprint-24-origin-reframe-copy.md)', () => {
  it('home hero headline ends on the brand accent token', () => {
    const t = getT(getDictionary('en'));
    expect(t('home.hero.headline')).toBe(
      'Where every idea, startup, and project finds the people and resources to move it forward — Origin.',
    );
    expect(t('home.hero.headlineAccent')).toBe('Origin.');
  });

  it('home definition teaches the Origin noun (no community lead)', () => {
    const t = getT(getDictionary('en'));
    expect(t('home.definition')).toBe(
      'Origin is the space you start around a goal — an idea, a startup, a small business, or a project. Bring the people and resources it needs, and move it forward together: co-founders, partners, clients, supporters, and your network. JoinOrigin is the brand and the network behind it.',
    );
  });

  it('CTA band headline and subline are Origin-first (decision C)', () => {
    const t = getT(getDictionary('en'));
    expect(t('ctaBand.headline')).toBe(
      'Start an Origin. Find the people and resources to move it forward.',
    );
    expect(t('ctaBand.subline')).toContain('gathering people and resources on Origin');
  });

  it('roadmap phase 1 is renamed Origin Foundation', () => {
    const t = getT(getDictionary('en'));
    expect(t('common.roadmap.phase1Title')).toBe('Phase 1 — Origin Foundation');
    expect(t('features.roadmap.phase1.body')).toBe(
      'Profiles, Origins, chat, and the social graph. Success metric: members forming durable Origins.',
    );
  });

  it('core object communities card is renamed Origins (decision B)', () => {
    const t = getT(getDictionary('en'));
    expect(t('common.objects.communities')).toBe('Origins');
    expect(t('features.coreObjects.communities.body')).toBe(
      'The space you start around a goal — a startup, a small business, a book club, or any idea. Every Origin gathers the people who share it and comes with its own room where the work moves forward.',
    );
  });

  it('signup success copy uses the brand echo (decision D)', () => {
    const t = getT(getDictionary('en'));
    expect(t('signup.successCopy')).toBe("We'll email you when your Origin is ready.");
  });
});

describe('wave 3 origin reframe — location + guides chrome (TASK-569)', () => {
  it('guides hub is renamed Origin Building', () => {
    const t = getT(getDictionary('en'));
    expect(t('seoContent.guides.hubEyebrow')).toBe('Origin building');
    expect(t('seoContent.guides.hubTitle')).toBe('Origin Building Guides');
    expect(t('seoContent.guides.hubLead')).toBe(
      'Twelve practical, evergreen how-to guides for starting and growing Origins — and communicating in a creator-controlled room. From publishing an idea to healthy moderation.',
    );
    expect(t('seoContent.guides.keepLearningGuides')).toBe(
      'Browse all guides on the <1>Origin Building hub</1>.',
    );
  });

  it('guides universalCopy and cityCardBody use the Origin-local framing (Option C)', () => {
    const t = getT(getDictionary('en'));
    expect(t('seoContent.guides.universalCopy')).toBe(
      'Origins are online by nature, and they can also have a local space. Find or start an Origin near you:',
    );
    expect(t('seoContent.guides.cityCardBody', { city: 'Berlin' })).toBe(
      'Explore the local spaces and people behind Origins in Berlin.',
    );
    expect(t('seoContent.guides.exploreCommunities')).toBe('Explore Origins');
    expect(t('seoContent.guides.howJoinOriginHelpsBody')).toContain('find or start Origins');
  });

  it('location eyebrows and breadcrumb are Origin-first', () => {
    const t = getT(getDictionary('en'));
    expect(t('seoContent.eyebrow.hub')).toBe('Origins by city');
    expect(t('seoContent.eyebrow.country')).toBe('Origins in this country');
    expect(t('seoContent.eyebrow.region')).toBe('Origins in this region');
    expect(t('seoContent.eyebrow.city')).toBe('Origins in this city');
    expect(t('seoContent.eyebrow.variant')).toBe('Origin type');
    expect(t('seoContent.eyebrow.ideas')).toBe('Origin event ideas');
    expect(t('seoContent.breadcrumb.hub')).toBe('Origins by City');
  });

  it('location chrome swaps community nouns for Origins', () => {
    const t = getT(getDictionary('en'));
    expect(t('seoContent.location.presenceClaim', { city: 'Berlin' })).toBe(
      'Find or start an Origin in Berlin',
    );
    expect(t('seoContent.location.communitiesIn', { city: 'Berlin' })).toBe('Origins in Berlin');
    expect(t('seoContent.location.exploreCommunities')).toBe('Explore Origins');
    expect(t('seoContent.location.exploreGroupTypes')).toBe('Explore Origin types');
    expect(t('seoContent.location.groupTypesInCity')).toBe('Origin types in the city');
    expect(t('seoContent.location.nearbyCities')).toBe('Origins in nearby cities');
    expect(t('seoContent.location.guidesTitle')).toBe('Guides for starting an Origin');
    expect(t('seoContent.location.directoryBannerLabel')).toBe('Places and Origins');
    expect(t('seoContent.location.directoryBannerCopy')).toBe(
      'Browse every place and Origin on the network. Find the one that fits you, or start one in your city.',
    );
    expect(t('seoContent.location.hubIntro')).toBe(
      'Every country, region, city, Origin type, and event idea on the network — find the Origin you are looking for or start one in your city.',
    );
    expect(t('seoContent.location.hubLead')).toBe(
      'Explore Origins by city around the world — startup, creative, political, meetup, and small business groups.',
    );
    expect(t('seoContent.location.searchLocationsPlaceholder')).toBe(
      'Search by city, country, or Origin type',
    );
    expect(t('seoContent.location.directorySectionTitles.communityTypes')).toBe('Origin types');
    expect(t('seoContent.location.directoryKinds.variant')).toBe('Origin type');
    expect(t('seoContent.location.directoryKinds.ideas')).toBe('Origin event ideas');
  });

  it('group types are renamed Origins', () => {
    const t = getT(getDictionary('en'));
    expect(t('seoContent.groupTypes.startup')).toBe('Startup Origins');
    expect(t('seoContent.groupTypes.creative')).toBe('Creative & design Origins');
    expect(t('seoContent.groupTypes.political')).toBe('Political & civic Origins');
    expect(t('seoContent.groupTypes.meetup')).toBe('Origin meetups & events');
    expect(t('seoContent.groupTypes.smallBusiness')).toBe('Small business Origins');
  });

  it('location guide card titles are Origin-first', () => {
    const t = getT(getDictionary('en'));
    expect(t('seoContent.location.guideCardTitles.start-a-community')).toBe('Start an Origin');
    expect(t('seoContent.location.guideCardTitles.keep-a-community-active')).toBe(
      'Keep an Origin active',
    );
    expect(t('seoContent.location.guideCardTitles.hybrid-communities')).toBe('Run hybrid Origins');
    expect(t('seoContent.location.guideCardTitles.moderation')).toBe('Moderate your Origin');
  });

  it('FAQ templates reframe country and region questions to Origins', () => {
    const t = getT(getDictionary('en'));
    expect(
      t('seoContent.location.faqTemplates.country.communitiesQuestion', { country: 'Germany' }),
    ).toBe('How do I find Origins in Germany?');
    expect(
      t('seoContent.location.faqTemplates.country.communitiesAnswer', {
        country: 'Germany',
        cities: 'Berlin',
      }),
    ).toContain('The /location hub lists every Origin in Germany.');
    expect(
      t('seoContent.location.faqTemplates.country.operationAnswer', { country: 'Germany' }),
    ).toContain('find or start Origins anywhere in Germany');
    expect(
      t('seoContent.location.faqTemplates.region.communitiesQuestion', { region: 'Bavaria' }),
    ).toBe('How do I find Origins in Bavaria?');
    expect(
      t('seoContent.location.faqTemplates.region.communitiesAnswer', {
        region: 'Bavaria',
        cities: 'Munich',
      }),
    ).toContain('start an Origin of your own');
    expect(
      t('seoContent.location.faqTemplates.region.operationAnswer', { region: 'Bavaria' }),
    ).toContain('find or start Origins anywhere in Bavaria');
  });

  it('location metadata title and description are Origin-first', () => {
    const t = getT(getDictionary('en'));
    expect(t('seoContent.metadata.title.communitiesIn', { name: 'Berlin' })).toBe(
      'Origins in Berlin',
    );
    expect(
      t('seoContent.metadata.title.communitiesInWithRegion', { name: 'Berlin', region: 'Berlin' }),
    ).toBe('Origins in Berlin, Berlin');
    expect(t('seoContent.metadata.title.ideasIn', { name: 'Berlin' })).toBe(
      '30 Origin event ideas in Berlin',
    );
    expect(
      t('seoContent.metadata.description.city', { city: 'Berlin', waitlist: 'Join Origin.' }),
    ).toBe(
      'Find or start Origins in Berlin — startup, creative, political, meetup, and small business groups. Join Origin.',
    );
    expect(
      t('seoContent.metadata.description.ideas', { city: 'Berlin', waitlist: 'Join Origin.' }),
    ).toBe(
      'Discover 30 Origin event ideas in Berlin — networking, learning, outdoor, professional, creative, and impact events. Join Origin.',
    );
    expect(
      t('seoContent.metadata.description.country', {
        country: 'Germany',
        waitlist: 'Join Origin.',
      }),
    ).toBe(
      'Find or start Origins in Germany — from startup scenes to small business networks. Join Origin.',
    );
    expect(
      t('seoContent.metadata.description.region', { region: 'Bavaria', waitlist: 'Join Origin.' }),
    ).toBe(
      'Find or start Origins in Bavaria — meetups, groups, and events across the region. Join Origin.',
    );
  });
});

describe('lookup — dot-path access', () => {
  it('returns nested values', () => {
    const dict = getDictionary('en') as Dictionary;
    expect(lookup(dict, 'home.hero.headlineAccent')).toBe('Origin.');
    expect(lookup(dict, 'nope')).toBeUndefined();
  });
});
