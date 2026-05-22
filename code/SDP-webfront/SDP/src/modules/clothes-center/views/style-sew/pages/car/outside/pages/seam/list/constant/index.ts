import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待进行 */
  WAIT,
  /** 半成品工艺中 */
  SEMI,
  /** 车缝中 */
  DOING,
  /** 已完成 */
  FINISHED
}

export const TAB_LIST = [
  {
    label: '待进行',
    value: TABS_ENUM.WAIT,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
    nodeStateCode: '0',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
      clothesStepNodeState: '0',
      showCancel: false
    }
  },
  {
    label: '半成品工艺',
    value: TABS_ENUM.SEMI,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_HALF_SECOND_CRAFT,
    nodeStateCode: '1',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS_HALF_SECOND_CRAFT,
      clothesStepNodeState: '',
    }
  },
  {
    label: '车缝中',
    value: TABS_ENUM.DOING,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
    nodeStateCode: '1',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
      clothesStepNodeState: '1',
      showCancel: false
    },
  },
  {
    label: '已完成',
    value: TABS_ENUM.FINISHED,
    processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
    nodeStateCode: '2',
    params: {
      processStepCode: PROCESS_STEP_CODE_ENUM.SEW,
      clothesNode: PROCESS_NODE_CODE_ENUM.SEW_OUTER_PROCESS,
      clothesStepNodeState: '2',
      showCancel: true
    },
  },
];
