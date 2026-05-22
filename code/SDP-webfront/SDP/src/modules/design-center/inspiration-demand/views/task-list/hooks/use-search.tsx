import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { IParams } from '../types';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  const SHOP_LIST = computed(() => {
    return getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || [];
  });
  /** 波段 */
  const plmClothingBand = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });
  /** 款式风格 */
  const plmClothingStyle = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_STYLE) || [];
  });
  /** 供给方式 */
  const PLM_STYLE_SOURCE = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_STYLE_SOURCE) || [];
  });
  /** 国家站点 */
  const NATIONAL = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.NATIONAL) || [];
  });
  const searchConfig = computed<IConfigItem<IParams>[]>(() => {
    return [
      {
        name: '供给方式:',
        component: 'select',
        valueName: 'supplyModeCode',
        options: PLM_STYLE_SOURCE.value,
      },
      {
        name: '品类:',
        component: 'slot',
        slotName: 'category'
      },
      {
        name: '波段:',
        component: 'select',
        valueName: 'waveBandCodeList',
        options: plmClothingBand.value,
        props: {
          multiple: true,
          filterable: true
        },
      },
      {
        name: '店铺信息:',
        component: 'select',
        valueName: 'storeIdList',
        options: SHOP_LIST.value,
        props: {
          multiple: true,
          filterable: true
        },
      },
      {
        name: '设计组别:',
        component: 'slot',
        slotName: 'designerGroupCodeList',
      },
      {
        name: '设计师:',
        component: 'slot',
        slotName: 'designerIdList',
      },
      {
        name: '国家站点:',
        component: 'select',
        valueName: 'countrySiteCodeList',
        options: NATIONAL.value,
        props: {
          multiple: true
        },
      },
      {
        name: '建议风格:',
        component: 'slot',
        slotName: 'suggestedStyleCodeList',
        // options: plmClothingStyle.value,
        // props: {
        //   multiple: true,
        // },
      },
      {
        name: '开款SPU:',
        component: 'input',
        valueName: 'styleCode',
      },
      {
        name: '选款人:',
        component: 'slot',
        slotName: 'chosenIdList',
      },
      {
        name: '选图时间:',
        valueName: ['chosenTimeStart', 'chosenTimeEnd'],
        component: 'datePicker',
      },
      {
        name: '提交人:',
        component: 'slot',
        slotName: 'submitUserIdList',
      },
    ];
  });
  return {
    searchConfig,
    pimsCategory,
    plmClothingStyle
  };
};
