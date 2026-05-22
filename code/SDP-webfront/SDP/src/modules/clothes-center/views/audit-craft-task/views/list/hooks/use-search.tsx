import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { MAKE_CLOTHES_TYPE_LIST } from '@/modules/clothes-center/constant';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();

  const pimsCategory = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });

  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: 'SKC',
        component: 'input',
        valueName: 'designCode',
        placeholder: '请输入',
      },
      {
        name: 'SPU',
        component: 'input',
        valueName: 'styleCode',
        placeholder: '请输入',
      },
      {
        name: '审版工艺师',
        component: 'slot',
        slotName: 'reviewCraftsmanId',
      },
      {
        name: '款式品类',
        component: 'slot',
        slotName: 'categoryCodes'
      },
      {
        name: '打版方式',
        component: 'select',
        valueName: 'makeClothesType',
        type: 'type',
        options: MAKE_CLOTHES_TYPE_LIST,
      },
      // {
      //   name: '耗时',
      //   component: 'slot',
      //   slotName: 'timeConsuming',
      // },
      {
        name: '创建时间',
        component: 'datePicker',
        valueName: ['createdTimeStart', 'createdTimeEnd'],
      },
      {
        name: '提交时间',
        component: 'datePicker',
        valueName: ['latestSubmitTimeStart', 'latestSubmitTimeEnd'],
      },
    ];
  });
  return {
    searchConfig,
    pimsCategory,
  };
};
