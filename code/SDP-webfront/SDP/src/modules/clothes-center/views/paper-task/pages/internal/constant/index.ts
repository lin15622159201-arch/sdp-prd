import { PAGE_TYPE_STATUS_ENUM } from '../../../constant';
import { PROCESS_NODE_CODE_ENUM } from '@/modules/clothes-center/constant';

export const TABS_LIST = [
  {
    label: '待提交',
    value: PAGE_TYPE_STATUS_ENUM.WAIT,
    processNode: PROCESS_NODE_CODE_ENUM.PATTERN_INNER_PROCESS,
    nodeStateCode: '4',
    params: {},
  },
  {
    label: '已提交',
    value: PAGE_TYPE_STATUS_ENUM.SUBMIT,
    processNode: PROCESS_NODE_CODE_ENUM.PATTERN_INNER_PROCESS,
    nodeStateCode: '5',
    params: {},
  },
];
