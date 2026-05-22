import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待签收 */
  WAIT,
  /** 已签收 */
  FINISHED
}

export const TAB_LIST = [
  {
    label: '待签收',
    value: TABS_ENUM.WAIT,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_FABRIC_ACCESSORIES_SIGN_IN,
    nodeStateCode: '0',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_FABRIC_ACCESSORIES_SIGN_IN,
      clothesStepNodeState: '0',
      showCancel: false
    }
  },
  {
    label: '已签收',
    value: TABS_ENUM.FINISHED,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_FABRIC_ACCESSORIES_SIGN_IN,
    nodeStateCode: '1',
    params: {
      processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_FABRIC_ACCESSORIES_SIGN_IN,
      clothesStepNodeState: '1',
      showCancel: true,
    },
  },
];
