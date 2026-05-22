import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';
import { DIGITAL_DRAFT_TASK_CODE_STATUS_LIST, DIGITAL_DRAFT_TASK_URGENCY_LIST } from '../../../constant';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => [
    {
      name: '任务编号：',
      component: 'input',
      valueName: 'taskCode',
    },
    {
      name: 'SKC：',
      component: 'input',
      valueName: 'designCode',
    },
    {
      name: '设计师：',
      component: 'input',
      valueName: 'designerName',
      props: {
        placeholder: '请输入设计师',
      }
    },
    {
      name: '创建人：',
      component: 'slot',
      slotName: 'creatorId',
    },
    {
      name: '创建时间：',
      component: 'datePicker',
      valueName: ['createdTimeStart', 'createdTimeEnd'],
      placeholder: ['开始日期', '结束日期'],
    },
    {
      valueName: 'urgentType',
      name: '紧急程度：',
      component: 'select',
      options: DIGITAL_DRAFT_TASK_URGENCY_LIST,
    },
    {
      name: '花型编号：',
      component: 'input',
      valueName: 'flowerCode',
    },
    {
      valueName: 'fabricSkuState',
      name: '编码状态：',
      component: 'select',
      options: DIGITAL_DRAFT_TASK_CODE_STATUS_LIST,
    },
  ]);

  return {
    searchConfig
  };
};
