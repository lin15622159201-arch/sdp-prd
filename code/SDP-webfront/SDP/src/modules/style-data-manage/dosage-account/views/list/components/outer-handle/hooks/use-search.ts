import { computed, Ref } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { IParams } from '../types';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem<IParams>[]>(() => [
    {
      name: 'SKC',
      component: 'input',
      valueName: 'designCode',
    },
    {
      name: 'SPU',
      component: 'input',
      valueName: 'styleCode',
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
      valueName: ['countCreatedTimeStart', 'countCreatedTimeEnd'],
    },
    {
      name: '提交时间',
      component: 'datePicker',
      valueName: ['finishTimeStart', 'finishTimeEnd'],
    },
  ]);
  return {
    searchConfig
  };
};
