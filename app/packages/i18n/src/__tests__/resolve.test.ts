import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getDir,
  normalizeLocale,
  parseAcceptLanguage,
  resolveAcceptLanguage,
  resolveLocale,
  type Locale,
} from '../resolve';

describe('resolveLocale — auto-detect + fallback matrix (arch-i18n §6.2)', () => {
  it('returns en for empty / null / undefined input', () => {
    expect(resolveLocale(undefined)).toBe('en');
    expect(resolveLocale(null)).toBe('en');
    expect(resolveLocale('')).toBe('en');
    expect(resolveLocale('   ')).toBe('en');
  });

  it('matches exact supported locales', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(resolveLocale(locale)).toBe(locale);
    }
  });

  it('normalizes casing and underscores (pt-BR, zh-CN, zh-TW)', () => {
    expect(resolveLocale('PT-BR')).toBe('pt-BR');
    expect(resolveLocale('pt_br')).toBe('pt-BR');
    expect(resolveLocale('ZH-CN')).toBe('zh-CN');
    expect(resolveLocale('zh_CN')).toBe('zh-CN');
    expect(resolveLocale('zh-TW')).toBe('zh-TW');
    expect(resolveLocale('zh_TW')).toBe('zh-TW');
  });

  it('maps region variants to their base language', () => {
    expect(resolveLocale('fr-CA')).toBe('fr');
    expect(resolveLocale('es-MX')).toBe('es');
    expect(resolveLocale('ar-EG')).toBe('ar');
    expect(resolveLocale('de-DE')).toBe('de');
    expect(resolveLocale('ja-JP')).toBe('ja');
    expect(resolveLocale('en-GB')).toBe('en');
  });

  it('maps bare pt to pt-BR and bare zh to zh-CN', () => {
    expect(resolveLocale('pt')).toBe('pt-BR');
    expect(resolveLocale('zh')).toBe('zh-CN');
  });

  it('falls back to en for unknown languages and garbage', () => {
    expect(resolveLocale('xx')).toBe('en');
    expect(resolveLocale('zz-ZZ')).toBe('en');
    expect(resolveLocale('!@#$')).toBe('en');
    expect(resolveLocale('klingon')).toBe('en');
  });
});

describe('normalizeLocale', () => {
  it('lowercases and converts underscores to hyphens', () => {
    expect(normalizeLocale('PT-BR')).toBe('pt-BR');
    expect(normalizeLocale('pt_br')).toBe('pt-BR');
    expect(normalizeLocale('EN-us')).toBe('en-us');
  });
});

describe('parseAcceptLanguage — RFC 9110 header parsing (TASK-455)', () => {
  it('parses segments in header order with q defaulting to 1', () => {
    expect(parseAcceptLanguage('fr-CA, en;q=0.9, de;q=0.8')).toEqual([
      { tag: 'fr-CA', q: 1 },
      { tag: 'en', q: 0.9 },
      { tag: 'de', q: 0.8 },
    ]);
  });

  it('handles whitespace, wildcards, extra params, and malformed q-values', () => {
    expect(parseAcceptLanguage(' de;q=0.9 ;foo=bar , *;q=0.5 , it ; q=abc ')).toEqual([
      { tag: 'de', q: 0.9 },
      { tag: '*', q: 0.5 },
      { tag: 'it', q: 0 },
    ]);
  });

  it('drops empty segments and empty tags', () => {
    expect(parseAcceptLanguage('en, , ;q=0.5, fr')).toEqual([
      { tag: 'en', q: 1 },
      { tag: 'fr', q: 1 },
    ]);
  });

  it('returns an empty list for an empty header', () => {
    expect(parseAcceptLanguage('')).toEqual([]);
    expect(parseAcceptLanguage('   ')).toEqual([]);
  });
});

describe('resolveAcceptLanguage — Accept-Language → supported locale (TASK-455)', () => {
  it('returns en for empty / null / undefined headers', () => {
    expect(resolveAcceptLanguage(undefined)).toBe('en');
    expect(resolveAcceptLanguage(null)).toBe('en');
    expect(resolveAcceptLanguage('')).toBe('en');
  });

  it('honors q-values: higher weight wins over header position', () => {
    expect(resolveAcceptLanguage('fr-CA;q=0.5, en;q=0.9')).toBe('en');
    expect(resolveAcceptLanguage('en;q=0.5, de;q=0.9')).toBe('de');
  });

  it('resolves a full multi-tag browser header to the best supported locale', () => {
    expect(resolveAcceptLanguage('vi-VN, vi;q=0.9, en-US, en;q=0.8, de;q=0.5')).toBe('vi');
    expect(resolveAcceptLanguage('pt-BR, pt;q=0.9, en-US, en;q=0.8')).toBe('pt-BR');
  });

  it('applies region-variant fallback (pt → pt-BR, zh → zh-CN)', () => {
    expect(resolveAcceptLanguage('pt;q=0.9, en;q=0.8')).toBe('pt-BR');
    expect(resolveAcceptLanguage('zh;q=0.9, en;q=0.8')).toBe('zh-CN');
  });

  it('skips unsupported tags and picks the next supported candidate', () => {
    expect(resolveAcceptLanguage('xx;q=0.9, de;q=0.5')).toBe('de');
  });

  it('treats q=0 entries as unacceptable and skips them', () => {
    expect(resolveAcceptLanguage('fr;q=0, de;q=0.5')).toBe('de');
    expect(resolveAcceptLanguage('fr;q=0, de;q=0')).toBe('en');
  });

  it('ignores wildcard * entries', () => {
    expect(resolveAcceptLanguage('*;q=0.9')).toBe('en');
    expect(resolveAcceptLanguage('*;q=0.5, ja;q=0.9')).toBe('ja');
  });

  it('keeps header order for equal q-values (stable sort)', () => {
    expect(resolveAcceptLanguage('es, fr')).toBe('es');
    expect(resolveAcceptLanguage('fr, es')).toBe('fr');
  });

  it('returns en when no candidate matches a supported locale', () => {
    expect(resolveAcceptLanguage('xx;q=0.5, yy;q=0.3')).toBe('en');
  });
});

describe('getDir — RTL contract (arch-i18n §8.1)', () => {
  it('returns rtl for ar and fa only', () => {
    expect(getDir('ar')).toBe('rtl');
    expect(getDir('fa')).toBe('rtl');
  });

  it('returns ltr for every other locale', () => {
    for (const locale of SUPPORTED_LOCALES) {
      if (locale === 'ar' || locale === 'fa') {
        continue;
      }
      expect(getDir(locale)).toBe('ltr');
    }
  });

  it('defaults to ltr for unknown input', () => {
    expect(getDir('xx' as Locale)).toBe('ltr');
    expect(getDir('')).toBe('ltr');
  });

  it('agrees with the dir metadata in every locale JSON', () => {
    // Guard: the static DIR_MAP must not drift from the locale files.
    const dirs: Record<string, 'ltr' | 'rtl'> = {
      en: 'ltr',
      es: 'ltr',
      'pt-BR': 'ltr',
      fr: 'ltr',
      de: 'ltr',
      ru: 'ltr',
      ja: 'ltr',
      ko: 'ltr',
      'zh-CN': 'ltr',
      'zh-TW': 'ltr',
      ar: 'rtl',
      hi: 'ltr',
      id: 'ltr',
      tr: 'ltr',
      it: 'ltr',
      pl: 'ltr',
      nl: 'ltr',
      vi: 'ltr',
      th: 'ltr',
      uk: 'ltr',
      fa: 'rtl',
    };
    expect(SUPPORTED_LOCALES).toHaveLength(21);
    for (const locale of SUPPORTED_LOCALES) {
      expect(getDir(locale)).toBe(dirs[locale]);
    }
  });
});

describe('DEFAULT_LOCALE', () => {
  it('is en', () => {
    expect(DEFAULT_LOCALE).toBe('en');
  });
});
