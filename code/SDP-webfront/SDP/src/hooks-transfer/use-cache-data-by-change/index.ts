import type { Ref } from 'vue';
import { LRUCache } from '@/core/utils/lru-cache';
import { isString } from 'lodash-es';
import { REGISTER_ID_ENUM } from './constant';
import sessionSharing from '@/core/http/session-sharing';
import type { LRUCacheOptions } from '@/core/utils/lru-cache';
import { computed, isRef, nextTick, onMounted, shallowRef, unref } from 'vue';
import { useEventListener } from '@vueuse/core';

type TVal = string | number | boolean | object;

interface IUseCacheDataByChangeOpts <E, T, K> {
  emit?: (event: E, ...args: any[]) => void;
  options: Ref<T[]> | T[];
  optionKey: K;
  cacheOpts?: LRUCacheOptions<string, T>;
}

const cacheMap = new Map<string, LRUCache>();

export {
  REGISTER_ID_ENUM,
};
/**
 * 精准缓存已选择的数据
 *
 * 建议`remote`情况下使用
 */
export function useCacheDataByChange<E extends 'change', T extends object, K extends keyof T>(
  registerId: REGISTER_ID_ENUM,
  {
    emit,
    options,
    optionKey,
    cacheOpts,
  }: IUseCacheDataByChangeOpts<E, T, K>,
) {
  const cache = (() => {
    if (!cacheMap.has(registerId)) {
      cacheMap.set(registerId, new LRUCache<string, T>({
        maxSize: 200,
        ...(cacheOpts || {}),
      }));
    }
    return cacheMap.get(registerId)! as LRUCache<string, T>;
  })();

  const sessionParams = shallowRef<Record<string, any>>({});
  const sessionParamsKeys = computed(() => {
    return Object.keys(sessionParams.value);
  });

  const getKey = (v: any) => (isString(v) ? v : JSON.stringify(v));

  const optionsData = computed(() => {
    const data: Record<keyof T, T> = Object.create(null);
    const optionsList = isRef(options) ? options.value : options;

    optionsList.forEach((item) => {
      const key = item[optionKey];
      (data as any)[key] = item;
    });
    return data;
  });

  const setSessionData = () => {
    nextTick(() => {
      sessionParamsKeys.value.forEach((key) => {
        Reflect.deleteProperty(sessionParams.value, key);
      });

      cache.forEach((value, key) => {
        sessionParams.value[key] = value;
      });
    });
  };

  const setCacheOptions = (val: TVal | TVal[]) => {
    const valList = Array.isArray(val) ? val : [val];
    valList.forEach((_val) => {
      // const data = optionsList.value.find((v) => {
      //   return (v as any)[optionKey] === _val;
      // });
      const data = (optionsData.value as any)[_val as any];
      if (data) {
        cache.set(getKey(data[optionKey]), data);
      }
    });

    setSessionData();
  };

  const handleChange = (val: TVal | TVal[]) => {
    setCacheOptions(val);
    const data = (optionsData.value as any)[val as any];
    emit && emit('change' as any, val, data);
  };

  const getCacheData = (val: TVal | TVal[] | Ref<TVal | TVal[]>) => {
    const _val = unref(val);
    const valList = Array.isArray(_val) ? _val : [_val];

    if (!cache.size) {
      return [];
    }
    return valList
      .map((v) => {
        return cache.get(getKey(v));
      })
      .filter((v): v is T => Boolean(v));
  };

  const hasCache = () => cache.size > 0;

  const sessionSharedInit = async () => {
    sessionParams.value = await sessionSharing(registerId, () => ({} as Record<string, any>), {
      watch: true,
    });
    if (!cache.size && sessionParamsKeys.value.length) {
      sessionParamsKeys.value.forEach((key) => {
        cache.set(key, sessionParams.value[key]);
      });
    }
  };

  onMounted(async () => {
    await sessionSharedInit();

    const cleanup = useEventListener(window, 'beforeunload', () => {
      sessionStorage.removeItem(registerId);
      cleanup();
    }, {
      once: true,
    });
  });

  return {
    setCacheOptions,
    handleChange,
    getCacheData,
    hasCache,
  };
}
