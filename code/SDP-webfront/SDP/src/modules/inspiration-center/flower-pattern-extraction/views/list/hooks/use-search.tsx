import { IConfigItem } from '@/components/search-area';
import { computed } from 'vue';
import { FLOWER_PATTERN_TASK_STATUS_ENUM_LIST } from '../../../constant';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '任务编号：',
        component: 'input',
        valueName: 'taskCode',
        placeholder: '请输入任务编号',
      },
      {
        name: '创建人：',
        slotName: 'creatorName',
      },
      {
        name: '创建时间：',
        component: 'datePicker',
        valueName: ['createdStartTime', 'createdEndTime'],
        placeholder: ['开始日期', '结束日期']
      },
    ];
  });
  const conditionState = {
    title: '生成状态：',
    conditionList: [
      {
        value: '',
        label: '全部',
      },
      ...FLOWER_PATTERN_TASK_STATUS_ENUM_LIST,
    ],
  };
  return {
    searchConfig,
    conditionState,
  };
};
