export interface IReferSize {
  /**
   * 版房品类(版房品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  roomCategory: string;
  /**
   * 版房品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  roomCategoryName?: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 引用尺寸表模板
   */
  referSizeTemplate?: string;
  /**
   * 尺寸表
   */
  sizeTable: IReferSizeSizeTableItem[];
  clothingSize?: string;
}
export interface IReferSizeSizeTableItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位名
   */
  position?: string;
  /**
   * 尺寸维度
   */
  sizeDimensions?: string;
  /**
   * 量法
   */
  measureMethod?: string;
  /**
   * 纸样尺寸
   */
  patternSizes: IReferSizeSizeTableItemPatternSizesItem[];
  /**
   * 允许误差
   */
  errorRange?: string;
  /**
   * 备注
   */
  remark?: string;
}

export interface IReferSizeSizeTableItemPatternSizesItem {
  name?: string;
  value?: string;
}
