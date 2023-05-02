import { Queue } from './queue';

function initTest() {
    const queue = new Queue<string>(12);
    queue.enqueue('Gustavo');
    queue.enqueue('Fernando');
    queue.enqueue('Paulo');
    queue.enqueue('Americo');

    return queue;
}

describe('Queue', () => {
    it('should be able enqueue', () => {
        const queue = initTest();

        expect(queue.values).toHaveLength(4);
    });

    it('should be able dequeue', () => {
        const queue = initTest();
        const element = queue.dequeue();

        expect(queue.values).toHaveLength(3);
        expect(element).toBe('Gustavo');
        expect(queue.front).toBe('Fernando');
    });

    it('should be able clear queue', () => {
        const queue = initTest();
        queue.clear();

        expect(queue.values).toHaveLength(0);
    });
});
