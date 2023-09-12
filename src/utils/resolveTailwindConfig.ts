import { readFile } from "fs/promises";
import { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import ts from 'typescript';

export async function resolveTailwindConfig(filename: string) {
    let tailwindConfig: Config;

    if (filename.endsWith('.ts')) {
        const input = await readFile(filename, "utf-8");
        const { outputText } = ts.transpileModule(input, {
            compilerOptions: {
                module: ts.ModuleKind.CommonJS
            }
        });

        tailwindConfig = eval(outputText);
    } else {
        tailwindConfig = require(filename);
    }

    return resolveConfig(tailwindConfig);
}
