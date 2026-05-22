import { ref } from 'vue';
import { IDictionaryItem, IMapData, IQueue } from './types';
import { getDictValueBatchList } from '@/api/dictionary';
import { CUSTOM_DICTIONARY_KEY } from '@/constant/dictionary';
import { cloneDeep } from 'lodash-es';
import { IGetDictValueBatchListResItem } from '@/api/dictionary/types';
import { YES_NO_ENUM, YES_NO_NUMBER_ENUM } from '@/constant';
import { getShopList } from '@/api/query-options';
import { ShopPageResListItem } from '@/api/query-options/type';
import { clothingModelList } from '@/api/basis';
import { fetchTemuCategoryList } from '@/api/temu';

const dictMap = ref<IMapData>({});
const taskQueue = new Map<string, IQueue>();
let timer: NodeJS.Timeout | null = null;

/**
 * 处理自定义字典
 * @param keys 字典key列表
 */
const handleCustomDictionary = async (customKeys: string[]) => {
  customKeys.forEach(async (key) => {
    const arr:IDictionaryItem[] = [];
    switch (key) {
      case CUSTOM_DICTIONARY_KEY.SHOP_LIST: {
        const { data } = await getShopList({ pageNum: 1, pageSize: 1000 });
        arr.push(...(data.list || []).map(v => ({
          value: v.shopId!,
          label: v.shopName!,
          disabled: v.enable !== 1, // 1 启用
          // children: [],
          // attributes: []
        })) as IDictionaryItem[]);
        break;
      }
      case CUSTOM_DICTIONARY_KEY.CLOTHING_MODEL: {
        const { data } = await clothingModelList({});
        arr.push(...data.list.map(v => ({
          value: v.id!,
          label: v.modelName!,
          disabled: false,
          children: [],
          attributes: []
        })));
        break;
      }
      case CUSTOM_DICTIONARY_KEY.TEMU_CATEGORY: {
        const { data } = await fetchTemuCategoryList();
        arr.push(...data.map(v => ({
          ...v,
          value: v.categoryId,
          label: v.categoryName,
          disabled: false,
          children: [],
          attributes: []
        })));
        break;
      }
      default:
        break;
    }
    taskQueue.delete(key);
    dictMap.value[key] = arr;
  });
};

/** OPS 字典 */
export const useDictionary = () => {
  const getData = async () => {
    try {
      const customKeys: string[] = [];
      const defaultKeys: string[] = [];
      [...taskQueue.entries()].forEach((v) => {
        const [key, row] = v;
        if (!row.fetching) {
          const keys = Object.values(CUSTOM_DICTIONARY_KEY) as unknown as string[];
          const flag = keys.includes(key);
          if (flag) {
            customKeys.push(key);
          } else {
            defaultKeys.push(key);
          }
          const curQueue = taskQueue.get(key)!;
          curQueue.fetching = true;
        }
      });
      // 自定义处理
      await handleCustomDictionary(customKeys);
      if (defaultKeys.length === 0) return;
      const { data } = await getDictValueBatchList(defaultKeys);
      defaultKeys.forEach((key) => {
        const dictArr = data.find(it => it.dictCode === key)?.children || [];
        const deep = (arr: IGetDictValueBatchListResItem[]): IDictionaryItem[] => {
          return arr.map(v => ({
            ...v,
            value: v.dictCode,
            label: v.dictName,
            disabled: v.state === YES_NO_NUMBER_ENUM.NO,
            children: deep(v.children),
            attributes: v.attributes
          }));
        };
        const res = deep(dictArr);
        dictMap.value[key!] = res;
        const queue = taskQueue.get(key!)!;
        queue.cbs.forEach(cb => cb(res));
        taskQueue.delete(key!);
      });
    } catch (e) {
      console.error(e, '获取字典数据接口异常');
    }
  };
  const clearTask = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const createTask = () => {
    clearTask();
    if ([[...taskQueue.values()].filter(v => v.fetching === false)].length === 0) return;
    timer = setTimeout(() => {
      getData();
    }, 200);
  };
  const getDictionary = (
    code: string,
    cb?: (val: IDictionaryItem[]) => void
  ) => {
    const dictionaryKeys = Object.keys(dictMap.value);
    if (dictionaryKeys.includes(code)) {
      cb?.(dictMap.value[code]);
      return;
    }
    const cur = taskQueue.get(code);
    if (cur) {
      if (cb) {
        cur.cbs.push(cb);
      }
    } else {
      taskQueue.set(code, {
        fetching: false,
        cbs: cb ? [cb] : []
      });
    }
    createTask();
  };
  /**
   * @param key  过滤数据
   * @param maxLevel 最大层级 默认不做限制
   * @param minLevel 最小层级 默认不做限制
  */
  const handleFilterData = (data: IDictionaryItem[], minLevel?: number) => {
    if (!data.length || !minLevel) return data;
    const copyData:IDictionaryItem[] = cloneDeep(data);
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
   * @param isAllSelected 是否所有都可以选择，默认false，跟回字典的disabled字段的值，true = 所有都可选（把字典值的disable重置为false）
   */
  const getDictionaryOptions = (key: string, maxLevel?: number, minLevel?: number, isAllSelected: boolean = false): IDictionaryItem[] => {
    getDictionary(key);
    const data = dictMap.value[key] || [];
    if (!maxLevel && !minLevel) return data;
    if (maxLevel && minLevel && minLevel > maxLevel) {
      console.error('最大层级不能小于最小层级');
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
                disabled: isAllSelected ? false : rest.disabled,
                level: currentLevel,
                children: [],
              };
            }
          }
          return {
            ...v,
            disabled: isAllSelected ? false : v.disabled,
            level: currentLevel,
            children: deep(v?.children, currentLevel + 1),
          };
        }
        return {
          ...v,
          disabled: isAllSelected ? false : v.disabled,
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
    maxLevel?: number,
    minLevel?: number,
    isAllSelected: boolean = false
  ): PromiseLike<IDictionaryItem[]> => {
    return new Promise<IDictionaryItem[]>((resolve) => {
      getDictionary(code, (val) => {
        if (!maxLevel && !minLevel) {
          resolve(val);
          return;
        }
        if (maxLevel && minLevel && minLevel > maxLevel) {
          console.error('最大层级不能小于最小层级');
          resolve(val);
          return;
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
                    disabled: isAllSelected ? false : rest.disabled,
                    level: currentLevel,
                    children: [],
                  };
                }
              }
              return {
                ...v,
                disabled: isAllSelected ? false : v.disabled,
                level: currentLevel,
                children: deep(v?.children, currentLevel + 1),
              };
            }
            return {
              ...v,
              disabled: isAllSelected ? false : v.disabled,
              level: currentLevel
            };
          });
        };
        resolve(handleFilterData(deep(val), minLevel));
      });
    });
  };

  /**
   * 获取字典值的名称
   */
  const getDictionaryLabel = (code: string, value: string) => {
    const data = dictMap.value[code] || [];
    const getLabel = (arr: IDictionaryItem[]): string => {
      for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        if (item.value === value) {
          return item.label;
        } else if (item.children?.length) {
          const name = getLabel(item.children);
          if (name) return name;
        }
      }
      return '';
    };
    return getLabel(data);
  };
  return {
    getDictionaryOptions,
    getDictionaryOptionsSync,
    getDictionaryLabel
  };
};
