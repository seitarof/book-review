import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/__tests__/*.test.ts', '<rootDir>/__tests__/*.test.tsx'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
};

export default config;