export function filterObject<
    TInput extends Record<string, unknown> = Record<string, unknown>,
    TOutput extends Record<string, unknown> = Record<string, unknown>,
>(obj: TInput, keys: string[]): TOutput {
    const output: Record<string, unknown> = {};

    keys.forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            output[key] = obj[key];

            return;
        }

        if (!key.includes('.')) {
            return;
        }

        const parts = key.split('.');
        let i: number = 0;

        const o: Record<string, any> | undefined = parts.reduce(
            (previousValue: Record<string, any> | undefined, part: string) => {
                if (previousValue?.hasOwnProperty(part)) {
                    i++;

                    return previousValue[part];
                }
            },
            obj,
        );

        if (i < parts.length) {
            return;
        }

        let out: Record<string, any> = output;

        parts.forEach((part, index) => {
            if (!out.hasOwnProperty(part)) {
                out[part] = index === parts.length - 1 ? o : {};
            }

            out = out[part];
        });
    });

    return output as TOutput;
}
