import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { THREE_D_PURCHASE_STATUS_LIST } from '../../../constant';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => [
    {
      name: '任务编号：',
      component: 'input',
      valueName: 'gleanCode',
    },
    {
      name: 'SKC：',
      component: 'input',
      valueName: 'customerStyleCode',
    },
    {
      name: '设计师：',
      component: 'slot',
      slotName: 'designerId',
    },
    {
      valueName: 'purchaseState',
      name: '物料采购状态',
      component: 'select',
      options: THREE_D_PURCHASE_STATUS_LIST,
    },
    {
      name: '任务完成时间：',
      component: 'datePicker',
      valueName: ['gleanTaskFinishTimeStart', 'gleanTaskFinishTimeEnd'],
      placeholder: ['开始日期', '结束日期'],
    },
  ]);

  return {
    searchConfig
  };
};
