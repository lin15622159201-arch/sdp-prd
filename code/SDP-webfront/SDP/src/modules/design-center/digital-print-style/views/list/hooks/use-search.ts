import { computed, ref } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary';
import { IGetDigitalPrintStyleListReq } from '../../../api/types';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  const searchConfig = computed<IConfigItem<IGetDigitalPrintStyleListReq>[]>(() => [
    {
      name: 'SKC',
      component: 'input',
      valueName: 'designCode',
    },
    {
      name: 'SPU',
      component: 'input',
      valueName: 'styleCode',
    },
    {
      name: '款式品类',
      component: 'slot',
      slotName: 'categoryNameList'
    },
    {
      name: 'SPU生成时间',
      valueName: ['spuCreatedTimeStart', 'spuCreatedTimeEnd'],
      component: 'datePicker',
    },
    {
      name: 'SKC生成时间',
      valueName: ['skcCreatedTimeStart', 'skcCreatedTimeEnd'],
      component: 'datePicker',
    },
  ]);

  return {
    pimsCategory,
    searchConfig
  };
};
