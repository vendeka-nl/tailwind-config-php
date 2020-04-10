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
const configJson = JSON.stringify(fullConfig);

fs.writeFileSync(argv.output, `<?php
return json_decode('${configJson}');`);

console.log('Tailwind config written to ' + argv.output);