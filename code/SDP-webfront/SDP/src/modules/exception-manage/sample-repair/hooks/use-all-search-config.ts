import { IConfigItem } from '@toy/business-components';
import { REPAIR_LAUNCH_STEP_LIST, REPAIR_STATE_LIST } from '../constant';

const useAllSearchConfig = () => {
  const allSearchConfig : IConfigItem[] = [
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
      valueName: 'versionNum',
      name: '样衣版本：',
      component: 'inputNumber',
    },
    {
      component: 'slot',
      slotName: 'sewerIdList',
      name: '车缝师：',
    },
    {
      valueName: 'repairState',
      name: '返修环节：',
      component: 'select',
      props: {
        filterable: true,
      },
      options: REPAIR_STATE_LIST,
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
    // slot:开发时效
    {
      component: 'slot',
      slotName: 'effectivenessType',
      labelWidth: '0px',
    },
  ];
  return {
    allSearchConfig,
  };
};

export default useAllSearchConfig;
