import { convertToPhp } from './convertToPhp';
import { mapToPhp } from './mapToPhp';

jest.mock('./mapToPhp');

describe('convertToPhp', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should convert an empty object to an empty PHP object', () => {
        const result = convertToPhp({}, 4);
        expect(result).toBe('(object) []');
    });

    it('should convert a simple object to a PHP object with proper indentation', () => {
        (mapToPhp as jest.Mock).mockImplementation((value) => `'${value}'`);
        const obj = { key: 'value' };
        const result = convertToPhp(obj, 2);
        expect(result).toBe("(object) [\n  'key' => 'value',\n]");
    });

    it('should handle nested objects correctly', () => {
        (mapToPhp as jest.Mock).mockImplementation((value) => {
            if (typeof value === 'object') {
                return '(object) []';
            }
            return `'${value}'`;
        });
        const obj = { key: { nestedKey: 'nestedValue' } };
        const result = convertToPhp(obj, 2);
        expect(result).toBe("(object) [\n  'key' => (object) [],\n]");
    });

    it('should use string indentation if provided', () => {
        (mapToPhp as jest.Mock).mockImplementation((value) => `'${value}'`);
        const obj = { key: 'value' };
        const result = convertToPhp(obj, '\t');
        expect(result).toBe("(object) [\n\t'key' => 'value',\n]");
    });

    it('should handle an object with multiple keys', () => {
        (mapToPhp as jest.Mock).mockImplementation((value) => `'${value}'`);
        const obj = { key1: 'value1', key2: 'value2' };
        const result = convertToPhp(obj, 2);
        expect(result).toBe(
            "(object) [\n  'key1' => 'value1',\n  'key2' => 'value2',\n]",
        );
    });
});
