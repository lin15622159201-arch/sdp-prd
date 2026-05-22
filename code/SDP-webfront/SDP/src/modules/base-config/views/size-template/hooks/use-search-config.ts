import { ENABLE_STATE_LIST } from '@/modules/base-config/constant';
import { IConfigItem } from '@toy/business-components';

const useSearchConfig = () => {
  const searchConfig: IConfigItem[] = [
    {
      component: 'input',
      valueName: 'templateName',
      name: '模板名称',
    },
    {
      component: 'select',
      valueName: 'isEnabled',
      name: '状态',
      options: ENABLE_STATE_LIST,
    },
    {
      component: 'slot',
      slotName: 'threeCategory',
      name: '商品三级品类',
    },
    {
      name: '创建时间：',
      component: 'datePicker',
      valueName: ['createdTimeBegin', 'createdTimeEnd'],
    },
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
