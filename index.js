#!/usr/bin/env node
const argv = require('yargs')
    .usage('Usage: tw2php [options]')
    .describe('o', 'Output file.')
    .describe('c', 'Tailwind config file.')
    .alias('o', 'output')
    .alias('c', 'config')
    .default('output', 'tailwind.config.php')
    .default('config', 'tailwind.config.js')
    .string(['o', 'c'])
    .argv;
const path = require('path');

const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require(path.normalize(`${process.cwd()}/${argv.config}`));
const fs = require('fs');

const fullConfig = resolveConfig(tailwindConfig);

function objectToPhpObjectArray (obj, depth = 0) {
    const indent = '    ';
    let arr = `(object) [\n`;

    for (const key in obj) {
        let value = obj[key] == null || typeof obj[key] === 'function' ? null : obj[key];
        let str;

        if (value && typeof value === 'object') {
            str = objectToPhpObjectArray(value, depth + 1);
        } else {
            str = JSON.stringify(value);
        }
        
        arr += `${indent.repeat(depth + 1)}'${key}' => ${str},\n`;
    }

    arr += `${indent.repeat(depth)}]`;

    return arr;
}

fs.writeFileSync(argv.output, `<?php\nreturn ${objectToPhpObjectArray(fullConfig)};`);

console.log('Tailwind config written to ' + argv.output);