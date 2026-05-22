import type { YES_NO_ENUM } from '@/constant';
import {
  BOM_ORDER_STATUS_ENUMS,
  SAMPLE_TYPE_ENUM,
} from '../../develop-bom/constant';
import {
  CHECK_PRICE_STATE_ENUM,
  CHECK_PRICE_TYPE_ENUM,
  DEMAND_TASK_TYPE_ENUM,
  DESIGN_ORDER_INFO_ENUM,
  MAKE_CLOTHES_TYPE_ENUM,
  PROTOTYPE_STATUS_ENUM,
  SKC_TYPE_ENUM,
  SOURCE_TYPE_ENUM,
  STYLE_STATUS_ENUM,
  REMARK_BIZ_TYPE_ENUM,
} from '../constant/index';
/**
 * 分页对象
 */
export interface PostWebV1PrototypeManagePageApiReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 任务编号(多个,分割) */
  taskCode?: string;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
  /** 租户ID */
  tenantId?: number;
  /** 是否删除 */
  deleted?: number;
  /** 同组
1:组内 */
  sameGroup?: string;
  /** 创建人id */
  creatorIds?: number[];
  /** SKC编码集合(多选) */
  designCodeList?: string[];
  /** SPU编码集合(多选) */
  styleCodeList?: string[];
  /** 商品末级分类(中文) 完整的分类组装格式: 女装-T恤-圆领T恤 */
  categoryNameList?: string[];
  /** 波段编码-OPS: plm_clothing_band  (多选) */
  waveBandCodeList?: string[];
  /** 设计师id集合  (多选) */
  designerIdList?: string[];
  /** 设计组  (多选) */
  designerGroupCodeList?: string[];
  /** 店铺id集合   (多选) */
  storeIdList?: number[];
  /** 款式标签编码集合   (多选) */
  styleLabelCodeList?: string[];
  /** 款式等级编号(多选) */
  styleLevelCodeList?: string[];
  /** SPU生成时间开始时间 */
  spuCreatedTimeStart?: string;
  /** SPU生成时间结束时间 */
  spuCreatedTimeEnd?: string;
  /** SKC生成时间（创建时间） */
  skcCreatedTimeStart?: string;
  /** SKC生成时间（创建结束时间） */
  skcCreatedTimeEnd?: string;
  /** 修图任务: 0-未创建; 1-待处理;2-已完成 */
  imageUpdateStatus?: number | '-1';
  /** 款式资料状态: 1.未提交 2.已提交 */
  prototypeStatus?: number | string;
  /** 是否补做 false 否 true是 */
  isMakeMore?: number;
  /** 是否二次工艺(1:是,0:否) */
  isCraft?: number;
  /** 是否取消 0 否 1是 */
  isCanceled?: number;
  /** 是否动销: 0-否; 1-是; 默认0 */
  isOnSale?: number;
  /** 款类型: 1--正常款 2-复色款 */
  skcType?: number;
  /** 是否核价(1:是,0:否) */
  checkPriceState?: number;
  /** 找料状态: 0-否; 1-是 (默认0) ---2025-01-16新增 */
  materialSearchState?: number;
  /** 待上架
  1：待上架
  0：待推送 */
  upcoming?: string;
  /** 上架
  1：上架
  0：下架 */
  onShelves?: string;
  styleCode?: string;
  designCode?: string;
  /** 上架状态: 0-待推送; 1-待上架; 2-已上架; 3-下架; 4-上架失败 */
  listingStatus?: any;
  /** 推送plm状态: 0-待推送; 1-已推送; 2-推送失败; 3-取消; */
  pushPlmStatus?: number;
  /** 前置拆版 */
  preDisassemblyState?: number;
  /** 测价通过状态 0=否 1=是 */
  pricePassedState?: number;
  /** 拆版是否完成 0=否 1=是 */
  disassemblyFinished?: number;
}

export interface postWebV1PrototypeManagePageApiResListResItem {
  /** spuId(design_style_version表中的id) */
  designStyleVersionId?: number;
  /** 成衣spu编码 */
  styleCode?: string;
  /** 设计款skc_id */
  prototypeId?: string;
  /** 设计款skc_code */
  designCode?: string;
  /** 打版信息状态: 1.待拆版 2.已拆版 */
  prototypeStatus?: number;
  /** 尺码标准 */
  sizeStandard?: string;
  /** 尺码标准编号 */
  sizeStandardCode?: string;
  /** 样衣尺码 */
  sampleSize?: string;
  /** 版本号 */
  versionNum?: number;
  /** 设计图片{多张以英文逗号分隔} */
  designPicture?: string;
  /** 是否补做 false 否 true是 */
  isMakeMore?: boolean;
  /** 是否紧急(1:紧急,0:不紧急) */
  isUrgent?: boolean;
  /** 是否取消 0 否 1是 */
  isCanceled?: boolean;
  /** 是否动销: 0-否; 1-是;  (款式开发) */
  isOnSale?: boolean;
  /** 版单取消原因 */
  cancelReason?: string;
  /** 版单取消时间 */
  cancelTime?: string;
  /** 取消版单操作人id */
  cancelUserId?: number;
  /** 版单取消操作人姓名 */
  cancelUserName?: string;
  /** 版单取消备注 */
  cancelRemark?: string;
  /** 订单类型: 1-打版订单 2-设计订单 3-加工订单；1、2属于样衣，3属于生产(大货) */
  demandTaskType?: number;
  /** 款类型: 1-正常款; 2-复色款; */
  skcType?: number;
  /** 设计师id【设计师】 */
  designerId?: number;
  /** 设计师编号【设计师】 */
  designerCode?: string;
  /** 设计师名称【设计师】 */
  designerName?: string;
  /** 设计组 */
  designerGroup?: string;
  /** 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3) */
  category?: string;
  /** 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤） */
  categoryName?: string;
  /** 设计款生成时间 */
  skcCreatedTime?: string;
  /** SPU生成时间 */
  spuCreatedTime?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 生产核价状态: 0-未核价 1-核价中 2-已核价 */
  checkPriceState?: number;
  /** 预估核价状态: 0-未核价 1-核价中 2-已核价 */
  predictCheckPriceStatus?: number;
  /** 颜色 */
  color?: string;
  /** 是否可复色 0：否  1：是 */
  canMakeColor?: number;
  /** 供给方式-OPS */
  supplyModeName?: string;
  /** 供给方式编码 */
  supplyModeCode?: string;
  /** 波段编码 */
  waveBandCode?: string;
  /** 波段名称 */
  waveBandName?: string;
  /** 国家站点code */
  countrySiteCode?: string;
  /** 国家站点name */
  countrySiteName?: string;
  /** 店铺id */
  storeId?: number;
  /** 店铺名称 */
  storeName?: string;
  /** 平台名称 */
  platformName?: string;
  /** 买手id */
  buyerId?: number;
  /** 买手名称 */
  buyerName?: string;
  /** 场景名称(ops: JV_scene) */
  sceneName?: string;
  /** 场景编码 */
  sceneCode?: string;
  /** 修图任务ID */
  imageUpdateTaskId?: number;
  /** 修图任务编号 */
  imageUpdateTaskCode?: string;
  /** 修图任务状态: 0-未创建; 1-待处理;2-已完成 */
  imageUpdateStatus?: number;
  /** 上架状态: 0-待推送; 1-待上架;2-已上架；3-下架 */
  listingStatus?: number;
  /** plm任务状态：0-待推送，1-已推送；2-推送失败,3-已取消 */
  pushPlmStatus?: number;
  /** 货盘类型名称 */
  palletTypeName?: string;
  /** 最新BOM是否已经核价（1-已经核价，0-未核价） */
  isLastBomCheckPrice?: number;
  /** SPU图片材料信息 */
  materialInfo?: PrototypeManagePageResMaterialInfoItem[];
  /** 款式 */
  styleType?: string;
  /** 款式标签 */
  styleLabelName: string;
  /** 款式标签编码 */
  styleLabelCode: string;
  /** plm推送失败原因 */
  pushPlmResultMessage?: string;
  /** 上架失败原因 */
  listingFailReason?: string;
  /** 前置拆版 */
  preDisassemblyState?: number;
  /** 拆版状态 */
  disassemblyFinished?: number;
  disassemblyFinishedTime?: string;
  /** 测价通过状态 */
  pricePassedState?: number;
}
/**
 * 注释
 */
export interface PrototypeManagePageResMaterialInfoItem {
  /** SPU编码 */
  styleCode?: string;
  /** 素材url */
  materialUrl?: string;
  /** 材料类型: 0-图片; 1-视频 */
  materialType?: number;
}
/**
 * 灵感设计需求信息 v1.0.4-p3
 */
export interface IPrototypeManagePageResDemandDesignInfo {
  /**
   * 设计需求主键id
   */
  designDemandId: string;
  /**
   * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
   */
  designDemandStatus: string;
  /**
   * 灵感选款ID
   */
  inspirationStyleId: string;
  /**
   * 原图
   */
  originalImage: string;
  /**
   * 灵感图集合
   */
  inspirationImageList: string[];
}

/**
 * 响应数据
 */
export interface PostWebV1PrototypeManagePageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  pageNum?: number;
  /**
   * 总数据量
   */
  total?: number;
  /**
   * 分页数据
   */
  list: postWebV1PrototypeManagePageApiResListResItem[];
}
/**
 * 查询对象
 */
export interface IPrototypeManageClothesPriceProductReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCodeList: string[];
}
/**
 * 响应数据
 */
export type IPrototypeManageClothesPriceProductRes = {
  /**
   * 设计款skc_code
   */
  prototypeId: string;
  /**
   * 样衣开发管理信息
   */
  sampleInfos: IPrototypeManageClothesPriceProductSampleInfo[];
  /**
   * 核价单信息 (款式开发)
   */
  priceOrderInfo: IPrototypeManageClothesPriceProductPricingOrderStatus;
}[];
/**
 * 样衣开发管理信息
 */
export interface IPrototypeManageClothesPriceProductSampleInfo {
  /**
   * 加工单编号 (如:2409250085-1)   (款式开发)
   */
  processCode: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版 4-补做打版
   */
  sampleType: SAMPLE_TYPE_ENUM;
  /**
   * 样衣打版流程环节
   */
  processStep: string;
  /**
   * 样衣打版流程环节名称
   */
  processStepDesc: string;
  /**
   * 是否完成
   */
  isDone: YES_NO_ENUM;
  /**
   * 是否取消
   */
  isCancel: YES_NO_ENUM;
  /**
   * 样衣版单各环节节点状态描述
   */
  nodeStateList: {
    /**
     * 样衣打版id
     */
    clothesId?: string;
    /**
     * 当前处理环节
     */
    processStep?: string;
    /**
     * 当前处理环节名称
     */
    processStepDesc?: string;
    /**
     * 当前处理环节节点编码
     */
    processNode?: string;
    /**
     * 当前处理环节节点名称
     */
    processNodeDesc?: string;
    /**
     * 当前处理环节节点状态
     */
    processNodeState?: string;
    /**
     * 当前处理环节节点状态描述
     */
    processNodeStateDesc?: string;
  }[];
}
/**
 * 核价单信息
 */
export interface IPrototypeManageClothesPriceProductPricingOrderStatus {
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 核价类型: 1-预估核价; 2-生产核价(精确)
   */
  checkPriceType: CHECK_PRICE_TYPE_ENUM;
  /**
   * 核价价格(对应最新核价单的总价不加成价格)
   */
  totalCost: string;
  /**
   * 核价人名称
   */
  checkPriceName: string;
  /**
   * 核价时间
   */
  checkPriceTime: number;
  /** 大货成本价 */
  bulkCost?: number;
}

export interface IPostMakeClothesReq {
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 打版方式：0-仅纸样; 1-实物样; 2-3D样; 3-3D+实物样
   */
  makeClothesType: MAKE_CLOTHES_TYPE_ENUM;
  /**
   * 尺码
   */
  sampleSize: string;
  /**
   * 样衣件数
   */
  sampleAmount: string;
}
export interface IPostMakeClothesRes {
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 加工单id
   */
  clothesId?: string;
}

export interface PostWebV1PrototypeManageCancelApiReq {
  /**
   * 设计款id
   */
  prototypeId: number;
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 取消备注
   */
  cancelRemark?: string;
}
export interface IPrototypeManageDesignerChangeReq {
  /**
     * 设计款号。 skc+年月日+4位流水号
     */
  prototypeIdList: string[];
  /**
     * 设计师id【设计师】
     */
  designerId: string;
}
export interface IPrototypeManageColorsMakingReq {
  /**
   * 设计款id
   */
  prototypeId: string;
}
export interface IPrototypePrintBatchReq {
  /**
   * id集合。 skc+年月日+4位流水号
   */
  prototypeIdList: string[];
}
/**
 * 响应数据
 */
export type IPrototypePrintBatchRes = {
  /**
   * 版单id
   */
  prototypeId?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * spuId(design_style_version表中的id)
   */
  designStyleVersionId?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 设计款号
   */
  designCode?: string;
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
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 打版类型: 1-大货打版 2-正常打版 3-复色打版
   */
  sampleType?: SAMPLE_TYPE_ENUM;
  /**
   * 是否紧急(1:紧急,0:不紧急)
   */
  isUrgent?: boolean;
  /**
   * 是否补做 false 否 true是
   */
  isMakeMore?: boolean;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled?: boolean;
  /**
   * 版单取消时间
   */
  cancelTime?: number;
  /**
   * 版单取消原因
   */
  cancelReason?: string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName?: string;
  /**
   * 打版信息状态: 1.待拆版 2.已拆版
   */
  prototypeStatus?: PROTOTYPE_STATUS_ENUM;
  /**
   * 设计图片
   */
  designPicture: string[];
  /**
   * 款生成时间
   */
  skcCreatedTime?: number;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 颜色编码
   */
  colorCode?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 样衣件数
   */
  sampleAmount?: string;
  /**
   * 库位号
   */
  storageLocation?: string;
  /**
   * 设计师电话
   */
  designPhone?: string;
  /**
   * 裁剪备注
   */
  cuttingRemark?: string;
  /**
   * 车缝工艺备注
   */
  sewingRemark?: string;
  /**
   * 版型备注
   */
  typeRemark?: string;
  /**
   * 品质等级
   */
  qualityLevel?: string;
  /**
   * 版单提交时间
   */
  submitTime?: number;
  /**
   * 是否拼接 0 否 1是
   */
  isSplicing?: YES_NO_ENUM;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 复色款号
   */
  makeSameDesignCode?: string;
}[];

export interface ICreateSpuReq {
  /**
   * 款来源: 130-自建款; 170-灵感设计需求; 180-数码印花款
   */
  sourceType: SOURCE_TYPE_ENUM;
  /**
   * 设计需求id (sourceType=170时必填)
   */
  designDemandId?: string;
  /**
   * 款类型: 1-OEM(打版订单); 2-ODM(设计订单)
   */
  styleType: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName: string;
  /**
   * 供给方式编码
   */
  supplyModeCode: string;
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
   * 期望成本
   */
  suggestedSellingPrice: string;
  /**
   * 波段编码(平台款必填)
   */
  waveBandCode: string;
  /**
   * 波段名称(平台款必填)
   */
  waveBandName: string;
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
   * 款式品类编码(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 场景名称(ops: JV_scene) v1.020
   */
  sceneName: string;
  /**
   * 场景编码 v1.020
   */
  sceneCode: string;
  /**
   * 季节集合
   */
  styleSeasonList: {
    /**
     * 编码
     */
    code: string;
    /**
     * 值
     */
    name: string;
  }[];
  /**
   * 参考链接
   */
  referLink?: string;
  /**
   * 尺码组code (如:chinese_size_code)
   */
  sizeStandardCode: string;
  /**
   * 尺码组名称.（如：中国码）
   */
  sizeStandard: string;
  /**
   * 款式风格
   */
  clothingStyleName: string;
  /**
   * 款式风格
   */
  clothingStyleCode: string;
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
   * 商品类型
   */
  productType: string;
  /**
   * 商品类型编码
   */
  productTypeCode: string;
  /**
   * 货盘类型名称
   */
  palletTypeName: string;
  /**
   * 货盘类型编码
   */
  palletTypeCode: string;
  /**
   * 商品主题cde
   */
  productThemeCode: string;
  /**
   * 商品主题名称
   */
  productThemeName: string;
}
export interface ICreateSpuRes {
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
   * 正常打版的 版单id
   */
  prototypeId: string;
  /**
   * 正常打版的 设计款号
   */
  designCode: string;
}

export interface IGetSpuDetailReq {
  /**
   * spu编码
   */
  prototypeId: string;
}
export interface IGetSpuDetailRes extends ICreateSpuReq {
  /**
   * 灵感设计需求信息(灵感任务需求开款才有值)
   */
  designDemandInfo?: {
    /**
     * 场景名称(ops: JV_scene) v1.020
     */
    sceneName: string;
    /**
     * 场景编码 v1.020
     */
    sceneCode: string;
    /**
     * 设计需求主键id
     */
    designDemandId?: string;
    /**
     * 状态: 10-待分配; 20-待处理; 30-已淘汰; 40-已开款
     */
    designDemandStatus?: string;
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
     * aigc备注 --- 2025-01-16新增
     */
    aigcRemark?: string;
    /**
     * 期望成本
     */
    sellingPrice?: string;
    /**
     * 期望成本(仿款时有值)  v1.020
     */
    expectedCostPrice: string;
    /**
     * 波段编码-OPS: plm_clothing_band
     */
    waveBandCode?: string;
    /**
     * 波段名称
     */
    waveBandName?: string;
    /**
     * 原图
     */
    originalImage?: string;
    /**
     * 灵感图集合
     */
    inspirationImageList: string[];
    /**
     * 企划来源name  v1.020
     */
    planningSourceName: string;
    /**
     * 企划来源code  v1.020
     */
    planningSourceCode: string;
    /**
     *灵感图来源
     */
    inspirationImageSource: string;
    /**
      * 灵感源品牌
      */
    inspirationBrand: string;
  };
  /**
   * spuId主键
   */
  designStyleId?: string;
  /**
   * SPU编码: 2年+2月+2日+4流水+2版号流水
   */
  styleCode?: string;
  /**
   * SPU版本号
   */
  versionNum?: string;
  /**
   * 款式状态: 1-待提交; 2-已提交
   */
  styleStatus?: STYLE_STATUS_ENUM;
  /**
   * 灵感设计需求id
   */
  designDemandId?: string;
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
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 最新提交时间
   */
  latestSubmitTime?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 是否可更新spu尺码 0:不可 1:可
   */
  updateSizeStandard?: YES_NO_ENUM;
}

export interface IGetSkcDetailReq {
  /**
   * 是否查询编辑页: 0-否; 1-是;(默认否)
   */
  isEdit?: string;
  /**
   * 设计款号
   */
  prototypeId: string;
}
export interface IGetSkcDetailRes {
  /** SPU信息 */
  styleInfo?: PrototypeManageBaseInfoResStyleInfo;
  /** skc基础信息 */
  prototypeInfo: PrototypeManageBaseInfoResPrototypeInfo;
  /** 上架商品信息 (款式开发) */
  onShelfInfo?: PrototypeManageBaseInfoResOnShelfInfo;
}
/**
 * 上架商品信息 (款式开发)
 */
export interface PrototypeManageBaseInfoResOnShelfInfo {
  /** SPU编码 */
  styleCode?: string;
  /** SKC编码 */
  designCode?: string;
  /** spu详情图集合 */
  spuDetailImageList?: string[];
  /** skc图集合 */
  skcImageList?: string[];
}

/**
 * skc基础信息
 */
export interface PrototypeManageBaseInfoResPrototypeInfo {
  /** 版单id */
  prototypeId?: string;
  /** 版本号 */
  versionNum?: number;
  /** 最新版本号 */
  latestVersionNum?: number;
  /** spuId(design_style_version表中的id) */
  designStyleVersionId?: number;
  /** 成衣SPU(款式SPU) */
  styleCode?: string;
  /** 设计款号 */
  designCode?: string;
  /** 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3) */
  category?: string;
  /** 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤） */
  categoryName?: string;
  /** 复色款号 */
  makeSameDesignCode?: string;
  /** 颜色 */
  color?: string;
  /** 款类型: 1--正常款 2-复色款 */
  skcType?: number;
  /** 是否补做 false 否 true是 */
  isMakeMore?: boolean;
  /** 设计师id【设计师】 */
  designerId?: number;
  /** 设计师编号【设计师】 */
  designerCode?: string;
  /** 设计师名称【设计师】 */
  designerName?: string;
  /** 设计组 */
  designerGroup?: string;
  /** 设计组code */
  designerGroupCode?: string;
  /** 版本完成 0 否 1是 */
  isDoneVersion?: boolean;
  /** 是否紧急(1:紧急,0:不紧急) */
  isUrgent?: boolean;
  /** 打版信息状态: 1.待拆版 2.已拆版 */
  prototypeStatus?: number;
  /** 是否取消 0 否 1是 */
  isCanceled?: boolean;
  /** SPU生成时间 */
  spuCreatedTime?: string;
  /** 款生成时间 */
  skcCreatedTime?: string;
  /** 设计图片 */
  designPicture?: string[];
  /** 尺码标准 */
  sizeStandard?: string;
  /** 尺码标准编号 */
  sizeStandardCode?: string;
  /** 样衣尺码 */
  sampleSize?: string;
  /** 拆版备注 */
  splitRemark?: string;
  /** 版单取消原因 */
  cancelReason?: string;
  /** 版单取消时间 */
  cancelTime?: string;
  /** 取消版单操作人id */
  cancelUserId?: number;
  /** 版单取消操作人姓名 */
  cancelUserName?: string;
  /** 版单取消备注 */
  cancelRemark?: string;
  /** 裁剪备注 */
  cuttingRemark?: string;
  /** 车缝工艺备注 */
  sewingRemark?: string;
  /** 版型备注 */
  typeRemark?: string;
  /** 版单提交时间 */
  submitTime?: string;
  /** 是否动销: 0-否; 1-是;  (款式开发) */
  isOnSale?: boolean;
  /** 是否拼接 0 否 1是 */
  isSplicing?: boolean;
  /** 是否打版: 0:不打版，1:打版 */
  isMakeClothing?: boolean;
  /** 核价状态: 0-未核价 1-核价中 2-已核价 */
  checkPriceState?: number;
  /** 是否打版: false-未打版; true-已打版; */
  isMakeClothes?: boolean;
  /** 参考款号 */
  referenceDesignCode?: string;
  /** SKC来源: 10-PLM; 20-淘工厂; 30-logo印; 40-灵感设计需求; 5-数码印花款; */
  skcSourceType?: number;
  /** 业务渠道 zj:1 jv:2 jv-new:3 */
  bizChannel?: number;
  /** 颜色信息集合 */
  colorInfoList?: PrototypeManageBaseInfoResColorInfoListItem[];
  materialInfo: PrototypeManageSaveReqMaterialInfoItem[];
}

/**
 * SPU图片材料信息
 */
// export interface PrototypeManageSaveReqMaterialInfoItem {
//   /** SPU编码 */
//   styleCode?: string;
//   /** 素材url */
//   materialUrl?: string;
//   /** 材料类型: 0-图片; 1-视频 */
//   materialType?: number;
// }

/**
 * 颜色信息集合
 */
export interface PrototypeManageBaseInfoResColorInfoListItem {
  /** 颜色名称 */
  color?: string;
  /** 颜色英文名 */
  colorEnglishName?: string;
  /** 颜色编码 */
  colorCode?: string;
  /** 颜色编码缩写 */
  colorAbbrCode?: string;
  /** 色号 */
  colorNumber?: string;
}

/**
 * SPU信息
 */
export interface PrototypeManageBaseInfoResStyleInfo {
  /** spuId主键 */
  designStyleId?: number;
  /** SPU编码: 2年+2月+2日+4流水+2版号流水 */
  styleCode?: string;
  /** SPU版本号 */
  versionNum?: number;
  /** 款来源: (历史: 110-CRM改款需求; 120-设计改款需求; 140-买手款; 150-淘工厂; 160-logo印)
     130-自建款; 170-灵感设计需求; 180-数码印花款; */
  sourceType?: number;
  /** 款式状态: 1-待提交; 2-已提交 */
  styleStatus?: number;
  /** 开款任务ID */
  developStyleTaskId?: number;
  /** 开款任务编码 */
  developStyleTaskCode?: string;
  /** AIGC选款结果ID */
  pickingResultId?: number;
  /** AIGC款式id */
  pickingStyleId?: number;
  /** 修图任务ID */
  imageUpdateTaskId?: number;
  /** 修图任务编号 */
  imageUpdateTaskCode?: string;
  /** 修图任务: 0-未创建; 1-待处理;2-已完成 */
  imageUpdateStatus?: number;
  /** 款式标签编码 */
  styleLabelCode?: string;
  /** 款式标签名称 */
  styleLabelName?: string;
  /** 款式等级 */
  styleLevelName?: string;
  /** 款式等级编号 */
  styleLevelCode?: string;
  /** SPU图片材料信息 */
  materialInfo?: PrototypeManageBaseInfoResMaterialInfoItem[];
  /** 印花编码 */
  printingCode?: string;
  /** 印花名称 */
  printingName?: string;
  /** 视觉形式编码 */
  visualFormCode?: string;
  /** 视觉形式名称 */
  visualFormName?: string;
  /** 供给方式-OPS */
  supplyModeName?: string;
  /** 供给方式编码 */
  supplyModeCode?: string;
  /** 商品类型名称 */
  productType?: string;
  /** 商品类型编码 */
  productTypeCode?: string;
  /** 货盘类型名称 */
  palletTypeName?: string;
  /** 货盘类型编码 */
  palletTypeCode?: string;
  /** 国家站点code */
  countrySiteCode?: string;
  /** 国家站点name */
  countrySiteName?: string;
  /** 店铺id */
  storeId?: number;
  /** 店铺名称 */
  storeName?: string;
  /** 平台名称 */
  platformName?: string;
  /** 买手id */
  buyerId?: number;
  /** 买手名称 */
  buyerName?: string;
  /** 场景名称(ops: JV_scene) */
  sceneName?: string;
  /** 场景编码 */
  sceneCode?: string;
  /** 品质等级 */
  qualityLevel?: string;
  /** 品质等级编号 */
  qualityLevelCode?: string;
  /** 织造方式code */
  weaveModeCode?: string;
  /** 织造方式 */
  weaveMode?: string;
  /** 建议售价 */
  suggestedSellingPrice?: string;
  /** 波段编码 */
  waveBandCode?: string;
  /** 波段名称 */
  waveBandName?: string;
  /** 版型编码 */
  patternCode?: string;
  /** 版型名称 */
  patternName?: string;
  /** sku类别编码 */
  skuClassCode?: string;
  /** sku类别名称 */
  skuClassName?: string;
  /** 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3) */
  category?: string;
  /** 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤） */
  categoryName?: string;
  /** 尺码标准 */
  sizeStandard?: string;
  /** 尺码标准编号 */
  sizeStandardCode?: string;
  /** 款式风格名称 */
  clothingStyleName?: string;
  /** 款式风格编码 */
  clothingStyleCode?: string;
  /** 季节编码 */
  seasonCode?: string;
  /** 季节名称 */
  seasonName?: string;
  /** 合身编码-OPS */
  fitCode?: string;
  /** 合身名称 */
  fitName?: string;
  /** 弹性编码-OPS */
  elasticCode?: string;
  /** 弹性名称 */
  elasticName?: string;
  /** 元素名称 */
  elementName?: string;
  /** 元素编码 */
  elementCode?: string;
  /** 商品主题编码 */
  productThemeCode?: string;
  /** 商品主题 */
  productThemeName?: string;
  /** 参考链接 */
  referLink?: string;
  /** 设计师id【设计师】 */
  designerId?: number;
  /** 设计师编号【设计师】 */
  designerCode?: string;
  /** 设计师名称【设计师】 */
  designerName?: string;
  /** 设计组code */
  designerGroupCode?: string;
  /** 设计组 */
  designerGroup?: string;
  /** 最新提交时间 */
  latestSubmitTime?: string;
  /** 业务渠道: 1-zj; 2-jv; 3-jv新系统; */
  bizChannel?: number;
  /** 备注 */
  remark?: string;
  /** aigc备注 */
  aigcRemark?: string;
  /** 灵感图来源编码 */
  inspirationImageSourceCode?: string;
  /** 灵感图来源 */
  inspirationImageSource?: string;
  /** 灵感源品牌编码 */
  inspirationBrandCode?: string;
  /** 灵感源品牌 */
  inspirationBrand?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 修改人名称 */
  reviserName?: string;
  styleSeasonList?: any;
}

/**
 * SPU图片材料信息
 */
export interface PrototypeManageBaseInfoResMaterialInfoItem {
  /** SPU编码 */
  styleCode?: string;
  /** 素材url */
  materialUrl?: string;
  /** 材料类型: 0-图片; 1-视频 */
  materialType?: number;
}

export interface IGetPrototypeMakeSameInfoReq {
  /**
   * 设计款号
   */
  designCode: string;
}
export interface IGetPrototypeMakeSameInfoRes {
  /**
   * 版单id
   */
  prototypeId?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 最新版本号
   */
  latestVersionNum?: string;
  /**
   * spuId(design_style_version表中的id)
   */
  designStyleVersionId?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 复色款号
   */
  makeSameDesignCode?: string;
  /**
   * 颜色
   */
  color?: string;
  colorInfoList: {
    /**
     * 颜色
     */
    color: string;
    /**
     * 颜色英文名
     */
    colorEnglishName: string;
    /**
     * 颜色编码 -v5.10
     */
    colorCode: string;
    /** 颜色英文缩写 */
    colorAbbrCode: string;
    /** 色号 */
    colorNumber: string;
  }[];
  /**
   * 款类型: 1-正常款; 2-复色款;
   */
  skcType?: SKC_TYPE_ENUM;
  /**
   * 是否补做 false 否 true是
   */
  isMakeMore?: boolean;
  /**
   * 是否紧急(1:紧急,0:不紧急)
   */
  isUrgent?: boolean;
  /**
   * 打版信息状态: 1.待拆版 2.已拆版
   */
  prototypeStatus?: string;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled?: boolean;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: number;
  /**
   * 款生成时间
   */
  skcCreatedTime?: number;
  /**
   * 设计图片
   */
  designPicture: string[];
  /**
   * 参考链接
   */
  referLink?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 尺码标准code
   */
  sizeStandardCode?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 品质等级
   */
  qualityLevel?: string;
  /**
   * 品质等级编码
   */
  qualityLevelCode?: string;
  /**
   * 拆版备注
   */
  splitRemark?: string;
  /**
   * 销售渠道
   */
  saleGroup?: string;
  /**
   * 备注记录
   */
  remark?: string;
  /**
   * 裁剪备注
   */
  cuttingRemark?: string;
  /**
   * 车缝工艺备注
   */
  sewingRemark?: string;
  /**
   * 版型备注
   */
  typeRemark?: string;
  /**
   * 款式风格
   * 值来源于款式字典
   */
  clothingStyle?: string;
  /**
   * 版单提交时间
   */
  submitTime?: number;
  /**
   * 是否拼接 0 否 1是
   */
  isSplicing?: boolean;
}

export interface IQuerySkcListByCodeReq {
  /**
   * 设计款号
   */
  designCode: string;
}
export type IQuerySkcListByCodeRes = {
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 颜色
   */
  color: string;
  /**
   * 颜色编码 -v5.10
   */
  colorCode: string;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled: boolean;
}[];

export interface IUpdateSkcInfoReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 最新版本号
   */
  latestVersionNum: string;
  /**
   * 复色款号
   */
  makeSameDesignCode?: string;
  /**
   * 颜色
   */
  color: string;
  colorInfoList: {
    /**
     * 颜色英文名
     */
    colorEnglishName: string;
    /**
     * 颜色编码 -v5.10
     */
    colorCode: string;
    /** 颜色英文缩写 */
    colorAbbrCode: string;
    /** 色号 */
    colorNumber: string;
  }[];
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
  splitRemark?: string;
  /**
   * 裁剪备注
   */
  cuttingRemark?: string;
  /**
   * 车缝工艺备注
   */
  sewingRemark?: string;
  /**
   * 版型备注
   */
  typeRemark?: string;
  /**
   * 修改原因 （第一个拆版不需要传）
   */
  modifyReason?: string;
  /**
   * 是否拼接 false-不拼接; true-拼接
   */
  isSplicing: boolean;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
}
export interface IUpdateSkcInfoRes {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * skc下最新版本的bom单id
   */
  latestVersionBomId?: string;
  /**
   * bom表单编号
   */
  bomCode?: string;
}

export interface ILatestBaseInfoReq {
  /**
   * 设计款号
   */
  designCode: string;
}

export interface ILatestBaseInfoRes {
  /**
   * 主键id
   */
  bomId?: string;
  /**
   * bom表单编号
   */
  bomCode?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 设计款skc编号
   */
  designCode?: string;
  /**
   * bom订单状态 WAIT_SUBMIT:待提交 SUBMITTED:已提交 WAIT_CALCULATED:待核算 CALCULATED:已核算 CLOSED:已关闭
   */
  bomOrderState?: BOM_ORDER_STATUS_ENUMS;
  /**
   * 找料状态: 0-否; 1-是 (默认0) --v3.11
   */
  materialSearchState?: string;
  /**
   * bom提交时间
   */
  submitTime?: number;
  /**
   * 创建时间
   */
  createdTime?: number;
}

// ⬇️ 根据skc查询最新bom单物料图片信息请求体 接口：https://yapi.tiangong.site/project/37/interface/api/5290
/**
 * 入参
 */
export interface IBomMaterialPictureReq {
  /**
   * skc集合
   */
  designCodeList: string[];
}
// ⬆️ 根据skc查询最新bom单物料图片信息请求体

// ⬇️ 根据skc查询最新bom单物料图片信息响应体 接口：https://yapi.tiangong.site/project/37/interface/api/5290
/**
 * 响应数据
 */
export interface IBomMaterialPictureResItem {
  /**
   * SPU
   */
  styleCode: string;
  /**
   * 设计款skc编号
   */
  designCode: string;
  /**
   * 最新bom单-辅料图片
   */
  accessoriesPictureList: string[];
}
// ⬆️ 根据skc查询最新bom单物料图片信息响应体

/**
 * 新建SPU 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103627
 */
export interface DesignSpuSaveReq {
  /** 款式品类编码 */
  categoryCode: string;
  /** 款式品类名 */
  categoryName: string;
  /** 款式标签编码 */
  styleLabelCode: string;
  /** 款式标签名称 */
  styleLabelName: string;
  /** 店铺id */
  storeId: string;
  /** 店铺名称 */
  storeName: string;
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 波段编码 */
  waveBandCode?: string;
  /** 波段名称 */
  waveBandName?: string;
  /** 款式等级 */
  styleLevelName: string;
  /** 款式等级编号 */
  styleLevelCode: string;
  /** 品质等级 */
  qualityLevelName: string;
  /** 品质等级编号 */
  qualityLevelCode: string;
  /** 织造方式code */
  weaveModeCode: string;
  /** 织造方式名称 */
  weaveModeName: string;
  /** 款式风格名称 */
  clothingStyleName: string;
  /** 款式风格编码 */
  clothingStyleCode: any;
  /** 印花编码 */
  printingCode: string;
  /** 印花名称 */
  printingName: string;
  /** 季节编码 */
  seasonCode: string;
  /** 季节名称 */
  seasonName: string;
  /** 视觉形式编码 */
  visualFormCode: string;
  /** 视觉形式名称 */
  visualFormName: string;
  /** 节日编码 */
  galaCode?: string;
  /** 节日名称 */
  galaName?: string;
  /** 版型编码 */
  patternCode: string;
  /** 版型名称 */
  patternName: string;
  /** 弹性编码 */
  elasticCode: string;
  /** 弹性名称 */
  elasticName: string;
  /** 场景名称 */
  sceneName?: string;
  /** 场景编码 */
  sceneCode?: string;
  /** sku类别编码 */
  skuClassCode?: string;
  /** sku类别名称 */
  skuClassName?: string;
  category?: any;
  styleSeason?: any;
  qualityLevel?: any;
  categoryList?: any;
  styleCode?: string;
  styleSeasonList?: any;
  versionNum?: number;
  designStyleId?: string;
  /** 款式类型编码 */
  designTypeCode?: string;
  /** 款式类型名称 */
  designTypeName?: string;
}
/**
 * SKC日志查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103642
 */
export interface LogListReq {
  /** 设计款号 skc */
  designCode: string;
}
/**
 * SKC日志查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103642
 */
export type LogListRes = LogListResItem[];

/**
 *  单项响应数据
 */
export interface LogListResItem {
  /** id */
  designLogId?: number;
  /** 业务id */
  bizId?: number;
  /** 业务类型:
 1:设计拆版 2:物料确认(旧) 3:开发bom 4:采购申请 5:采购齐套管理 6:上新管理(旧) 7:设计需求(旧);  8:需求任务(旧); 9:灵感设计需求; 10: 数码印花 */
  bizType?: string;
  /** 成衣SPU(款式SPU) */
  styleCode?: string;
  /** 设计款号 */
  designCode?: string;
  /** 业务版本号 */
  bizVersionNum?: number;
  /** 日志信息 */
  content?: string;
  /** 操作人id */
  creatorId?: number;
  /** 操作人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
}
/**
 * 提交 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103654
 */
export interface PrototypeManageSaveReq {
  /** 设计款号。 skc+年月日+4位流水号 */
  designCode: string;
  /** 最新版本号 */
  latestVersionNum: number;
  /** 复色款号 */
  makeSameDesignCode?: string;
  /** 颜色名称 */
  color?: string;
  /** 颜色集合 */
  colorInfoList: PrototypeManageSaveReqColorInfoListItem[];
  /** 设计图片 */
  designPicture: string[];
  /** 尺码标准 */
  sizeStandard: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 样衣尺码 */
  sampleSize: string;
  /** 拆版备注 */
  // splitRemark?: string;
  /** 裁剪备注 */
  cuttingRemark?: string;
  /** 车缝工艺备注 */
  sewingRemark?: string;
  /** 版型备注 */
  typeRemark?: string;
  /** 是否拼接 false-不拼接; true-拼接 */
  isSplicing?: boolean;
  /** 参考款号 */
  referenceDesignCode?: string;
  /** SPU图片材料信息 */
  materialInfo?: PrototypeManageSaveReqMaterialInfoItem[];
  prototypeId?: string;
  makeClothesType?: number;
  preDisassemblyState?: number;
}

/**
 * SPU图片材料信息
 */
export interface PrototypeManageSaveReqMaterialInfoItem {
  /** SPU编码 */
  styleCode?: string;
  /** 素材url */
  materialUrl?: string;
  /** 材料类型: 0-图片; 1-视频 */
  materialType?: number;
}

/**
 * 颜色集合
 */
export interface PrototypeManageSaveReqColorInfoListItem {
  /** 颜色名称 */
  color: string;
  /** 颜色英文名 */
  colorEnglishName: string;
  /** 颜色编码 */
  colorCode: string;
  /** 颜色编码缩写 */
  colorAbbrCode: string;
  /** 色号 */
  colorNumber: string;
}
/**
 * 提交 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103654
 */
export interface PrototypeManageSaveRes {
  /** 设计款号。 skc+年月日+4位流水号 */
  designCode?: string;
  /** skc下最新版本的bom单id */
  latestVersionBomId?: number;
  /** bom表单编号 */
  bomCode?: string;
}
/**
 * 新建 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103669
 */
export interface RemarksSaveReq {
  /** 业务id */
  bizId: string;
  /** 业务类型 */
  bizType: REMARK_BIZ_TYPE_ENUM;
  /** 备注信息 */
  remark: string;
  /** 业务子id 如：BOM单具体的某个物料主键id */
  bizChildId?: number;
  /** 暂存状态: 0:非暂存; 1,暂存; (默认0) */
  transientState?: number;
}
/**
 * 新建 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103669
 */
export interface RemarksSaveRes {
  /** 自增id */
  designRemarksId?: number;
  /** 业务id */
  bizId?: number;
  /** 业务类型 */
  bizType?: string;
  /** 成衣SPU(款式SPU)。SPU+年份+6位流水号 */
  styleCode?: string;
  /** 设计款号。 skc+年月日+4位流水号 */
  designCode?: string;
  /** 业务版本号 */
  bizVersionNum?: number;
  /** 备注信息 */
  remark?: string;
  /** 操作人id */
  creatorId?: number;
  /** 操作人名称 */
  createdName?: string;
  /** 创建时间 */
  createdTime?: string;
}
/**
 * 批量查询-根据设计款号批量查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103672
 */
export interface BatchListReq {
  /** 注释 */
  bizIds?: string[];
}
/**
 * 批量查询-根据设计款号批量查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103672
 */
export interface BatchListRes {
  /** 注释 */
  key?: BatchListResKeyItem[];
}

/**
 * 注释
 */
export interface BatchListResKeyItem {
  /** 自增id */
  designRemarksId?: number;
  /** 业务id */
  bizId?: number;
  /** 业务类型 */
  bizType?: string;
  /** 成衣SPU(款式SPU)。SPU+年份+6位流水号 */
  styleCode?: string;
  /** 设计款号。 skc+年月日+4位流水号 */
  designCode?: string;
  /** 业务版本号 */
  bizVersionNum?: number;
  /** 备注信息 */
  remark?: string;
  /** 操作人id */
  creatorId?: number;
  /** 操作人名称 */
  createdName?: string;
  /** 创建时间 */
  createdTime?: string;
}

/**
 * 设计师列表查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103801
 */
export interface DesignerListReq {
  /** 设计师id【设计师】 */
  designerId?: string;
  /** 设计师编号【设计师】 */
  designerCode?: string;
  /** 设计师名称【设计师】 */
  designerName?: string;
  /** 设计师组别编码 */
  designerGroupCode?: string;
  /** 设计师组别名称 */
  designerGroupName?: string;
}
/**
 * 设计师列表查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103801
 */
export type DesignerListRes = DesignerListResItem[];

/**
 *  单项响应数据
 */
export interface DesignerListResItem {
  /** 注释 */
  id?: number;
  /** 设计师id【设计师】 */
  designerId?: string;
  /** 设计师编号【设计师】 */
  designerCode?: string;
  /** 设计师名称【设计师】 */
  designerName?: string;
  /** 设计师组别编码 */
  designerGroupCode?: string;
  /** 设计师组别名称 */
  designerGroupName?: string;
  /** 手机号码 */
  mobilePhone?: string;
}
