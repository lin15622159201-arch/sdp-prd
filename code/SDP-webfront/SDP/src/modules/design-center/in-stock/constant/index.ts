import { YES_NO_STRING_ENUM } from '@/constant';

/**
 * @description 样衣核价状态
 * WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价 REJECTION 驳回
 */
export enum CHECK_SAMPLE_PRICE_STATUS_ENUM {
  /** 待核价 */
  WAIT_CHECK_PRICE = 'WAIT_CHECK_PRICE',
  /** 已核价 */
  HAD_CHECK_PRICE = 'HAD_CHECK_PRICE',
  /** 已驳回 */
  REJECTION = 'REJECTION',
}

/**
 * @description 商品图状态
 */
export const PRODUCT_IMG_STATUS_LIST = [
  { value: YES_NO_STRING_ENUM.NO, label: '待补充' },
  { value: YES_NO_STRING_ENUM.YES, label: '已齐全' },
];

/**
 * @description 资料状态
 */
export const RESOURCE_STATUS_LIST = [
  { value: YES_NO_STRING_ENUM.NO, label: '待补充' },
  { value: YES_NO_STRING_ENUM.YES, label: '已完善' },
];

/** SKC数据来源 */
export enum SKC_SOURCE_TYPE_ENUM {
  /** 自建款 */
  SELF = '10',
  /** 选款 */
  STYLE = '20'
}
export const SKC_SOURCE_TYPE_LIST = [
  { value: SKC_SOURCE_TYPE_ENUM.SELF, label: '自建' },
  { value: SKC_SOURCE_TYPE_ENUM.STYLE, label: '选款' },
];

/** SKC状态 */
export enum SKC_STATE_ENUM {
  /** 自建款 */
  WAIT_SUBMIT = '1',
  /** 选款 */
  SUBMIT = '2'
}
/** SKC状态 */
export enum SPU_STATE_ENUM {
  /** 自建款 */
  WAIT_SUBMIT = '1',
  /** 选款 */
  SUBMIT = '2'
}
/**
 * @description 定价类型
 */
export enum PRICING_TYPE_ENUM {
  /** 按返单定价 */
  RETURN = '1',
  /** 按不返单定价 */
  NO_RETURN = '2',
}
export const PRICING_TYPE_LIST = [
  { value: PRICING_TYPE_ENUM.RETURN, label: '按返单定价' },
  { value: PRICING_TYPE_ENUM.NO_RETURN, label: '按不返单定价' },
];

// try on 操作类型
export enum OPERATION_TYPE {
  CREATED = 'created',
  AUDIT = 'audit',
}

/**
 * @description 图片类型
 */
export enum PICTURE_TYPE_ENUM {
  /**
   * 1=商品图
   */
  PRODUCT = '1',
  /**
   * 2=Try on图
   */
  TRY_ON = '2',
}
export const PICTURE_TYPE_LIST = [
  { value: PICTURE_TYPE_ENUM.PRODUCT, label: '商品图' },
  // { value: PICTURE_TYPE_ENUM.TRY_ON, label: 'Try on图' },
];

/**
 * @description 匹配方式
 */
export enum MATCH_TYPE_ENUM {
  /**
   * 1=SPU编码
   */
  SPU_CODE = '1',
  /**
   * 2=供应商款号
   */
  SUPPLIER = '2',
}
export const MATCH_TYPE_LIST = [
  { value: MATCH_TYPE_ENUM.SPU_CODE, label: 'SPU编码' },
  // { value: MATCH_TYPE_ENUM.SUPPLIER, label: '供应商款号' },
];

/** 默认尺码组编码 字母码 */
export const DEFAULT_SIZE_STANDARD_CODE = 'tiangong_code_standard';

export const DEFAULT_SKC_SIZES = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
];

/**
 * SKU分类
 */
export enum SKU_CATEGORY_ENUM {
  /** 单品 */
  SINGLE = '1',
  /** 同款多件 */
  MUTIPLE = '3',
  /** 混合套装 */
  MIXED = '2'
}
