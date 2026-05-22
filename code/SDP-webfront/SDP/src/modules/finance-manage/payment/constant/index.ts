export enum STATUS_ENUM {
  ALL = '',
  WAIT = 0,
  DONE = 1,
}

export const STATUS_LIST = [
  { value: STATUS_ENUM.ALL, label: '全部', countKey: 'totalCount' },
  { value: STATUS_ENUM.WAIT, label: '待付款', countKey: 'pendingCount' },
  { value: STATUS_ENUM.DONE, label: '已付款', countKey: 'paidCount' },
];

export const DETAIL_TAB_LIST = [
  { value: STATUS_ENUM.ALL, label: '面料剪版' },
  { value: STATUS_ENUM.WAIT, label: '3D剪版' },
  { value: STATUS_ENUM.DONE, label: '数码描稿' },
  { value: STATUS_ENUM.DONE, label: '辅料开发' },
];
