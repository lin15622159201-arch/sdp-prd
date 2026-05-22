/**
 * @description: 3D任务状态
 */
export enum THREE_D_COLLECTION_TASK_STATUS_ENUM {
  ALL = '',
  /**
   * @description: 待领取
   */
  WAIT_RECEIVE = '0',
  /**
   * @description: 待采集
   */
  WAIT_COLLECT = '1',
  /**
   * @description: 采集中
   */
  COLLECTING = '2',
  /**
   * @description: 已采集
   */
  COLLECTED = '3',
  /**
   * @description: 已关闭
   */
  CLOSE = '4',
}
export const THREE_D_COLLECTION_TASK_STATUS_LIST = [
  {
    label: '全部',
    value: THREE_D_COLLECTION_TASK_STATUS_ENUM.ALL,
    count: '0',
  },
  {
    label: '待领取',
    value: THREE_D_COLLECTION_TASK_STATUS_ENUM.WAIT_RECEIVE,
    count: '0',
  },
  {
    label: '待采集',
    value: THREE_D_COLLECTION_TASK_STATUS_ENUM.WAIT_COLLECT,
    count: '0',
  },
  {
    label: '采集中',
    value: THREE_D_COLLECTION_TASK_STATUS_ENUM.COLLECTING,
    count: '0',
  },
  {
    label: '已采集',
    value: THREE_D_COLLECTION_TASK_STATUS_ENUM.COLLECTED,
    count: '0',
  },
  {
    label: '已关闭',
    value: THREE_D_COLLECTION_TASK_STATUS_ENUM.CLOSE,
    count: '0',
  },
];

/**
 * @description: 3d采购状态
 */
export enum THREE_D_PURCHASE_STATUS_ENUM {
  /**
   * @description: 1 = 采购中
   */
  PURCHASING = '1',
  /**
   * @description: 2 = 已完成
   */
  COMPLETED = '2',
  /**
   * 3=已关闭
   */
  CLOSED = '3',
}
export const THREE_D_PURCHASE_STATUS_LIST = [
  {
    label: '采购中',
    value: THREE_D_PURCHASE_STATUS_ENUM.PURCHASING,
  },
  {
    label: '已完成',
    value: THREE_D_PURCHASE_STATUS_ENUM.COMPLETED,
  },
  {
    label: '已关闭',
    value: THREE_D_PURCHASE_STATUS_ENUM.CLOSED,
  }
];
