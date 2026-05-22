import { ALLOCATE_TYPE_ENUM, COMMODITY_TYPE_ENUM, DESIGN_DEMAND_STATUS_ENUM } from '../constant';

export interface IGetTaskListReq {
  /**
   * 设计需求主键id
   */
  designDemandId?: string;
  /**
   * 灵感选款ID
   */
  inspirationStyleId?: string;
  /**
   * 企划id
   */
  planningId?: string;
  /**
   * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
   */
  designDemandStatus?: DESIGN_DEMAND_STATUS_ENUM | '';
  /**
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 灵感品类编码-OPS
   */
  category?: string;
  /**
   * 建议风格编码   (多选)
   */
  suggestedStyleCodeList: string[];
  /**
   * 国家站点id集合 (多选)
   */
  countrySiteCodeList: string[];
  /**
   * 店铺id集合   (多选)
   */
  storeIdList: string[];
  /**
   * 期望成本
   */
  sellingPrice?: string;
  /**
   * 波段编码-OPS: plm_clothing_band  (多选)
   */
  waveBandCodeList: string[];
  /**
   * 分配设计师编码
   */
  designerIdList?: string;
  /**
   * 提交人idid集合  (多选)  v1.020
   */
  submitUserIdList?: string[];
  /**
   * 分配设计师组编码
   */
  designerGroupCodeList?: string;
  /**
   * 开款SPU
   */
  styleCode?: string;
  pageNum: number;
  pageSize: number;
  /**
   * 选图人
   */
  chosenIdList?: string[];
  /**
   * 选图开始时间
   */
  chosenTimeStart?: string;
  /**
   * 选图结束时间
   */
  chosenTimeEnd?: string;
}
export interface IGetTaskListRes {
  page?: number;
  total?: number;
  list: {
    /**
     * 设计需求主键id
     */
    designDemandId: string;
    /**
     * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
     */
    designDemandStatus: DESIGN_DEMAND_STATUS_ENUM;
    /**
     * 灵感选款ID
     */
    inspirationStyleId: string;
    /**
     * 供给方式-OPS
     */
    supplyModeName: string;
    /**
     * 供给方式编码 imitation=仿款
     */
    supplyModeCode: string;
    /**
     * 商品链接
     */
    productLink: string;
    /**
     * 灵感品类编码-OPS
     */
    category: string;
    /**
     * 灵感品类名称
     */
    categoryName: string;
    /**
     * 建议风格-OPS
     */
    suggestedStyle: string;
    /**
     * 建议风格编码
     */
    suggestedStyleCode: string;
    /**
     * 国家站点id
     */
    countrySiteId: string;
    /**
     * 国家站点name
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
     * 期望成本
     */
    sellingPrice: string;
    /**
     * 期望成本(仿款时有值)  v1.020
     */
    expectedCostPrice: string;
    /**
     * 波段编码-OPS: plm_clothing_band
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
     * 需求提交人  v1.020
     */
    submitUserName: string;
    /**
     * 需求提交人id  v1.020
     */
    submitUserId: string;
    /**
     * 分配人名称  v1.020
     */
    allocateUserName: string;
    /**
     * 分配设计师id
     */
    designerId: string;
    /**
     * 分配设计师名称
     */
    designerName: string;
    /**
     * 分配设计师组名称
     */
    designerGroup: string;
    /**
     * 开款SPU
     */
    styleCode: string;
    /**
     * 灵感图集合
     */
    inspirationImageList: string[];
    /**
     * 淘汰原因名称
     */
    noPassReasonName?: string;
    /**
     * 淘汰原因code
     */
    noPassReasonCode?: string;
    /**
     * 淘汰人名称
     */
    noPassUserName?: string;
    /**
     * 淘汰时间
     */
    noPassTime?: number;
  }[];
}

export interface IDispatchTaskReq {
  /**
   * 设计需求单id
   */
  designDemandIdList: string[];
  /**
   * 分配设计师id
   */
  designerId: string;
  /**
   * 仿款进行任务分配必填参数信息   v1.020
   */
  copyStyleInfo: {
    /**
     * 国家站点code
     */
    countrySiteCode: string;
    /**
     * 国家站点name
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
     * 建议风格-OPS
     */
    suggestedStyle: string;
    /**
     * 建议风格编码
     */
    suggestedStyleCode: string;
    /**
     * 场景名称(ops: JV_scene)
     */
    sceneName: string;
    /**
     * 场景编码
     */
    sceneCode: string;
    /**
     * 波段编码
     */
    waveBandCode: string;
    /**
     * 波段名称
     */
    waveBandName: string;
    /**
     * 货盘类型名称
     */
    palletTypeName: string;
    /**
     * 货盘类型编码
     */
    palletTypeCode: string;
  };
}

export interface IGetTaskInfoReq {
  /**
   * 设计需求id
   */
  designDemandId: string;
}
export interface IGetTaskInfoRes {
  /**
   * 设计需求主键id
   */
  designDemandId?: string;
  /**
   * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
   */
  designDemandStatus?: DESIGN_DEMAND_STATUS_ENUM;
  /**
   * 灵感选款ID
   */
  inspirationStyleId?: string;
  /**
   * 企划id
   */
  planningId?: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 商品链接
   */
  productLink?: string;
  /**
   * 灵感品类编码-OPS
   */
  category?: string;
  /**
   * 灵感品类名称
   */
  categoryName?: string;
  /**
   * 建议风格-OPS
   */
  suggestedStyle?: string;
  /**
   * 建议风格编码
   */
  suggestedStyleCode?: string;
  /**
   * 国家站点id
   */
  countrySiteId?: string;
  /**
   * 国家站点name
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
   * 期望成本
   */
  sellingPrice?: string;
  /**
   * 期望成本(仿款时有值)  v1.020
   */
  expectedCostPrice?: string;
  /**
   * 场景名称(ops: JV_scene)  v1.020
   */
  sceneName?: string;
  /**
   * 场景编码  v1.020
   */
  sceneCode?: string;
  /**
   * 货盘类型名称  v1.020
   */
  palletTypeName?: string;
  /**
   * 货盘类型编码  v1.020
   */
  palletTypeCode?: string;
  /**
   * 波段编码-OPS: plm_clothing_band
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
   * 需求提交人  v1.020
   */
  submitUserName?: string;
  /**
   * 需求提交人id  v1.020
   */
  submitUserId?: string;
  /**
   * 分配人名称  v1.020
   */
  allocateUserName?: string;
  /**
   * 分配人id  v1.020
   */
  allocateUserId?: string;
  /**
   * 分配设计师id
   */
  designerId?: string;
  /**
   * 分配设计师编码
   */
  designerCode?: string;
  /**
   * 分配设计师名称
   */
  designerName?: string;
  /**
   * 分配设计师组编码
   */
  designerGroupCode?: string;
  /**
   * 分配设计师组名称
   */
  designerGroup?: string;
  /**
   * 开款SPU
   */
  styleCode?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * aigc备注 ---2025-01-16新增
   */
  aigcRemark?: string;
  /**
   * 企划来源name  v1.020
   */
  planningSourceName: string;
  /**
   * 企划来源code  v1.020
   */
  planningSourceCode: string;
  /**
   * 灵感图来源
   */
  inspirationImageSource: string;
  inspirationImageSourceCode: string;
  /**
   * 灵感源品牌
   */
  inspirationBrand: string;
  inspirationBrandCode: string;
  /**
   * 详情信息
   */
  demandDetailInfo?: {
    /**
     * 设计需求详情主键id
     */
    designDemandDetailId?: string;
    /**
     * 设计需求id
     */
    designDemandId?: string;
    /**
     * 原图
     */
    originalImage?: string;
    /**
     * 灵感图集合
     */
    inspirationImageList: string[];
    /**
     * 淘汰原因
     */
    noPassReason?: string;
    /**
     * 淘汰人id
     */
    noPassUserId?: string;
    /**
     * 淘汰人名称
     */
    noPassUserName?: string;
    /**
     * 淘汰时间
     */
    noPassTime?: number;
  };
}

export interface IGetSuggestFabricReq {
  /**
   * 设计需求id
   */
  designDemandId: string;
}
export type IGetSuggestFabricRes = {
  /**
   * 主键id
   */
  suggestedMaterialId?: string;
  /**
   * 设计需求id
   */
  designDemandId?: string;
  /**
   * 排序序号
   */
  sortNum?: string;
  /**
   * 是否选中: 0-否; 1-是; (默认0)
   */
  isChosen?: string;
  /**
   * 物料信息(查自中台,与bom的物料查询出参字段一致)
   */
  materialInfo: {
    /**
     * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES
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
     * 销售空差(面料)
     */
    matchPurchaseGap?: string;
    /**
     * 足米价(面料)
     */
    meterPrice?: string;
    /**
     * 足米价单位(面料)
     */
    meterPriceUnit?: string;
    /**
     * 好料网-是否启用：{0-否 ,1-是}
     */
    enableState?: string;
    /**
     * 好料网-上架状态：{0-否 ,1-是}
     */
    onShelfState?: string;
  };
}[];

export interface ICreateSpuReq {
  /**
   * 设计需求单id
   */
  designDemandId: string;
  /**
   * 选中物料Id (选中物料必填)
   */
  suggestedMaterialId: string;
  /**
   * spu编码
   */
  spuCode: string;
  /**
   * sku编码
   */
  skuCode: string;
}

export interface IPassInspirationReq {
  /**
   * 设计需求单id
   */
  designDemandIdList: string[];
  /**
   * 淘汰原因
   */
  noPassReasonName: string;
  /**
   * 淘汰原因字典编码
   */
  noPassReasonCode: string;
}

export interface IReDispatchTaskReq {
  /**
   * 分配的设计需求单id集合
   */
  designDemandIdList: string[];
  /**
   * 分配设计师id
   */
  designerId: string;
}
