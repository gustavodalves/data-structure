import { Stack } from './stack';

function initTest() {
    const stack = new Stack<string>(12);
    stack.push('Gustavo');
    stack.push('Fernando');
    stack.push('Paulo');
    stack.push('Americo');

    return stack;
}

describe('Queue', () => {
    it('should be able push in stack', () => {
        const stack = initTest();
        stack.push('Thiago');

        expect(stack.values).toHaveLength(5);
        expect(stack.top).toBe('Thiago');
    });

    it('should be able pop in stack', () => {
        const stack = initTest();
        const element = stack.pop();

        expect(stack.values).toHaveLength(3);
        expect(element).toBe('Americo');
        expect(stack.top).toBe('Paulo');
    });

    it('should be able clear queue', () => {
        const stack = initTest();
        stack.clear();

        expect(stack.values).toHaveLength(0);
    });
});
