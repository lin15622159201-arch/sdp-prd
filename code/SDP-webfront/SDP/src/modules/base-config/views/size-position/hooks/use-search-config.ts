import { STATUS_LIST } from '@/modules/base-config/constant';
import { IConfigItem } from '@toy/business-components';

const useSearchConfig = () => {
  const searchConfig: IConfigItem[] = [
    {
      component: 'input',
      valueName: 'clothesPartsName',
      name: '部位名称：',
    },
    {
      name: '状态：',
      component: 'select',
      valueName: 'status',
      options: STATUS_LIST,
    },
    {
      name: '创建时间：',
      component: 'datePicker',
      valueName: ['createdTimeBegin', 'createdTimeEnd'],
    },
  ];
  return {
    searchConfig,
  };
};

export default useSearchConfig;
