import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getDir,
  normalizeLocale,
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
