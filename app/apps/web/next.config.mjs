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
};

export default nextConfig;
