import { IConfigItem } from '@toy/business-components';

const useSearchConfig = () => {
  const searchConfig: IConfigItem[] = [
    {
      component: 'slot',
      slotName: 'selectedCategoryTree',
      name: '款式品类',
    }
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
