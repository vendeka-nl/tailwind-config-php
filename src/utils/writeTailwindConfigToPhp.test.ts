import { describe, expect, it, jest } from '@jest/globals';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { platform } from 'node:os';
import { convertToPhp } from './convertToPhp';
import { filterObject } from './filterObject';
import { resolveTailwindConfig } from './resolveTailwindConfig';
import { writeTailwindConfigToPhp } from './writeTailwindConfigToPhp';

jest.mock('node:fs', () => ({
    existsSync: jest.fn(),
}));

jest.mock('node:fs/promises', () => ({
    writeFile: jest.fn(),
}));

jest.mock('./resolveTailwindConfig', () => ({
    resolveTailwindConfig: jest.fn(),
}));

jest.mock('./filterObject', () => ({
    filterObject: jest.fn(),
}));

jest.mock('./convertToPhp', () => ({
    convertToPhp: jest.fn(),
}));

/**
 * Convert forward slashes to backward slashed on Windows.
 */
function fixPathSlashes(path: string): string {
    if (platform() === 'win32') {
        return path.replaceAll('/', '\\');
    }

    return path;
}

describe('writeTailwindConfigToPhp', () => {
    const mockCwd = '/mock/project';
    const mockConfigPath = `${mockCwd}/tailwind.config.js`;
    const mockOutputPath = `${mockCwd}/output.php`;

    beforeEach(() => {
        jest.clearAllMocks();
        process.cwd = jest.fn(() => mockCwd);
    });

    it('should throw an error if the specified config file does not exist', async () => {
        (existsSync as jest.Mock).mockReturnValue(false);

        await expect(
            writeTailwindConfigToPhp({
                config: 'tailwind.config.js',
                output: 'output.php',
            }),
        ).rejects.toThrow(
            `Tailwind CSS config file '${fixPathSlashes(
                mockConfigPath,
            )}' not found.`,
        );
    });

    it('should throw an error if no config file is detected', async () => {
        (existsSync as jest.Mock).mockReturnValue(false);

        await expect(
            writeTailwindConfigToPhp({ output: 'output.php' }),
        ).rejects.toThrow(
            'No Tailwind CSS config file detected. Please specify one using the `config` flag.',
        );
    });

    it('should resolve the Tailwind CSS config and write the PHP file', async () => {
        const mockResolvedConfig = { theme: { colors: { red: '#ff0000' } } };
        const mockPhpOutput =
            "<?php\n\nreturn ['theme' => ['colors' => ['red' => '#ff0000']]];\n";

        (existsSync as jest.Mock).mockReturnValue(true);
        (resolveTailwindConfig as jest.Mock<any>).mockResolvedValue(
            mockResolvedConfig,
        );
        (convertToPhp as jest.Mock).mockReturnValue(
            "['theme' => ['colors' => ['red' => '#ff0000']]]",
        );

        await writeTailwindConfigToPhp({
            config: 'tailwind.config.js',
            output: 'output.php',
        });

        expect(resolveTailwindConfig).toHaveBeenCalledWith(
            fixPathSlashes(mockConfigPath),
        );
        expect(writeFile).toHaveBeenCalledWith(
            fixPathSlashes(mockOutputPath),
            mockPhpOutput,
        );
    });

    it('should filter the resolved config if properties are specified', async () => {
        const mockResolvedConfig = {
            theme: { colors: { red: '#ff0000', blue: '#0000ff' } },
        };
        const mockFilteredConfig = { theme: { colors: { red: '#ff0000' } } };
        const mockPhpOutput =
            "<?php\n\nreturn ['theme' => ['colors' => ['red' => '#ff0000']]];\n";

        (existsSync as jest.Mock).mockReturnValue(true);
        (resolveTailwindConfig as jest.Mock<any>).mockResolvedValue(
            mockResolvedConfig,
        );
        (filterObject as jest.Mock).mockReturnValue(mockFilteredConfig);
        (convertToPhp as jest.Mock).mockReturnValue(
            "['theme' => ['colors' => ['red' => '#ff0000']]]",
        );

        await writeTailwindConfigToPhp({
            config: 'tailwind.config.js',
            output: 'output.php',
            properties: ['theme.colors.red'],
        });

        expect(filterObject).toHaveBeenCalledWith(mockResolvedConfig, [
            'theme.colors.red',
        ]);
        expect(writeFile).toHaveBeenCalledWith(
            fixPathSlashes(mockOutputPath),
            mockPhpOutput,
        );
    });
});
