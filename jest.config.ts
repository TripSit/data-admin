import type { Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  moduleDirectories: [
    'node_modules',
    'utils',
    __dirname,
  ],
};

export default jestConfig;
