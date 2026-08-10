import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.ts?(x)'],
  moduleNameMapper: {
    // Universal components import from 'react-native' — resolve to web.
    '^react-native$': 'react-native-web',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@joinorigin|react-native-web|next)/)'],
};

export default createJestConfig(customJestConfig);
