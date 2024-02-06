class BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[];

    constructor(keys: T[] = [], children: BTreeNode<T>[] = []) {
        this.keys = keys;
        this.children = children;
    }
}

export class BTree<T> {
    root: BTreeNode<T> | null;
    order: number;

    constructor(order: number) {
        this.root = null;
        this.order = order;
    }

    insert(key: T): void {
        if (this.root === null) {
            this.root = new BTreeNode([key]);
        } else {
            this._insert(this.root, key);
        }
    }

    private _insert(node: BTreeNode<T>, key: T): void {
        if (node.children.length === 0) {
            node.keys.push(key);
            node.keys.sort((a, b) => (a < b ? -1 : 1));
        } else {
            const index = this.findIndexToInsert(node, key);
            this._insert(node.children[index], key);
        }

        if (node.keys.length >= this.order) {
            this.split(node);
        }
    }

    private findIndexToInsert(node: BTreeNode<T>, key: T): number {
        for (let i = 0; i < node.keys.length; i++) {
            if (key < node.keys[i]) {
                return i;
            }
        }
        return node.keys.length;
    }

    private split(node: BTreeNode<T>): void {
        const middleIndex = Math.floor(node.keys.length / 2);
        const leftKeys = node.keys.slice(0, middleIndex);
        const rightKeys = node.keys.slice(middleIndex + 1);
        const middleKey = node.keys[middleIndex];

        const leftChildren = node.children.slice(0, middleIndex + 1);
        const rightChildren = node.children.slice(middleIndex + 1);

        const newLeftNode = new BTreeNode(leftKeys, leftChildren);
        const newRightNode = new BTreeNode(rightKeys, rightChildren);

        node.keys = [middleKey];
        node.children = [newLeftNode, newRightNode];
    }

    search(key: T): boolean {
        return this._search(this.root, key);
    }

    private _search(node: BTreeNode<T> | null, key: T): boolean {
        if (node === null) {
            return false;
        }

        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        if (i < node.keys.length && key === node.keys[i]) {
            return true;
        } else if (node.children.length === 0) {
            return false;
        } else {
            return this._search(node.children[i], key);
        }
    }

    remove(key: T): void {
        if (this.root === null) {
            return;
        }

        this.root = this._remove(this.root, key);

        if (this.root.keys.length === 0 && this.root.children.length > 0) {
            this.root = this.root.children[0];
        }
    }

    private _remove(node: BTreeNode<T>, key: T): BTreeNode<T> {
        const index = this.findIndexToRemove(node, key);

        if (index < node.keys.length && key === node.keys[index]) {
            if (node.children.length === 0) {
                node.keys.splice(index, 1);
            } else {
                const predecessor = this.findPredecessor(node.children[index]);
                node.keys[index] = predecessor;
                node.children[index] = this._remove(node.children[index], predecessor);
            }
        } else {
            if (node.children.length === 0) {
                return node;
            }

            const child = this._remove(node.children[index], key);

            if (child.keys.length < Math.floor(this.order / 2)) {
                return this.adjustChild(node, index, child);
            } else {
                node.children[index] = child;
            }
        }

        return node;
    }

    private findIndexToRemove(node: BTreeNode<T>, key: T): number {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }
        return i;
    }

    private findPredecessor(node: BTreeNode<T>): T {
        while (node.children.length > 0) {
            node = node.children[node.children.length - 1];
        }
        return node.keys[node.keys.length - 1];
    }

    private adjustChild(parent: BTreeNode<T>, index: number, child: BTreeNode<T>): BTreeNode<T> {
        const leftSiblingIndex = index - 1;
        const rightSiblingIndex = index + 1;

        if (leftSiblingIndex >= 0 && parent.children[leftSiblingIndex].keys.length > Math.floor(this.order / 2)) {
            const leftSibling = parent.children[leftSiblingIndex];
            const borrowedKey = leftSibling.keys.pop() as T;
            const borrowedChild = leftSibling.children.pop() as BTreeNode<T>;

            child.keys.unshift(parent.keys[index - 1]);
            parent.keys[index - 1] = borrowedKey;
            child.children.unshift(borrowedChild);
        } else if (rightSiblingIndex < parent.children.length && parent.children[rightSiblingIndex].keys.length > Math.floor(this.order / 2)) {
            const rightSibling = parent.children[rightSiblingIndex];
            const borrowedKey = rightSibling.keys.shift() as T;
            const borrowedChild = rightSibling.children.shift() as BTreeNode<T>;

            child.keys.push(parent.keys[index]);
            parent.keys[index] = borrowedKey;
            child.children.push(borrowedChild);
        } else {
            if (leftSiblingIndex >= 0) {
                const leftSibling = parent.children[leftSiblingIndex];
                leftSibling.keys.push(parent.keys.splice(leftSiblingIndex, 1)[0]);
                leftSibling.keys = leftSibling.keys.concat(child.keys);
                leftSibling.children = leftSibling.children.concat(child.children);
                parent.children.splice(index, 1);
            } else {
                const rightSibling = parent.children[rightSiblingIndex];
                rightSibling.keys.unshift(parent.keys.splice(index, 1)[0]);
                rightSibling.keys = rightSibling.keys.concat(child.keys);
                rightSibling.children = rightSibling.children.concat(child.children);
                parent.children.splice(index, 1);
            }
        }

        return parent;
    }
}
