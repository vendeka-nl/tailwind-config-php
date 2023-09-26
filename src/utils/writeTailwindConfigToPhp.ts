import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { normalize, resolve } from "node:path";
import { Options, format, resolveConfig } from 'prettier';
import { resolveTailwindConfig } from "./resolveTailwindConfig";
import { filterObject } from "./filterObject";
import { convertToPhp } from "./convertToPhp";

export async function writeTailwindConfigToPhp(options: { config?: string, output: string, properties?: Array<string> }): Promise<void> {
    let tailwindConfigFile: string | undefined;

    if (options.config) {
        tailwindConfigFile = normalize(`${process.cwd()}/${options.config}`);

        if (!existsSync(tailwindConfigFile)) {
            throw new Error(`Tailwind CSS config file '${tailwindConfigFile}' not found.`);
        }
    } else {
        tailwindConfigFile = ['tailwind.config.ts', 'tailwind.config.js']
            .map(file => normalize(`${process.cwd()}/${file}`))
            .find(file => existsSync(file));

        if (!tailwindConfigFile) {
            throw new Error('No Tailwind CSS config file detected. Please specify one using the `config` flag.');
        }
    }

    let resolvedConfig = await resolveTailwindConfig(tailwindConfigFile) as Record<string, any>;

    if (options.properties?.length) {
        resolvedConfig = filterObject(resolvedConfig, options.properties?.map(x => x.split(',')).flat());
    }

    const prettierOptions: Options = {
        ...((await resolveConfig(resolve(__dirname, '../..'))) || {}),
        parser: "php",
        plugins: ["@prettier/plugin-php"],
    };

    const output = await format(`<?php\n\nreturn ${convertToPhp(resolvedConfig)};\n`, prettierOptions);

    await writeFile(options.output, output);
}
