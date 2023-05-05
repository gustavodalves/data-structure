import { DoublyLinkedList } from './doubly-linked-list';

export class DoublyLinkedListCircular<T> extends DoublyLinkedList<T> {
    insert(data: T) {
        const node = super.insert(data);

        node.previous = this.tail;

        if(this.tail) {
            this.tail.next = node;
        }

        return node;
    }

    append(data: T) {
        const node = super.append(data);

        node.next = this.head;

        if(this.head) {
            this.head.previous = node;
        }

        return node;
    }
}
