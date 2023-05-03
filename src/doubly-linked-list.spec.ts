import { DoublyLinkedList } from './doubly-linked-list';

function initTest() {
    const linkedList = new DoublyLinkedList<string>();
    linkedList.append('Gustavo');
    linkedList.append('Americo');
    linkedList.append('Amo');
    linkedList.insert('Amero');

    return linkedList;
}

describe('Doubly Linked List', () => {
    it('should be able insert', () => {
        const doublyLinkedList = initTest();

        doublyLinkedList.insert('Leonardo');

        expect(doublyLinkedList.head?.data).toBe('Leonardo');
        expect(doublyLinkedList.head?.next?.data).toBe('Amero');
    });
});
