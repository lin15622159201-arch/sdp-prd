import { computed, ref, Ref } from 'vue';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { useDictionary } from '@/hooks/use-dictionary';
import { IStyleInfoPageReq } from '../../../../api/types';
import {
  STYLE_INFO_IS_ALLOCATED_ENUM
} from '@/modules/style-data-manage/large/constant';

interface IParams {
  params: Ref<IStyleInfoPageReq>;
}

export const useSearch = ({ params }: IParams) => {
  const { getDictionaryOptions } = useDictionary();
  const pimsCategory: any = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PIMS_CATEGORY, 3) || [];
  });
  const pimsCategoryProps = ref({
    label: 'label',
    value: 'label',
    multiple: true,
  });
  const searchConfig = computed(() => {
    const _searchConfig = [
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
        name: '分单员',
        component: 'slot',
        slotName: 'allocateeIdList',
      },
    ];
    if (params.value.isAllocated === STYLE_INFO_IS_ALLOCATED_ENUM.YES) {
      _searchConfig.push({
        name: '分单结果',
        component: 'slot',
        slotName: 'roomIdList',
      });
    }
    return [
      ..._searchConfig,
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
    ];
  });
  return {
    searchConfig,
    pimsCategory,
    pimsCategoryProps
  };
};
