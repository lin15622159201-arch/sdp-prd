import {
  SAMPLE_TYPE_LIST,
  SAMPLE_PAGE_TYPE_ENUM
} from '@/modules/clothes-center/constant';

export enum PICTURE_ORIENTATION_ENUM {
  BACK = 'back',
  FRONT = 'front',
  SIDE = 'side',
  OTHER = 'other',
  DETAIL = 'detail',
}

export enum STATUS_LIST_ENUM {
  WAIT = '0',
  COMPLETED = '1',
}

export const STATUS_LIST = [
  { label: '待分单', value: STATUS_LIST_ENUM.WAIT },
  { label: '已分单', value: STATUS_LIST_ENUM.COMPLETED },
];

export const INTERNAL_STATUS_LIST = [
  { label: '待提交', value: SAMPLE_PAGE_TYPE_ENUM.WAIT },
  { label: '已提交', value: '2' },
];

export const OUTSIDE_STATUE_LIST = [
  { label: '待接单', value: SAMPLE_PAGE_TYPE_ENUM.WAIT_DISPATCH },
  { label: '待提交', value: SAMPLE_PAGE_TYPE_ENUM.WAIT },
  { label: '已提交', value: '2' },
];
