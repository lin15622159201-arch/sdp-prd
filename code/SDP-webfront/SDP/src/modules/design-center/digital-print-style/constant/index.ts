/** 推送状态 */
export enum PUSH_STATUS_ENUM {
  /** 成功 */
  SUCCESS = '1',
  /** 失败 */
  FAIL = '0',
}

export const PUSH_STATUS_LIST = [
  { label: '成功', value: PUSH_STATUS_ENUM.SUCCESS, color: 'success' },
  { label: '失败', value: PUSH_STATUS_ENUM.FAIL, color: 'danger' },
];
