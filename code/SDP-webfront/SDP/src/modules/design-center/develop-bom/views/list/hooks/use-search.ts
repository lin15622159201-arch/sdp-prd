import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary';
import { PostWebV1BomPageApiReq } from '../../../api/types';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const plmStyleSource = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_STYLE_SOURCE) || [];
  });
  const SHOP_LIST = computed(() => {
    return getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST) || [];
  });
  const productTypes = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TYPE) || [];
  });
  const NATIONAL_OPTIONS = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.NATIONAL) || [];
  });
  const pimsCategory = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  const waveBandCodeList = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });
  const searchConfig = computed<IConfigItem<PostWebV1BomPageApiReq>[]>(() => [
    {
      name: 'SKC',
      component: 'input',
      valueName: 'designCode',
      props: {
        placeholder: '支持批量搜索，多个SKC用“,”隔开'
      }
    },
    {
      name: 'SPU',
      component: 'input',
      valueName: 'styleCode',
      props: {
        placeholder: '支持批量搜索，多个SPU用“,”隔开'
      },
    },
    {
      name: '款式品类',
      valueName: 'categoryNameList',
      component: 'slot',
      slotName: 'categoryNameList'
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
      name: '供给方式',
      valueName: 'supplyModeCodeList',
      component: 'select',
      options: plmStyleSource.value,
      props: {
        multiple: true,
      },
    },
    {
      name: '商品类型',
      valueName: 'productTypeList',
      component: 'select',
      options: productTypes.value.map(v => ({
        label: v.label,
        value: v.label
      })),
      props: {
        multiple: true,
        filterable: true,
      },
    },
    {
      name: '国家',
      component: 'select',
      valueName: 'countrySiteCodeList',
      props: {
        multiple: true,
      },
      options: NATIONAL_OPTIONS.value
    },
    {
      name: '波段',
      valueName: 'waveBandCodeList',
      component: 'select',
      options: waveBandCodeList.value,
      props: {
        multiple: true,
        filterable: true,
        collapseTags: true,
      },
    },
    {
      name: '店铺',
      component: 'select',
      valueName: 'storeIdList',
      options: SHOP_LIST.value,
      props: {
        multiple: true,
        filterable: true,
      },
    },
  ]);

  return {
    pimsCategory,
    searchConfig
  };
};
