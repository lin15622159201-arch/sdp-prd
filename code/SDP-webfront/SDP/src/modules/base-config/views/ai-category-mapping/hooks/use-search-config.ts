import { IConfigItem } from '@toy/business-components';

const useSearchConfig = () => {
  const searchConfig: IConfigItem[] = [
    {
      component: 'slot',
      slotName: 'aiCategoryTree',
      name: 'AI品类',
    },
    {
      component: 'slot',
      slotName: 'innerCategoryTree',
      name: '内部品类',
    }
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
