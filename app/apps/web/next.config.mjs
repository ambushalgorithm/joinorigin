/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@joinorigin/design', '@joinorigin/ui'],
  // Allow dev-server access from 127.0.0.1 (used by Playwright e2e webServer
  // and local checks) so Next.js doesn't warn about cross-origin /_next assets.
  allowedDevOrigins: ['127.0.0.1'],
  compiler: {
    // styled-components v6: SWC generates a deterministic per-component
    // `componentId` (from file path + variable name) so class names are
    // stable across the server/client bundle split (TASK-209 "Prop className
    // did not match" hydration fix).
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
    },
  },
  webpack: (config) => {
    // Resolve RN primitives to react-native-web on the web platform,
    // and prefer .web.tsx implementations for platform-split components.
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = ['.web.tsx', '.web.ts', '.web.js', ...config.resolve.extensions];
    return config;
  },
};

export default nextConfig;
