export { CLOTHES_CHECK_PRICESTATE_ENUM, CHECK_PRICE_STATE_LIST } from '../estimate-pricing/constant';

/**
 * 款式类型
 */
export enum STYLE_TYPE_ENUM {
  OEM = '1',
  ODM = '2',
}
export const STYLE_TYPE_LIST = [
  { value: STYLE_TYPE_ENUM.OEM, label: '正常款' },
  { value: STYLE_TYPE_ENUM.ODM, label: '复色款' },
];

/**
 * 核价状态枚举
 */
export enum CHECK_PRICE_STATE_ENUM {
  WAIT_CHECK_PRICE = '0',
  CHECK_PRICING = '1',
  CHECK_PRICE_SUCCESS = '2',
}

/** 样衣核价 获取详情目的 */
export enum DETAIL_AIM_ENUM {
  /** 查看 */
  VISIT = 'VISIT',
  /** 初次核算 */
  INIT_CHECK = 'INIT_CHECK',
  /** 核算更新 */
  RE_CHECK = 'RE_CHECK',
}

/**
 * 所属区域
 */
export enum BELONG_AREA_ENUM {
  /**
   * 全国
   */
  NATIONWIDE = 'NATIONWIDE',
  /**
   * 广州
   */
  GUANGZHOU = 'GUANGZHOU',
  /**
   * 杭州
   */
  HANGZHOU = 'HANGZHOU'
}
