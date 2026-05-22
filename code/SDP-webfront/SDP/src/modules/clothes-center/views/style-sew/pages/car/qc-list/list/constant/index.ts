import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待质检 */
  WAIT,
  /** 已质检 */
  FINISHED
}

export const TAB_LIST = [
  {
    label: '待质检',
    value: TABS_ENUM.WAIT,
    processStepCode: PROCESS_STEP_CODE_ENUM.QC,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SAMPLE_QC,
    nodeStateCode: '0',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.QC,
      clothesNode: PROCESS_NODE_CODE_ENUM.SAMPLE_QC,
      qcStatus: '0',
      clothesStepNodeState: '0',
      showCancel: false
    }
  },
  {
    label: '已质检',
    value: TABS_ENUM.FINISHED,
    processStepCode: PROCESS_STEP_CODE_ENUM.QC,
    processNodeCode: PROCESS_NODE_CODE_ENUM.SAMPLE_QC,
    nodeStateCode: '1',
    params: {
      clothesStep: PROCESS_STEP_CODE_ENUM.QC,
      clothesNode: PROCESS_NODE_CODE_ENUM.SAMPLE_QC,
      qcStatus: '1',
      clothesStepNodeState: '1',
      showCancel: true
    },
  },
];
