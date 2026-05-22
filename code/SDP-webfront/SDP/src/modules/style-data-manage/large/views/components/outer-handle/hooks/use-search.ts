import { computed, ref } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory: any = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  const pimsCategoryProps = ref({
    label: 'label',
    value: 'label',
    multiple: true,
  });
  const searchConfig = computed<IConfigItem[]>(() => [
    {
      name: 'SKC',
      component: 'input',
      valueName: 'designCode',
    },
    {
      name: 'SPU',
      component: 'input',
      valueName: 'styleCodeLike',
    },
    {
      name: '款式品类',
      component: 'slot',
      slotName: 'styleTypeNames'
    },
    {
      name: '供应商',
      component: 'slot',
      slotName: 'roomIdList',
    },
    {
      name: '耗时',
      component: 'slot',
      slotName: 'timeConsuming',
    },
    {
      name: '创建时间',
      component: 'datePicker',
      valueName: ['createStart', 'createEnd'],
    },
    {
      name: '提交时间',
      component: 'datePicker',
      valueName: ['submitStart', 'submitEnd'],
    },
  ]);
  return {
    searchConfig,
    pimsCategory,
    pimsCategoryProps
  };
};
