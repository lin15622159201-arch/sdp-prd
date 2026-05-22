import type { REGION_ENUM } from '@/constant-transfer';
import { CHECK_PRICE_STATE_ENUM } from '../../constant';

export interface IV1ProdBomPriceRegionFactoryVoListItem {
  checkPriceRegionFactoryId?: string;
  checkPriceId: string;
  affiliatedRegionId: string;
  affiliatedRegionName: string;
  orderRegionId: string;
  orderRegionName: string;
  orderUrbanId: string;
  orderUrbanName: string;
  productionPattern: string;
  productionPatternName: string;
  truckSpaceAmount: string;
  managementRatio: string;
  minuteSalaryRatio: string;
  priceIncludeTax: string;
  subsidyPrice: string;
  priceIncludeSubsidy: string;
}
export interface IV1ProdBomMaterialCostInfoListItem {
  bomMaterialId?: string;
  waste: string;
  price: string;
  bulkPrice: string;
  unit: string;
  sumOfMoney: string;
  demandCategoryCode: string;
  demandCategoryName: string;
  fabricShrinkage: string;
  inquiryState: string;
  quotedPrice: string;
  quotedUnit: string;
  bomId: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  trackResultId: string;
  prototypeMaterialName: string;
  partUse: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  singleDosage: string;
  cuttingMethod: string;
  dosageAccount: string;
  materialRemarkList: IV1ProdBomMaterialRemarkListItem[];
  /**
   * 「已废弃」
   * 「已废弃」
   */
  bingPurchaseState: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandId: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandCode: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandTag: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  fabricDemandTag: string;
  demandType: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchId: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchCode: string;
  commodityType: string;
  commodityName: string;
  commodityId: string;
  commodityCode: string;
  commodityNumber: string;
  categoryCode: string;
  categoryName: string;
  skuId: string;
  skuCode: string;
  material: string;
  matchPictureList: string[];
  matchSalePrice: string;
  matchPurchaseUnitName: string;
  packNumber: string;
  packNumberUnit: string;
  packUnitName: string;
  packAssistantUnitName: string;
  minPrice: string;
  minPriceUnit: string;
  skuAttrs: string;
  widthLow: string;
  widthHigh: string;
  widthUnit: string;
  saleUnit: string;
  weightLow: string;
  weightHigh: string;
  weightUnit: string;
  colorName: string;
  colorType: string;
  warehouseColorInfo: IV1ProdBomWarehouseColorInfo;
  colorNumber: string;
  matchSampleGuidePrice: string;
  matchSampleUnit: string;
  matchGuidePrice: string;
  matchCostPriceUnit: string;
  matchPurchaseGap: string;
  meterPrice: string;
  meterPriceUnit: string;
  matchSource: string;
  matcherName: string;
  matchRemark: string;
  unfinishedReason: string;
  colorCardPictureList: string[];
  purchaseColorCardPictureList: string[];
  isConfirm: string;
  sort: string;
  widthConfirm: string;
  supplierId: string;
  supplierCode: string;
  supplierName: string;
  purchasePrice: string;
  skuPrice: string;
  accessoriesFlagId: string;
  craftDemandInfoList: IV1ProdBomCraftDemandInfoListItem[];
  purchaseApplyFollowCount: string;
  dosageAccountUnit: string;
  attritionRate: string;
  bulkPurchasePrice: string;
  bulkPurchasePriceUnit: string;
  materialSnapshotId: string;
  materialContextId: string;
  matchColorSkuAttr: string;
}
export interface IV1ProdBomMaterialRemarkListItem {
  designRemarksId?: string;
  remark: string;
  creatorId: string;
  createdName: string;
  createdTime: string;
}
export interface IV1ProdBomWarehouseColorInfo {
  skuId?: string;
  colorNumber: string;
  skuCode: string;
  remainingQuantity: string;
  colorNumberDesc: string;
  colorSystem: string;
  warehouseName: string;
  belongArea: 'NATIONWIDE' | 'GUANGZHOU' | 'HANGZHOU';
  supplierRegion: string;
  regionId: string;
}
export interface IV1ProdBomCraftDemandInfoListItem {
  craftDemandId?: string;
  designCode: string;
  bomId: string;
  bomMaterialId: string;
  state: string;
  category1: string;
  category2: string;
  category3: string;
  craftsRequire: string;
  undertakeType: string;
  customerSupplyFactory: string;
  innerFactoryId: string;
  factoryName: string;
  contactName: string;
  contactPhone: string;
  contactProvince: string;
  contactCity: string;
  contactRegion: string;
  contactDetailAddress: string;
  pictureList: string[];
  positionRequirement: string;
  sizeRequirement: string;
  colorRequirement: string;
  weightRequirement: string;
  otherRequirement: string;
  relationDemandId: string;
  thirdPartyCraftDemandId: string;
  thirdPartyCraftDemandCode: string;
  sampleUnit: string;
  samplePrice: string;
  bulkUnit: string;
  bulkPrice: string;
  creatorId: string;
  createdTime: string;
  creatorName: string;
  materialDemandId: string;
  prototypeId: string;
}
export interface IV1ProdBomCraftDemandCostInfoListItem {
  craftDemandId?: string;
  matchId: string;
  singleDosage: string;
  waste: string;
  bulkPrice: string;
  sumOfMoney: string;
  craftsProcessCode: string;
  craftsProcessName: string;
  inquiryState: string;
  quotedPrice: string;
  quotedUnit: string;
  designCode: string;
  bomId: string;
  bomMaterialId: string;
  state: string;
  category1: string;
  category2: string;
  category3: string;
  craftsRequire: string;
  undertakeType: string;
  customerSupplyFactory: string;
  innerFactoryId: string;
  factoryName: string;
  contactName: string;
  contactPhone: string;
  contactProvince: string;
  contactCity: string;
  contactRegion: string;
  contactDetailAddress: string;
  pictureList: string[];
  positionRequirement: string;
  sizeRequirement: string;
  colorRequirement: string;
  weightRequirement: string;
  otherRequirement: string;
  relationDemandId: string;
  thirdPartyCraftDemandId: string;
  thirdPartyCraftDemandCode: string;
  sampleUnit: string;
  samplePrice: string;
  bulkUnit: string;
  creatorId: string;
  createdTime: string;
  creatorName: string;
  materialDemandId: string;
  prototypeId: string;
}
export interface IV1ProdBomOtherCostInfoListItem {
  costName?: string;
  supplierName: string;
  phone: string;
  num: string;
  price: string;
  unit: string;
  remarks: string;
}
export interface IV1ProdBomProcessCostInfoListItem {
  processStepName: string;
  processStepCode: string;
  processName: string;
  perPieceAmount: string;
  price: string;
  workingHour: string;
  remarks: string;
  unit: string;
  sewingType: string;
  sewingTypeDesc: string;
  minutelyPay: string;
}
/**
 * bom详情
 */
export interface IV1ProdBomBomOrderDetailVo {
  bomId?: string;
  bomCode: string;
  versionNum: string;
  fakeId: string;
  prototypeId: string;
  designCode: string;
  materialTrackVersionId: string;
  materialTrackCode: string;
  plateMakingNum: string;
  state: 'WAIT_SUBMIT' | 'SUBMITTED' | 'CALCULATED' | 'CLOSED' | 'UNKNOWN';
  submitTime: string;
  creatorId: string;
  createdTime: string;
  creatorName: string;
  bomOrderMaterialList: IV1ProdBomBomOrderMaterialListItem[];
  isSplicing: boolean;
  styleCode: string;
  regionId: string;
  regionName: string;
  designerId: string;
  designerCode: string;
  designerName: string;
  designerGroup: string;
}
export interface IV1ProdBomBomOrderMaterialListItem {
  bomMaterialId?: string;
  bomId: string;
  positionRequirement?: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  trackResultId: string;
  prototypeMaterialName: string;
  partUse: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  singleDosage: string;
  cuttingMethod: string;
  dosageAccount: string;
  materialRemarkList: IV1ProdBomMaterialRemarkListItem[];
  /**
   * 「已废弃」
   * 「已废弃」
   */
  bingPurchaseState: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandId: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandCode: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  demandTag: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  fabricDemandTag: string;
  demandType: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchId: string;
  /**
   * 「已废弃」
   * 「已废弃」
   */
  matchCode: string;
  commodityType: string;
  commodityName: string;
  commodityId: string;
  commodityCode: string;
  commodityNumber: string;
  categoryCode: string;
  categoryName: string;
  skuId: string;
  skuCode: string;
  material: string;
  matchPictureList: string[];
  matchSalePrice: string;
  matchPurchaseUnitName: string;
  packNumber: string;
  packNumberUnit: string;
  packUnitName: string;
  packAssistantUnitName: string;
  minPrice: string;
  minPriceUnit: string;
  skuAttrs: string;
  widthLow: string;
  widthHigh: string;
  widthUnit: string;
  saleUnit: string;
  weightLow: string;
  weightHigh: string;
  weightUnit: string;
  colorName: string;
  colorType: string;
  warehouseColorInfo: IV1ProdBomWarehouseColorInfo;
  colorNumber: string;
  matchSampleGuidePrice: string;
  matchSampleUnit: string;
  matchGuidePrice: string;
  matchCostPriceUnit: string;
  matchPurchaseGap: string;
  meterPrice: string;
  meterPriceUnit: string;
  matchSource: string;
  matcherName: string;
  matchRemark: string;
  unfinishedReason: string;
  colorCardPictureList: string[];
  purchaseColorCardPictureList: string[];
  isConfirm: string;
  sort: string;
  widthConfirm: string;
  supplierId: string;
  supplierCode: string;
  supplierName: string;
  purchasePrice: string;
  skuPrice: string;
  accessoriesFlagId: string;
  craftDemandInfoList: IV1ProdBomCraftDemandInfoListItem[];
  purchaseApplyFollowCount: string;
  dosageAccountUnit: string;
  attritionRate: string;
  bulkPurchasePrice: string;
  bulkPurchasePriceUnit: string;
  materialSnapshotId: string;
  materialContextId: string;
  matchColorSkuAttr: string;
}

/**
 * 推款大货bom列表返回内容
 */
export interface IStyleInfoPageListItemForTuikuan {
  /**
   * 主键
   */
  prodBomInfoId?: string;
  /**
   * bom版本号。 PB+【SKC规则中的数字】+1位版本号。 如PB2107130001-1
   */
  bomVersion?: string;
  /**
   * 款式号SPU
   */
  styleCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 区域id【所属区域】
   */
  regionId?: string;
  /**
   * 区域名称
   */
  regionName?: string;
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
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 款式品类code。如01-1003  (取值OPS，字段编码：pims_category)
   */
  styleType?: string;
  /**
   * 款式品类名称。如女装-套装-连衣裙
   */
  styleTypeName?: string;
  /**
   * 开发核价表ID
   */
  checkPriceId?: string;
  /**
   * bomId
   */
  bomId?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 款式类别: 0-平台; 1-大客户
   */
  styleCategory?: string;
}

/**
 * 推款大货bom列表请求参数
 */
export interface IStyleInfoPageForTuikuanReq {
  // personal: boolean;
  // 款式号
  styleCodeLike?: string;
  // 设计款号
  designCode?: string;
  // 所属区域
  regionId?: REGION_ENUM | '';
  // bom版本号
  bomVersionLike?: string;
  // 创建日期开始
  createStart?: string;
  // 创建日期结束
  createEnd?: string;
  // 款式品类
  styleTypeLike?: string;
  // 设计师id
  designerIdList?: string[];
  // 款式类别: 0-平台; 1-大客户
  styleCategory?: string;
  pageNum: number;
  pageSize: number;
}

// 推款大货bom详情
export interface IV1ProdBomRes {
  color: string;
  /**
   * 主键
   */
  prodBomInfoId?: string;
  /**
   * bom版本号。 PB+【SKC规则中的数字】+1位版本号。 如PB2107130001-1
   */
  bomVersion: string;
  /**
   * 款式号SPU
   */
  styleCode: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 区域id【所属区域】
   */
  regionId: string;
  /**
   * 区域名称
   */
  regionName: string;
  /**
   * 款式品类编码
   */
  styleType: string;
  /**
   * 款式品类名称。如女装-套装-连衣裙
   */
  styleTypeName: string;
  /**
   * 开发核价表ID
   */
  checkPriceId: string;
  /**
   * 开发bom表Id
   */
  bomId: string;
  /**
   * 备注
   */
  remark: string;
  checkPriceDetailVo: IV1ProdBomCheckPriceDetailVo;
  bomOrderDetailVo: IV1ProdBomBomOrderDetailVo;
  /* 款式类别: 0-平台; 1-大客户 */
  styleCategory: string;
}
/**
 * 核价详情
 */
export interface IV1ProdBomCheckPriceDetailVo {
  checkPriceId?: string;
  clothesId: string;
  checkPriceState: 'WAIT_CHECK_PRICE' | 'HAD_CHECK_PRICE' | 'UNKNOWN';
  prototypeId: string;
  processCode: string;
  designCode: string;
  styleCode: string;
  designerId: string;
  designerCode: string;
  designerName: string;
  patternMakerId: string;
  patternMakerName: string;
  pricerId: string;
  pricerName: string;
  customerPictureList: string[];
  designPictureList: string[];
  deliveryTypeCode: string;
  deliveryTypeName: string;
  deliveryTime: string;
  deliveryPeriod: string;
  planDeliveryTime: string;
  isUrgent: boolean;
  isAbnormal: boolean;
  checkerName: string;
  checkTime: string;
  cuttingMethod: string;
  finishTime: string;
  versionNum: string;
  isLatest: string;
  color: string;
  category: string;
  categoryName: string;
  demandTaskType: string;
  customerStyleCode: string;
  regionId: string;
  regionName: string;
  purchaserName: string;
  purchaserCode: string;
  qualityLevel: string;
  qualityLevelCode: string;
  demandPriceInfoVo: IV1ProdBomDemandPriceInfoVo;
  checkPriceToFactoryInfo: IV1ProdBomCheckPriceToFactoryInfo;
  materialCostInfoList: IV1ProdBomMaterialCostInfoListItem[];
  craftDemandCostInfoList: IV1ProdBomCraftDemandCostInfoListItem[];
  otherCostInfoList: IV1ProdBomOtherCostInfoListItem[];
  processCostInfoList: IV1ProdBomProcessCostInfoListItem[];
  materialCost: string;
  craftDemandCost: string;
  processCost: string;
  otherCost: string;
  profit: string;
  profitCost: string;
  taxationCost: string;
  pureTotalCost: string;
  totalCost: string;
  totalCostExt: string;
}

export interface IV1ProdBomDemandPriceInfoVo {
  sendOrderRatioId?: string;
  sendOrderValue: string;
  subsidyCoef: string;
  fabricCoef: string;
  month: string;
  monthType: string;
  outputCoef: string;
  qualityCoef: string;
  orderCoef: string;
  orderNumRange: string;
  taxationRatio: string;
}
export interface IV1ProdBomCheckPriceToFactoryInfo {
  demandPriceInfoVo?: IV1ProdBomDemandPriceInfoVo;
  priceRegionFactoryVoList: IV1ProdBomPriceRegionFactoryVoListItem[];
  materialCostInfoList: IV1ProdBomMaterialCostInfoListItem[];
  craftDemandCostInfoList: IV1ProdBomCraftDemandCostInfoListItem[];
  otherCostInfoList: IV1ProdBomOtherCostInfoListItem[];
  processCostInfoList: IV1ProdBomProcessCostInfoListItem[];
  materialCost: string;
  craftDemandCost: string;
  processCost: string;
  otherCost: string;
  profit: string;
  profitCost: string;
  taxationCost: string;
  pureTotalCost: string;
  totalCost: string;
  totalCostExt: string;
}
