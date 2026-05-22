import type { Ref } from 'vue';
import { ref, shallowRef } from 'vue';
import { debounce, get, cloneDeep } from 'lodash-es';
import type { DebouncedFunc } from 'lodash-es';
import { IResponse } from '@toy/http2/dist/types';
import { IPromise } from '@/core/http/type';

type CustomObj = Record<string, any>;

/* 选择项 */
export interface Opt extends CustomObj {
  label: string; // 中文映射
  value: any; // 选中值
}

/**
 * T 请求体类型
 * R 响应体类型
 */
interface Option<T, R> {
  params: T;
  keywordKey?: keyof T | string; // 搜索 [query 关键字] 同步到 params[keywordKey]
  defaultQuery?: boolean; // 初始化默认请求
  defaultQueryKeyWord?: string; // 初始化默认请求 关键字
  resPath?: keyof IResponse | string; // 响应体获取【option数组】路径
  API: (params: T) => IPromise<R>;
  beforeRequest?: (params: T, query: string) => T; // 请求前 params 处理
  beforeResponse?: (response: IResponse<R & any>) => Opt[]; // 响应前 response 处理 (返回option数组)
  /**
   * 是否查询为空时也查询
   *
   * default: false
   */
  allowKeywordEmpty?: boolean;
  /**
   * 是否使用缓存
   *
   * default: false
   */
  useCache?: boolean;
}

export interface FuzzyRes {
  fuzzyLoading: Ref<boolean>;
  fuzzyResponse: Ref<Opt[]>;
  fuzzyRemoteMethod: DebouncedFunc<(query: string) => Promise<void>>;
}

/**
 * 远程模糊搜索
 * @param { Option } option
 * @returns
 */
export function useFuzzy<T extends CustomObj, R = CustomObj>(option: Option<T, R>): FuzzyRes {
  const {
    API,
    params,
    keywordKey,
    defaultQuery = false,
    defaultQueryKeyWord = '',
    beforeRequest,
    beforeResponse,
    resPath = 'data',

    allowKeywordEmpty = false,
    useCache = false,
  } = option;

  const fuzzyLoading = ref<boolean>(false);
  const fuzzyResponse = ref<Opt[]>([]);
  const fetchHandler = shallowRef<Promise<any>>(Promise.resolve());
  const cacheData = new Map<string, any>();

  const fuzzyRemoteMethod = debounce(
    async (query: string) => {
      query = query.trim();
      if (query === '' && !allowKeywordEmpty) return;
      if (keywordKey) {
        (params[keywordKey as keyof T] = query as T[keyof T]);
      }

      const _params = beforeRequest ? beforeRequest(params, query) : params;
      const cacheKey = useCache ? JSON.stringify(_params) : '';

      await fetchHandler.value;

      const getData = () => {
        if (useCache && cacheData.has(cacheKey)) {
          return Promise.resolve()
            .then(() => {
              const data = cacheData.get(cacheKey)!;
              return data;
            });
        }

        fuzzyLoading.value = true;
        return API(_params)
          .then((res) => {
            if (useCache) {
              cacheData.set(cacheKey, cloneDeep(res));
            }
            return res;
          });
      };

      fetchHandler.value = getData()
        .then((res) => {
          const _res = beforeResponse ? beforeResponse(res) : get(res, resPath);
          fuzzyResponse.value = _res;
        })
        .catch(() => {
          fuzzyResponse.value = [];
        })
        .finally(() => {
          fuzzyLoading.value = false;
        });
    },
    200,
  );

  if (defaultQuery) {
    fuzzyRemoteMethod(defaultQueryKeyWord);
  }

  return {
    fuzzyLoading,
    fuzzyResponse,
    fuzzyRemoteMethod,
  };
}
