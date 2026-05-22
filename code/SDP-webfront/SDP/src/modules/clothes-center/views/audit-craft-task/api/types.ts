import { IFile } from '@/components/upload/package/type';
import { YES_NO_ENUM } from '@/constant';

/**
 * 分页查询审版工艺单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2483
 */
export interface IAuditCraftOrderPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 审版工艺单状态(1-已提交、0-待提交)
   */
  state?: string;
  /**
   * 审版工艺师id
   */
  reviewCraftsmanId?: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  /**
   * 是否展示取消订单
   */
  showCancel: boolean;
  /**
   * 首版创建时间开始
   */
  firstSampleCreatedTimeStart?: string;
  /**
   * 首版创建时间结束
   */
  firstSampleCreatedTimeEnd?: string;
  /**
   * 首次提交时间开始
   */
  firstSubmitTimeStart?: string;
  /**
   * 首次提交时间结束
   */
  firstSubmitTimeEnd?: string;
  /**
   * 创建时间开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间结束
   */
  createdTimeEnd?: string;
  /**
   * 打版方式
   */
  makeClothesType?: string;
  /**
   * 完成耗时开始时间 天
   */
  timeConsumingStartDay?: string;
  /**
   * 完成耗时结束时间 天
   */
  timeConsumingEndDay?: string;
  /**
   * 完成耗时开始时间 时
   */
  timeConsumingStartHour?: string;
  /**
   * 完成耗时结束时间 时
   */
  timeConsumingEndHour?: string;
  /**
   * 完成耗时开始时间 分
   */
  timeConsumingStartMinute?: string;
  /**
   * 完成耗时结束时间 分
   */
  timeConsumingEndMinute?: string;
  /**
   * 最新提交时间开始
   */
  latestSubmitTimeStart?: string;
  /**
   * 最新提交时间结束
   */
  latestSubmitTimeEnd?: string;
}

export interface IAuditCraftOrderPageRes {
  page?: number;
  total?: number;
  list: IAuditCraftOrderPageResListItem[];
}

export interface IAuditCraftOrderPageResListItem {
  /**
   * 版单是否取消 0-否、1-是
   */
  isCancel?: YES_NO_ENUM;
  remark?: string;
  /**
   * 审版工艺单ID
   */
  auditCraftOrderId: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 审版工艺单状态(1-已提交、0-待提交)
   */
  state?: string;
  /**
   * 审版工艺单状态描述
   */
  stateDesc?: string;
  /**
   * 最新审版工艺单详情id
   */
  latestDetailId?: string;
  /**
   * 审版工艺师id
   */
  reviewCraftsmanId?: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName?: string;
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 上架图
   */
  shelvePicture?: {
    /**
     * 样衣打版id
     */
    clothesId?: string;
    /**
     * spu上架图片
     */
    spuShelvePictureList: string[];
    /**
     * skc上架图片
     */
    skcShelvePictureList: string[];
  };
  /**
   * 版本号,默认1
   */
  versionNum?: string;
  /** 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3) */
  category?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  categoryName?: string;
  /**
   * 正常打版（首版）的制作方式
   * 0-仅纸样 1-实物样 2-3D样 3-3D+实物样
   */
  makeClothesType?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 首版创建时间
   */
  firstSampleCreatedTime?: number;
  /**
    * 首次提交时间
    */
  firstSubmitTime?: number;
  /**
    * 最新提交时间
    */
  latestSubmitTime?: number;
  /**
   * 打版方式
   */
  makeTypeDesc?: string;
}

/**
 * 根据审版工艺单ID查询详情
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2485
 */
export interface IAuditCraftOrderDetailReq {
  auditCraftOrderId: string;
}

export interface IAuditCraftOrderDetailRes {
  isDeleted?: string;
  creatorId?: string;
  createdTime?: number;
  reviserId?: string;
  revisedTime?: number;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 审版工艺单明细ID
   */
  auditCraftOrderDetailId?: string;
  /**
   * 审版工艺单ID
   */
  auditCraftOrderId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 审版工艺单状态(1-已提交、0-待提交)
   */
  state?: string;
  /**
   * 审版工艺单状态描述
   */
  stateDesc?: string;
  /**
   * 最新提交的明细ID
   */
  latestDetailId?: string;
  /**
   * 审版工艺单提交版本
   */
  submitVersion?: string;
  /**
   * 审版工艺师id
   */
  reviewCraftsmanId?: string;
  /**
   * 审版工艺师名称
   */
  reviewCraftsmanName?: string;
  /**
   * 打版参考尺寸表
   */
  referSize?: IAuditCraftOrderDetailResReferSize;
  /**
   * 裁剪要求
   */
  cuttingRequire?: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode?: string;
  /**
   * 车缝要求
   */
  sewRequire?: IAuditCraftOrderDetailResSewRequireItem[];
  /**
   * 尾部要求
   */
  tailRequire?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名称
   */
  categoryName?: string;
  /**
   *创建人名称
   */
  creatorName?: string;
}

export interface IAuditCraftOrderDetailResSewRequireItem {
  /**
   * 工序款式库(模板)ID
   */
  processStyleTemplateId?: string;
  /**
   * 工序款式(模板)名称
   */
  styleName?: string;
  /**
   * 工序部件库(模板)ID
   */
  sewingComponentTemplateId?: string;
  /**
   * 工序部件名称
   */
  componentName: string;
  /**
   * 工序款式模板-车缝工序id
   */
  sewingProcessId?: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的sewingProcessId
   */
  referenceSewingProcessId?: string;
  /**
   * 工序名称
   */
  processName: string;
  /**
   * 工序车缝要求
   */
  processRequire: string;
  /**
   * 图片路径
   */
  picture?: string;
  /**
   * 车种编码
   */
  sewingType?: string;
  /**
   * 车种名称
   */
  sewingTypeName?: string;
}

export interface IAuditCraftOrderDetailResSewRequire {
  /**
   * 引用款式模板编码
   */
  referStyleTemplateCode?: string;
  /**
   * 引用款式模板名称
   */
  referStyleTemplateName?: string;
  referComponentTemplateCode?: string;
  referComponentTemplateName?: string;
  /**
   * 部位车缝要求
   */
  sewingRequireList: IAuditCraftOrderDetailResSewRequireSewingRequireListItem[];
}

export interface IAuditCraftOrderDetailResSewRequireSewingRequireListItem {
  /**
   * 部件名称
   */
  componentName: string;
  /**
   * 部位工序车缝要求
   */
  sewProcessList: IAuditCraftOrderDetailResSewRequireSewingRequireListItemSewProcessListItem[];
}

export interface IAuditCraftOrderDetailResSewRequireSewingRequireListItemSewProcessListItem {
  /**
   * 工序名称
   */
  processName: string;
  urls: IFile[];
  picture?: string;
  /**
   * 车种编码
   */
  plmSewingType?: string;
  /**
   * 车种名称
   */
  plmSewingName?: string;
  /**
   * 工序车缝要求
   */
  processDescribe: string;
}

export interface IAuditCraftOrderDetailResReferSize {
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
  sizeTable: IAuditCraftOrderDetailResReferSizeSizeTableItem[];
}

export interface IAuditCraftOrderDetailResReferSizeSizeTableItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位名
   */
  position?: string;
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 纸样尺寸
   */
  patternSizes?: IAuditCraftOrderDetailResReferSizeSizeTableItemPatternSizesItem[];
  patternSize?: string | number | '';
  /**
   * 允许误差
   */
  tolerance?: string;
  /**
   * 备注
   */
  remark?: string;
}

export interface IAuditCraftOrderDetailResReferSizeSizeTableItemPatternSizesItem {
  name?: string;
  value?: string;
}

/**
 * 保存审版工艺单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2484
 */
export interface IAuditCraftOrderSaveReq {
  /**
   * 审版工艺单ID
   */
  auditCraftOrderId: string;
  /**
   * 打版参考尺寸表
   */
  referSize: IAuditCraftOrderSaveReqReferSize;
  /**
   * 裁剪要求
   */
  cuttingRequire: string;
  /**
   * 车缝要求
   */
  sewRequire: IAuditCraftOrderSaveReqSewRequireItem[];
  /**
   * 尾部要求
   */
  tailRequire: string;
}

export interface IAuditCraftOrderSaveReqSewRequireItem {
  /**
   * 工序款式库(模板)ID
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  processStyleTemplateId?: string;
  /**
   * 工序款式(模板)名称
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  styleName?: string;
  /**
   * 工序部件库(模板)ID
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingComponentTemplateId?: string;
  /**
   * 工序部件名称
   */
  componentName: string;
  /**
   * 审版工艺部件ID
   */
  componentId?: string;
  /**
   * 工序款式模板-车缝工序id
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingProcessId?: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的sewingProcessId
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  referenceSewingProcessId?: string;
  /**
   * 工序名称
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  processName?: string;
  /**
   * 版型结构分解
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  structural?: string;
  /**
   * 版型结构分解
   */
  structuralDesc?: string;
  /**
   * 车缝要求
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  processRequire?: string;
  /**
   * 车缝要求
   */
  sewingRequires?: string;
  /**
   * 图片路径
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  picture?: string;
  /**
   * 车种编码
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingType?: string;
  /**
   * 车种名称
   * 20250325迭代改用审版工艺模板记录车缝要求
   * 「已废弃」
   */
  sewingTypeName?: string;
  /**
   * 版型结构分解
   */
  structurals: IAuditCraftOrderSaveReqSewRequireItemStructuralsItem[];
}

export interface IAuditCraftOrderSaveReqSewRequireItemStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: IAuditCraftOrderSaveReqSewRequireItemStructuralsItemSewingRequiresItem[];
}

export interface IAuditCraftOrderSaveReqSewRequireItemStructuralsItemSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}

export interface IAuditCraftOrderSaveReqSewRequire {
  /**
   * 引用款式模板编码
   */
  referStyleTemplateCode?: string;
  /**
   * 引用款式模板名称
   */
  referStyleTemplateName?: string;
  /**
   * 引用部件模板编码
   */
  referComponentTemplateCode?: string;
  /**
   * 引用部件模板名称
   */
  referComponentTemplateName?: string;
  /**
   * 部位车缝要求
   */
  sewingRequireList: IAuditCraftOrderSaveReqSewRequireSewingRequireListItem[];
}

export interface IAuditCraftOrderSaveReqSewRequireSewingRequireListItem {
  /**
   * 部件名称
   */
  componentName: string;
  /**
   * 部位工序车缝要求
   */
  sewProcessList?: IAuditCraftOrderSaveReqSewRequireSewingRequireListItemSewProcessListItem[];
}

export interface IAuditCraftOrderSaveReqSewRequireSewingRequireListItemSewProcessListItem {
  /**
   * 工序名称
   */
  processName: string;
  picture?: string;
  /**
   * 车种编码
   */
  sewingType?: string;
  /**
   * 车种名称
   */
  sewingTypeName?: string;
  /**
   * 工序车缝要求
   */
  processRequire: string;
}

export interface IAuditCraftOrderSaveReqReferSize {
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
  sizeTable: IAuditCraftOrderSaveReqReferSizeSizeTableItem[];
}

export interface IAuditCraftOrderSaveReqReferSizeSizeTableItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位名
   */
  position?: string;
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 纸样尺寸
   */
  patternSizes?: IAuditCraftOrderSaveReqReferSizeSizeTableItemPatternSizesItem[];
  patternSize: string | number;
  /**
   * 允许误差
   */
  tolerance?: string;
  /**
   * 备注
   */
  remark?: string;
}

export interface IAuditCraftOrderSaveReqReferSizeSizeTableItemPatternSizesItem {
  name?: string;
  value?: string;
}

/**
 * 状态统计数量
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/2977
 */

export interface IAuditCraftOrderStateCountReq {
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
}

export type IAuditCraftOrderStateCountRes = IAuditCraftOrderStateCountResItem[];
export interface IAuditCraftOrderStateCountResItem {
  /**
   * 审版工艺单状态(1-已提交、0-待提交)
   */
  state?: string;
  /**
   * 审版工艺单状态(1-已提交、0-待提交)
   */
  stateDesc?: string;
  /**
   * 当前状态任务数量
   */
  count?: string;
}
// ⬇️ 指派审版工艺师请求体 接口：https://yapi.tiangong.site/project/38/interface/api/4030
export interface IAuditCraftOrderAssignReviewCraftsmanReq {
  /**
   * 审版工艺单列表id
   */
  auditCraftOrderIds: string[];
  /**
   * 人员id
   */
  userId: string;
  /**
   * 人员名称
   */
  userName: string;
}
// ⬆️ 指派审版工艺师请求体

// ⬇️ 根据SPU查询最新SPU信息响应体 接口：https://yapi.tiangong.site/project/38/interface/api/4022
export interface IDesignCommonLatestSubmitWithSpuRes {
  /**
   * 版单id
   */
  prototypeId: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * spuId(design_style_version表中的id)
   */
  designStyleVersionId: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 复色款号
   */
  makeSameDesignCode: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 款类型: 1--正常款 2-复色款
   */
  skcType: string;
  /**
   * 是否补做 false 否 true是
   */
  isMakeMore: boolean;
  /**
   * 设计师id【设计师】
   */
  designerId: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode: string;
  /**
   * 设计师名称【设计师】
   */
  designerName: string;
  /**
   * 设计组
   */
  designerGroup: string;
  /**
   * 设计组code
   */
  designerGroupCode: string;
  /**
   * 版本完成 0 否 1是
   */
  isDoneVersion: boolean;
  /**
   * 是否紧急(1:紧急,0:不紧急)
   */
  isUrgent: boolean;
  /**
   * 打版信息状态: 1.待拆版 2.已拆版
   */
  prototypeStatus: string;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled: boolean;
  /**
   * 是否动销: 0-否; 1-是;
   */
  isOnSale: boolean;
  /**
   * SPU生成时间
   */
  spuCreatedTime: string;
  /**
   * 款生成时间
   */
  skcCreatedTime: string;
  /**
   * 设计图片
   */
  designPicture: string[];
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode: string;
  /**
   * 样衣尺码
   */
  sampleSize: string;
  /**
   * 拆版备注
   */
  splitRemark: string;
  /**
   * 版单取消原因
   */
  cancelReason: string;
  /**
   * 版单取消时间
   */
  cancelTime: string;
  /**
   * 取消版单操作人id
   */
  cancelUserId: string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName: string;
  /**
   * 版单取消备注
   */
  cancelRemark: string;
  /**
   * 裁剪备注
   */
  cuttingRemark: string;
  /**
   * 车缝工艺备注
   */
  sewingRemark: string;
  /**
   * 版型备注
   */
  typeRemark: string;
  /**
   * 版单提交时间
   */
  submitTime: string;
  /**
   * 是否拼接 0 否 1是
   */
  isSplicing: boolean;
  /**
   * 参考款号
   */
  referenceDesignCode: string;
  /**
   * SKC来源: 10-PLM; 20-淘工厂; 30-logo印; 40-灵感设计需求; 5-数码印花款;
   */
  skcSourceType: string;
  /**
   * 业务渠道: 1-zj; 2-jv; 3-jv新系统;
   */
  bizChannel: string;
  /**
   * spu信息
   */
  styleInfo: IDesignCommonLatestSubmitWithSpuResStyleInfo;
}
/**
 * SPU信息
 */
export interface IDesignCommonLatestSubmitWithSpuResStyleInfo {
  /**
   * spuId主键
   */
  designStyleId: string;
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * SPU版本号
   */
  versionNum: string;
  /**
   * 款来源:
   *      130-自建款; 170-灵感设计需求; 180-数码印花款;
   */
  sourceType: 110 | 120 | 140 | 150 | 160 | 130 | 170 | 180;
  /**
   * 款式状态: 1-待提交; 2-已提交
   */
  styleStatus: string;
  /**
   * 灵感设计需求id
   */
  designDemandId: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName: string;
  /**
   * 供给方式编码
   */
  supplyModeCode: string;
  /**
   * 商品类型
   */
  productType: string;
  /**
   * 货盘类型名称
   */
  palletTypeName: string;
  /**
   * 货盘类型编码
   */
  palletTypeCode: string;
  /**
   * 国家站点code v1.020
   */
  countrySiteCode: string;
  /**
   * 国家站点name v1.020
   */
  countrySiteName: string;
  /**
   * 店铺id v1.020
   */
  storeId: string;
  /**
   * 店铺名称 v1.020
   */
  storeName: string;
  /**
   * 平台名称 v1.020
   */
  platformName: string;
  /**
   * 场景名称(ops: JV_scene) v1.020
   */
  sceneName: string;
  /**
   * 场景编码 v1.020
   */
  sceneCode: string;
  /**
   * 品质等级
   */
  qualityLevel: string;
  /**
   * 品质等级编号
   */
  qualityLevelCode: string;
  /**
   * 织造方式code
   */
  weaveModeCode: string;
  /**
   * 织造方式
   */
  weaveMode: string;
  /**
   * 建议售价
   */
  suggestedSellingPrice: string;
  /**
   * 波段编码
   */
  waveBandCode: string;
  /**
   * 波段名称
   */
  waveBandName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode: string;
  /**
   * 款式风格名称
   */
  clothingStyleName: string;
  /**
   * 款式风格编码
   */
  clothingStyleCode: string;
  /**
   * 季节json, 多选
   */
  styleSeasonList: IDesignCommonLatestSubmitWithSpuResStyleSeasonListItem[];
  /**
   * 合身编码-OPS
   */
  fitCode: string;
  /**
   * 合身名称
   */
  fitName: string;
  /**
   * 弹性编码-OPS
   */
  elasticCode: string;
  /**
   * 弹性名称
   */
  elasticName: string;
  /**
   * 参考链接
   */
  referLink: string;
  /**
   * 最新提交时间
   */
  latestSubmitTime: string;
  /**
   * 业务渠道: 1-zj; 2-jv; 3-jv新系统;
   */
  bizChannel: string;
  /**
   * 创建人
   */
  creatorName: string;
}
export interface IDesignCommonLatestSubmitWithSpuResStyleSeasonListItem {
  /**
   * 编码
   */
  code: string;
  /**
   * 值
   */
  name: string;
}
// ⬆️ 根据SPU查询最新SPU信息响应体
