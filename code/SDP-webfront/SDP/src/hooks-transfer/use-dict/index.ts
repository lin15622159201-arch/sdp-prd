import { isFunction } from 'lodash-es';
import { opsDict, FilterOpts } from '@/hooks-transfer/dictionary';
import type { IdictValuesItem } from '@/api/dict/types';
import type { CallBack } from '@/hooks-transfer/dictionary/types';

export type CustomObj = Record<string, IdictValuesItem[]>;

interface FilterOptsExtend extends FilterOpts {
  callback?: CallBack;
}
export const useDictionary = (
  codes: string[],
  cb?: FilterOptsExtend | CallBack,
) => {
  // const _cb = isFunction(cb) ? cb : undefined;
  // const opts = isFunction(cb) ? undefined : cb;
  let _cb: CallBack = () => {};
  let opts = {};
  if (isFunction(cb)) {
    _cb = cb;
  } else {
    if (cb?.callback && isFunction(cb?.callback)) {
      _cb = cb.callback;
    }
    opts = cb as FilterOpts;
  }

  const batchDictListMap = opsDict.getDicts(codes, _cb, opts);

  return {
    batchDictListMap,
  };
};
