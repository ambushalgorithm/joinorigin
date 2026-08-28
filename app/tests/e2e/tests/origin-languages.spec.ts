import { expect, test } from '@playwright/test';

/**
 * Sprint 24 Wave-5 — non-EN Origin entity reframe validation gate (TASK-583).
 *
 * Runs against the production build (`next start`) and verifies the Wave-5
 * PM-approved reframe — the untranslated English brand word "Origin" inside
 * each translated sentence of ALL committed non-EN content (guides +
 * city/country/region, 20 locales) — renders on the required surfaces:
 *
 *  1. Guide hub `/<locale>/guides` — localized "Origin Building Guides" H1
 *     (e.g. de "Anleitungen zum Origin-Aufbau", es "Guías de construcción
 *     de Origins", ja "Origin構築ガイド");
 *  2. Guide detail `/<locale>/guides/start-an-origin` — retitled "…Origin…"
 *     (de "So startest du ein Origin", es "Cómo crear un Origin", ja
 *     "Originの始め方") + per-locale hreflang (self + en + x-default → EN);
 *  3. Committed city page — H1/title "Origins in X" localized (de "Origins
 *     in Berlin", es "Origins en Madrid", ja "東京のOrigin");
 *  4. Committed country page — the FAQ asks "How do I find Origins in X?"
 *     localized (de "Wie finde ich Origins in Deutschland?", ja
 *     "日本でOriginを見つけるには？");
 *  5. NO visible "find a community" / "Communities in X" / "How do I find
 *     communities in X?" entity leftovers on the committed surfaces (the
 *     Wave-5 policy keeps "community" only where it means the PEOPLE — e.g.
 *     "Berlins Startup-Community", community gardens — plus product terms
 *     Community OS / Community manager);
 *  6. EN canonical guide + city pages keep the FULL 21-locale hreflang
 *     cluster, and the sitemap advertises zero /community URLs + only the
 *     Origin guide slugs.
 *
 * The exhaustive advertised-URL sweep (every /sitemap.xml URL resolves 200)
 * lives in seo.spec.ts (`SEO_LIVE_SWEEP=1`, all 8 chunks). This spec pins
 * the visible-copy + per-locale SEO contracts. Serial mode keeps the shared
 * prod server stable (repo convention for multi-page specs).
 */
test.describe.configure({ mode: 'serial' });

/** The 20 non-EN locales with committed Wave-5 content (en is the source). */
const SUPPORTED_LOCALES = [
  'en',
  'es',
  'pt-BR',
  'fr',
  'de',
  'ru',
  'ja',
  'ko',
  'zh-CN',
  'zh-TW',
  'ar',
  'hi',
  'id',
  'tr',
  'it',
  'pl',
  'nl',
  'vi',
  'th',
  'uk',
  'fa',
] as const;

interface LocaleSurface {
  locale: string;
  /** Localized guides-hub H1 (seoContent.guides.hubTitle ×20). */
  hubTitle: string;
  /** start-an-origin guide detail H1 (title without the `| JoinOrigin` suffix). */
  guideH1: string;
  /** A committed per-locale city page (country/region/city segments). */
  cityPath: string;
  /** The committed city H1 — the localized "Origins in X" phrase. */
  cityH1: string;
  /** Fragment guaranteed present in the city page <title> (registry title). */
  cityTitleFrag: string;
  /** A committed per-locale country page. */
  countryPath: string;
  /** Distinctive fragment of the localized "find Origins in X?" FAQ question. */
  countryFaqFrag: string;
  /** Old entity-phrase patterns replaced by Wave 5 — must be absent. */
  localizedLeftovers: string[];
}

/** The Wave-5 matrix — ground truth from the committed content + live server. */
const SURFACES: LocaleSurface[] = [
  {
    locale: 'es',
    hubTitle: 'Guías de construcción de Origins',
    guideH1: 'Cómo crear un Origin: guía paso a paso',
    cityPath: '/es/location/spain/madrid/madrid',
    cityH1: 'Origins en Madrid',
    cityTitleFrag: 'Origins en Madrid',
    countryPath: '/es/location/spain',
    countryFaqFrag: 'Cómo encuentro Origins en España',
    localizedLeftovers: ['Comunidades en'],
  },
  {
    locale: 'fr',
    hubTitle: "Guides de construction d'Origin",
    guideH1: 'Créer un Origin : guide pas à pas',
    cityPath: '/fr/location/france/ile-de-france/paris',
    cityH1: 'Origins à Paris',
    cityTitleFrag: 'Origins à Paris',
    countryPath: '/fr/location/france',
    countryFaqFrag: 'Comment trouver des Origins en France',
    localizedLeftovers: ['Comment créer une communauté'],
  },
  {
    locale: 'pt-BR',
    hubTitle: 'Guias de construção de Origins',
    guideH1: 'Como Criar um Origin: Um Guia Passo a Passo',
    cityPath: '/pt-BR/location/brazil/rio-de-janeiro/rio-de-janeiro',
    cityH1: 'Origins no Rio de Janeiro',
    cityTitleFrag: 'Origins no Rio de Janeiro',
    countryPath: '/pt-BR/location/brazil',
    countryFaqFrag: 'Como encontro Origins no Brasil',
    localizedLeftovers: ['Comunidades em'],
  },
  {
    locale: 'it',
    hubTitle: 'Guide per costruire Origins',
    guideH1: 'Come creare un Origin: una guida passo dopo passo',
    cityPath: '/it/location/italy/lombardy/milan',
    cityH1: 'Origins a Milano',
    cityTitleFrag: 'Origins a Milano',
    countryPath: '/it/location/italy',
    countryFaqFrag: 'Come trovo Origins in Italia',
    localizedLeftovers: ['Come avviare una community'],
  },
  {
    locale: 'nl',
    hubTitle: 'Handleidingen voor het opbouwen van Origins',
    guideH1: 'Hoe start je een Origin: een stapsgewijze handleiding',
    cityPath: '/nl/location/the-netherlands/north-holland/amsterdam',
    cityH1: 'Origins in Amsterdam',
    cityTitleFrag: 'Origins in Amsterdam',
    countryPath: '/nl/location/the-netherlands',
    countryFaqFrag: 'Hoe vind ik Origins in Nederland',
    localizedLeftovers: ['Hoe start je een community'],
  },
  {
    locale: 'de',
    hubTitle: 'Anleitungen zum Origin-Aufbau',
    guideH1: 'So startest du ein Origin: Eine Schritt-für-Schritt-Anleitung',
    cityPath: '/de/location/germany/berlin/berlin',
    cityH1: 'Origins in Berlin',
    cityTitleFrag: 'Origins in Berlin',
    countryPath: '/de/location/germany',
    countryFaqFrag: 'Wie finde ich Origins in Deutschland',
    localizedLeftovers: ['Communities in'],
  },
  {
    locale: 'pl',
    hubTitle: 'Przewodniki budowania Origins',
    guideH1: 'Jak założyć Origin: poradnik krok po kroku',
    cityPath: '/pl/location/poland/mazovia/warsaw',
    cityH1: 'Origins w Warszawie',
    cityTitleFrag: 'Origins w Warsaw',
    countryPath: '/pl/location/poland',
    countryFaqFrag: 'Jak znaleźć Origins w Polsce',
    localizedLeftovers: ['Jak założyć społeczność'],
  },
  {
    locale: 'uk',
    hubTitle: 'Гайди з побудови Origins',
    guideH1: 'Як заснувати Origin: покроковий гайд',
    cityPath: '/uk/location/ukraine/kyiv-city/kyiv',
    cityH1: 'Origins в Києві',
    cityTitleFrag: 'Origins',
    countryPath: '/uk/location/ukraine',
    countryFaqFrag: 'Як знайти Origins в Україні',
    localizedLeftovers: ['Як заснувати спільноту'],
  },
  {
    locale: 'ru',
    hubTitle: 'Гайды по построению Origins',
    guideH1: 'How to Start an Origin: A Step-by-Step Guide',
    cityPath: '/ru/location/russia/moscow/moscow',
    cityH1: 'Origins в Москве',
    cityTitleFrag: 'Origins in Moscow',
    countryPath: '/ru/location/russia',
    countryFaqFrag: 'Как найти Origins в России',
    localizedLeftovers: ['How to Start a Community'],
  },
  {
    locale: 'ja',
    hubTitle: 'Origin構築ガイド',
    guideH1: 'Originの始め方：ステップバイステップガイド',
    cityPath: '/ja/location/japan/tokyo/tokyo',
    cityH1: '東京のOrigin',
    cityTitleFrag: '東京のOrigin',
    countryPath: '/ja/location/japan',
    countryFaqFrag: '日本でOriginを見つけるには',
    localizedLeftovers: ['コミュニティの始め方'],
  },
  {
    locale: 'ko',
    hubTitle: 'Origin 구축 가이드',
    guideH1: 'Origin 시작하는 방법: 단계별 가이드',
    cityPath: '/ko/location/south-korea/seoul/seoul',
    cityH1: '서울의 Origin',
    cityTitleFrag: '서울의 Origin',
    countryPath: '/ko/location/south-korea',
    countryFaqFrag: 'Origin을 어떻게 찾나요',
    localizedLeftovers: ['커뮤니티 시작하는 방법'],
  },
  {
    locale: 'zh-CN',
    hubTitle: 'Origin 建设指南',
    guideH1: '如何创建 Origin：分步指南',
    cityPath: '/zh-CN/location/china/shanghai/shanghai',
    cityH1: '上海的 Origin',
    cityTitleFrag: '上海的 Origin',
    countryPath: '/zh-CN/location/china',
    countryFaqFrag: '如何在中国找到 Origin',
    localizedLeftovers: ['如何创建一个社区'],
  },
  {
    locale: 'zh-TW',
    hubTitle: 'Origin 經營指南',
    guideH1: '如何建立 Origin：逐步指南',
    cityPath: '/zh-TW/location/hong-kong/central-and-western/hong-kong',
    cityH1: '香港的 Origin',
    cityTitleFrag: 'Origin',
    countryPath: '/zh-TW/location/hong-kong',
    countryFaqFrag: '如何在香港找到 Origin',
    localizedLeftovers: ['如何建立一個社群'],
  },
  {
    locale: 'ar',
    hubTitle: 'أدلة بناء Origins',
    guideH1: 'كيف تبدأ Origin: دليل خطوة بخطوة',
    cityPath: '/ar/location/united-arab-emirates/dubai/dubai',
    cityH1: 'Origins في دبي',
    cityTitleFrag: 'Origins في دبي',
    countryPath: '/ar/location/egypt',
    countryFaqFrag: 'أجد Origins في مصر',
    localizedLeftovers: ['كيف تبدأ مجتمعًا'],
  },
  {
    locale: 'hi',
    hubTitle: 'Origin निर्माण मार्गदर्शिकाएँ',
    guideH1: 'How to Start an Origin: A Step-by-Step Guide',
    cityPath: '/hi/location/india/karnataka/bengaluru',
    cityH1: 'Origins in Bengaluru',
    cityTitleFrag: 'Origins in Bengaluru',
    countryPath: '/hi/location/india',
    countryFaqFrag: 'Origins कैसे खोजूँ',
    localizedLeftovers: ['How to Start a Community'],
  },
  {
    locale: 'id',
    hubTitle: 'Panduan Membangun Origins',
    guideH1: 'Cara Memulai Origin: Panduan Langkah demi Langkah',
    cityPath: '/id/location/indonesia/jakarta/jakarta',
    cityH1: 'Origins di Jakarta',
    cityTitleFrag: 'Origins di Jakarta',
    countryPath: '/id/location/indonesia',
    countryFaqFrag: 'menemukan Origins di Indonesia',
    localizedLeftovers: ['Cara Memulai Komunitas'],
  },
  {
    locale: 'tr',
    hubTitle: 'Origins Kurma Rehberleri',
    guideH1: 'Bir Origin Nasıl Başlatılır: Adım Adım Rehber',
    cityPath: '/tr/location/turkey/istanbul/istanbul',
    cityH1: "İstanbul'daki Origins",
    cityTitleFrag: 'Istanbul şehrindeki Origins',
    countryPath: '/tr/location/turkey',
    countryFaqFrag: 'Origins nasıl bulurum',
    localizedLeftovers: ['Bir Topluluk Nasıl Başlatılır'],
  },
  {
    locale: 'fa',
    hubTitle: 'راهنماهای ساخت Origins',
    guideH1: 'چگونه یک Origin شروع کنیم: راهنمای گام‌به‌گام',
    cityPath: '/fa/location/iran/tehran/tehran',
    cityH1: 'Origins در تهران',
    cityTitleFrag: 'Origins در تهران',
    countryPath: '/fa/location/iran',
    countryFaqFrag: 'Origin ای پیدا',
    localizedLeftovers: ['چگونه یک جامعه شروع کنیم'],
  },
  {
    locale: 'vi',
    hubTitle: 'Hướng dẫn xây dựng Origins',
    guideH1: 'Cách Bắt đầu một Origin: Hướng dẫn Từng bước',
    cityPath: '/vi/location/vietnam/ho-chi-minh-city-hcmc/ho-chi-minh-city',
    cityH1: 'Origin tại TP. Hồ Chí Minh',
    cityTitleFrag: 'Origin tại TP. Hồ Chí Minh',
    countryPath: '/vi/location/vietnam',
    countryFaqFrag: 'tìm Origin tại Việt Nam',
    localizedLeftovers: ['Cách Bắt đầu một Cộng đồng'],
  },
  {
    locale: 'th',
    hubTitle: 'คู่มือการสร้าง Origins',
    guideH1: 'วิธีเริ่มต้น Origin: คู่มือทีละขั้นตอน',
    cityPath: '/th/location/thailand/bangkok/bangkok',
    cityH1: 'Origin ในกรุงเทพฯ',
    cityTitleFrag: 'Origin ในกรุงเทพฯ',
    countryPath: '/th/location/thailand',
    countryFaqFrag: 'Origin ในประเทศไทยได้อย่างไร',
    localizedLeftovers: ['วิธีเริ่มต้นชุมชน'],
  },
];

/**
 * English entity-leftover patterns — the Wave-5 policy replaces the ENTITY
 * sense ("find/start a community", "Communities in X", "How do I find
 * communities in X?") everywhere; "community" survives ONLY for the people
 * gathered + product terms. These exact strings are absent from every
 * committed non-EN surface (verified at content level — zero matches in
 * `lib/seo/content` outside `en/`).
 */
const ENTITY_LEFTOVERS = [
  'find a community',
  'Find or start a community',
  'start a community',
  'Communities in',
  'How do I find communities',
  'find communities in',
];

test.describe('Wave-5 non-EN Origin reframe — all 20 locales (TASK-583)', () => {
  for (const s of SURFACES) {
    test.describe(`${s.locale} — guide surfaces`, () => {
      test(`guide hub renders the localized Origin hub H1 + grid card retitle`, async ({
        page,
      }) => {
        const response = await page.goto(`/${s.locale}/guides`);
        expect(response?.status()).toBe(200);

        // Localized hub title (seoContent.guides.hubTitle) carries Origin.
        await expect(page.locator('h1')).toContainText(s.hubTitle);

        // The start-an-origin card in the hub grid carries the localized
        // retitle (guideHeading — title without the brand suffix).
        const grid = page.getByTestId('guides-hub-grid');
        await expect(grid.getByRole('link', { name: s.guideH1 })).toBeVisible();
      });

      test(`start-an-origin guide renders the Origin retitle + per-locale hreflang + no leftovers`, async ({
        page,
      }) => {
        const response = await page.goto(`/${s.locale}/guides/start-an-origin`);
        expect(response?.status()).toBe(200);

        // H1 = the localized "…Origin…" retitle; <title> keeps the brand suffix.
        await expect(page.locator('h1')).toContainText(s.guideH1);
        await expect(page).toHaveTitle(
          new RegExp(s.guideH1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        );
        // Per-locale surface: self + en + x-default → EN canonical.
        await expect(page.locator(`link[rel="alternate"][hreflang="${s.locale}"]`)).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);

        // No community-entity leftovers on the hub + detail surfaces.
        await expectNoEntityLeftovers(page, s);
      });
    });

    test.describe(`${s.locale} — committed city + country`, () => {
      test(`city page renders the "Origins in X" H1/title + per-locale hreflang`, async ({
        page,
      }) => {
        const response = await page.goto(s.cityPath);
        expect(response?.status()).toBe(200);

        await expect(page.locator('h1')).toContainText(s.cityH1);
        await expect(page).toHaveTitle(new RegExp(s.cityTitleFrag));
        await expect(page.locator(`link[rel="alternate"][hreflang="${s.locale}"]`)).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);

        await expectNoEntityLeftovers(page, s);
      });

      test(`country page FAQ asks how to find Origins (localized) + no leftovers`, async ({
        page,
      }) => {
        const response = await page.goto(s.countryPath);
        expect(response?.status()).toBe(200);

        const faq = page.getByTestId('location-faq');
        await expect(faq).toBeVisible();
        await expect(faq.getByText(s.countryFaqFrag, { exact: false })).toBeVisible();

        await expectNoEntityLeftovers(page, s);
      });
    });
  }
});

/** Asserts the entity-leftover patterns are absent from the visible body. */
async function expectNoEntityLeftovers(
  page: import('@playwright/test').Page,
  s: LocaleSurface,
): Promise<void> {
  const body = page.locator('body');
  for (const pattern of [...ENTITY_LEFTOVERS, ...s.localizedLeftovers]) {
    await expect(
      body.getByText(pattern, { exact: false }),
      `[${s.locale}] entity leftover "${pattern}" on ${page.url()}`,
    ).toHaveCount(0);
  }
}

test.describe('EN canonical clusters + sitemap Origin contract (TASK-583)', () => {
  test('EN guide + city pages emit the full 21-locale hreflang cluster + x-default', async ({
    page,
  }) => {
    for (const path of ['/en/guides/start-an-origin', '/en/location/germany/berlin/berlin']) {
      await page.goto(path);
      for (const locale of SUPPORTED_LOCALES) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${locale}"]`),
          `${locale} hreflang on ${path}`,
        ).toHaveCount(1);
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
    }
  });

  test('sitemap advertises zero /community URLs + only Origin guide slugs', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xmlText = await response.text();
    const paths = [...xmlText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

    // Zero /community URLs anywhere in the advertised set.
    expect(paths.filter((p) => p.includes('/community'))).toEqual([]);

    // Guide URLs carry the Wave-3 Origin slugs — never the community-era
    // slugs (which now 301/308-redirect via next.config).
    for (const oldSlug of ['start-a-community', 'keep-a-community-active', 'hybrid-communities']) {
      expect(paths.filter((p) => p.includes(`/guides/${oldSlug}`))).toEqual([]);
    }

    // Every non-EN guide surface advertises the Origin-retitled guide.
    for (const s of SURFACES) {
      expect(paths, `guide detail advertised for ${s.locale}`).toContain(
        `/${s.locale}/guides/start-an-origin`,
      );
      expect(paths, `guide hub advertised for ${s.locale}`).toContain(`/${s.locale}/guides`);
    }

    // The indexable committed per-locale city pages (G1–G5 pass, tier ≤ 2)
    // are advertised with the Origin title. The non-Latin-script surfaces
    // (ja/ko/zh-CN/zh-TW/ar/fa/vi/th) and a few Latin-script cities are
    // documented as gate-excluded (G4 intent phrase requires the ASCII city
    // name in title/meta, which the localized-script Origin titles omit) —
    // those pages still resolve 200 with the Origin H1, asserted directly in
    // the per-locale city test (and the SEO live sweep re-verifies every
    // ADVERTISED URL resolves).
    const advertisedCityLocales = [
      'es',
      'fr',
      'pt-BR',
      'it',
      'nl',
      'de',
      'pl',
      'uk',
      'ru',
      'hi',
      'id',
      'tr',
    ];
    for (const s of SURFACES.filter((surface) => advertisedCityLocales.includes(surface.locale))) {
      expect(paths, `city page advertised for ${s.locale}`).toContain(s.cityPath);
    }
  });
});
