export function filterObject(obj: any, keys: string[]): Record<string, any> {
    const output: Record<string, any> = {};

    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            output[key] = obj[key];
        } else if (key.includes('.')) {
            const parts = key.split('.');
            let o: any = obj;
            let i: number;

            for (i = 0; i < parts.length; i++) {
                const k = parts[i];

                if (o.hasOwnProperty(k)) {
                    o = o[k];
                }
            }

            if (o !== undefined && i === parts.length) {
                let out: any = output;

                for (let j = 0; j < parts.length; j++) {
                    const l: string = parts[j];

                    if (!out.hasOwnProperty(l)) {
                        out[l] = j === parts.length - 1 ? o : {};
                    }

                    out = out[l];
                }
            }
        }
    });

    return output;
};
