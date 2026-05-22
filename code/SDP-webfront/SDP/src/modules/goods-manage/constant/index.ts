/**
 * 审核状态枚举
 */
export enum REVIEW_STATUS_ENUM {
  /** 待审核 */
  PENDING = 0,
  /** 已通过 */
  APPROVED = 1,
  /** 已驳回 */
  REJECTED = 2,
}
/**
 * 审核状态列表
 */
export const REVIEW_STATUS_LIST = [
  { label: '待审核', value: REVIEW_STATUS_ENUM.PENDING },
  { label: '已通过', value: REVIEW_STATUS_ENUM.APPROVED },
  { label: '已驳回', value: REVIEW_STATUS_ENUM.REJECTED },
];

/**
 * 发布状态枚举
 */
export enum RELEASE_STATUS_ENUM {
  /** 待发布 */
  PENDING = 0,
  /** 发布中 */
  RELEASING = 1,
  /** 已发布 */
  RELEASED = 2,
  /** 发布失败 */
  RELEASE_FAILED = 3,
}

/**
 * 发布状态列表
 */
export const RELEASE_STATUS_LIST = [
  { label: '待发布', value: RELEASE_STATUS_ENUM.PENDING },
  { label: '发布中', value: RELEASE_STATUS_ENUM.RELEASING },
  { label: '已发布', value: RELEASE_STATUS_ENUM.RELEASED },
  { label: '发布失败', value: RELEASE_STATUS_ENUM.RELEASE_FAILED },
];

/**
 * 店铺审核状态枚举
 */
export enum SHOP_REVIEW_STATUS_ENUM {
  /** 已通过 */
  PASS = 1,
  /** 已驳回 */
  REJECTED = 2,
}
