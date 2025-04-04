/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+.ts$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
    },
    moduleNameMapper: {
        '^/path/to/config\\.js$': '<rootDir>/src/__mocks__/mockJsConfig.js',
        '^C:\\\\path\\\\to\\\\config\\.js$': '<rootDir>/src/__mocks__/mockJsConfig.js',
        '^/path/to/config\\.ts$': '<rootDir>/src/__mocks__/mockTsConfig.ts',
        '^C:\\\\path\\\\to\\\\config\\.ts$': '<rootDir>/src/__mocks__/mockTsConfig.ts',
    },
};
