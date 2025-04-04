import { describe, expect, it, jest } from '@jest/globals';
import { build } from 'esbuild';
import resolveConfig from 'tailwindcss/resolveConfig';
import { resolveTailwindConfig } from './resolveTailwindConfig';

jest.mock('esbuild', () => ({
    build: jest.fn(() => ({
        outputFiles: [
            {
                contents: Buffer.from('export default { theme: {} };'),
            },
        ],
    })),
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

    it('should run esbuild if the file is a TypeScript file', async () => {
        jest.mock('/path/to/config.ts', () => ({ theme: {} }), {
            virtual: true,
        });

        const result = await resolveTailwindConfig('/path/to/config.ts');

        expect(build).toHaveBeenCalled();
        expect(resolveConfig).toHaveBeenCalledWith({ theme: {} });
        expect(result).toBeDefined();
    });

    it('should not run esbuild if the file is not a TypeScript file', async () => {
        jest.mock('/path/to/config.js', () => ({ theme: {} }), {
            virtual: true,
        });

        const result = await resolveTailwindConfig('/path/to/config.js');

        expect(build).not.toHaveBeenCalled();
        expect(resolveConfig).toHaveBeenCalledWith({ theme: {} });
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
