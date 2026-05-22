import { PAGE_TYPE_STATUS_ENUM } from '../../../constant';
import { PROCESS_NODE_CODE_ENUM } from '@/modules/clothes-center/constant';

export const TABS_LIST = [
  {
    label: '待分单',
    value: PAGE_TYPE_STATUS_ENUM.WAIT_ORDER,
    processNode: PROCESS_NODE_CODE_ENUM.PATTERN_ALLOCATE,
    nodeStateCode: '0',
    params: {},
  },
  {
    label: '已分单',
    value: PAGE_TYPE_STATUS_ENUM.ORDER,
    processNode: PROCESS_NODE_CODE_ENUM.PATTERN_ALLOCATE,
    nodeStateCode: '1',
    params: {},
  },
];
