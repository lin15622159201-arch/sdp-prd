import { YES_OR_NO_NUMBER_LIST } from '@/constant';
import { CUSTOM_DICTIONARY_KEY, DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import type { IStyleOnShelvesPageReq } from '@/modules/goods-manage/api/listing/type';
import type { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const PRODUCT_TAGS = computed(() => getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG));
  const PLM_CLOTHING_BANDS = computed(() => getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND));
  const SHOP_LIST = computed(() => getDictionaryOptions(CUSTOM_DICTIONARY_KEY.SHOP_LIST));

  const disableAfterToday = (time: Date) => time.getTime() > Date.now();

  const searchConfig = computed<IConfigItem<IStyleOnShelvesPageReq>[]>(() => [
    {
      labelWidth: '6px',
      component: 'slot',
      slotName: 'styleCode',
    },
    {
      name: '设计师',
      component: 'slot',
      slotName: 'designerId',
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
      name: '店铺',
      valueName: 'storeId',
      component: 'select',
      props: {
        filterable: true,
      },
      options: SHOP_LIST.value
    },
    {
      name: '前置拆版',
      valueName: 'preDisassemblyState',
      component: 'select',
      options: YES_OR_NO_NUMBER_LIST
    },
    {
      name: '审核人',
      component: 'slot',
      slotName: 'reviewUserId',
    },
    {
      name: '审核时间',
      valueName: ['reviewStartTime', 'reviewEndTime'],
      component: 'datePicker',
      props: {
        disabledDate: disableAfterToday,
      }
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
