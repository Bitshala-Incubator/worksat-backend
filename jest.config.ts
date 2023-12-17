import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    roots: ['<rootDir>/src/', '<rootDir>/test/'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': '@swc/jest',
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.(t|j)s'],
    coveragePathIgnorePatterns: [
        '.*.controller.ts',
        '.*.module.ts',
        '.*.entity.ts',
        '.*.dto.ts',
        '.*.spec.ts',
        '.*.module-definition.ts',
        '.*.configuration.ts',
        '.*.configuration.model.ts',
        '.*./main.ts',
        'node_modules',
    ],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
    },
    setupFiles: ['<rootDir>/jest-setup-file.ts'],
};
export default config;
