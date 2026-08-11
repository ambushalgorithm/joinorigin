module.exports = {
  // RN 0.87 moved the React Native Jest preset out of the `react-native`
  // package into its own `@react-native/jest-preset` package. The preset's
  // own `moduleNameMapper` resolves `react-native` relative to the hoisted
  // root copy (0.74.7, used by apps/web + apps/mobile), so we re-map it to
  // this package's local react-native 0.87.0 install.
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^react-native/setup-env$': '<rootDir>/node_modules/react-native/src/setup-env.js',
    '^react-native$': '<rootDir>/node_modules/react-native/index.js',
    '^react-native/(.*)$': '<rootDir>/node_modules/react-native/$1',
  },
  testMatch: ['**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@joinorigin)/)',
  ],
};
