import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';
import { PAGE_TYPE_STATUS_ENUM } from '../../../constant';

export enum TABS_ENUM {
  /** 待接单 */
  WAIT_TAKE,
  /** 待提交 */
  WAIT_SUBMIT,
  /** 已提交 */
  SUBMIT
}

export const TABS_LIST = [
  {
    label: '待接单',
    value: PAGE_TYPE_STATUS_ENUM.WAIT_DISPATCH,
    processNode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_ACCEPT,
    nodeStateCode: '2',
    params: {
      isAllocated: '1',
      isOutsourced: '1',
      dimensionState: '0',
      dimensionReceiving: '0',
      clothesStep: PROCESS_STEP_CODE_ENUM.PATTERN,
      clothesNode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_ACCEPT,
    },
  },
  {
    label: '待提交',
    value: PAGE_TYPE_STATUS_ENUM.WAIT,
    processNode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_PROCESS,
    nodeStateCode: '4',
    params: {
      isAllocated: '1',
      isOutsourced: '1',
      dimensionReceiving: '1',
      dimensionState: '1',
      clothesStep: PROCESS_STEP_CODE_ENUM.PATTERN,
      clothesNode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_PROCESS,
    },
  },
  {
    label: '已提交',
    value: PAGE_TYPE_STATUS_ENUM.SUBMIT,
    processNode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_PROCESS,
    nodeStateCode: '5',
    params: {
      isAllocated: '1',
      isOutsourced: '1',
      dimensionReceiving: '1',
      dimensionState: '2',
      clothesStep: PROCESS_STEP_CODE_ENUM.PATTERN,
      clothesNode: PROCESS_NODE_CODE_ENUM.PATTERN_OUTER_PROCESS,
    },
  },
];
