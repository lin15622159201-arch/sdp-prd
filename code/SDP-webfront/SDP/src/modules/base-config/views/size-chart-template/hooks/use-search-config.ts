import { IConfigItem } from '@toy/business-components';

const useSearchConfig = () => {
  const searchConfig: IConfigItem[] = [
    {
      component: 'slot',
      slotName: 'innerCategoryCodes',
      name: '内部品类',
    }
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
