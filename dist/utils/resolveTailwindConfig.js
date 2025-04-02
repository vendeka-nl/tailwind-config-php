"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTailwindConfig = resolveTailwindConfig;
const node_path_1 = require("node:path");
const resolveConfig_1 = __importDefault(require("tailwindcss/resolveConfig"));
const ts_node_1 = require("ts-node");
async function resolveTailwindConfig(filename) {
    if ((0, node_path_1.extname)(filename) === '.ts') {
        (0, ts_node_1.register)();
    }
    const tailwindConfig = require(filename);
    return (0, resolveConfig_1.default)(tailwindConfig);
}
