import { IConfigItem } from '@toy/business-components';
import { REPAIR_LAUNCH_STEP_LIST } from '../constant';
import { ref } from 'vue';

const useOuterSampleSearchConfig = () => {
  const searchConfig = ref<IConfigItem[]>([
    {
      valueName: 'designCode',
      name: 'SKC：',
      component: 'input'
    },
    {
      slotName: 'patternMakerIdList',
      component: 'slot',
      name: '纸样师：',
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
    // slot:预估耗时
    {
      component: 'slot',
      slotName: 'estimatedTime',
      name: '预估耗时：',
    },
    // slot:当前耗时slot
    {
      component: 'slot',
      slotName: 'timeConsuming',
      name: '当前耗时：',
    },
    {
      component: 'slot',
      slotName: 'roomIdList',
      name: '供应商：',
    },
    {
      name: '创建时间：',
      component: 'datePicker',
      valueName: ['createdTimeStart', 'createdTimeEnd'],
      props: {
        valueFormat: 'x',
      },
    },
    // slot:开发时效
    {
      component: 'slot',
      slotName: 'effectivenessType',
      labelWidth: '0px',
    },
  ]);
  return {
    searchConfig,
  };
};

export default useOuterSampleSearchConfig;
