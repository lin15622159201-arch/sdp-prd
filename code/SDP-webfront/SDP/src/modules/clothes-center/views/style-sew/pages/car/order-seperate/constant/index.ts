import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待分单 */
  WAIT,
  /** 已分单 */
  FINISHED
}

export const TAB_LIST = [
  {
    label: '待分单',
    value: TABS_ENUM.WAIT,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_ALLOCATE,
    nodeStateCode: '0',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_ALLOCATE,
      clothesStepNodeState: '0',
      showCancel: false
    }
  },
  {
    label: '已分单',
    value: TABS_ENUM.FINISHED,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_ALLOCATE,
    nodeStateCode: '1',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_ALLOCATE,
      clothesStepNodeState: '1',
      showCancel: true
    },
  },
];
