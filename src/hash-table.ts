export class Entry<K, V> {
    key: K;
    value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export class HashTable<K, V> {
    private table: Array<Array<Entry<K, V>>>;
    private size: number;

    constructor(size: number) {
        this.size = size;
        this.table = new Array<Array<Entry<K, V>>>(size);
    }

    private hash(key: K): number {
        const strKey = String(key);
        let hashValue = 0;
        for (let i = 0; i < strKey.length; i++) {
            hashValue += strKey.charCodeAt(i);
        }
        return hashValue % this.size;
    }

    put(key: K, value: V): void {
        const index = this.hash(key);
        if (!this.table[index]) {
            this.table[index] = [];
        }
        this.table[index].push(new Entry(key, value));
    }

    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.table[index];
        if (!bucket) return undefined;
        for (const entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }
        return undefined;
    }

    remove(key: K): void {
        const index = this.hash(key);
        const bucket = this.table[index];
        if (!bucket) return;
        const updatedBucket = bucket.filter(entry => entry.key !== key);
        this.table[index] = updatedBucket;
    }
}
