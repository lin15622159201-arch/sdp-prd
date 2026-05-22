import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '账单周期',
        component: 'slot',
        slotName: 'totalBillMonth'
      },
    ];
  });
  return {
    searchConfig,
  };
};
