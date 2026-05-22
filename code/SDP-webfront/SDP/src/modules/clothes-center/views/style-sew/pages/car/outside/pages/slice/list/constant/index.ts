import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 进行中 */
  DOING,
  /** 已完成 */
  FINISHED
}

export const TABS_LIST = [
  {
    label: '进行中',
    value: TABS_ENUM.DOING,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT,
    nodeStateCode: '1',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT,
      clothesStepNodeState: '1',
      showCancel: false
    },
  },
  {
    label: '已完成',
    value: TABS_ENUM.FINISHED,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT,
    nodeStateCode: '2',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT,
      clothesStepNodeState: '2',
      showCancel: true
    },
  },
];
