import { YES_NO_ENUM } from '@/constant';
import { PROCESS_NODE_CODE_ENUM, PROCESS_STEP_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待接单 */
  WAIT_TAKE = '0',
  /** 待提交 */
  WAIT_SUBMIT = '1',
  /** 已提交 */
  SUBMIT = '2'
}

export const TABS_LIST = [
  {
    label: '待接单',
    value: TABS_ENUM.WAIT_TAKE,
    processNode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_ACCEPT,
    nodeStateCode: '1',
    params: {
      isAllocated: YES_NO_ENUM.YES,
      isOutsourced: YES_NO_ENUM.YES,
      dimensionState: '0',
      dimensionReceiving: '0',
      clothesStep: PROCESS_STEP_CODE_ENUM.DIMENSION,
      clothesNode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_ACCEPT,
    },
  },
  {
    label: '待提交',
    value: TABS_ENUM.WAIT_SUBMIT,
    processNode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_PROCESS,
    nodeStateCode: '0',
    params: {
      isAllocated: YES_NO_ENUM.YES,
      isOutsourced: YES_NO_ENUM.YES,
      dimensionState: '1',
      dimensionReceiving: '1',
      clothesStep: PROCESS_STEP_CODE_ENUM.DIMENSION,
      clothesNode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_PROCESS,
    },
  },
  {
    label: '已提交',
    value: TABS_ENUM.SUBMIT,
    processNode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_PROCESS,
    nodeStateCode: '1',
    params: {
      isAllocated: YES_NO_ENUM.YES,
      isOutsourced: YES_NO_ENUM.YES,
      dimensionState: '2',
      dimensionReceiving: '1',
      clothesStep: PROCESS_STEP_CODE_ENUM.DIMENSION,
      clothesNode: PROCESS_NODE_CODE_ENUM.DIMENSION_OUTER_PROCESS,
    },
  },
];
