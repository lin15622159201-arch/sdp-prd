import {
  PROCESS_NODE_CODE_ENUM,
  PROCESS_STEP_CODE_ENUM,
  SAMPLE_DEVELOP_STEP_STATE_ENMU
} from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待进行 */
  WORKING = '1',
  /** 已完成 */
  FINISHED = '2'
}

export const TABS_LIST = [
  {
    label: '进行中',
    value: SAMPLE_DEVELOP_STEP_STATE_ENMU.WORKING,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT,
    nodeStateCode: '1',
    params: {
      showCancel: false
    }
  },
  {
    label: '已完成',
    value: SAMPLE_DEVELOP_STEP_STATE_ENMU.FINISHED,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT,
    nodeStateCode: '2',
    params: {
      showCancel: true
    }
  },
];
