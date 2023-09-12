
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
        return `${indent.repeat(depth + 3)}'${key}' => ${mapToPhp(value, depth + 3, indent)},\n`;
    });

    return [
        `new class\n`,
        `{\n`,
        `${indent.repeat(depth + 1)}protected array $data;\n`,
        '\n',
        `${indent.repeat(depth + 1)}public function __construct()\n`,
        `${indent.repeat(depth + 1)}{\n`,
        `${indent.repeat(depth + 2)}$this->data = [\n`,
        ...arrayItems,
        `${indent.repeat(depth + 2)}];\n`,
        `${indent.repeat(depth + 1)}}\n`,
        '\n',
        `${indent.repeat(depth + 1)}public function __get(mixed $x): mixed {\n`,
        `${indent.repeat(depth + 2)}return $this->data[$x];\n`,
        `${indent.repeat(depth + 1)}}\n`,
        '\n',
        `${indent.repeat(depth + 1)}public function __isset(mixed $x): bool {\n`,
        `${indent.repeat(depth + 2)}return isset($this->data[$x]);\n`,
        `${indent.repeat(depth + 1)}}\n`,
        `${indent.repeat(depth)}}\n`,
    ].join('');
};
