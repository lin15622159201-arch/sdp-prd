import { IConfigItem } from '@toy/business-components';
import { computed, ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { DICTIONARY_KEY } from '@/constant/dictionary';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory: any = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  const pimsCategoryProps = ref({
    label: 'label',
    value: 'label',
    // multiple: true,
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
        name: '开发人',
        component: 'slot',
        slotName: 'developer',
      },
      {
        name: '设计师',
        component: 'slot',
        slotName: 'designerIdList',
      },
      {
        name: '核价师',
        component: 'slot',
        slotName: 'pricerId',
      },
      {
        name: '供应商',
        component: 'input',
        valueName: 'supplierName',
      },
      {
        name: '供应商款号',
        component: 'input',
        valueName: 'supplierStyle',
        placeholder: '请输入',
      },
      {
        name: '创建时间',
        component: 'datePicker',
        valueName: ['priceCreatedTimeStart', 'priceCreatedTimeEnd'],
      },
      {
        name: '耗时',
        component: 'slot',
        slotName: 'timeConsuming',
      },
      {
        name: '款式品类',
        component: 'slot',
        slotName: 'categoryName',
      },
      {
        name: '核价日期',
        valueName: ['finishTimeStart', 'finishTimeEnd'],
        component: 'datePicker',
      },
    ];
  });
  return {
    searchConfig,
    pimsCategory,
    pimsCategoryProps
  };
};
