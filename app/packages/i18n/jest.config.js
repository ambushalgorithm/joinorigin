module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.ts?(x)'],
  moduleNameMapper: {
    // Universal components import from 'react-native' — resolve to web.
    '^react-native$': 'react-native-web',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@joinorigin|react-native-web|next)/)'],
};
