/** 用量核算状态 */
export enum CHECK_COUNT_STATE_ENUM {
  /**
   * 待核算
   */
  WAIT_CALCULATE = 'WAIT_CALCULATE',
  /**
   * 已核算
   */
  CALCULATED = 'CALCULATED',
}

export const CHECK_COUNT_STATE_LIST = [
  { value: CHECK_COUNT_STATE_ENUM.WAIT_CALCULATE, label: '待核算' },
  { value: CHECK_COUNT_STATE_ENUM.CALCULATED, label: '已核算' },
];

/** 分单状态 */
export enum ALLOCATE_STATE_ENUM {
  /** 未流转 */
  BASE = '0',
  /** 待分单 */
  WAIT_DISPATCH = '1',
  /** 已分单 */
  DISPATCH = '2',
}

/* 二次环节 */
export enum CRAFTS_REQUIRE_ENUM {
  /** 裁前 */
  BEFORE = '100',
  /** 裁后 */
  AFTER = '110',
}

export const CRAFTS_REQUIRE_LIST = [
  { value: CRAFTS_REQUIRE_ENUM.BEFORE, label: '裁前' },
  { value: CRAFTS_REQUIRE_ENUM.AFTER, label: '裁后' },
];

/** 物料需求类型 */
export enum MATERIAL_DEMAND_TYPE_ENUM {
  /** 面料 */
  FABRIC = '1',
  /** 辅料 */
  ACCESSORY = '2',
  /** 特殊辅料 */
  SPECIAL_ACCESSORY = '3'
}

/** 纸样分单状态 */
export enum ROOM_ALLOCATE_STATE {
  /** 内部 */
  INNER = '1',
  /** 外部 */
  OUTER = '2',
}
