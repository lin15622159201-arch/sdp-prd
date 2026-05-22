import { IConfigItem } from '@toy/business-components';

const useSearchConfig = () => {
  const searchConfig :IConfigItem[] = [
    {
      component: 'input',
      valueName: 'designCode',
      name: 'SKC',
    },
    {
      component: 'slot',
      slotName: 'patternMakerId',
      name: '纸样师',
    },
    {
      component: 'input',
      valueName: 'styleCode',
      name: '款式号',
    },
    {
      component: 'datePicker',
      valueName: ['createdTimeStart', 'createdTimeEnd'],
      name: '创建时间',
    },
    {
      component: 'input',
      valueName: 'versionNo',
      name: '版本号',
    },
    {
      component: 'slot',
      slotName: 'category',
      name: '款式品类',
    },
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
