import type { mapValue, storeOption, Dictionary_ } from '@/hooks-transfer/dictionary/types';

/* LRU缓存机制 */
export default class Store {
  base: Dictionary_;

  length: number;

  cache: Map<string, mapValue[]>;

  createTime: number;

  /* 数据有效时间 */
  lifeTime: number;

  constructor(base: Dictionary_, option: storeOption) {
    const {
      length = 5,
    } = option;
    this.base = base;
    this.length = length;
    this.cache = new Map();
    this.createTime = +new Date();
    this.lifeTime = 1000 * 60 * 60 * 2; // 2小时
  }

  isDestruction() {
    return +new Date() - this.createTime > this.lifeTime;
  }

  reset() {
    this.cache.clear();
    this.createTime = +new Date();
    this.base.instance?.getDefautDicts?.();
  }

  has(key: string) {
    return this.cache.has(key);
  }

  every(keys: string[]) {
    /* store 过期重置 */
    if (this.isDestruction()) {
      console.warn('[store] 过期重置');
      this.reset();
      return false;
    }
    return keys.every(key => this.has(key));
  }

  delete(key: string) {
    return this.cache.delete(key);
  }

  set(key: string, value: mapValue[]) {
    return this.cache.set(key, value);
  }

  get(key: string) {
    if (!this.has(key)) return null;
    const { cache } = this;
    const value = cache.get(key) || [];
    cache.delete(key);
    cache.set(key, value);
    return value;
  }

  put(key: string, value: mapValue[]) {
    const { cache } = this;
    if (this.has(key)) {
      this.delete(key);
    } else if (cache.size >= this.length) {
      this.delete(cache.keys().next().value!);
    }
    this.set(key, value);
  }
}
