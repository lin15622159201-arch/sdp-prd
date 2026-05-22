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
        name: '核价师',
        component: 'slot',
        slotName: 'pricerId',
      },
      {
        name: '款式品类',
        component: 'slot',
        slotName: 'categoryName'
      },
      {
        name: '耗时',
        component: 'slot',
        slotName: 'timeConsuming',
      },
      {
        name: '创建时间',
        component: 'datePicker',
        valueName: ['countCreatedTimeStart', 'countCreatedTimeEnd'],
      },
      {
        name: '提交时间',
        component: 'datePicker',
        valueName: ['finishTimeStart', 'finishTimeEnd'],
      },
    ];
  });
  return {
    searchConfig,
    pimsCategory,
    pimsCategoryProps
  };
};
