import { SUPPORTED_LOCALES } from '@joinorigin/i18n';

import { SITE } from '../site';
import { absoluteUrl } from '../url';
import { ROUTES } from '../routes';
import { createMetadata, localizeMetadata } from '../metadata';
import { aboutPage, breadcrumbList, contactPage, faqPage, organization, website } from '../jsonLd';
import { buildLlmsText } from '../llms';

/**
 * fe-seo metadata helper unit tests (arch §3.10).
 *
 * Covers: `createMetadata` canonical/OG/Twitter resolution + per-locale
 * surface handling (TASK-458), `localizeMetadata` EN-fallback localization,
 * `absoluteUrl` root/nested handling, `ROUTES` invariants (path prefix +
 * uniqueness), JSON-LD builder shapes (Organization/WebSite/BreadcrumbList/
 * FAQPage/AboutPage/ContactPage), and the llms.txt generator.
 */

describe('lib/seo absoluteUrl', () => {
  it('resolves the root path to the site origin', () => {
    expect(absoluteUrl('/')).toBe(`${SITE.url}/`);
  });

  it('resolves nested paths under the site origin', () => {
    expect(absoluteUrl('/about')).toBe(`${SITE.url}/about`);
    expect(absoluteUrl('/features')).toBe(`${SITE.url}/features`);
  });

  it('normalizes a path missing the leading slash', () => {
    expect(absoluteUrl('contact')).toBe(`${SITE.url}/contact`);
  });
});

describe('lib/seo SITE constants', () => {
  it('exposes an absolute site URL as metadataBase', () => {
    expect(new URL(SITE.url).protocol).toBe('http:');
    expect(SITE.domain).toBeTruthy();
  });

  it('points ogImage at a local asset (no external host)', () => {
    expect(SITE.ogImage.startsWith('/assets/')).toBe(true);
  });
});

describe('lib/seo ROUTES', () => {
  it('every route path starts with / and is unique', () => {
    const paths = ROUTES.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) {
      expect(p.startsWith('/')).toBe(true);
    }
  });

  it('covers the homepage and all menu pages', () => {
    const paths = ROUTES.map((r) => r.path);
    expect(paths).toEqual(
      expect.arrayContaining(['/', '/about', '/features', '/community', '/contact']),
    );
  });

  it('gives the homepage priority 1 and subpages <= 0.8', () => {
    expect(ROUTES.find((r) => r.path === '/')?.priority).toBe(1);
    for (const r of ROUTES) {
      if (r.path !== '/') expect(r.priority).toBeLessThanOrEqual(0.8);
    }
  });
});

describe('lib/seo createMetadata', () => {
  it('produces canonical = absolute page URL', () => {
    const meta = createMetadata({
      title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
      description: 'Features description',
      path: '/features',
    });
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/features'));
  });

  it('resolves OG and Twitter images to absolute URLs', () => {
    const meta = createMetadata({ title: 'T', description: 'D', path: '/about' });
    const ogImage = (meta.openGraph?.images as Array<{ url: string }>)[0];
    expect(ogImage.url).toBe(absoluteUrl(SITE.ogImage));
    expect(meta.twitter?.images).toEqual([absoluteUrl(SITE.ogImage)]);
  });

  it('sets OG type website by default and passes through keywords', () => {
    const meta = createMetadata({
      title: 'T',
      description: 'D',
      path: '/contact',
      keywords: ['contact JoinOrigin'],
    });
    const og = meta.openGraph as { type?: string };
    expect(og.type).toBe('website');
    expect(meta.keywords).toEqual(['contact JoinOrigin']);
  });

  it('stays per-locale for a non-EN surface: canonical + hreflang on /<locale>/... (x-default → /en/)', () => {
    const meta = createMetadata({
      title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
      description: 'Features description',
      path: '/de/features',
      locale: 'de',
    });
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/de/features'));
    expect(meta.alternates?.languages).toEqual({
      de: absoluteUrl('/de/features'),
      en: absoluteUrl('/en/features'),
      'x-default': absoluteUrl('/en/features'),
    });
  });

  it('prefixes an unprefixed EN path onto the non-EN surface', () => {
    const meta = createMetadata({
      title: 'T',
      description: 'D',
      path: '/features',
      locale: 'pt-BR',
    });
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/pt-BR/features'));
    expect(meta.alternates?.languages).toEqual({
      'pt-BR': absoluteUrl('/pt-BR/features'),
      en: absoluteUrl('/en/features'),
      'x-default': absoluteUrl('/en/features'),
    });
  });

  it('keeps the home surface at /<locale> with x-default → /en root', () => {
    const meta = createMetadata({
      title: 'T',
      description: 'D',
      path: '/de',
      locale: 'de',
    });
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/de'));
    expect(meta.alternates?.languages).toEqual({
      de: absoluteUrl('/de'),
      en: absoluteUrl('/en'),
      'x-default': absoluteUrl('/en'),
    });
  });

  it('emits the FULL 21-locale cluster for locale=en (G-10): canonical /en/... + every /<locale>/ counterpart', () => {
    const meta = createMetadata({
      title: 'T',
      description: 'D',
      path: '/en/features',
      locale: 'en',
    });
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/en/features'));
    const languages = meta.alternates?.languages as Record<string, string>;
    expect(languages.en).toBe(absoluteUrl('/en/features'));
    expect(languages.de).toBe(absoluteUrl('/de/features'));
    expect(languages['x-default']).toBe(absoluteUrl('/en/features'));
    expect(Object.keys(languages)).toHaveLength(SUPPORTED_LOCALES.length + 1);
  });

  it('prefixes an unprefixed path onto the EN surface (canonical /en/..., never unprefixed)', () => {
    const meta = createMetadata({
      title: 'T',
      description: 'D',
      path: '/features',
      locale: 'en',
    });
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/en/features'));
    const languages = meta.alternates?.languages as Record<string, string>;
    expect(languages.en).toBe(absoluteUrl('/en/features'));
    expect(languages.de).toBe(absoluteUrl('/de/features'));
    expect(languages['x-default']).toBe(absoluteUrl('/en/features'));
  });

  it('keeps the EN home surface at /en with the full cluster', () => {
    const meta = createMetadata({
      title: 'T',
      description: 'D',
      path: '/en',
      locale: 'en',
    });
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/en'));
    const languages = meta.alternates?.languages as Record<string, string>;
    expect(languages.en).toBe(absoluteUrl('/en'));
    expect(languages.de).toBe(absoluteUrl('/de'));
    expect(languages['x-default']).toBe(absoluteUrl('/en'));
  });

  it('honors an explicit languages map over the locale-derived cluster', () => {
    const meta = createMetadata({
      title: 'T',
      description: 'D',
      path: '/de/guides/start-an-origin',
      locale: 'de',
      languages: { ja: absoluteUrl('/ja/guides/start-an-origin') },
    });
    expect(meta.alternates?.languages).toEqual({
      ja: absoluteUrl('/ja/guides/start-an-origin'),
    });
  });
});

describe('lib/seo localizeMetadata (EN-fallback surface rewrite, TASK-458 + TASK-466)', () => {
  const enMeta = createMetadata({
    title: 'Berlin — Communities in Berlin | JoinOrigin',
    description: 'Find or start a community in Berlin.',
    path: '/location/germany/berlin',
    robots: { index: false, follow: true },
  });

  it('localizes canonical + hreflang but preserves title/OG/robots', () => {
    const meta = localizeMetadata(enMeta, 'de', '/location/germany/berlin');
    expect(meta.title).toBe('Berlin — Communities in Berlin | JoinOrigin');
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/de/location/germany/berlin'));
    expect(meta.alternates?.languages).toEqual({
      de: absoluteUrl('/de/location/germany/berlin'),
      en: absoluteUrl('/en/location/germany/berlin'),
      'x-default': absoluteUrl('/en/location/germany/berlin'),
    });
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.openGraph?.title).toBe('Berlin — Communities in Berlin | JoinOrigin');
  });

  it('rewrites the EN surface to /en/** with the FULL 21-locale cluster (G-10)', () => {
    const meta = localizeMetadata(enMeta, 'en', '/location/germany/berlin');
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/en/location/germany/berlin'));
    const languages = meta.alternates?.languages as Record<string, string>;
    expect(languages.en).toBe(absoluteUrl('/en/location/germany/berlin'));
    expect(languages.de).toBe(absoluteUrl('/de/location/germany/berlin'));
    expect(languages['x-default']).toBe(absoluteUrl('/en/location/germany/berlin'));
    expect(Object.keys(languages)).toHaveLength(SUPPORTED_LOCALES.length + 1);
  });

  it('accepts an already-/en-prefixed EN surface path idempotently', () => {
    const meta = localizeMetadata(enMeta, 'en', '/en/location/germany/berlin');
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/en/location/germany/berlin'));
    const languages = meta.alternates?.languages as Record<string, string>;
    expect(languages.en).toBe(absoluteUrl('/en/location/germany/berlin'));
    expect(languages.de).toBe(absoluteUrl('/de/location/germany/berlin'));
    expect(languages['x-default']).toBe(absoluteUrl('/en/location/germany/berlin'));
  });

  it('maps the EN root onto /<locale> (no trailing slash) and /en for the EN surface', () => {
    const meta = localizeMetadata(enMeta, 'de', '/');
    expect(meta.alternates?.canonical).toBe(absoluteUrl('/de'));
    const enMetaRoot = localizeMetadata(enMeta, 'en', '/');
    expect(enMetaRoot.alternates?.canonical).toBe(absoluteUrl('/en'));
  });
});

describe('lib/seo JSON-LD builders', () => {
  it('organization exposes name, url and local logo', () => {
    const data = organization() as Record<string, unknown> & {
      name: string;
      url: string;
      logo: string;
    };
    expect(data['@type']).toBe('Organization');
    expect(data.name).toBe('JoinOrigin');
    expect(data.url).toBe(absoluteUrl('/'));
    expect(data.logo).toBe(absoluteUrl('/assets/logo/joinorigin-logo.svg'));
    // G-7 — no real social profiles are provisioned yet, so the empty
    // `sameAs` property is OMITTED (never `sameAs: []`).
    expect('sameAs' in data).toBe(false);
  });

  it('website exposes name, url and language', () => {
    const data = website() as Record<string, unknown> & {
      name: string;
      url: string;
      inLanguage: string;
    };
    expect(data['@type']).toBe('WebSite');
    expect(data.name).toBe('JoinOrigin');
    expect(data.url).toBe(absoluteUrl('/'));
    expect(data.inLanguage).toBe('en');
  });

  it('breadcrumbList builds Home › Page positions with canonicalized /en/** items (G-8)', () => {
    const data = breadcrumbList([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Berlin', path: '/de/location/germany/berlin' },
    ]);
    const list = data.itemListElement as Array<{ position: number; name: string; item: string }>;
    expect(list).toHaveLength(3);
    expect(list[0]).toMatchObject({ position: 1, name: 'Home', item: absoluteUrl('/en') });
    expect(list[1]).toMatchObject({ position: 2, name: 'About', item: absoluteUrl('/en/about') });
    // Already-prefixed locale paths pass through unchanged (canonical on
    // their own surface).
    expect(list[2]).toMatchObject({
      position: 3,
      name: 'Berlin',
      item: absoluteUrl('/de/location/germany/berlin'),
    });
  });

  it('faqPage mirrors visible question/answer pairs', () => {
    const data = faqPage([
      {
        question: 'What can I do once I am in?',
        answer: 'Build your profile and join communities.',
      },
    ]);
    const entity = (
      data.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>
    )[0];
    expect(entity.name).toBe('What can I do once I am in?');
    expect(entity.acceptedAnswer.text).toBe('Build your profile and join communities.');
  });

  it('aboutPage and contactPage mount at their page URLs', () => {
    expect(aboutPage()).toMatchObject({ '@type': 'AboutPage', url: absoluteUrl('/about') });
    expect(contactPage()).toMatchObject({ '@type': 'ContactPage', url: absoluteUrl('/contact') });
  });
});

describe('lib/seo llms.txt', () => {
  it('builds a text/plain document with absolute /en/** URLs and no API links', () => {
    const text = buildLlmsText();
    expect(text).toContain('# JoinOrigin');
    expect(text).toContain(absoluteUrl('/en/about'));
    expect(text).toContain(absoluteUrl('/en/features'));
    expect(text).not.toMatch(/\/api\//);
    expect(text.trimEnd()).not.toMatch(/\n\n$/);
  });
});
