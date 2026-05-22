/**
 * 样衣核价状态 WAIT_CHECK_PRICE  HAD_CHECK_PRICE
 */
export enum CHECK_PRICE_STATE_ENUM {
  /**
   * 待核价
   */
  WAIT_CHECK_PRICE = 'WAIT_CHECK_PRICE',
  /**
   * 已核价
   */
  HAD_CHECK_PRICE = 'HAD_CHECK_PRICE',
  /**
   * UNKNOWN
   */
  UNKNOWN = 'UNKNOWN'
}

/** 样衣核价状态 */
export enum STATE_ENUM {
  /** 待核价 */
  WAIT_CHECK_PRICE = '100',
  /** 已核价 */
  HAD_CHECK_PRICE = '110',
}

export enum SHOW_TYPE_ENUM {
  /** 详情 */
  DETAIL = '1',
  /** 对比 */
  COMPARE = '2'
}
export const SHOW_TYPE_LIST = [
  {
    label: '详情',
    value: SHOW_TYPE_ENUM.DETAIL
  },
  {
    label: '对比',
    value: SHOW_TYPE_ENUM.COMPARE
  }
];
