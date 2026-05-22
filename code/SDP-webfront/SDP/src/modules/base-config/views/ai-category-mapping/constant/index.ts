export enum CATEGORY_TYPE_ENUM {
  /**
   * 服装-品类标签
   */
  CATEGORY = 'FM240402539',
  FABRIC = '面料-品类',
  /**
   * 服装-款式标签
   */
  CLOTH_STYLE_LABEL = 'FM240402540',
  /**
   * 风格
   */
  STYLE = 'FM240402543',
  /**
   * 年龄
   */
  AGE = 'FM240402542',
  /**
   * 区域
   */
  AREA = 'FM240402541',
  /**
   * 季节
   */
  SEASON = 'FM240402544',
  SCULPT = '面料-造型',
  /**
   * 花型-风格
   */
  PATTERN_STYLE = 'FM24091203',
  /**
    * 花型-元素
    */
  PATTERN_ELEMENT = 'FM24091202',
  /**
   * 风格-场景分类
   */
  STYLE_SCENE = 'FM24091207',
  /**
   * 风格-设计理念
   */
  STYLE_DESIGN = 'FM24091206',
  /**
   * 风格-艺术风格
   */
  STYLE_ART = 'FM24091205',
  /**
   * 风格-区域风格
   */
  STYLE_AREA = 'FM24091204',
  /**
   * 风格-风格
   */
  STYLE_STYLE = 'FM240402588',
}

/**
 * 映射类型
 */
export enum TYPE_MAPPING {
  /** 常规 */
  STANDARD_SIZE = 'STANDARD_SIZE',
  /** 大码 */
  PLUS_SIZE = 'PLUS_SIZE',
}

/**
 * 映射类型列表
 */
export const TYPE_MAPPING_LIST = [
  { value: TYPE_MAPPING.STANDARD_SIZE, label: '常规' },
  { value: TYPE_MAPPING.PLUS_SIZE, label: '大码' },
];

