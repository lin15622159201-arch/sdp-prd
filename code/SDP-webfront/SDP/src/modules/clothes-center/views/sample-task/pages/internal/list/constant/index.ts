import { YES_NO_ENUM } from '@/constant';
import { PROCESS_NODE_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待提交 */
  WAIT,
  /** 已提交 */
  SUBMIT
}

export const TABS_LIST = [
  {
    label: '待提交',
    value: TABS_ENUM.WAIT,
    processNode: PROCESS_NODE_CODE_ENUM.DIMENSION_INNER_PROCESS,
    nodeStateCode: '0',
    params: {
      isAllocated: YES_NO_ENUM.YES,
      isOutsourced: YES_NO_ENUM.NO,
      dimensionState: '1'
    },
  },
  {
    label: '已提交',
    value: TABS_ENUM.SUBMIT,
    processNode: PROCESS_NODE_CODE_ENUM.DIMENSION_INNER_PROCESS,
    nodeStateCode: '1',
    params: {
      isAllocated: YES_NO_ENUM.YES,
      isOutsourced: YES_NO_ENUM.NO,
      dimensionState: '2'
    },
  },
];
