import { ref } from 'vue';
import { getDictValueBatchList } from '@/api/dictionary';
import { IGetDictValueBatchListRes } from '@/api/dictionary/types';

export type CustomObj = Record<string, IGetDictValueBatchListRes>;
/**
 * 通过 id 获取字典信息
 * @param { string | string[] } id
 * @returns
 */
export const useDictionary = (id: string | string[]) => {
  const batchDictList = ref<IGetDictValueBatchListRes>([]);
  const batchDictListMap = ref<CustomObj>({});

  const getDictList = async (paramsId: string | string[]) => {
    let ids = [];
    if (Array.isArray(paramsId)) {
      ids = paramsId;
    } else {
      ids = [paramsId];
    }
    // 批量
    const { data } = await getDictValueBatchList(ids);
    batchDictList.value = data || [];
    const obj: CustomObj = {};
    batchDictList.value.forEach((item) => {
      obj[item.dictCode] = item.children;
    });
    batchDictListMap.value = obj;
  };

  getDictList(id);

  return {
    // dictList,
    getDictList,
    batchDictList,
    batchDictListMap,
  };
};
