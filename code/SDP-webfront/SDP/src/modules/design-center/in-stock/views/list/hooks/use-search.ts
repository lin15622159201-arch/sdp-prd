import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { IParams } from '../types';
import { IMAGE_UPDATE_STATE_LIST } from '@/modules/design-center/image-update/constant';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory = computed(() => getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || []);
  const styleTags = computed(() => getDictionaryOptions(DICTIONARY_KEY.PRODUCT_TAG) || []);

  const searchConfig = computed<IConfigItem<IParams>[]>(() => [
    {
      name: 'SPU',
      component: 'slot',
      slotName: 'taskCode',
    },
    {
      name: 'SKC',
      component: 'slot',
      slotName: 'skcCode',
    },
    {
      name: '品类',
      component: 'slot',
      slotName: 'categoryCodes'
    },
    {
      name: '供应商',
      component: 'input',
      valueName: 'supplierName',
    },
    {
      name: '供应商款号',
      component: 'input',
      valueName: 'supplierStyleCode',
    },
    {
      name: '设计师',
      component: 'slot',
      slotName: 'designerName',
    },
    {
      name: '修图任务',
      component: 'select',
      valueName: 'imageUpdateStatus',
      options: IMAGE_UPDATE_STATE_LIST,
    },
    {
      name: '款式标签',
      component: 'select',
      valueName: 'styleLabelCodes',
      props: { multiple: true },
      options: styleTags.value,
    },
    {
      name: '创建时间',
      valueName: ['createdStartTime', 'createdEndTime'],
      component: 'datePicker',
    },
  ]);

  return {
    pimsCategory,
    searchConfig
  };
};
