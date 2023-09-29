function mapToPhp(value: any, indent: string, depth: number): string | null {
    if (typeof value === 'undefined' || typeof value === 'function') {
        return null;
    }

    if (Array.isArray(value)) {
        const mappedArray = value.map((v) => {
            const mapped = mapToPhp(v, indent, depth);

            return mapped?.length ? `\n${indent.repeat(depth + 1)}${mapped}` : '';
        });

        return `[${mappedArray.length > 0 ? `${mappedArray}\n${indent.repeat(depth)}` : ''}]`;
    }

    return typeof value === 'object' && !Array.isArray(value)
        ? convertToPhp(value, indent, depth).trimEnd()
        : JSON.stringify(value, undefined, indent);
}

export function convertToPhp(obj: Record<string, any>, indentation: string | number, depth = 0): string {
    const indent = typeof indentation === 'string' ? indentation : ' '.repeat(indentation);
    const mapped = Object.entries(obj)
        .map(([key, value]) => `${indent.repeat(depth + 1)}'${key}' => ${mapToPhp(value, indent, depth + 1)},`)
        .join('\n');

    return `(object) [${mapped.length > 0 ? `\n${mapped}\n${indent.repeat(depth)}` : ''}]`;
}
