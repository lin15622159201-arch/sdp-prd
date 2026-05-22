import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { IParams } from '../types';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { ASSOCIATED_TYPE_LIST, IDENTIFY_STATUS_LIST } from '../../../constant/index';


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
  /** 款式标签 */
  const TYPE_OF_OPENING_LIST = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG) || [];
  });

  const searchConfig = computed<IConfigItem<IParams>[]>(() => {
    return [
      {
        name: '波段:',
        component: 'select',
        valueName: 'wavebandCodes',
        options: plmClothingBand.value,
        props: {
          multiple: true,
          filterable: true
        },
      },
      {
        name: '设计师:',
        component: 'slot',
        slotName: 'developerId',
      },
      {
        name: '创建时间:',
        valueName: ['createdStartTime', 'createdEndTime'],
        component: 'datePicker',
      },
      {
        name: '店铺:',
        component: 'select',
        valueName: 'storeIds',
        options: SHOP_LIST.value,
        props: {
          multiple: true,
          filterable: true
        },
      },
      {
        name: '任务编号:',
        component: 'slot',
        slotName: 'taskCode',
      },
      {
        name: '关联任务:',
        component: 'select',
        valueName: 'relaTypes',
        options: ASSOCIATED_TYPE_LIST,
        props: {
          multiple: true,
        }
      },
      {
        name: '款号:',
        component: 'slot',
        slotName: 'spuCode',
      },
      {
        name: '品类:',
        component: 'slot',
        slotName: 'category'
      },
      {
        name: 'AI识别状态:',
        component: 'select',
        valueName: 'identifyStatus',
        options: IDENTIFY_STATUS_LIST,
      },
      {
        name: '款式标签:',
        component: 'select',
        valueName: 'styleLabelCode',
        options: TYPE_OF_OPENING_LIST.value,
        props: {
          multiple: false,
        }
      },
      {
        name: '审款人:',
        component: 'slot',
        slotName: 'styleCheckerId',
      },
      {
        name: '审款时间:',
        valueName: ['checkStartTime', 'checkEndTime'],
        component: 'datePicker',
      },
    ];
  });
  return {
    searchConfig,
    pimsCategory,
    plmClothingStyle
  };
};
