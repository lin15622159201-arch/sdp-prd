import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { MAKE_CLOTHES_TYPE_LIST } from '@/modules/clothes-center/constant';

export const useSearch = () => {
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
        name: '打版方式',
        component: 'select',
        valueName: 'makeClothesType',
        type: 'type',
        options: MAKE_CLOTHES_TYPE_LIST,
      },
      {
        name: '创建时间',
        component: 'datePicker',
        valueName: ['firstSampleCreatedTimeStart', 'firstSampleCreatedTimeEnd'],
      },
      {
        name: '完成时间',
        component: 'datePicker',
        valueName: ['auditPassTimeStart', 'auditPassTimeEnd'],
      },
      // {
      //   name: '耗时',
      //   component: 'slot',
      //   slotName: 'timeConsuming',
      // },
    ];
  });
  return {
    searchConfig,
  };
};
