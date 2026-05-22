import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { ROOM_ENABLE_LIST } from '@/modules/distribute-room-manage/constant';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '供应商名称',
        component: 'input',
        valueName: 'roomName'
      },
      {
        name: '启用状态',
        component: 'select',
        valueName: 'enable',
        options: ROOM_ENABLE_LIST,
      },
    ];
  });
  return {
    searchConfig,
  };
};
