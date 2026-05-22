export enum OPEN_STYLE_STATUS_ENUM {
  /** 待处理 */
  WAIT = 0,
  /** 已开款 */
  SUCCESS = 1,
  /** 已淘汰 */
  FAIL = 2,
}

export const OPEN_STYLE_STATUS_LIST = [
  { label: '待处理', value: OPEN_STYLE_STATUS_ENUM.WAIT, type: 'warning' },
  { label: '已开款', value: OPEN_STYLE_STATUS_ENUM.SUCCESS, type: 'success' },
  { label: '已淘汰', value: OPEN_STYLE_STATUS_ENUM.FAIL, type: 'danger' },
];
