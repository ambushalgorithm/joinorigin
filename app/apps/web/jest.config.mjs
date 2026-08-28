import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.ts?(x)'],
  // TASK-584: raise the per-test timeout from Jest's 5000ms default — the heavy
  // location/contact page suites flaked under parallel agent load with
  // 'Exceeded timeout of 5000 ms'. Validated: 110 suites / 1355 tests green.
  testTimeout: 30000,
  moduleNameMapper: {
    // Universal components import from 'react-native' — resolve to web.
    '^react-native$': 'react-native-web',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@joinorigin|react-native-web|next)/)'],
};

export default createJestConfig(customJestConfig);
