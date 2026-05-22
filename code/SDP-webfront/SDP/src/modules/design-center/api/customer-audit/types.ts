import { YES_NO_ENUM } from '@/constant';
import {
  DESIGN_CLOTHES_AUDIT_RES_ENUM,
  DESIGN_CUSTOMER_AUDIT_STATE_ENUM,
  DESIGN_SEND_STATE_ENUM,
  SAMPLE_TYPE_ENUM,
} from '@/modules/design-center/develop-bom/constant';

// 寄送客户审版列表
/**
 * 分页对象
 */
export interface IPageSendAuditReq {
  /**
   * 主键: 客户审版id
   */
  customerAuditId?: string;
  /**
   * 客户审版版本号
   */
  versionNum?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 客户审版状态: 0, 待审版; 1, 已审版
   */
  auditStatus?: DESIGN_CUSTOMER_AUDIT_STATE_ENUM | '';
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修; 3,退回审版
   */
  auditResult?: DESIGN_CLOTHES_AUDIT_RES_ENUM | '';
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 寄送人ID
   */
  senderId?: string;
  /**
   * 寄送单号
   */
  sendOrderCode?: string;
  /**
   * 寄送方式
   */
  sendType?: string;
  /**
   * 寄送时间开始
   */
  sendTimeStart?: string;
  /**
   * 寄送时间结束
   */
  sendTimeEnd?: string;
  /**
   * 寄送样衣状态 WAIT_SEND 待寄送 SENT 已寄送
   */
  sendClothesState: DESIGN_SEND_STATE_ENUM | '';
  /**
   * 创建开始时间
   */
  sendClothesCreatedTimeStart?: string;
  /**
   * 创建结束时间
   */
  sendClothesCreatedTimeEnd?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType?: SAMPLE_TYPE_ENUM | '';
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 技术组别编码
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 款生成时间
   */
  skcCreatedTimeStart?: string;
  /**
   * 款生成时间
   */
  skcCreatedTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 跟单员id
   */
  merchandiserId?: string;
  /**
   * 跟单员ids
   */
  merchandiserIdList?: number[];
  /**
   * 销售群体
   */
  saleGroupList?: string[];
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: string;
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * 当前耗时排序 ascending:升序,descending:降序
   */
  timeConsumingSort?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: YES_NO_ENUM | '';
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: YES_NO_ENUM | '';
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: YES_NO_ENUM | '';
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 是否查询我的 true=我的、false/null=全部
   */
  personal?: boolean;
  designerName?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
  clothesDesigner?: string;
}
/**
 * 响应数据
 */
export interface IPageSendAuditRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: string;
  /**
   * 总数据量
   */
  total: string;
  /**
   * 分页数据
   */
  list: IPageSendAuditListItem[];
}
export interface IPageSendAuditListItem {
  /**
   * 寄送环节的currentTime
   */
  sendCurrentTime?: string;
  /**
   * 寄送环节创建时间（用于计算寄送环节耗时耗时【sendCurrentTime-sendCreatedTime】）
   */
  sendCreatedTime: string;
  /**
   * 客户审版环节的currentTime
   */
  customerAuditCurrentTime: string;
  /**
   * 客户审版环节创建时间（用于计算客户审版环节耗时【customerAuditCurrentTime-customerAuditCreatedTime】）
   */
  customerAuditCreatedTime: string;
  /**
   * 寄送版本号
   */
  sendVersionNum: string;
  /**
   * 客审版本号
   */
  customerAuditVersionNum: string;
  /**
   * 客户审版id
   */
  customerAuditId: string;
  /**
   * 纸样单id
   */
  patternId: string;
  /**
   * 车缝单id
   */
  sewId: string;
  /**
   * 样衣质检单id
   */
  sampleQcId: string;
  /**
   * 设计审版id
   */
  designAuditId: string;
  /**
   * 客户审版状态: 0, 待审版; 1, 已审版
   */
  auditStatus: string;
  /**
   * 客户审版版本号
   */
  auditVersionNum: string;
  /**
   * 是否样衣返修(1-是、0-否)_回退样衣审版
   */
  isRepair: string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;  3,退回审版
   */
  auditResult: string;
  /**
   * 审版时间
   */
  auditTime: string;
  /**
   * 客户审版意见
   */
  auditComments: string;
  /**
   * bdid【销售BD】
   */
  bdId: string;
  /**
   * bd编号【销售BD】
   */
  bdCode: string;
  /**
   * bd名称【销售BD】
   */
  bdName: string;
  /**
   * 寄送样衣ID
   */
  sendClothesId: string;
  /**
   * 寄送方式
   *  HOME_DELIVERY,POST,CUSTOMER_PICK_UP,RUN_ERRANDS
   */
  shippingMethod: string;
  /**
   * 寄送关键信息【送样人，快递单号，取件人，跑腿方式】
   */
  sendContent: string;
  /**
   * 寄送时间
   */
  sendTime: string;
  /**
   * 寄送单号
   */
  sendOrderCode: string;
  /**
   * 寄送样衣状态 WAIT_SEND 待寄送 SENT 已寄送
   */
  sendClothesState: string;
  /**
   * 收货件数
   */
  receiptNumber: string;
  /**
   * 寄送人ID
   */
  senderId: string;
  /**
   * 寄送人名称
   */
  senderName: string;
  /**
   * 完成时间
   */
  finishTime: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 是否最新数据(1-是、0-否)
   */
  isLatest: string;
  /**
   * 版单id
   */
  clothesId: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType: string;
  /**
   * 订单类型: 1-打版订单 2-设计订单 3-加工订单；1、2属于样衣，3属于生产(大货)
   */
  demandTaskType: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode: string;
  /**
   * 原始加工单号
   */
  baseProcessCode: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount: string;
  /**
   * 当前处理环节
   */
  processStep: string;
  /**
   * 当前处理环节名称
   */
  processStepDesc: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 客户id
   */
  purchaserId: string;
  /**
   * 客户编号
   */
  purchaserCode: string;
  /**
   * 客户名称
   */
  purchaserName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft: string;
  /**
   * 是否需要下采购（true:是,false/null:否）
   */
  isPurchase: string;
  /**
   * 面辅料齐套状态(0-未流转、1-待签收、2-已签收)
   */
  materialState: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName: string;
  /**
   * 开发交付日期
   */
  deliveryTime: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod: string;
  /**
   * 期望交期
   */
  planDeliveryTime: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 跟单员id
   */
  merchandiserId: string;
  /**
   * 跟单员名称
   */
  merchandiserName: string;
  /**
   * 复色款号，不为""时代表复色版
   */
  makeSameDesignCode: string;
  /**
   * 套版款：1 衍生款：2
   */
  styleReferType: string;
  /**
   * 套版款/衍生款的设计款号
   */
  styleReferDesignCode: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime: string;
  /**
   * 当前时间
   */
  currentTime: string;
  /**
   * 二次工艺
   */
  craftList: IPageSendAuditCraftListItem[];
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  anomaly: IPageSendAuditAnomaly;
  repair: IPageSendAuditRepair;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel: string;
}
export interface IPageSendAuditCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}
/**
 * 异常信息
 */
export interface IPageSendAuditAnomaly {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 异常单号
   */
  anomalyCode: string;
  /**
   * 异常原因类型
   */
  typeDescription: string;
  /**
   * 异常描述
   */
  description: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
}
/**
 * 返修信息
 */
export interface IPageSendAuditRepair {
  /**
   * 样衣打版id
   */
  clothesId?: string;
  /**
   * 返修原因编码
   */
  repairReasonCode: string;
  /**
   * 返修原因名称
   */
  repairReasonName: string;
  /**
   * 返修原因描述
   */
  repairDescription: string;
  /**
   * 返修时间
   */
  createdTime: string;
}

// 获取寄送客户审版管理批量打印详情
/**
 * 参数
 */
export interface IPrintDetailsReq {
  /**
   * 加工单id集合
   */
  clothesIdList: string[];
}
/**
 * 响应数据
 */
export interface IPrintDetailsItem {
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 加工单id
   */
  clothesId: string;
  clothesSize: IPrintDetailsClothesSize;
  /**
   * 开发bom物料信息
   */
  bomOrderMaterialList: IPrintDetailsBomOrderMaterialListItem[];
}

/**
 * 样衣尺寸信息 (设计款号下最新的样衣尺寸信息)
 */
export interface IPrintDetailsClothesSize {
  /**
   * 尺寸表id
   */
  patternSizeId?: string;
  /**
   * 纸样主表id
   */
  patternId: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 引用设计款号
   */
  modelDesignCode: string;
  /**
   * 引用尺寸模板字段
   */
  modelSizeTemplateCode: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 客户要求尺寸样衣尺码
   */
  sampleSize: string;
  /**
   * 尺寸信息
   */
  customerSizeList: IPrintDetailsCustomerSizeListItem[];
  /**
   * 尺寸版本
   */
  sizeVersion: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名字
   */
  designerName: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名字
   */
  patternMakerName: string;
  /**
   * 保存状态 0:临时保存 |1:提交
   */
  saveType: string;
  /**
   * 创建人名字
   */
  creatorName: string;
  /**
   * 更新人名字
   */
  reviserName: string;
  /**
   * 纸样状态
   */
  patternState: string;
}
export interface IPrintDetailsCustomerSizeListItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measuringMethod: string;
  /**
   * 客户尺寸
   */
  size: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 允差范围
   */
  tolerance: string;
}
export interface IPrintDetailsBomOrderMaterialListItem {
  /**
   * bom物料ID
   */
  bomMaterialId?: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * 物料确认结果ID
   */
  trackResultId: string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName: string;
  /**
   * 使用部位,字典code
   */
  partUse: string;
  /**
   * 单件用量
   */
  singleDosage: string;
  /**
   * 裁剪方式
   */
  cuttingMethod: string;
  /**
   * 用量核算
   */
  dosageAccount: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: IPrintDetailsMaterialRemarkListItem[];
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState: string;
  /**
   * 需求单id
   */
  demandId: string;
  /**
   * 需求单编号
   */
  demandCode: string;
  /**
   * 需求序号
   */
  demandTag: string;
  /**
   * 辅料关联的面料tag
   */
  fabricDemandTag: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料 ---V.1.8.4
   */
  demandType: string;
  /**
   * 需求匹配单id
   */
  matchId: string;
  /**
   * 需求匹配单编码
   */
  matchCode: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES   ---0421-V.1.8.4
   */
  commodityType: string;
  /**
   * 商品名称(品名)
   */
  commodityName: string;
  /**
   * 商品id
   */
  commodityId: string;
  /**
   * 匹配物料图片
   */
  matchPictureList: string[];
  /**
   * 匹配物料SPU编码: 商品编码
   */
  commodityCode: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber: string;
  /**
   * 成分; json, 会有多种成分比例
   */
  material: string;
  /**
   * skuId
   */
  skuId: string;
  /**
   * SKU编码
   */
  skuCode: string;
  /**
   * 销售价格(辅料)
   */
  matchSalePrice: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName: string;
  /**
   * 包装数量(辅料)
   */
  packNumber: string;
  /**
   * 包装数量单位(辅料)
   */
  packNumberUnit: string;
  /**
   * 辅料主单位(对应履约-包装计价单位名称)  ---211208-v1.1
   */
  packUnitName: string;
  /**
   * 辅料副单位(对应履约-包装计价副单位名称)  ---211208-v1.1
   */
  packAssistantUnitName: string;
  /**
   * 辅料最小价格  ---211208-v1.1
   */
  minPrice: string;
  /**
   * 辅料最小单位  ---211208-v1.1
   */
  minPriceUnit: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs: string;
  /**
   * 门幅最低值
   */
  widthLow: string;
  /**
   * 门幅最高值
   */
  widthHigh: string;
  /**
   * 门幅单位
   */
  widthUnit: string;
  /**
   * 销售单位
   */
  saleUnit: string;
  /**
   * 克重最低值
   */
  weightLow: string;
  /**
   * 克重最高值
   */
  weightHigh: string;
  /**
   * 克重单位
   */
  weightUnit: string;
  /**
   * 色系
   */
  colorName: string;
  /**
   * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号
   */
  colorType: string;
  warehouseColorInfo: IPrintDetailsWarehouseColorInfo;
  /**
   * 色号
   */
  colorNumber: string;
  /**
   * 剪版销价
   */
  matchSampleGuidePrice: string;
  /**
   * 剪版销价单位
   */
  matchSampleUnit: string;
  /**
   * 大货销价
   */
  matchGuidePrice: string;
  /**
   * 大货销价单位
   */
  matchCostPriceUnit: string;
  /**
   * 销售空差
   */
  matchPurchaseGap: string;
  /**
   * 足米价  --211208-v1.1
   */
  meterPrice: string;
  /**
   * 足米价单位   ---211208-v1.1
   */
  meterPriceUnit: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource: string;
  /**
   * 回复人员
   */
  matcherName: string;
  /**
   * 匹配反馈备注
   */
  matchRemark: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason: string;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPictureList: string[];
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm: string;
  /**
   * bom物料排序
   */
  sort: string;
  /**
   * 用量核算-幅宽确认值 ---1222-v1.2
   */
  widthConfirm: string;
  /**
   * 供应商ID    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  supplierId: string;
  /**
   * 供应商编号    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  supplierCode: string;
  /**
   * 供应商名称    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  supplierName: string;
  /**
   * 商品进货价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  purchasePrice: string;
  /**
   * 商品销售价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  skuPrice: string;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList: IPrintDetailsCraftDemandInfoListItem[];
  /**
   * 采购次数
   */
  purchaseApplyFollowCount: string;
}
export interface IPrintDetailsMaterialRemarkListItem {
  /**
   * 备注ID
   */
  designRemarksId?: string;
  /**
   * 备注信息
   */
  remark: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
/**
 * 齐料仓信息
 */
export interface IPrintDetailsWarehouseColorInfo {
  /**
   * sku信息的id
   */
  skuId?: string;
  /**
   * 色号
   */
  colorNumber: string;
  /**
   * sku编号
   */
  skuCode: string;
  /**
   * 可用数量 实际-冻结-已出
   */
  remainingQuantity: string;
  /**
   * sku颜色描述
   */
  colorNumberDesc: string;
  /**
   * sku色系
   */
  colorSystem: string;
  /**
   * 所在仓库
   */
  warehouseName: string;
  /**
   * 所属区域
   */
  belongArea: string;
  /**
   * 供应商所属区域
   */
  supplierRegion: string;
  /**
   * 仓库区域ID
   */
  regionId: string;
}
export interface IPrintDetailsCraftDemandInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * bom详情ID
   */
  bomMaterialId: string;
  /**
   * 工艺状态 100:已提交 190:已关闭
   */
  state: 0 | 1 | 2;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1: string;
  /**
   * 材料类型 二级分类
   */
  category2: string;
  /**
   * 材料类型 三级分类
   */
  category3: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName: string;
  /**
   * 工艺承接者-联系人
   */
  contactName: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement: string;
  /**
   * 尺寸要求
   */
  sizeRequirement: string;
  /**
   * 颜色要求
   */
  colorRequirement: string;
  /**
   * 克重要求
   */
  weightRequirement: string;
  /**
   * 其他工艺要求
   */
  otherRequirement: string;
  /**
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode: string;
  /**
   * 打版价单位
   */
  sampleUnit: string;
  /**
   * 打版价
   */
  samplePrice: string;
  /**
   * 大货价单位
   */
  bulkUnit: string;
  /**
   * 大货价
   */
  bulkPrice: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 物料需求id
   */
  materialDemandId: string;
  /**
   * 打版信息id
   */
  prototypeId: string;
}
