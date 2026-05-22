import type { WatchOptions, WatchSource, Ref } from 'vue';
import { watch, unref } from 'vue';

export type WatchArrayCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV,
  added: V,
  removed: OV,
  onCleanup: (cleanupFn: () => void) => void
) => any;

export type MaybeRef<T> = T | Ref<T>;
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T);
export type AnyFn = (...args: any[]) => any;

export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function'
    ? (r as AnyFn)()
    : unref(r);
}

export function watchArray<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T[]> | T[],
  cb: WatchArrayCallback<T[], Immediate extends true ? T[] | undefined : T[]>,
  options?: WatchOptions<Immediate>,
) {
  let oldList: T[] = options?.immediate
    ? []
    : [...(
      // eslint-disable-next-line no-nested-ternary
      source instanceof Function
        ? source()
        : Array.isArray(source)
          ? source
          : toValue(source)),
    ];

  return watch(source as WatchSource<T[]>, (newList, _, onCleanup) => {
    const oldListRemains = new Array<boolean>(oldList.length);
    const added: T[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of newList) {
      let found = false;
      for (let i = 0; i < oldList.length; i++) {
        if (!oldListRemains[i] && obj === oldList[i]) {
          oldListRemains[i] = true;
          found = true;
          break;
        }
      }
      if (!found) { added.push(obj); }
    }
    const removed = oldList.filter((__, i) => !oldListRemains[i]);
    cb(newList, oldList, added, removed, onCleanup);
    oldList = [...newList];
  }, options);
}
