import { ref, computed } from 'vue';
import { IDictionaryItem, IDictMapData, ITaskMapItem, IMapData, IConfig } from './types';
import { getDictValueBatchList } from '@/api/dictionary';
import { DICTIONARY_KEY, DICTIONARY_STATUS_ENUM, CUSTOM_DICTIONARY_KEY } from '@/constant/dictionary';
import { cloneDeep } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { IGetDictValueBatchListResItem } from '@/api/dictionary/types';

const dictMap = ref<IDictMapData>({});
const taskQueue = new Set<string>();
let timer: any = null;
// 需要等待的字典任务
const taskMap = new Map<string, ITaskMapItem[]>();
let apiLoadingMark = false;

export const useDictionary = <T extends DICTIONARY_KEY>(dictCodes: T[] = [], config: IConfig = {}) => {
  const { filterDisabled = true, apiLoading = false } = config;
  apiLoading && (apiLoadingMark = apiLoading);
  const loading = ref(false);
  const clearTask = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const createTask = () => {
    clearTask();
    if (taskQueue.size === 0) return;
    timer = setTimeout(() => {
      getData();
    }, 150);
  };

  /** 创建任务并批量请求字典 */
  const initTaskAwait = (codes: string[]) => {
    const dictionaryKeys = Object.keys(dictMap.value);
    const waitCodes = codes.filter(i => !dictionaryKeys.includes(i));
    waitCodes.forEach((code) => {
      const target: ITaskMapItem = {
        task: null,
        cb: null,
      };
      target.task = new Promise((resolve) => {
        target.cb = resolve;
      });
      const has = taskMap.get(code);
      if (has) {
        taskMap.set(code, [...has, target]);
      } else {
        taskMap.set(code, [target]);
      }
      taskQueue.add(code);
    });
    waitCodes.length && createTask();
    loading.value = true;
  };

  initTaskAwait(dictCodes);

  /** 完成等待 */
  const finishTaskAwait = (code: string) => {
    const target = taskMap.get(code);
    target?.forEach((item) => {
      item.cb?.();
    });
    taskMap.delete(code);
    if (taskMap.size === 0) {
      loading.value = false;
    }
  };

  /** 请求数据 */
  const getData = async () => {
    let currentTask = [...taskQueue];
    try {
      const customKeys: string[] = [];
      if (CUSTOM_DICTIONARY_KEY) {
        const keys: string[] = Object.values(CUSTOM_DICTIONARY_KEY);
        currentTask = currentTask.filter((key) => {
          const flag = keys.includes(key);
          if (flag) {
            customKeys.push(key);
          }
          return !flag;
        });
      }
      if (currentTask.length === 0) return;
      const needLoading = apiLoadingMark && taskMap.size !== 0;
      const { data } = await getDictValueBatchList(currentTask, needLoading);
      data.forEach((items) => {
        const mapData = (d: IGetDictValueBatchListResItem[]) => {
          return d.map((i) => {
            const obj: IDictionaryItem = {
              label: i.dictName,
              value: i.dictCode,
              children: mapData(i.children ?? []),
              disabled: String(i.state) === DICTIONARY_STATUS_ENUM.DISABLE,
              attributes: i.attributes,
            };
            return obj;
          });
        };
        const res = mapData(items.children);
        dictMap.value[items.dictCode!] = {
          id: items.id,
          code: items.dictCode,
          name: items.dictName,
          data: res,
        };
      });
    } catch (e) {
      console.error(e, '获取字典数据接口异常');
    } finally {
      currentTask.forEach((item) => {
        finishTaskAwait(item);
        taskQueue.delete(item);
      });
      apiLoadingMark = false;
    }
  };

  /**
   * 获取字典
   * 未有数据时创建请求任务
   */
  const getDictionary = (code: string) => {
    const dictionaryKeys = Object.keys(dictMap.value);
    if (dictionaryKeys.includes(code)) {
      finishTaskAwait(code);
      return;
    }
    taskQueue.add(code);
    createTask();
  };

  /**
   * @param key  过滤数据
   * @param maxLevel 最大层级 默认不做限制
   * @param minLevel 最小层级 默认不做限制
  */
  const handleFilterData = (data: IDictionaryItem[], minLevel?: number) => {
    if (!data.length || !minLevel) return data;
    const copyData: IDictionaryItem[] = cloneDeep(data);
    const deep = (arr: IDictionaryItem[]) => {
      for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        // 最小级
        if (minLevel) {
          if (item?.children?.length) {
            deep(item?.children);
          } else if (Number(item.level) < minLevel!) {
            // 最后一级如果小于minLevel，全部过滤掉
            arr.splice(index, 1);
            // 如果该级为空，则父级一层层删除
            if (!arr?.length) {
              deep(copyData);
            }
            index -= 1;
          }
        }
      }
    };
    deep(copyData);
    return copyData;
  };
  /**
   * @param key 字典编码
   * @param maxLevel 最大层级 默认不做限制
   * @param minLevel 最小层级 默认不做限制
   */
  const getDictionaryOptions = (key: string, maxLevel?: number, minLevel?: number) => {
    if (!key) return [];
    getDictionary(key);
    const data = cloneDeep(dictMap.value[key]?.data || []);
    if (!maxLevel && !minLevel) return data;
    if (maxLevel && minLevel) {
      ElMessage.warning('不支持同时取最大最小级');
      return data;
    }
    const deep = (arr: IDictionaryItem[], currentLevel: number = 1): IDictionaryItem[] => {
      return arr.map((v) => {
        if (v?.children?.length) {
          // 最大层级
          if (maxLevel) {
            if (currentLevel === maxLevel) {
              const { ...rest } = v;
              return {
                ...rest,
                level: currentLevel,
                children: [],
              };
            }
          }
          return {
            ...v,
            level: currentLevel,
            children: deep(v?.children, currentLevel + 1),
          };
        }
        return {
          ...v,
          level: currentLevel
        };
      });
    };
    return handleFilterData(deep(data), minLevel);
  };

  /**
   * 仅获取可用字典
   * @param key
   * @param maxLevel
   * @param minLevel
   */
  const getEnableDictionaryOptions = (key: string, maxLevel?: number, minLevel?: number) => {
    if (!key) return [];
    const originData = getDictionaryOptions(key, maxLevel, minLevel);
    const filterData = (data: IDictionaryItem[]) => {
      const target = data.filter(i => !i.disabled);
      target.forEach((item) => {
        if (item.children?.length) {
          item.children = filterData(item.children);
        }
      });
      return target;
    };
    return filterData(originData);
  };

  /** 等待字典返回 */
  const dictionaryNextTick = async () => {
    const tasks = Array.from(taskMap.values()).reduce((p, c) => {
      return p.concat(c);
    }, []).map(i => i.task);
    await Promise.all(tasks);
  };

  const dictionary = computed<Record<T, IDictionaryItem[]>>(() => {
    const vals = dictCodes.map((code) => {
      return [code, filterDisabled ? getEnableDictionaryOptions(code) : getDictionaryOptions(code)];
    });
    return Object.fromEntries(vals);
  });

  return {
    getDictionaryOptions,
    getEnableDictionaryOptions,
    dictionaryNextTick,
    dictionary,
    dictMap,
    loading,
  };
};
