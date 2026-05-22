export type ITemuCategoryListResItem = {
  /** 品类 ID */
  categoryId: string;
  /** 父品类 ID */
  parentId: number;
  /** 品类名 */
  categoryName: string;
  /** 品类层级 */
  level: number;
  /** 叶子
1:叶子 */
  leaf: number;
  /** 套装
1:套装 */
  suiting: number;
  /** 可以用的
0:可用 */
  available: number;
  children?: any;
};

export type ITemuCategoryListRes = ITemuCategoryListResItem[];

/**
 * 模板列表查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106273
 */
export type TemuPropertyRes = TemuPropertyResItem[];

/**
 *  单项响应数据
 */
export interface TemuPropertyResItem {
  /** Basic attribute ID */
  pid?: number;
  /** Numeric input title */
  numberInputTitle?: string;
  /** Attribute value reference type: 0-normal, 1-external brand library */
  referenceType?: number;
  /** Template attribute ID */
  templatePid?: number;
  /** When the costTemplateId is passed in, it will return whether additional product attributes need to be filled in, which are used when shipping from non-domestic warehouses. */
  transnationalAttribute?: boolean;
  /** If required=True, attribute must be defined. */
  required?: boolean;
  /** Template attribute value type, 0-text, 1-numeric */
  propertyValueType?: number;
  /** Attribute characteristic. Currently determines whether to group, 0-general, 1-color, 2-size, 3-phone model */
  feature?: number;
  /** Numeric rule. Only used for common attributes, front-end validation when inputting 1-sum of values equals 100, 2-only allow input of letters/numbers/special characters */
  valueRule?: number;
  /** Attribute selection title */
  propertyChooseTitle?: string;
  /** Attribute display type, 0-normal display, 1-display when selecting a specified parent attribute value */
  showType?: number;
  /** Template parent attribute ID */
  parentTemplatePid?: number;
  /** Whether it is the main sale attribute (i.e. attribute: color) */
  mainSale?: boolean;
  /** Template module ID */
  templateModuleId?: number;
  /** Parent Specification ID */
  parentSpecId?: number;
  /** Minimum input value */
  minValue?: string;
  /** Maximum input value: text type represents the maximum length of text; numeric type represents the maximum numeric value; and time type represents the maximum time value */
  maxValue?: string;
  /** Maximum number of selectable items when selectable. Applicable to common attributes & specifications */
  chooseMaxNum?: number;
  /** Maximum decimal precision allowed. 0 indicates that no decimals are allowed */
  valuePrecision?: number;
  /** Control type, only 0-input, 1-selectable, 3-both input and selectable, 16-attribute selection and numeric input */
  controlType?: number;
  /** Attribute name */
  name?: string;
  /** Whether it is a sale attribute (as a basic part Variances) */
  isSale?: boolean;
  /** Referenced attribute ID */
  refPid?: number;
  /** Attribute value unit. Only the composition attribute has [%]. Others will not be returned */
  valueUnitList?: TemuPropertyResValueUnitListItem[];
  /** 单位 */
  valueUnit?: string[];
  /** Attribute display conditions or relationships */
  showCondition?: TemuPropertyResShowConditionItem[];
  /** Attribute value relationship */
  templatePropertyValueParentList?: TemuPropertyResTemplatePropertyValueParentListItem[];
  /** Template attribute values */
  values?: TemuPropertyResValuesItem[];
}

/**
 * Template attribute values
 */
export interface TemuPropertyResValuesItem {
  /** Basic attribute value ID */
  vid?: number;
  /** Specification ID */
  specId?: number;
  /** Brand ID (returned for brand attributes) */
  brandId?: number;
  /** Attribute value */
  value?: string;
  /** Extended information */
  extendInfo?: string;
  /** Additional Info */
  additionalInfo?: TemuPropertyResAdditionalInfo;
  /** Group information */
  group?: TemuPropertyResGroup;
  /** Subgroup information */
  subGroup?: TemuPropertyResGroup;
  /** Corresponding parent attribute value IDs */
  parentVidList?: number[];
}

/**
 * 注释
 */
export interface TemuPropertyResGroup {
  /** name */
  name?: string;
  /** ID */
  id?: number;
}

/**
 * 注释
 */
export interface TemuPropertyResAdditionalInfo {
  /** This option requires an ISBN */
  needIsbn?: boolean;
}

/**
 * Attribute value relationship
 */
export interface TemuPropertyResTemplatePropertyValueParentListItem {
  /** 注释 */
  vidList?: number[];
  /** 注释 */
  parentVidList?: number[];
}

/**
 * Attribute display conditions or relationships
 */
export interface TemuPropertyResShowConditionItem {
  /** Parent attribute ID */
  parentRefPid?: number;
  /** Only when the attribute is displayed conditionally. The attribute can only be used when the values in parent_vids are selected */
  parentVids?: number[];
}

/**
 * Attribute value unit. Only the composition attribute has [%]. Others will not be returned
 */
export interface TemuPropertyResValueUnitListItem {
  /** Value unit name */
  valueUnit?: string;
  /** Value unit ID */
  valueUnitId?: number;
}
/**
 * 颜色列表查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106258
 */
export type TemuColorRes = TemuColorResItem[];

/**
 *  单项响应数据
 */
export interface TemuColorResItem {
  /** 名称 */
  name?: string;
  /** ID */
  id?: number;
  /** 可以用的
0:可用 */
  available?: number;
  /** 规格 ID */
  specId?: number;
  /** 分组 ID */
  groupId?: string;
  /** 分组名 */
  groupName?: string;
}
/**
 * 运费模板列表查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106858
 */
export interface TemuLogisticsTemplateReq {
  /** 店铺 ID */
  shopId: string;
  /** 站点 ID */
  siteId: string;
}
/**
 * 运费模板列表查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106858
 */
export type TemuLogisticsTemplateRes = TemuLogisticsTemplateResItem[];

/**
 *  单项响应数据
 */
export interface TemuLogisticsTemplateResItem {
  /** 运费模板 ID */
  freightTemplateId?: string;
  /** 运费模板名称 */
  templateName?: string;
}
/**
 * 尺码列表查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106261
 */
export type TemuSizeRes = TemuSizeResItem[];
/**
 *  单项响应数据
 */
export interface TemuSizeResItem {
  /** 名称 */
  name?: string;
  /** ID */
  id?: number;
  /** 可以用的
0:可用 */
  available?: number;
  /** 规格 ID */
  specId?: number;
  /** 分组 ID */
  groupId?: number;
  /** 分组名 */
  groupName?: string;
}
/**
 * 部位列表查询 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106318
 */
export interface TemuPartReq {
}
/**
 * 部位列表查询 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/106318
 */
export type TemuPartRes = TemuPartResItem[];

/**
 *  单项响应数据
 */
export interface TemuPartResItem {
  /** 名称 */
  name?: string;
  /** ID */
  id?: string;
  /** 必填的
1:必填 */
  required?: number;
  checked?: boolean;
  field?: string;
}
/**
 * 分页 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106477
 */
export interface SizeTempPageReq {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  pageSize?: number;
  /** 是否启用【1启用；0禁用】 */
  enable?: number;
  /** 模板名 */
  templateName?: string;
  /** 品类 ID */
  catId?: number;
  /** 尺码组编码 */
  groupCode?: string;
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
 * @see https://yapi.textile-story.com/project/1361/interface/api/106477
 */
export interface SizeTempPageRes {
  /** 注释 */
  pageNum?: number;
  /** 注释 */
  total?: number;
  /** 注释 */
  list?: SizeTempPageResListItem[];
}

/**
 * 注释
 */
export interface SizeTempPageResListItem {
  /** 创建人 ID */
  creatorId?: number;
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
  /** 模板 ID */
  templateId?: number;
  /** 模板名 */
  templateName?: string;
  /** 品类 ID */
  catId?: number;
  /** 品类名称 */
  catName?: number;
  /** 尺码组编码 */
  groupCode?: string;
  /** 尺码组名称 */
  groupName?: string;
  /** 尺码 */
  sizes?: string[];
  /** 部位 */
  parts?: string[];
  /** 尺码列表 */
  temps?: SizeTempPageResTempsItem[];
}

/**
 * 注释
 */
export interface SizeTempPageResTempsItem {
  /** 尺码 */
  size?: string;
  /** 部位尺码 */
  values?: SizeTempPageResValuesItem[];
}

/**
 * 注释
 */
export interface SizeTempPageResValuesItem {
  /** 部位 */
  part?: number;
  /** 部位 */
  partName?: string;
  /** 部位值 */
  value?: number;
  /** 部档差值 */
  diff?: number;
}
/**
 * 部位列表查询
 */
export type ITemuPartRes = {
  /** 名称 */
  name: string;
  /** ID */
  id: string;
  /** 必填的 1:必填 */
  required: number;
}[];
/**
 * 查询款审核信息 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/107083
 */
export interface ProductReviewRes {
  /** 审核结果
通过：true
不通过：false */
  pass?: boolean;
  /** 审核不通过原因，不通过时候必填 */
  reviewFailReason?: string;
  /** 店铺 id */
  storeId?: number;
  /** 款ID */
  styleId?: string;
  /** 款号 */
  styleCode?: string;
  /** 品类 ID */
  catId?: string;
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
  video?: ProductReviewResVideo;
  /** 站点 */
  siteIds?: string[];
  videoUrl?: string;
  /** 商品属性 */
  attrs?: ProductReviewResAttrsItem[];
  /** 销售属性 */
  specAttrs?: ProductReviewResSpecAttrsItem[];
  /** skc 列表 */
  skcReqs?: ProductReviewResSkcReqsItem[];
  /** 尺码 列表 */
  sizeReqs?: ProductReviewResSizeReqsItem2[];
  skcs?: any;
  /** 平台Id */
  platformProductId?: string;
}

/**
 * 注释
 */
export interface ProductReviewResSizeReqsItem2 {
  /** 名称 */
  name?: string;
  /** 重点部位
Yes:重点部位 */
  show?: string;
  /** 尺码参数组元数据 */
  elementList?: ProductReviewResElementListItem[];
  /** 尺码 列表 */
  sizeReqs?: ProductReviewResSizeReqsItem[];
}

/**
 * 尺码 列表
 */
export interface ProductReviewResSizeReqsItem {
  /** 尺码 */
  size?: string;
  /** 平台尺码 */
  platformSize?: string;
  /** 部位尺码 */
  values?: ProductReviewResValuesItem[];
  /** 尺码参数组元数据 */
  elementList?: ProductReviewResElementListItem[];
  productId?: string;
}

/**
 * 注释
 */
export interface ProductReviewResValuesItem {
  /** 部位 */
  part?: number;
  /** 部位 */
  partName?: string;
  /** 部位值 */
  value?: number;
  /** 部档差值 */
  diff?: number;
}

/**
 * 注释
 */
export interface ProductReviewResElementListItem {
  /** name */
  name?: string;
  /** ID */
  id?: number;
}

/**
 * skc 列表
 */
export interface ProductReviewResSkcReqsItem {
  /** SKC ID */
  skcId?: string;
  /** SKC 编码 */
  skcCode?: string;
  /** 颜色 */
  color?: string;
  /** 平台颜色 */
  platformColor?: string;
  /** 主销售属性 */
  mainSpecReqs?: ProductReviewResMainSpecReqsItem[];
  /** SKU 列表 */
  skuReqs?: ProductReviewResSkuReqsItem[];
  /** 图片 */
  images?: string[];
}

/**
 * 注释
 */
export interface ProductReviewResSkuReqsItem {
  /** SKu ID */
  skuId?: number;
  /** SKu 号 */
  skuCode?: string;
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
  warehouseStockQuantityReqs?: ProductReviewResWarehouseStockQuantityReqsItem[];
  /** SKU 规格 */
  skuSpecReqs?: ProductReviewResMainSpecReqsItem[];
}

/**
 * 注释
 */
export interface ProductReviewResWarehouseStockQuantityReqsItem {
  /** 默认传:0 */
  targetStockAvailable?: string;
  /** 仓库 ID */
  warehouseId?: string;
}

/**
 * 注释
 */
export interface ProductReviewResMainSpecReqsItem {
  /** 父规格 id */
  parentSpecId?: number;
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
export interface ProductReviewResSpecAttrsItem {
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
export interface ProductReviewResAttrsItem {
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
export interface ProductReviewResVideo {
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
 * 查询详情信息 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/108280
 */
export interface ProductDetailRes {
  /** 创建人 ID */
  creatorId?: number;
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
  /** 主键 ID */
  productId?: number;
  /** 平台商品 ID */
  platformProductId?: number;
  /** 店铺 id */
  storeId?: number;
  /** 款ID */
  styleId?: number;
  /** 款号 */
  styleCode?: string;
  /** 品类 ID */
  catId?: string;
  /** 品类 ID */
  catName?: string;
  /** 中文标题 */
  productName?: string;
  /** 英文标题 */
  productEnName?: string;
  /** 素材图 */
  materialImgUrl?: string;
  /** 承诺发货天 */
  promisedDeliveryDay?: number;
  /** 运费模板 ID */
  freightTemplateId?: string;
  /** 尺码组 ID */
  groupId?: number;
  /** 店铺名称 */
  storeName?: string;
  /** 运营人员 ID */
  businessOperatorId?: number;
  /** 运营人员名称 */
  businessOperatorName?: string;
  /** 波段名称 */
  waveBandName?: string;
  /** 款式标签名称 */
  styleLabelName?: string;
  /** 设计师 id */
  designerId?: number;
  /** 设计师名称 */
  designerName?: string;
  /** 设计师组别名称 */
  designerGroupName?: string;
  /** 上架人 id */
  onShelvesId?: number;
  /** 上架人名称 */
  onShelvesName?: string;
  /** 开款类型 */
  styleType?: string;
  /** 商品标签 */
  labels?: string[];
  /** 尺码 */
  sizes?: string[];
  /** 仓库 ID */
  warehouseIds?: string[];
  /** 尺寸图片 */
  sizeImages?: string[];
  /** 视频 */
  videoUrl?: string;
  /** 站点 */
  siteIds?: number[];
  /** 商品属性 */
  attrs?: ProductDetailResAttrsItem[];
  /** 销售属性 */
  specAttrs?: ProductDetailResSpecAttrsItem[];
  /** skc 列表 */
  skcs?: ProductDetailResSkcsItem[];
  /** 尺码 列表 */
  sizeTemplates?: ProductDetailResSizeTemplatesItem[];
}

/**
 * 尺码 列表
 */
export interface ProductDetailResSizeTemplatesItem {
  /** 主键 id */
  productSizeId?: number;
  /** 商品 ID */
  productId?: number;
  /** 名称 */
  name?: string;
  /** 重点部位
Yes:重点部位 */
  show?: string;
  /** 尺码 */
  size?: string;
  /** 平台尺码 */
  platformSize?: string;
  /** 尺码参数组元数据 */
  elementList?: ProductDetailResElementListItem[];
  /** 部位尺码 */
  parts?: ProductDetailResPartsItem[];
}

/**
 * 注释
 */
export interface ProductDetailResPartsItem {
  /** 主键 id */
  sizePartId?: number;
  /** 商品 ID */
  productId?: number;
  /** 商品尺码模板 */
  productSizeId?: number;
  /** 部位 id */
  partId?: number;
  /** 部位名称 */
  partName?: string;
  /** 部位值 */
  value?: number;
  /** 部档差值 */
  diff?: number;
  /** 尺码 */
  size?: string;
  /** 平台尺码 */
  platformSize?: string;
}

/**
 * 注释
 */
export interface ProductDetailResElementListItem {
  /** name */
  name?: string;
  /** ID */
  id?: number;
}

/**
 * skc 列表
 */
export interface ProductDetailResSkcsItem {
  /** 商品SKC id */
  productSkcId?: number;
  /** 商品 id */
  productId?: number;
  /** SKC id */
  skcId?: number;
  /** SKC 号 */
  skcCode?: string;
  /** SKC 状态 */
  skcStatus?: number;
  /** 颜色 */
  color?: string;
  /** 平台颜色 */
  platformColor?: string;
  /** 主销售属性 */
  mainSpecs?: ProductDetailResMainSpecsItem[];
  /** SKU 列表 */
  skus?: ProductDetailResSkusItem[];
  /** 图片 */
  images?: string[];
}

/**
 * 注释
 */
export interface ProductDetailResSkusItem {
  /** 商品SKC id */
  productSkuId?: number;
  /** 商品 id */
  productId?: number;
  /** 商品SKC id */
  productSkcId?: number;
  /** SKu ID */
  skuId?: number;
  /** SKu 号 */
  skuCode?: string;
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
  warehouseStockQuantities?: ProductDetailResWarehouseStockQuantitiesItem[];
  /** SKU 规格 */
  skuSpecs?: ProductDetailResSkuSpecsItem[];
}

/**
 * 注释
 */
export interface ProductDetailResSkuSpecsItem {
  /** 商品SKU规格 id */
  skuSpecId?: number;
  /** 商品 ID */
  productId?: number;
  /** SKC id */
  productSkcId?: number;
  /** SKU id */
  productSkuId?: number;
  /** 父规格 id */
  parentSpecId?: number;
  /** 父规格名称 */
  parentSpecName?: string;
  /** 规格 id */
  specId?: number;
  /** 规格名称 */
  specName?: string;
}

/**
 * 注释
 */
export interface ProductDetailResWarehouseStockQuantitiesItem {
  /** 主键 ID */
  warehouseRouteId?: number;
  /** 商品 ID */
  productId?: number;
  /** 商品SKU ID */
  productSkuId?: number;
  /** 默认传:0 */
  targetStockAvailable?: string;
  /** 仓库 ID */
  warehouseId?: string;
}

/**
 * 注释
 */
export interface ProductDetailResMainSpecsItem {
  /** 商品SKU规格 id */
  skuSpecId?: number;
  /** 商品 ID */
  productId?: number;
  /** 商品SKC id */
  productSkcId?: number;
  /** 父规格 id */
  parentSpecId?: number;
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
export interface ProductDetailResSpecAttrsItem {
  /** 主键 id */
  attrId?: number;
  /** 商品 ID */
  productId?: number;
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
export interface ProductDetailResAttrsItem {
  /** 主键 ID */
  attrId?: number;
  /** 商品 id */
  productId?: number;
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
  /** 控制类型 */
  controlType?: number;
}
