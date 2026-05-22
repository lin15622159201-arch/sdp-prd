import { IdictValuesItem } from '@/api/dict/types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { YES_NO_NUMBER_ENUM } from '@/constant/global';
import { useDictionary } from '@/hooks/use-dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';
import { computed } from 'vue';

export const useDict = () => {
  const { getDictionaryOptions } = useDictionary();

  const plmSpecificationList = computed(() => {
    const arr: IdictValuesItem[] = [];
    const options: IDictionaryItem[] = getDictionaryOptions(DICTIONARY_KEY.PLM_SPECIFICATION) || [];
    options.forEach((item) => {
      arr.push({
        value: item.label,
        valueCode: item.value,
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

  const categoryTreeList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 4) || [];
  });

  return {
    categoryTreeList,
    plmSpecificationList,
    plmStandardSizeList,
  };
};
