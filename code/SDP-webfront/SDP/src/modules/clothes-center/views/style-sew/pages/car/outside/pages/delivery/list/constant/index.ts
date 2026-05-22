import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待收货 */
  WAIT,
  /** 已收货 */
  FINISHED
}

export const TAB_LIST = [
  {
    label: '待收货',
    value: TABS_ENUM.WAIT,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_RECEIVING,
    nodeStateCode: '0',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_RECEIVING,
      clothesStepNodeState: '0',
      showCancel: false
    }
  },
  {
    label: '已收货',
    value: TABS_ENUM.FINISHED,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_RECEIVING,
    nodeStateCode: '1',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_RECEIVING,
      clothesStepNodeState: '1',
      showCancel: true
    }
  },
];
