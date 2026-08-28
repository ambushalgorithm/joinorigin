# Test Report — Sprint 24 Wave-5 Validation Gate (TASK-583)

_Validation phase output. Filled by the e2e-origin-languages role._

## Current State

Sprint 24 Wave-5 (non-EN Origin entity reframe — ALL committed non-EN content, 346 files × 20
locales, using the untranslated English brand word "Origin" inside each translated sentence)
final validation gate (e2e-origin-languages, TASK-583, branch `feat/e2e-origin-languages` —
test-only changes):
**web unit 110 suites / 1355 tests ALL PASS; monorepo unit 5/5 packages PASS; typecheck 5/5 PASS;
lint 5/5 PASS; lint-fix.sh clean (3 auto-fixed, 0 non-fixable); e2e vs prod `next start` (:3100)
428/428 Wave-5-attributable PASS (the only hard failure + its serial-file tail are the documented
pre-existing TASK-572 git-level merge-lag items, verified green against the claimed-merged state;
1 documented scene-orbit flake passes on retry); SEO live sweep (SEO_LIVE_SWEEP=1) 49/49 PASS
(8 exhaustive chunks — every advertised /sitemap.xml URL, 928 entries across all 21 locales,
resolves 200; zero /community URLs; guide URLs carry the Origin slugs; location URLs
Origins-correct; full 21-locale hreflang on EN canonicals + per-locale hreflang on every
non-EN guide/city surface).** E2ECoverageComplete: yes. Recorded 2026-08-28.

**Validation target state:** the Wave-5 reframe as PM-approved — every committed non-EN surface
(guides 12×20, city/country/region per locale) reframed to the Origin entity: guide hub
"Origin Building Guides" (localized), guide titles "…Origin…" (de "So startest du ein Origin",
es "Cómo crear un Origin", ja "Originの始め方"), city H1/title "Origins in X" (de "Origins in
Berlin", es "Origins en Madrid", ja "東京のOrigin"), country FAQ "How do I find Origins in X?"
(localized); "community" survives ONLY where it means the people gathered (e.g. "Berlins
Startup-Community", community gardens) + product terms (Community OS / Community manager). All
four Wave-5 G0 content branches are merged on master: TASK-579 `f6b7cdb` (+auto-merge `ad315d2`),
TASK-580 `2a359a8` (+`e658bf6`), TASK-581 `6898dd9` (+`22fdd00`), TASK-582 `bc05b51`
(+`a7cda2a`). TASK-572 (`feat/content-origin-geo`, PR #5 per orchestrator status files) remains
unmerged at the git level — the same documented "git-level master auto-merge may lag
offline-origin sync" condition the Wave-3/Wave-4 gates recorded. This gate was executed against
the PR state (plain master + Wave-5) per the sprint convention.

### Test changes (this gate — tests only)

- **NEW `tests/e2e/tests/origin-languages.spec.ts`** — the Wave-5 gate spec (82 tests):
  - Per-locale matrix across ALL 20 non-EN locales (es, fr, pt-BR, it, nl, de, pl, uk, ru, ja,
    ko, zh-CN, zh-TW, ar, hi, id, tr, fa, vi, th):
    1. Guide hub `/<locale>/guides` 200 + localized hub H1 (de "Anleitungen zum Origin-Aufbau",
       es "Guías de construcción de Origins", ja "Origin構築ガイド", ar "أدلة بناء Origins", …)
       - the start-an-origin hub card shows the localized retitle.
    2. Guide detail `/<locale>/guides/start-an-origin` 200 + H1 = the localized "…Origin…"
       retitle + `<title>` matches + per-locale hreflang (self + en + x-default → EN canonical).
    3. Committed city page 200 + H1 "Origins in X" localized (de "Origins in Berlin", es
       "Origins en Madrid", ja "東京のOrigin", ar "Origins في دبي", ko "서울의 Origin", …) +
       `<title>` carries Origin + per-locale hreflang.
    4. Committed country page 200 + visible FAQ "How do I find Origins in X?" localized (de
       "Wie finde ich Origins in Deutschland?", es "¿Cómo encuentro Origins en España?", ja
       "日本でOriginを見つけるには？", tr "Türkiye'de Origins nasıl bulurum?", …).
    5. NO visible entity leftovers on every scanned surface: the English entity patterns
       ("find a community", "Find or start a community", "start a community", "Communities in",
       "How do I find communities", "find communities in") PLUS each locale's replaced
       community-era phrase (e.g. es "Comunidades en", de "Communities in", ja "コミュニティの
       始め方", ko "커뮤니티 시작하는 방법", zh-CN "如何创建一个社区", zh-TW "如何建立一個社群",
       ar "كيف تبدأ مجتمعًا", hi/ru "How to Start a Community", id "Cara Memulai Komunitas",
       th "วิธีเริ่มต้นชุมชน", tr "Bir Topluluk Nasıl Başlatılır", fa "چگونه یک جامعه شروع
       کنیم", vi "Cách Bắt đầu một Cộng đồng", fr "Comment créer une communauté", it "Come
       avviare una community", nl "Hoe start je een community", pl "Jak założyć społeczność",
       uk "Як заснувати спільноту") are all absent from the visible body.
  - EN canonical surfaces: /en/guides/start-an-origin + /en/location/germany/berlin/berlin emit
    the FULL 21-locale hreflang cluster + x-default → EN canonical.
  - Sitemap contract: zero /community URLs advertised; zero community-era guide slugs
    (start-a-community / keep-a-community-active / hybrid-communities); every non-EN guide
    hub + start-an-origin detail advertised; the indexable committed per-locale city pages
    advertised (es madrid, fr paris, pt-BR rio, it milan, nl amsterdam, de berlin, pl warsaw,
    uk kyiv, ru moscow, hi bengaluru, id jakarta, tr istanbul).
- **2 existing e2e specs updated to the Wave-5 Origin phrasing** (stale Wave-4-era assertions
  that the Wave-5 content reframe changed — visible-chrome/metadata only):
  - `locale-routing.spec.ts`: de Berlin city description `/Finde oder gründe Communities in
Berlin/` → `/Finde oder gründe Origins in Berlin/`; de guide title `/^So startest du eine
Community/` → `/^So startest du ein Origin/`.
  - `location-pages.spec.ts`: es Colombia H1 "Comunidades en Colombia" → "Origins en Colombia";
    es FAQ "¿Cómo encuentro comunidades en Colombia?" → "¿Cómo encuentro Origins en Colombia?";
    de FAQ "Wie finde ich Communities in Deutschland?" → "Wie finde ich Origins in Deutschland?";
    es hub Colombia directory card "Comunidades en Colombia" → "Origins en Colombia".
- The `location-pages.spec.ts` italy/osaka FAQ expectations (Wave-3-written, Origin-phrased)
  were intentionally NOT downgraded to the residual text — they pin the claimed-merged TASK-572
  state (same convention as the Wave-3/Wave-4 gates).

## Gates

| Gate           | Command                                              | Result                                                                                      |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Web unit       | `jest` (@joinorigin/web)                             | **110 suites / 1355 tests PASS**                                                            |
| Monorepo unit  | `pnpm test`                                          | **5/5 packages PASS**                                                                       |
| Typecheck      | `pnpm typecheck`                                     | **5/5 packages PASS**                                                                       |
| Lint           | `pnpm lint` + `lint-fix.sh`                          | **5/5 packages PASS; lint-fix 3 auto-fixed, 0 non-fixable**                                 |
| E2E (prod)     | `playwright test` vs `next start` (:3100)            | **428/428 Wave-5-attributable PASS** (1 pre-existing TASK-572-lag failure documented below) |
| SEO live sweep | `SEO_LIVE_SWEEP=1 playwright test tests/seo.spec.ts` | **49/49 PASS** (8 exhaustive chunks, 928-URL sitemap)                                       |

## What was validated (Wave-5 non-EN Origin reframe)

**Guide hub + guide detail — all 20 non-EN locales:**

- `/<locale>/guides` resolves 200 and the single H1 is the localized "Origin Building Guides"
  hub title (de "Anleitungen zum Origin-Aufbau", es "Guías de construcción de Origins", fr
  "Guides de construction d'Origin", ja "Origin構築ガイド", ko "Origin 구축 가이드", zh-CN
  "Origin 建设指南", zh-TW "Origin 經營指南", ar "أدلة بناء Origins", hi "Origin निर्माण
  मार्गदर्शिकाएँ", …) — every locale carries the brand word. PASS.
- The start-an-origin card in the hub grid carries the localized retitle (guideHeading).
  PASS.
- `/<locale>/guides/start-an-origin` resolves 200 with the retitled H1 + `<title>`: de "So
  startest du ein Origin: …", es "Cómo crear un Origin: guía paso a paso", fr "Créer un Origin :
  guide pas à pas", pt-BR "Como Criar um Origin: …", it "Come creare un Origin: …", nl "Hoe
  start je een Origin: …", pl "Jak założyć Origin: …", uk "Як заснувати Origin: …", ru/hi
  "How to Start an Origin: …" (retitled English-authored), ja "Originの始め方：…", ko "Origin
  시작하는 방법: …", zh-CN "如何创建 Origin：分步指南", zh-TW "如何建立 Origin：逐步指南", ar
  "كيف تبدأ Origin: …", id "Cara Memulai Origin: …", tr "Bir Origin Nasıl Başlatılır: …", fa
  "چگونه یک Origin شروع کنیم: …", vi "Cách Bắt đầu một Origin: …", th "วิธีเริ่มต้น Origin: …".
  PASS.
- Per-locale hreflang on every guide detail surface: `hreflang=<locale>` self +
  `hreflang=en` + `hreflang=x-default` → EN canonical. PASS.

**Committed city pages — "Origins in X" H1/title (all 20 locales):**

- /es/location/spain/madrid/madrid → H1 "Origins en Madrid" + title "Origins en Madrid | JoinOrigin".
- /de/location/germany/berlin/berlin → H1 + title "Origins in Berlin | JoinOrigin".
- /ja/location/japan/tokyo/tokyo → H1 + title "東京のOrigin | JoinOrigin".
- /ko/location/south-korea/seoul/seoul → H1 + title "서울의 Origin | JoinOrigin".
- /zh-CN/location/china/shanghai/shanghai → H1 + title "上海的 Origin | JoinOrigin".
- /zh-TW/location/hong-kong/central-and-western/hong-kong → H1 "香港的 Origin" (committed
  pageTitles.city) + title carries "Origin".
- /ar/location/united-arab-emirates/dubai/dubai → H1 + title "Origins في دبي | JoinOrigin".
- /fa/location/iran/tehran/tehran → H1 + title "Origins در تهران | JoinOrigin".
- /vi/location/vietnam/ho-chi-minh-city-hcmc/ho-chi-minh-city → H1 + title "Origin tại TP. Hồ
  Chí Minh | JoinOrigin".
- /th/location/thailand/bangkok/bangkok → H1 + title "Origin ในกรุงเทพฯ | JoinOrigin".
- /hi/location/india/karnataka/bengaluru → H1 + title "Origins in Bengaluru | JoinOrigin".
- /id/location/indonesia/jakarta/jakarta → H1 + title "Origins di Jakarta | JoinOrigin".
- /tr/location/turkey/istanbul/istanbul → H1 "İstanbul'daki Origins" (committed pageTitles) +
  title "Istanbul şehrindeki Origins | JoinOrigin".
- /fr/location/france/ile-de-france/paris → H1 "Origins à Paris" + title carries "Origins à Paris".
- /pt-BR/location/brazil/rio-de-janeiro/rio-de-janeiro → H1 + title "Origins no Rio de Janeiro".
- /it/location/italy/lombardy/milan → H1 + title "Origins a Milano".
- /nl/location/the-netherlands/north-holland/amsterdam → H1 "Origins in Amsterdam" + title
  carries "Origins in Amsterdam".
- /pl/location/poland/mazovia/warsaw → H1 "Origins w Warszawie" + title carries "Origins".
- /uk/location/ukraine/kyiv-city/kyiv → H1 "Origins в Києві" + title carries "Origins".
- /ru/location/russia/moscow/moscow → H1 "Origins в Москве" (committed pageTitles) + title
  "Origins in Moscow | JoinOrigin".
- Per-locale hreflang (self + en + x-default) on every city surface. PASS.

**Committed country pages — FAQ "How do I find Origins in X?" (localized, all 20 locales):**

- de "Wie finde ich Origins in Deutschland?", es "¿Cómo encuentro Origins en España?", fr
  "Comment trouver des Origins en France ?", pt-BR "Como encontro Origins no Brasil?", it "Come
  trovo Origins in Italia?", nl "Hoe vind ik Origins in Nederland?", pl "Jak znaleźć Origins w
  Polsce?", uk "Як знайти Origins в Україні?", ru "Как найти Origins в России?", ja
  "日本でOriginを見つけるには？", ko "대한민국에서 Origin을 어떻게 찾나요?", zh-CN "如何在中国找到
  Origin？", zh-TW "如何在香港找到 Origin？", ar "كيف أجد Origins في مصر؟", hi "मैं भारत में
  Origins कैसे खोजूँ?", id "Bagaimana cara menemukan Origins di Indonesia?", tr "Türkiye'de
  Origins nasıl bulurum?", fa "چطور در ایران Origin ای پیدا کنم؟", vi "Làm thế nào để tìm
  Origin tại Việt Nam?", th "ค้นหา Origin ในประเทศไทยได้อย่างไร?". PASS.

**Zero entity leftovers (all scanned surfaces):**

- The English entity patterns + each locale's replaced community-era phrase are absent from the
  visible body of every guide hub / guide detail / city / country surface scanned (see Test
  changes). "Community" remains only in the people sense + product terms, per policy. PASS.

**EN canonical clusters + sitemap Origin contract:**

- /en/guides/start-an-origin + /en/location/germany/berlin/berlin emit the FULL 21-locale
  hreflang cluster (22 `rel="alternate" hrefLang` links) + x-default → EN canonical. PASS.
- Sitemap (928 URLs): zero /community URLs; zero community-era guide slugs; every non-EN guide
  hub + start-an-origin detail advertised; the indexable committed per-locale city pages
  advertised. PASS.

**SEO live sweep (SEO_LIVE_SWEEP=1):**

- Exhaustive live sweep: every advertised sitemap URL (928) resolves 200 across 8 deterministic
  chunks — zero orphans, zero 500s, no 404 regressions. PASS.
- Sitemap carries only Origin-slug guide URLs + zero /community; location URLs resolve
  Origins-correct metadata (the per-locale guide/city titles + hreflang clusters are asserted by
  origin-languages.spec.ts). PASS.

## Environment / dependency notes

- **TASK-572 git-level merge lag (pre-existing, NOT a Wave-5 regression):** the orchestrator's
  status files record PR #5 (feat/content-origin-geo — 38 EN country + 54 EN region content
  reframes) as merged, but git-level master lacks its commits (same condition documented in
  sprint-24-origin-location-validation.md + sprint-24-network-validation.md). Two Wave-3-written
  e2e assertions depend on that content: `location-pages.spec.ts` italy FAQ ("Can I start an
  Origin in an Italian city?") and osaka region FAQ ("Which Osaka districts have the most active
  Origins?"). On plain master the italy assertion fails (serial file → the osaka + following
  tests are skipped). Verified: with TASK-572 merged (clean merge, 6 trivial conflicts), the
  full `location-pages.spec.ts` passes. The EN country/region DESCRIPTION fields ("Find or start
  communities in X") also still show on plain master for the same reason. These assertions were
  intentionally NOT downgraded to the residual text — they pin the claimed-merged state.
  Recommend the orchestrator sync master with TASK-572.
- **scene-orbit flake (documented family):** the `/docs` orbit-group bbox/transform stability
  test flaked once under parallel load and passed on retry (repo convention: `retries: 1`
  backstop; tests are NOT disabled). Not Wave-5-attributable (no scene-orbit surface changed).
- **Per-locale city `<title>` vs committed H1 (design observation, not a failure):** for city
  content files without a top-level `title` field, the metadata `<title>` resolves through the
  registry template (localized "Origins in/em/w …" + ASCII dataset name — e.g. pl "Origins w
  Warsaw, Mazovia | JoinOrigin", uk "Origins у Kyiv, Kyiv City | JoinOrigin", nl "Origins in
  Amsterdam, North Holland | JoinOrigin", zh-TW hong-kong "Hong Kong、Central and Western的
  Origin | JoinOrigin", tr "Istanbul şehrindeki Origins | JoinOrigin") while the H1 resolves the
  committed `pageTitles.city` (pl "Origins w Warszawie", uk "Origins в Києві", nl "Origins in
  Amsterdam", zh-TW "香港的 Origin", tr "İstanbul'daki Origins"). Both layers carry the brand
  word; the committed H1 is the Wave-5 source of truth and is what the gate pins.
- **fr/city/montreal.ts (content observation for the content owner):** the Wave-5 reframe
  updated montreal's prose/FAQ ("Comment trouver un Origin à Montréal ?") but the file carries
  no `pageTitles.city` (nor top-level `title`), so the city H1 resolves the localized dataset
  name ("Montréal") without the "Origins" phrase. The page is indexable and the committed
  fr/paris surface (asserted by this gate) is fully Origin-framed; flagging montreal as a
  possible content follow-up (TASK-579 scope) — outside this gate's MUST-NOT-edit-production
  boundary.
- The full e2e run reports 428 passed / 1 failed (the pre-existing italy TASK-572-lag item) /
  1 flaky (documented scene-orbit, passes on retry) / 22 did-not-run (serial-file tail after the
  italy failure). All 82 origin-languages.spec.ts tests pass in isolation AND within the full
  suite.

## Claims

- `app/tests/e2e/tests/origin-languages.spec.ts` (new), `locale-routing.spec.ts`,
  `location-pages.spec.ts`.
