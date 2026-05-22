import { IConfigItem } from '@toy/business-components';
import { USER_MANAGEMENT_ROOM_ENABLE_LIST, USER_MANAGEMENT_ROOM_REGION_LIST } from '../../constant';

const useSearchConfig = () => {
  const searchConfig :IConfigItem[] = [
    {
      component: 'input',
      valueName: 'roomName',
      name: '版房名称',
    },
    {
      component: 'slot',
      slotName: 'addressDetail',
      name: '所属区域',
    },
    // {
    //   component: 'slot',
    //   slotName: 'serviceType',
    //   name: '服务类型',
    // },
    // {
    //   component: 'slot',
    //   slotName: 'goodAtCategorys',
    //   name: '擅长品类',
    // },
    {
      name: '业务归属',
      component: 'select',
      valueName: 'regionId',
      options: USER_MANAGEMENT_ROOM_REGION_LIST,
    },
    {
      name: '启用状态',
      component: 'select',
      valueName: 'enable',
      options: USER_MANAGEMENT_ROOM_ENABLE_LIST,
    },
    {
      name: '创建时间：',
      component: 'datePicker',
      valueName: ['createdTimeStart', 'createdTimeEnd'],
      props: {
        valueFormat: 'YYYY-MM-DD',
      }
    },
  ];
  return {
    searchConfig
  };
};

export default useSearchConfig;
