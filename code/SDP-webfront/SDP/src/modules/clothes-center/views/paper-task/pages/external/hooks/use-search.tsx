import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { MAKE_CLOTHES_TYPE_LIST } from '@/modules/clothes-center/constant';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  /** 波段 */
  const plmClothingBand = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
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
        name: '设计师',
        component: 'slot',
        slotName: 'designerIdList',
      },
      {
        name: '设计组别',
        component: 'slot',
        slotName: 'designerGroupCodeList',
      },
      {
        name: '打版方式',
        component: 'select',
        valueName: 'makeClothesType',
        type: 'type',
        options: MAKE_CLOTHES_TYPE_LIST,
      },
      {
        name: '波段',
        component: 'select',
        valueName: 'waveBandCodeList',
        props: {
          multiple: true,
          filterable: true,
          collapseTags: true,
        },
        options: plmClothingBand.value
      },
      {
        name: '审版工艺师',
        component: 'slot',
        slotName: 'reviewCraftsmanId',
      },
      {
        name: '供应商',
        component: 'slot',
        slotName: 'roomIdList',
      },
      // {
      //   name: '耗时',
      //   component: 'slot',
      //   slotName: 'timeConsuming',
      // },
      {
        name: '创建时间',
        component: 'datePicker',
        valueName: ['seperateFinishTimeStart', 'seperateFinishTimeEnd'],
      },
      {
        name: '提交时间',
        component: 'datePicker',
        valueName: ['patternFinishTimeStart', 'patternFinishTimeEnd'],
      },
    ];
  });
  return {
    searchConfig,
  };
};
