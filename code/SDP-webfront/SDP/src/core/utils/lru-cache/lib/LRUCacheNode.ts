import { cloneDeep } from 'lodash-es';

export interface LRUCacheNodeOptions<TKey, TValue> {
  next?: LRUCacheNode<TKey, TValue> | null;
  prev?: LRUCacheNode<TKey, TValue> | null;
  entryExpirationTimeInMS?: number | null;
  onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean; }) => void;
  onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue; }) => void;
  clone?: boolean;
}

export class LRUCacheNode<TKey, TValue> {
  public readonly key: TKey;

  public readonly created: number;

  public readonly entryExpirationTimeInMS: number | null;

  public next: LRUCacheNode<TKey, TValue> | null;

  public prev: LRUCacheNode<TKey, TValue> | null;

  private readonly internalValue: TValue;

  private readonly onEntryEvicted?: (evictedEntry: { key: TKey; value: TValue; isExpired: boolean; }) => void;

  private readonly onEntryMarkedAsMostRecentlyUsed?: (entry: { key: TKey; value: TValue; }) => void;

  private readonly clone: boolean;

  public constructor(key: TKey, value: TValue, options?: LRUCacheNodeOptions<TKey, TValue>) {
    const {
      next = null,
      prev = null,
      onEntryEvicted,
      onEntryMarkedAsMostRecentlyUsed,
      clone,
    } = options ?? {};
    let {
      entryExpirationTimeInMS = null,
    } = options ?? {};

    if (
      typeof entryExpirationTimeInMS === 'number'
      && (entryExpirationTimeInMS <= 0 || Number.isNaN(entryExpirationTimeInMS))
    ) {
      entryExpirationTimeInMS = null;
      console.warn('entryExpirationTimeInMS 有误, 必须是 `null` 或则大于 0 的数字');
    }

    this.clone = clone ?? false;

    this.key = key;
    this.internalValue = this.clone ? cloneDeep(value) : value;
    this.created = Date.now();
    this.entryExpirationTimeInMS = entryExpirationTimeInMS;
    this.next = next;
    this.prev = prev;
    this.onEntryEvicted = onEntryEvicted;
    this.onEntryMarkedAsMostRecentlyUsed = onEntryMarkedAsMostRecentlyUsed;
  }

  public get value(): TValue {
    return this.clone ? cloneDeep(this.internalValue) : this.internalValue;
  }

  public get isExpired(): boolean {
    return typeof this.entryExpirationTimeInMS === 'number' && Date.now() - this.created > this.entryExpirationTimeInMS;
  }

  public invokeOnEvicted(): void {
    if (this.onEntryEvicted) {
      const { key, value, isExpired } = this;
      this.onEntryEvicted({ key, value, isExpired });
    }
  }

  public invokeOnEntryMarkedAsMostRecentlyUsed(): void {
    if (this.onEntryMarkedAsMostRecentlyUsed) {
      const { key, value } = this;
      this.onEntryMarkedAsMostRecentlyUsed({ key, value });
    }
  }
}
