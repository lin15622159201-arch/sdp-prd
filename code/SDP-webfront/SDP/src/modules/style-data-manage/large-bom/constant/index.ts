/** 大货bom详情 tab */
export enum BOM_TAB_NAMES {
  /** 面料 */
  FABRIC = 'FABRIC',
  /** 辅料 */
  ACCESSORIES = 'ACCESSORIES',
  /** 工艺 */
  CRAFT = 'CRAFT',
  /** 特殊辅料 */
  SPECIAL_ACCESSORIES = 'SPECIAL_ACCESSORIES',
}

/** 大货bom详情 物料需求类型 */
export enum LARGE_BOM_DEMAND_TYPE_ENUM {
  /** 面料 */
  FABRIC = '1',
  /** 辅料 */
  ACCESSORIES = '2',
  /** 特殊辅料 */
  SPECIAL_ACCESSORIES = '3',
}
export const LARGE_BOM_DEMAND_TYPE_LIST = [
  { value: LARGE_BOM_DEMAND_TYPE_ENUM.FABRIC, label: '面料' },
  { value: LARGE_BOM_DEMAND_TYPE_ENUM.ACCESSORIES, label: '辅料' },
  { value: LARGE_BOM_DEMAND_TYPE_ENUM.SPECIAL_ACCESSORIES, label: '特殊辅料' },
];

/** 大货bom详情 商品类型 商品类型: PURE 净色 FLOWER 花型 ACCESSORIES 辅料 特殊辅料 SPECIAL_ACCESSORIES  */
export enum LARGE_BOM_COMMODITY_TYPE_ENUM {
  /** 净色 */
  PURE = 'PURE',
  /** 花型 */
  FLOWER = 'FLOWER',
  /** 辅料 */
  ACCESSORIES = 'ACCESSORIES',
  /** 特殊辅料 */
  SPECIAL_ACCESSORIES = 'SPECIAL_ACCESSORIES',
}
export const LARGE_BOM_COMMODITY_TYPE_LIST = [
  { value: LARGE_BOM_COMMODITY_TYPE_ENUM.PURE, label: '净色' },
  { value: LARGE_BOM_COMMODITY_TYPE_ENUM.FLOWER, label: '花型' },
  { value: LARGE_BOM_COMMODITY_TYPE_ENUM.ACCESSORIES, label: '辅料' },
  { value: LARGE_BOM_COMMODITY_TYPE_ENUM.SPECIAL_ACCESSORIES, label: '特殊辅料' },
];

/* 大货bom详情 工艺次序 工艺要求 */
export enum CRAFTS_REQUIRE_ENUM {
  BEFORE = '100',
  AFTER = '110',
}
export const CRAFTS_REQUIRE_LIST = [
  { value: CRAFTS_REQUIRE_ENUM.BEFORE, label: '裁前' },
  { value: CRAFTS_REQUIRE_ENUM.AFTER, label: '裁后' },
];
