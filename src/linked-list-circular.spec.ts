import { LinkedListCircular } from './linked-list-circular';

function initTest() {
    const linkedList = new LinkedListCircular<string>();
    linkedList.append('Gustavo');
    linkedList.append('Americo');
    linkedList.append('Amo');
    linkedList.insert('Amero');

    return linkedList;
}

describe('Linked List Circular', () => {
    it('should be able append', () => {
        const linkedList = initTest();

        linkedList.append('OO');

        expect(linkedList.tail?.data).toBe('OO');
        expect(linkedList.tail?.next).toBe(linkedList.head);
    });

    it('should be able insert', () => {
        const linkedList = initTest();

        linkedList.insert('Derek');

        expect(linkedList.tail?.next?.data).toBe('Derek');
        expect(linkedList.head?.data).toBe('Derek');
    });
});
