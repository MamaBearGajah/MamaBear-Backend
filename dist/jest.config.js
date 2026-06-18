"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
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
                        tsconfig: (0, path_1.resolve)(__dirname, 'tsconfig.test.json'),
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
                '^generated/prisma/enums$': '<rootDir>/generated/prisma/enums.ts',
                '^generated/prisma$': '<rootDir>/generated/prisma/client.ts',
                '^(\\.{1,2}/.*)\\.js$': '$1',
            },
            transform: {
                '^.+\\.(t|j)s$': ['ts-jest', {
                        tsconfig: (0, path_1.resolve)(__dirname, 'tsconfig.test.json'),
                        useESM: false,
                    }],
            },
            globalSetup: (0, path_1.resolve)(__dirname, 'test/global-setup.ts'),
            globalTeardown: (0, path_1.resolve)(__dirname, 'test/global-teardown.ts'),
        },
    ],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map