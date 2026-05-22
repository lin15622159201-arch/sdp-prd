import { IConfigItem } from '@toy/business-components';
import { SEWING_COMPONENT_STATUS_LIST } from '../constant';

const useSearchConfig = () => {
  const searchConfig: IConfigItem[] = [
    {
      component: 'input',
      name: '工序部件',
      valueName: 'componentName'
    },
    {
      component: 'select',
      name: '状态',
      valueName: 'state',
      options: SEWING_COMPONENT_STATUS_LIST,
      props: {
        clearable: true,
      }
    },
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
