/**
 * 商品标签枚举
 */
export enum PRODUCT_TAG_ENUM {
  /** 动销款 */
  HOT_SELLING = '动销款',
  /** 待更新 */
  TO_BE_UPDATED = '待更新',
  /** 已拆版 */
  SPLIT_VERSION = '已拆版',
  /** 测价通过 */
  PRICE_TEST_PASSED = '测价通过',
}
/**
 * 商品标签选项
 */
export const PRODUCT_TAG_OPTIONS = Object.values(PRODUCT_TAG_ENUM).map(tag => ({
  label: tag,
  value: tag,
}));

/**
 * SKC状态枚举（即商品状态）
 */
export enum SKC_STATUS_ENUM {
  /** 价格申报中 */
  ON_SALE = 7,
  /** 价格已作废 */
  PRICE_VOIDED = 9,
  /** 未发布到站点 */
  NOT_PUBLISHED = 10,
  /** 已发布到站点 */
  PUBLISHED = 12,
  /** 已下架/终止 */
  OFF_SHELVES = 13,
  /** 待更新 */
  TO_BE_UPDATED = 100,
}
/**
 * SKC状态选项（即商品状态选项）
 */
export const SKC_STATUS_OPTIONS = [
  { label: '价格申报中', value: SKC_STATUS_ENUM.ON_SALE },
  { label: '价格已作废', value: SKC_STATUS_ENUM.PRICE_VOIDED },
  { label: '未发布到站点', value: SKC_STATUS_ENUM.NOT_PUBLISHED },
  { label: '已发布到站点', value: SKC_STATUS_ENUM.PUBLISHED },
  { label: '已下架/终止', value: SKC_STATUS_ENUM.OFF_SHELVES },
];

/**
 * 商品状态枚举
 */
export enum PRODUCT_STATUS_ENUM {
  /** 草稿 */
  DRAFT = -1,
  /** 发布中 */
  PUBLISHING = 0,
  /** 已发布 */
  PUBLISHED = 1,
  /** 发布失败 */
  PUBLISH_FAILED = 9,
  /** 编辑-SKC */
  EDIT_SKC = 10,
  /** 编辑-图片 */
  EDIT_FILE = 11,
  /** 编辑-发布失败 */
  EDIT_FAILED = 19,
}
