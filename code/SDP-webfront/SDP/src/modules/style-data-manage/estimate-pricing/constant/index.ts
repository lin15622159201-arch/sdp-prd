export enum TIME_CONSUMING_TYPE_ENUM {
  MIN = '1',
  HOUR = '2',
  DAY = '3',
}

// 耗时单位选项
export const TIME_CONSUMING_TYPE_LIST = [
  { label: '分钟', value: TIME_CONSUMING_TYPE_ENUM.MIN },
  { label: '小时', value: TIME_CONSUMING_TYPE_ENUM.HOUR },
  { label: '天', value: TIME_CONSUMING_TYPE_ENUM.DAY },
];

/**
 * 款式类型
 */
export enum STYLE_TYPE_ENUM {
  OEM = '1',
  ODM = '2',
}
export const STYLE_TYPE_LIST = [
  { value: STYLE_TYPE_ENUM.OEM, label: '设计款', color: 'success' },
  { value: STYLE_TYPE_ENUM.ODM, label: '现货款', color: 'warning' },
];

/**
 * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
 */
export enum CLOTHES_CHECK_PRICESTATE_ENUM {
  /**
   * WAIT_CHECK_PRICE
   */
  WAIT_CHECK_PRICE = 'WAIT_CHECK_PRICE',
  /**
   * HAD_CHECK_PRICE
   */
  HAD_CHECK_PRICE = 'HAD_CHECK_PRICE',
  /**
   * 以下的枚举 现货款的预估核价才有
   */
  REJECTION = 'REJECTION',
  /**
   * REVIEW_PASSED
   */
  REVIEW_PASSED = 'REVIEW_PASSED',
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
  /** 驳回 */
  REJECTION = '120',
}

/** 核价状态 */
export const CHECK_PRICE_STATE_LIST = [
  { value: CLOTHES_CHECK_PRICESTATE_ENUM.WAIT_CHECK_PRICE, label: '待核价', state: STATE_ENUM.WAIT_CHECK_PRICE },
  { value: CLOTHES_CHECK_PRICESTATE_ENUM.HAD_CHECK_PRICE, label: '已核价', state: STATE_ENUM.HAD_CHECK_PRICE },
  { value: CLOTHES_CHECK_PRICESTATE_ENUM.REJECTION, label: '驳回', state: STATE_ENUM.REJECTION },
];
