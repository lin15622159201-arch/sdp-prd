import { computed, ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { YES_NO_ENUM, YES_NO_NUMBER_ENUM } from '@/constant/global';
import { IdictValuesItem } from '@/api/dict/types';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { getAiCategoryMappingAiCategoryList } from '../api';
import { IAiCategoryMappingAiCategoryListItem } from '../api/type';
import { CATEGORY_TYPE_ENUM } from '../constant';
import { listToTreeById } from '@/core/utils/tree';

/**
 * 字典
 * @param isAll 是否全部返回 默认否
 */
export const useDict = (isAll = false as boolean) => {
  const { getDictionaryOptions } = useDictionary();

  const plmSpecificationList = computed(() => {
    const arr: IdictValuesItem[] = [];
    const options: IDictionaryItem[] = getDictionaryOptions(DICTIONARY_KEY.PLM_SPECIFICATION) || [];
    options.forEach((item) => {
      arr.push({
        value: item.value,
        valueCode: item.label,
        valueParentCode: '',
        isEnable: item.disabled ? YES_NO_NUMBER_ENUM.NO : YES_NO_NUMBER_ENUM.YES,
        isEnabled: item.disabled ? YES_NO_NUMBER_ENUM.NO : YES_NO_NUMBER_ENUM.YES,
        attributes: [],
      });
    });
    return arr;
  });

  const plmStandardSizeList = computed(() => {
    const arr: IdictValuesItem[] = [];
    const options: IDictionaryItem[] = getDictionaryOptions(DICTIONARY_KEY.PLM_STANDARY_SIZE) || [];
    options.forEach((item) => {
      arr.push({
        value: item.label,
        valueCode: item.value,
        valueParentCode: '',
        isEnable: item.disabled ? YES_NO_NUMBER_ENUM.NO : YES_NO_NUMBER_ENUM.YES,
        isEnabled: item.disabled ? YES_NO_NUMBER_ENUM.NO : YES_NO_NUMBER_ENUM.YES,
        attributes: [],
      });
      if (item.children?.length) {
        item.children.forEach((item2) => {
          arr.push({
            value: item2.label,
            valueCode: item2.value,
            valueParentCode: item.value,
            isEnable: item.disabled ? YES_NO_NUMBER_ENUM.NO : YES_NO_NUMBER_ENUM.YES,
            isEnabled: item.disabled ? YES_NO_NUMBER_ENUM.NO : YES_NO_NUMBER_ENUM.YES,
            attributes: [],
          });
        });
      }
    });
    return arr;
  });
  /**
   * 内部品类列表
   */
  const categoryTreeList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 4, undefined, isAll) || [];
  });
  /**
   * ai 品类列表
   */
  const aiCategoryList = ref<IAiCategoryMappingAiCategoryListItem[]>([]);
  const getAiCategoryTreeList = async () => {
    const { data } = await getAiCategoryMappingAiCategoryList({
      classCode: CATEGORY_TYPE_ENUM.CATEGORY,
      label: 'CATEGORY',
    });
    let arr = data || [];
    if (!isAll) {
      arr = data.filter(n => n.enable === YES_NO_ENUM.YES);
    }
    aiCategoryList.value = listToTreeById(arr, { parentIdKey: 'parentId',
      idKey: 'id',
      handleRootTree(map) {
        const values = [...map.values()];
        return values.find(item => item.code === CATEGORY_TYPE_ENUM.CATEGORY)?.children || [];
      },
    });
  };
  getAiCategoryTreeList();

  return {
    aiCategoryList,
    categoryTreeList,
    plmSpecificationList,
    plmStandardSizeList,
  };
};
