import { extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import { build } from 'esbuild';

export async function resolveTailwindConfig(filename: string) {
    if (extname(filename) === '.ts') {
        const result = await build({
            entryPoints: [filename],
            platform: 'node',
            format: 'esm',
            bundle: true,
            write: false,
        });

        const tempCode = new TextDecoder().decode(
            result.outputFiles[0]!.contents,
        );
        const tailwindConfig = (await import(
            `data:text/javascript,${encodeURIComponent(tempCode)}`
        )).default;

        return resolveConfig(tailwindConfig);
    }

    const tailwindConfig: Config = (await import(pathToFileURL(filename).href))
        .default;

    return resolveConfig(tailwindConfig);
}
