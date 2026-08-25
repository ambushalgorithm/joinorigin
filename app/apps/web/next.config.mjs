/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output: emits a self-contained `.next/standalone` folder with
  // the server, traced node_modules and the app dir — used by the Docker
  // multi-stage build (app/Dockerfile) to produce a minimal runtime image.
  output: 'standalone',
  transpilePackages: ['@joinorigin/design', '@joinorigin/ui'],
  // Allow dev-server access from 127.0.0.1 (used by Playwright e2e webServer
  // and local checks) so Next.js doesn't warn about cross-origin /_next assets.
  allowedDevOrigins: ['127.0.0.1'],
  compiler: {
    // styled-components v6: SWC generates a deterministic per-component
    // `componentId` (from file path + variable name) so class names are
    // stable across the server/client bundle split (TASK-209 "Prop className
    // did not match" hydration fix). This is the SWC port of
    // babel-plugin-styled-components and is honored by both bundlers —
    // webpack (SWC transform) and Turbopack (native SWC transform).
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
    },
  },
  // Turbopack is the default bundler in Next 16. The webpack() hook is not
  // used by Turbopack, so the react-native→react-native-web alias and the
  // .web.* extension preference are ported to their Turbopack equivalents.
  turbopack: {
    resolveAlias: {
      // Resolve RN primitives to react-native-web on the web platform.
      // NOTE: Turbopack aliases are keyed by the bare import specifier (no
      // webpack-style `$` exact-match suffix) — see next.config-js/turbopack
      // "Resolving aliases".
      'react-native': 'react-native-web',
    },
    // Prefer .web.tsx implementations for platform-split components.
    // NOTE: resolveExtensions overwrites the default list, so the standard
    // extensions must be included explicitly (see next.config-js/turbopack
    // "Resolving custom extensions").
    resolveExtensions: [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
  },
  // Story F navigation performance (TASK-537, fe-nav-perf-fix) — route-level
  // prefetch / client-router-cache config so a link click renders the target
  // route's primary content from data the browser already has, instead of
  // fetching on the click critical path. See
  // `docs/design/sprint-22-nav-perf-baseline.md` (RC3/F3) for the measured
  // root cause: Next 16's default `<Link prefetch={null}>` only prefetches
  // the RSC payload; the client router then re-fetches it on click because
  // `staleTimes.dynamic` defaults to 0 (every route here is dynamic — the
  // root layout reads `headers()`, RC2). Raising `dynamic` keeps the
  // prefetched payload usable for 60s so the click renders from the router
  // cache (RSC round-trip removed from the critical path).
  experimental: {
    // Client router cache duration (seconds). `dynamic` applies to
    // `<Link prefetch={null}>` (the app's default) and to dynamic routes;
    // `static` applies to `prefetch={true}`. Default dynamic=0 made every
    // prefetched payload immediately stale → the click always re-fetched.
    staleTimes: {
      dynamic: 60,
      static: 300,
    },
    // Inline small prefetched RSC payloads into the initial HTML so the
    // router already has the target route's data before the click (defaults
    // maxSize 2048 / maxBundleSize 10240; raised to cover menu-page
    // payloads that fit under these budgets — the rest still prefetch
    // normally).
    prefetchInlining: {
      maxSize: 4096,
      maxBundleSize: 16384,
    },
    // Keep optimistic router cache (default true) — cached/prefetched UI
    // renders immediately during navigation.
    optimisticClientCache: true,
    // Preload route entries at server start (default true) so the first
    // render after a click is warm.
    preloadEntriesOnStart: true,
  },
  // Immutable caching for locally-hosted webfonts (fe-fonts, TASK-494):
  // `/fonts/*` files are content-addressed by build/version (they never
  // change in place), so browsers and CDNs may cache them for a year
  // without revalidation. Combined with `font-display: swap` + the
  // latin/latin-ext preloads in the root layout, this removes the
  // intermittent first-visit font load failures: the woff2 is either
  // already in cache or fetched once and reused forever.
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
