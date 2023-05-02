import { Stack } from './stack';

export class Queue<T> {
    private count = 0;

    private readonly stack1: Stack<T>;
    private readonly stack2: Stack<T>;

    constructor(
        private readonly capacity: number

    ) {
        this.stack1 = new Stack<T>(this.capacity);
        this.stack2 = new Stack<T>(this.capacity);
    }

    get values() {
        return this.stack1.values;
    }

    get front() {
        return this.stack1.top;
    }

    enqueue(element: T) {
        if (this.count == this.capacity)
        {
            return false;
        }

        while (!this.stack1.isEmpty()) {
            this.stack2.push(this.stack1.top);
            this.stack1.pop();
        }

        this.stack1.push(element);

        while (!this.stack2.isEmpty()) {
            this.stack1.push(this.stack2.top);
            this.stack2.pop();
        }

        this.count++;
        return true;
    }

    dequeue(): T {
        const temp = this.stack1.top;
        this.stack1.pop();
        this.count--;

        return temp;
    }

    isEmpty() {
        return this.count === 0;
    }

    clear() {
        while(!this.isEmpty()) {
            this.dequeue();
        }
    }
}
