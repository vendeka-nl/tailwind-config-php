"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTailwindConfig = void 0;
const promises_1 = require("fs/promises");
const resolveConfig_1 = __importDefault(require("tailwindcss/resolveConfig"));
const typescript_1 = __importDefault(require("typescript"));
async function resolveTailwindConfig(filename) {
    let tailwindConfig;
    if (filename.endsWith('.ts')) {
        const input = await (0, promises_1.readFile)(filename, "utf-8");
        const { outputText } = typescript_1.default.transpileModule(input, {
            compilerOptions: {
                module: typescript_1.default.ModuleKind.CommonJS
            }
        });
        tailwindConfig = eval(outputText);
    }
    else {
        tailwindConfig = require(filename);
    }
    return (0, resolveConfig_1.default)(tailwindConfig);
}
exports.resolveTailwindConfig = resolveTailwindConfig;
