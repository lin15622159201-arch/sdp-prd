import { LRUCache } from './lib/LRUCache';
import type { LRUCacheOptions } from './lib/LRUCache';

export * from './lib/LRUCache';
export function lruCache<TKey = string, TValue = any>(options?: LRUCacheOptions<TKey, TValue>) {
  return new LRUCache(options);
}
