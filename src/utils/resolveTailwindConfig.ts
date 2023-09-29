import { extname } from 'node:path';
import { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import { register as registerTsNode } from 'ts-node';

export async function resolveTailwindConfig(filename: string) {
    if (extname(filename) === '.ts') {
        registerTsNode();
    }

    const tailwindConfig: Config = require(filename);

    return resolveConfig(tailwindConfig);
}
