import { computed, ref } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { useDictionary } from '@/hooks/use-dictionary';
import { IMaterialPageReq } from '../../../api/types';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { MATERIAL_KITTING_STATE_LIST } from '../../../constant';

export const useSearch = () => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  const searchConfig = computed<IConfigItem<IMaterialPageReq>[]>(() => [
    {
      name: 'SKC',
      component: 'input',
      valueName: 'designCode',
    },
    {
      name: '齐套单号',
      component: 'input',
      valueName: 'materialKittingCode',
    },
    {
      name: '齐套签收时间',
      valueName: ['signingTimeStart', 'signingTimeEnd'],
      component: 'datePicker',
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
      name: '商品末级分类',
      component: 'slot',
      slotName: 'categoryNameList'
    },
    {
      name: '齐套环节',
      component: 'select',
      valueName: 'materialStateList',
      props: {
        multiple: true,
      },
      options: MATERIAL_KITTING_STATE_LIST
    },
    {
      name: '创建时间',
      valueName: ['createdTimeStart', 'createdTimeEnd'],
      component: 'datePicker',
    },
  ]);

  return {
    pimsCategory,
    searchConfig
  };
};
