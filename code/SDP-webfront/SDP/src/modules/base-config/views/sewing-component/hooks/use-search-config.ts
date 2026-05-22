import { REGION_LIST } from '@/constant';
import { ENABLE_STATE_LIST } from '@/modules/base-config/constant';
import { IConfigItem } from '@toy/business-components';

const useSearchConfig = () => {
  const searchConfig: IConfigItem[] = [
    {
      component: 'select',
      valueName: 'regionId',
      name: '所属区域',
      options: REGION_LIST,
    },
    {
      component: 'input',
      valueName: 'componentName',
      name: '工序部件',
    },
    {
      component: 'select',
      valueName: 'state',
      name: '状态',
      options: ENABLE_STATE_LIST,
    },
    {
      name: '创建时间：',
      component: 'datePicker',
      valueName: ['createStartTime', 'createEndTime'],
    },
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
