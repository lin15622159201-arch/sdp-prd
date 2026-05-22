import { ref, computed, watch } from 'vue';
import {
  ICustomerValuesReq,
  IDictResItem,
  IDictValueMapData,
  IDictValuesReq,
  ITaskQueue,
  IValuesResItemValuesItem,
} from './type';
import { customerDictValues, dictValues } from './api';
import { DICTIONARY_STATUS_ENUM } from './constant';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';

const dictMap = ref<IDictValueMapData>({});

/*
* BFG 字典
* system: new Set<string>();
* customerId: new Set<string>();
*  */
const taskMap = {
  system: new Map(),
} as ITaskQueue;

let timer: any = 0;

// 处理字典数据 列表 -> 树
export const dictDataToTree = (dictData: IDictResItem) => {
  const result: IValuesResItemValuesItem[] = []; // 存放结果集
  const itemMap: {
    [key: string]: IValuesResItemValuesItem;
  } = {};
  dictData.values?.forEach((item) => {
    const id = item.valueCode!;
    const pid = item.valueParentCode!;
    item.disabled = item.enable === DICTIONARY_STATUS_ENUM.DISABLE;
    item.label = item.dictValue || '';
    item.value = item.valueCode || '';
    if (!itemMap[id]) {
      item.children = [];
      itemMap[id] = item;
    } else {
      item.children = itemMap[id].children;
    }
    if (!itemMap[pid]) {
      itemMap[pid] = {
        children: [],
        label: '',
        value: '',
      };
    }
    if (pid === '') {
      result.push(item);
    } else {
      itemMap[pid].children?.push(item);
    }
  });
  return result;
};

// 根据字典code 查找字典name
export const getDictCodeName = (dictList: IValuesResItemValuesItem[], code: string) => {
  if (!dictList || !dictList.length) {
    return '';
  }
  let codeName = '';
  const flatDictList = [...dictList];
  while (flatDictList.length && !codeName) {
    const item = flatDictList.shift()!;
    if (item.valueCode === code) {
      codeName = item.dictValue!;
      break;
    }
    if (item.children && item.children.length) {
      flatDictList.push(...item.children);
    }
  }
  return codeName;
};

export const useBfgDictionary = () => {
  const processDictDataList = (dictDataList: IDictResItem[], taskMapKey: string) => {
    const codeList = [...taskMap[taskMapKey].keys()];
    codeList.forEach((code) => {
      const it = dictDataList.find(v => v.dictCode === code);
      let res: IValuesResItemValuesItem[] = [];
      if (it) {
        res = dictDataToTree(it);
        dictMap.value[`${taskMapKey}_${it.dictCode}`] = res;
      }
      const cbs = taskMap[taskMapKey].get(code!) || [];
      cbs.forEach(v => v(res));
      taskMap[taskMapKey].delete(code!);
    });
    if (taskMap[taskMapKey].size === 0) {
      delete taskMap[taskMapKey];
    }
  };
  const getData = async () => {
    try {
      const taskMapList = Object.keys(taskMap);
      for (let i = 0; i < taskMapList.length; i++) {
        const key = taskMapList[i];
        const codeList = [...taskMap[key].keys()];
        if (codeList.length) {
          const api = key === 'system' ? dictValues : customerDictValues;
          const params: IDictValuesReq | ICustomerValuesReq = {
            dictCodes: codeList,
            customerId: key === 'system' ? '' : key,
            enable: '1',
            ascending: true,
          };
          if (key === 'system') {
            params.dictType = '1000';
          }
          // eslint-disable-next-line
          const { data } = await api(params);
          processDictDataList(data, key);
        }
      }
    } catch (e) {
      console.error(e, '获取字典数据接口异常');
    }
  };
  const clearTask = () => {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
  };
  const createTask = () => {
    clearTask();
    const hasQueue = Object.keys(taskMap).some((it) => {
      return !!taskMap[it].size;
    });
    if (!hasQueue) return;
    timer = setTimeout(() => {
      getData();
    }, 200);
  };

  /**
   * @param code 字典编码
   * @param customerId 客户字典， 默认为空
   * @param cb 获取数据后的回调函数
   */
  const getDictionary = (
    code: string,
    customerId?: string,
    cb?: (val: IValuesResItemValuesItem[]) => void
  ) => {
    const dictionaryKeys = Object.keys(dictMap.value);
    if (dictionaryKeys.includes(`${customerId || 'system'}_${code}`)) {
      cb?.(dictMap.value[`${customerId || 'system'}_${code}`]);
      return;
    }
    const key = customerId || 'system';
    const map = taskMap[key] || new Map();
    const cur = map.get(code);
    if (cur) {
      if (cb) {
        cur.push(cb);
      }
    } else {
      map.set(code, cb ? [cb] : []);
      taskMap[key] = map;
    }
    createTask();
  };
  /**
   * @param key  过滤数据
   * @param maxLevel 最大层级 默认不做限制
   * @param minLevel 最小层级 默认不做限制
  */
  const handleFilterData = (data: IValuesResItemValuesItem[], minLevel?: number) => {
    if (!data.length || !minLevel) return data;
    const copyData:IValuesResItemValuesItem[] = cloneDeep(data);
    const deep = (arr: IValuesResItemValuesItem[]) => {
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
   * @param code 字典编码
   * @param customerId 客户字典， 默认为空
   */
  const getDictionaryOptions = (code: string, customerId?: string, maxLevel?: number, minLevel?: number) => {
    getDictionary(code, customerId);
    const data = dictMap.value[`${customerId || 'system'}_${code}`] || [] || [];
    if (!maxLevel && !minLevel) return data;
    if (maxLevel && minLevel) {
      ElMessage.warning('不支持同时取最大最小级');
      return data;
    }
    const deep = (arr: IValuesResItemValuesItem[], currentLevel: number = 1): IValuesResItemValuesItem[] => {
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
   * 同步获取字典
   * @param code 字典编码
   * @param customerId 客户字典， 默认为空
   */
  const getDictionaryOptionsSync = (
    code: string,
    customerId?: string,
    maxLevel?: number,
    minLevel?: number
  ): PromiseLike<IValuesResItemValuesItem[]> => {
    return new Promise<IValuesResItemValuesItem[]>((resolve) => {
      getDictionary(code, customerId || '', (val) => {
        if (!maxLevel && !minLevel) {
          resolve(val);
          return;
        }
        // if (maxLevel && minLevel) {
        //   ElMessage.warning('不支持同时取最大最小级');
        //   resolve(val);
        //   return;
        // }
        const deep = (arr: IValuesResItemValuesItem[], currentLevel: number = 1): IValuesResItemValuesItem[] => {
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
        resolve(handleFilterData(deep(val), minLevel));
      });
    });
  };

  /**
   * 回显字典
   * @param echoCode
   * @param dictCode 字典编码
   * @param customerId 客户字典， 默认为空
   */
  const echoDictionary = (echoCode: string, dictCode: string, customerId?: string) => {
    const dictList = computed(() => getDictionaryOptions(dictCode, customerId));
    const echoCodeName = ref('');
    watch(
      () => dictList.value,
      (newValue) => {
        if (newValue && newValue.length) {
          echoCodeName.value = getDictCodeName(dictList.value, echoCode);
        }
      },
      {
        immediate: true,
      }
    );
    return echoCodeName.value;
  };
  const killDictionaryCache = (code: string, customerId?: string) => {
    delete dictMap.value[`${customerId || 'system'}_${code}`];
  };
  return {
    getDictionaryOptionsSync,
    getDictionaryOptions,
    echoDictionary,
    killDictionaryCache,
  };
};
