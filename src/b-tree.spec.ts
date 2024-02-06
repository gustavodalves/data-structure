import { BTree } from './b-tree';

describe('BTree', () => {
    let bTree: BTree<number>;

    beforeEach(() => {
        bTree = new BTree<number>(3);
    });

    it('should insert and maintain B-tree properties', () => {
        bTree.insert(5);
        expect(bTree.root?.keys).toEqual([5]);

        bTree.insert(10);
        expect(bTree.root?.keys).toEqual([5, 10]);

        bTree.insert(3);
        expect(bTree.root?.keys).toEqual([3, 5, 10]);

        bTree.insert(8);
        expect(bTree.root?.keys).toEqual([5]);

        bTree.insert(12);
        expect(bTree.root?.keys).toEqual([5, 10, 12]);
    });

    it('should search for keys in B-tree', () => {
        bTree.insert(5);
        bTree.insert(10);
        bTree.insert(3);
        bTree.insert(8);
        bTree.insert(12);

        expect(bTree.search(5)).toBeTruthy();
        expect(bTree.search(8)).toBeTruthy();
        expect(bTree.search(12)).toBeTruthy();
        expect(bTree.search(2)).toBeFalsy();
        expect(bTree.search(7)).toBeFalsy();
    });

    it('should remove keys from B-tree', () => {
        bTree.insert(5);
        bTree.insert(10);
        bTree.insert(3);
        bTree.insert(8);
        bTree.insert(12);

        bTree.remove(8);
        expect(bTree.root?.keys).toEqual([5, 10, 12]);
        expect(bTree.search(8)).toBeFalsy();

        bTree.remove(5);
        expect(bTree.root?.keys).toEqual([10, 12]);
        expect(bTree.search(5)).toBeFalsy();

        bTree.remove(12);
        expect(bTree.root?.keys).toEqual([10]);
        expect(bTree.search(12)).toBeFalsy();
    });
});
