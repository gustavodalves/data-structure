class DoublyLinkedListNode<T> {
    constructor(
        readonly data: T,
        public next: DoublyLinkedListNode<T> | null,
        public previous: DoublyLinkedListNode<T> | null
    ) {}
}

export class DoublyLinkedList<T> {
    public count = 0;
    head: DoublyLinkedListNode<T> | null = null;
    tail: DoublyLinkedListNode<T> | null = null;

    insert(data: T) {
        const node = new DoublyLinkedListNode(
            data,
            this.head,
            null,
        );

        if(this.count === 0) {
            this.tail = node;
        } else {
            if(this.head) {
                this.head.previous = node;
            }
        }

        this.head = node;
        this.count++;
    }

    append(data: T) {
        const node = new DoublyLinkedListNode(
            data,
            null,
            this.tail,
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

    insertAfter(data: T, nodeData: T) {
        const nodeToInsert = this.getNode(nodeData);

        if(!nodeToInsert) {
            throw new Error('s');
        }

        const { next } = nodeToInsert;

        const node = new DoublyLinkedListNode(
            data,
            next,
            nodeToInsert,
        );

        if(nodeToInsert.next) {
            nodeToInsert.next.previous = node;
        }

        nodeToInsert.next = node;
        this.count++;
    }

    insertBefore(data: T, nodeData: T) {
        const nodeToInsert = this.getNode(nodeData);

        if(!nodeToInsert) {
            throw new Error('Not found');
        }

        if(nodeToInsert === this.head) {
            this.insert(data);
        }

        const { previous } = nodeToInsert;

        const node = new DoublyLinkedListNode(
            data,
            nodeToInsert,
            previous,
        );

        if(nodeToInsert.previous) {
            nodeToInsert.previous.next = node;
        }

        nodeToInsert.previous = node;
        this.count++;
    }

    removeHead() {
        const remove = this.head;

        if(!remove) {
            throw new Error('');
        }

        if(this.head == this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head?.next || null;
            if(this.head) {
                this.head.previous = this.tail;
            }

            if(this.tail) {
                this.tail.next = this.head;
            }
        }

        remove.next = null;
        remove.previous = null;

        return remove;
    }

    getNode(value: T) {
        let node: DoublyLinkedListNode<T> | null = this.head;

        while(node !== null) {
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

    printReverse() {
        let temp = this.tail;

        while(temp !== null) {
            console.log(temp.data);
            temp = temp.previous;
        }
    }
}
