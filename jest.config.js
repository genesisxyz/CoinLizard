const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg||@legendapp/*|expo-linear-gradient)',
  ],
  collectCoverage: true,
  testPathIgnorePatterns: ['e2e'],
  watchPathIgnorePatterns: ['e2e'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.ts',
  ],
  bail: true,
  testTimeout: 20000,
  forceExit: true,
};
