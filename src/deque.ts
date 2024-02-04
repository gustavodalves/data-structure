import { Stack } from './stack';

export class Deque<T> {
    private readonly stackFront: Stack<T>;
    private readonly stackBack: Stack<T>;
    private readonly capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.stackFront = new Stack<T>(capacity);
        this.stackBack = new Stack<T>(capacity);
    }

    insertFront(item: T): void {
        this.checkCapacity();
        this.stackFront.push(item);
    }

    insertBack(item: T): void {
        this.checkCapacity();
        this.stackBack.push(item);
    }

    removeFront(): T | undefined {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }

        if (this.stackFront.isEmpty()) {
            this.transferElements();
        }

        return this.stackFront.pop();
    }

    removeBack(): T | undefined {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }

        if (this.stackBack.isEmpty()) {
            this.transferElements();
        }

        return this.stackBack.pop();
    }

    get count(): number {
        return this.stackFront.size() + this.stackBack.size();
    }

    private checkCapacity(): void {
        if (this.capacity > 0 && this.count === this.capacity) {
            throw new Error('Deque is full');
        }
    }

    private transferElements(): void {
        while (!this.stackFront.isEmpty()) {
            this.stackBack.push(this.stackFront.pop());
        }
    }

    isEmpty(): boolean {
        return this.count === 0;
    }
}
