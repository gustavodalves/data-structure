export class Stack<T> {
    private count = 0;
    private readonly _values: T[] = [];

    constructor(
        private readonly capacity: number
    ) {}

    get values(): T[] {
        return this._values;
    }

    get top() {
        if(this.isEmpty()) {
            throw new Error('Stack OverFlow');
        }

        return this.values[this.count - 1];
    }

    push(element: T): T {
        if(this.count === this.capacity) {
            throw new Error('Stack OverFlow');
        }

        this.values[this.count] = element;
        this.count++;

        return element;
    }

    pop(): T {
        if(this.isEmpty()) {
            throw new Error('Stack OverFlow');
        }

        const temp: T = this.values[this.count - 1];
        this.values.length = this.count - 1;
        this.count--;

        return temp;
    }

    isEmpty() {
        return this.count === 0;
    }

    size(): number {
        return this.capacity;
    }

    clear() {
        while(!this.isEmpty()) {
            this.pop();
        }
    }
}
