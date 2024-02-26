import { HashTable } from './hash-table';

describe('HashTable', () => {
    let hashTable: HashTable<string, number> | null;

    beforeEach(() => {
        hashTable = new HashTable<string, number>(10);
        hashTable.put('a', 1);
        hashTable.put('b', 2);
        hashTable.put('c', 3);
    });

    afterEach(() => {
        hashTable = null;
    });

    it('should return correct value for keys that exist in the table', () => {
        expect(hashTable?.get('a')).toEqual(1);
        expect(hashTable?.get('b')).toEqual(2);
        expect(hashTable?.get('c')).toEqual(3);
    });

    it('should return undefined for keys that do not exist in the table', () => {
        expect(hashTable?.get('d')).toBeUndefined();
    });

    it('should remove key-value pairs from the table', () => {
        hashTable?.remove('b');
        expect(hashTable?.get('b')).toBeUndefined();
    });

    it('should handle collision gracefully', () => {
        hashTable?.put('k', 4);
        expect(hashTable?.get('c')).toEqual(3);
        expect(hashTable?.get('k')).toEqual(4);
    });
});
