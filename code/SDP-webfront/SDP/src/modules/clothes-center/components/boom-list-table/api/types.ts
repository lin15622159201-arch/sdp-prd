/**
 * 获取Spu下正常款的最新bom详情信息
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/5282
 */
export interface IBomSpuNormalSkcReq {
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
}

export type IBomSpuNormalSkcRes = IBomSpuNormalSkcResItem[];
export interface IBomSpuNormalSkcResItem {
  bomMaterialId?: string;
  bomId?: string;
  bomMaterialType?: string;
  prototypeMaterialName?: string;
  partUse?: string;
  partUseName?: string;
  cuttingMethod?: string;
  cuttingMethodName?: string;
  dosageAccount?: string;
  materialRemarkList: IBomSpuNormalSkcResItemMaterialRemarkListItem[];
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
  warehouseColorInfo?: IBomSpuNormalSkcResItemWarehouseColorInfo;
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
  craftDemandInfoList: IBomSpuNormalSkcResItemCraftDemandInfoListItem[];
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
}

export interface IBomSpuNormalSkcResItemCraftDemandInfoListItem {
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

export interface IBomSpuNormalSkcResItemWarehouseColorInfo {
  skuId?: string;
  colorNumber?: string;
  skuCode?: string;
  remainingQuantity?: string;
  colorNumberDesc?: string;
  colorSystem?: string;
  warehouseName?: string;
  belongArea?: BELONG_AREA_ENUM;
  supplierRegion?: string;
  regionId?: string;
}

export interface IBomSpuNormalSkcResItemMaterialRemarkListItem {
  designRemarksId?: string;
  remark?: string;
  transientState?: string;
  creatorId?: string;
  createdName?: string;
  createdTime?: number;
}

export enum BELONG_AREA_ENUM {
  /**
   * NATIONWIDE
   */
  NATIONWIDE = 'NATIONWIDE',
  /**
   * GUANGZHOU
   */
  GUANGZHOU = 'GUANGZHOU',
  /**
   * HANGZHOU
   */
  HANGZHOU = 'HANGZHOU'
}
