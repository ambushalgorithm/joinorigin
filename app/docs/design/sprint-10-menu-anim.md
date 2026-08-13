# Sprint 10 Follow-up — JoinOrigin Brand Color Palette (Site-wide) + GSAP Animation Blueprint

- **Spec**: `app/docs/design/sprint-10-menu-anim.md`
- **Role**: design-menu-anim (TASK-284)
- **Consumes**: Sprint 10 merged master (`6ae2f9e` + `33fe9ff`), handoff `agent-core/handoffs/joinorigin-dev/tasks.md` Sprint 10 Follow-up section, TASK-283 test-report (16/16 PASS, live scene-rotation gap routed)
- **Consumer**: fe-gsap-menu-anim (TASK-285) — implement VERBATIM
- **Validator**: e2e-menu-anim-validation (TASK-286)
- **Status**: Design spec only — zero implementation files edited by this role

---

## 1. Scope & Goals

User-reported defects after the Sprint 10 menu redesign merged:

1. **Icon-spin mismatch (TASK-283 gap, live)**: MenuHero scene icons do not spin. The wrapper
   background ring spins (CSS on the page) but the little icons inside the scene stay stagnant
   (or vice-versa) on `/features /community /docs /about`. Root cause: the float/orbit animation
   lives as CSS inside the SVG files, loaded via `<img>` — an SVG loaded through `<img>` is a
   **sandboxed document** the page cannot reach. The page CSS animates only the wrapper ring;
   the SVG-internal `[data-scene="orbit"]` spin works only if the browser applies the SVG's
   embedded `<style>`, which is fragile and often silently ignored.
2. **Boring dark base**: the current `#0F1115` + 0.10–0.22 alpha-tint palette is monochrome.
   The user wants an actual **brand identity palette**, vibrant and colorful — bold gradient
   meshes, colorful surfaces, per-page identity — applied **site-wide** (home, header, footer,
   waitlist modal, OrbitViz, all 7 menu pages + 404).
3. **No animation library**: GSAP is not installed. The user expects GSAP showcase-level polish.
   User decision: add `gsap` + `@gsap/react` (free core + ScrollTrigger, **no paid plugins**).

This spec delivers the two artifacts the FE consumes verbatim:

- **A. The NEW JoinOrigin brand color palette** — a complete token system (global tokens in
  `@joinorigin/design`, per-page schemes in `menuTokens.ts`, landing mesh tokens in
  `landingTokens.ts`) with hex values, gradient meshes, semantic roles, and the exact
  site-wide mapping.
- **B. The GSAP animation blueprint** — inline the 8 scene SVGs into the DOM as React
  components so GSAP drives orbit-group rotation/float + background ring in **one document**
  (fixes the icon-spin mismatch), staggered hero entrances, ScrollTrigger reveals/parallax,
  and reduced-motion handling.

**Non-goals** (keep intact, do NOT regress):

- Single `<h1>` per page + semantic HTML landmarks (arch §5.1).
- Per-page SEO metadata + JSON-LD (BreadcrumbList / FAQPage / Organization / WebSite) +
  server-wrapper pattern.
- i18n locale values (all 21 locale JSONs untouched).
- `og-default.png` + logo raster assets (do not regenerate).
- Zero CDN (GSAP is an npm dependency; all imagery stays local).
- Money language never introduced.

---

## 2. Design Principles

1. **The palette IS the brand.** Color is not decoration — every surface, border, glow, and
   mesh derives from the token system. No raw hex in components (existing rule, now enforced
   harder: `packages/design/src/colors.ts` is the only place hex values live; web-local
   gradient strings live in `landingTokens.ts` / `menuTokens.ts`).
2. **Vibrant, not faint.** Meshes and glows run at 0.24–0.55 alpha (previously 0.10–0.22).
   Surfaces are clearly indigo-violet tinted (never grey). Page identity hues are saturated.
3. **One document, one clock.** All scene motion is GSAP-driven on inline SVG elements in the
   page DOM. No animation inside sandboxed `<img>` SVG documents.
4. **Progressive enhancement.** Content is never hidden by CSS alone. SSR + no-JS + reduced
   motion all render the final static state. GSAP only *animates toward* that state.
5. **Per-page identity, coherent whole.** Each page gets a primary/secondary hue and mesh, but
   they all belong to the same "Origin Spectrum" (indigo → violet → magenta → amber family)
   so the site reads as one brand.

---

## 3. NEW Brand Color Palette — "Origin Spectrum"

### 3.1 Brand story

JoinOrigin is a social collaboration network — the community OS. The identity is a
**spectrum**: electric indigo (the brand core), violet (about/origins), sky/azure
(docs/features), warm amber (community), teal (contact), green (privacy), steel indigo
(terms), rose (404 "lost signal"). The base canvas is a **deep cosmic indigo** (`#0A1022`),
not grey-black — every page surface carries the brand's blue-violet cast, and bold radial
gradient meshes layer the page hue over it.

### 3.2 Global token system — `packages/design/src/colors.ts`

Replace the current `colors` object with:

```ts
export const colors = {
  // Base canvases — brand-tinted deep indigo (replaces grey-black #0F1115 family)
  background: '#0A1022',        // page canvas (was #0F1115)
  backgroundAlt: '#0D1530',     // alternating canvas for plain section bands
  surface: '#141D3C',           // cards, panels, mobile menu, modal (was #181B21)
  surfaceElevated: '#1D2850',   // inputs, table headers, hover (was #22262E)
  surfaceOverlay: '#253261',    // strong hover/press, active mobile link
  border: '#2C3A6E',            // hairlines, card borders (was #2C313A)
  borderStrong: '#3E4F8F',      // strong borders, focus-companion hairlines

  // Brand core
  primary: '#5D7CFF',           // electric indigo (was #4F7DF9)
  primaryHover: '#4667F2',      // button/CTA hover
  primarySoft: '#9DB4FF',       // secondary gradient stop (was #8AB4FF)
  primaryContrast: '#FFFFFF',   // text on primary fills

  // Text
  text: '#F5F8FF',              // primary text (was #F5F7FA)
  textMuted: '#ACB6DC',         // secondary text (was #9AA3B2)
  textSubtle: '#7E89B0',        // tertiary text, placeholders

  // Feedback
  destructive: '#F2555A',       // errors (was #E5484D)
  destructiveSoft: '#FFE3E5',   // error surfaces/banners
  success: '#2FBF71',           // success (was #30A46C)
  successSoft: '#D9F7E6',       // success surfaces
  warning: '#F5A524',           // warning (unchanged)
  warningSoft: '#FFF0D0',       // warning surfaces
  info: '#38BDF8',              // info/accent cyan

  // Focus + overlay
  focusRing: '#7C9CFF',         // :focus-visible outline
  scrim: 'rgba(6, 10, 24, 0.72)', // modal backdrop (was rgba(15,17,21,0.72))

  // Gradient-mesh spectrum (brand identity stops — "Origin Spectrum")
  meshIndigo: '#5D7CFF',
  meshViolet: '#8B5CF6',
  meshMagenta: '#F472B6',
  meshRose: '#F43F5E',
  meshAmber: '#F5A524',
  meshCyan: '#38BDF8',
  meshTeal: '#2DD4BF',
  meshGreen: '#2FBF71',
} as const;
```

**Token mapping table (old → new):**

| Token | Old | New | Why |
|---|---|---|---|
| `background` | `#0F1115` | `#0A1022` | Deep cosmic indigo, brand-tinted |
| `surface` | `#181B21` | `#141D3C` | Indigo-tinted card surface |
| `surfaceElevated` | `#22262E` | `#1D2850` | Elevated indigo |
| `border` | `#2C313A` | `#2C3A6E` | Indigo-violet hairline |
| `primary` | `#4F7DF9` | `#5D7CFF` | Brighter electric indigo |
| `primarySoft` | `#8AB4FF` | `#9DB4FF` | Brighter secondary blue |
| `text` | `#F5F7FA` | `#F5F8FF` | Blue-tinted white |
| `textMuted` | `#9AA3B2` | `#ACB6DC` | Blue-tinted muted |
| `destructive` | `#E5484D` | `#F2555A` | Slightly brighter red |
| `success` | `#30A46C` | `#2FBF71` | Brighter green |
| `warning` | `#F5A524` | `#F5A524` | Unchanged |

**New tokens** (no old equivalent): `backgroundAlt`, `surfaceOverlay`, `borderStrong`,
`primaryHover`, `textSubtle`, `destructiveSoft`, `successSoft`, `warningSoft`, `info`,
`focusRing`, `scrim`, `meshIndigo/Violet/Magenta/Rose/Amber/Cyan/Teal/Green`.

> FE note: `packages/design/src/theme.test.ts` currently asserts
> `theme.colors.primary === '#4F7DF9'` and `theme.colors.background === '#0F1115'` — update
> to the new values and add new-token assertions (see §10 change table).

### 3.3 Per-page schemes — `apps/web/components/menuTokens.ts`

Replace the restrained `PAGE_ACCENTS` (single soft glow, "never a competing UI color") with a
full **`PAGE_SCHEMES`** system: every page owns a primary + secondary hue, a linear gradient,
a layered radial **glow mesh** (hero band), and a full-bleed **mesh** (section bands/body).
This is the "per-page identity" the user asked for.

```ts
export type PageAccentKey =
  | 'features' | 'community' | 'docs' | 'about'
  | 'contact' | 'privacy' | 'terms' | 'notFound';

export interface PageScheme {
  key: PageAccentKey;
  /** Display identity name (docs only). */
  identity: string;
  /** Page primary hue (hero CTAs, ticks, borders, scene accent). */
  primary: string;
  /** Page secondary hue (mesh counter-stop, scene accent alt). */
  secondary: string;
  /** Linear gradient built from primary → secondary (ticks, links, text-clip). */
  gradient: string;
  /** Layered radial mesh behind the hero scene (bolder than old glow). */
  glow: string;
  /** Full-bleed gradient mesh for section bands / body ambient. */
  mesh: string;
  /** Dominant accent inside the inline scene art. */
  sceneAccent: string;
  /** Secondary scene accent. */
  sceneAccentAlt?: string;
}

export const PAGE_SCHEMES: Record<PageAccentKey, PageScheme> = { /* table below */ };
```

| `key` | identity | `primary` | `secondary` | `gradient` |
|---|---|---|---|---|
| `features` | Blue | `#5D7CFF` | `#38BDF8` | `linear-gradient(135deg, #5D7CFF, #38BDF8)` |
| `community` | Amber | `#F5A524` | `#FF8A3D` | `linear-gradient(135deg, #F5A524, #FF8A3D)` |
| `docs` | Sky | `#4C9AFF` | `#7CC7FF` | `linear-gradient(135deg, #4C9AFF, #7CC7FF)` |
| `about` | Violet | `#8B5CF6` | `#C084FC` | `linear-gradient(135deg, #8B5CF6, #C084FC)` |
| `contact` | Teal | `#2DD4BF` | `#22D3EE` | `linear-gradient(135deg, #2DD4BF, #22D3EE)` |
| `privacy` | Green | `#30A46C` | `#4ADE80` | `linear-gradient(135deg, #30A46C, #4ADE80)` |
| `terms` | Indigo | `#60A5FA` | `#818CF8` | `linear-gradient(135deg, #60A5FA, #818CF8)` |
| `notFound` | Rose | `#F43F5E` | `#F472B6` | `linear-gradient(135deg, #F43F5E, #F472B6)` |

**`glow` strings** (layered radial mesh behind hero scene; applied as `::before` on the scene
wrapper, `pointer-events: none`):

| `key` | `glow` |
|---|---|
| `features` | `radial-gradient(560px at 78% 20%, rgba(93,124,255,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(56,189,248,0.32), transparent 70%)` |
| `community` | `radial-gradient(560px at 78% 20%, rgba(245,165,36,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(255,138,61,0.3), transparent 70%)` |
| `docs` | `radial-gradient(560px at 78% 20%, rgba(76,154,255,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(124,199,255,0.32), transparent 70%)` |
| `about` | `radial-gradient(560px at 78% 20%, rgba(139,92,246,0.5), transparent 70%), radial-gradient(460px at 18% 88%, rgba(192,132,252,0.32), transparent 70%)` |
| `contact` | `radial-gradient(560px at 78% 20%, rgba(45,212,191,0.45), transparent 70%), radial-gradient(460px at 18% 88%, rgba(34,211,238,0.3), transparent 70%)` |
| `privacy` | `radial-gradient(560px at 78% 20%, rgba(48,164,108,0.45), transparent 70%), radial-gradient(460px at 18% 88%, rgba(74,222,128,0.3), transparent 70%)` |
| `terms` | `radial-gradient(560px at 78% 20%, rgba(96,165,250,0.45), transparent 70%), radial-gradient(460px at 18% 88%, rgba(129,140,248,0.3), transparent 70%)` |
| `notFound` | `radial-gradient(480px at 50% 35%, rgba(244,63,94,0.5), transparent 70%), radial-gradient(420px at 72% 78%, rgba(244,114,182,0.3), transparent 70%)` |

**`mesh` strings** (full-bleed section-band / body ambient; applied as a real `meshLayer`
element, NOT a pseudo-element, so GSAP parallax can target it):

| `key` | `mesh` |
|---|---|
| `features` | `radial-gradient(720px at 85% 8%, rgba(93,124,255,0.28), transparent 65%), radial-gradient(640px at 8% 92%, rgba(56,189,248,0.18), transparent 65%)` |
| `community` | `radial-gradient(720px at 85% 8%, rgba(245,165,36,0.26), transparent 65%), radial-gradient(640px at 8% 92%, rgba(255,138,61,0.16), transparent 65%)` |
| `docs` | `radial-gradient(720px at 85% 8%, rgba(76,154,255,0.26), transparent 65%), radial-gradient(640px at 8% 92%, rgba(124,199,255,0.16), transparent 65%)` |
| `about` | `radial-gradient(720px at 85% 8%, rgba(139,92,246,0.28), transparent 65%), radial-gradient(640px at 8% 92%, rgba(192,132,252,0.18), transparent 65%)` |
| `contact` | `radial-gradient(720px at 85% 8%, rgba(45,212,191,0.24), transparent 65%), radial-gradient(640px at 8% 92%, rgba(34,211,238,0.16), transparent 65%)` |
| `privacy` | `radial-gradient(720px at 85% 8%, rgba(48,164,108,0.24), transparent 65%), radial-gradient(640px at 8% 92%, rgba(74,222,128,0.16), transparent 65%)` |
| `terms` | `radial-gradient(720px at 85% 8%, rgba(96,165,250,0.24), transparent 65%), radial-gradient(640px at 8% 92%, rgba(129,140,248,0.16), transparent 65%)` |
| `notFound` | `radial-gradient(560px at 50% 30%, rgba(244,63,94,0.26), transparent 65%), radial-gradient(480px at 75% 80%, rgba(244,114,182,0.16), transparent 65%)` |

**`sceneAccent` / `sceneAccentAlt`** = `primary` / `secondary` per page.

**Compatibility export** (kept so `PAGE_ACCENTS` consumers compile during the FE migration;
FE may delete after all references are migrated):

```ts
export const PAGE_ACCENTS: Record<PageAccentKey, PageAccent> = {
  features: { glow: PAGE_SCHEMES.features.glow, sceneAccent: PAGE_SCHEMES.features.primary,
              sceneAccentAlt: PAGE_SCHEMES.features.secondary },
  /* ... same derivation for all 8 keys ... */
};
```

**Band tokens** (updated):

| Token | Old | New |
|---|---|---|
| `SECTION_BAND_GLASS` | `rgba(24, 27, 33, 0.55)` | `rgba(20, 29, 60, 0.55)` |
| `SECTION_BAND_BORDER` | `rgba(44, 49, 58, 0.5)` | `rgba(44, 58, 110, 0.5)` |
| `SCENE_FLOAT` / `SCENE_ORBIT` | CSS duration strings | **DEPRECATED** — GSAP owns scene motion (§6.5); remove usages |

`MENU_AMBIENT_URL`, `MENU_GRID_URL`, `HERO_BAND_MIN_HEIGHT`, `CHIP_MARQUEE_DURATION`:
unchanged.

### 3.4 Landing mesh tokens — `apps/web/components/landingTokens.ts`

| Token | New value |
|---|---|
| `ACCENT_GRADIENT` | `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primarySoft} 100%)` → resolves `#5D7CFF → #9DB4FF` |
| `BRAND_MESH` (NEW) | `radial-gradient(900px at 82% 0%, rgba(139,92,246,0.32), transparent 60%), radial-gradient(760px at 8% 100%, rgba(56,189,248,0.22), transparent 60%), radial-gradient(640px at 55% 55%, rgba(93,124,255,0.16), transparent 70%)` |
| `ROTATING_BORDER_GRADIENT` | `conic-gradient(from var(--border-angle), ${colors.primary}, ${colors.background}, ${colors.primarySoft}, ${colors.background}, ${colors.primary})` |
| `ORBIT_BORDER_GRADIENT` | `linear-gradient(180deg, rgba(93,124,255,0) 0%, rgba(93,124,255,1) 43%, rgba(93,124,255,0) 100%)` |
| `ORBIT_GLOWS` | `orbit1: 'rgba(93,124,255,0.55)'`, `orbit2Yellow: 'rgba(245,165,36,0.55)'`, `orbit2Pink: 'rgba(244,114,182,0.55)'`, `orbit3Pink: 'rgba(244,114,182,0.55)'`, `orbit4Blue: 'rgba(93,124,255,0.55)'`, `orbit4Orange: 'rgba(245,165,36,0.55)'` |
| `HERO_RADIAL_GLOW_1` | `radial-gradient(600px at 78% 22%, rgba(93,124,255,0.45), transparent 70%)` |
| `HERO_RADIAL_GLOW_2` | `radial-gradient(520px at 10% 90%, rgba(139,92,246,0.32), transparent 70%)` |
| `HERO_VIGNETTE` | `linear-gradient(180deg, transparent, rgba(10,16,34,0.6))` |
| `HERO_BACKGROUND_URL` | unchanged (`url(/assets/hero/hero-background.webp)`) |
| `ENTRANCE_EASING` | unchanged (`cubic-bezier(0.22, 1, 0.36, 1)`) |

### 3.5 Semantic roles — usage matrix

| Token | Used by |
|---|---|
| `background` | `MenuPageShell` PageRoot, `home-view` PageRoot, `not-found` PageRoot, `layout` theme-color (`lib/seo/site.ts` `SITE.themeColor` → `#0A1022`), GlobalStyles `html/body` |
| `backgroundAlt` | `SectionBand variant="plain"` canvas (subtle `#0D1530` so plain bands are not dead-black) |
| `surface` | `Card`, `FaqCard`, `Quote`, `Stat`, `StatPill`, `CompareTable`, `MobilePanel`, `WaitlistModal` Card |
| `surfaceElevated` | `TableHeader`, modal `Input`, mobile link hover |
| `surfaceOverlay` | `Card:hover`, mobile active link |
| `border` | all borders/hairlines |
| `borderStrong` | table header bottom, focus-companion hairlines |
| `primary` / `primaryHover` | CTAs, links, focus, ticks |
| `primarySoft` | gradient secondary stop, scene art secondary |
| `text` / `textMuted` / `textSubtle` | headings / body / placeholders |
| `success` / `successSoft` | modal success icon + banner |
| `destructive` / `destructiveSoft` | form errors + error banner |
| `warning` / `warningSoft` | (reserved; community accent uses meshAmber) |
| `info` | (reserved; cyan) |
| `focusRing` | `:focus-visible` outlines |
| `scrim` | modal backdrop, header tint |
| `mesh*` | gradient meshes in `landingTokens` / `menuTokens` |

### 3.6 Accessibility & contrast

- Body text `#F5F8FF` on `background #0A1022`: ≈ 17:1 (AAA).
- Muted text `#ACB6DC` on `surface #141D3C`: ≈ 7.2:1 (AAA); on `background`: ≈ 8.9:1.
- `primary #5D7CFF` on `surface`: ≈ 4.6:1 (AA for large text + UI); CTA buttons use white
  text on the gradient (≥ 4.5:1 at the mid-stop).
- Meshes/glows are decorative layers under content (`z-index` layering unchanged) —
  they never sit behind body text at text-critical opacity.
- All contrast-sensitive pairs keep ≥ 4.5:1; validation (TASK-286) may re-verify with axe.

---

## 4. Site-wide Mapping (where the palette lands)

| Surface | Current | New (token) |
|---|---|---|
| Home `PageRoot` | `background #0F1115` + hero webp | `background` + `BRAND_MESH` layered over webp |
| Header sticky | `rgba(15,17,21,0.72)` + `border` | `scrim` + `border` (indigo tint) |
| Footer | `border` | `border` (auto-updates) |
| Waitlist modal Card | `surface #181B21` + `border #2C313A` | `surface` + `border` (auto-updates); backdrop `scrim` |
| OrbitViz rings/chips/glows | `#4F7DF9` rgba family | `landingTokens` values (§3.4) |
| MenuHero band | `MENU_AMBIENT_URL` + `PAGE_ACCENTS.glow` (0.10–0.22) | ambient + `PAGE_SCHEMES[key].glow` (0.3–0.5) |
| MenuPageShell body | `SECTION_BAND_GLASS rgba(24,27,33,.55)` | `rgba(20,29,60,0.55)` |
| SectionBand glass | old glass/border | new glass/border + optional `mesh` layer |
| Cards / FAQ / table / quotes | `surface`/`border` | auto-update via tokens; hover uses `primary` |
| CTA band panel | `rgba(24,27,33,0.9)` + `ACCENT_GRADIENT` | `rgba(20,29,60,0.9)` + new `ACCENT_GRADIENT` |
| 404 | `background` + `PAGE_ACCENTS.notFound.glow` | `background` + `PAGE_SCHEMES.notFound.glow` + inline scene |
| theme-color meta | `SITE.themeColor #0F1115` | `#0A1022` |

Every hex in the app now derives from `colors.ts` / `landingTokens.ts` / `menuTokens.ts`.

---

## 5. GSAP Animation Blueprint

### 5.1 Dependencies & license

```bash
pnpm --filter @joinorigin/web add gsap @gsap/react
```

- `gsap` (core) + `gsap/ScrollTrigger` are free under the standard GSAP license — no paid
  plugins (`SplitText`, `MorphSVG`, `Flip`, `CustomEase`, `DrawSVG`, etc. are **NOT** used).
- `@gsap/react` provides the React-friendly `useGSAP` hook (auto-cleanup via `gsap.context`).
- Bundle: gsap core + ScrollTrigger ≈ 23 kB gzip. Fine for the showcase ask.

### 5.2 Inline scene SVGs — the icon-spin fix (root cause)

**Current (broken)**: `MenuScene` renders `<img src="/assets/menu/scenes/features-scene.svg">`.
The SVG file carries an embedded `<style>` animating `[data-scene="main"]` (float) and
`[data-scene="orbit"]` (orbit). An `<img>`-loaded SVG is a separate document; page CSS cannot
reach it, and the SVG-internal CSS is unreliable. Meanwhile the page wrapper ring (`::after`)
spins via page CSS — hence "ring spins but icons stagnant" (or vice-versa).

**New (fixed)**: the 8 scene SVGs are **inlined into the DOM as React components**. The SVG
markup is converted to JSX (attribute camelCase), the embedded `<style>` blocks are removed,
and GSAP drives all scene motion from the page document.

New directory `apps/web/components/scenes/`:

```
apps/web/components/scenes/
├── sceneTypes.ts        # SceneKey type + SCENE_MAP
├── SceneSvg.tsx         # shared <svg> shell (viewBox 0 0 560 420, aria-hidden)
├── FeaturesScene.tsx
├── CommunityScene.tsx
├── DocsScene.tsx
├── AboutScene.tsx
├── ContactScene.tsx
├── PrivacyScene.tsx
├── TermsScene.tsx
└── NotFoundScene.tsx
```

`sceneTypes.ts`:

```ts
import type { ComponentType, SVGProps } from 'react';

export type SceneKey =
  | 'features' | 'community' | 'docs' | 'about'
  | 'contact' | 'privacy' | 'terms' | 'notFound';

export type SceneProps = SVGProps<SVGSVGElement> & {
  /** Decorative scenes must stay aria-hidden (alt=""/aria-hidden contract). */
  'aria-hidden'?: boolean;
};

export const SCENE_MAP: Record<SceneKey, ComponentType<SceneProps>> = {
  features: FeaturesScene,
  community: CommunityScene,
  docs: DocsScene,
  about: AboutScene,
  contact: ContactScene,
  privacy: PrivacyScene,
  terms: TermsScene,
  notFound: NotFoundScene,
};
```

`SceneSvg.tsx` (shared shell — every scene component renders through this):

```tsx
export function SceneSvg({
  children,
  width = 560,
  height = 420,
  ...rest
}: SceneProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 420"
      width={width}
      height={height}
      role="img"
      aria-hidden="true"
      data-testid="menu-hero-scene"
      {...rest}
    >
      {children}
    </svg>
  );
}
```

**JSX conversion rules** (from the existing `public/assets/menu/scenes/*.svg` files):

1. Keep the geometry groups exactly; convert attributes to camelCase:
   `stroke-width` → `strokeWidth`, `stroke-linecap` → `strokeLinecap`,
   `stroke-linejoin` → `strokeLinejoin`, `stop-color` → `stopColor`, `transform-box`/`transform-origin`
   only if used (prefer CSS classes instead).
2. **Delete the `<style>` block** (float/orbit keyframes) — GSAP owns it now.
3. Keep `defs` gradients but retarget `stop-color` to the page scheme (`scheme.primary` /
   `scheme.secondary`).
4. Replace `data-scene="orbit"` → `className="scene-orbit-group"` and
   `data-scene="main"` → `className="scene-main-group"` (GSAP selects by class).
5. Each satellite node `<g transform="translate(x y)">` becomes
   `<g transform={`translate(${x} ${y})`}><g className="scene-node" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>…icon…</g></g>`
   — the outer g positions, the inner g carries the counter-rotation (keeps icon glyphs
   upright while orbiting).
6. Recolor all hardcoded art hexes from the old grey palette to the new scheme:
   - node disc fill `#181B21` → `theme.colors.surface` (`#141D3C`)
   - link lines `#2C313A` → `theme.colors.border` (`#2C3A6E`)
   - node stroke + icon strokes → scheme `primary` / `secondary`
   - hub glow fill opacity 0.14 → 0.2, hub gradient → scheme gradient.
7. Scene art stays decorative: `role="img"` + `aria-hidden="true"` + `data-testid="menu-hero-scene"`
   (testid preserved from the old `<img>` so unit/e2e selectors keep working).

### 5.3 Motion architecture

- **`useGSAP` from `@gsap/react`** in every animated component; wrap tweens in
  `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` so reduced-motion users
  get final states instantly and `ScrollTrigger` is never registered against a static page.
- **Selector scoping**: `const q = gsap.utils.selector(scopeRef)` — animations never leak
  outside the component.
- **Timing tokens** in `apps/web/components/motion.ts` (add):

```ts
export const GSAP_EASE = { ease: 'power3.out' } as const;
export const SCENE_TIMINGS = {
  orbit: 24,      // s per revolution (icons travel the ring)
  float: 4.5,     // s up, yoyo down
  ring: 60,       // s per counter-revolution (background ring)
  nodeOrbit: 24,  // matches orbit so glyphs stay upright
} as const;
export const HERO_STAGGER = {
  eyebrow: 0,
  title: 0.08,
  lead: 0.16,
  actions: 0.26,
  meta: 0.34,
  scene: 0.2,
} as const;
```

- **Progressive enhancement rule (unchanged from §7 of the original spec)**: content renders
  at final state in SSR/static markup. GSAP uses `fromTo()` (never `from()`), so if JS fails
  or reduced-motion is active, the final state is already visible.

### 5.4 Menu hero staggered entrance — `MenuHero.tsx`

Replace the CSS `fadeUp`/`scaleIn` + `useEntrance`-gated animations with a GSAP timeline.
Add `data-hero` attributes to the existing elements (eyebrow / PageTitle / HeroLead / Actions /
TrustRow / SceneColumn). The `<h1>` is `PageTitle` — animate the wrapper, never the tag.

```tsx
const heroRef = useRef<HTMLElement>(null);

useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const q = gsap.utils.selector(heroRef);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(q('[data-hero="eyebrow"]'), { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.6 }, HERO_STAGGER.eyebrow)
      .fromTo(q('[data-hero="title"]'), { autoAlpha: 0, y: 32 },
              { autoAlpha: 1, y: 0, duration: 0.7 }, HERO_STAGGER.title)
      .fromTo(q('[data-hero="lead"]'), { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 0.7 }, HERO_STAGGER.lead)
      .fromTo(q('[data-hero="actions"]'), { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.6 }, HERO_STAGGER.actions)
      .fromTo(q('[data-hero="meta"]'), { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.6 }, HERO_STAGGER.meta)
      .fromTo(q('[data-hero="scene"]'), { autoAlpha: 0, scale: 0.94 },
              { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
              HERO_STAGGER.scene);
  });
}, { scope: heroRef });
```

The scene entrance uses `scale` on the wrapper; the *internal* orbit/float/ring timelines
(§5.5) run continuously once rendered (both are independent tweens — entrance does not pause
the loop).

### 5.5 Scene orbit / float / ring — `MenuScene.tsx` (the fix, in ONE document)

```tsx
'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { SCENE_MAP, type SceneKey } from './scenes/sceneTypes';
import { SCENE_TIMINGS } from './motion';

export interface MenuSceneProps {
  /** Scene key — inline React scene component (replaces the old img src). */
  scene: SceneKey;
  /** Per-page glow mesh (PAGE_SCHEMES[key].glow) painted behind the art. */
  glow?: string;
  /** Accessible name for the decorative scene (usually empty string). */
  alt?: string;
}

export function MenuScene({ scene, glow, alt = '' }: MenuSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const SceneArt = SCENE_MAP[scene];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(rootRef);
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
      tl.to(q('.scene-orbit-group'), { rotation: 360, duration: SCENE_TIMINGS.orbit }, 0)
        .to(q('.scene-node'), { rotation: -360, duration: SCENE_TIMINGS.nodeOrbit }, 0)
        .to(q('.scene-main-group'), {
          y: -10, duration: SCENE_TIMINGS.float,
          yoyo: true, repeat: 1, ease: 'sine.inOut',
        }, 0)
        .to(q('.scene-ring'), { rotation: -360, duration: SCENE_TIMINGS.ring }, 0);
    });
  }, { scope: rootRef });

  return (
    <HeroScene $glow={glow} ref={rootRef}>
      {/* background ring becomes a real element (GSAP target; was ::after) */}
      <span className="scene-ring" aria-hidden="true" data-testid="scene-ring" />
      <SceneArt alt={alt} />
    </HeroScene>
  );
}
```

Notes for FE:

- `scene-ring` replaces the CSS `::after` ring on `MenuScene`; give it the same visual
  treatment (1px border `rgba(93,124,255,0.18)`, two box-shadow hairlines, `inset: 12%`,
  `border-radius: 50%`, `pointer-events: none`) via styled-components, but **no CSS spin** —
  GSAP rotates it.
- `.scene-main-group` float uses `yoyo: true, repeat: 1` so each half-cycle returns; GSAP
  `rotation` on SVG groups works when the group's `transform-box: fill-box;
  transform-origin: center` is applied via CSS class (add to `sceneTypes.ts` or the
  SceneSvg shell styles).
- Because the SVG is inline, the e2e LIVE rotation check (TASK-286) can read
  `getAttribute('style')` / `getBBox()` on `[class~="scene-orbit-group"]` and see the
  transform change over time — this closes the TASK-283 gap.
- `HeroScene` (from `menuPagePrimitives.ts`) currently sets `pointer-events: none` — keep;
  decorative.

**Timeline summary (per scene):**

| Motion | Target | Duration | Behavior |
|---|---|---|---|
| Orbit spin | `.scene-orbit-group` | 24 s | `rotation 0→360`, linear, infinite |
| Node counter-rotation | `.scene-node` ×8 | 24 s | `rotation 0→-360`, linear, infinite (glyphs upright) |
| Hub float | `.scene-main-group` | 4.5 s | `y 0→-10`, yoyo, sine.inOut |
| Ring counter-spin | `.scene-ring` | 60 s | `rotation 0→-360`, linear, infinite |

### 5.6 ScrollTrigger reveals + parallax

**`Reveal.tsx`** — keep the public API (`delay`, `as`, `className`, `data-testid="reveal"`)
and the progressive-enhancement contract; swap the IntersectionObserver transition for
GSAP ScrollTrigger:

```tsx
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const delaySec = parseFloat(delay.replace('s', '')) || 0;
    gsap.fromTo(
      elRef.current,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: delaySec,
        scrollTrigger: { trigger: elRef.current, start: 'top 85%', once: true },
      },
    );
  });
}, { scope: elRef });
```

- `once: true` matches the old fire-once IntersectionObserver.
- Keep the `useInView` hook exported in `motion.ts` (other consumers/tests may still use it),
  but `Reveal` stops depending on it.
- Reduced-motion: no tween → element stays at final state (visible).

**Parallax (home + menu heroes + section bands):**

- `Hero.tsx`: add `data-gsap-parallax` attributes to `GlowTopRight`/`GlowBottomLeft`/
  `Vignette` and in `useGSAP`:

```tsx
mm.add('(prefers-reduced-motion: no-preference)', () => {
  q('[data-gsap-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  });
});
```

- `SectionBand.tsx`: when `glow` is enabled, render a real `meshLayer` div (not a pseudo
  element) with `background: PAGE_SCHEMES[accent].mesh`, `pointer-events: none`,
  `data-gsap-parallax="0.08"` so the first band's mesh drifts on scroll (subtle 8%).

### 5.7 OrbitViz upgrade — `OrbitViz.tsx`

Keep all testids (`orbit-viz`, `orbit-1..4`, `orbit-hub`, chip avatars) and the count-up hub.
Move ring spins + chip fly-ins to GSAP:

```tsx
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const q = gsap.utils.selector(rootRef);
    const rings = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
    rings.to(q('.orbit-1'), { rotation: -360, duration: 30 }, 0)
          .to(q('.orbit-2'), { rotation: 360, duration: 40 }, 0)
          .to(q('.orbit-3'), { rotation: 360, duration: 50 }, 0)
          .to(q('.orbit-4'), { rotation: -360, duration: 60 }, 0);
    gsap.fromTo(q('.orbit-chip'), { autoAlpha: 0, scale: 0.3 },
                { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.6)' });
  });
}, { scope: rootRef });
```

- Add `className="orbit-1..4"` and `className="orbit-chip"` to the existing `Orbit`/`Chip`
  styled components (keep `data-testid` attributes).
- Chips keep the `rotate(angle) translate(radius) rotate(-angle)` positioning inside the
  spinning ring container — the ring rotation moves them; GSAP rotation on the ring element
  is equivalent to the CSS keyframe spin (DOM transform, verifiable in e2e).
- Reduced-motion: no ring tweens; chips render final state; count-up already honors the
  `useReducedMotion` hook.

### 5.8 Home / CTA band / waitlist modal / 404

**Home (`home-view.tsx` + `Hero.tsx` + `HeroLeft.tsx`):**
- `PageRoot`: `background-color: colors.background` + `BRAND_MESH` layered over the hero webp
  (`background-image: ${BRAND_MESH}, url(/assets/hero/hero-background.webp)`).
- `HeroLeft`: GSAP staggered entrance for Actions / Supporting / Trust (the `TypewriterHeading`
  is user-kept code — do NOT touch its internals; animate its wrapper `[data-hero="headline"]`
  container only if safe, otherwise skip). Use `data-hero` attributes scoped in `Hero`.
- Definition paragraph, `LogoMarquee`, and the FAQ block: wrap in `Reveal`-style GSAP
  ScrollTrigger fade-ups (definition/FAQ are inside `home-view`; add `data-reveal` hooks +
  one `useGSAP` in `home-view`, or reuse `Reveal` component). Marquee ticker itself stays CSS
  (it already runs on DOM elements — no sandbox issue).

**CTA band (`CtaBand.tsx`):**
- Palette only (panel `rgba(20,29,60,0.9)`, gradient border via updated `ACCENT_GRADIENT`).
- Wrap the existing `Reveal` (keep — it becomes GSAP ScrollTrigger automatically).

**Waitlist modal (`WaitlistModal.tsx`):**
- Palette: `Card` surface/border auto-update; backdrop `scrim`; success icon
  `stroke={colors.success}`; error banner `destructiveSoft` bg + `destructive` border; submit
  hover `primaryHover` (replace hardcoded `#3d66d6`).
- GSAP open/close: on open, `gsap.fromTo(card, { autoAlpha: 0, y: 16, scale: 0.96 }, …)`
  + backdrop fade; on close, a 120 ms fade before unmount. Implement with `useGSAP`
  keyed on `open` and a `closing` state, or keep the CSS `scaleIn` — **FE choice**, but the
  spec prefers GSAP for showcase consistency. Focus trap / a11y attributes unchanged.

**404 (`not-found.tsx`):**
- Palette: `background` + `PAGE_SCHEMES.notFound.glow` + `BRAND_MESH`-lite
  (`PAGE_SCHEMES.notFound.mesh`).
- Scene: inline `<NotFoundScene />` (via `SCENE_MAP.notFound`) + the same
  `MenuScene`-style GSAP orbit/float timeline (reuse a small local `useGSAP` or a shared
  `useSceneMotion` helper in `motion.ts`).
- Keep single `<h1>`, semantic `<main>`, CTAs.

### 5.9 Reduced-motion & progressive enhancement (global)

- `MenuPageShell` GlobalStyles: keep the existing `prefers-reduced-motion` CSS kill-switch
  (it neutralizes any residual CSS animations) AND GSAP never animates under
  `(prefers-reduced-motion: reduce)` because every timeline is inside
  `gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', …)`.
- `motion.ts`: keep `useReducedMotion` / `useEntrance` / `useInView` exported (compat), but
  new motion uses GSAP only.

### 5.10 Performance

- `ScrollTrigger` is registered once (`gsap.registerPlugin(ScrollTrigger)`) — in a shared
  module (`motion.ts` or a new `lib/gsap.ts`).
- All timelines are component-scoped and auto-killed by `useGSAP` cleanup.
- `useGSAP` + `gsap.context` reverts on unmount; `ScrollTrigger` instances are
  `once: true` where possible.
- Keep the DOM lean: inline SVG replaces 8 `<img>` requests (fewer network fetches, same art).

---

## 6. ASCII Wireframes

### 6.1 Home hero (desktop) — with mesh + GSAP entrances

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [header sticky: scrim bg + indigo border]                                   │
│  ●JoinOrigin   Features Community Docs About      Lang  LogIn [Get Started]  │
├──────────────────────────────────────────────────────────────────────────────┤
│  ░░ mesh: violet(82%↑) + cyan(8%↓) over hero-background.webp ░░░░░░░░░░░░░░ │
│  ░░ HERO_RADIAL_GLOW_1 (78%,22%) ░░ HERO_RADIAL_GLOW_2 (10%,90%) ░░░░░░░░░  │
│                                                                              │
│  ┌─ HeroLeft (stagger: 0/.08/.16/.26/.34) ─┐   ┌── OrbitViz (GSAP rings) ─┐ │
│  │  [TypewriterHeading wrapper]             │   │   ◯ orbit-4 (60s ccw)    │ │
│  │  [Start Project ▸]  ← 0.6s              │   │   ◯ orbit-3 (50s cw)     │ │
│  │  supporting copy   ← 0.7s               │   │   ◯ orbit-2 (40s cw)     │ │
│  │  [avatars ◯◯◯◯◯] trust                  │   │   ◯ orbit-1 (30s ccw)    │ │
│  │                                          │   │      ◉ hub 2,400+        │ │
│  └──────────────────────────────────────────┘   └──────────────────────────┘ │
│                                                                              │
│  Definition paragraph ("social collaboration network")  ← ScrollTrigger ↑    │
│  LogoMarquee (ticker stays CSS)                         ← ScrollTrigger ↑    │
│  FAQ section (h2 per question, mirrors FAQPage JSON-LD)  ← ScrollTrigger ↑   │
├──────────────────────────────────────────────────────────────────────────────┤
│  footer: brand + groups + join waitlist + language switcher                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Menu page hero band (all 7 pages + 404 use this layout)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [header sticky]                                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│  ░░ MENU_AMBIENT_URL (screen .5) + MENU_GRID_URL (88px tile) ░░░░░░░░░░░░░░ │
│  ░░ PAGE_SCHEMES[key].glow (0.3–0.5 dual radial mesh)          ░░░░░░░░░░░░ │
│                                                                              │
│  [Eyebrow]        ← GSAP 0.00s                               ┌───────────┐   │
│  <h1>Title</h1>   ← GSAP 0.08s                               │ scene-ring│   │
│  lead ▓▓▓▓▓▓      ← GSAP 0.16s                               │  ◯        │   │
│  [Join waitlist] [2,400+ Members] ← 0.26/0.34                │  ◉ orbit  │   │
│  [avatars trust row]                                          │  group    │   │
│                                                               │ (inline   │   │
│                                                               │  SVG +    │   │
│                                                               │  GSAP)    │   │
│                                                               └───────────┘   │
│  (bottom vignette → body)                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│  SectionBand glass: [meshLayer · data-gsap-parallax=0.08]                     │
│    <section><h2>…</h2><cards…></section>   ← Reveal/ScrollTrigger             │
│  SectionBand plain (backgroundAlt)                                             │
│    <section><h2>…</h2><table…></section>   ← Reveal/ScrollTrigger             │
│  CtaBand: gradient-border panel [Join waitlist]  ← Reveal/ScrollTrigger       │
├──────────────────────────────────────────────────────────────────────────────┤
│  footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Waitlist modal

```
┌────────────── scrim rgba(6,10,24,.72) + blur ──────────────┐
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ✕                                                    │  │
│  │  Join Origin [h2, display font]                       │  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │
│  │  [Name     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ]│  │
│  │  [Email    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ]│  │
│  │  [  Join the waitlist  ]  ← primary / primaryHover     │  │
│  │  ▓▓▓▓ legal note                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  GSAP: backdrop fade + card y:16/scale .96 → 1 on open     │
└─────────────────────────────────────────────────────────────┘
```

### 6.4 404

```
┌──────────────────────────────────────────────────────────────┐
│  ░░ background + PAGE_SCHEMES.notFound.glow/mesh ░░░░░░░░░░ │
│                                                              │
│        [inline NotFoundScene + GSAP float/orbit]             │
│        [●JoinOrigin wordmark]                                │
│        <h1>404 — Page not found</h1>  (single h1)            │
│        copy ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                    │
│        [  Back home  ]  [Explore communities →]              │
└──────────────────────────────────────────────────────────────┘
```

---

## 7. Asset Manifest (zero CDN)

**Kept (unchanged — do NOT regenerate or move):**

| Asset | Path |
|---|---|
| Logo mark (SVG) | `/assets/logo/joinorigin-mark.svg` |
| Logo lockup (PNG, 2×) | `/assets/logo/joinorigin-logo.png` |
| OG image (1200×630) | `/assets/og/og-default.png` |
| Hero background (webp) | `/assets/hero/hero-background.webp` |
| Menu ambient texture (webp) | `/assets/menu/menu-ambient.webp` |
| Menu dot grid (SVG) | `/assets/menu/hero-grid.svg` |
| Partner logos (5×) | `/assets/partner-01.svg` … `/assets/partner-05.svg` |
| Avatars (9×) | `/assets/avatars/avatar-01.png` … `/assets/avatar-09.png` |
| Scene SVGs (8×, source-of-truth; no longer `<img>`-loaded) | `/assets/menu/scenes/{features,community,docs,about,contact,privacy,terms,not-found}-scene.svg` |

**New assets: none.** The palette is pure CSS gradient tokens; scene motion is the inlined
React components + GSAP. GSAP is an npm dependency, not a CDN script.

> FE note: keep the 8 scene SVG files on disk (source of truth + reference + zero-risk to
> path assertions). `MenuScene` no longer references them at runtime; e2e path assertions that
> check scene rendering should target the inline component testid (`menu-hero-scene`) instead
> of the `.svg` URL. `MenuScene.test.tsx` img assertions must be updated to inline-svg
> assertions (§10).

---

## 8. Constraints (must preserve)

1. **Single `<h1>`**: `MenuHero`'s `PageTitle` remains the only `h1` on menu pages; the home
   page keeps its typewriter H1; 404 keeps its one `h1`. GSAP animates wrappers, never tags.
2. **Semantic HTML**: `header` landmark = sticky `Header` only; `MenuHero` stays a `section`;
   `main` wraps content; `Section`/`h2`/`h3`/`p` structure unchanged; `nav`, `footer`,
   `table`, `blockquote` untouched.
3. **SEO metadata + JSON-LD**: `createMetadata` per-page exports, BreadcrumbList/FAQPage
   JSON-LD, sitemap/robots/llms.txt — untouched. `SITE.themeColor` → `#0A1022` is the ONLY
   site.ts change.
4. **Server-wrapper pattern**: `page.tsx` files keep exporting `metadata` + rendering
   view + JsonLd. No color/motion code in server wrappers (motion is client-only via
   `'use client'` components).
5. **i18n**: locale JSONs untouched; all strings stay `t()`-driven.
6. **Assets**: og-default.png + logo unchanged; zero CDN.
7. **User-kept code**: `TypewriterHeading` internals byte-identical.

---

## 9. Per-file Change Table (file → current → new)

> The designer does NOT edit these; fe-gsap-menu-anim (TASK-285) implements them verbatim.

### 9.1 Shared design package

| # | File | Current | New |
|---|---|---|---|
| 1 | `packages/design/src/colors.ts` | 10 grey-dark tokens (`#0F1115` family, `primary #4F7DF9`) | Full "Origin Spectrum" token set (§3.2): canvas/surface/border/text/feedback/focus/overlay + 8 mesh stops |
| 2 | `packages/design/src/theme.test.ts` | asserts `primary === '#4F7DF9'`, `background === '#0F1115'` | asserts new values + new-token presence (e.g. `surface`, `scrim`, `meshViolet`) |
| 3 | `packages/design/src/index.ts` | exports colors/ColorTokens | unchanged (types flow) |

### 9.2 Web components

| # | File | Current | New |
|---|---|---|---|
| 4 | `apps/web/package.json` | no gsap | add `gsap` + `@gsap/react` |
| 5 | `apps/web/components/landingTokens.ts` | `ACCENT_GRADIENT` (#4F7DF9→#8AB4FF), old glows/glows rgba | new gradient + `BRAND_MESH` + updated orbit/vignette/glow values (§3.4) |
| 6 | `apps/web/components/menuTokens.ts` | `PAGE_ACCENTS` (0.10–0.22 tints), grey glass/border, `SCENE_FLOAT/ORBIT` | `PAGE_SCHEMES` (§3.3), updated band glass/border, deprecated scene CSS tokens |
| 7 | `apps/web/components/menuPagePrimitives.ts` | hardcoded rgba(79,125,249,…) hover/eyebrow/StatPill + surface/border via theme | route all through tokens; hover `primary`/`surfaceOverlay`; StatPill bg `rgba(20,29,60,0.7)` |
| 8 | `apps/web/components/scenes/*` | — | NEW: 8 inline scene components + `sceneTypes.ts` + `SceneSvg.tsx` (§5.2) |
| 9 | `apps/web/components/MenuScene.tsx` | `<img>` + CSS ring `::after` | inline `SCENE_MAP` component + `scene-ring` element + GSAP orbit/float/ring (§5.5) |
| 10 | `apps/web/components/MenuHero.tsx` | CSS fadeUp/scaleIn via `useEntrance` | `data-hero` attrs + GSAP staggered timeline (§5.4); scene prop → `SceneKey` |
| 11 | `apps/web/components/MenuPageShell.tsx` | GlobalStyles grey bg + CSS reduced-motion kill-switch | palette tokens + keep kill-switch; optional `gsap.registerPlugin(ScrollTrigger)` import site |
| 12 | `apps/web/components/SectionBand.tsx` | pseudo `::before` glow (0.5 opacity) | token glass/border + real `meshLayer` with `data-gsap-parallax` (§5.6) |
| 13 | `apps/web/components/Reveal.tsx` | IntersectionObserver + CSS transition | GSAP ScrollTrigger (`once:true`), API unchanged (§5.6) |
| 14 | `apps/web/components/motion.ts` | CSS keyframe timings + hooks | add `GSAP_EASE`, `SCENE_TIMINGS`, `HERO_STAGGER`; keep hooks exported |
| 15 | `apps/web/components/OrbitViz.tsx` | CSS keyframe spins + fly-in | GSAP ring/chip tweens, testids unchanged (§5.7) |
| 16 | `apps/web/components/Hero.tsx` | CSS overlays | palette glows + `data-gsap-parallax` on overlays (§5.6) |
| 17 | `apps/web/components/HeroLeft.tsx` | CSS fadeUp via `useEntrance` | GSAP staggered entrance (TypewriterHeading internals untouched) |
| 18 | `apps/web/components/Header.tsx` | `rgba(15,17,21,0.72)` + grey border | `scrim` + token border |
| 19 | `apps/web/components/Footer.tsx` | grey border | token border (auto) |
| 20 | `apps/web/components/CtaBand.tsx` | `rgba(24,27,33,0.9)` panel + old gradient | `rgba(20,29,60,0.9)` + new `ACCENT_GRADIENT` |
| 21 | `apps/web/components/WaitlistModal/WaitlistModal.tsx` | grey card/backdrop + hardcoded `#3d66d6` hover | token palette + `scrim` + GSAP open/close (§5.8) |
| 22 | `apps/web/app/home-view.tsx` | PageRoot `background` + webp only | PageRoot `background` + `BRAND_MESH` over webp; ScrollTrigger reveals on definition/marquee/FAQ |
| 23 | `apps/web/app/not-found.tsx` | `<Image src=…/not-found-scene.svg>` + old glow | inline `NotFoundScene` + GSAP float + `notFound` scheme (§5.8) |
| 24 | `apps/web/app/{features,community,docs,about,contact,privacy,terms}/*-view.tsx` | `scene: '/assets/menu/scenes/….svg'` | `scene: '<key>'` (SceneKey) — everything else (h1/lead/CTAs/bands) unchanged |
| 25 | `apps/web/lib/seo/site.ts` | `themeColor: '#0F1115'` | `themeColor: '#0A1022'` |

### 9.3 Tests / e2e (update, do not delete coverage)

| # | File | Change |
|---|---|---|
| 26 | `apps/web/components/MenuScene.test.tsx` | replace `IMG`/`src` assertions with inline `<svg data-testid="menu-hero-scene">` + `SCENE_MAP` render + decorative `aria-hidden`; keep alt prop |
| 27 | `apps/web/components/MenuHero.test.tsx` | scene prop type (`SceneKey`); h1/eyebrow/lead/CTA assertions unchanged |
| 28 | `apps/web/components/Reveal.test.tsx` | adapt to GSAP (mock/allow ScrollTrigger in jsdom; assert final-visible content) |
| 29 | `apps/web/components/OrbitViz.test.tsx` | testids unchanged; assert GSAP class hooks exist |
| 30 | `apps/web/components/WaitlistModal.test.tsx` | palette assertions (if any) follow tokens |
| 31 | `apps/web/app/not-found.test.tsx` | scene component assertions |
| 32 | `packages/design/src/theme.test.ts` | see #2 |
| 33 | `app/tests/e2e/tests/pages.spec.ts` | H1/landmark assertions unchanged (no scene-path coupling) — verify no `img`-scene assertions added |
| 34 | new/updated e2e | TASK-286 owns the LIVE rotation + palette assertions; FE adds only unit coverage |

---

## 10. Verification / Definition of Done (for TASK-285)

- `pnpm --filter @joinorigin/web add gsap @gsap/react` present in `apps/web/package.json`.
- Scene SVGs inline: no `<img src="/assets/menu/scenes/…">` anywhere; 8 scene components in
  `apps/web/components/scenes/`.
- LIVE rotation: on `/features /community /docs /about` the `.scene-orbit-group` transform
  changes over time (bbox/DOM transform), the `.scene-ring` counter-rotates, `.scene-main-group`
  floats — all driven by GSAP in one document.
- Palette: representative new token hexes render on home + all 7 menu pages + 404
  (e.g. `background #0A1022`, `primary #5D7CFF`, community amber `#F5A524`, privacy green
  `#30A46C`, about violet `#8B5CF6`).
- Reduced motion: `prefers-reduced-motion: reduce` renders final static state (no GSAP
  tweens, kill-switch intact).
- Single h1 + landmarks + SEO/JSON-LD + i18n locale values + og-default.png/logo unchanged;
  zero CDN.
- Matrix green: lint 5/5, typecheck 5/5, unit 5/5, e2e, web prod build.

---

## 11. Non-goals / open items

- **Mobile app**: `@joinorigin/design` colors are shared; mobile consumes them automatically.
  The mobile screen does not use the web scene components (out of scope — no mobile scene
  inlining this sprint).
- **Paid GSAP plugins**: explicitly out of scope.
- **New raster imagery**: none needed; meshes are CSS gradients.
- **Header animation beyond palette**: header stays sticky/static (no scroll-hide) to keep
  a11y + tests stable.

*Spec complete — hand off to fe-gsap-menu-anim for verbatim implementation (TASK-285).*
