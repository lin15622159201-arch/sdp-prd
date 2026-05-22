export interface PatternLibsListReq {
  /** 版型库编码 */
  modelRepCode?: string;
  /** 款式品类编码,如(code1-code2-code3) */
  categoryCode?: string;
  /** 织造方式编码 */
  weaveModeCode?: string;
  /** 弹力编码 */
  elasticForceCode?: string;
  /** 纸样师名称 */
  patternMakerName?: string;
  /** 轮廓编码 */
  outlineCode?: string;
  /** 领型编码 */
  collarTypeCode?: string;
  /** 袖型编码 */
  sleeveTypeCode?: string;
  /** 腰型编码 */
  waistTypeCode?: string;
  /** 裤型编码 */
  pantsTypeCode?: string;
  /** 裙型编码 */
  skirtShapeCode?: string;
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
}

export interface PatternLibs {
  modelRepositoryId?: string | number;
  /** 版型库编码【取ops】 */
  modelRepCode?: string;
  /** 版型库名称 */
  modelRepName?: string;
  /** 款式品类编码,如(code1-code2-code3) */
  categoryCode?: number | string;
  /** 款式品类名,如(女装-上装-T恤) */
  categoryName?: string;
  /** 织造方式名称 */
  weaveModeName?: string;
  /** 织造方式编码 */
  weaveModeCode?: string;
  /** 弹力 */
  elasticForce?: string;
  /** 弹力编码 */
  elasticForceCode?: string;
  /** 纸样师名称 */
  patternMakerName?: string;
  /** 纸样师id */
  patternMakerId?: number | string;
  /** 尺码 */
  sizeName?: string;
  /** 尺码标准编号 (如:tiangong_code_standard) */
  sizeStandardCode?: string;
  /** 尺码标准名称 (如:天工尺码标准) */
  sizeStandard?: string;
  /** 轮廓 */
  outline?: string;
  /** 领型 */
  collarType?: string;
  /** 袖型 */
  sleeveType?: string;
  /** 腰型 */
  waistType?: string;
  /** 裤型 */
  pantsType?: string;
  /** 裙型 */
  skirtShape?: string;
  /** 轮廓编码 */
  outlineCode?: string;
  /** 领型编码 */
  collarTypeCode?: string;
  /** 袖型编码 */
  sleeveTypeCode?: string;
  /** 腰型编码 */
  waistTypeCode?: string;
  /** 裤型编码 */
  pantsTypeCode?: string;
  /** 裙型编码 */
  skirtShapeCode?: string;
  /** 3D正面图 */
  sampleFront3dUrl?: string;
  /** 3D侧面图 */
  sampleSide3dUrl?: string;
  /** 3D背面图 */
  sampleBack3dUrl?: string;
  /** 样衣正面图 */
  sampleFrontUrl?: string;
  /** 样衣背景图 */
  sampleBackUrl?: string;
  /** 样衣侧图 */
  sampleSideUrl?: string;
  /** 样衣尺寸. JSON string */
  sampleSize?: string;
  /** 纸样文件URL */
  sampleDataUrl?: string;
  /** 纸样文件名 */
  sampleDataFileName?: string;
  /** 设计款号 */
  designStyleNumber?: string;
  /** 面辅料成本 */
  fabricFabricCost?: number;
  /** 加工费 */
  processAmount?: number;
  /** 二次工艺费 */
  secondProcessAmount?: number;
  /** 包装运输费 */
  pkgTransAmount?: number;
  /** 商品链接 */
  productUrl?: string;
  /** 面料数据 */
  fabricList?: FabricList[];
  /** 辅料数据 */
  accesoryList?: AccesoryList[];
  /** 尺寸图片 */
  sizeImgUrl?: string;
}

export interface AccesoryList {
  /** 主键 */
  modelRepositoryAccessoryId?: number | string;
  /** 版型库ID */
  modelRepositoryId?: number | string;
  /** 辅料序号 */
  accessorySerial?: string;
  /** spu */
  spu?: string;
  /** sku */
  sku?: string;
  /** 品名 */
  productName?: string;
  /** 颜色 */
  color?: string;
  /** 用量 */
  perPieceAmount?: string;
  /** 大货进价 */
  price?: string;
}

export interface FabricList {
  /** 主键 */
  modelRepositoryFabricId?: number | string;
  /** 版型库ID */
  modelRepositoryId?: number | string;
  /** 面料序号 */
  fabricSerial?: string;
  /** spu */
  spu?: string;
  /** sku */
  sku?: string;
  /** 货号 */
  artNo?: string;
  /** 品名 */
  productName?: string;
  /** 颜色 */
  color?: string;
  /** 福宽 */
  breadth?: string;
  /** 足米价 */
  price?: string;
  /** 用量 */
  perPieceAmount?: string;
}

// export interface Response {
//   /** 注释 */
//   successful: boolean;
//   /** 注释 */
//   code: string;
//   /** 注释 */
//   message: string;
// }
