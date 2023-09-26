export function filterObject(obj: Record<string, any>, keys: string[]): Record<string, any> {
    const output: Record<string, any> = {};

    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            output[key] = obj[key];

            return;
        }

        if (!key.includes('.')) {
            return;
        }

        const parts = key.split('.');
        let i: number = 0;

        const o: Record<string, any> | undefined = parts.reduce((previousValue: Record<string, any> | undefined, part: string) => {
            if (previousValue?.hasOwnProperty(part)) {
                i++;

                return previousValue[part];
            }
        }, obj);

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

    return output;
};
