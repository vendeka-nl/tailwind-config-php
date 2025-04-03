#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { Format } from './types/format';
import { writeTailwindConfigToPhp } from './utils/writeTailwindConfigToPhp';

(async function (): Promise<void> {
    const argv = await yargs(process.argv.slice(2))
        .usage('Usage: tw2php')
        .help('help')
        .describe('config', 'Path to a config file')
        .alias('config', 'c')
        .describe('output', 'Path to the output file')
        .default('output', 'tailwind.config.php')
        .alias('output', 'o')
        .describe('properties', 'List of included properties')
        .alias('properties', 'p')
        .describe('format', 'Output format of the resolved configuration')
        .choices('format', ['array', 'object'])
        .default('format', 'object')
        .string(['c', 'o'])
        .array(['p']).argv;

    try {
        await writeTailwindConfigToPhp({
            config: argv.config as string | undefined,
            output: argv.output,
            properties: argv.properties as string[] | undefined,
            format: argv.format as Format | undefined,
        });

        console.log(`Tailwind config written to ${argv.output}`);
    } catch (e) {
        console.error((e as Error).message);
    }
})();
