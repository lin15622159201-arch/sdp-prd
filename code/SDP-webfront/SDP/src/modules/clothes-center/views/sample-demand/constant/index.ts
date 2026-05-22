/**
 * 状态
 */
export enum STATE_ENUM {
  /**
   * 待开始
   */
  WAITING = '0',
  /**
   * 进行中
   */
  DOING = '1',
  /**
   * 已完成
   */
  COMPLETED = '2',
  /**
   * 已取消
   */
  CANCELED = '3'
}

export const STATUS_LIST = [
  { label: '待开始', value: STATE_ENUM.WAITING },
  { label: '进行中', value: STATE_ENUM.DOING },
  { label: '已完成', value: STATE_ENUM.COMPLETED },
  { label: '已取消', value: STATE_ENUM.CANCELED },
];
