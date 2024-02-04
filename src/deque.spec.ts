import { Deque } from '../src/deque';

describe('Deque', () => {
    it('should insert and remove elements', () => {
        const deque = new Deque<number>(5);

        deque.insertFront(1);
        deque.insertBack(2);
        deque.insertFront(3);
        deque.insertBack(4);

        expect(deque.removeFront()).toBe(3);
        expect(deque.removeBack()).toBe(4);
        expect(deque.count).toBe(2);
        expect(deque.isEmpty()).toBe(false);

        deque.insertFront(5);
        deque.insertBack(6);

        expect(deque.removeFront()).toBe(5);
        expect(deque.removeBack()).toBe(6);
        expect(deque.isEmpty()).toBe(true);
    });

    it('should throw error on empty deque', () => {
        const deque = new Deque<string>(3);

        expect(() => deque.removeFront()).toThrow('Deque is empty');
        expect(() => deque.removeBack()).toThrow('Deque is empty');
    });

    it('should throw error on full deque', () => {
        const deque = new Deque<number>(2);

        deque.insertFront(1);
        deque.insertBack(2);

        expect(() => deque.insertFront(3)).toThrow('Deque is full');
        expect(() => deque.insertBack(4)).toThrow('Deque is full');
    });
});
