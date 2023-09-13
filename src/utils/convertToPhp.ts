
function mapToPhp(value: any, depth: number, indent: string): string {
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

export function convertToPhp(obj: Record<string, any>, depth = 0): string {
    const indent: string = ' '.repeat(4);

    const arrayItems: string[] = Object.entries(obj).map(([key, value]) => {
        return `${indent.repeat(depth + 3)}'${key}' => ${mapToPhp(value, depth + 1, indent)},\n`;
    });

    return [
        `(object) [\n`,
        ...arrayItems,
        `]\n`,
    ].join('');
};
