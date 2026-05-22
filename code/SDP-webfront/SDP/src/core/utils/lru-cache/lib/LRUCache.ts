import { LRUCacheNode } from './LRUCacheNode';

export interface LRUCacheOptions<TKey, TValue> {
  /**
   * 缓存可以容纳的最大项目数，一旦缓存达到此数字，最近最少使用的条目将开始被驱逐
   *
   * default: 50
   */
  maxSize?: number;

  /**
   * 缓存的生命周期(ms)
   *
   * null 永不过期
   *
   * default: null
   */
  entryExpirationTimeInMS?: number | null;

  /**
   * 当缓存被删除时 调用钩子函数
   *
   * ```typescript
   * {
   *   key: TKey;
   *   value: TValue;
   *   isExpired: boolean;
   * }
   * ```
   */
  onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean; }) => void;

  /**
   * 每当数据被标记为最近使用时（如set、get、find等）调用的钩子函数
   *
   * ```typescript
   * {
   *   key: TKey;
   *   value: TValue;
   * }
   * ```
   */
  onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue; }) => void;

  /**
   * 是否克隆保存
   *
   * default: false
   */
  clone?: boolean;
}

export type LRUCacheSetEntryOptions<TKey, TValue> = LRUCacheOptions<TKey, TValue>;

export interface LRUCacheEntry<TKey, TValue> {
  key: TKey;
  value: TValue;
}

export class LRUCache<TKey = string, TValue = any> implements Iterable<LRUCacheEntry<TKey, TValue>> {
  private readonly lookupTable: Map<TKey, LRUCacheNode<TKey, TValue>>;

  private readonly entryExpirationTimeInMS: number | null;

  private readonly onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean; }) => void;

  private readonly onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue; }) => void;

  private readonly clone?: boolean;

  private maxSizeInternal: number;

  private head: LRUCacheNode<TKey, TValue> | null = null;

  private tail: LRUCacheNode<TKey, TValue> | null = null;

  public constructor(options?: LRUCacheOptions<TKey, TValue>) {
    const {
      maxSize = 50,
      onEntryEvicted,
      onEntryMarkedAsMostRecentlyUsed,
      clone,
    } = options ?? {};
    let {
      entryExpirationTimeInMS = null,
    } = options ?? {};

    if (Number.isNaN(maxSize) || maxSize <= 0) {
      throw new Error('最大数量必须大于 0');
    }

    if (
      typeof entryExpirationTimeInMS === 'number'
      && (entryExpirationTimeInMS <= 0 || Number.isNaN(entryExpirationTimeInMS))
    ) {
      entryExpirationTimeInMS = null;
      console.warn('entryExpirationTimeInMS 有误, 必须是 `null` 或则大于 0 的数字');
    }

    this.lookupTable = new Map();
    this.maxSizeInternal = maxSize;
    this.entryExpirationTimeInMS = entryExpirationTimeInMS;
    this.onEntryEvicted = onEntryEvicted;
    this.onEntryMarkedAsMostRecentlyUsed = onEntryMarkedAsMostRecentlyUsed;
    this.clone = clone;
  }

  /**
   * 获取当前缓存数量
   *
   * 注: 在执行前会清除过期缓存
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * const size = cache.size;
   * // 1
   * ```
   */
  public get size(): number {
    this.cleanCache();
    return this.lookupTable.size;
  }

  /**
   * 获取剩余可添加到缓存的数量
   *
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * const remainingSize = cache.remainingSize;
   * // 9
   * ```
   */
  public get remainingSize(): number {
    return this.maxSizeInternal - this.size;
  }

  /**
   * 获取最近使用的缓存
   *
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * const newest = cache.newest;
   *
   * console.log(newest.value);
   * // testValue
   *
   * console.log(newest.key);
   * // testKey
   * ```
   */
  public get newest(): LRUCacheEntry<TKey, TValue> | void {
    if (!this.head) {
      return undefined;
    }

    if (this.head.isExpired) {
      this.removeNodeFromListAndLookupTable(this.head);
      return this.newest;
    }

    return this.mapNodeToEntry(this.head);
  }

  /**
   * 获取缓存中最少使用(排最后)的缓存, 和 `newest` 相反
   *
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * const oldest = cache.oldest;
   *
   * console.log(oldest.value);
   * // testValue
   *
   * console.log(oldest.key);
   * // testKey
   * ```
   */
  public get oldest(): LRUCacheEntry<TKey, TValue> | null {
    if (!this.tail) {
      return null;
    }

    if (this.tail.isExpired) {
      this.removeNodeFromListAndLookupTable(this.tail);
      return this.oldest;
    }

    return this.mapNodeToEntry(this.tail);
  }

  /**
   * @example
   * ```typescript
   * const cache = new LRUCache({ maxSize: 10 });
   *
   * cache.set('testKey', 'testValue');
   *
   * const maxSize = cache.maxSize;
   * // 10
   *
   * // 如果缓存中的数量超过5个, 则最近最少使用的数据将被删除, 直到缓存大小为5
   * cache.maxSize = 5;
   * ```
   */
  public get maxSize(): number {
    return this.maxSizeInternal;
  }

  public set maxSize(value: number) {
    if (Number.isNaN(value) || value <= 0) {
      throw new Error('最大数量必须大于0');
    }

    this.maxSizeInternal = value;

    this.enforceSizeLimit();
  }

  /**
   * 设置缓存
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   * // or
   * cache.set('key2', 'value2', { entryExpirationTimeInMS: 10 });
   * ```
   */
  public set(key: TKey, value: TValue, entryOptions?: LRUCacheSetEntryOptions<TKey, TValue>): LRUCache<TKey, TValue> {
    const currentNodeForKey = this.lookupTable.get(key);

    if (currentNodeForKey) {
      this.removeNodeFromListAndLookupTable(currentNodeForKey);
    }

    const node = new LRUCacheNode(key, value, {
      entryExpirationTimeInMS: this.entryExpirationTimeInMS,
      onEntryEvicted: this.onEntryEvicted,
      onEntryMarkedAsMostRecentlyUsed: this.onEntryMarkedAsMostRecentlyUsed,
      clone: this.clone,
      ...entryOptions,
    });
    this.setNodeAsHead(node);
    this.lookupTable.set(key, node);

    this.enforceSizeLimit();

    return this;
  }

  /**
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * const item1 = cache.get('testKey');
   * // testValue
   *
   * const item2 = cache.get('keyNotInCache');
   * // undefined
   * ```
   */
  public get(key: TKey): TValue | void {
    const node = this.lookupTable.get(key);

    if (!node) {
      return undefined;
    }

    if (node.isExpired) {
      this.removeNodeFromListAndLookupTable(node);
      return undefined;
    }

    this.setNodeAsHead(node);

    return node.value;
  }

  /**
   * 获取缓存数据, 但该获取方式不会改变数据顺序(不会被标记使用)
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * const item1 = cache.peek('testKey');
   * // testValue
   *
   * const item2 = cache.peek('keyNotInCache');
   * // undefined
   * ```
   */
  public peek(key: TKey): TValue | void {
    const node = this.lookupTable.get(key);

    if (!node) {
      return undefined;
    }

    if (node.isExpired) {
      this.removeNodeFromListAndLookupTable(node);
      return undefined;
    }

    return node.value;
  }

  /**
   * 删除缓存数据
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * const wasDeleted = cache.delete('testKey');
   * // true
   *
   * // 该数据本来就不存在, 结果返回false
   * const wasDeleted2 = cache.delete('keyNotInCache');
   * // false
   * ```
   */
  public delete(key: TKey): boolean {
    const node = this.lookupTable.get(key);

    if (!node) {
      return false;
    }

    return this.removeNodeFromListAndLookupTable(node);
  }

  /**
   * 获取缓存中是否存在该key关联的数据
   *
   * 如果查找的数据已过期, 则会删除该数据并返回 `false`
   *
   * 该操作不会标记数据 最近使用
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * const wasDeleted = cache.has('testKey');
   * // true
   *
   * const wasDeleted2 = cache.has('keyNotInCache');
   * // false
   * ```
   */
  public has(key: TKey): boolean {
    const node = this.lookupTable.get(key);

    if (!node) {
      return false;
    }

    if (node.isExpired) {
      this.removeNodeFromListAndLookupTable(node);
      return false;
    }

    return true;
  }

  /**
   * 清除缓存
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * cache.clear();
   * ```
   */
  public clear(): void {
    this.head = null;
    this.tail = null;
    this.lookupTable.clear();
  }

  /**
   * 查找缓存中相匹配的数据
   *
   * 过程中如查询到过期数据将会删除该数据
   *
   * 返回的数据将会标记最近使用
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * const item = cache.find(entry => {
   *   const { key, value } = entry;
   *
   *   if (key === 'testKey' || value === 'something') {
   *     return true;
   *   }
   *
   *   return false;
   * });
   * // { key: 'testKey', value: 'testValue }
   *
   * const item2 = cache.find(entry => entry.key === 'notInCache');
   * // undefined
   * ```
   */
  public find(condition: (entry: LRUCacheEntry<TKey, TValue>) => boolean): LRUCacheEntry<TKey, TValue> | undefined {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const { next } = node;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
      } else {
        const entry = this.mapNodeToEntry(node);
        if (condition(entry)) {
          this.setNodeAsHead(node);
          return entry;
        }
        node = node.next;
      }
    }

    return undefined;
  }

  /**
   * 遍历缓存中的数据
   *
   * 从最近访问的数据到最后访问的数据依次迭代
   *
   * 过程中如查询到过期数据将会删除该数据
   *
   * 所有数据都不会标记最近使用
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * cache.forEach((value, key, index) => {
   *   //
   * });
   * ```
   */
  public forEach(callback: (value: TValue, key: TKey, index: number) => void): void {
    let node = this.head;
    let index = 0;

    while (node) {
      if (node.isExpired) {
        const { next } = node;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
      } else {
        callback(node.value, node.key, index);
        node = node.next;
        index += 1;
      }
    }
  }

  /**
   * 创建一个生成器, 可以使用 `for... of...` 遍历 缓存值(value)
   *
   * 从最近访问的数据到最后访问的数据依次迭代
   *
   * 过程中如查询到过期数据将会删除该数据
   *
   * 所有数据都不会标记最近使用
   *
   * @returns A Generator for the cache values.
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * for (const value of cache.values()) {
   *   //
   * }
   * ```
   */
  // eslint-disable-next-line generator-star-spacing
  public *values(): Generator<TValue> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const { next } = node;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
      } else {
        yield node.value;
        node = node.next;
      }
    }
  }

  /**
   * 创建一个生成器, 可以使用 `for... of...` 遍历 缓存键(key)
   *
   * 从最近访问的数据到最后访问的数据依次迭代
   *
   * 过程中如查询到过期数据将会删除该数据
   *
   * 所有数据都不会标记最近使用
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * for (const key of cache.keys()) {
   *   //
   * }
   * ```
   */
  // eslint-disable-next-line generator-star-spacing
  public *keys(): Generator<TKey> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const { next } = node;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
      } else {
        yield node.key;
        node = node.next;
      }
    }
  }

  /**
   * 创建一个生成器, 可以使用 `for... of...` 遍历 缓存数据
   *
   * 从最近访问的数据到最后访问的数据依次迭代
   *
   * 过程中如查询到过期数据将会删除该数据
   *
   * 所有数据都不会标记最近使用
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * for (const entry of cache.entries()) {
   *   const { key, value } = entry;
   *   //
   * }
   * ```
   */
  // eslint-disable-next-line generator-star-spacing
  public *entries(): Generator<LRUCacheEntry<TKey, TValue>> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const { next } = node;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
      } else {
        yield this.mapNodeToEntry(node);
        node = node.next;
      }
    }
  }

  /**
   * 创建一个生成器, 可以使用 `for... of...` 遍历 缓存数据
   *
   * 从最近访问的数据到最后访问的数据依次迭代
   *
   * 过程中如查询到过期数据将会删除该数据
   *
   * 所有数据都不会标记最近使用
   *
   * @example
   * ```typescript
   * const cache = new LRUCache();
   *
   * cache.set('testKey', 'testValue');
   *
   * for (const entry of cache) {
   *   const { key, value } = entry;
   *   //
   * }
   * ```
   */
  // eslint-disable-next-line generator-star-spacing
  public *[Symbol.iterator](): Generator<LRUCacheEntry<TKey, TValue>> {
    let node = this.head;

    while (node) {
      if (node.isExpired) {
        const { next } = node;
        this.removeNodeFromListAndLookupTable(node);
        node = next;
      } else {
        yield this.mapNodeToEntry(node);
        node = node.next;
      }
    }
  }

  private enforceSizeLimit(): void {
    let node = this.tail;

    while (node !== null && this.size > this.maxSizeInternal) {
      const { prev } = node;
      this.removeNodeFromListAndLookupTable(node);
      node = prev;
    }
  }

  private mapNodeToEntry({ key, value }: LRUCacheNode<TKey, TValue>): LRUCacheEntry<TKey, TValue> {
    return {
      key,
      value,
    };
  }

  private setNodeAsHead(node: LRUCacheNode<TKey, TValue>): void {
    this.removeNodeFromList(node);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    node.invokeOnEntryMarkedAsMostRecentlyUsed();
  }

  private removeNodeFromList(node: LRUCacheNode<TKey, TValue>): void {
    if (node.prev !== null) {
      node.prev.next = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    }

    if (this.head === node) {
      this.head = node.next;
    }

    if (this.tail === node) {
      this.tail = node.prev;
    }

    node.next = null;
    node.prev = null;
  }

  private removeNodeFromListAndLookupTable(node: LRUCacheNode<TKey, TValue>): boolean {
    node.invokeOnEvicted();
    this.removeNodeFromList(node);

    return this.lookupTable.delete(node.key);
  }

  private cleanCache(): void {
    if (!this.entryExpirationTimeInMS) {
      return;
    }

    const expiredNodes: LRUCacheNode<TKey, TValue>[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const node of this.lookupTable.values()) {
      if (node.isExpired) {
        expiredNodes.push(node);
      }
    }

    expiredNodes.forEach(node => this.removeNodeFromListAndLookupTable(node));
  }
}
