// ⬇️ 现货选款-分页查询请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4590

import { IMPORT_TYPE_ENUM, OPT_TYPE_ENUM, SELECTION_STATUS_ENUM } from '../constant';

/**
 * 分页查询参数
 */
export interface ISelectionPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 货盘类型名称
   */
  palletTypeName?: string;
  /**
   * 店铺
   */
  storeName?: string;
  /**
   * 供给方式名称
   */
  supplyModeName?: string;
  /**
   * 选款编码
   */
  styleSelectionCode?: string;
  /**
   * 供应商款号
   */
  supplierStyleCode?: string;
  /**
   * SPU编码
   */
  spuCode?: string;
  /**
   * 选款状态：0-待选款；10-选款中；11-待报价；12-待确认；20-已中止；30-已完成；50-已淘汰；60-失败；
   */
  styleSelectionStatus?: number;
  /**
   * 选款人
   */
  styleSelectorName?: string;
  /**
   * 创建人
   */
  creatorName?: string;
  /**
   * 选款时间-开始
   */
  selectionStartTime?: string;
  /**
   * 选款时间-结束
   */
  selectionEndTime?: string;
  /**
   * 创建时间-开始
   */
  createdStartTime?: string;
  /**
   * 创建时间-结束
   */
  createdEndTime?: string;
}

// ⬆️ 现货选款-分页查询请求体

// ⬇️ 现货选款-分页查询响应体 接口：https://yapi.tiangong.site/project/39/interface/api/2608
export interface ISelectionPageRes {
  pageNum: string;
  total: string;
  list: ISelectionPageResListItem[];
}

export interface ISelectionPageResListItem {
  /**
   * 选款ID
   */
  styleSelectionId?: string;
  /**
   * 选款编码
   */
  styleSelectionCode?: string;
  /**
   * SPU编码
   */
  spuCode?: string;
  /**
   * 导入类型
   */
  importType?: string;
  /**
   * 招商名称
   */
  investmentPromotionName?: string;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 供应商款号
   */
  supplierStyleCode?: string;
  /**
   * 现货类型名称
   */
  spotTypeName?: string;
  /**
   * 供给方式名称
   */
  supplyModeName?: string;
  /**
   * 图片
   */
  imageUrl?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 价格
   */
  price?: number;
  /**
   * 尺码
   */
  size?: string;
  /**
   * 采购价
   */
  purchasePrice?: number;
  /**
   * 期望价格
   */
  expectedPrice?: number;
  /**
   * 选款人
   */
  styleSelectorName?: string;
  /**
   * 选款人 id
   */
  styleSelectorId?: string;
  /**
   * 店铺
   */
  storeName?: string;
  /**
   * 货盘类型名称
   */
  palletTypeName?: string;
  /**
   * 商品类型名称
   */
  commodityTypeName?: string;
  /**
   * 场景名称
   */
  sceneName?: string;
  /**
   * 风格名称
   */
  modoName?: string;
  /**
   * 波段名称
   */
  wavebandName?: string;
  /**
   * 商品链接
   */
  commodityLink?: string;
  /**
   * 灵感图来源
   */
  inspirationImageOrigin?: string;
  /**
   * 灵感源品牌名称
   */
  inspirationOriginBrandName?: string;
  /**
   * 企划来源名称
   */
  planningOriginName?: string;
  /**
   * 任务状态：0-待选款；10-选款中；11-待报价；12-待确认；20-已中止；30-已完成；50-已淘汰；60-失败；
   */
  styleSelectionStatus?: number;
  /**
   * 选款时间
   */
  selectionTime?: string;
  /**
   * 选款结果：0-未选款；1-不可用；2-可用
   */
  selectionResult?: number;
  /**
   * 报价结果：0-未报价；1-不可用；2-可用
   */
  quoteResult?: number;
  /**
   * 品类名称
   */
  categoryName?: string;
  /**
   * 创建人 id
   */
  creatorId?: string;
  /**
   * 创建人 名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 备注数量
   */
  totalRemark?: number;
}

// ⬆️ 现货选款-导入选款响应体 接口：https://yapi.tiangong.site/project/93/interface/api/4586
export interface ISelectionImportRes {
  successful?:'YES' | 'NO';
  message?:string;
  error?:string[];
}

// ⬇️  现货选款-选款中请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4594
export interface ISelectionSelectingReq {
  /**
   * 选款ID
   */
  ids: string[];
}

// ⬇️  现货选款-取消请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4598
export interface ISelectionCancelReq {
  /**
   * 选款ID
   */
  ids: string[];
}

// ⬇️  现货选款-选款请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4602
export type ISelectionSelectReq = ISelectionSelectItem[];

export interface ISelectionSelectItem {
  /**
   * 选款ID
   */
  styleSelectionId: string;
  /**
   * 选款结果：1-不可用；2-可用
   */
  selectionResult: number;
}

// ⬇️  现货选款-报价请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4606
export type ISelectionQuoteReq = ISelectionQuoteItem[];

export interface ISelectionQuoteItem {
  /**
   * 选款ID
   */
  styleSelectionId: string;
  /**
   * 报价结果：1-不可用；2-可用
   */
  quoteResult: number;
  /**
   * 采购价格
   */
  purchasePrice: number;
}

// ⬇️ 现货选款-确认请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4610
export type ISelectionConfirmReq = ISelectionConfirmItem[];

export interface ISelectionConfirmItem {
  /**
   * 选款ID
   */
  styleSelectionId: string;
  /**
   * 报价结果：1-不可用；2-可用
   */
  quoteResult: number;
  /**
   * 选款结果：1-不可用；2-可用
   */
  selectionResult: number;
  /**
   * 采购价
   */
  purchasePrice?: number;
  /**
   * 店铺
   */
  storeName: string;
  /**
   * 货盘类型名称
   */
  palletTypeName: string;
  /**
   * 场景名称
   */
  sceneName?: string;
  /**
   * 风格名称
   */
  modoName?: string;
  /**
   * 波段名称
   */
  wavebandName?: string;
}

// ⬇️ 现货选款-删除请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4614
export interface ISelectionDeleteReq {
  /**
   * 选款ID
   */
  ids: string[];
}

// ⬆️  现货选款-选款详情响应体 接口：https://yapi.tiangong.site/project/93/interface/api/4622
export interface ISelectionDetailRes {
  /**
   * 选款ID
   */
  styleSelectionId?: string;
  /**
   * 选款编码
   */
  styleSelectionCode?: string;
  /**
   * SPU编码
   */
  spuCode?: string;
  /**
   * 导入类型
   */
  importType?: string;
  /**
   * 招商名称
   */
  investmentPromotionName?: string;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 供应商款号
   */
  supplierStyleCode?: string;
  /**
   * 现货类型名称
   */
  spotTypeName?: string;
  /**
   * 供给方式名称
   */
  supplyModeName?: string;
  /**
   * 图片
   */
  imageUrl?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 价格
   */
  price?: number;
  /**
   * 尺码
   */
  size?: string;
  /**
   * 采购价
   */
  purchasePrice?: number;
  /**
   * 期望价格
   */
  expectedPrice?: number;
  /**
   * 选款人
   */
  styleSelectorName?: string;
  /**
   * 店铺
   */
  storeName?: string;
  /**
   * 货盘类型名称
   */
  palletTypeName?: string;
  /**
   * 商品类型名称
   */
  commodityTypeName?: string;
  /**
   * 场景名称
   */
  sceneName?: string;
  /**
   * 风格名称
   */
  modoName?: string;
  /**
   * 波段名称
   */
  wavebandName?: string;
  /**
   * 商品链接
   */
  commodityLink?: string;
  /**
   * 灵感图来源
   */
  inspirationImageOrigin?: string;
  /**
   * 灵感源品牌名称
   */
  inspirationOriginBrandName?: string;
  /**
   * 企划来源名称
   */
  planningOriginName?: string;
  /**
   * 选款状态：0-待选款；10-选款中；11-待报价；12-待确认；20-已中止；30-已完成；50-已淘汰；60-失败；
   */
  styleSelectionStatus?: number;
  /**
   * 选款时间
   */
  selectionTime?: string;
  /**
   * 选款结果：0-未选款；1-不可用；2-可用
   */
  selectionResult?: number;
  /**
   * 报价结果：0-未报价；1-不可用；2-可用
   */
  quoteResult?: number;
  /**
   * 品类名称
   */
  categoryName?: string;
  /**
   * 创建人 id
   */
  creatorId?: string;
  /**
   * 创建人 名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 操作记录
   */
  optLog?:OptLogItem[];
}

export interface OptLogItem {
  /**
   * 操作类型
   * 枚举: ADD, WAIT_QUOTE, REJECT_QUOTE, REJECT_SELECTION, ALREADY_SELECTION, CONFIRM
   * 枚举备注:
   * - ADD: 新增
   * - WAIT_QUOTE: 报价
   * - REJECT_QUOTE: 驳回报价
   * - REJECT_SELECTION: 淘汰
   * - ALREADY_SELECTION: 选款
   * - CONFIRM: 确认报价
   */
  type: OPT_TYPE_ENUM;
  /**
   * 创建人 名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;

  data?:OptLogDataItem[];
}

export interface OptLogDataItem {
  key?:string;
  value?:string;
  name?:string;
}

/**
 * 现货选款-选款备注-查询响应体 接口：https://yapi.tiangong.site/project/93/interface/api/4626
 */
export interface ISelectionRemarkItem {
  /**
   * 备注ID
   */
  remarkId?: string;
  /**
   * 选款备注
   */
  remark?: string;
  /**
   * 选款备注图片
   */
  remarkUrl?: string;
  /**
   * 创建人 id
   */
  creatorId?: string;
  /**
   * 创建人 名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}

/**
 * 现货选款-选款备注-新增请求体 接口：https://yapi.tiangong.site/project/93/interface/api/4630
 */
export interface ISelectionRemarkAddReq {
  /**
   * 选款ID
   */
  styleSelectionId: string;
  /**
   * 选款备注
   */
  remark?: string;
  /**
   * 选款备注图片
   */
  remarkUrl?: string;
}

/**
 * 现货选款-选款总数-查询响应体 接口：https://yapi.tiangong.site/project/93/interface/api/4626
 */
export type ISelectionRemarkCountRes = ISelectionRemarkCountItem[];

export interface ISelectionRemarkCountItem {
  /**
   * 选款状态
   */
  styleSelectionStatus?:SELECTION_STATUS_ENUM;
  /**
   * 总数
   */
  total?:number;
}

// ⬇️ 批量导入选款请求体 接口：https://yapi.tiangong.site/project/93/interface/api/5210
export type IImportBatchReq = {
  /**
   * 导入类型
   */
  type: IMPORT_TYPE_ENUM;
  /**
   * OSS地址
   */
  ossUrl: string;
  /**
   * 文件大小
   */
  fileSize: number;
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 批次名称
   */
  batchName?: string;
}[];
// ⬆️ 批量导入选款请求体

// ⬇️ 批量导入选款响应体 接口：https://yapi.tiangong.site/project/93/interface/api/5210
export type IImportBatchRes = {
  /**
   * 批次ID
   */
  batchId: string;
  /**
   * OSS地址
   */
  ossUrl: string;
}[];
// ⬆️ 批量导入选款响应体
