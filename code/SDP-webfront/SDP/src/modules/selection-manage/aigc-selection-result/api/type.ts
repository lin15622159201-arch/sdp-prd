import { YES_NO_NUMBER_ENUM } from '@/constant';
import { PICK_STATE_ENUM } from '@/modules/selection-manage/aigc-selection-list/constant';
import { OPEN_STYLE_STATUS_ENUM } from '@/modules/selection-manage/aigc-selection-result/constant';
import { GENERATE_MODE } from '@/modules/inspiration-center/inspiration-source/constant';

// ⬇️ 选款结果-分页查询请求体 接口：https://yapi.tiangong.site/project/39/interface/api/2608
/**
 * 分页查询参数
 */
export interface IResultPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 建议品类
   */
  suggestedCategoryCode?: string;
  /**
   * 【模糊查询】创建人名称
   */
  pickingCreatorName?: string;
  /**
   * 创建开始时间
   */
  pickingStartTime?: string;
  /**
   * 创建结束时间
   */
  pickingEndTime?: string;
  /**
   * 【模糊查询】灵感来源，ins、shein等
   */
  inspirationSource?: string;
  /**
   * 建议站点
   */
  suggestedCountrySiteCode?: string;
  /**
   * 选款人 买手
   */
  selectorId?: string;
  /**
   * 选款人 买手
   */
  selectorName?: string;
  /**
   * 选图时间开始
   */
  imagePickingStartTime?: string;
  /**
   * 选图时间结束
   */
  imagePickingEndTime?: string;
  /**
   * 建议波次
   */
  suggestedWaveBatchCode?: string;
  /**
   * 选用状态：null-全部,1已选中,2未选中
   */
  pickingState?: PICK_STATE_ENUM;
  /**
   * 开款状态：0-待处理 1-已开款 2-已淘汰
   */
  openStyleState?: OPEN_STYLE_STATUS_ENUM;
  /**
   * 款号
   */
  styleCode?: string[];
}
// ⬆️ 选款结果-分页查询请求体

// ⬇️ 选款结果-分页查询响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2608
export interface IResultPageRes {
  pageNum: string;
  total: string;
  list: IResultPageResListItem[];
}
export interface IResultPageResListItem {
  /**
   * 选款结果id
   */
  pickingResultId: string;
  /**
   * 灵感图
   */
  inspirationImage: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 选款人 买手ID
   */
  selectorId: string;
  /**
   * 选款人 买手名称
   */
  selectorName: string;
  /**
   * 选款时间
   */
  selectionTime: string;
  /**
   * 建议价格
   */
  suggestedPrice: string;
  /**
   * 建议风格
   */
  suggestedStyleCode: string;
  suggestedStyleName: string;
  /**
   * 建议品类
   */
  suggestedCategory: string;
  /**
   * 建议波段
   */
  suggestedWaveBatchCode: string;
  /**
   * 建议店铺
   */
  suggestedShopName: string;
  /**
   * 建议店铺
   */
  suggestedShopCode: string;
  /**
   * 建议印花：0-无，1-定位印，2-满印，3-净色
   */
  suggestedPrintingName: string;
  /**
   * 建议国家站点
   */
  suggestedCountrySiteName: string;
  /**
   * 货盘id
   */
  cargoTrayId: string;
  /**
   * 货盘编号
   */
  cargoTrayName: string;
  /**
   * 选用状态：null-全部,1已选中,2未选中
   */
  pickingState: PICK_STATE_ENUM;
  /**
   * 开款状态(下游)：0-待处理 1-已开款 2-已淘汰
   */
  openStyleState: OPEN_STYLE_STATUS_ENUM;
  /**
   * 款号(下游)
   */
  styleCode: string;
  /**
   * 淘汰原因(下游)
   */
  styleEliminateReason: string;
  /**
   * AIGC图片详情列表
   */
  pickingStyleResultDetails: IResultPageResPickingStyleResultDetailsItem[];
  /**
   * 灵感编号
   */
  inspirationCode: string;
  /**
   * ai任务编号
   */
  designTaskCode: string;
  origin: string;
  postureFissionRefImgUrl: string;
  sourceImage?: string;
  refImgUrl?: string;
}
export interface IResultPageResPickingStyleResultDetailsItem {
  /**
   * 图片id
   */
  pickingPictureId: string;
  /**
   * 生成图
   */
  pictureUrl: string;
  /**
   * 修复图
   */
  repairImgUrl: string;
  /**
   * 组号
   */
  groupNum: string;
  /**
   * 序号
   */
  serialNum: string;
  /**
   * 是否主图 1是 0否
   */
  mainImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否修图 1是 0否
   */
  fixImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否淘汰 1是 0否
   */
  eliminateType: YES_NO_NUMBER_ENUM;
  /**
   * 淘汰原因
   */
  eliminateReason: string;
}
// ⬆️ 选款结果-分页查询响应体

// ⬇️ 选款结果-详情响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2609
export interface IResultDetailRes {
  /**
   * 开款状态(下游)：0-待处理 1-已开款 2-已淘汰
   */
  openStyleState: OPEN_STYLE_STATUS_ENUM;
  styleSpuCode: string;
  inspirationDetail: IResultDetailResInspirationDetail;
  designTaskDetail: IResultDetailResDesignTaskDetail;
  /**
   * 推荐面料详情
   */
  recommendFabricDetails: IResultDetailResRecommendFabricDetailsItem[];
  pickingDetail: IResultDetailResPickingDetail;
}
/**
 * 灵感详情
 */
export interface IResultDetailResInspirationDetail {
  /**
   * 灵感图
   */
  inspirationImage: string;
  /**
   * 外部品类
   */
  externalCategory: string;
  /**
   * 数据来源(AIDC)
   */
  dataSourceType: string;
  /**
   * 灵感图创建时间
   */
  createdTime: string;
  /**
   * 灵感图创建人
   */
  creatorName: string;
  /**
   * 灵感图来源(shein)
   */
  inspirationSourceType: string;
  /**
   * 灵感图来源站点(TH)
   */
  countrySiteCode: string;
  /**
   * 划线价
   */
  retailPrice: string;
  /**
   * 售价
   */
  salePrice: string;
  /**
   * 灵感图品牌
   */
  inspirationBrand: string;
  postureFissionRefImgUrl: string;
  origin: string;
}
/**
 * 跑图详情
 */
export interface IResultDetailResDesignTaskDetail {
  /**
   * 跑图编号
   */
  aiTaskCode: string;
  /**
   * 品类
   */
  category: string;
  /**
   * 款式类型：0-净色、1-花型
   */
  styleType: string;
  /**
   * 生成模式,1:多姿势,0:单姿势
   */
  generateMode: GENERATE_MODE;
  /**
   * 背景增强 (1:开启, 0:关闭)
   * - 多姿势:默认开启, 入参传"不开启"才改变值
   * - 单姿势:默认关闭
   */
  bgEnhanced: YES_NO_NUMBER_ENUM;
  /**
   * 标签
   */
  labels: IResultDetailResLabelsItem[];
}
export interface IResultDetailResLabelsItem {
  key: string;
  value: string;
}
export interface IResultDetailResRecommendFabricDetailsItem {
  /**
   * 中台主商品ID
   */
  sourceCommodityId: string;
  /**
   * 商品ID
   */
  commodityId: string;
  /**
   * 商品编码
   */
  commodityCode: string;
  /**
   * 商品名称
   */
  commodityName: string;
  /**
   * 商品图片
   */
  commodityPicture: string;
  /**
   * 纹理色块图
   */
  colorPicture: string;
  /**
   * SKU-ID
   */
  skuId: string;
  /**
   * SKU-编码
   */
  skuCode: string;
  /**
   * 色号
   */
  colorCode: string;
  /**
   * RGB
   */
  rgb: string;
}
/**
 * 选款详情
 */
export interface IResultDetailResPickingDetail {
  /**
   * 选款状态：0待选中,1已选中,2未选中
   */
  pickingState: PICK_STATE_ENUM;
  /**
   * 选款人 买手
   */
  selectorId: string;
  /**
   * 选款人 买手
   */
  selectorName: string;
  /**
   * 选图时间开始
   */
  imagePickingStartTime: string;
  /**
   * 波次
   */
  suggestedWaveBatchName: string;
  /**
   * 建议价格
   */
  suggestedPrice: string;
  /**
   * 建议风格
   */
  suggestedStyleCode: string;
  suggestedStyleName: string;
  /**
   * 建议店铺
   */
  suggestedShopName: string;
  suggestedShopCode: string;
  /**
   * 建议品类
   */
  suggestedCategoryName: string;
  /**
   * 印花标识：0-无，1-定位印，2-满印，3-净色
   */
  suggestedPrintingName: string;
  /**
   * 建议国家站点
   */
  suggestedCountrySiteName: string;
  /**
   * 货盘id
   */
  cargoTrayId: string;
  /**
   * 货盘编号
   */
  cargoTrayName: string;
  sceneCode: string;
  sceneName: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 商品主题
   */
  productThemeName: string;
  /**
   * 图片
   */
  pickingStyleResultDetails: IResultDetailResPickingStyleResultDetailsItem[];
}
export interface IResultDetailResPickingStyleResultDetailsItem {
  /**
   * 图片id
   */
  pickingPictureId: string;
  /**
   * 生成图
   */
  pictureUrl: string;
  /**
   * 修复图
   */
  repairImgUrl: string;
  /**
   * 组号
   */
  groupNum: string;
  /**
   * 序号
   */
  serialNum: string;
  /**
   * 是否主图 1是 0否
   */
  mainImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否修图 1是 0否
   */
  fixImageType: YES_NO_NUMBER_ENUM;
  /**
   * 是否淘汰 1是 0否
   */
  eliminateType: YES_NO_NUMBER_ENUM;
  /**
   * 淘汰原因
   */
  eliminateReason: string;
  /**
   * 淘汰原因编码
   */
  eliminateReasonCodes: string[];
}
// ⬆️ 选款结果-详情响应体

// ⬇️ 导出修图数据请求体 接口：https://yapi.tiangong.site/project/39/interface/api/3142
/**
 * 查询条件请求对象
 */
export interface IResultExportReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 【模糊查询】品类
   */
  category?: string;
  categoryCode?: string;
  /**
   * 【模糊查询】创建人名称
   */
  pickingCreatorName?: string;
  /**
   * 创建开始时间
   */
  pickingStartTime?: string;
  /**
   * 创建结束时间
   */
  pickingEndTime?: string;
  /**
   * 【模糊查询】灵感来源，ins、shein等
   */
  inspirationSource?: string;
  /**
   * 国家站点，东南亚的6个站点
   */
  countrySite?: string;
  /**
   * 选款人 买手
   */
  selectorId?: string;
  /**
   * 选款人 买手
   */
  selectorName?: string;
  /**
   * 选图时间开始
   */
  imagePickingStartTime?: string;
  /**
   * 选图时间结束
   */
  imagePickingEndTime?: string;
  /**
   * 波次
   */
  waveBatchCode?: string;
  /**
   * 选用状态：null-全部,1已选中,2未选中
   */
  pickingState?: PICK_STATE_ENUM;
  /**
   * 开款状态：0-待处理 1-已开款 2-已淘汰
   */
  openStyleState?: OPEN_STYLE_STATUS_ENUM;
  /**
   * 是否修图 1是 0否
   */
  fixImageType?: YES_NO_NUMBER_ENUM;
}
// ⬆️ 导出修图数据请求体
/**
 * 导出选款结果图片 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/100639
 */
export interface ResultExportImageReq {
  /** 当前查询的页码 */
  pageNum?: number;
  /** 当前查询单页的数据量 */
  pageSize?: number;
  /** 建议品类 */
  suggestedCategoryCode?: string;
  /** 建议国家站点 */
  suggestedCountrySiteCode?: string;
  /** 建议波次 */
  suggestedWaveBatchCode?: string;
  /** 【模糊查询】创建人名称 */
  pickingCreatorName?: string;
  /** 创建开始时间 */
  pickingStartTime?: string;
  /** 创建结束时间 */
  pickingEndTime?: string;
  /** 【模糊查询】灵感来源，ins、shein等 */
  inspirationSource?: string;
  /** 选款人 买手 */
  selectorId?: string;
  /** 选款人 买手 */
  selectorName?: string;
  /** 选图时间开始 */
  imagePickingStartTime?: string;
  /** 选图时间结束 */
  imagePickingEndTime?: string;
  /** 选用状态：null-全部,1已选中,2未选中 */
  pickingState?: number;
  /** 开款状态：0-待处理 1-已开款 2-已淘汰 */
  openStyleState?: number;
  /** 是否修图 1是 0否 */
  fixImageType?: number;
  /** 款号 v3.10.1 */
  styleCode?: string[];
}

/**
 * 导出选款结果图片 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/100639
 */
export type ResultExportImageRes = ResultExportImageResItem[];

/**
 *  单项响应数据
 */
export interface ResultExportImageResItem {
  /** 灵感图编号 */
  inspirationCode?: string;
  /** 图片URL */
  images?: string[];
}
