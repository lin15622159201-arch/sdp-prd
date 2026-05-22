// 现货管理-查询任务列表 https://yapi.textile-story.com/project/1361/interface/api/103483
/**
 * 现货管理-查询任务列表-请求参数
 */
export type ISpotStylePageReq = {
  pageNum?: number;
  pageSize?: number;
  /** 任务编号(多个,分割) */
  taskCode?: string;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人id */
  creatorId?: string;
  /** 创建人姓名 */
  creatorName?: string;
  /** 同组 1:组内 */
  sameGroup?: string;
  /** 商品主图 1：已齐全 */
  hasMainImg?: string;
  /** 资料状态 1：已完善 */
  dataCompleted?: string;
  /** 待上架 1：待上架 0：待推送 */
  upcoming?: string;
  /** 上架 1：上架 0：下架 */
  onShelves?: string;
  /** 已取消 1：已取消 */
  cancelled?: string;
  /** 供给方式编码 */
  supplyModeCodes?: string[];
  /** SKC */
  skcCode?: string;
  /** 款式品类编码 */
  categoryCodes?: string[];
  /** 图片修复状态 */
  imageUpdateStatus?: number;
  /** 款式标签 */
  styleLabelCodes?: string[];
  /** 供应商款号 */
  supplierStyleCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  sold?: string;
  pushType?: string;
  pushedBuyer?: string;
  pushFailed?: string;
  buyerCancelled?: string;
  /**
   * 失败原因
   */
  onShelvesFail?: string;
};

/**
 * 现货管理-查询任务列表-响应参数
 */
export type ISpotStylePageRes = {
  pageNum: number;
  total: number;
  list: ISpotStylePageItem[];
};

export type ISpotStylePageItem = {
  /** 任务id */
  taskId: string;
  /** 任务编号 */
  taskCode: string;
  /** 商品主图 1：已齐全 */
  hasMainImg: string;
  /** 资料状态 1：已完善 */
  dataCompleted: string;
  /** 已取消 1：已取消 */
  cancelled: string;
  /** 开款类型 */
  styleType?: string;
  /** 款式品类编码 */
  categoryCode: string;
  /** 款式品类名 */
  categoryName: string;
  /** 店铺id */
  storeId: string;
  /** 店铺名称 */
  storeName: string;
  /** 主图url */
  mainImgUrl: string;
  /** 创建时间 */
  createdTime: string;
  /** 更新时间 */
  revisedTime: string;
  /** 图片修复id */
  imageUpdateId: number;
  /** image_update_code */
  imageUpdateCode: string;
  /** 图片修复状态 */
  imageUpdateStatus: number;
  /** 图片修复时间 */
  imageUpdateTime: string;
  /** 货盘类型名称 */
  palletTypeName?: string;
  /** 货盘类型编码 */
  palletTypeCode?: string;
  /** 现货类型编码 */
  spotStyleTypeCode?: string;
  /** 现货类型名称 */
  spotStyleTypeName?: string;
  /** 信息备注 */
  message: string;
  /** SKC */
  skcs: ISpotStyleSkc[];
  /** 供应商 */
  suppliers: ISpotStyleSupplier[];
  /** 商品图 */
  productImages: ISpotStyleSkcProductImage[];
  /** 尺码组名称 */
  sizeStandardName: string;
  /** 尺码组编码 */
  sizeStandardCode: string;
  /** 动销时间 */
  saleTime?: string;
  /** 已推送买手
  1：已推送买手 */
  pushedBuyer?: string;
  /** 推送买手失败
  1：推送买手失败 */
  pushFailed?: string;
  /** 买手取消
  1：买手取消 */
  buyerCancelled?: string;
  failMessage?: string;
  onShelvesFail?: string;
  onShelvesFailReason?: string;
};

export type ISpotStyleSkc = {
  /** SKC ID */
  skcId: string;
  /** SKC编码 */
  skcCode: string;
  /** 资料状态 1：已完善 */
  dataCompleted: string;
  /** 待上架 1：待上架 0：待推送 */
  upcoming: string;
  /** 上架 1：上架 0：下架 */
  onShelves: string;
  cancelled: string;
  /** 主图url */
  mainImgUrl: string;
  /** 颜色名称 */
  color: string;
  /** 颜色英文名 */
  colorEnName: string;
  /** 提交时间 */
  submitTime: string;
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 创建时间 */
  createdTime: string;
  /** 更新时间 */
  revisedTime: string;
  /** 商品图片 */
  productImages: ISpotStyleSkcProductImage[];
};

export type ISpotStyleSkcProductImage = {
  /** 创建人id */
  creatorId: string;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 图片ID */
  imageId: number;
  /** 图片URL */
  imageUrl: string;
  /** SKC ID */
  skcId: number;
  /** 图片类型 */
  pictureType: string;
  /** 修改人ID */
  reviserId?: number;
  /** 修改人名称 */
  reviserName?: string;
  /** 更新时间 */
  revisedTime?: string;
};

export type ISpotStyleSupplier = {
  /** 供应商ID */
  supplierId: number;
  /** 供应商编码 */
  supplierCode: string;
  /** 供应商名称 */
  supplierName: string;
  /** 收款人id */
  payeeId: string;
  /** 收款人编码 */
  payeeCode: string;
  /** 收款人名称 */
  payeeName: string;
  /** 供应商款号 */
  supplierStyleCode: string;
  /** 采购价 */
  purchasePrice: number;
};

export type ISpotStyleBatchCreateReq = ISpotStyleCreateReq[];
export type ISpotStyleCreateReq = {
  /** 主图url */
  mainImgUrl?: string;
  /** 供给方式 */
  supplyModeName: string;
  /** 供给方式编码 */
  supplyModeCode: string;
  /** 店铺id */
  storeId: string;
  /** 店铺名称 */
  storeName: string;
  /** 场景名称 */
  sceneName?: string;
  /** 场景编码 */
  sceneCode?: string;
  /** 品质等级 */
  qualityLevelName: string;
  /** 品质等级编号 */
  qualityLevelCode: string;
  /** 款式等级 */
  styleLevelName: string;
  /** 款式等级编号 */
  styleLevelCode: string;
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
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 款式风格编码 */
  clothingStyleName: string;
  /** 款式风格名称 */
  clothingStyleCode: string;
  /** 现货类型编码 */
  spotStyleTypeCode: string;
  /** 现货类型名称 */
  spotStyleTypeName: string;
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
  skuClassCode?: string;
  /** sku类别名称 */
  skuClassName?: string;
  /** 套装件数 */
  suitPiece?: number;
  /** 款式标签编码 */
  styleLabelCode: string;
  /** 款式标签名称 */
  styleLabelName: string;
  /** 货盘类型名称 */
  palletTypeName: string;
  /** 货盘类型编码 */
  palletTypeCode: string;
  /** 成衣毛重 */
  clothGrossWeight: number;
  /** 信息备注 */
  commodityLink?: string;
  /** 成分 */
  ingredients: ISptoStyleCreateReqIngredient[];
  /** 供应商 */
  suppliers: ISpotStyleCreateReqSupplier[];
  /* SKC */
  skcs: ISpotStyleCreateSkc[];
  /** 商品图片 */
  productImages: string[];
  /** 尺码图片 */
  sizeImages: string[];
};

export type ISptoStyleCreateReqIngredient = {
  /** 成分ID */
  ingredientId: number;
  /** 成分编码 */
  ingredientCode: string;
  /** 成分名称 */
  ingredientName: string;
  /** 成分比例 */
  ingredientRatio: number;
};

export type ISpotStyleCreateReqSupplier = {
  /** 供应商ID */
  supplierId: number;
  /** 供应商编码 */
  supplierCode: string;
  /** 供应商名称 */
  supplierName: string;
  /** 收款人id */
  payeeId: string;
  /** 收款人编码 */
  payeeCode: string;
  /** 收款人名称 */
  payeeName: string;
  /** 供应商款号 */
  supplierStyleCode: string;
  /** 采购价 */
  purchasePrice: number;
};

export type ISpotStyleCreateSkc = {
  /** SKC ID */
  skcId?: string;
  /** SKC编码 */
  skcCode?: string;
  /** 父任务ID */
  parentId?: number;
  /** 主图url */
  mainImgUrl: string;
  /** 颜色名称 */
  color: string;
  /** 颜色英文名 */
  colorEnName: string;
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 商品图片 */
  productImages: string[];
};

export type ISpotStyleBatchCreateRes = boolean;

export type ISpotStyleEditReq = ISpotStyleCreateReq & {
  taskId: string;
};

export type ISpotStyleDetailRes = {
  /** 创建人id */
  creatorId: string;
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
  /** 商品主图
1：已齐全 */
  hasMainImg: string;
  /** 资料状态
1：已完善 */
  dataCompleted: string;
  /** 已取消
1：已取消 */
  cancelled: string;
  /** 开款类型 */
  styleType: string;
  /** 主图url */
  mainImgUrl: string;
  /** 供给方式 */
  supplyModeName: string;
  /** 供给方式编码 */
  supplyModeCode: string;
  /** 店铺id */
  storeId: string;
  /** 店铺名称 */
  storeName: string;
  /** 场景名称 */
  sceneName: string;
  /** 场景编码 */
  sceneCode: string;
  /** 品质等级 */
  qualityLevelName: string;
  /** 品质等级编号 */
  qualityLevelCode: string;
  /** 款式等级 */
  styleLevelName: string;
  /** 款式等级编号 */
  styleLevelCode: string;
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
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 款式风格编码 */
  clothingStyleName: string;
  /** 款式风格名称 */
  clothingStyleCode: string;
  /** 现货类型编码 */
  spotStyleTypeCode: string;
  /** 现货类型名称 */
  spotStyleTypeName: string;
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
  /** 开发人id */
  developerId: number;
  /** 开发人名称 */
  developerName: string;
  /** 提交时间 */
  submitTime: string;
  /** 款式标签编码 */
  styleLabelCode: string;
  /** 款式标签名称 */
  styleLabelName: string;
  /** 核价id */
  checkPriceId: number;
  /** 核价人 */
  checkPricer: string;
  /** 核价时间 */
  checkPriceTime: string;
  /** 成衣毛重 */
  clothGrossWeight: number;
  /** 图片修复id */
  imageUpdateId: number;
  /** image_update_code */
  imageUpdateCode: string;
  /** 图片修复状态 */
  imageUpdateStatus: number;
  /** 图片修复时间 */
  imageUpdateTime: string;
  /** 货盘类型名称 */
  palletTypeName: string;
  /** 货盘类型编码 */
  palletTypeCode: string;
  /** 成分 */
  ingredients: ISptoStyleCreateReqIngredient[];
  /** 供应商 */
  suppliers: ISpotStyleSupplier[];
  /** SKC */
  skcs: ISpotStyleSkc[];
  /** 商品图片 */
  productImages: ISpotStyleSkcProductImage[];
  /** 尺码表 */
  sizeImages: ISpotStyleSkcProductImage[];
};

export type ISpotStyleEditSkcReq = {
  /** SKC ID */
  skcId: string;
  /** 任务id */
  taskId: string;
  /** 主图url */
  mainImgUrl: string;
  /** 颜色名称 */
  color: string;
  /** 颜色英文名 */
  colorEnName: string;
  /** 尺码标准 */
  sizeStandardName: string;
  /** 尺码标准编号 */
  sizeStandardCode: string;
  /** 商品图片 */
  productImages: string[];
};

export type ISpotStyleEditSkcRes = boolean;

/**
 * 复色
 * @see https://yapi.textile-story.com/project/1361/interface/api/103501
 */
export type ISpotStyleBatchReColorReq = ISpotStyleReColorReq[];
export type ISpotStyleReColorReq = Omit<ISpotStyleEditSkcReq, 'skcId'> & { parentId?: string; };
export type ISpotStyleBatchReColorRes = boolean;

export type ISpotStyleBatchCancelReq = {
  taskId: string;
  message: string;
}[];

export type ISpotStyleBatchEditImageReq = {
  taskCode: string;
  productImages: string[];
}[];
export type ISpotStyleBatchEditImageRes = {
  code: string;
  message: string;
}[];


export type ISpotStyleBatchCancelSkcReq = { skcId: string; message: string; }[];
export type ISpotStyleBatchCancelSkcRes = boolean;

export type ISpotStyleListOptRes = {
  /** 创建人id */
  creatorId?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 修改人ID */
  reviserId?: number;
  /** 修改人名称 */
  reviserName?: string;
  /** 更新时间 */
  revisedTime?: string;
  /** 操作ID */
  optId?: number;
  /** 任务ID */
  taskId?: number;
  /** 操作类型 */
  optType?: string;
  /** 操作内容 */
  content?: string;
}[];


export type IApsSupplierQueryReq = {
  /** 供应商id */
  supplierId?: number;
  /** 供应商编码,支持模糊查询 */
  supplierCode?: string;
  /** 供应商名称,支持模糊查询 */
  supplierName?: string;
};

export type IApsSupplierQueryRes = {
  /** 供应商id */
  supplierId?: number;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}[];

export type ISpotStyleListSupplierReq = {
  /** 供应商款号 */
  supplierStyleCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}[];

export type ISpotStyleListSupplierRes = {
  taskId: string;
  taskCode: string;
  /** 供应商ID */
  supplierId: number;
  /** 供应商编码 */
  supplierCode: string;
  /** 供应商名称 */
  supplierName: string;
  /** 收款人id */
  payeeId: number;
  /** 收款人编码 */
  payeeCode: string;
  /** 收款人名称 */
  payeeName: string;
  /** 供应商款号 */
  supplierStyleCode: string;
  /** 采购价 */
  purchasePrice: number;
}[];
