import { Format } from '../types/format';
import { convertToPhp } from './convertToPhp';

export function mapToPhp(
    value: unknown,
    format: Format,
    indent: string,
    depth: number,
): string | null {
    if (typeof value === 'undefined' || typeof value === 'function') {
        return null;
    }

    if (Array.isArray(value)) {
        const mappedArray = value.map((v) => {
            const mapped = mapToPhp(v, format, indent, depth + 1);

            return mapped?.length ? `\n${indent.repeat(depth)}${mapped}` : '';
        });

        return `[${
            mappedArray.length > 0
                ? `${mappedArray}\n${indent.repeat(Math.max(0, depth - 1))}`
                : ''
        }]`;
    }

    return typeof value === 'object' && !Array.isArray(value)
        ? convertToPhp(
              value as Record<string, unknown>,
              format,
              indent,
              depth,
          ).trimEnd()
        : JSON.stringify(value, undefined, indent);
}
