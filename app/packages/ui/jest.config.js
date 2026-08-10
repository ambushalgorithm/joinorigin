module.exports = {
  preset: 'react-native',
  testMatch: ['**/*.test.ts?(x)'],
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@joinorigin)/)',
  ],
};
