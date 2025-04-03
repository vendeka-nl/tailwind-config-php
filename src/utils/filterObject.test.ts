import { describe, expect, it } from '@jest/globals';
import { filterObject } from './filterObject';

describe('filterObject', () => {
    it('should filter top-level keys from the object', () => {
        const input = { a: 1, b: 2, c: 3 };
        const keys = ['a', 'c'];
        const result = filterObject(input, keys);
        expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should handle nested keys and return the correct structure', () => {
        const input = { a: { b: { c: 3 } }, d: 4 };
        const keys = ['a.b.c'];
        const result = filterObject(input, keys);
        expect(result).toEqual({ a: { b: { c: 3 } } });
    });

    it('should ignore keys that do not exist in the object', () => {
        const input = { a: 1, b: 2 };
        const keys = ['c', 'd'];
        const result = filterObject(input, keys);
        expect(result).toEqual({});
    });

    it('should handle a mix of existing and non-existing keys', () => {
        const input = { a: 1, b: 2, c: { d: 4 } };
        const keys = ['a', 'c.d', 'e'];
        const result = filterObject(input, keys);
        expect(result).toEqual({ a: 1, c: { d: 4 } });
    });

    it('should return an empty object if no keys are provided', () => {
        const input = { a: 1, b: 2 };
        const keys: string[] = [];
        const result = filterObject(input, keys);
        expect(result).toEqual({});
    });

    it('should handle deeply nested keys correctly', () => {
        const input = { a: { b: { c: { d: 5 } } }, e: 6 };
        const keys = ['a.b.c.d'];
        const result = filterObject(input, keys);
        expect(result).toEqual({ a: { b: { c: { d: 5 } } } });
    });
});
