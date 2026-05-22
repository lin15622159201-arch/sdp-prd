import { IConfigItem } from '@toy/business-components';
import { computed, Ref } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { MAKE_CLOTHES_TYPE_LIST } from '@/modules/clothes-center/constant';
import { DICTIONARY_KEY } from '@/constant/dictionary';
import { TABS_ENUM } from '../constant';

interface IParams {
  activeTab: Ref;
}

export const useSearch = ({ activeTab }: IParams) => {
  const { getDictionaryOptions } = useDictionary();
  /** 波段 */
  const plmClothingBand = computed(() => {
    return getDictionaryOptions(DICTIONARY_KEY.PLM_CLOTHING_BAND) || [];
  });
  const searchConfig = computed<IConfigItem[]>(() => {
    const roomIdsConfig: any = [];
    if (activeTab.value === TABS_ENUM.FINISHED) {
      roomIdsConfig.push({
        name: '分单结果',
        component: 'slot',
        slotName: 'roomIdList',
      });
    }
    const _searchConfig = [
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
        name: '审版工艺师',
        component: 'slot',
        slotName: 'reviewCraftsmanId',
      },
      {
        name: '打版方式',
        component: 'select',
        valueName: 'makeClothesType',
        type: 'type',
        options: MAKE_CLOTHES_TYPE_LIST,
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
        options: plmClothingBand.value
      },
      {
        name: '纸样师',
        component: 'slot',
        slotName: 'patternMakerIdList',
      },
      {
        name: '分单员',
        component: 'slot',
        slotName: 'allocateeIdList',
      },
    ];
    return [
      ..._searchConfig,
      ...roomIdsConfig,
      // {
      //   name: '耗时',
      //   component: 'slot',
      //   slotName: 'timeConsuming',
      // },
      {
        name: '创建时间',
        component: 'datePicker',
        valueName: ['allocateCreatedTimeStart', 'allocateCreatedTimeEnd'],
      },
      {
        name: '提交时间',
        component: 'datePicker',
        valueName: ['allocateFinishTimeStart', 'allocateFinishTimeEnd'],
      },
    ];
  });
  return {
    searchConfig,
  };
};
