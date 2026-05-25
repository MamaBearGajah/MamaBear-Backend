import type { Config } from 'jest';
import { resolve } from 'path';

const config: Config = {
  verbose: true,
  rootDir: '.',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
      testPathIgnorePatterns: ['e2e-spec'],
      moduleFileExtensions: ['js', 'json', 'ts'],
      moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^generated/prisma/client$': '<rootDir>/generated/prisma/client.ts',
        '^generated/prisma$': '<rootDir>/generated/prisma/client.ts',
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
      transform: {
        '^.+\\.(t|j)s$': ['ts-jest', {
          tsconfig: resolve(__dirname, 'tsconfig.test.json'),
          useESM: false,
        }],
      },
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.e2e-spec.ts'],
      moduleFileExtensions: ['js', 'json', 'ts'],
      moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^generated/prisma/client$': '<rootDir>/generated/prisma/client.ts',
        '^generated/prisma/enums$': '<rootDir>/generated/prisma/enums.ts', // ← sudah ditambah?
        '^generated/prisma$': '<rootDir>/generated/prisma/client.ts',
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
      transform: {
        '^.+\\.(t|j)s$': ['ts-jest', {
          tsconfig: resolve(__dirname, 'tsconfig.test.json'),
          useESM: false,
        }],
      },
      globalSetup: resolve(__dirname, 'test/global-setup.ts'),
      globalTeardown: resolve(__dirname, 'test/global-teardown.ts'),
    },
  ],
};

export default config;