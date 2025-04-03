import { describe, expect, it, jest } from '@jest/globals';
import { convertToPhp } from './convertToPhp';
import { mapToPhp } from './mapToPhp';

jest.mock('./convertToPhp');

describe('mapToPhp', () => {
    const indent = ' '.repeat(4);
    const depth = 1;

    it('should return null for undefined values', () => {
        expect(mapToPhp(undefined, indent, depth)).toBeNull();
    });

    it('should return null for function values', () => {
        expect(mapToPhp(() => {}, indent, depth)).toBeNull();
    });

    it('should handle empty arrays', () => {
        expect(mapToPhp([], indent, depth)).toBe('[]');
    });

    it('should handle arrays with primitive values', () => {
        expect(mapToPhp([1, 'test', true], indent, depth)).toBe(
            `[\n${indent}1,\n${indent}"test",\n${indent}true\n]`,
        );
    });

    it('should handle nested arrays', () => {
        expect(mapToPhp([1, [2, [3]]], indent, depth)).toBe(
            `[\n${indent}1,\n${indent}[\n${indent.repeat(2)}2,\n${indent.repeat(
                2,
            )}[\n${indent.repeat(3)}3\n${indent.repeat(2)}]\n${indent}]\n]`,
        );
    });

    it('should handle objects by delegating to convertToPhp', () => {
        (convertToPhp as jest.Mock).mockReturnValue('mockedPhpObject');
        const obj = { key: 'value' };

        expect(mapToPhp(obj, indent, depth)).toBe('mockedPhpObject');
        expect(convertToPhp).toHaveBeenCalledWith(obj, indent, depth);
    });

    it('should handle primitive values', () => {
        expect(mapToPhp(42, indent, depth)).toBe('42');
        expect(mapToPhp('string', indent, depth)).toBe('"string"');
        expect(mapToPhp(true, indent, depth)).toBe('true');
    });
});
