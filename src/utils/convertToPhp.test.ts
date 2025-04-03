import { describe, expect, it, jest } from '@jest/globals';
import { convertToPhp } from './convertToPhp';
import { mapToPhp } from './mapToPhp';

jest.mock('./mapToPhp');

describe('convertToPhp', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should convert an empty object to an empty PHP object or array', () => {
        expect(convertToPhp({}, 'object', 4)).toBe('(object) []');
        expect(convertToPhp({}, 'array', 4)).toBe('[]');
    });

    it('should convert a simple object to a PHP object or array with proper indentation', () => {
        (mapToPhp as jest.Mock).mockImplementation((value) => `'${value}'`);

        const obj = { key: 'value' };

        expect(convertToPhp(obj, 'object', 2)).toBe(
            "(object) [\n  'key' => 'value',\n]",
        );
        expect(convertToPhp(obj, 'array', 2)).toBe("[\n  'key' => 'value',\n]");
    });

    it('should handle nested objects correctly', () => {
        (mapToPhp as jest.Mock).mockImplementation((value, format) => {
            if (typeof value === 'object') {
                return format === 'object' ? '(object) []' : '[]';
            }
            return `'${value}'`;
        });

        const obj = { key: { nestedKey: 'nestedValue' } };

        expect(convertToPhp(obj, 'array', 2)).toBe("[\n  'key' => [],\n]");
        expect(convertToPhp(obj, 'object', 2)).toBe(
            "(object) [\n  'key' => (object) [],\n]",
        );
    });

    it('should use string indentation if provided', () => {
        (mapToPhp as jest.Mock).mockImplementation((value) => `'${value}'`);

        const obj = { key: 'value' };

        expect(convertToPhp(obj, 'array', '\t')).toBe(
            "[\n\t'key' => 'value',\n]",
        );
        expect(convertToPhp(obj, 'object', '\t')).toBe(
            "(object) [\n\t'key' => 'value',\n]",
        );
    });

    it('should handle an object with multiple keys', () => {
        (mapToPhp as jest.Mock).mockImplementation((value) => `'${value}'`);

        const obj = { key1: 'value1', key2: 'value2' };

        expect(convertToPhp(obj, 'array', 2)).toBe(
            "[\n  'key1' => 'value1',\n  'key2' => 'value2',\n]",
        );
        expect(convertToPhp(obj, 'object', 2)).toBe(
            "(object) [\n  'key1' => 'value1',\n  'key2' => 'value2',\n]",
        );
    });
});
