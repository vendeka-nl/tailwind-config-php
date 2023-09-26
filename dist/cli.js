#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const writeTailwindConfigToPhp_1 = require("./utils/writeTailwindConfigToPhp");
(async function () {
    const argv = await (0, yargs_1.default)(process.argv.slice(2))
        .usage('Usage: tw2php')
        .help('help')
        .describe('config', 'Path to a config file')
        .alias('config', 'c')
        .describe('output', 'Path to the output file')
        .default('output', 'tailwind.config.php')
        .alias('output', 'o')
        .describe('properties', 'List of included properties')
        .alias('properties', 'p')
        .string(['c', 'o'])
        .array(['p'])
        .alias('v', 'version')
        .argv;
    try {
        await (0, writeTailwindConfigToPhp_1.writeTailwindConfigToPhp)(argv);
        console.log(`Tailwind config written to ${argv.output}`);
    }
    catch (e) {
        console.error(e.message);
    }
})();
