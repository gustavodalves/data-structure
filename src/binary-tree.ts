export class Leaf<T> {
    public left: null | Leaf<T>;
    public right: null | Leaf<T>;

    constructor(public value: T) {
        this.left = null;
        this.right = null;
    }
}

export class BinaryTree<T> {
    private root: null | Leaf<T>;

    constructor() {
        this.root = null;
    }

    insert(value: T): void {
        this.root = this.insertRecursive(this.root, value);
    }

    private insertRecursive(node: null | Leaf<T>, value: T): Leaf<T> {
        if (node === null) {
            return new Leaf(value);
        }

        if (value < node.value) {
            node.left = this.insertRecursive(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertRecursive(node.right, value);
        }

        return node;
    }

    inOrderTraversal(): T[] {
        const result: T[] = [];
        this.inOrderRecursive(this.root, result);
        return result;
    }

    private inOrderRecursive(node: null | Leaf<T>, result: T[]): void {
        if (node !== null) {
            this.inOrderRecursive(node.left, result);
            result.push(node.value);
            this.inOrderRecursive(node.right, result);
        }
    }
}
