"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTailwindConfigToPhp = void 0;
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const prettier_1 = require("prettier");
const resolveTailwindConfig_1 = require("./resolveTailwindConfig");
const filterObject_1 = require("./filterObject");
const convertToPhp_1 = require("./convertToPhp");
async function writeTailwindConfigToPhp(options) {
    let tailwindConfigFile;
    if (options.config) {
        tailwindConfigFile = (0, node_path_1.normalize)(`${process.cwd()}/${options.config}`);
        if (!(0, node_fs_1.existsSync)(tailwindConfigFile)) {
            throw new Error(`Tailwind CSS config file '${tailwindConfigFile}' not found.`);
        }
    }
    else {
        tailwindConfigFile = ['tailwind.config.ts', 'tailwind.config.js']
            .map(file => (0, node_path_1.normalize)(`${process.cwd()}/${file}`))
            .find(file => (0, node_fs_1.existsSync)(file));
        if (!tailwindConfigFile) {
            throw new Error('No Tailwind CSS config file detected. Please specify one using the `config` flag.');
        }
    }
    let resolvedConfig = await (0, resolveTailwindConfig_1.resolveTailwindConfig)(tailwindConfigFile);
    if (options.properties?.length) {
        resolvedConfig = (0, filterObject_1.filterObject)(resolvedConfig, options.properties?.map(x => x.split(',')).flat());
    }
    const prettierOptions = {
        ...((await (0, prettier_1.resolveConfig)((0, node_path_1.resolve)(__dirname, '../..'))) || {}),
        parser: "php",
        plugins: ["@prettier/plugin-php"],
    };
    const output = await (0, prettier_1.format)(`<?php\n\nreturn ${(0, convertToPhp_1.convertToPhp)(resolvedConfig)};\n`, prettierOptions);
    await (0, promises_1.writeFile)(options.output, output);
}
exports.writeTailwindConfigToPhp = writeTailwindConfigToPhp;
