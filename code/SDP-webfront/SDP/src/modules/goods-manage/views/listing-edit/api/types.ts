/**
 * 仓库列表查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106930
 */
export interface TemuWarehouseReq {
  /** 主键 ID */
  shopId?: string;
  /** 站点 ID */
  siteId?: string;
}

/**
 * 仓库列表查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106930
 */
export type TemuWarehouseRes = TemuWarehouseResItem[];

/**
 *  单项响应数据
 */
export interface TemuWarehouseResItem {
  /** 仓库是否失效 */
  warehouseDisable?: boolean;
  /** 仓库 ID */
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 仓库类型
0: 三方仓, 1:自建仓, 2:家庭仓, 3:其他(仅适用于9个工作日发货时效的商品) */
  managementType?: string;
}
/**
 * 分页 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106336
 */
export interface CategoryMappingPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 平台编码 */
  platformCode?: string;
  /** 品类编码 */
  categoryCode?: string;
  /** 创建开始时间 */
  createdStartTime?: string;
  /** 创建结束时间 */
  createdEndTime?: string;
  /** 创建人 id */
  creatorId?: number;
  /** 创建人姓名 */
  creatorName?: string;
}
/**
 * 分页 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106336
 */
export interface CategoryMappingPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: CategoryMappingPageResListItem[];
}

/**
 * 注释
 */
export interface CategoryMappingPageResListItem {
  /** 创建人 ID */
  creatorId?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 创建时间 */
  createdTime?: string;
  /** 修改人 ID */
  reviserId?: number;
  /** 修改人名称 */
  reviserName?: string;
  /** 更新时间 */
  revisedTime?: string;
  /** 映射 ID */
  mappingId?: number;
  /** 平台编码 */
  platformCode?: string;
  /** 平台名称 */
  platformName?: string;
  /** 品类编码 */
  categoryCode?: string;
  /** 品类名 */
  categoryName?: string;
  /** 关联平台品类 ID */
  platformCategoryCode?: string;
  /** 关联平台品类名称 */
  platformCategoryName?: string;
  /** 信息备注 */
  message?: string;
}
/**
 * 新增商品 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106312
 */
export interface ProductCreateReq {
  /** 审核结果
  通过：true
  不通过：false */
  pass: Boolean | undefined;
  /** 款式图 */
  styleImgUrl?: string;
  /** 审核不通过原因，不通过时候必填 */
  reviewFailReason?: string;
  /** 店铺 id */
  storeId?: string;
  /** 款ID */
  styleId?: string;
  /** 款号 */
  styleCode?: string;
  /** 品类 ID */
  catId?: number;
  /** 品类 ID */
  catName?: string;
  /** 中文标题 */
  productName?: string;
  /** 英文标题 */
  productEnName?: string;
  /** 素材图 */
  materialImgUrl?: string;
  /** 承诺发货天 */
  promisedDeliveryDay?: string;
  /** 运费模板 ID */
  freightTemplateId?: string;
  /** 尺码组 ID */
  groupId?: number;
  /** 尺码 */
  sizes?: string[];
  /** 仓库 ID */
  warehouseIds?: string[];
  /** 尺寸图片 */
  sizeImages?: string[];
  /** 视频 */
  video?: ProductCreateReqVideo;
  /** 站点 */
  siteIds?: number[];
  /** 商品属性 */
  attrs?: ProductCreateReqAttrsItem[];
  /** 销售属性 */
  specAttrs?: ProductCreateReqSpecAttrsItem[];
  /** skc 列表 */
  skcReqs?: ProductCreateReqSkcReqsItem[];
  /** 尺码 列表 */
  sizeReqs?: ProductCreateReqSizeReqsItem2[];
}

/**
 * 注释
 */
export interface ProductCreateReqSizeReqsItem2 {
  /** 尺码参数组元数据 */
  elementList?: any;
  /** 名称 */
  name?: string;
  /** 重点部位
Yes:重点部位 */
  show?: string;
  /** 尺码 列表 */
  sizeReqs?: ProductCreateReqSizeReqsItem[];
}

/**
 * 尺码 列表
 */
export interface ProductCreateReqSizeReqsItem {
  /** 尺码 */
  size?: string;
  /** 平台尺码 */
  platformSize?: string;
  /** 部位尺码 */
  values?: ProductCreateReqValuesItem[];
  /** 尺码参数组元数据 */
  elementList?: ProductCreateReqElementListItem[];
}

/**
 * 注释
 */
export interface ProductCreateReqElementListItem {
  /** name */
  name?: string;
  /** ID */
  id?: number;
}

/**
 * 注释
 */
export interface ProductCreateReqValuesItem {
  /** 部位 */
  part?: number;
  /** 部位值 */
  value?: number;
  /** 部档差值 */
  diff?: number;
}

/**
 * skc 列表
 */
export interface ProductCreateReqSkcReqsItem {
  skcState?: number;
  /** SKC ID */
  skcId?: string;
  /** SKC 编码 */
  skcCode?: string;
  /** 颜色 */
  color?: string;
  /** 平台颜色 */
  platformColor?: string;
  /** 主销售属性 */
  mainSpecReqs?: ProductCreateReqMainSpecReqsItem[];
  /** SKU 列表 */
  skuReqs?: ProductCreateReqSkuReqsItem[];
  /** 图片 */
  images?: string[];
}

/**
 * 注释
 */
export interface ProductCreateReqSkuReqsItem {
  productSkuId?: string;
  /** 供货价 */
  supplierPrice?: number;
  /** 货品 sku 重量 */
  skuWeightValue?: number;
  /** 长 */
  len?: number;
  /** 宽 */
  width?: number;
  /** 高 */
  height?: number;
  /** sku分类单品数量，sku分类为单品的默认是1，sku分类为混合套装时，单品数量需要等于包装清单物品数量之和 */
  numberOfPieces?: number;
  /** sku分类，1：单品，2：同款多件装，3：混合套装 */
  skuClassification?: number;
  /** 发货仓库存库存请求列表 */
  warehouseStockQuantityReqs?: ProductCreateReqWarehouseStockQuantityReqsItem[];
  /** SKU 规格 */
  skuSpecReqs?: ProductCreateReqMainSpecReqsItem[];
  /** 是否独立包装(0=否 1=是)当sku分类为同款多件装或混合套装时，必填 */
  individuallyPacked?: number;
  /** 包装数量(对应Temu内计共含),2：同款多件装，3：混合套装时候 */
  numberOfPack?: number;
  /** 包装清单 */
  packingList?: ProductCreateReqPackingListItem[];
}
/**
 * 注释
 */
export interface ProductCreateReqPackingListItem {
  /** 品类 ID */
  catId?: number;
  /** 品类 ID */
  catName?: string;
  /** sku分类单品数量，sku分类为单品的默认是1，sku分类为混合套装时，单品数量需要等于包装清单物品数量之和 */
  numberOfPieces?: number;
}
/**
 * 注释
 */
export interface ProductCreateReqWarehouseStockQuantityReqsItem {
  /** 默认传:0 */
  targetStockAvailable?: string;
  /** 仓库 ID */
  warehouseId?: string;
}

/**
 * 注释
 */
export interface ProductCreateReqMainSpecReqsItem {
  /** 父规格 id */
  parentSpecId?: string;
  /** 父规格名称 */
  parentSpecName?: string;
  /** 规格 id */
  specId?: number;
  /** 规格名称 */
  specName?: string;
}

/**
 * 销售属性
 */
export interface ProductCreateReqSpecAttrsItem {
  name?: string;
  /** 模板属性 id */
  templatePid?: number;
  /** 属性 id */
  pid?: number;
  /** 引用属性 id */
  refPid?: number;
  /** 基础属性值id，没有的情况传0 */
  vid?: number;
  /** 引用属性名 */
  propName?: string;
  /** 基础属性值 */
  propValue?: string;
  /** 父规格 id */
  parentSpecId?: number;
  /** 父规格名称 */
  parentSpecName?: string;
  /** 规格 id */
  specId?: number;
  /** 规格名称 */
  specName?: string;
  /** 属性值组id，没有的情况传0 */
  valueGroupId?: number;
  /** 属性值组名称，没有的情况传空字符串 */
  valueGroupName?: string;
  /** 数值录入 */
  numberInputValue?: string;
  /** 属性值单位，没有的情况传空字符串 */
  valueUnit?: string;
  /** 值扩展属性 */
  valueExtendInfo?: string;
}

/**
 * 商品属性
 */
export interface ProductCreateReqAttrsItem {
  /** 模板属性 id */
  templatePid?: number;
  /** 属性 id */
  pid?: number;
  /** 引用属性 id */
  refPid?: number;
  /** 引用属性名 */
  propName?: string;
  /** 基础属性值id，没有的情况传0 */
  vid?: number;
  /** 基础属性值 */
  propValue?: string;
  /** 属性值单位，没有的情况传空字符串 */
  valueUnit?: string;
  /** 数值录入 */
  numberInputValue?: string;
  /** 值扩展属性 */
  valueExtendInfo?: string;
}

/**
 * 视频
 */
export interface ProductCreateReqVideo {
  /** 视频封面图 */
  coverUrl?: string;
  /** 视频 */
  videoUrl?: string;
  /** 宽 */
  width?: number;
  /** 高 */
  height?: number;
}
/**
 * 新增商品 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106312
 */
export interface ProductCreateRes {
}
/**
 * 编辑商品图 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/108298
 */
export interface ProductFileEditReq {
  /** 商品 ID */
  productId: string;
  /** 素材图 */
  materialImgUrl?: string;
  /** 视频 */
  videoUrl?: string;
  /** SKC 图片列表 */
  skcs?: ProductFileEditReqSkcsItem[];
}

/**
 * SKC 图片列表
 */
export interface ProductFileEditReqSkcsItem {
  /** 商品SKC ID */
  productSkcId: number;
  /** 图片 */
  images?: string[];
}
/**
 * 编辑商品图 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/108298
 */
export interface ProductFileEditRes {
}
/**
 * 货品包装清单类型查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/113887
 */
export interface TemuAccessoriesReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 店铺 ID */
  shopId: string;
  /** 属性值（模糊搜索） */
  fuzzyValue?: string;
  /** 属性ID */
  vidList?: number[];
}
/**
 * 货品包装清单类型查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/113887
 */
export type TemuAccessoriesRes = TemuAccessoriesResItem[];

/**
 *  单项响应数据
 */
export interface TemuAccessoriesResItem {
  /** 注释 */
  unitName?: string;
  /** 注释 */
  value?: string;
  /** 注释 */
  vid?: number;
  /** 注释 */
  unitCode?: number;
}
