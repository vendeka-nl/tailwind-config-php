import { extname } from 'node:path';
import { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import { register as registerTsNode } from 'ts-node';

export async function resolveTailwindConfig(filename: string) {
    if (extname(filename) === '.ts') {
        registerTsNode();
    }

    const tailwindConfig: Config = (await import(filename)).default;

    return resolveConfig(tailwindConfig);
}
