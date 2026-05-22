export interface ISewRequire {
  /**
   * 引用款式模板编码
   */
  referStyleTemplateCode?: string;
  /**
   * 引用款式模板名称
   */
  referStyleTemplateName?: string;
  /**
   * 部位车缝要求
   */
  sewingRequireList: ISewRequireSewingRequireListItem[];
}

export interface ISewRequireSewingRequireListItem {
  /**
   * 部件名称
   */
  componentName: string;
  /**
   * 部位工序车缝要求
   */
  sewProcessList: ISewRequireSewingRequireListItemSewProcessListItem[];
}

export interface ISewRequireSewingRequireListItemSewProcessListItem {
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

/**
 * 查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2818
 */
export interface IStyleTemplatePageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 款式名称
   */
  styleName?: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state?: string;
  /**
   * 创建开始时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createStartTime?: string;
  /**
   * 创建结束时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createEndTime?: string;
}

export interface IStyleTemplatePageRes {
  page?: number;
  total?: number;
  list: IStyleTemplatePageResListItem[];
}

export interface IStyleTemplatePageResListItem {
  /**
   * 款式id
   */
  processStyleTemplateId?: string;
  /**
   * 款式名称
   * isNullAble:0
   */
  styleName?: string;
  /**
   * 区域id
   * isNullAble:0
   */
  regionId?: string;
  /**
   * 区域名
   * isNullAble:0
   */
  regionName?: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state?: string;
  /**
   * 是否删除：0否 1 是
   */
  isDeleted?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 修改人名称
   */
  reviserName?: string;
}

/**
 * 查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2610
 */
export interface ISewingComponentTemplatePageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state?: string;
  /**
   * 创建开始时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createStartTime?: string;
  /**
   * 创建结束时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createEndTime?: string;
}

export interface ISewingComponentTemplatePageRes {
  page?: number;
  total?: number;
  list: ISewingComponentTemplatePageResListItem[];
}

export interface ISewingComponentTemplatePageResListItem {
  /**
   * 主键
   * 车缝工序部件模板ID
   */
  sewingComponentTemplateId?: string;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 创建时间
   */
  createdTime?: number;
}

/**
 * 详情
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2611
 */
export interface ISewingComponentTemplateDetailReq {
  sewingComponentTemplateId: string;
}

export interface ISewingComponentTemplateDetailRes {
  /**
   * 主键
   * 车缝工序部件模板ID
   */
  sewingComponentTemplateId?: string;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 车缝工序列表
   */
  sewingProcessList: ISewingComponentTemplateDetailResSewingProcessListItem[];
}

export interface ISewingComponentTemplateDetailResSewingProcessListItem {
  /**
   * 工序环节名称
   */
  processStepName: string;
  /**
   * 工序环节编号
   */
  processStepCode?: string;
  /**
   * 金额
   */
  amount?: string | number;
  /**
   * 主键
   * 车缝工序ID
   * isNullAble:0
   */
  sewingProcessId?: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName?: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName?: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType?: string;
  /**
   * 车种名称
   * isNullAble:0
   */
  plmSewingName?: string;
  /**
   * 车种
   */
  sewingType: string;
  /**
   * 车种描述
   */
  sewingTypeDesc?: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture?: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe?: string;
  /**
   * 预计用时
   * isNullAble:0
   */
  estimatedTime?: string;
  workingHour?: string;
  /**
   * 备注
   * isNullAble:1
   */
  remark?: string;
  /**
   * 父级ID
   * isNullAble:0
   */
  parentId?: string;
  /**
   * 父级类型：0:sewing_component_template_id,1:process_style_template_id
   * isNullAble:1,defaultVal:0
   */
  parentType?: string;
  /**
   * 分钟工资
   */
  minutelyPay?: string;
}

/**
 * 工序款式库明细信息
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/2816
 */
export interface IStyleTemplateDetailReq {
  /**
   * 款式库id
   */
  id: string;
}

export interface IStyleTemplateDetailRes {
  /**
   * 款式id
   */
  processStyleTemplateId?: string;
  /**
   * 款式名称
   * isNullAble:0
   */
  styleName?: string;
  /**
   * 区域id
   * isNullAble:0
   */
  regionId?: string;
  /**
   * 区域名
   * isNullAble:0
   */
  regionName?: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state?: string;
  /**
   * 引用的款式名称模板id
   * isNullAble:1
   */
  referenceId?: string;
  /**
   * 引用的款式名称名称
   * isNullAble:1
   */
  referenceName?: string;
  /**
   * 车缝信息
   */
  processStyleSewings: IStyleTemplateDetailResProcessStyleSewingsItem[];
  /**
   * 其他部件信息
   */
  processStyleAnotherProcess: IStyleTemplateDetailResProcessStyleAnotherProcessItem[];
}

export interface IStyleTemplateDetailResProcessStyleAnotherProcessItem {
  /**
   * 其他工序id
   */
  anotherProcessId?: string;
  /**
   * 工序环节编号
   * isNullAble:0
   */
  processStepCode?: string;
  /**
   * 工序环节名称
   * isNullAble:0
   */
  processStepName?: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe?: string;
  /**
   * 用量
   * isNullAble:1
   */
  dosage?: string;
  /**
   * 单位
   * isNullAble:1
   */
  unit?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 单价
   */
  price?: string;
}

export interface IStyleTemplateDetailResProcessStyleSewingsItem {
  /**
   * 工序环节名称
   */
  processStepName: string;
  /**
   * 工序环节编号
   */
  processStepCode?: string;
  /**
   * 车缝工序id
   */
  sewingProcessId: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType: string;
  /**
   * 车种名称
   * isNullAble:1
   */
  plmSewingName: string;
  /**
   * 车种
   */
  sewingType: string;
  /**
   * 车种描述
   */
  sewingTypeDesc?: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture?: string;
  /**
   * 工序描述
   */
  processDescribe?: string;
  /**
   * 预计用时
   */
  estimatedTime?: string;
  workingHour?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的的sewingProcessId
   */
  referenceSewingProcessId?: string;
  /**
   * 分钟工资
   */
  minutelyPay?: string;
  /**
   * 金额
   */
  amount?: string | number;
}

export interface ISewFormData {
  cuttingRequire: string;
  tailRequire: string;
  referStyleTemplateCode: string;
  referStyleTemplateName: string;
  referComponentTemplateCode: string;
  referComponentTemplateName: string;
  sewingRequireList: ISewRequireSewingRequireListItem[];
}

/**
 * 查询审版工艺款式（模板）基本信息 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/5254
 */
export interface IAuditCraftTemplateListBaseInfoReq {
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 版房品类
   */
  roomCategory?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
}

export type IAuditCraftTemplateListBaseInfoRes = IAuditCraftTemplateListBaseInfoResItem[];
export interface IAuditCraftTemplateListBaseInfoResItem {
  isDeleted?: string;
  creatorId?: string;
  createdTime?: number;
  reviserId?: string;
  revisedTime?: number;
  /**
   * 模板ID
   */
  templateId?: string;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 版房品类
   */
  roomCategory?: string;
  /**
   * 版房品类名称
   */
  roomCategoryName?: string;
  /**
   * 最新模板配置明细ID
   */
  latestDetailId?: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  state?: string;
}

// 查询审版工艺款式（模板）基本信息 ⬆️

/**
 * 根据ID查询审版工艺款式（模板）明细 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/5246
 */
export interface IAuditCraftTemplateGetDetailByIdReq {
  templateId: string;
}

export interface IAuditCraftTemplateGetDetailByIdRes {
  isDeleted?: string;
  creatorId?: string;
  createdTime?: number;
  reviserId?: string;
  revisedTime?: number;
  /**
   * 模板ID
   */
  templateId?: string;
  /**
   * 模板名称
   */
  templateName?: string;
  /**
   * 版房品类
   */
  roomCategory?: string;
  /**
   * 版房品类名称
   */
  roomCategoryName?: string;
  /**
   * 最新模板配置明细ID
   */
  latestDetailId?: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  state?: string;
  /**
   * 模板明细JSON对象
   */
  detailJson: IAuditCraftTemplateGetDetailByIdResDetailJsonItem[];
}

export interface IAuditCraftTemplateGetDetailByIdResDetailJsonItem {
  /**
   * 审版工艺部件ID
   */
  componentId?: string;
  /**
   * 工序部件名称
   */
  componentName?: string;
  /**
   * 版型结构分解
   */
  structurals: IAuditCraftTemplateGetDetailByIdResDetailJsonItemStructuralsItem[];
}

export interface IAuditCraftTemplateGetDetailByIdResDetailJsonItemStructuralsItem {
  /**
   * 版型结构分解描述
   */
  desc: string;
  /**
   * 车缝工艺要求
   */
  sewingRequires: IAuditCraftTemplateGetDetailByIdResDetailJsonItemStructuralsItemSewingRequiresItem[];
}

export interface IAuditCraftTemplateGetDetailByIdResDetailJsonItemStructuralsItemSewingRequiresItem {
  /**
   * 车缝工艺要求描述
   */
  desc: string;
}

// 根据ID查询审版工艺款式（模板）明细 ⬆️

/**
 * 通过SKC查询其他款的加工其他费用 用于引用 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/5286
 */
export interface ICheckPriceGetProcessOtherBySkcReq {
  designCode: string;
}

export interface ICheckPriceGetProcessOtherBySkcRes {
  /**
   * 核价表ID
   */
  checkPriceId?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 样衣核价状态 100待核价 110已核价
   */
  state?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * SPU下审版是否通过 0否 1是
   */
  auditPass?: string;
  /**
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: string;
  /**
   * 核价单号（原始核价单号+版本号）
   */
  priceOrderCode?: string;
  /**
   * 原始核价单号
   */
  basePriceOrderCode?: string;
  /**
   * 工序环节明细
   */
  processCostInfo?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 物料费用明细
   * 字段属性:bomMaterialId:物料ID，countUnit：核算用量，waste:损耗（单位%），price:单价
   */
  materialCostInfo?: string;
  /**
   * 二次工艺费用，字段属性：craftDemandId：工艺需求ID,unit:单位用量，price:单价，waste：损耗（单位%）
   */
  craftDemandCostInfo?: string;
  /**
   * 二次工艺总价（元）
   */
  craftDemandCost?: string;
  /**
   * 二次工艺成本价(元)
   */
  craftDemandOriginalCost?: string;
  /**
   * 小单二次工艺成本价(元)
   */
  smallOrderCraftDemandCost?: string;
  /**
   * 物料总价
   */
  materialCost?: string;
  /**
   * 利润点（单位%）
   */
  profit?: string;
  /**
   * 加成点(单位%)
   */
  taxationRatio?: string;
  /**
   * 加工总价
   */
  processCost?: string;
  /**
   * 总价（元）（不加成）
   */
  totalCost?: string;
  /**
   * 总加加成
   */
  totalCostExt?: string;
  /**
   * 利润(成本)
   */
  profitCost?: string;
  /**
   * 加成费用
   */
  taxationCost?: string;
  /**
   * 总成本（不算损耗）
   */
  pureTotalCost?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 是否最新数据(1-是、0-否), 用来避免分组查询
   */
  isLatest?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 其他费用明细
   */
  otherCostInfo?: string;
  /**
   * 其他费用
   */
  otherCost?: string;
  /**
   * 小单其他费用
   */
  smallOrderOtherCost?: string;
  /**
   * 面料费用
   */
  fabricsCost?: string;
  /**
   * 小单面料费用
   */
  smallOrderFabricsCost?: string;
  /**
   * 辅料费用
   */
  accessoriesCost?: string;
  /**
   * 小单辅料费用
   */
  smallOrderAccessoriesCost?: string;
  /**
   * 车缝费用
   */
  sewingCost?: string;
  /**
   * 裁剪费用
   */
  cuttingCost?: string;
  /**
   * 后道费用
   */
  postProcessingCost?: string;
  /**
   * 专机/手工费用‌
   */
  specialCost?: string;
  /**
   * bomId
   */
  bomId?: string;
  /**
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 核算师ID
   */
  checkerId?: string;
  /**
   * 核算师名称
   */
  checkerName?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师code
   */
  designerCode?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 客户图片列表
   */
  customerPicture?: string;
  /**
   * 小单物料总价
   */
  smallOrderMaterialCost?: string;
  /**
   * 小单工序总价
   */
  smallOrderProcessCost?: string;
  /**
   * 小单总成本
   */
  smallOrderPureTotalCost?: string;
  /**
   * 小单总价不加成
   */
  smallOrderTotalCost?: string;
  /**
   * 小单总价加成
   */
  smallOrderTotalCostExt?: string;
  /**
   * 款式来源：1-致景PLM 2-JV PLM 3-JV SDP
   * 参考BizChannelEnum
   */
  bizChannel?: string;
  /**
   * 是否推送ZJ 0:否|1:是
   */
  pushZjState?: string;
  /**
   * 其他费用明细
   */
  otherCostInfoList: ICheckPriceGetProcessOtherBySkcResOtherCostInfoListItem[];
  /**
   * 加工费用
   */
  processCostInfoList: ICheckPriceGetProcessOtherBySkcResProcessCostInfoListItem[];
}

export interface ICheckPriceGetProcessOtherBySkcResProcessCostInfoListItem {
  /**
   * 金额
   */
  amount?: string | number;
  /**
   * 工序环节名称
   */
  processStepName: string;
  /**
   * 工序环节编号
   */
  processStepCode?: string;
  /**
   * 工序名称
   */
  processName: string;
  /**
   * 数量
   */
  perPieceAmount: string;
  /**
   * 单价
   */
  price?: string;
  /**
   * 工时
   */
  workingHour: string;
  /**
   * 备注
   */
  remarks?: string;
  /**
   * 单位
   */
  unit: string;
  /**
   * 车种
   */
  sewingType: string;
  /**
   * 车种描述
   */
  sewingTypeDesc?: string;
  /**
   * 分钟工资
   */
  minutelyPay: string;
  /**
   * 工序类型（1：车缝 2：其他工序）
   */
  processType?: string;
  /**
   * 工序id（其他工序）
   */
  processTemplateId?: string;
  /**
   * 工序款式库模板id
   */
  processStyleTemplateId?: string;
  /**
   * 工序款式库模板名称
   */
  styleName?: string;
  /**
   * 工序车缝详情信息
   */
  processSewingInfos: ICheckPriceGetProcessOtherBySkcResProcessCostInfoListItemProcessSewingInfosItem[];
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 发单倍率
   */
  orderSendingRate?: string;
}

export interface ICheckPriceGetProcessOtherBySkcResProcessCostInfoListItemProcessSewingInfosItem {
  /**
   * 主键
   * 车缝工序ID
   * isNullAble:0
   */
  sewingProcessId?: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName?: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName?: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType?: string;
  /**
   * 车种名称
   * isNullAble:0
   */
  plmSewingName?: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture?: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe?: string;
  /**
   * 预计用时
   * isNullAble:0
   */
  estimatedTime?: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的的sewingProcessId
   */
  referenceSewingProcessId?: string;
}

export interface ICheckPriceGetProcessOtherBySkcResOtherCostInfoListItem {
  /**
   * 费用名称
   */
  costName?: string;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 单件净用量
   */
  num: string;
  /**
   * 单价
   */
  price: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * 备注
   */
  remarks?: string;
  /**
   * 其他费用描述
   */
  otherCostDescribe?: string;
}

// 通过SKC查询其他款的加工其他费用 用于引用 ⬆️

/**
 * 分页查询审版工艺部件
 * yapi地址：https://yapi.tiangong.site/project/43/interface/api/5266
 */
export interface IAuditCraftComponentQueryByListReq {
  /**
   * 部件名称
   */
  componentName?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
}

export type IAuditCraftComponentQueryByListRes = IAuditCraftComponentQueryByListResListItem[];

export interface IAuditCraftComponentQueryByListResListItem {
  /**
   * 部件id
   */
  componentId?: string;
  /**
   * 工序部件名称
   */
  componentName?: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  state?: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  stateDesc?: string;
}
