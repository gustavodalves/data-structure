import { LinkedList } from './linked-list';

function initTest() {
    const linkedList = new LinkedList<string>();
    linkedList.append('Gustavo');
    linkedList.append('Americo');
    linkedList.append('Amo');
    linkedList.insert('Amero');

    return linkedList;
}

describe('Linked List', () => {
    it('should be create', () => {
        const linkedList = initTest();

        expect(linkedList.count).toBe(4);
    });

    it('should be able append item', () => {
        const linkedList = initTest();
        const test = 'Lucas';

        linkedList.append(test);

        expect(linkedList.tail?.data).toBe(test);
    });

    it('should be able insert item', () => {
        const linkedList = initTest();
        const test = 'Lucas';

        linkedList.insert(test);

        expect(linkedList.head?.data).toBe(test);
    });

    it('should be able remove head', () => {
        const linkedList = initTest();

        linkedList.removeHead();

        expect(linkedList.head?.data).toBe('Gustavo');
    });

    it('should be able remove tail', () => {
        const linkedList = initTest();

        linkedList.removeTail();

        expect(linkedList.tail?.data).toBe('Americo');
    });

    it('should be able remove any node by node data', () => {
        const linkedList = initTest();
        linkedList.append('Tinowns');
        linkedList.append('Robo');

        expect(linkedList.removeNode('Tinowns')?.data).toBe('Tinowns');
    });
});
