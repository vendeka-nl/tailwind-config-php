"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterObject = void 0;
function filterObject(obj, keys) {
    const output = {};
    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            output[key] = obj[key];
        }
        else if (key.includes('.')) {
            const parts = key.split('.');
            let o = obj;
            let i;
            for (i = 0; i < parts.length; i++) {
                const k = parts[i];
                if (o.hasOwnProperty(k)) {
                    o = o[k];
                }
            }
            if (o !== undefined && i === parts.length) {
                let out = output;
                for (let j = 0; j < parts.length; j++) {
                    const l = parts[j];
                    if (!out.hasOwnProperty(l)) {
                        out[l] = j === parts.length - 1 ? o : {};
                    }
                    out = out[l];
                }
            }
        }
    });
    return output;
}
exports.filterObject = filterObject;
;
