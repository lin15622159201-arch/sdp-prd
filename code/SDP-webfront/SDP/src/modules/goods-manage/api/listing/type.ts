import { YES_NO_NUMBER_ENUM } from '@/constant';
import { RELEASE_STATUS_ENUM, REVIEW_STATUS_ENUM, SHOP_REVIEW_STATUS_ENUM } from '../../constant';

export type IStyleOnShelvesPageReq = {
  pageNum?: number;
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
  /** 款号 */
  styleCode?: string;
  /** 设计师id【设计师】 */
  designerId?: number;
  /** 店铺id */
  storeId?: string;
  /** 审核人ID */
  reviewUserId?: string;
  /** 审核开始时间 */
  reviewStartTime?: string;
  /** 审核结束时间 */
  reviewEndTime?: string;
  /** 波段编码 */
  waveBandCode?: string;
  /** 款式标签编码 */
  styleLabelCode?: string;
  /** 审核状态，0-待审核，1-已通过，2-已驳回 */
  reviewStatus?: REVIEW_STATUS_ENUM;
  /** 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败 */
  releaseStatus?: RELEASE_STATUS_ENUM;
  /** 前置拆版状态 */
  preDisassemblyState?: YES_NO_NUMBER_ENUM;
};

export type IStyleOnShelvesPageRes = {
  pageNum: number;
  total: number;
  list: IStyleOnShelvesPageItem[];
};

export type IStyleOnShelvesPageItem = {
  productPlatformName?: string;
  /** 创建人id */
  creatorId: number;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人ID */
  reviserId: number;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
  /** 任务id */
  taskId: number;
  /** 任务编号 */
  taskCode: string;
  /** 款ID */
  styleId: string;
  /** SPU款号 */
  styleCode: string;
  /** SPU图片信息 */
  spuImageList: IPicturItem[];
  /** 款式品类编码 */
  categoryCode: string;
  /** 款式品类名 */
  categoryName: string;
  /** 款式标签 */
  styleLabelName?: string;
  /** 项目类型 */
  projectTypeName?: string;
  /** 开款类型 */
  styleType: string;
  /** 平台编码 */
  platformCode: string;
  /** 平台名称 */
  platformName: string;
  /** 店铺id */
  storeId: string;
  /** 店铺名称 */
  storeName: string;
  /** 运营人员ID */
  operationUserId: number;
  /** 运营人员名称 */
  operationUserName: string;
  /** 审核状态，0-待审核，1-已通过，2-已驳回 */
  reviewStatus: REVIEW_STATUS_ENUM;
  /** 审核失败原因 */
  reviewFailReason: string;
  /** SKC信息 */
  skcList: IStyleOnShelvesPageItemSkcItem[];
  /** 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败 */
  releaseStatus: RELEASE_STATUS_ENUM;
  /** 发布失败原因 */
  releaseFailReason: string;
  /** 审核人ID */
  reviewUserId: string;
  /** 审核人名称 */
  reviewUserName: string;
  /** 审核时间 */
  reviewTime: string;
  /** 波段编码 */
  waveBandCode: string;
  /** 波段名称 */
  waveBandName: string;
  /** 前置拆版状态 */
  preDisassemblyState: YES_NO_NUMBER_ENUM;
  /** 店铺审核状态，1-已通过，2-已驳回 */
  shopReviewStatus?: SHOP_REVIEW_STATUS_ENUM;
  /** 店铺审核人ID */
  shopReviewUserId?: number;
  /** 店铺审核人名称 */
  shopReviewUserName?: string;
  /** 店铺审核时间 */
  shopReviewTime?: string;
  /** 店铺审核驳回原因 */
  shopReviewFailReason?: string;
};

export type IStyleOnShelvesPageItemSkcItem = {
  /** 主键id */
  skcId: string;
  /** 款ID */
  styleId: string;
  /** SKC编码 */
  skcCode: string;
  /** 上架状态：1-上架；0-下架； */
  onShelvesStatus: number;
  /** 是否拼接：1-拼接； */
  spliced: number;
  /** 主图url */
  mainImgUrl: string;
  /** 颜色名称 */
  color: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码 */
  sizeName: string;
  /** 尺码编码 */
  sizeCode: string;
  /** 附件 */
  attachment: string;
  pictures: IPicturItem[];
  /** 前置拆版状态 */
  preDisassemblyState: YES_NO_NUMBER_ENUM;
};

export type IPicturItem = {
  /** 图片ID */
  pictureId: string;
  /** 款ID */
  styleId: string;
  /** SKC-ID */
  skcId: string;
  /** 图片类型，0-商品图，1-尺码图 */
  pictureType: number;
  /** 材料类型: 0-图片; 1-视频 */
  materialType: number;
  /** 图片URL */
  pictureUrl: string;
  /** 裁剪图 */
  cropImgUrl: string;
  /** 序号 */
  serialNum: number;
};

export type IStyleOnShelvesDetailRes = {
  /** 款ID */
  styleId: string;
  /** 款号 */
  styleCode: string;
  /** 平台id */
  platformProductId?: string;
  /** 开款类型 */
  styleType: string;
  /** 数据来源 */
  sourceType: string;
  /** 审核状态，0-待审核，1-已通过，2-已驳回 */
  reviewStatus: number;
  /** 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败 */
  releaseStatus: number;
  /** 审核人ID */
  reviewUserId: string;
  /** 审核人名称 */
  reviewUserName: string;
  /** 审核时间 */
  reviewTime: string;
  /** 发布失败原因 */
  releaseFailReason: string;
  /** 设计师id【设计师】 */
  designerId: number;
  /** 设计师名称【设计师】 */
  designerName: string;
  /** 设计组名称【设计组】 */
  designerGroupName: string;
  /** 套装件数 */
  suitPiece: number;
  /** 主图url */
  mainImgUrl: string;
  /** 供给方式编码 */
  supplyModeCode: string;
  /** 供给方式 */
  supplyModeName: string;
  /** 店铺id */
  storeId: string;
  /** 店铺名称 */
  storeName: string;
  /** 场景编码 */
  sceneCode: string;
  /** 场景名称 */
  sceneName: string;
  /** 品质等级编号 */
  qualityLevelCode: string;
  /** 品质等级 */
  qualityLevelName: string;
  /** 款式等级编号 */
  styleLevelCode: string;
  /** 款式等级 */
  styleLevelName: string;
  /** 织造方式code */
  weaveModeCode: string;
  /** 织造方式 */
  weaveModeName: string;
  /** 波段编码 */
  waveBandCode: string;
  /** 波段名称 */
  waveBandName: string;
  /** 款式品类编码 */
  categoryCode: string;
  /** 款式品类名 */
  categoryName: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 尺码标准 */
  sizeStandardName: string;
  /** 款式风格编码 */
  clothingStyleCode: string;
  /** 款式风格名称 */
  clothingStyleName: string;
  /** 现货类型编码 */
  spotStyleTypeCode: string;
  /** 现货类型名称 */
  spotStyleTypeName: string;
  /** 货盘类型编码 */
  palletTypeCode: string;
  /** 货盘类型名称 */
  palletTypeName: string;
  /** 平台编码 */
  platformCode: string;
  /** 平台名称 */
  platformName: string;
  /** 印花编码 */
  printingCode: string;
  /** 印花名称 */
  printingName: string;
  /** 版型编码 */
  patternCode: string;
  /** 版型名称 */
  patternName: string;
  /** 弹性编码 */
  elasticCode: string;
  /** 弹性名称 */
  elasticName: string;
  /** 季节编码 */
  seasonCode: string;
  /** 季节名称 */
  seasonName: string;
  /** 节日编码 */
  galaCode: string;
  /** 节日名称 */
  galaName: string;
  /** 视觉形式编码 */
  visualFormCode: string;
  /** 视觉形式名称 */
  visualFormName: string;
  /** sku类别编码 */
  skuClassCode: string;
  /** sku类别名称 */
  skuClassName: string;
  /** 款式标签编码 */
  styleLabelCode: string;
  /** 款式标签名称 */
  styleLabelName: string;
  /** 商品链接 */
  commodityLink: string;
  /** 开发人id */
  developerId: number;
  /** 开发人名称 */
  developerName: string;
  /** 成衣毛重 */
  clothGrossWeight: number;
  /** 标题数据 */
  titleData: string;
  /** 标题详情 */
  details: string;
  /** 中文标题 */
  chineseTitle: string;
  /** 英文标题 */
  englishTitle: string;
  /** 可用的标签 */
  usableLabels: string;
  /** 面料材质 */
  fabricMaterial: string;
  /** 面料风格 */
  fabricStyle: string;
  /** 面料纹理 */
  fabricTexture: string;
  /** 面料图案 */
  pattern: string;
  /** 成分 */
  styleIngredient: string;
  /** 附件[]字符串数组 */
  attachment: string;
  /** 尺码附件[]字符串数组 */
  sizeAttachment: string;
  /** 透明度 */
  transparency: string;
  /** SKC数组信息 */
  skcList: IStyleOnShelevesDetailSkcItem[];
  /** 现货尺寸图数组 */
  sizeImageList: string[];
  /** 创建时间 */
  createdTime: string;
  /** 承诺发货时效 */
  deliveryTime: string;
  /** 素材图 */
  materialImgUrl: string;
};

export type IStyleOnShelevesDetailSkcItem = {
  /** 主键id */
  skcId: string;
  /** 款ID */
  styleId: string;
  /** SKC编码 */
  skcCode: string;
  /** 上架状态：1-上架；0-下架； */
  onShelvesStatus: number;
  /** 是否拼接：1-拼接； */
  spliced: number;
  /** 主图url */
  mainImgUrl: string;
  /** 颜色名称 */
  color: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码 */
  sizeName: string;
  /** 尺码编码 */
  sizeCode: string;
  /** 附件 */
  attachment: string;
  pictures: IPicturItem[];
  skuList?: any;
  /** 前置拆版状态 */
  preDisassemblyState: YES_NO_NUMBER_ENUM;
};

export type IStyleOnShelvesReviewReq = {
  /** 款号ID */
  styleId: string;
  /** 审核结果 */
  pass: boolean;
  /** 审核不通过原因，不通过时候必填 */
  reviewFailReason?: string;
};

export type IStyleOnShelvesStateTotalReq = {
  pageNum?: number;
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
  /** SPU款号 */
  styleCode?: string;
  /** SKC编码 */
  designCode?: string;
  /** 设计师id【设计师】 */
  designerId?: number;
  /** 店铺id */
  storeId?: string;
  /** 审核人ID */
  reviewUserId?: string;
  /** 审核开始时间 */
  reviewStartTime?: string;
  /** 审核结束时间 */
  reviewEndTime?: string;
  /** 波段编码 */
  waveBandCode?: string;
  /** 款式标签编码 */
  styleLabelCode?: string;
  /** 审核状态，0-待审核，1-已通过，2-已驳回 */
  reviewStatus?: REVIEW_STATUS_ENUM;
  /** 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败 */
  releaseStatus?: RELEASE_STATUS_ENUM;
};

/**
 * 查询任务总数-响应结果
 */
export type IStyleOnShelvesStateTotalRes = {
  /** 审核状态 */
  reviewStatus: {
    /** 状态 */
    taskStatus: REVIEW_STATUS_ENUM;
    /** 总数 */
    total: number;
  }[];
  /** 发布状态 */
  releaseStatus: {
    /** 状态 */
    taskStatus: RELEASE_STATUS_ENUM;
    /** 总数 */
    total: number;
  }[];
};

export type IPushShopReviewReq = {
  /** 款号ID */
  styleIds: string[];
};

/**
 * 批量发布或关联平台商品 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/113599
 */
export interface ProductBatchPublishOrAssociateReq {
  /** 注释 */
  styleIds?: number[];
  /** 注释 */
  associateProductList?: ProductBatchPublishOrAssociateReqAssociateProductListItem[];
}

/**
 * 关联商品 (选择关联历史商品时必填)
 */
export interface ProductBatchPublishOrAssociateReqAssociateProductListItem {
  /** 商品ID (选择关联历史商品时必填) */
  productId?: number;
  /** 商品SKC ID (选择关联历史商品时必填) */
  productSkcId?: number;
  /** 平台商品ID (选择关联历史商品时必填) */
  platformProductId?: number;
  /** 平台商品SKC ID (选择关联历史商品时必填) */
  platformSkcId?: number;
  /** 平台SKU列表 (选择关联历史商品时必填) */
  platformSkuList?: ProductBatchPublishOrAssociateReqPlatformSkuListItem[];
  platformSkcList?: { isAssociated: number; }[];
}

/**
 * 注释
 */
export interface ProductBatchPublishOrAssociateReqPlatformSkuListItem {
  /** 平台SKU ID (选择关联历史商品时必填) */
  platformSkuId?: number;
  /** 平台SKU编码 (选择关联历史商品时必填) */
  extCode?: string;
}
/**
 * 批量发布或关联平台商品 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/113599
 */
export interface ProductBatchPublishOrAssociateRes {
}
