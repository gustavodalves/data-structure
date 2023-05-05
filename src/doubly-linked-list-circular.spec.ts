import { DoublyLinkedListCircular } from './doubly-linked-list-circular';

function initTest() {
    const linkedList = new DoublyLinkedListCircular<string>();
    linkedList.append('Gustavo');
    linkedList.append('Americo');
    linkedList.append('Amo');
    linkedList.insert('Amero');

    return linkedList;
}

describe('Doubly Linked List Circular', () => {
    it('should be able insert', () => {
        const doublyLinkedList = initTest();

        doublyLinkedList.insert('Leonardo');

        expect(doublyLinkedList.head?.data).toBe('Leonardo');
        expect(doublyLinkedList.head?.previous?.data).toBe('Amo');
        expect(doublyLinkedList.tail?.next?.data).toBe('Leonardo');
    });
});
