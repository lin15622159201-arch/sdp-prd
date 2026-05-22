import { YES_NO_ENUM } from '@/constant';
import { PROCESS_NODE_CODE_ENUM } from '@/modules/clothes-center/constant';

export enum TABS_ENUM {
  /** 待分单 */
  WAIT,
  /** 已分单 */
  DISPATCH
}

export const TABS_LIST = [
  {
    label: '待分单',
    value: TABS_ENUM.WAIT,
    processNode: PROCESS_NODE_CODE_ENUM.DIMENSION_ALLOCATE,
    nodeStateCode: '0',
    params: {
      isAllocated: YES_NO_ENUM.NO,
      clothesStepNodeState: '0',
      // isOutsourced: YES_NO_ENUM.NO,
      // dimensionState: '0'
    },
  },
  {
    label: '已分单',
    value: TABS_ENUM.DISPATCH,
    processNode: PROCESS_NODE_CODE_ENUM.DIMENSION_ALLOCATE,
    nodeStateCode: '3',
    params: {
      isAllocated: YES_NO_ENUM.YES,
      clothesStepNodeState: '3',
      // isOutsourced: YES_NO_ENUM.NO,
      // dimensionState: '0'
    },
  },
];
