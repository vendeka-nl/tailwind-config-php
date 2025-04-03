import { Format } from '../types/format';
import { mapToPhp } from './mapToPhp';

export function convertToPhp<
    TObject extends Record<string, unknown> = Record<string, unknown>,
>(
    obj: TObject,
    format: Format = 'object',
    indentation: string | number = 4,
    depth = 0,
): string {
    const indent =
        typeof indentation === 'string' ? indentation : ' '.repeat(indentation);
    const mapped = Object.entries(obj)
        .map(
            ([key, value]) =>
                `${indent.repeat(depth + 1)}'${key}' => ${mapToPhp(
                    value,
                    format,
                    indent,
                    depth + 1,
                )},`,
        )
        .join('\n');

    return `${format === 'object' ? `(object) ` : ''}[${
        mapped.length > 0 ? `\n${mapped}\n${indent.repeat(depth)}` : ''
    }]`;
}
