import type { IConfigItem } from '@toy/business-components';
import { computed } from 'vue';
import { IShopPageReq } from '../../../api/type';
import { YES_NO_NUMBER_ENUM } from '@/constant';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem<IShopPageReq>[]>(() => [
    {
      name: '店铺名称',
      valueName: 'shopName',
      component: 'input',
    },
    {
      name: '店铺类型',
      component: 'slot',
      slotName: 'shopType',
    },
    {
      name: '运营人员',
      component: 'slot',
      slotName: 'businessOperatorId',
    },
    {
      name: '店铺状态',
      valueName: 'enable',
      component: 'select',
      options: [
        { label: '启用', value: YES_NO_NUMBER_ENUM.YES },
        { label: '禁用', value: YES_NO_NUMBER_ENUM.NO },
      ],
    },
    {
      name: '授权状态',
      valueName: 'expired',
      component: 'select',
      options: [
        { label: '全部', value: YES_NO_NUMBER_ENUM.ALL },
        { label: '正常', value: YES_NO_NUMBER_ENUM.YES },
        { label: '异常', value: YES_NO_NUMBER_ENUM.NO },
      ],
    },
  ]);

  return {
    searchConfig,
  };
};
