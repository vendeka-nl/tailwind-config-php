"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterObject = void 0;
function filterObject(obj, keys) {
    const output = {};
    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            output[key] = obj[key];
            return;
        }
        if (!key.includes('.')) {
            return;
        }
        const parts = key.split('.');
        let i = 0;
        const o = parts.reduce((previousValue, part) => {
            if (previousValue?.hasOwnProperty(part)) {
                i++;
                return previousValue[part];
            }
        }, obj);
        if (i < parts.length) {
            return;
        }
        let out = output;
        parts.forEach((part, index) => {
            if (!out.hasOwnProperty(part)) {
                out[part] = index === parts.length - 1 ? o : {};
            }
            out = out[part];
        });
    });
    return output;
}
exports.filterObject = filterObject;
;
