import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { IMAGE_UPDATE_STATUS_LIST } from '../../../constant/index';
import { IParams } from '../types';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3, 1, true) || [];
  });
  const waveBandCodeList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });
  const SHOP_LIST = computed(() => {
    return getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || [];
  });
  /** 款式标签 */
  const productTag = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG) || [];
  });
  /** 款式级别 */
  const productlevel = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_LEVEL) || [];
  });
  const searchConfig = computed<IConfigItem<IParams>[]>(() => [
    {
      name: 'SKC',
      component: 'slot',
      slotName: 'skcCode',
    },
    {
      name: 'SPU',
      component: 'slot',
      slotName: 'spuCode',
    },
    {
      name: '款式品类',
      component: 'slot',
      slotName: 'categoryNameList'
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
      options: waveBandCodeList.value
    },
    {
      name: '设计师',
      component: 'slot',
      slotName: 'developerId',
    },
    {
      name: '设计组别',
      component: 'slot',
      slotName: 'designerGroupCodeList',
    },
    {
      name: '店铺',
      component: 'select',
      valueName: 'storeIdList',
      options: SHOP_LIST.value,
      props: {
        multiple: true,
        filterable: true
      },
    },
    {
      name: '款式标签',
      component: 'select',
      valueName: 'styleLabelCodeList',
      options: productTag.value,
      props: {
        multiple: true,
        filterable: true
      },
    },
    {
      name: '款式级别',
      component: 'select',
      valueName: 'styleLevelCodeList',
      options: productlevel.value,
      props: {
        multiple: true,
        filterable: true
      },
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
    {
      name: '修图任务',
      component: 'select',
      valueName: 'imageUpdateStatus',
      options: [
        {
          label: '全部',
          value: '-1',
        },
        ...IMAGE_UPDATE_STATUS_LIST
      ],
    },
  ]);

  return {
    pimsCategory,
    searchConfig
  };
};
