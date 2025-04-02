import { resolveTailwindConfig } from './resolveTailwindConfig';
import { register as registerTsNode } from 'ts-node';
import resolveConfig from 'tailwindcss/resolveConfig';
import { Config } from 'tailwindcss';
import { jest } from '@jest/globals';

jest.mock('ts-node', () => ({
    register: jest.fn(),
}));

jest.mock('tailwindcss/resolveConfig', () => jest.fn(() => ({})));

jest.mock('node:path', () => ({
    extname: jest.fn((filename: string) =>
        filename.endsWith('.ts') ? '.ts' : '.js',
    ),
}));

jest.mock('tailwindcss', () => ({
    Config: jest.fn(),
}));

jest.mock('fs', () => ({
    existsSync: jest.fn(() => true),
}));

describe('resolveTailwindConfig', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register ts-node if the file is a TypeScript file', async () => {
        const mockConfig = { theme: {} } as Config;
        jest.mock('/path/to/config.ts', () => mockConfig, { virtual: true });

        const result = await resolveTailwindConfig('/path/to/config.ts');

        expect(registerTsNode).toHaveBeenCalled();
        expect(resolveConfig).toHaveBeenCalledWith(mockConfig);
        expect(result).toBeDefined();
    });

    it('should not register ts-node if the file is not a TypeScript file', async () => {
        const mockConfig = { theme: {} } as Config;
        jest.mock('/path/to/config.js', () => mockConfig, { virtual: true });

        const result = await resolveTailwindConfig('/path/to/config.js');

        expect(registerTsNode).not.toHaveBeenCalled();
        expect(resolveConfig).toHaveBeenCalledWith(mockConfig);
        expect(result).toBeDefined();
    });

    it('should throw an error if the file does not exist', async () => {
        jest.mock('fs', () => ({
            existsSync: jest.fn(() => false),
        }));

        await expect(
            resolveTailwindConfig('/path/to/nonexistent.js'),
        ).rejects.toThrow();
    });
});
