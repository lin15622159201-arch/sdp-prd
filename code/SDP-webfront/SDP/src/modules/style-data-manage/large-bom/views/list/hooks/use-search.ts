import { computed } from 'vue';
import { IConfigItem } from '@toy/business-components';

export const useSearch = () => {
  const searchConfig = computed<IConfigItem[]>(() => [
    {
      name: '款式号',
      component: 'input',
      valueName: 'styleCodeLike',
      show: true,
    },
    {
      name: 'SKC',
      component: 'input',
      valueName: 'designCode',
    },
    {
      name: '设计师',
      component: 'slot',
      slotName: 'designerIdList',
    },
    {
      name: 'bom版本号',
      component: 'input',
      valueName: 'bomVersionLike',
    },
    {
      name: '创建时间',
      valueName: ['createStart', 'createEnd'],
      component: 'datePicker',
    },
    {
      name: '款式品类',
      component: 'slot',
      slotName: 'styleTypeLikeArr'
    },
  ]);
  return {
    searchConfig
  };
};
