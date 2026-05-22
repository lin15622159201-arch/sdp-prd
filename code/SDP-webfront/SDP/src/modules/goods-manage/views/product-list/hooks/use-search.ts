import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import type { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { PRODUCT_TAG_OPTIONS } from '../constant';
import { IProductPageReq } from '@/modules/goods-manage/api/product/type';
import { YES_OR_NO_NUMBER_LIST } from '@/constant';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const PRODUCT_TAGS = computed(() => getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG));
  const PLM_CLOTHING_BANDS = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND));
  const SHOP_LIST = computed(() => getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST));

  const disableAfterToday = (time: Date) => time.getTime() > Date.now();

  const searchConfig = computed<IConfigItem<IProductPageReq>[]>(() => [
    {
      labelWidth: '6px',
      component: 'slot',
      slotName: 'styleCode',
    },
    {
      name: '店铺',
      valueName: 'shopId',
      component: 'select',
      props: {
        filterable: true,
      },
      options: SHOP_LIST.value
    },
    {
      name: '商品标签',
      valueName: 'labels',
      component: 'select',
      options: PRODUCT_TAG_OPTIONS,
      props: {
        multiple: true,
      }
    },
    {
      labelWidth: '16px',
      component: 'slot',
      slotName: 'user'
    },
    {
      name: '前置拆版',
      valueName: 'preDisassemblyState',
      component: 'select',
      options: YES_OR_NO_NUMBER_LIST
    },
    {
      name: '波段',
      valueName: 'waveBandCode',
      component: 'select',
      props: {
        filterable: true,
      },
      options: PLM_CLOTHING_BANDS.value
    },
    {
      name: '创建时间',
      valueName: ['createdStartTime', 'createdEndTime'],
      component: 'datePicker',
      props: {
        disabledDate: disableAfterToday,
      }
    },
    {
      name: '款式标签',
      valueName: 'styleLabelCode',
      component: 'select',
      options: PRODUCT_TAGS.value
    },
  ]);

  return {
    searchConfig,
  };
};
