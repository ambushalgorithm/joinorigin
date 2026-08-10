/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@joinorigin/design', '@joinorigin/ui'],
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
