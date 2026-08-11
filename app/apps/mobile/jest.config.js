const path = require('path');

// Resolve `react-native` from the RN install this app actually links to
// (root hoist now serves 0.87.0 for all @joinorigin packages; apps/web keeps
// its own 0.74.7). The @react-native/jest-preset maps `react-native`
// relative to the preset's own resolution by default; re-map it explicitly
// so tests always exercise the RN version declared by this app.
const rnRoot = path.dirname(require.resolve('react-native/package.json'));

module.exports = {
  preset: '@react-native/jest-preset',
  testMatch: ['**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^react-native/setup-env$': `${rnRoot}/src/setup-env.js`,
    '^react-native$': `${rnRoot}/index.js`,
    '^react-native/(.*)$': `${rnRoot}/$1`,
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@joinorigin)/)',
  ],
};
