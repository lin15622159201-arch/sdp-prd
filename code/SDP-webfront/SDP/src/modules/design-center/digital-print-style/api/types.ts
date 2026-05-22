import { PUSH_STATUS_ENUM } from '../constant';

export interface IGetDigitalPrintStyleListReq {
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  /**
   * 数码印花款主键id
   */
  printingStyleId?: string;
  /**
   * SPU(运营平台提供)
   */
  styleCode?: string;
  /**
   * SKC
   */
  designCode?: string;
  /**
   * 品类编码   (多选)
   */
  categoryList: string[];
  /**
   * 品类名称
   */
  categoryNameList?: string[];
  /**
   * 国家站点id   (多选)
   */
  countrySiteCodeList: string[];
  /**
   * 国家站点名称
   */
  countrySiteName?: string;
  /**
   * 店铺id (多选)
   */
  storeIdList: string[];
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 波段编码-OPS (多选)
   */
  waveBandCodeList: string[];
  /**
   * 波段名称
   */
  waveBandName?: string;
  /**
   * SPU生成时间: 开始时间
   */
  spuCreatedTimeStart?: string;
  /**
   * SPU生成时间: 结束时间
   */
  spuCreatedTimeEnd?: string;
  /**
   * SKC生成时间: 开始时间
   */
  skcCreatedTimeStart?: string;
  /**
   * SKC生成时间: 结束时间
   */
  skcCreatedTimeEnd?: string;
  /**
   * 推送状态: 0-失败; 1-成功
   */
  pushStatus?: PUSH_STATUS_ENUM | '';
}
export interface IGetDigitalPrintStyleListRes {
  page?: number;
  total?: number;
  list: {
    /**
     * 数码印花款主键id
     */
    printingStyleId: string;
    /**
     * skcid
     */
    printingPrototypeId: string;
    /**
     * SPU(运营平台提供)
     */
    styleCode: string;
    /**
     * AI品类编码
     */
    aiCategory: string;
    /**
     * AI品类名称
     */
    aiCategoryName: string;
    /**
     * 品类编码(内部)
     */
    category?: string;
    /**
     * 品类名称(内部)
     */
    categoryName?: string;
    /**
     * 版型号
     */
    modelNumber: string;
    /**
     * 版型名称
     */
    modelName: string;
    /**
     * 颜色名称
     */
    colorName: string;
    /**
     * 本土价
     */
    localPrice: string;
    /**
     * 跨境价
     */
    crossBorderPrice: string;
    /**
     * 国家站点id
     */
    countrySiteId: string;
    /**
     * 国家站点名称
     */
    countrySiteName: string;
    /**
     * 店铺id
     */
    storeId: string;
    /**
     * 店铺名称
     */
    storeName: string;
    /**
     * 波段编码-OPS
     */
    waveBandCode: string;
    /**
     * 波段名称
     */
    waveBandName: string;
    /**
     * 选中人id
     */
    chosenId: string;
    /**
     * 选中人名称
     */
    chosenName: string;
    /**
     * 选中时间
     */
    chosenTime: number;
    /**
     * SPU生成时间
     */
    spuCreatedTime: number;
    /**
     * 款式图片信息
     */
    styleImageList: string[];
    /**
     * SKC
     */
    designCode: string;
    /**
     * 推送状态: 0-失败; 1-成功
     */
    pushStatus: PUSH_STATUS_ENUM;
    /**
     * SKC生成时间
     */
    skcCreatedTime: number;
  }[];
}

export interface IGetDigitalPrintStyleInfoReq {
  /**
   * 数码印花skcId
   */
  printingPrototypeId: string;
}
export interface IGetDigitalPrintStyleInfoRes {
  /**
   * 主键id
   */
  printingPrototypeId?: string;
  /**
   * SKC
   */
  designCode?: string;
  /**
   * 推送状态: 0-失败; 1-成功
   */
  pushStatus?: PUSH_STATUS_ENUM;
  /**
   * 数码印花款主键id
   */
  printingStyleId?: string;
  /**
   * SPU(运营平台提供)
   */
  styleCode?: string;
  /**
   * AI品类编码
   */
  aiCategory?: string;
  /**
   * AI品类名称
   */
  aiCategoryName?: string;
  /**
   * 品类编码(内部)
   */
  category?: string;
  /**
   * 品类名称(内部)
   */
  categoryName?: string;
  /**
   * 版型号
   */
  modelNumber?: string;
  /**
   * 版型名称
   */
  modelName?: string;
  /**
   * 颜色名称
   */
  colorName?: string;
  /**
   * 本土价
   */
  localPrice?: string;
  /**
   * 跨境价
   */
  crossBorderPrice?: string;
  /**
   * 国家站点id
   */
  countrySiteId?: string;
  /**
   * 国家站点名称
   */
  countrySiteName?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 波段编码-OPS
   */
  waveBandCode?: string;
  /**
   * 波段名称
   */
  waveBandName?: string;
  /**
   * 选中人id
   */
  chosenId?: string;
  /**
   * 选中人名称
   */
  chosenName?: string;
  /**
   * 选中时间
   */
  chosenTime?: number;
  /**
   * 款式图片列表
   */
  styleImageList: string[];
  /**
   * 生产图案图片列表
   */
  productImageList: string[];
  /**
   * 版型图
   */
  patternImageList?: string;
  /**
   * 类目图
   */
  categoryImageList?: string;
  /**
   * 尺码图
   */
  sizeImageList?: string;
  /**
   * 面料细节图
   */
  fabricDetailImageList?: string;
  /**
   * 面料信息json
   */
  fabricInfo?: {
    /**
     * 面料品名
     */
    fabricName?: string;
    /**
     * 面料克重
     */
    fabricWeight?: string;
    /**
     * 商品属性集合(面料成分集合)   -pop
     */
    attributesList: {
      /**
       * 属性名
       */
      attributeName?: string;
      /**
       * 属性值
       */
      attributeValue?: string;
    }[];
  };
  /**
   * bom单文件集合
   */
  bomFileList: string[];
  /**
   * 纸样文件集合
   */
  patternFileList: string[];
}
