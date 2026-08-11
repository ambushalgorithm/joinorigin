import { SITE } from '../site';
import { absoluteUrl } from '../url';
import { ROUTES } from '../routes';
import { createMetadata } from '../metadata';
import { aboutPage, breadcrumbList, contactPage, faqPage, organization, website } from '../jsonLd';
import { buildLlmsText } from '../llms';

/**
 * fe-seo metadata helper unit tests (arch §3.10).
 *
 * Covers: `createMetadata` canonical/OG/Twitter resolution, `absoluteUrl`
 * root/nested handling, `ROUTES` invariants (path prefix + uniqueness),
 * JSON-LD builder shapes (Organization/WebSite/BreadcrumbList/FAQPage/
 * AboutPage/ContactPage), and the llms.txt generator.
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
});

describe('lib/seo JSON-LD builders', () => {
  it('organization exposes name, url and local logo', () => {
    const data = organization() as Record<string, unknown> & {
      name: string;
      url: string;
      logo: string;
      sameAs: string[];
    };
    expect(data['@type']).toBe('Organization');
    expect(data.name).toBe('JoinOrigin');
    expect(data.url).toBe(absoluteUrl('/'));
    expect(data.logo).toBe(absoluteUrl('/assets/logo/joinorigin-logo.svg'));
    expect(Array.isArray(data.sameAs)).toBe(true);
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

  it('breadcrumbList builds Home › Page positions with absolute items', () => {
    const data = breadcrumbList([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]);
    const list = data.itemListElement as Array<{ position: number; name: string; item: string }>;
    expect(list).toHaveLength(2);
    expect(list[0]).toMatchObject({ position: 1, name: 'Home', item: absoluteUrl('/') });
    expect(list[1]).toMatchObject({ position: 2, name: 'About', item: absoluteUrl('/about') });
  });

  it('faqPage mirrors visible question/answer pairs', () => {
    const data = faqPage([
      { question: 'Is JoinOrigin free?', answer: 'Yes, during early access.' },
    ]);
    const entity = (
      data.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>
    )[0];
    expect(entity.name).toBe('Is JoinOrigin free?');
    expect(entity.acceptedAnswer.text).toBe('Yes, during early access.');
  });

  it('aboutPage and contactPage mount at their page URLs', () => {
    expect(aboutPage()).toMatchObject({ '@type': 'AboutPage', url: absoluteUrl('/about') });
    expect(contactPage()).toMatchObject({ '@type': 'ContactPage', url: absoluteUrl('/contact') });
  });
});

describe('lib/seo llms.txt', () => {
  it('builds a text/plain document with absolute URLs and no API links', () => {
    const text = buildLlmsText();
    expect(text).toContain('# JoinOrigin');
    expect(text).toContain(absoluteUrl('/about'));
    expect(text).toContain(absoluteUrl('/features'));
    expect(text).not.toMatch(/\/api\//);
    expect(text.trimEnd()).not.toMatch(/\n\n$/);
  });
});
