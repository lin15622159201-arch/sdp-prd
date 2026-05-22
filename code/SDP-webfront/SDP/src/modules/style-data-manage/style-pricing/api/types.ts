import { YES_NO_ENUM, YES_NO_NUMBER_ENUM } from '@/constant';
import { QUOTE_FOB_PRICING_TYPE_ENUM } from '@/constant-transfer';
import { CLOTHES_CHECK_PRICESTATE_ENUM } from '../../constant';
import { CHECK_PRICE_STATE_ENUM, STATE_ENUM } from '../constant';
import { COMMODITY_TYPE_ENUM } from '@/modules/design-center/inspiration-demand/constant';

// 工序车缝详情信息
export interface IProcessSewingInfosItem {
  // 引用工序部件库id
  referenceSewingProcessId?: string;
  /**
   * 部件禁用状态
   */
  state?: YES_NO_NUMBER_ENUM | '';
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
   * 图片
   * isNullAble:1
   */
  picture: string;
  /**
   * 工序描述
   */
  processDescribe: string;
  /**
   * 预计用时
   */
  estimatedTime: string | number;
  /**
   * 备注
   */
  remark?: string;
}

// 工序款式模板信息
export interface IProcessTemplateInfo {
  // 工序类型 1车缝 2其他
  processType?: string;
  // 工序id
  processTemplateId?: string;
  // 工序款式库模板id
  processStyleTemplateId?: string;
  // 工序款式库模板名称
  styleName?: string;
  // 工序车缝详情信息
  processSewingInfos?: IProcessSewingInfosItem[];
}

export interface IV1FobPricingsMachiningDetailsItem {
  // // 工序类型 1车缝 2其他
  // processType?: string;
  // // 工序id
  // processTemplateId?: string;
  // // 工序款式库模板id
  // processStyleTemplateId?: string;
  // // 工序车缝详情信息
  // processSewingInfos?: IProcessSewingInfosItem[];
  // 工序款式模板信息
  processTemplateInfo?: IProcessTemplateInfo;
  /**
   * FOB加工费用id
   */
  fobMachiningPricingId?: string;
  /**
   * FOB核价明细id
   */
  fobPricingDetailId: string;
  /**
   * 核价类型。1对客 |2对厂
   */
  pricingType: QUOTE_FOB_PRICING_TYPE_ENUM;
  // 工序环节 code
  processStepCode: string;
  /**
   * 工序环节。1裁剪 |2车缝 |3尾部 |4专机
   */
  processStepName: string;
  /**
   * 车种编码。车缝特有
   */
  sewingType: string;
  /**
   * 车种。车缝特有
   */
  sewingTypeDesc: string;
  /**
   * 工序名称
   */
  processDescription: string;
  /**
   * 数量
   */
  perPieceAmount: string;
  /**
   * 工时(分)。车缝特有
   */
  workingHour: string | number;
  workingHourCache?: string | number;
  /**
   * 单价
   */
  price: string;
  /**
   * 分钟工资。车缝特有
   */
  minutelyPay: string;
  /**
   * 单位
   */
  unit: string;
  /**
   * 金额
   */
  amount: string | number;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 样衣核价查询列表（分页）
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2797
 */
export interface ICheckPricePageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 创建开始时间
   */
  countCreatedTimeStart?: string;
  /**
   * 创建结束时间
   */
  countCreatedTimeEnd?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList: string[];
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string[];
  /**
   * 核价开始时间
   */
  finishTimeStart?: string;
  /**
   * 核价结束时间
   */
  finishTimeEnd?: string;
  checkCountReceiving?: YES_NO_ENUM;
  /**
   * 创建时间-开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间-结束
   */
  createdTimeEnd?: string;
  /**
   * SPU下审版是否通过 0否 1是
   */
  auditPass?: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  clothesCheckPriceState: CLOTHES_CHECK_PRICESTATE_ENUM;
  /**
   * 样衣核价状态 100待核价 110已核价
   */
  checkPriceState?: string;
  /**
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 创建开始时间
   */
  priceCreatedTimeStart?: string;
  /**
   * 创建结束时间
   */
  priceCreatedTimeEnd?: string;
  /**
   * 核价单号
   */
  priceOrderCode?: string;
  /**
   * 是否待更新 0否 1是
   */
  isUpdate?: string;
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
}

export interface ICheckPricePageRes {
  page?: number;
  total?: number;
  list: ICheckPricePageResListItem[];
}

export interface ICheckPricePageResListItem {
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
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
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: YES_NO_ENUM;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 二次工艺
   */
  craftList: ICheckPricePageResListItemCraftListItem[];
  state?: STATE_ENUM;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 首次创建时间
   */
  firstCreatedTime?: number;
  /**
   * 首次提交时间
   */
  firstFinishTime?: number;
  /**
   * SPU下审版是否通过 0否 1是
   */
  auditPass?: string;
  /**
   * 核价表ID
   */
  checkPriceId?: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  checkPriceState?: CLOTHES_CHECK_PRICESTATE_ENUM;
  /**
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 是否最新数据(1-是、0-否), 用来避免分组查询
   */
  isLatest?: string;
  /**
   * 核价单号（原始核价单号+版本号）
   */
  priceOrderCode?: string;
  remark?: string;
  /**
   * 是否待更新 0否 1是
   */
  isUpdate?: string;
  /**
   * 预估核价对厂不含税价
   */
  estimateCheckTotalCost?: string;
  /**
   * 总价不加成
   */
  totalCost?: string;
}

export interface ICheckPricePageResListItemCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName?: string;
  /**
   * 二次工艺名称
   */
  nameList: string[];
}

/**
 * 统计状态数量
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2849
 */

export type IEstimateCheckPriceCountStateRes = IEstimateCheckPriceCountStateResItem[];
export interface IEstimateCheckPriceCountStateResItem {
  /**
   * 状态
   */
  state?: STATE_ENUM;
  /**
   * 状态数量
   */
  count?: string;
}
/**
 * 样衣核价详情
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2798
 */
export interface ICheckPriceDetailReq {
  /**
   * 主键
   */
  checkPriceId: string;
  /**
   * 获取详情目的 VISIT :查看
   * INIT_CHECK :初次核算
   * RE_CHECK :核算更新
   */
  detailAimEnum: string;
}

export interface ICheckPriceDetailRes {
  bomId?: string;
  /**
   * 物料费用明细
   */
  materialCostInfoList: ICheckPriceDetailResMaterialCostInfoListItem[];
  /**
   * 二次工艺费用明细
   */
  craftDemandCostInfoList: ICheckPriceDetailResCraftDemandCostInfoListItem[];
  /**
   * 其他费用明细
   */
  otherCostInfoList: ICheckPriceDetailResOtherCostInfoListItem[];
  /**
   * 加工费用
   */
  processCostInfoList: ICheckPriceDetailResProcessCostInfoListItem[];
  /**
   * 物料总价（元）
   */
  materialCost?: string;
  /**
   * 二次工艺总价（元）
   */
  craftDemandCost?: string;
  /**
   * 加工总价（元）
   */
  processCost?: string;
  /**
   * 其他费用
   */
  otherCost?: string;
  /**
   * 利润点（%）（小数点两位）
   * 毛利率
   */
  profit?: string;
  /**
   * 加成点(单位%) 小数点两位）
   */
  taxationRatio?: string;
  /**
   * 利润成本
   */
  profitCost?: string;
  /**
   * 加成费用
   */
  taxationCost?: string;
  /**
   * 总价成本（不算损耗）
   */
  pureTotalCost?: string;
  /**
   * 总价（元）（不加成）
   */
  totalCost?: string;
  /**
   * 总加加成
   */
  totalCostExt?: string;
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
   * 小单物料总价
   */
  smallOrderMaterialCost?: string;
  /**
   * 小单工序总价
   */
  smallOrderProcessCost?: string;
  /**
   * 核价表ID
   */
  checkPriceId?: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  checkPriceState?: CHECK_PRICE_STATE_ENUM;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计师id【设计师】
   */
  designerId?: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode?: string;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 客户图片列表
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 用量师
   */
  checkerName?: string;
  /**
   * 核量时间
   */
  checkTime?: number;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 核价时间
   */
  finishTime?: number;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 是否最新数据(1-是、0-否), 用来避免分组查询
   */
  isLatest?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 客户款号
   */
  customerStyleCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 核价单号（原始核价单号+版本号）
   */
  priceOrderCode?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * skc&spu基础信息
   */
  skcInfoVo?: ICheckPriceDetailResSkcInfoVo;
  /**
   * 小单二次工艺成本价(元)
   */
  smallOrderCraftDemandCost?: string;
  /**
   * 小单其他费用
   */
  smallOrderOtherCost?: string;
  /**
   * 小单面料费用
   */
  smallOrderFabricsCost?: string;
  /**
   * 小单辅料费用
   */
  smallOrderAccessoriesCost?: string;
  /**
   * 面料费用
   */
  fabricsCost?: string;
  /**
   * 辅料费用
   */
  accessoriesCost?: string;
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
   * 预估核价详情
   */
  estimateCheckPriceDetailVo?: ICheckPriceDetailResEstimateCheckPriceDetailVo;
}

export interface ICheckPriceDetailResEstimateCheckPriceDetailVo {
  /**
   * 预估核价表ID
   */
  estimateCheckPriceId?: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  checkPriceState?: CLOTHES_CHECK_PRICESTATE_ENUM;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计师id【设计师】
   */
  designerId?: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode?: string;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 客户图片列表
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 核价时间
   */
  finishTime?: number;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 是否最新数据(1-是、0-否), 用来避免分组查询
   */
  isLatest?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 客户款号
   */
  customerStyleCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 核价单号（原始核价单号+版本号）
   */
  priceOrderCode?: string;
  bomId?: string;
  /**
   * 物料费用明细
   */
  materialCostInfoList: ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItem[];
  /**
   * 二次工艺费用明细
   */
  craftDemandCostInfoList: ICheckPriceDetailResEstimateCheckPriceDetailVoCraftDemandCostInfoListItem[];
  /**
   * 物料总价（元）
   */
  materialCost?: string;
  /**
   * 二次工艺总价（元）
   */
  craftDemandCost?: string;
  /**
   * 加工总价（元）
   */
  processCost?: string;
  /**
   * 其他费用
   */
  otherCost?: string;
  /**
   * 利润点（%）（小数点两位）
   * 毛利率
   */
  profit?: string;
  /**
   * 利润成本
   */
  profitCost?: string;
  /**
   * 加成点
   */
  taxationRatio?: string;
  /**
   * 加成费用
   */
  taxationCost?: string;
  /**
   * 总价成本（不算损耗）
   */
  pureTotalCost?: string;
  /**
   * 总价（元）（不加成）
   */
  totalCost?: string;
  /**
   * 总加加成
   */
  totalCostExt?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * skc&spu基础信息
   */
  skcInfoVo?: ICheckPriceDetailResEstimateCheckPriceDetailVoSkcInfoVo;
}

export interface ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItem {
  bomMaterialId?: string;
  bomId?: string;
  bomMaterialType?: string;
  prototypeMaterialName?: string;
  partUse?: string;
  partUseName?: string;
  cuttingMethod?: string;
  cuttingMethodName?: string;
  dosageAccount?: string;
  materialRemarkList: ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItemMaterialRemarkListItem[];
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandId?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandCode?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandTag?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  fabricDemandTag?: string;
  demandType?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchId?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchCode?: string;
  commodityType?: string;
  commodityName?: string;
  flowerCategory?: string;
  commodityId?: string;
  commodityCode?: string;
  commodityNumber?: string;
  categoryCode?: string;
  categoryName?: string;
  skuId?: string;
  skuCode?: string;
  material?: string;
  matchPictureList: string[];
  matchSalePrice?: string;
  matchPurchaseUnitName?: string;
  packNumber?: string;
  packUnitName?: string;
  packAssistantUnitName?: string;
  minPrice?: string;
  minPriceUnit?: string;
  skuAttrs?: string;
  widthStrFormat?: string;
  saleUnit?: string;
  weightStrFormat?: string;
  colorName?: string;
  colorType?: string;
  warehouseColorInfo?: ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItemWarehouseColorInfo;
  colorNumber?: string;
  matchSampleGuidePrice?: string;
  matchSampleUnit?: string;
  matchGuidePrice?: string;
  matchCostPriceUnit?: string;
  matchPurchaseGap?: string;
  meterPrice?: string;
  meterPriceUnit?: string;
  matchSource?: string;
  matcherName?: string;
  matchRemark?: string;
  unfinishedReason?: string;
  colorCardPictureList: string[];
  purchaseColorCardPictureList: string[];
  isConfirm?: string;
  sort?: string;
  widthConfirm?: string;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  invoiceState?: string;
  priceReplyTime?: number;
  priceInvalidTime?: number;
  purchasePrice?: string;
  skuPrice?: string;
  accessoriesFlagId?: string;
  craftDemandInfoList: ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItemCraftDemandInfoListItem[];
  purchaseApplyFollowCount?: string;
  dosageAccountUnit?: string;
  attritionRate?: string;
  bulkPurchasePrice?: string;
  bulkPurchasePriceUnit?: string;
  materialSnapshotId?: string;
  materialContextId?: string;
  isNoCraft?: string;
  enableState?: string;
  onShelfState?: string;
  supplyExistState?: string;
  bomMaterialIdCopy?: string;
  materialTypeCode?: string;
  materialType?: string;
  bomMaterialDemandId?: string;
  colorMatchMaterialState?: string;
  colorMatchMaterialName?: string;
  colorMatchMaterialId?: string;
  materialState?: string;
  replaceBomMaterialId?: string;
  samplePurchasingCycle?: string;
  samplePurchasingCycleUnit?: string;
  bulkPurchasingCycle?: string;
  bulkPurchasingCycleUnit?: string;
  isPlanning?: string;
  bandDate?: number;
  identifyMaterialId?: string;
  encryptionCommodityCode?: string;
  encryptionSkuCode?: string;
  encryptionCommodityName?: string;
  identifySelection?: boolean;
  materialImg?: string;
  /**
   * 损耗
   */
  waste?: string;
  /**
   * 单价
   */
  price?: string;
  /**
   * 大货进价
   */
  bulkPrice?: string;
  /**
   * 上一版本大货进价
   */
  lastBulkPrice?: string;
  /**
   * 价格单位
   */
  unit?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 上一版本用量核算
   */
  lastDosageAccount?: string;
  /**
   * 类目code(分类以"-"隔开)（如：ACCESSORIES-21-211）
   */
  demandCategoryCode?: string;
  /**
   * 类目名(分类以"-"隔开)（如：辅料-扣件-对勾（勾扣））
   */
  demandCategoryName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 价格更新时间
   */
  priceRevisedTime?: number;
  /**
   * 价格有效期时间开始
   */
  validityStartTime?: number;
  /**
   * 价格有效期时间结束
   */
  validityEndTime?: number;
  /**
   * 小单倍率
   */
  smallOrderRate: string;
  /**
   * 小单损耗
   */
  smallOrderWaste: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  lastSmallOrderSumOfMoney?: string;
  /**
   * 散剪价
   */
  cutPriceInfo?: string;
  /**
   * 上一版本散剪价
   */
  lastCutPriceInfo?: string;
}

export interface ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItemCraftDemandInfoListItem {
  craftDemandId?: string;
  designCode?: string;
  bomId?: string;
  bomMaterialId?: string;
  state?: string;
  category1?: string;
  category2?: string;
  category3?: string;
  craftsRequire?: string;
  undertakeType?: string;
  customerSupplyFactory?: string;
  innerFactoryId?: string;
  factoryName?: string;
  contactName?: string;
  contactPhone?: string;
  contactProvince?: string;
  contactCity?: string;
  contactRegion?: string;
  contactDetailAddress?: string;
  pictureList: string[];
  positionRequirement?: string;
  sizeRequirement?: string;
  colorRequirement?: string;
  weightRequirement?: string;
  otherRequirement?: string;
  thirdPartyCraftDemandId?: string;
  thirdPartyCraftDemandCode?: string;
  sampleCraftCycle?: string;
  sampleCraftCycleUnit?: string;
  bulkCraftCycle?: string;
  bulkCraftCycleUnit?: string;
  sampleUnit?: string;
  samplePrice?: string;
  bulkUnit?: string;
  bulkPrice?: string;
  creatorId?: string;
  createdTime?: number;
  creatorName?: string;
  materialDemandId?: string;
  prototypeId?: string;
  craftUnit?: string;
  isTransient?: string;
}

export interface ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItemWarehouseColorInfo {
  skuId?: string;
  colorNumber?: string;
  skuCode?: string;
  remainingQuantity?: string;
  colorNumberDesc?: string;
  colorSystem?: string;
  warehouseName?: string;
  belongArea?: string;
  supplierRegion?: string;
  regionId?: string;
}

export interface ICheckPriceDetailResEstimateCheckPriceDetailVoMaterialCostInfoListItemMaterialRemarkListItem {
  designRemarksId?: string;
  remark?: string;
  transientState?: string;
  creatorId?: string;
  createdName?: string;
  createdTime?: number;
}

export interface ICheckPriceDetailResEstimateCheckPriceDetailVoSkcInfoVo {
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 设计图-首图
   */
  designPicture?: string;
  /**
   * 设计图
   */
  designPictureList: string[];
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 款类型: 1--正常款 2-复色款
   */
  skcType?: string;
  /**
   * 设计师id【设计师】
   */
  designerId?: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode?: string;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 商品类型
   */
  productType?: string;
  /**
   * 货盘类型名称
   */
  palletTypeName?: string;
  /**
   * 货盘类型编码
   */
  palletTypeCode?: string;
  /**
   * 品质等级
   */
  qualityLevel?: string;
  /**
   * 品质等级编号
   */
  qualityLevelCode?: string;
  /**
   * 织造方式code
   */
  weaveModeCode?: string;
  /**
   * 织造方式
   */
  weaveMode?: string;
  /**
   * 建议售价
   */
  suggestedSellingPrice?: string;
  /**
   * 波段编码
   */
  waveBandCode?: string;
  /**
   * 波段名称
   */
  waveBandName?: string;
  /**
   * 款式风格名称
   */
  clothingStyleName?: string;
  /**
   * 款式风格编码
   */
  clothingStyleCode?: string;
  /**
   * SPU创建人
   */
  creatorName?: string;
}

export interface ICheckPriceDetailResEstimateCheckPriceDetailVoCraftDemandCostInfoListItem {
  craftDemandId?: string;
  designCode?: string;
  bomId?: string;
  bomMaterialId?: string;
  state?: string;
  category1?: string;
  category2?: string;
  category3?: string;
  craftsRequire?: string;
  undertakeType?: string;
  customerSupplyFactory?: string;
  innerFactoryId?: string;
  factoryName?: string;
  contactName?: string;
  contactPhone?: string;
  contactProvince?: string;
  contactCity?: string;
  contactRegion?: string;
  contactDetailAddress?: string;
  pictureList: string[];
  positionRequirement?: string;
  sizeRequirement?: string;
  colorRequirement?: string;
  weightRequirement?: string;
  otherRequirement?: string;
  thirdPartyCraftDemandId?: string;
  thirdPartyCraftDemandCode?: string;
  sampleCraftCycle?: string;
  sampleCraftCycleUnit?: string;
  bulkCraftCycle?: string;
  bulkCraftCycleUnit?: string;
  sampleUnit?: string;
  samplePrice?: string;
  bulkUnit?: string;
  bulkPrice?: string;
  creatorId?: string;
  createdTime?: number;
  creatorName?: string;
  materialDemandId?: string;
  prototypeId?: string;
  craftUnit?: string;
  isTransient?: string;
  /**
   * 需求匹配单id
   */
  matchId?: string;
  /**
   * 单件用量
   */
  singleDosage?: string;
  /**
   * 损耗（单位%）
   */
  waste?: string;
  /**
   * 上一版大货工艺进货价
   */
  lastBulkPrice?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 二次工艺次序编号
   */
  craftsProcessCode?: string;
  /**
   * 二次工艺次序名称
   */
  craftsProcessName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 工艺用量核算
   */
  craftDosageAccount?: string;
  /**
   * 工艺用量核算单位
   */
  craftDosageAccountUnit?: string;
  /**
   * 上一版本的用量核算
   */
  lastCraftDosageAccount?: string;
  /**
   * 设计款物料项目名（关联物料）
   */
  prototypeMaterialName?: string;
}

export interface ICheckPriceDetailResSkcInfoVo {
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 设计图-首图
   */
  designPicture?: string;
  /**
   * 设计图
   */
  designPictureList: string[];
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 款类型: 1--正常款 2-复色款
   */
  skcType?: string;
  /**
   * 设计师id【设计师】
   */
  designerId?: string;
  /**
   * 设计师编号【设计师】
   */
  designerCode?: string;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 商品类型
   */
  productType?: string;
  /**
   * 货盘类型名称
   */
  palletTypeName?: string;
  /**
   * 货盘类型编码
   */
  palletTypeCode?: string;
  /**
   * 品质等级
   */
  qualityLevel?: string;
  /**
   * 品质等级编号
   */
  qualityLevelCode?: string;
  /**
   * 织造方式code
   */
  weaveModeCode?: string;
  /**
   * 织造方式
   */
  weaveMode?: string;
  /**
   * 建议售价
   */
  suggestedSellingPrice?: string;
  /**
   * 波段编码
   */
  waveBandCode?: string;
  /**
   * 波段名称
   */
  waveBandName?: string;
  /**
   * 款式风格名称
   */
  clothingStyleName?: string;
  /**
   * 款式风格编码
   */
  clothingStyleCode?: string;
  /**
   * SPU创建人
   */
  creatorName?: string;
}

export interface ICheckPriceDetailResProcessCostInfoListItem {
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
   * 金额
   */
  amount?: string | number;
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
  processSewingInfos: ICheckPriceDetailResProcessCostInfoListItemProcessSewingInfosItem[];
  /**
   * 小单倍率
   */
  smallOrderRate: string;
  /**
   * 发单倍率
   */
  orderSendingRate: string;
}

export interface ICheckPriceDetailResProcessCostInfoListItemProcessSewingInfosItem {
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

export interface ICheckPriceDetailResMaterialCostInfoListItem {
  /**
   * bom物料ID
   */
  bomMaterialId: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom物料类型: 1-面料; 2-辅料;3-特殊辅料；4-辅料找料
   */
  bomMaterialType?: string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName?: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 使用部位,字典值 多值以逗号隔开 ---自选物料0.1
   */
  partUseName?: string;
  /**
   * 裁剪方式code
   */
  cuttingMethod?: string;
  /**
   * 裁剪方式名  ---自选物料0.1
   */
  cuttingMethodName?: string;
  /**
   * 用量核算
   */
  dosageAccount?: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: ICheckPriceDetailResMaterialCostInfoListItemMaterialRemarkListItem[];
  /**
   * 需求单id
   * 「已废弃」
   */
  demandId?: string;
  /**
   * 需求单编号
   * 「已废弃」
   */
  demandCode?: string;
  /**
   * 需求序号
   * 「已废弃」
   */
  demandTag?: string;
  /**
   * 辅料关联的面料tag
   * 「已废弃」
   */
  fabricDemandTag?: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料; 4:辅料找料 ---V.3.11(添加4类型)
   */
  demandType?: '1' | '2' | '3' | '4';
  /**
   * 需求匹配单id
   * 「已废弃」
   */
  matchId?: string;
  /**
   * 需求匹配单编码
   * 「已废弃」
   */
  matchCode?: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES   ---0421-V.1.8.4
   */
  commodityType?: COMMODITY_TYPE_ENUM;
  /**
   * 商品名称(品名)  ---面料-净色、辅料、特殊辅料
   */
  commodityName?: string;
  /**
   * 花型品类
   */
  flowerCategory?: string;
  /**
   * 商品id
   */
  commodityId?: string;
  /**
   * 商品编码
   */
  commodityCode?: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber?: string;
  /**
   * 类目code(分类以"[-]"隔开)（如：ACCESSORIES[-]21[-]211）
   */
  categoryCode?: string;
  /**
   * 类目名(分类以"[-]"隔开)（如：辅料[-]扣件[-]对勾（勾扣））
   */
  categoryName?: string;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * SKU编码
   */
  skuCode?: string;
  /**
   * 成分; json, 会有多种成分比例(面料)
   */
  material?: string;
  /**
   * 匹配物料图片
   */
  matchPictureList: string[];
  /**
   * 销售价格(辅料)
   */
  matchSalePrice?: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName?: string;
  /**
   * 包装数量(辅料)
   */
  packNumber?: string;
  /**
   * 辅料主单位(对应履约-包装计价单位名称)  ---211208-v1.1
   */
  packUnitName?: string;
  /**
   * 辅料副单位(对应履约-包装计价副单位名称)  ---211208-v1.1
   */
  packAssistantUnitName?: string;
  /**
   * 辅料最小价格  ---211208-v1.1
   */
  minPrice?: string;
  /**
   * 辅料最小单位  ---211208-v1.1
   */
  minPriceUnit?: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs?: string;
  /**
   * 幅宽; 格式如: '120-130CM'或'125±5CM'  --v5.11
   */
  widthStrFormat?: string;
  /**
   * 销售单位
   */
  saleUnit?: string;
  /**
   * 克重; 格式如: '120-130g'或'120±5g'  --v5.11
   *
   * 需求:
   *  未迁移到中台的商品，字符串形式为如“120-130g”这样的格式；
   *  如果是迁移到中台的商品，字符串形式为如“120±5g”这样的格式；
   */
  weightStrFormat?: string;
  /**
   * 色系(面料)
   */
  colorName?: string;
  /**
   * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号(面料)
   */
  colorType?: string;
  /**
   * 齐料仓信息
   */
  warehouseColorInfo?: ICheckPriceDetailResMaterialCostInfoListItemWarehouseColorInfo;
  /**
   * 色号(面料)
   */
  colorNumber?: string;
  /**
   * 剪版销价(面料)
   */
  matchSampleGuidePrice?: string;
  /**
   * 剪版销价单位(面料)
   */
  matchSampleUnit?: string;
  /**
   * 大货销价(面料)
   */
  matchGuidePrice?: string;
  /**
   * 大货销价单位(面料)
   */
  matchCostPriceUnit?: string;
  /**
   * 销售空差(面料)    ---设计打版2.1-0615
   */
  matchPurchaseGap?: string;
  /**
   * 足米价(面料)  --211208-v1.1
   */
  meterPrice?: string;
  /**
   * 足米价单位(面料)   ---211208-v1.1
   */
  meterPriceUnit?: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource?: string;
  /**
   * 回复人员
   */
  matcherName?: string;
  /**
   * 匹配反馈备注
   */
  matchRemark?: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason?: string;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPictureList: string[];
  /**
   * 色卡图片: 设计师上传的色卡图片(采购申请专用的)
   */
  purchaseColorCardPictureList: string[];
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm?: string;
  /**
   * bom物料排序
   */
  sort?: string;
  /**
   * 用量核算-幅宽确认值 ---1222-v1.2
   */
  widthConfirm?: string;
  /**
   * 供应商ID  ---0923-推款优化v0.1
   */
  supplierId?: string;
  /**
   * 供应商编号  ---0923-推款优化v0.1
   */
  supplierCode?: string;
  /**
   * 供应商名称  ---0923-推款优化v0.1
   */
  supplierName?: string;
  /**
   * 开票状态(合作关系)-对应OPS字典invoice_dict的编码值  ---0923-推款优化v0.1
   */
  invoiceState?: string;
  /**
   * 履约面辅料价格回复时间 ---1018-优化v3.3
   */
  priceReplyTime?: number;
  /**
   * 履约面辅料价格失效时间 ---1018-优化v3.3
   */
  priceInvalidTime?: number;
  /**
   * 商品进货价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  purchasePrice?: string;
  /**
   * 商品销售价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  skuPrice?: string;
  /**
   * 特殊辅料标识ID，用于区分上下版本关系   commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  accessoriesFlagId?: string;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList: ICheckPriceDetailResMaterialCostInfoListItemCraftDemandInfoListItem[];
  /**
   * 采购次数
   */
  purchaseApplyFollowCount?: string;
  /**
   * 用量核算单位    ---设计打版2.1-0615
   */
  dosageAccountUnit?: string;
  /**
   * 损耗率   ---设计打版2.1-0615
   */
  attritionRate?: string;
  /**
   * 大货进价 单位元   ---设计打版2.1-0615
   *  面料: 足米价; 辅料: 最小价格;
   */
  bulkPurchasePrice?: string;
  /**
   * 大货进价单位，指 米 或 千克  ---设计打版2.1-0615
   *  面料: 足米价单位; 辅料: 最小价格单位;
   */
  bulkPurchasePriceUnit?: string;
  /**
   * 物料快照id  ---自选物料0.1
   */
  materialSnapshotId?: string;
  /**
   * bom物料上下文ID，用于关联上下版本关系    ---自选物料0.1
   */
  materialContextId?: string;
  /**
   * 是否无工艺 1-是  0-否
   */
  isNoCraft?: string;
  /**
   * 好料网-是否启用：{0-否 ,1-是}
   */
  enableState?: string;
  /**
   * 好料网-上架状态：{0-否 ,1-是}
   */
  onShelfState?: string;
  /**
   * 供应链物料是否存在: 0-不存在; 1-存在; -- 3.20.2 (该字段用于bom引用的场景)
   */
  supplyExistState?: string;
  /**
   * bom物料ID(复制, 前端处理引用物料使用)
   */
  bomMaterialIdCopy?: string;
  /**
   * 辅料类型code【字典 pims_accessory_material_type】 ---自选物料0.1
   */
  materialTypeCode?: string;
  /**
   * 辅料类型name     ---自选物料0.1
   */
  materialType?: string;
  /**
   * bom物料需求id --v3.11
   */
  bomMaterialDemandId?: string;
  /**
   * 对色/包料状态: 0-无; 1-对色; 2-包料; (默认0) --v3.11
   */
  colorMatchMaterialState?: string;
  /**
   * 对色/包料对应物料名 --v3.11
   */
  colorMatchMaterialName?: string;
  /**
   * 对色/包料对应物料id --v3.11
   */
  colorMatchMaterialId?: string;
  /**
   * 物料状态:100-正常; 190-已关闭; 200-找料中 --v3.11
   */
  materialState?: string;
  /**
   * 被替换的bom物料id --v3.11
   */
  replaceBomMaterialId?: string;
  /**
   * 样衣采购周期,单位默认天  -- v3.20.3
   */
  samplePurchasingCycle?: string;
  /**
   * 样衣采购周期单位,单位默认天  -- v3.20.3
   */
  samplePurchasingCycleUnit?: string;
  /**
   * 大货采购周期,单位默认天  -- v3.20.3
   */
  bulkPurchasingCycle?: string;
  /**
   * 大货采购周期单位,单位默认天  -- v3.20.3
   */
  bulkPurchasingCycleUnit?: string;
  /**
   * 是否为企划料   -- v4.19.1
   * 1：是
   * 0：否
   * null：否
   */
  isPlanning?: string;
  /**
   * 波段时间   -- v4.19.1
   */
  bandDate?: number;
  /**
   * JV 面料识别物料id
   */
  identifyMaterialId?: string;
  /**
   * 商品编码 - 混淆加密
   * - 对接淘系
   */
  encryptionCommodityCode?: string;
  /**
   * skuCode - 混淆加密
   *  - 对接淘系
   */
  encryptionSkuCode?: string;
  /**
   * 品名 - 混淆加密
   *  - 对接淘系
   */
  encryptionCommodityName?: string;
  /**
   * 识别选中
   *  - 对接淘系
   */
  identifySelection?: boolean;
  /**
   * 物料图,多值以逗号隔开
   *  - 对接淘系
   */
  materialImg?: string;
  /**
   * 损耗
   */
  waste?: string;
  /**
   * 单价
   */
  price?: string;
  /**
   * 大货进价
   */
  bulkPrice?: string;
  /**
   * 上一版本大货进价
   */
  lastBulkPrice?: string;
  /**
   * 价格单位
   */
  unit?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 上一版本用量核算
   */
  lastDosageAccount?: string;
  /**
   * 类目code(分类以"-"隔开)（如：ACCESSORIES-21-211）
   */
  demandCategoryCode?: string;
  /**
   * 类目名(分类以"-"隔开)（如：辅料-扣件-对勾（勾扣））
   */
  demandCategoryName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 价格更新时间
   */
  priceRevisedTime?: number;
  /**
   * 价格有效期时间开始
   */
  validityStartTime?: number;
  /**
   * 价格有效期时间结束
   */
  validityEndTime?: number;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单损耗
   */
  smallOrderWaste?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  lastSmallOrderSumOfMoney?: string;
  /**
   * 散剪价
   */
  cutPriceInfo?: string;
  /**
    * 上一版本散剪价
    */
  lastCutPriceInfo?: string;
}

export interface ICheckPriceDetailResMaterialCostInfoListItemCraftDemandInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom详情ID
   */
  bomMaterialId?: string;
  /**
   * 工艺状态 100:已提交 190:已关闭
   */
  state?: '100' | '190' | '9999';
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory?: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
}

export interface ICheckPriceDetailResMaterialCostInfoListItemWarehouseColorInfo {
  /**
   * sku信息的id
   */
  skuId?: string;
  /**
   * 色号
   */
  colorNumber?: string;
  /**
   * sku编号
   */
  skuCode?: string;
  /**
   * 可用数量 实际-冻结-已出
   */
  remainingQuantity?: string;
  /**
   * sku颜色描述
   */
  colorNumberDesc?: string;
  /**
   * sku色系
   */
  colorSystem?: string;
  /**
   * 所在仓库
   */
  warehouseName?: string;
  /**
   * 所属区域
   */
  belongArea?: '';
  /**
   * 供应商所属区域
   */
  supplierRegion?: string;
  /**
   * 仓库区域ID
   */
  regionId?: string;
}

export interface ICheckPriceDetailResMaterialCostInfoListItemMaterialRemarkListItem {
  /**
   * 备注ID
   */
  designRemarksId?: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 暂存状态: 0:非暂存; 1,暂存; (默认0)
   */
  transientState?: string;
  /**
   * 操作人id
   */
  creatorId?: string;
  /**
   * 操作人名称
   */
  createdName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
}

export interface ICheckPriceDetailResOtherCostInfoListItem {
  processStepCode?: string;
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
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
}

export interface ICheckPriceDetailResCraftDemandCostInfoListItem {
  unit: string;
  price: string;
  /**
   * 工艺需求主键id
   */
  craftDemandId: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom详情ID
   */
  bomMaterialId?: string;
  /**
   * 工艺状态 100:已提交 190:已关闭
   */
  state?: '100' | '190' | '9999';
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory?: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
  /**
   * 需求匹配单id
   */
  matchId?: string;
  /**
   * 单件用量
   */
  singleDosage?: string;
  /**
   * 损耗（单位%）
   */
  waste?: string;
  /**
   * 上一版大货工艺进货价
   */
  lastBulkPrice?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 二次工艺次序编号
   */
  craftsProcessCode?: string;
  /**
   * 二次工艺次序名称
   */
  craftsProcessName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 工艺用量核算
   */
  craftDosageAccount?: string;
  /**
   * 工艺用量核算单位
   */
  craftDosageAccountUnit?: string;
  /**
   * 上一版本的用量核算
   */
  lastCraftDosageAccount?: string;
  /**
   * 设计款物料项目名（关联物料）
   */
  prototypeMaterialName?: string;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
}
/**
 * 询价
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2800
 */
export interface ICheckPriceInquiryPriceReq {
  /**
   * 核价表ID
   */
  checkPriceId: string;
  /**
   * bomId
   */
  bomId: string;
  /**
   * 物料费用明细
   */
  bomMaterialIdList: string[];
  /**
   * 二次工艺费用明细
   */
  craftDemandIdList: string[];
  /**
   * 核价类型：0:预估核价|1：款式核价
   */
  checkType: string;
}

/**
 * 核价完成
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2799
 */
export interface ICheckPriceSaveReq {
  /**
   * 工序费用
   */
  processCostInfoList: ICheckPriceSaveReqProcessCostInfoListItem[];
  /**
   * 物料费用明细
   */
  materialCostInfoList: ICheckPriceSaveReqMaterialCostInfoListItem[];
  /**
   * 二次工艺费用明细
   */
  craftDemandCostInfoList: ICheckPriceSaveReqCraftDemandCostInfoListItem[];
  /**
   * 其他费用明细
   */
  otherCostInfoList: ICheckPriceSaveReqOtherCostInfoListItem[];
  /**
   * 其他费用（元）
   */
  otherCost?: string;
  /**
   * 物料总价（元）
   */
  materialCost?: string;
  /**
   * 加工总价（元）
   */
  processCost?: string;
  /**
   * 二次工艺总价（元）
   */
  craftDemandCost?: string;
  /**
   * 总价不加成（元）
   */
  totalCost: string;
  /**
   * 利润点（%）（小数点两位） 毛利率
   */
  profit: string;
  /**
   * 加成点
   */
  taxationRatio: string;
  /**
   * 总加加成
   */
  totalCostExt: string;
  /**
   * 总成本（不算损耗）
   */
  pureTotalCost: string;
  /**
   * 利润(成本)
   */
  profitCost: string;
  /**
   * 加成费用
   */
  taxationCost: string;
  /**
   * 小单总成本
   */
  smallOrderPureTotalCost: string;
  /**
   * 小单总价不加成
   */
  smallOrderTotalCost: string;
  /**
   * 小单总价加成
   */
  smallOrderTotalCostExt: string;
  /**
   * 发单倍率
   */
  orderSendingRate: string;
  /**
   * 小单物料总价
   */
  smallOrderMaterialCost: string;
  /**
   * 工艺总价
   */
  craftSamllOrderCost: string;
  /**
   * 小单工序总价
   */
  smallOrderProcessCost: string;
  /**
   * 小单二次工艺成本价(元)
   */
  smallOrderCraftDemandCost: string;
  /**
   * 小单其他费用
   */
  smallOrderOtherCost: string;
  /**
   * 小单面料费用
   */
  smallOrderFabricsCost: string;
  /**
   * 小单辅料费用
   */
  smallOrderAccessoriesCost: string;
  /**
   * 面料费用
   */
  fabricsCost: string;
  /**
   * 辅料费用
   */
  accessoriesCost: string;
  /**
   * 车缝费用
   */
  sewingCost: string;
  /**
   * 裁剪费用
   */
  cuttingCost: string;
  /**
   * 后道费用
   */
  postProcessingCost: string;
  /**
   * 专机/手工费用‌
   */
  specialCost: string;
  /**
   * 核价表ID
   */
  checkPriceId: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * bomId
   */
  bomId: string;
  /**
   * 是否点过编辑按钮
   */
  editProcessOther?: boolean;
}

export interface ICheckPriceSaveReqMaterialCostInfoListItem {
  /**
   * bom物料ID
   */
  bomMaterialId?: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom物料类型: 1-面料; 2-辅料
   */
  bomMaterialType?: string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName?: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 使用部位,字典值 多值以逗号隔开 ---自选物料0.1
   */
  partUseName?: string;
  /**
   * 裁剪方式code
   */
  cuttingMethod?: string;
  /**
   * 裁剪方式名  ---自选物料0.1
   */
  cuttingMethodName?: string;
  /**
   * 用量核算
   */
  dosageAccount?: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: ICheckPriceSaveReqMaterialCostInfoListItemMaterialRemarkListItem[];
  /**
   * 需求单id
   * 「已废弃」
   */
  demandId?: string;
  /**
   * 需求单编号
   * 「已废弃」
   */
  demandCode?: string;
  /**
   * 需求序号
   * 「已废弃」
   */
  demandTag?: string;
  /**
   * 辅料关联的面料tag
   * 「已废弃」
   */
  fabricDemandTag?: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料; 4:辅料找料 ---V.3.11(添加4类型)
   */
  demandType?: '1' | '2' | '3' | '4';
  /**
   * 需求匹配单id
   * 「已废弃」
   */
  matchId?: string;
  /**
   * 需求匹配单编码
   * 「已废弃」
   */
  matchCode?: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES   ---0421-V.1.8.4
   */
  commodityType?: string;
  /**
   * 商品名称(品名)  ---面料-净色、辅料、特殊辅料
   */
  commodityName?: string;
  /**
   * 花型品类
   */
  flowerCategory?: string;
  /**
   * 商品id
   */
  commodityId?: string;
  /**
   * 商品编码
   */
  commodityCode?: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber?: string;
  /**
   * 类目code(分类以"[-]"隔开)（如：ACCESSORIES[-]21[-]211）
   */
  categoryCode?: string;
  /**
   * 类目名(分类以"[-]"隔开)（如：辅料[-]扣件[-]对勾（勾扣））
   */
  categoryName?: string;
  /**
   * skuId
   */
  skuId?: string;
  /**
   * SKU编码
   */
  skuCode?: string;
  /**
   * 成分; json, 会有多种成分比例(面料)
   */
  material?: string;
  /**
   * 匹配物料图片
   */
  matchPictureList: string[];
  /**
   * 销售价格(辅料)
   */
  matchSalePrice?: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName?: string;
  /**
   * 包装数量(辅料)
   */
  packNumber?: string;
  /**
   * 辅料主单位(对应履约-包装计价单位名称)  ---211208-v1.1
   */
  packUnitName?: string;
  /**
   * 辅料副单位(对应履约-包装计价副单位名称)  ---211208-v1.1
   */
  packAssistantUnitName?: string;
  /**
   * 辅料最小价格  ---211208-v1.1
   */
  minPrice?: string;
  /**
   * 辅料最小单位  ---211208-v1.1
   */
  minPriceUnit?: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs?: string;
  /**
   * 幅宽; 格式如: '120-130CM'或'125±5CM'  --v5.11
   */
  widthStrFormat?: string;
  /**
   * 销售单位
   */
  saleUnit?: string;
  /**
   * 克重; 格式如: '120-130g'或'120±5g'  --v5.11
   *
   * 需求:
   *  未迁移到中台的商品，字符串形式为如“120-130g”这样的格式；
   *  如果是迁移到中台的商品，字符串形式为如“120±5g”这样的格式；
   */
  weightStrFormat?: string;
  /**
   * 色系(面料)
   */
  colorName?: string;
  /**
   * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号(面料)
   */
  colorType?: string;
  /**
   * 齐料仓信息
   */
  warehouseColorInfo?: ICheckPriceSaveReqMaterialCostInfoListItemWarehouseColorInfo;
  /**
   * 色号(面料)
   */
  colorNumber?: string;
  /**
   * 剪版销价(面料)
   */
  matchSampleGuidePrice?: string;
  /**
   * 剪版销价单位(面料)
   */
  matchSampleUnit?: string;
  /**
   * 大货销价(面料)
   */
  matchGuidePrice?: string;
  /**
   * 大货销价单位(面料)
   */
  matchCostPriceUnit?: string;
  /**
   * 销售空差(面料)    ---设计打版2.1-0615
   */
  matchPurchaseGap?: string;
  /**
   * 足米价(面料)  --211208-v1.1
   */
  meterPrice?: string;
  /**
   * 足米价单位(面料)   ---211208-v1.1
   */
  meterPriceUnit?: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource?: string;
  /**
   * 回复人员
   */
  matcherName?: string;
  /**
   * 匹配反馈备注
   */
  matchRemark?: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason?: string;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPictureList: string[];
  /**
   * 色卡图片: 设计师上传的色卡图片(采购申请专用的)
   */
  purchaseColorCardPictureList: string[];
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm?: string;
  /**
   * bom物料排序
   */
  sort?: string;
  /**
   * 用量核算-幅宽确认值 ---1222-v1.2
   */
  widthConfirm?: string;
  /**
   * 供应商ID  ---0923-推款优化v0.1
   */
  supplierId?: string;
  /**
   * 供应商编号  ---0923-推款优化v0.1
   */
  supplierCode?: string;
  /**
   * 供应商名称  ---0923-推款优化v0.1
   */
  supplierName?: string;
  /**
   * 开票状态(合作关系)-对应OPS字典invoice_dict的编码值  ---0923-推款优化v0.1
   */
  invoiceState?: string;
  /**
   * 履约面辅料价格回复时间 ---1018-优化v3.3
   */
  priceReplyTime?: string;
  /**
   * 履约面辅料价格失效时间 ---1018-优化v3.3
   */
  priceInvalidTime?: string;
  /**
   * 商品进货价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  purchasePrice?: string;
  /**
   * 商品销售价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  skuPrice?: string;
  /**
   * 特殊辅料标识ID，用于区分上下版本关系   commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  accessoriesFlagId?: string;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList: ICheckPriceSaveReqMaterialCostInfoListItemCraftDemandInfoListItem[];
  /**
   * 采购次数
   */
  purchaseApplyFollowCount?: string;
  /**
   * 用量核算单位    ---设计打版2.1-0615
   */
  dosageAccountUnit?: string;
  /**
   * 损耗率   ---设计打版2.1-0615
   */
  attritionRate?: string;
  /**
   * 大货进价 单位元   ---设计打版2.1-0615
   *  面料: 足米价; 辅料: 最小价格;
   */
  bulkPurchasePrice?: string;
  /**
   * 大货进价单位，指 米 或 千克  ---设计打版2.1-0615
   *  面料: 足米价单位; 辅料: 最小价格单位;
   */
  bulkPurchasePriceUnit?: string;
  /**
   * 物料快照id  ---自选物料0.1
   */
  materialSnapshotId?: string;
  /**
   * bom物料上下文ID，用于关联上下版本关系    ---自选物料0.1
   */
  materialContextId?: string;
  /**
   * 是否无工艺 1-是  0-否
   */
  isNoCraft?: string;
  /**
   * 好料网-是否启用：{0-否 ,1-是}
   */
  enableState?: string;
  /**
   * 好料网-上架状态：{0-否 ,1-是}
   */
  onShelfState?: string;
  /**
   * 供应链物料是否存在: 0-不存在; 1-存在; -- 3.20.2 (该字段用于bom引用的场景)
   */
  supplyExistState?: string;
  /**
   * bom物料ID(复制, 前端处理引用物料使用)
   */
  bomMaterialIdCopy?: string;
  /**
   * 辅料类型code【字典 pims_accessory_material_type】 ---自选物料0.1
   */
  materialTypeCode?: string;
  /**
   * 辅料类型name     ---自选物料0.1
   */
  materialType?: string;
  /**
   * bom物料需求id --v3.11
   */
  bomMaterialDemandId?: string;
  /**
   * 对色/包料状态: 0-无; 1-对色; 2-包料; (默认0) --v3.11
   */
  colorMatchMaterialState?: string;
  /**
   * 对色/包料对应物料名 --v3.11
   */
  colorMatchMaterialName?: string;
  /**
   * 对色/包料对应物料id --v3.11
   */
  colorMatchMaterialId?: string;
  /**
   * 物料状态:100-正常; 190-已关闭; 200-找料中 --v3.11
   */
  materialState?: string;
  /**
   * 被替换的bom物料id --v3.11
   */
  replaceBomMaterialId?: string;
  /**
   * 样衣采购周期,单位默认天  -- v3.20.3
   */
  samplePurchasingCycle?: string;
  /**
   * 样衣采购周期单位,单位默认天  -- v3.20.3
   */
  samplePurchasingCycleUnit?: string;
  /**
   * 大货采购周期,单位默认天  -- v3.20.3
   */
  bulkPurchasingCycle?: string;
  /**
   * 大货采购周期单位,单位默认天  -- v3.20.3
   */
  bulkPurchasingCycleUnit?: string;
  /**
   * 是否为企划料   -- v4.19.1
   * 1：是
   * 0：否
   * null：否
   */
  isPlanning?: string;
  /**
   * 波段时间   -- v4.19.1
   */
  bandDate?: string;
  /**
   * JV 面料识别物料id
   */
  identifyMaterialId?: string;
  /**
   * 商品编码 - 混淆加密
   * - 对接淘系
   */
  encryptionCommodityCode?: string;
  /**
   * skuCode - 混淆加密
   *  - 对接淘系
   */
  encryptionSkuCode?: string;
  /**
   * 品名 - 混淆加密
   *  - 对接淘系
   */
  encryptionCommodityName?: string;
  /**
   * 识别选中
   *  - 对接淘系
   */
  identifySelection?: boolean;
  /**
   * 物料图,多值以逗号隔开
   *  - 对接淘系
   */
  materialImg?: string;
  /**
   * 损耗
   */
  waste?: string;
  /**
   * 单价
   */
  price?: string;
  /**
   * 大货进价
   */
  bulkPrice?: string;
  /**
   * 上一版本大货进价
   */
  lastBulkPrice?: string;
  /**
   * 价格单位
   */
  unit?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 上一版本用量核算
   */
  lastDosageAccount?: string;
  /**
   * 类目code(分类以"-"隔开)（如：ACCESSORIES-21-211）
   */
  demandCategoryCode?: string;
  /**
   * 类目名(分类以"-"隔开)（如：辅料-扣件-对勾（勾扣））
   */
  demandCategoryName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 价格更新时间
   */
  priceRevisedTime?: string;
  /**
   * 价格有效期时间开始
   */
  validityStartTime?: string;
  /**
   * 价格有效期时间结束
   */
  validityEndTime?: string;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单损耗
   */
  smallOrderWaste?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  lastSmallOrderSumOfMoney?: string;
  /**
   * 散剪价
   */
  cutPriceInfo?: string;
  /**
    * 上一版本散剪价
    */
  lastCutPriceInfo?: string;
}

export interface ICheckPriceSaveReqMaterialCostInfoListItemCraftDemandInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom详情ID
   */
  bomMaterialId?: string;
  /**
   * 工艺状态 100:已提交 190:已关闭
   */
  state?: '100' | '190' | '9999';
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory?: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
}

export interface ICheckPriceSaveReqMaterialCostInfoListItemWarehouseColorInfo {
  /**
   * sku信息的id
   */
  skuId?: string;
  /**
   * 色号
   */
  colorNumber?: string;
  /**
   * sku编号
   */
  skuCode?: string;
  /**
   * 可用数量 实际-冻结-已出
   */
  remainingQuantity?: string;
  /**
   * sku颜色描述
   */
  colorNumberDesc?: string;
  /**
   * sku色系
   */
  colorSystem?: string;
  /**
   * 所在仓库
   */
  warehouseName?: string;
  /**
   * 所属区域
   */
  belongArea?: string;
  /**
   * 供应商所属区域
   */
  supplierRegion?: string;
  /**
   * 仓库区域ID
   */
  regionId?: string;
}

export interface ICheckPriceSaveReqMaterialCostInfoListItemMaterialRemarkListItem {
  /**
   * 备注ID
   */
  designRemarksId?: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 暂存状态: 0:非暂存; 1,暂存; (默认0)
   */
  transientState?: string;
  /**
   * 操作人id
   */
  creatorId?: string;
  /**
   * 操作人名称
   */
  createdName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}

export interface ICheckPriceSaveReqProcessCostInfoListItem {
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
  processSewingInfos: ICheckPriceSaveReqProcessCostInfoListItemProcessSewingInfosItem[];
  /**
   * 小单倍率
   */
  smallOrderRate: string;
  /**
   * 发单倍率
   */
  orderSendingRate: string;
}

export interface ICheckPriceSaveReqProcessCostInfoListItemProcessSewingInfosItem {
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

export interface ICheckPriceSaveReqOtherCostInfoListItem {
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
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
}

export interface ICheckPriceSaveReqCraftDemandCostInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom详情ID
   */
  bomMaterialId?: string;
  /**
   * 工艺状态 100:已提交 190:已关闭
   */
  state?: '100' | '190' | '9999';
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory?: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
  /**
   * 需求匹配单id
   */
  matchId?: string;
  /**
   * 单件用量
   */
  singleDosage?: string;
  /**
   * 损耗（单位%）
   */
  waste?: string;
  /**
   * 上一版大货工艺进货价
   */
  lastBulkPrice?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 二次工艺次序编号
   */
  craftsProcessCode?: string;
  /**
   * 二次工艺次序名称
   */
  craftsProcessName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 工艺用量核算
   */
  craftDosageAccount?: string;
  /**
   * 工艺用量核算单位
   */
  craftDosageAccountUnit?: string;
  /**
   * 上一版本的用量核算
   */
  lastCraftDosageAccount?: string;
  /**
   * 设计款物料项目名（关联物料）
   */
  prototypeMaterialName?: string;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
  /**
   * 散剪价
   */
  cutPriceInfo?: string;
  /**
    * 上一版本散剪价
    */
  lastCutPriceInfo?: string;
}

/**
 * 导出报价单
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/4014
 */
export interface ICheckPriceExportBillReq {
  checkPriceId: string;
}

/**
 * 加工其他费用暂存 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/5302
 */
export interface ICheckPriceSaveTemporarilyReq {
  /**
   * 核价加工其他表ID
   */
  processOtherId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 状态 100暂存 110提交
   */
  state: string;
  /**
   * 加工总价
   */
  processCost?: string;
  /**
   * 小单工序总价
   */
  smallOrderProcessCost?: string;
  /**
   * 其他费用
   */
  otherCost?: string;
  /**
   * 小单其他费用
   */
  smallOrderOtherCost?: string;
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
   * 工序费用
   */
  processCostInfoList: ICheckPriceSaveTemporarilyReqProcessCostInfoListItem[];
  /**
   * 其他费用明细
   */
  otherCostInfoList: ICheckPriceSaveTemporarilyReqOtherCostInfoListItem[];
}

export interface ICheckPriceSaveTemporarilyReqProcessCostInfoListItem {
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
  processSewingInfos: ICheckPriceSaveTemporarilyReqProcessCostInfoListItemProcessSewingInfosItem[];
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 发单倍率
   */
  orderSendingRate?: string;
}

export interface ICheckPriceSaveTemporarilyReqProcessCostInfoListItemProcessSewingInfosItem {
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

export interface ICheckPriceSaveTemporarilyReqOtherCostInfoListItem {
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

// 加工其他费用暂存 ⬆️

/**
 * 通过SPU查询加工其他费用 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/5314
 */
export interface ICheckPriceGetProcessOtherByStyleCodeReq {
  styleCode: string;
}

export interface ICheckPriceGetProcessOtherByStyleCodeRes {
  /**
   * 核价加工其他表ID
   */
  processOtherId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 状态 100暂存 110提交
   */
  state?: string;
  /**
   * 工序环节明细
   */
  processCostInfo?: string;
  /**
   * 加工总价
   */
  processCost?: string;
  /**
   * 小单工序总价
   */
  smallOrderProcessCost?: string;
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
   * 其他费用明细
   */
  otherCostInfoList: ICheckPriceGetProcessOtherByStyleCodeResOtherCostInfoListItem[];
  /**
   * 加工费用
   */
  processCostInfoList: ICheckPriceGetProcessOtherByStyleCodeResProcessCostInfoListItem[];
}

export interface ICheckPriceGetProcessOtherByStyleCodeResProcessCostInfoListItem {
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
  processSewingInfos: ICheckPriceGetProcessOtherByStyleCodeResProcessCostInfoListItemProcessSewingInfosItem[];
  /**
   * 小单倍率
   */
  smallOrderRate: string;
  /**
   * 发单倍率
   */
  orderSendingRate: string;
}

export interface ICheckPriceGetProcessOtherByStyleCodeResProcessCostInfoListItemProcessSewingInfosItem {
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

export interface ICheckPriceGetProcessOtherByStyleCodeResOtherCostInfoListItem {
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

// 通过SPU查询加工其他费用 ⬆️

/**
 * 下载原纸样
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/5394
 */
export interface ICheckPricePatternDownloadReq {
  /**
   * spu
   */
  styleCode: string;
  designCode: string;
}

export type ICheckPricePatternDownloadRes = ICheckPricePatternDownloadResItem[];
export interface ICheckPricePatternDownloadResItem {
  /**
   * 纸样任务id
   */
  patternId?: string;
  /**
   * 版单id
   */
  clothesId?: string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
  /**
   * 纸样文件名字
   */
  patternName?: string;
  /**
   * 纸样文件版本
   */
  patternVersion?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 款式编号styleCode
   */
  styleCode?: string;
}

/**
 * 查询所有的版本 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/5402
 */
export interface ICheckPriceGetVersionsReq {
  designCode: string;
}

export type ICheckPriceGetVersionsRes = ICheckPriceGetVersionsResItem[];
export interface ICheckPriceGetVersionsResItem {
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
}

// 查询所有的版本 ⬆️
