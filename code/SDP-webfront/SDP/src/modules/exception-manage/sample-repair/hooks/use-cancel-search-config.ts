import { IConfigItem } from '@toy/business-components';
import { REPAIR_LAUNCH_STEP_LIST, REPAIR_STATE_LIST } from '../constant';
import { ref } from 'vue';

const useCancelSearchConfig = () => {
  const searchConfig = ref<IConfigItem[]>([
    {
      valueName: 'designCode',
      name: 'SKC：',
      component: 'input'
    },
    {
      valueName: 'repairState',
      name: '取消环节',
      component: 'select',
      options: REPAIR_STATE_LIST,
    },
    {
      name: '取消时间：',
      component: 'datePicker',
      valueName: ['cancelTimeStart', 'cancelTimeEnd'],
      props: {
        valueFormat: 'x',
      },
    },
    {
      valueName: 'repairProcessStep',
      name: '发起环节：',
      component: 'select',
      options: REPAIR_LAUNCH_STEP_LIST,
    },
    {
      slotName: 'repairReasonCode',
      name: '返修原因：',
      component: 'slot',
    },
    {
      component: 'slot',
      slotName: 'cancelUserIdList',
      name: '取消人：',
    },
    {
      component: 'slot',
      slotName: 'repairmanId',
      name: '返修人：',
    },
    // slot:预估耗时
    {
      component: 'slot',
      slotName: 'estimatedTime',
      name: '预估耗时：',
    },
    {
      component: 'slot',
      slotName: 'roomIdList',
      name: '供应商：',
    },
  ]);
  return {
    searchConfig,
  };
};

export default useCancelSearchConfig;
