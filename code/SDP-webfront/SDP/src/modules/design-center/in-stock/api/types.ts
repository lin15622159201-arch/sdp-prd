import { YES_NO_ENUM } from '@/constant';
import { CHECK_SAMPLE_PRICE_STATUS_ENUM, SKC_SOURCE_TYPE_ENUM, SKC_STATE_ENUM, SPU_STATE_ENUM } from '../constant';
import { IMAGE_UPDATE_STATE_ENUM } from '../../image-update/constant';

// ⬇️ 列表请求体 接口：https://yapi.tiangong.site/project/37/interface/api/4346
/**
 * 分页参数
 */
export interface ISpotSpuPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 店铺id集合   (多选)
   */
  storeIdList?: string[];
  /**
   * tryOn审核 开始时间 v1.0.3
   */
  tryOnAuditTimeStart?: string;
  /**
   * tryOn审核时间 结束时间 v1.0.3
   */
  tryOnAuditTimeEnd?: string;
  /**
   * tryOn分配时间 开始时间   v1.0.5
   */
  tryOnAllocatedTimeStart?: string;
  /**
   * tryOn分配时间 结束时间   v1.0.5
   */
  tryOnAllocatedTimeEnd?: string;
  /**
   * 现货类型
   */
  spotTypeCodeList?: string[];
  /**
   * SPU编码集合
   */
  styleCodeList?: string[];
  /**
   * SKC编码集合
   */
  designCodeList?: string[];
  /**
   * 供给方式编码   (单选)
   */
  supplyModeCode?: string;
  /**
   * 灵感品类编码-OPS   (单选)
   */
  category?: string;
  /**
   * 供应商名称(模糊查询)
   */
  supplierName?: string;
  /**
   * 供应商款号
   */
  supplierStyle?: string;
  /**
   * 选款人id
   */
  pickStyleUserIdList?: string[];
  /**
  * tryOn人(买手组设计师)  (多选)
  */
  designerIdList?: string[];
  /**
  * 开发人id (我的,展示开发人=当前登录用户的款号)
  */
  developerIdList?: string[];
  /**
   * 创建开始时间
   */
  createdTimeStart?: string;
  /**
   * 创建结束时间
   */
  createdTimeEnd?: string;
  /**
   * 核价开始时间
   */
  checkPriceTimeStart?: string;
  /**
   * 核价结束时间
   */
  checkPriceTimeEnd?: string;
  /**
   * 预估核价状态: 10-待核价; 20-已核价; 30-已驳回; 40-复核通过
   */
  predictCheckPriceStatus?: string;
  /**
   * tryOn状态: 10-待分配; 20-待创建; 30-已创建; 40-待审核; 50-未通过; 60-已通过
   */
  tryOnStatus?: string;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled?: string;
  /**
   * 商品图状态: 1-待补充; 2-已齐全
   */
  productPictureStatus?: string;
  /**
   * 资料状态: 1-待补充; 2-已完善
   */
  resourceStatus?: string;
  /**
   * 采购状态: 10-待接单; 20-进行中; 30-已完成;
   */
  purchaseOrderStatus?: string;
  /**
   * 商品图上传 开始时间   v.1.0.4
   */
  productPictureUploadTimeStart?: string;
  /**
   * 商品图上传 结束时间   v.1.0.4
   */
  productPictureUploadTimeEnd?: string;
  /**
   * TODO: 修图任务状态
   */
  taskState?: IMAGE_UPDATE_STATE_ENUM;
}
// ⬆️ 列表请求体

// ⬇️ 列表响应体 接口：https://yapi.tiangong.site/project/37/interface/api/4346
/**
 * 响应数据
 */
export interface ISpotSpuPageRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page: string;
  /**
   * 总数据量
   */
  total: string;
  /**
   * 分页数据
   */
  list: ISpotSpuPageResListItem[];
}
export interface ISpotSpuPageResListItem {
  /**
   * spuId主键
   */
  spotSpuId: string;
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * 数据来源: 10-自建款; 20-选款;
   */
  sourceType: string;
  /**
   * 商品图
   * (SPU存在商品图，则展示首张商品图; 如果SPU不存在商品图，则展示第一个SKC的图片)
   */
  productPicture: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName: string;
  /**
   * 供给方式编码
   */
  supplyModeCode: string;
  /**
   * 货盘类型编码
   */
  palletTypeCode: string;
  /**
   * 货盘类型名称
   */
  palletTypeName: string;
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 店铺名称
   */
  storeName: string;
  /**
   * 款式品类编码(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(多级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 现货类型编码
   */
  spotTypeCode: string;
  /**
   * 现货类型名称
   */
  spotTypeName: string;
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 尺码标准编号
   */
  sizeStandardCode: string;
  /**
   * 开发人id
   */
  developerId: string;
  /**
   * 开发人名称
   */
  developerName: string;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled: string;
  /**
   * 商品图状态: 1-待补充; 2-已齐全
   */
  productPictureStatus: string;
  /**
   * 资料状态: 1-待补充; 2-已完善
   */
  resourceStatus: string;
  /**
   * 供应商信息集合
   */
  supplierInfoList: ISpotSpuPageResSupplierInfoListItem[];
  /**
   * skc信息集合
   */
  skcInfoList: ISpotSpuPageResSkcInfoListItem[];
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * tryOn审核时间 v1.0.3
   */
  tryOnAuditTime?: string;
  /**
   * tryOn分配时间    v1.0.5
   */
  tryOnAllocatedTime?: string;
  /**
   * tryOn状态: 10-待分配; 20-待创建; 30-已创建; 40-待审核; 50-未通过; 60-已通过
   */
  tryOnStatus?: string;
  /**
   * 商品图集合
   */
  productPictureList: string[];
  /**
   * tryOn图集合
   */
  tryOnPictureList: string[];
}
export interface ISpotSpuPageResSupplierInfoListItem {
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 供应商名称
   */
  supplierName: string;
  /**
   * 收款人编码
   */
  payeeCode: string;
  /**
   * 收款人名称
   */
  payeeName: string;
  /**
   * 供应商款号
   */
  supplierStyle: string;
  /**
   * 采购价
   */
  purchasePrice: string;
}
export interface ISpotSpuPageResSkcInfoListItem {
  /**
   * 主键id
   */
  spotSkcId: string;
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * SKC编码
   */
  designCode: string;
  /**
   * 数据来源: 10-自建款; 20-选款
   */
  skcSourceType: string;
  /**
   * skc状态: 1.待提交 2.已提交
   */
  prototypeStatus: string;
  /**
   * 颜色名称
   */
  color: string;
  /**
   * 颜色英文名
   */
  colorEnglishName: string;
  /**
   * 尺码(多个用英文逗号分割)
   */
  sampleSize: string;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled: string;
  /**
   * 版单取消时间
   */
  cancelTime: string;
  /**
   * 版单取消原因
   */
  cancelReason: string;
  /**
   * 取消版单操作人id
   */
  cancelUserId: string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName: string;
  /**
   * 商品图
   */
  productPicture: string;
  /**
   * 选款编号
   */
  pickStyleNo: string;
  /**
   * 选款人id
   */
  pickStyleUserId: string;
  /**
   * 选款人名称
   */
  pickStyleUserName: string;
  /**
   * 采购单编码
   */
  purchaseOrderCode: string;
  /**
   * 采购状态: 10-待接单; 20-进行中; 30-已完成;
   */
  purchaseOrderStatus: string;
  /**
   * 资料状态: 1-待补充; 2-已完善;
   */
  resourceStatus: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
}
// ⬆️ 列表响应体

// ⬇️ 核价_tryOn信息查询请求体 接口：https://yapi.tiangong.site/project/37/interface/api/4350
/**
 * 查询对象
 */
export interface ISpotSpuPriceTryOnReq {
  /**
   * spu编码集合
   */
  styleCodeList: string[];
}
// ⬆️ 核价_tryOn信息查询请求体

// ⬇️ 核价_tryOn信息查询响应体 接口：https://yapi.tiangong.site/project/37/interface/api/4350
/**
 * 响应数据
 */
export interface ISpotSpuPriceTryOnResItem {
  /**
   * SPU编码
   */
  styleCode: string;
  checkPriceInfo: ISpotSpuPriceTryOnResCheckPriceInfo;
  tryOnInfo: ISpotSpuPriceTryOnResTryOnInfo;
}

/**
 * 核价信息
 */
export interface ISpotSpuPriceTryOnResCheckPriceInfo {
  /**
   * 预估核价id
   */
  predictCheckPriceId: string;
  /**
   * 预估核价状态: 10-待核价; 20-已核价; 30-已驳回; 40-复核通过
   */
  predictCheckPriceStatus: string;
  /**
   * 预估核价时间
   */
  predictCheckPriceTime: string;
  /**
   * 定价类型: 1-按返单定价; 2-按不返单定价
   */
  pricingType: string;
  /**
   * 核价师
   */
  checkPricerName: string;
  /**
   * 核价金额
   */
  checkPriceCost: string;
}
/**
 * tryOn信息
 */
export interface ISpotSpuPriceTryOnResTryOnInfo {
  /**
   * tryOn分配单id
   */
  tryOnBizId: string;
  /**
   * tryOn状态: 10-待分配; 20-待创建; 30-已创建; 40-待审核; 50-未通过; 60-已通过
   */
  tryOnStatus: string;
  /**
   * tryOn人id(设计师id)
   */
  tryOnUserId: string;
  /**
   * tryOn人名称(设计师名称)
   */
  tryOnUserName: string;
}
// ⬆️ 核价_tryOn信息查询响应体

/**
 * try on任务分配-新建  ⬇️
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/4686
 */
export interface ITryOnConfigSaveReq {
  /**
   * spu编码
   */
  styleCodes: string[];
  /**
   * tryOn人ID
   */
  tryOnUserId: string;
  /**
   * tryOn人名称
   */
  tryOnUserName: string;
  /**
   * 场景名称
   */
  sceneName?: string;
  /**
   * 场景编码
   */
  sceneCode?: string;
  /**
   * 商品主题名称
   */
  productThemeName?: string;
  /**
   * 商品主题编码
   */
  productThemeCode?: string;
  /**
   * 款式风格编码
   */
  clothingStyleCode?: string;
  /**
   * 款式风格名称
   */
  clothingStyleName?: string;
  /**
   * 背景图片数组 多选，最多3张
   */
  backgroundPicList: ITryOnConfigSaveReqBackgroundPicListItem[];
  /**
   * 模特图片 多选，最多10张
   */
  modelPicList: ITryOnConfigSaveReqModelPicListItem[];
  /**
   * 模特面容图片 多选，最多3个
   */
  modelFacialPicList: ITryOnConfigSaveReqModelFacialPicListItem[];
}
export interface ITryOnConfigSaveReqModelFacialPicListItem {
  /**
   * 面容编码
   */
  racialCode?: string;
  /**
   * 面容名称
   */
  racialName?: string;
  /**
   * 模特id
   */
  modelId?: string;
  /**
   * 模特名称
   */
  modelName?: string;
  /**
   * 图片地址
   */
  pictureUrl?: string;
}
export interface ITryOnConfigSaveReqModelPicListItem {
  /**
   * 模特库id
   */
  modelLibraryId?: string;
  /**
   * 模特名称
   */
  modelName?: string;
  /**
   * 图片地址
   */
  pictureUrl?: string;
  /**
   * 图片信息主键ID
   */
  pictureId?: string;
}

export interface ITryOnConfigSaveReqBackgroundPicListItem {
  /**
   * 场景ID
   */
  sceneId?: string;
  /**
   * 场景名称
   */
  sceneName?: string;
  /**
   * 图片地址
   */
  pictureUrl?: string;
  /**
   * 图片信息主键ID
   */
  pictureId?: string;
}

/** try on任务分配 ⬆️ */

// ⬇️ 上传图片确认请求体 接口：https://yapi.tiangong.site/project/37/interface/api/4410
/**
 * 请求参数
 */
export interface IPictureCommitReq {
  /**
   * 上传文件夹的图片列表
   */
  imageInfoList: IPictureCommitReqImageInfoListItem[];
  /**
   * 图片类型,1：商品图，2：Try on图
   */
  pictureType: string;
  /**
   * 匹配方式,1：SPU编号，2：供应商款号
   */
  matchingType: string;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  /**
   * 供应商名字
   */
  supplierName?: string;
}
export interface IPictureCommitReqImageInfoListItem {
  imageUrls: IPictureCommitReqImageUrlsItem[];
  /**
   * 文件夹名称
   */
  fileName: string;
}
export interface IPictureCommitReqImageUrlsItem {
  orgImgName: string;
  ossImageUrl: string;
}
// ⬆️ 上传图片确认请求体

// ⬇️ 上传图片确认响应体 接口：https://yapi.tiangong.site/project/37/interface/api/4410
/**
 * 响应数据
 */
export interface IPictureCommitResItem {
  /**
   * 文件夹名称
   */
  fileName: string;
  /**
   * 上传状态，0-失败，1-成功
   */
  uploadState: string;
  /**
   * 上传提示语
   */
  uploadResultDesc: string;
}
// ⬆️ 上传图片确认响应体

export type ISupplierListRes = ISupplierListResItem[];
export interface ISupplierListResItem {
  /**
   * 供应商id
   */
  supplierId: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 供应商名称
   */
  supplierName: string;
}
export interface ISpotSpuSelfCreateReq {
  /**
   * 供给方式-OPS
   */
  supplyModeName: string;
  /**
   * 供给方式编码
   */
  supplyModeCode: string;
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 店铺名称
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
   * 现货类型编码
   */
  spotTypeCode: string;
  /**
   * 现货类型名称
   */
  spotTypeName: string;
  /**
   * 货盘类型名称
   */
  palletTypeName: string;
  /**
   * 货盘类型编码
   */
  palletTypeCode: string;
  /**
   * 织造方式code
   */
  weaveModeCode: string;
  /**
   * 织造方式
   */
  weaveMode: string;
  /**
   * 尺码组code (如:chinese_size_code)
   */
  sizeStandardCode: string;
  /**
   * 尺码组名称.（如：中国码）
   */
  sizeStandard: string;
  /**
   * 场景名称(ops: JV_scene)
   */
  sceneName: string;
  /**
   * 场景编码
   */
  sceneCode: string;
  /**
   * 商品类型名称
   */
  productType: string;
  /**
   * 商品类型编码
   */
  productTypeCode: string;
  /**
   * 品质等级
   */
  qualityLevel: string;
  /**
   * 品质等级编号
   */
  qualityLevelCode: string;
  /**
   * 商品主题编码
   */
  productThemeCode: string;
  /**
   * 商品主题名称
   */
  productThemeName: string;
  /**
   * 灵感源品牌编码
   */
  inspirationBrandCode: string;
  /**
   * 灵感源品牌名称
   */
  inspirationBrandName: string;
  /**
   * 款式风格名称
   */
  clothingStyleName: string;
  /**
   * 款式风格编码
   */
  clothingStyleCode: string;
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
   * 波段编码
   */
  waveBandCode: string;
  /**
   * 波段名称
   */
  waveBandName: string;
  /**
   * 企划来源name
   */
  planningSourceName: string;
  /**
   * 企划来源code
   */
  planningSourceCode: string;
  /**
   * 灵感图来源编码
   */
  inspirationImageSourceCode: string;
  /**
   * 灵感图来源名称
   */
  inspirationImageSourceName: string;
  /**
   * 商品链接
   */
  productLink: string;
  /**
   * 商品图集合
   */
  productPictureList: string[];
  /**
   * 新增供应商 集合
   */
  supplierAddList: ISpotSpuSelfCreateReqSupplierAddListItem[];
  /**
   * 新增skc 集合
   */
  skcAddList: ISpotSpuSelfCreateReqSkcAddListItem[];
  /**
   * 是否上传商品图: 0-否; 1-是, 默认否    v1.0.4
   */
  isUploadProductPicture: YES_NO_ENUM;
  /**
   * 平台
   */
  stockGoodsType: string;
  /**
   * 印花类型
   */
  printing: string;
  /**
   * 版型
   */
  clothingModel: string;
  /**
   * 节日
   */
  festival: string;
  /**
   * 弹性
   */
  elasticRequirement: string;
  /**
   * 视觉形式
   */
  visualStyle: string;
  /**
   * SKU分类
   */
  skuCategory: string;
  /**
   * 款式标签
   */
  productTags: string[];
  /**
   * 款式级别
   */
  productLevels: string[];
  /**
   * 成衣毛重
   */
  weight?: number;
}
export interface ISpotSpuSelfCreateReqSkcAddListItem {
  /**
   * 颜色名称
   */
  color: string;
  /**
   * 颜色英文名
   */
  colorEnglishName: string;
  /**
   * 尺码(多个用英文逗号分割)
   */
  sampleSize: string;
  /**
   * 颜色信息集合
   */
  colorInfoList: {
    /**
     * 颜色名称
     */
    color: string;
    /**
     * 颜色英文名
     */
    colorEnglishName: string;
    /**
     * 颜色编码
     */
    colorCode: string;
    /**
     * 颜色编码缩写
     */
    colorAbbrCode: string;
    /**
     * 色号
     */
    colorNumber: string;
  }[];
  /**
   * 商品图集合
   */
  productPictureList: string[];
}
export interface ISpotSpuSelfCreateReqSupplierAddListItem {
  /**
   * 供应商名称
   */
  supplierName: string;
  /**
   * 收款人id
   */
  payeeId: string;
  /**
   * 收款人编码
   */
  payeeCode: string;
  /**
   * 收款人名称
   */
  payeeName: string;
  /**
   * 供应商款号
   */
  supplierStyle: string;
  /**
   * 采购价
   */
  purchasePrice: string;
}

export interface ISpotSpuSelfCreateRes {
  /**
   * spuId主键
   */
  spotSpuId: string;
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * SKC集合
   */
  skcInfoList: {
    /**
     * 主键id
     */
    spotSkcId: string;
    /**
     * SKC编码
     */
    designCode: string;
  }[];
}

export interface ISpotSpuWebDetailReq {
  /**
   * spu编码
   */
  styleCode: string;
}

export interface ISpotSpuWebDetailRes {
  /**
   * spuId主键
   */
  spotSpuId: string;
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * SPU版本号
   */
  versionNum: string;
  /**
   * 数据来源: 10-自建款; 20-选款;
   */
  sourceType: SKC_SOURCE_TYPE_ENUM;
  /**
   * 供给方式-OPS
   */
  supplyModeName: string;
  /**
   * 供给方式编码
   */
  supplyModeCode: string;
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 店铺名称
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
   * 现货类型编码
   */
  spotTypeCode: string;
  /**
   * 现货类型名称
   */
  spotTypeName: string;
  /**
   * 货盘类型名称
   */
  palletTypeName: string;
  /**
   * 货盘类型编码
   */
  palletTypeCode: string;
  /**
   * 织造方式code
   */
  weaveModeCode: string;
  /**
   * 织造方式
   */
  weaveMode: string;
  /**
   * 尺码组code (如:chinese_size_code)
   */
  sizeStandardCode: string;
  /**
   * 尺码组名称.（如：中国码）
   */
  sizeStandard: string;
  /**
   * 场景名称(ops: JV_scene)
   */
  sceneName: string;
  /**
   * 场景编码
   */
  sceneCode: string;
  /**
   * 商品类型名称
   */
  productType: string;
  /**
   * 商品类型编码
   */
  productTypeCode: string;
  /**
   * 品质等级
   */
  qualityLevel: string;
  /**
   * 品质等级编号
   */
  qualityLevelCode: string;
  /**
   * 商品主题编码
   */
  productThemeCode: string;
  /**
   * 商品主题名称
   */
  productThemeName: string;
  /**
   * 灵感源品牌编码
   */
  inspirationBrandCode: string;
  /**
   * 灵感源品牌名称
   */
  inspirationBrandName: string;
  /**
   * 款式风格名称
   */
  clothingStyleName: string;
  /**
   * 款式风格编码
   */
  clothingStyleCode: string;
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
   * 波段编码
   */
  waveBandCode: string;
  /**
   * 波段名称
   */
  waveBandName: string;
  /**
   * 企划来源name
   */
  planningSourceName: string;
  /**
   * 企划来源code
   */
  planningSourceCode: string;
  /**
   * 灵感图来源编码
   */
  inspirationImageSourceCode: string;
  /**
   * 灵感图来源名称
   */
  inspirationImageSourceName: string;
  /**
   * 商品链接
   */
  productLink: string;
  /**
   * 商品图集合
   */
  productPictureList: string[];
  /**
   * tryOn图集合
   */
  tryOnPictureList: string[];
  /**
   * 提交时间
   */
  submitTime?: number;
  /**
   * 款式状态: 1-待提交; 2-已提交
   */
  styleStatus?: SPU_STATE_ENUM;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 更新时间
   */
  revisedTime?: number;
  /**
   * 供应商集合
   */
  supplierInfoList: {
    /**
     * Id主键
     */
    spotSpuSupplierId: string;
    /**
     * SPU编码
     */
    styleCode?: string;
    /**
     * 数据来源: 10-自建款; 20-选款;
     */
    sourceType?: SKC_SOURCE_TYPE_ENUM;
    /**
     * 供应商名称
     */
    supplierName: string;
    /**
     * 收款人id
     */
    payeeId: string;
    /**
     * 收款人编码
     */
    payeeCode: string;
    /**
     * 收款人名称
     */
    payeeName: string;
    /**
     * 供应商款号
     */
    supplierStyle: string;
    /**
     * 采购价
     */
    purchasePrice: string;
  }[];
  /**
   * skc集合
   */
  skcInfoList: {
    /**
     * 版本号
     */
    versionNum: string;
    /**
     * 主键id
     */
    spotSkcId: string;
    /**
     * SPU编码
     */
    styleCode: string;
    /**
     * SKC编码
     */
    designCode: string;
    /**
     * 数据来源: 10-自建款; 20-选款
     */
    skcSourceType: SKC_SOURCE_TYPE_ENUM;
    /**
     * skc状态: 1.待提交 2.已提交
     */
    prototypeStatus?: SKC_STATE_ENUM;
    /**
     * 是否取消 0 否 1是
     */
    isCanceled?: YES_NO_ENUM;
    /**
     * 颜色名称
     */
    color: string;
    /**
     * 颜色英文名
     */
    colorEnglishName: string;
    /**
     * 尺码(多个用英文逗号分割)
     */
    sampleSize: string;
    /**
     * 颜色信息集合
     */
    colorInfoList: {
      /**
       * 颜色名称
       */
      color: string;
      /**
       * 颜色英文名
       */
      colorEnglishName: string;
      /**
       * 颜色编码
       */
      colorCode: string;
      /**
       * 颜色编码缩写
       */
      colorAbbrCode: string;
      /**
       * 色号
       */
      colorNumber: string;
    }[];
    /**
     * 商品图集合
     */
    productPictureList: string[];
    /**
     * 修改人名称
     */
    reviserName?: string;
    /**
     * 更新时间
     */
    revisedTime?: number;
  }[];
  /**
   * 平台
   */
  stockGoodsType: string;
  /**
   * 印花类型
   */
  printing: string;
  /**
   * 版型
   */
  clothingModel: string;
  /**
   * 节日
   */
  festival: string;
  /**
   * 弹性
   */
  elasticRequirement: string;
  /**
   * 视觉形式
   */
  visualStyle: string;
  /**
   * SKU分类
   */
  skuCategory: string;
  /**
   * 款式标签
   */
  productTags: string[];
  /**
   * 款式级别
   */
  productLevels: string[];
  /**
   * 成衣毛重
   */
  weight: number;
  /** 成分组成 */
  elementList: { element: string; ratio: number; }[];
}

export interface ISpotSpuUpdateSpuSkcReq extends ISpotSpuSelfCreateReq {
  /**
   * tryOn图集合
   */
  tryOnPictureList: string[];
  /**
   * 更新供应商 集合
   */
  supplierUpdateInfoList: ISpotSpuSelfCreateReq['supplierAddList'];
  /**
   * 删除供应商id集合 (当供应商来源为「选款」, 不能删除)
   */
  supplierDelIdList: string[];
  /**
   * 更新skc 集合
   */
  skcUpdateList: {
    /**
     * 版本号
     */
    versionNum: string;
    /**
     * SKC编码
     */
    designCode: string;
    /**
     * 颜色名称
     */
    color: string;
    /**
     * 颜色英文名
     */
    colorEnglishName: string;
    /**
     * 尺码(多个用英文逗号分割)
     */
    sampleSize: string;
    /**
     * 颜色信息集合
     */
    colorInfoList: {
      /**
       * 颜色名称
       */
      color: string;
      /**
       * 颜色英文名
       */
      colorEnglishName: string;
      /**
       * 颜色编码
       */
      colorCode: string;
      /**
       * 颜色编码缩写
       */
      colorAbbrCode: string;
      /**
       * 色号
       */
      colorNumber: string;
    }[];
    /**
     * 商品图集合
     */
    productPictureList: string[];
  }[];
}

// 发起tryOn任务前校验并返回参数 ⬆️

export interface ISpotSkcUpdateReq {
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * SKC编码
   */
  designCode: string;
  /**
   * 颜色名称
   */
  color: string;
  /**
   * 颜色英文名
   */
  colorEnglishName: string;
  /**
   * 尺码(多个用英文逗号分割)
   */
  sampleSize: string;
  /**
   * 颜色信息集合
   */
  colorInfoList: {
    /**
     * 颜色名称
     */
    color: string;
    /**
     * 颜色英文名
     */
    colorEnglishName: string;
    /**
     * 颜色编码
     */
    colorCode: string;
    /**
     * 颜色编码缩写
     */
    colorAbbrCode: string;
    /**
     * 色号
     */
    colorNumber: string;
  }[];
  /**
   * 商品图集合
   */
  productPictureList: string[];
}

export interface ISpotSkcUpdateRes {
  /**
   * 主键id
   */
  spotSkcId?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * SPU编码
   */
  styleCode?: string;
  /**
   * SKC编码
   */
  designCode?: string;
}

export interface ISpotSpuColorMakingReq {
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * SKC信息
   */
  skcCreateReq: ISpotSpuColorMakingReqSkcCreateReq;
}

export interface ISpotSpuColorMakingReqSkcCreateReq {
  /**
   * 颜色名称
   */
  color: string;
  /**
   * 颜色英文名
   */
  colorEnglishName: string;
  /**
   * 尺码(多个用英文逗号分割)
   */
  sampleSize: string;
  /**
   * 颜色信息集合
   */
  colorInfoList: ISpotSpuColorMakingReqSkcCreateReqColorInfoListItem[];
  /**
   * 商品图集合
   */
  productPictureList: string[];
}

export interface ISpotSpuColorMakingReqSkcCreateReqColorInfoListItem {
  /**
   * 颜色名称
   */
  color: string;
  /**
   * 颜色英文名
   */
  colorEnglishName: string;
  /**
   * 颜色编码
   */
  colorCode: string;
  /**
   * 颜色编码缩写
   */
  colorAbbrCode: string;
  /**
   * 色号
   */
  colorNumber: string;
}

export interface ISpotSpuColorMakingRes {
  /**
   * 主键id
   */
  spotSkcId?: string;
  /**
   * SPU编码
   */
  styleCode?: string;
  /**
   * SKC编码
   */
  designCode?: string;
}

// ⬇️ 上传图片供应商列表查询请求体 接口：https://yapi.tiangong.site/project/37/interface/api/4426
/**
 * 分页参数
 */
export interface IAllListReq {
  /**
   * 供应商名称
   */
  supplierName: string;
}
// ⬆️ 上传图片供应商列表查询请求体

// ⬇️ 上传图片供应商列表查询响应体 接口：https://yapi.tiangong.site/project/37/interface/api/4426
/**
 * 响应数据
 */
export type IAllListResItem = {
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 供应商名称
   */
  supplierName: string;
};
// ⬆️ 上传图片供应商列表查询响应体

// ⬇️ 批量取消SKC请求体 接口：https://yapi.tiangong.site/project/37/interface/api/4466
/**
 * 请求参数
 */
export interface ISpotSkcBatchCancelReq {
  /**
   * 取消SKC集合
   */
  designCodeList: string[];
  /**
   * 版单取消原因
   */
  cancelReason: string;
}
// ⬆️ 批量取消SKC请求体

// ⬇️ 获取复核预估核价信息响应体 接口：https://yapi.tiangong.site/project/37/interface/api/4670
/**
 * 响应数据
 */
export interface ISpotSpuGetReEstimateCheckPriceRes {
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * 预估核价id
   */
  predictCheckPriceId: string;
  /**
   * 预估核价价格
   */
  estimateCheckPrice: string;
  /**
   * 核价师ID
   */
  pricerId: string;
  /**
   * 核价师名称
   */
  pricerName: string;
  spotSpuSupplier: ISpotSpuGetReEstimateCheckPriceResSpotSpuSupplier;
  productPictureList: string[];
}
/**
 * 供应商
 */
export interface ISpotSpuGetReEstimateCheckPriceResSpotSpuSupplier {
  /**
   * 主键
   */
  spotSpuSupplierId: string;
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * 数据来源: 10-自建款; 20-选款;
   */
  sourceType: string;
  /**
   * 供应商编码
   */
  supplierCode: string;
  /**
   * 供应商名称
   */
  supplierName: string;
  /**
   * 收款人id
   */
  payeeId: string;
  /**
   * 收款人编码
   */
  payeeCode: string;
  /**
   * 收款人名称
   */
  payeeName: string;
  /**
   * 供应商款号
   */
  supplierStyle: string;
  /**
   * 采购价
   */
  purchasePrice: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 租户id
   */
  tenantId: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 更新人id
   */
  reviserId: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted: string;
}
// ⬆️ 获取复核预估核价信息响应体

// ⬇️ 核价复核 现货款请求体 接口：https://yapi.tiangong.site/project/38/interface/api/4430
/**
 * 请求参数对象
 */
export interface IEstimateCheckPriceReviewPriceCheckReq {
  /**
   * 预估核价表ID
   */
  estimateCheckPriceId: string;
  /**
   * 定价类型 1.按返单定价 2.按不返单定价
   */
  priceType: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价 REJECTION 驳回
   * 复核结果=驳回时候，传REJECTION 驳回，其他时候为空\不传；
   */
  clothesCheckPriceState?: CHECK_SAMPLE_PRICE_STATUS_ENUM;
  /**
   * 驳回原因
   */
  disapprovalReason: string;
  /**
   * 是否复核通过 0-未通过，1-已通过
   */
  isReview: string;
}
// ⬆️ 核价复核 现货款请求体

// ⬇️ 日志查询请求体 接口：https://yapi.tiangong.site/project/37/interface/api/1931
/**
 * 查询入参
 */
export interface IBizListReq {
  /**
   * 业务id
   */
  bizId?: number;
  /**
   * SPU  现货管理的日志传spu
   */
  styleCode?: string;
}
// ⬆️ 日志查询请求体

// ⬇️ 日志查询响应体 接口：https://yapi.tiangong.site/project/37/interface/api/1931
/**
 * 响应数据
 */
export type IBizListRes = {
  /**
   * 自增id
   */
  id: string;
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型:
   *  1:设计拆版 2:物料确认(旧) 3:开发bom 4:采购申请 5:采购齐套管理 6:上新管理(旧) 7:设计需求(旧);  8:需求任务(旧); 9:灵感设计需求; 10: 数码印花
   */
  bizType:
  | 'DESIGN_PROTOTYPE'
  | 'BOM_ORDER'
  | 'MATERIAL_PURCHASE'
  | 'ORDER_MATERIAL_FOLLOW'
  | 'DESIGN_DEMAND'
  | 'DIGITAL_PRINTING'
  | 'SPOT';
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 业务版本号
   */
  bizVersionNum: string;
  /**
   * 日志信息
   */
  content: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}[];
// ⬆️ 日志查询响应体

export interface ISpotSpuListSupplierReq {
  /**
   * 供应商名称
   */
  supplierNameList: string[];
  /**
   * 供应商款号
   */
  supplierStyleList: string[];
}

export type ISpotSpuListSupplierRes = ISpotSpuListSupplierResItem[];
export interface ISpotSpuListSupplierResItem {
  /**
   * 主键
   */
  spotSpuSupplierId: string;
  /**
   * SPU编码
   */
  styleCode: string;
  /**
   * 数据来源: 10-自建款; 20-选款;
   */
  sourceType: string;
  /**
   * 供应商名称
   */
  supplierName: string;
  /**
   * 供应商款号
   */
  supplierStyle: string;
}
/**
 * 设计师变更 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/114202
 */
export interface SpotStyleDesignerChangeReq {
  /** 现货SPU-ID数组 */
  taskIds: string[];
  /** 设计师id【设计师】 */
  designerId: string;
  /** 设计师名称【设计师】 */
  designerName?: string;
}

/**
 * 设计师变更 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/114202
 */
export interface SpotStyleDesignerChangeRes {
}
