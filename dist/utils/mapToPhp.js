"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToPhp = mapToPhp;
const convertToPhp_1 = require("./convertToPhp");
function mapToPhp(value, indent, depth) {
    if (typeof value === 'undefined' || typeof value === 'function') {
        return null;
    }
    if (Array.isArray(value)) {
        const mappedArray = value.map((v) => {
            const mapped = mapToPhp(v, indent, depth + 1);
            return mapped?.length
                ? `\n${indent.repeat(depth)}${mapped}`
                : '';
        });
        return `[${mappedArray.length > 0
            ? `${mappedArray}\n${indent.repeat(Math.max(0, depth - 1))}`
            : ''}]`;
    }
    return typeof value === 'object' && !Array.isArray(value)
        ? (0, convertToPhp_1.convertToPhp)(value, indent, depth).trimEnd()
        : JSON.stringify(value, undefined, indent);
}
