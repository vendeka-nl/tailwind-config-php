import { describe, expect, it, jest } from '@jest/globals';
import { convertToPhp } from './convertToPhp';
import { mapToPhp } from './mapToPhp';

jest.mock('./convertToPhp');

describe('mapToPhp', () => {
    const indent = ' '.repeat(4);
    const depth = 1;

    it('should return null for undefined values', () => {
        expect(mapToPhp(undefined, 'array', indent, depth)).toBeNull();
        expect(mapToPhp(undefined, 'object', indent, depth)).toBeNull();
    });

    it('should return null for function values', () => {
        expect(mapToPhp(() => {}, 'array', indent, depth)).toBeNull();
        expect(mapToPhp(() => {}, 'object', indent, depth)).toBeNull();
    });

    it('should handle empty arrays', () => {
        expect(mapToPhp([], 'array', indent, depth)).toBe('[]');
        expect(mapToPhp([], 'object', indent, depth)).toBe('[]');
    });

    it('should handle arrays with primitive values', () => {
        expect(mapToPhp([1, 'test', true], 'array', indent, depth)).toBe(
            `[\n${indent}1,\n${indent}"test",\n${indent}true\n]`,
        );
        expect(mapToPhp([1, 'test', true], 'object', indent, depth)).toBe(
            `[\n${indent}1,\n${indent}"test",\n${indent}true\n]`,
        );
    });

    it('should handle nested arrays', () => {
        expect(mapToPhp([1, [2, [3]]], 'object', indent, depth)).toBe(
            `[\n${indent}1,\n${indent}[\n${indent.repeat(2)}2,\n${indent.repeat(
                2,
            )}[\n${indent.repeat(3)}3\n${indent.repeat(2)}]\n${indent}]\n]`,
        );
    });

    it('should handle objects by delegating to convertToPhp', () => {
        (convertToPhp as jest.Mock).mockReturnValue('mockedPhpObject');
        const obj = { key: 'value' };

        expect(mapToPhp(obj, 'object', indent, depth)).toBe('mockedPhpObject');
        expect(convertToPhp).toHaveBeenCalledWith(obj, 'object', indent, depth);
    });

    it('should handle primitive values', () => {
        expect(mapToPhp(42, 'object', indent, depth)).toBe('42');
        expect(mapToPhp('string', 'object', indent, depth)).toBe('"string"');
        expect(mapToPhp(true, 'object', indent, depth)).toBe('true');
    });
});
