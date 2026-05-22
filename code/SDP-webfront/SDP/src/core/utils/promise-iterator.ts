const isFunction = (fn: any) => typeof fn === 'function';

type THandler<T> = (value: T, index: number, array: T[]) => unknown;

export default async function promiseIterator<T>(list: T[], handler?: THandler<T>) {
  const _handler = isFunction(handler)
    ? handler // 传入的callback
    : (cb: T) => {
      // 没有传入callback，但是每个item可为一个function
      return isFunction(cb) ? (cb as unknown as () => T)() : cb;
    };
  const res = await Promise.all(list.map(_handler as THandler<T>));
  return res;
}
