import { BinaryTree } from './binary-tree';

describe('BinaryTree', () => {
    it('should perform in-order traversal correctly', () => {
        const binaryTree = new BinaryTree<number>();
        binaryTree.insert(5);
        binaryTree.insert(3);
        binaryTree.insert(7);
        binaryTree.insert(1);
        binaryTree.insert(4);
        binaryTree.insert(6);
        binaryTree.insert(8);

        const inOrderResult = binaryTree.inOrderTraversal();
        const expectedInOrderResult = [1, 3, 4, 5, 6, 7, 8];

        expect(inOrderResult).toEqual(expectedInOrderResult);
    });

    it('should handle insertion of duplicate values', () => {
        const binaryTree = new BinaryTree<number>();
        binaryTree.insert(5);
        binaryTree.insert(3);
        binaryTree.insert(7);
        binaryTree.insert(3);
        binaryTree.insert(1);
        binaryTree.insert(4);
        binaryTree.insert(6);
        binaryTree.insert(8);

        const inOrderResult = binaryTree.inOrderTraversal();
        const expectedInOrderResult = [1, 3, 4, 5, 6, 7, 8];

        expect(inOrderResult).toEqual(expectedInOrderResult);
    });
});
