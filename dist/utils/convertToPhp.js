"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToPhp = convertToPhp;
const mapToPhp_1 = require("./mapToPhp");
function convertToPhp(obj, indentation, depth = 0) {
    const indent = typeof indentation === 'string' ? indentation : ' '.repeat(indentation);
    const mapped = Object.entries(obj)
        .map(([key, value]) => `${indent.repeat(depth + 1)}'${key}' => ${(0, mapToPhp_1.mapToPhp)(value, indent, depth + 1)},`)
        .join('\n');
    return `(object) [${mapped.length > 0 ? `\n${mapped}\n${indent.repeat(depth)}` : ''}]`;
}
