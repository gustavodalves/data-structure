import { LinkedList } from './linked-list';

class LinkedListCircularNode<T> {
    constructor(readonly data: T, public next: LinkedListCircularNode<T> | null) {}
}

export class LinkedListCircular<T> extends LinkedList<T> {
    public count = 0;
    head: LinkedListCircularNode<T> | null = null;
    tail: LinkedListCircularNode<T> | null = null;

    insert(data: T): void {
        const node = new LinkedListCircularNode<T>(
            data,
            this.head
        );

        if(this.count === 0) {
            this.tail = node;
        } else {
            if(this.tail) {
                this.tail.next = node;
            }
        }

        this.head = node;
        this.count++;
    }

    append(data: T): void {
        const node = new LinkedListCircularNode<T>(
            data,
            this.head
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

    print(): void {
        let aux = this.head;

        for(let iterator = 0; iterator < this.count; iterator++) {
            console.log(aux?.data);
            if(aux) {
                aux = aux?.next;
            }
        }
    }
}
