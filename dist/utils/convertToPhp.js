"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToPhp = void 0;
function mapToPhp(value, depth, indent) {
    if (typeof value === 'undefined' || typeof value === 'function') {
        return null;
    }
    if (Array.isArray(value)) {
        return `[${value.map((v) => {
            const x = mapToPhp(v, depth, indent);
            return `${indent.repeat(depth)}${x}\n`;
        })}]`;
    }
    return typeof value === 'object' && !Array.isArray(value)
        ? convertToPhp(value, depth).trimEnd()
        : JSON.stringify(value);
}
function convertToPhp(obj, depth = 0) {
    const indent = ' '.repeat(4);
    return `(object) [\n${Object.entries(obj)
        .map(([key, value]) => `${indent.repeat(depth + 3)}'${key}' => ${mapToPhp(value, depth + 1, indent)},`)
        .join('\n')}\n]\n`;
}
exports.convertToPhp = convertToPhp;
;
