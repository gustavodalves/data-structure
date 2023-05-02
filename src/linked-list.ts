class Node<T> {
    constructor(readonly data: T, public next: Node<T> | null) {}
}

export class LinkedList<T> {
    public count = 0;
    head: Node<T> | null = null;
    tail: Node<T> | null = null;

    insert(data: T) {
        const node = new Node<T>(
            data,
            this.head
        );

        if(this.count === 0) {
            this.tail = node;
        }

        this.head = node;
        this.count++;
    }

    append(data: T) {
        const node = new Node<T>(
            data,
            null
        );

        if(this.count === 0) {
            this.head = node;
            this.tail = node;
        } else {
            if(this.tail) {
                this.tail.next = node;
            }
            this.tail = node;
        }

        this.count++;

    }

    removeHead() {
        const remove = this.head;

        if(remove !== this.tail) {
            if(this.head) {
                this.head = this.head?.next;
            }
        }

        this.count--;
        return remove;
    }

    removeTail() {
        let remove: Node<T> | null = this.head;
        let previous: Node<T> | null = null;

        if(this.count === 1) {
            this.removeHead();
        }

        while(remove !== this.tail) {
            previous = remove;
            remove = remove?.next || null;
        }

        if(previous) {
            previous.next = null;
        }

        this.tail = previous;

        this.count--;
        return remove;

    }

    removeNode(element: T) {
        let remove: Node<T> | null = this.head;
        let previous: Node<T> | null = null;

        while(remove !== null && remove.data !== element) {
            previous = remove;
            remove = remove.next;
        }

        if(remove === null) {
            return null;
        } else if(remove === this.head) {
            return this.removeHead();
        } else if(remove === this.tail) {
            return this.removeTail();
        } else {
            if(previous) {
                this.count--;
                previous.next = remove.next;

                return remove;
            }
        }
    }

    getNode(value: T) {
        let node = this.head;
        while(node!==null) {
            if(node.data === value) {
                return node;
            }

            node = node.next;
        }

        return null;
    }

    print() {
        let temp = this.head;

        while(temp !== null) {
            console.log(temp.data);
            temp = temp.next;
        }
    }
}
