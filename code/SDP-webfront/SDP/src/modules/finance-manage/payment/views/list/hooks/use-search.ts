import { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => {
    return [
      {
        name: '付款单号',
        component: 'input',
        valueName: 'paymentOrderCode',
      },
      {
        name: '对账单号',
        component: 'input',
        valueName: 'totalBillCode',
      },
    ];
  });
  return {
    searchConfig,
  };
};
