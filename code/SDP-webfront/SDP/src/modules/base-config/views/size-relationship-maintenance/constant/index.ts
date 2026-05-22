export enum SAMPLE_SIZE_STATE_ENUM {
  /**
   * 未选中
   */
  UNCHECKED = '0',
  /**
   * 已选中
   */
  CHECKED = '1',
}

export const SAMPLE_SIZE_STATE_ENUM_LIST = [
  { value: SAMPLE_SIZE_STATE_ENUM.UNCHECKED, label: '未选中' },
  { value: SAMPLE_SIZE_STATE_ENUM.CHECKED, label: '已选中' },
];
