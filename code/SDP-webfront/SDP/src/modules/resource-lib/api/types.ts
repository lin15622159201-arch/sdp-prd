import { YES_NO_ENUM } from '@/constant/global';
import { CUSTOMER_CREDIGRANTING_STATE_ENUM } from '../constant';

// 纸样标签列表
export interface IClothingTag {
  id?: string; // number非必须
  name?: string; // 非必须标签名称
  subTagName?: string; // 非必须标签名称
  code?: string; // 非必须标签编码
  sort?: string; // 排序
  parentCode?: string; // 非必须父标签编码
  status?: string; // 非必须标签状态1-启用 2-停用
  creator?: string; // 非必须创建人ID
  createdTime?: string; // 非必须
  revisedTime?: string; // 非必须
  next?: IClothingTag[] | IClothingTag; // 子标签
  children?: IClothingTag[] | IClothingTag; // 子标签 同next
  rules?: any;
}

// ⬇️ 【标签表】查询列表（分页）响应体 接口：https://yapi.tiangong.site/project/1302/interface/api/80690
/**
 * 响应数据
 */
export interface IClothingTagPageRes {
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
  list: IClothingTagPageResListItem[];
}
export interface IClothingTagPageResListItem {
  /**
   * 主键id
   */
  id: string;
  /**
   * 标签名称
   */
  name: string;
  /**
   * 标签编码
   */
  code: string;
  /**
   * 父标签编码
   */
  parentCode: string;
  /**
   * 父标签编码
   */
  parentName: string;
  /**
   * 标签状态是否启用 0 否 1是
   */
  status: string;
  /**
   * 标签状态1-启用 0-停用
   */
  statusName: string;
  /**
   * 标签的操作日志信息
   */
  logList: IClothingTagPageResLogListItem[];
  /**
   * 标签排序(从小到大排序)
   */
  sort: string;
}
export interface IClothingTagPageResLogListItem {
  /**
   * 主键id
   */
  id: string;
  /**
   * 业务ID
   */
  buzId: string;
  /**
   * 操作说明
   */
  content: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
// ⬆️ 【标签表】查询列表（分页）响应体

// 样衣排料列表
export interface ISampleMaterialPlanPagePictureUrlListItem {
  /**
   * 图片类型
   */
  samplePictureType: 'CUSTOMER' | 'DESIGN' | 'MARK_FRAME';
  /**
   * 图片url
   */
  pictureUrl: string;
}
export interface ISampleMaterialPlanPageOperationLogListItem {
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
   * 操作时间
   */
  operationTime: string;
}
export interface ISampleMaterialPlanPageMaterialRemarkListItem {
  /**
   * 备注ID
   */
  designRemarksId: string;
  /**
   * 备注信息
   */
  remark: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
export interface ISampleMaterialPlanPageCraftDemandInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * bom详情ID
   */
  bomMaterialId: string;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1: string;
  /**
   * 材料类型 二级分类
   */
  category2: string;
  /**
   * 材料类型 三级分类
   */
  category3: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName: string;
  /**
   * 工艺承接者-联系人
   */
  contactName: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement: string;
  /**
   * 尺寸要求
   */
  sizeRequirement: string;
  /**
   * 颜色要求
   */
  colorRequirement: string;
  /**
   * 克重要求
   */
  weightRequirement: string;
  /**
   * 其他工艺要求
   */
  otherRequirement: string;
  /**
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId: string;
  /**
   * 第三方工艺需求编号
   */
  thirdPartyCraftDemandCode: string;
  /**
   * 打版价单位
   */
  sampleUnit: string;
  /**
   * 打版价
   */
  samplePrice: string;
  /**
   * 大货价单位
   */
  bulkUnit: string;
  /**
   * 大货价
   */
  bulkPrice: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 创建人名称
   */
  creatorName: string;
}
export interface ISampleMaterialPlanPageBomOrderMaterialListItem {
  /**
   * bom物料ID
   */
  bomMaterialId: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * 物料确认结果ID
   */
  trackResultId: string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName: string;
  /**
   * 使用部位,字典code
   */
  partUse: string;
  /**
   * 单件用量
   */
  singleDosage: string;
  /**
   * 裁剪方式
   */
  cuttingMethod: string;
  /**
   * 用量核算
   */
  dosageAccount: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: ISampleMaterialPlanPageMaterialRemarkListItem[];
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState: string;
  /**
   * 需求单id
   */
  demandId: string;
  /**
   * 需求单编号
   */
  demandCode: string;
  /**
   * 需求序号
   */
  demandTag: string;
  /**
   * 辅料关联的面料tag
   */
  fabricDemandTag: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料;
   */
  demandType: string;
  /**
   * 需求匹配单id
   */
  matchId: string;
  /**
   * 需求匹配单编码
   */
  matchCode: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 辅料
   */
  commodityType: string;
  /**
   * 商品名称(品名)
   */
  commodityName: string;
  /**
   * 商品id
   */
  commodityId: string;
  /**
   * 匹配物料图片
   */
  matchPictureList: string[];
  /**
   * 匹配物料SPU编码: 商品编码
   */
  commodityCode: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber: string;
  /**
   * 成分; json, 会有多种成分比例
   */
  material: string;
  /**
   * skuId
   */
  skuId: string;
  /**
   * SKU编码
   */
  skuCode: string;
  /**
   * 销售价格(辅料)
   */
  matchSalePrice: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName: string;
  /**
   * 包装数量(辅料)
   */
  packNumber: string;
  /**
   * 包装数量单位(辅料)
   */
  packNumberUnit: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs: string;
  /**
   * 幅宽最低值
   */
  widthLow: string;
  /**
   * 幅宽最高值
   */
  widthHigh: string;
  /**
   * 幅宽单位
   */
  widthUnit: string;
  /**
   * 销售单位
   */
  saleUnit: string;
  /**
   * 克重最低值
   */
  weightLow: string;
  /**
   * 克重最高值
   */
  weightHigh: string;
  /**
   * 克重单位
   */
  weightUnit: string;
  /**
   * 色系
   */
  colorName: string;
  /**
   * 色号
   */
  colorNumber: string;
  /**
   * 剪版销价
   */
  matchSampleGuidePrice: string;
  /**
   * 剪版销价单位
   */
  matchSampleUnit: string;
  /**
   * 大货销价
   */
  matchGuidePrice: string;
  /**
   * 大货销价单位
   */
  matchCostPriceUnit: string;
  /**
   * 销售空差
   */
  matchPurchaseGap: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource: string;
  /**
   * 回复人员
   */
  matcherName: string;
  /**
   * 匹配反馈备注
   */
  matchRemark: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason: string;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPictureList: string[];
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm: string;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList: ISampleMaterialPlanPageCraftDemandInfoListItem[];
}
export interface ISampleMaterialPlanPageSubItemListItem {}
export interface ISampleMaterialPlanPageReq {
  /**
   * 设计款号
   */
  designCodeLike?: string;
  /**
   * spu
   */
  styleCodeLike?: string;
  /**
   * 核算师
   */
  checkerIdList?: number[];
  /**
   * 创建时间(开始)
   */
  createdTimeStart?: string;
  /**
   * 创建时间（结束）
   */
  createdTimeEnd?: string;
  /**
   * 版本号
   */
  versionNo?: string | number;
  hasChildren?: boolean;
  /**
   * 款式品类
   */
  category?: string;
  /**
   * 区域ID
   */
  regionIdList?: string[];
  pageNum?: number;
  pageSize?: number;
  createdTime?: string[];
  designerGroup?: string;
}
export interface ISampleMaterialPlanPageListItem {
  checkCountId: string;
  /**
   * 核算师id
   */
  checkerId: string;
  /**
   * 核算师名称
   */
  checkerName: string;
  /**
   * 图片,包含客户图片、设计图片、唛架图片
   */
  pictureUrlList: ISampleMaterialPlanPagePictureUrlListItem[];
  /**
   * 操作日志
   */
  operationLogList: ISampleMaterialPlanPageOperationLogListItem[];
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 版本号
   */
  versionNo: string | number;
  hasChildren?: boolean;
  createdTime: string;
  /**
   * bom物料列表
   */
  bomOrderMaterialList: ISampleMaterialPlanPageBomOrderMaterialListItem[];
  /**
   * 子版本
   */
  subItemList: ISampleMaterialPlanPageSubItemListItem[];
}
export interface ISampleMaterialPlanPageRes {
  page: string;
  total: string;
  list: ISampleMaterialPlanPageListItem[];
}
// 大货纸样列表
export interface IProdDesignFilePageDesignFilePictureListItem {
  /**
   * 纸样文件名称
   */
  designFileName: string;
  /**
   * 纸样文件名称链接
   */
  designFileUrl: string;
}
export interface IProdDesignFilePageDesignFileLinkListItem {
  /**
   * 纸样文件名称
   */
  designFileName: string;
  /**
   * 纸样文件名称链接
   */
  designFileUrl: string;
}
export interface IProdDesignFilePagePictureUrlListItem {
  /**
   * 图片类型
   */
  samplePictureType: 'CUSTOMER' | 'DESIGN' | 'MARK_FRAME';
  /**
   * 图片url
   */
  pictureUrl: string;
}
export interface IProdDesignFilePageOperationLogListItem {
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
   * 操作时间
   */
  operationTime: string;
}
export interface IProdDesignFilePageSubItemListItem {}
export interface IProdDesignFilePageReq {
  /**
   * 设计款号
   */
  styleCodeLike?: string;
  /**
    * spu
    */
  styleCode?: string;
  /**
   * 创建时间(开始)
   */
  createdTimeStart?: string;
  /**
   * 创建时间（结束）
   */
  createdTimeEnd?: string;
  /**
   * 版本号
   */
  versionNo?: string | number;
  hasChildren?: boolean;
  /**
   * 款式品类
   */
  category?: string;
  /**
   * 区域ID
   */
  pageNum?: number;
  pageSize?: number;
  createdTime?: string[];
  regionIdList?: string[];

}
export interface IProdDesignFilePageListItem {
  prodDesignId: string;
  /**
   * 纸样文件-图片
   */
  designFilePictureList: IProdDesignFilePageDesignFilePictureListItem[];
  /**
   * 纸样文件-链接
   */
  designFileLinkList: IProdDesignFilePageDesignFileLinkListItem[];
  /**
   * 图片,包含客户图片、设计图片、唛架图片
   */
  pictureUrlList: IProdDesignFilePagePictureUrlListItem[];
  /**
   * 操作日志
   */
  operationLogList: IProdDesignFilePageOperationLogListItem[];
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 版本号
   */
  versionNo: string | number;
  hasChildren?: boolean;
  createdTime: string;
  /**
   * 是否是转大货
   */
  sampleSwapProd: string;
  /**
   * 子版本
   */
  subItemList: IProdDesignFilePageSubItemListItem[];
}
export interface IProdDesignFilePageRes {
  page: string;
  total: string;
  list: IProdDesignFilePageListItem[];
}
// 大货尺寸列表
export interface IResourceLibPictureUrlListItem {
  /**
   * 图片类型
   */
  samplePictureType: 'CUSTOMER' | 'DESIGN' | 'MARK_FRAME';
  /**
   * 图片url
   */
  pictureUrl: string;
}
export interface IResourceLibOperationLogListItem {
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
   * 操作时间
   */
  operationTime: string;
}
export interface IProdDesignSizePageSkipSizeQuotientListItem {
  /**
   * 尺码
   */
  size: string;
  /**
   * 尺寸
   */
  data: string;
}
export interface IProdDesignSizePageSizeListItem {
  /**
   * 尺码
   */
  size: string;
  /**
   * 尺寸
   */
  data: string;
}
export interface IProdDesignSizePageStyleSizeInfoListItem {
  /**
   * 部位
   */
  position: string;
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension: string;
  /**
   * 量法
   */
  measureWay: string;
  /**
   * 样衣尺寸
   */
  sampleSize: string;
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage: string;
  /**
   * 纸样尺寸
   */
  designSize: string;
  /**
   * 纸样尺寸基码
   */
  designBaseYardage: string;
  /**
   * 跳码系数
   */
  skipSizeQuotientList: IProdDesignSizePageSkipSizeQuotientListItem[];
  /**
   * 尺寸数据
   */
  sizeList: IProdDesignSizePageSizeListItem[];
  /**
   * 允差范围
   */
  deviationRange: string;
}
export interface IProdDesignSizePageSubItemListItem {}
export interface IProdDesignSizePageReq {
  /**
   * 设计款号
   */
  styleCodeLike?: string;
  /**
   * spu
   */
  styleCode?: string;
  /**
   * 创建时间(开始)
   */
  createdTimeStart?: string;
  /**
   * 创建时间（结束）
   */
  createdTimeEnd?: string;
  /**
   * 版本号
   */
  versionNo?: string | number;
  hasChildren?: boolean;
  /**
   * 款式品类
   */
  category?: string;
  /**
   * 区域ID
   */
  regionIdList?: string[];
  pageNum?: number;
  pageSize?: number;
  createdTime?: string[];
}
export interface IProdDesignSizePageListItem {
  prodSizeId: string;
  /**
   * 图片,包含客户图片、设计图片、唛架图片
   */
  pictureUrlList: IResourceLibPictureUrlListItem[];
  /**
   * 操作日志
   */
  operationLogList: IResourceLibOperationLogListItem[];
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 版本号
   */
  versionNo: string | number;
  hasChildren?: boolean;
  createdTime: string;
  /**
   * 是否是转大货
   */
  sampleSwapProd: string;
  /**
   * 尺寸信息
   */
  styleSizeInfoList: IProdDesignSizePageStyleSizeInfoListItem[];
  /**
   * 子版本
   */
  subItemList: IProdDesignSizePageSubItemListItem[];
}
export interface IProdDesignSizePageRes {
  page: string;
  total: string;
  list: IProdDesignSizePageListItem[];
}
// 开发bom库列表
export interface IOrderPageMaterialRemarkListItem {
  /**
   * 备注ID
   */
  designRemarksId: string;
  /**
   * 备注信息
   */
  remark: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
export interface IOrderPageCraftDemandInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * bom详情ID
   */
  bomMaterialId: string;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1: string;
  /**
   * 材料类型 二级分类
   */
  category2: string;
  /**
   * 材料类型 三级分类
   */
  category3: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName: string;
  /**
   * 工艺承接者-联系人
   */
  contactName: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement: string;
  /**
   * 尺寸要求
   */
  sizeRequirement: string;
  /**
   * 颜色要求
   */
  colorRequirement: string;
  /**
   * 克重要求
   */
  weightRequirement: string;
  /**
   * 其他工艺要求
   */
  otherRequirement: string;
  /**
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId: string;
  /**
   * 第三方工艺需求编号
   */
  thirdPartyCraftDemandCode: string;
  /**
   * 打版价单位
   */
  sampleUnit: string;
  /**
   * 打版价
   */
  samplePrice: string;
  /**
   * 大货价单位
   */
  bulkUnit: string;
  /**
   * 大货价
   */
  bulkPrice: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 创建人名称
   */
  creatorName: string;
}
export interface IOrderPageBomInfoItem {
  /**
   * bom物料ID
   */
  bomMaterialId: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * 物料确认结果ID
   */
  trackResultId: string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName: string;
  /**
   * 使用部位,字典code
   */
  partUse: string;
  /**
   * 单件用量
   */
  singleDosage: string;
  /**
   * 裁剪方式
   */
  cuttingMethod: string;
  /**
   * 用量核算
   */
  dosageAccount: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: IOrderPageMaterialRemarkListItem[];
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState: string;
  /**
   * 需求单id
   */
  demandId: string;
  /**
   * 需求单编号
   */
  demandCode: string;
  /**
   * 需求序号
   */
  demandTag: string;
  /**
   * 辅料关联的面料tag
   */
  fabricDemandTag: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料;
   */
  demandType: string;
  /**
   * 需求匹配单id
   */
  matchId: string;
  /**
   * 需求匹配单编码
   */
  matchCode: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 辅料
   */
  commodityType: string;
  /**
   * 商品名称(品名)
   */
  commodityName: string;
  /**
   * 商品id
   */
  commodityId: string;
  /**
   * 匹配物料图片
   */
  matchPictureList: string[];
  /**
   * 匹配物料SPU编码: 商品编码
   */
  commodityCode: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber: string;
  /**
   * 成分; json, 会有多种成分比例
   */
  material: string | { name: string; percent: string; }[];
  /**
   * skuId
   */
  skuId: string;
  /**
   * SKU编码
   */
  skuCode: string;
  /**
   * 销售价格(辅料)
   */
  matchSalePrice: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName: string;
  /**
   * 包装数量(辅料)
   */
  packNumber: string;
  /**
   * 包装数量单位(辅料)
   */
  packNumberUnit: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs: string | { attrId?: string; attrName?: string;attrValue?: string;[propName: string]: any; }[];
  /**
   * 幅宽最低值
   */
  widthLow: string;
  /**
   * 幅宽最高值
   */
  widthHigh: string;
  /**
   * 幅宽单位
   */
  widthUnit: string;
  /**
   * 销售单位
   */
  saleUnit: string;
  /**
   * 克重最低值
   */
  weightLow: string;
  /**
   * 克重最高值
   */
  weightHigh: string;
  /**
   * 克重单位
   */
  weightUnit: string;
  /**
   * 色系
   */
  colorName: string;
  /**
   * 色号
   */
  colorNumber: string;
  /**
   * 剪版销价
   */
  matchSampleGuidePrice: string;
  /**
   * 剪版销价单位
   */
  matchSampleUnit: string;
  /**
   * 大货销价
   */
  matchGuidePrice: string;
  /**
   * 大货销价单位
   */
  matchCostPriceUnit: string;
  /**
   * 销售空差
   */
  matchPurchaseGap: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource: string;
  /**
   * 回复人员
   */
  matcherName: string;
  /**
   * 匹配反馈备注
   */
  matchRemark: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason: string;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPictureList: string[];
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm: string;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList: IOrderPageCraftDemandInfoListItem[];

  sort?: number;
}
export interface IOrderPagePictureUrlItem {
  /**
   * 图片类型
   */
  samplePictureType: 'CUSTOMER' | 'DESIGN' | 'MARK_FRAME';
  /**
   * 图片url
   */
  pictureUrl: string;
}
export interface IOrderPageLogJsonItem {
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
   * 操作时间
   */
  operationTime: string;
}
export interface IOrderPageSubBomOrderListVOItem {}
export interface IOrderPageListItem {
  bomId: string;
  /**
   * bom表单编号
   */
  bomCode: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * bom信息列表
   */
  bomOrderMaterialList: IOrderPageBomInfoItem[];
  /**
   * 父ID
   */
  parentId: string;
  /**
   * 图片,包含客户图片、设计图片、唛架图片
   */
  pictureUrl: IOrderPagePictureUrlItem[];
  /**
   * 操作日志 json
   */
  logJson: IOrderPageLogJsonItem[];
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 版本号
   */
  versionNo: string | number;
  hasChildren?: boolean;
  /**
   * 创建人名字
   */
  creatorName: string;
  createdTime: string;
  /**
   * 客户id
   */
  purchaserId: string;
  /**
   * 客户编号
   */
  purchaserCode: string;
  /**
   * 客户名称
   */
  purchaserName: string;
  /**
   * 客户联系人id
   */
  purchaserContactId: string;
  /**
   * 客户联系人姓名
   */
  purchaserContactName: string;
  /**
   * 客户联系人方式
   */
  purchaserContactMobile: string;
  /**
   * 订单类型。1-产前样 2-正常打版 3-复色打版
   */
  sampleType: string;
  /**
   * 是否补做 0 否 1是
   */
  isMakeMore: boolean;
  /**
   * 所属BDid
   */
  bdId: string;
  /**
   * bd名称【销售BD】
   */
  bdName: string;
  /**
   * 设计组
   */
  designerGroup: string;
  /**
   * 需求创建人员id
   */
  entryTypistId: string;
  /**
   * 需求创建人员编号
   */
  entryTypistCode: string;
  /**
   * 需求创建人员
   */
  entryTypistName: string;
  /**
   * SPU生成时间
   */
  spuCreatedTime: string;
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime: string;
  /**
   * 订单类型: 1-打版订单 2-设计订单 3-加工订单；1、2属于样衣，3属于生产(大货)
   */
  demandTaskType: string;
  /**
   * 子版本
   */
  subBomOrderListVO: IOrderPageSubBomOrderListVOItem[];
  isDeleted: string;
  creatorId: string;
  designerIdWithBS?: string;
}
export interface IOrderPageReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 创建时间开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间结束
   */
  createdTimeEnd?: string;
  /**
   * 版本号
   */
  versionNo?: string | number;
  hasChildren?: boolean;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: string;
  regionIdList?: string[];
  pageNum?: number;
  pageSize?: number;
  createdTime?: string[];
  categoryList?: string[];
}
export interface IOrderPageRes {
  page: string;
  total: string;
  list: IOrderPageListItem[];
}
// 开发纸样库列表
export interface IClothesPagePictureUrlItem {
  /**
   * 图片类型
   */
  samplePictureType: 'CUSTOMER' | 'DESIGN' | 'MARK_FRAME';
  /**
   * 图片url
   */
  pictureUrl: string;
}
export interface IClothesPageLogJsonItem {
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
   * 操作时间
   */
  operationTime: string;
}
export interface IClothesPageSubPatternClothesVoItem {}
export interface IClothesPageListItem {
  patternId: string;
  /**
   * 纸样文件名字
   */
  patternName: string;
  /**
   * 纸样url
   */
  patternUrl: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 父ID
   */
  parentId: string;
  /**
   * 图片,包含客户图片、设计图片、唛架图片
   */
  pictureUrl: IClothesPagePictureUrlItem[];
  /**
   * 操作日志 json
   */
  logJson: IClothesPageLogJsonItem[];
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 版本号
   */
  versionNo: string | number;
  hasChildren?: boolean;
  /**
   * 创建人名字
   */
  creatorName: string;
  createdTime: string;
  /**
   * 子版本
   */
  subPatternClothesVo: IClothesPageSubPatternClothesVoItem[];
  // 设计款生成时间
  skcCreatedTime: string;
  // 颜色
  color: string;
}
export interface IClothesPageReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 创建时间开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间结束
   */
  createdTimeEnd?: string;
  /**
   * 版本号
   */
  versionNo?: string | number;
  hasChildren?: boolean;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionIdList?: string[];
  pageNum?: number;
  pageSize?: number;
  createdTime?: string[];
  categoryList?: string[];
  // 款式号
  styleCode?: string;
}
export interface IClothesPageRes {
  page: string;
  total: string;
  list: IClothesPageListItem[];
}
// 开发尺寸库列表
export interface IPatternClothesSizePagePatternClothesSizeListItem {
  /**
   * 部位编码
   */
  positionCode: string;
  /**
   * 部位编码名字
   */
  positionName: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measuringMethod: string;
  /**
   * 客户尺寸
   */
  size: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 允差范围
   */
  tolerance: string;
}
export interface IPatternClothesSizePagePictureUrlItem {
  /**
   * 图片类型
   */
  samplePictureType: 'CUSTOMER' | 'DESIGN' | 'MARK_FRAME';
  /**
   * 图片url
   */
  pictureUrl: string;
}
export interface IPatternClothesSizePageLogJsonItem {
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
   * 操作时间
   */
  operationTime: string;
}
export interface IPatternClothesSizePageSubPatternClothesSizeVoItem {}
export interface IPatternClothesSizePageListItem {
  patternSizeId: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 客户尺寸信息
   */
  patternClothesSizeList: IPatternClothesSizePagePatternClothesSizeListItem[];
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 父ID
   */
  parentId: string;
  /**
   * 图片,包含客户图片、设计图片、唛架图片
   */
  pictureUrl: IPatternClothesSizePagePictureUrlItem[];
  /**
   * 操作日志 json
   */
  logJson: IPatternClothesSizePageLogJsonItem[];
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 版本号
   */
  versionNo: string | number;
  hasChildren?: boolean;
  /**
   * 创建人名字
   */
  creatorName: string;
  createdTime: string;
  /**
   * 子版本
   */
  subPatternClothesSizeVo: IPatternClothesSizePageSubPatternClothesSizeVoItem[];
  // 设计款生成时间
  skcCreatedTime: string;
  // 颜色
  color: string;
}
export interface IPatternClothesSizePageReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 创建时间开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间结束
   */
  createdTimeEnd?: string;
  /**
   * 版本号
   */
  versionNo?: string | number;
  hasChildren?: boolean;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionIdList?: string[];
  pageNum?: number;
  pageSize?: number;
  createdTime?: string[];
  categoryList?: string[];
  // 款式号
  styleCode?: string;
}
export interface IPatternClothesSizePageRes {
  page: string;
  total: string;
  list: IPatternClothesSizePageListItem[];
}

export type ISpecialRequirementListReq = Record<string, unknown>;
export interface ISpecialRequirementListResItem {
  /**
   * 枚举代码
   */
  code: string;
  /**
   * 枚举描述
   */
  desc: string;
}
export type ISpecialRequirementListRes = ISpecialRequirementListResItem[];

/**
 * 齐料仓信息
 */
export interface IBomDetailWarehouseColorInfo {
  /**
   * sku信息的id
   */
  skuId: string;
  /**
   * 色号
   */
  colorNumber: string;
  /**
   * sku编号
   */
  skuCode: string;
  /**
   * 可用数量 实际-冻结-已出
   */
  remainingQuantity: string;
  /**
   * sku颜色描述
   */
  colorNumberDesc: string;
  /**
   * sku色系
   */
  colorSystem: string;
  /**
   * 所在仓库
   */
  warehouseName: string;
  /**
   * 所属区域
   */
  belongArea: string;
  /**
   * 供应商所属区域
   */
  supplierRegion: string;
  /**
   * 仓库区域ID
   */
  regionId: string;
}
export interface IBomDetailMaterialRemarkListItem {
  /**
   * 备注ID
   */
  designRemarksId: string;
  /**
   * 备注信息
   */
  remark: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作人名称
   */
  createdName: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
export interface getWebV1BomDetailApiResBomOrderMaterialListResItem {
  /**
   * 对色/包扣状态: 0-无; 1-对色; 2-包扣; (默认0) --v3.11
   */
  colorMatchMaterialState: string;
  /**
      * 对色/包扣对应物料名 --v3.11
      */
  colorMatchMaterialName: string;
  /**
      * 对色/包扣对应物料id --v3.11
      */
  colorMatchMaterialId: string;
  /**
   * 是否可用 1-可用 0-不可用
   */
  enableState: string;
  /**
    * bom物料ID(复制, 前端处理引用物料使用)
    */
  bomMaterialIdCopy?: string;
  /**
   * bom物料ID
   */
  bomMaterialId: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * 物料确认结果ID
   */
  trackResultId: string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName: string;
  /**
   * 使用部位,字典code
   */
  partUse: string;
  /**
   * 单件用量
   * 「已废弃」
   */
  singleDosage: string;
  /**
   * 裁剪方式
   */
  cuttingMethod: string;
  /**
   * 用量核算
   */
  dosageAccount: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: IBomDetailMaterialRemarkListItem[];
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState: string;
  /**
   * 需求单id
   */
  demandId: string;
  /**
   * 需求单编号
   */
  demandCode: string;
  /**
   * 需求序号
   */
  demandTag: string;
  /**
   * 辅料关联的面料tag
   */
  fabricDemandTag: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料 ---V.1.8.4
   */
  demandType: string;
  /**
   * 需求匹配单id
   */
  matchId: string;
  /**
   * 需求匹配单编码
   */
  matchCode: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES   ---0421-V.1.8.4
   */
  commodityType: string;
  /**
   * 商品名称(品名)
   */
  commodityName: string;
  /**
   * 商品id
   */
  commodityId: string;
  /**
   * 商品编码
   */
  commodityCode: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber: string;
  /**
   * skuId
   */
  skuId: string;
  /**
   * SKU编码
   */
  skuCode: string;
  /**
   * 成分; json, 会有多种成分比例
   */
  material: string;
  /**
   * 匹配物料图片
   */
  matchPictureList: string[];
  /**
   * 销售价格(辅料)
   */
  matchSalePrice: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName: string;
  /**
   * 包装数量(辅料)
   */
  packNumber: string;
  /**
   * 包装数量单位(辅料)
   */
  packNumberUnit: string;
  /**
   * 辅料主单位(对应履约-包装计价单位名称)  ---211208-v1.1
   */
  packUnitName: string;
  /**
   * 辅料副单位(对应履约-包装计价副单位名称)  ---211208-v1.1
   */
  packAssistantUnitName: string;
  /**
   * 辅料最小价格  ---211208-v1.1
   */
  minPrice: string;
  /**
   * 辅料最小单位  ---211208-v1.1
   */
  minPriceUnit: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs: string;
  /**
   * @deprecated 门幅最低值 已废弃
   */
  widthLow: string;
  /**
   * @deprecated 门幅最高值 已废弃
   */
  widthHigh: string;
  /**
   * @deprecated 门幅单位 已废弃
   */
  widthUnit: string;
  /**
   * 幅宽; 格式如: '120-130CM'或'125±5CM'  --v5.11
   */
  widthStrFormat: string;
  /**
   * 销售单位
   */
  saleUnit: string;
  /**
   * @deprecated 克重最低值 已废弃
   */
  weightLow: string;
  /**
   * @deprecated 克重最高值 已废弃
   */
  weightHigh: string;
  /**
   * @deprecated 克重单位 已废弃
   */
  weightUnit: string;
  /**
   * 克重; 格式如: '120-130g'或'120±5g'  --v5.11

      需求:
      未迁移到中台的商品，字符串形式为如“120-130g”这样的格式；
      如果是迁移到中台的商品，字符串形式为如“120±5g”这样的格式；
   */
  weightStrFormat: string;
  /**
   * 色系
   */
  colorName: string;
  /**
   * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号
   */
  colorType: string;
  warehouseColorInfo: IBomDetailWarehouseColorInfo;
  /**
   * 色号
   */
  colorNumber: string;
  /**
   * 剪版销价
   */
  matchSampleGuidePrice: string;
  /**
   * 剪版销价单位
   */
  matchSampleUnit: string;
  /**
   * 大货销价
   */
  matchGuidePrice: string;
  /**
   * 大货销价单位
   */
  matchCostPriceUnit: string;
  /**
   * 销售空差     ---设计打版2.1-0615
   */
  matchPurchaseGap: string;
  /**
   * 足米价  --211208-v1.1
   */
  meterPrice: string;
  /**
   * 足米价单位   ---211208-v1.1
   */
  meterPriceUnit: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource: string;
  /**
   * 回复人员
   */
  matcherName: string;
  /**
   * 匹配反馈备注
   */
  matchRemark: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason: string;
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
  isConfirm: string;
  /**
   * bom物料排序
   */
  sort: string;
  /**
   * 用量核算-幅宽确认值 ---1222-v1.2
   */
  widthConfirm: string;
  /**
   * 供应商ID    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  supplierId: string;
  /**
   * 供应商编号    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  supplierCode: string;
  /**
   * 供应商名称    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  supplierName: string;
  /**
   * 商品进货价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  purchasePrice: string;
  /**
   * 商品销售价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  skuPrice: string;
  /**
   * 特殊辅料标识ID，用于区分上下版本关系   commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  accessoriesFlagId: string;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList: CreftItem[];
  /**
   * 采购次数
   */
  purchaseApplyFollowCount: string;
  /**
   * 用量核算单位    ---设计打版2.1-0615
   */
  dosageAccountUnit: string;
  /**
   * 损耗率   ---设计打版2.1-0615
   */
  attritionRate: string;
  /**
   * 大货进价 单位元   ---设计打版2.1-0615
   */
  bulkPurchasePrice: string;
  /**
   * 大货进价单位，指 米 或 千克  ---设计打版2.1-0615
   */
  bulkPurchasePriceUnit: string;
  /**
   * 物料快照id
   */
  materialSnapshotId: string;
  /**
   * 是否无工艺 1-是  0-否
   */
  isNoCraft: string;
  /**
   * 物料图,多值以逗号隔开
   *  - 对接淘系
   */
  materialImg: string;
  /**
   * 商品编码 - 混淆加密
   * - 对接淘系
   */
  encryptionCommodityCode: string;
  /**
   * skuCode - 混淆加密
   *  - 对接淘系
   */
  encryptionSkuCode: string;
  /**
   * 品名 - 混淆加密
   *  - 对接淘系
   */
  encryptionCommodityName: string;
  /**
   * 识别选中
   *  - 对接淘系
   */
  identifySelection: boolean;
  /**
   * JV 面料识别物料id
   */
  identifyMaterialId: string;
}
export interface IBomDetailBomOrderHistoryVersionListItem {
  /**
   * bomId
   */
  bomId: string;
  /**
    * bom表单编号
    */
  bomCode: string;
  /**
    * bom版本号
    */
  bomVersionNum: string;
  /**
    * bom订单状态 WAIT_SUBMIT:待提交 SUBMITTED:已提交 WAIT_CALCULATED:待核算 CALCULATED:已核算 CLOSED:已关闭
    */
  bomOrderState:
  | 'WAIT_SUBMIT'
  | 'SUBMITTED'
  | 'CALCULATED'
  | 'CLOSED'
  | 'UNKNOWN';
}

/**
 * **返回类型**
 * bom详情
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84172
 *
 * @请求方法: GET
 * @请求地址: /plm-design/web/v1/bom/detail
 * @更新时间: 2021-08-19 12:01:56
 */
export interface CreftItem {
  sampleCraftCycle: string;
  sampleCraftCycleUnit: string;
  bulkCraftCycle: string;
  bulkCraftCycleUnit: string;
  /**
   * 工艺需求主键id
   */
  craftDemandId: string;
  /**
    * 设计款号
    */
  designCode: string;
  /**
    * bomID
    */
  bomId: string;
  /**
    * bom详情ID
    */
  bomMaterialId: string;
  /**
    * 工艺状态 100:已提交 190:已关闭
    */
  state: 'SUBMIT' | 'CLOSED' | 'UNKNOWN';
  /**
    * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
    */
  category1: string;
  /**
    * 材料类型 二级分类
    */
  category2: string;
  /**
    * 材料类型 三级分类
    */
  category3: string;
  /**
    * 工艺要求:  100:裁版前工艺 110:裁版后工艺
    */
  craftsRequire: string;
  /**
    * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
    */
  undertakeType: string;
  /**
    * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
    */
  customerSupplyFactory: string;
  /**
    * 内部工艺厂ID
    */
  innerFactoryId: string;
  /**
    * 工艺厂名,外部独有
    */
  factoryName: string;
  /**
    * 工艺承接者-联系人
    */
  contactName: string;
  /**
    * 工艺承接者-工厂联系电话
    */
  contactPhone: string;
  /**
    * 工艺承接者-所在省份
    */
  contactProvince: string;
  /**
    * 工艺承接者-所在城市
    */
  contactCity: string;
  /**
    * 工艺承接者-所在区/县
    */
  contactRegion: string;
  /**
    * 工艺承接者-详细地址
    */
  contactDetailAddress: string;
  /**
    * 工艺图片，最多9张
    */
  pictureList: string[];
  /**
    * 位置要求
    */
  positionRequirement: string;
  /**
    * 尺寸要求
    */
  sizeRequirement: string;
  /**
    * 颜色要求
    */
  colorRequirement: string;
  /**
    * 克重要求
    */
  weightRequirement: string;
  /**
    * 其他工艺要求
    */
  otherRequirement: string;
  /**
    * 工艺关联面料、辅料需求ID
    */
  relationDemandId: string;
  /**
    * 第三方工艺需求ID
    */
  thirdPartyCraftDemandId: string;
  /**
    * 第三方工艺需求编号 ---220421-v1.8.4
    */
  thirdPartyCraftDemandCode: string;
  /**
    * 打版价单位
    */
  sampleUnit: string;
  /**
    * 打版价
    */
  samplePrice: string;
  /**
    * 大货价单位
    */
  bulkUnit: string;
  /**
    * 大货价
    */
  bulkPrice: string;
  /**
    * 创建人id
    */
  creatorId: string;
  /**
    * 创建时间
    */
  createdTime: string;
  /**
    * 创建人名称
    */
  creatorName: string;
  /**
    * 物料需求id
    */
  materialDemandId: string;
  /**
    * 打版信息id
    */
  prototypeId: string;

}

/**
 * **请求类型**
 * bom修改
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84740
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/bom/update
 * @更新时间: 2021-08-23 18:08:51
 */

export interface AddCaftsItem {
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 二次工艺ID
   */
  craftDemandId?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 材料类型 一级分类 面料 辅料
   */
  category1?: string;
  /**
   * 工艺厂名
   */
  factoryName?: string;
  /**
   * 承接方式,
   * {
   * CRAFT_GROUP:工艺组,CUSTOMER:客户
   * }
   */
  undertakeType?: string;
  /**
   * 工艺图片，最多9张
   */
  picture?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: number;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: number;
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 工艺关联面料,辅料需求ID(第三方)
   */
  relationDemandId?: number;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  pictureList?: string[];
}
export interface postWebV1BomUpdateApiReqBomOrderMaterialListResItem {
  /**
   * 剪版方式,字典code
   */
  cuttingMethod?: string;
  /**
   * 删除二次工艺ID列表
   */
  delCraftDemandIdList?: string & number[];
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 物料确认结果ID
   */
  trackResultId?: number;
  /**
   * 新增二次工艺信息列表
   */
  addCraftDemandList?: AddCaftsItem[];
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState?: number;
  bomMaterialId?: number;
}
export interface PostWebV1BomUpdateApiReq {
  /**
   * bomId
   */
  bomId: number | string;
  /**
   * 打版件数 ---提交打印需要
   */
  plateMakingNum?: number;
  /**
   * bom物料列表
   */
  bomOrderMaterialList?: postWebV1BomUpdateApiReqBomOrderMaterialListResItem[];
}

// 客户详情
export type IPurchaserDetailReq = Record<string, unknown>;
export interface IPurchaserDetailRes {
  baseInfo: IPurchaserDetailBaseInfo;
  /**
   * 采购商寄送地址
   */
  purchaserDeliveryList: IPurchaserDetailPurchaserDeliveryListItem[];
  purchaserExtInfo: IPurchaserDetailPurchaserExtInfo;
  /**
   * 采购商绑定码
   */
  bindCode: string;
  /**
   * 联系人信息
   */
  contacts: IPurchaserDetailContactsItem[];
}

/**
 * 采购商扩展信息
 */
export interface IPurchaserDetailPurchaserExtInfo {
  /**
   * 销售渠道（多个，以逗号分割拼接）
   */
  salesChannels?: string;
  /**
   * 要求倾向
   */
  trendList: IPurchaserDetailTrendListItem[];
  /**
   * 年销售额：纯数字，带两位小数
   */
  annualSales: string;
  /**
   * 工艺要求
   */
  craftsRequirementsList: IPurchaserDetailCraftsRequirementsListItem[];
  /**
   * 客户品牌（多个，以逗号分割拼接）
   */
  customerBrand: string;
  /**
   * 主营类型
   */
  businessScope: string;
  /**
   * 采购商等级  ---优化202011
   */
  purchaserLevel: string;
  /**
   * 销售群体 多值逗号拼接
   *  例如 1,2,3
   */
  saleGroup: string;
  /**
   * 采购商id
   */
  purchaserId: string;
  /**
   * 尺寸要求链接
   */
  attachmentFileList: IPurchaserDetailAttachmentFileListItem[];
  /**
   * 采购商类型/来源
   */
  purchaserSource: string;
  /**
   * 自增id
   */
  id: string;
  /**
   * 品质要求（多个，以逗号分割拼接）
   */
  qualityRequirements: string;
  /**
   * 年产数量：纯数字，带两位小数
   */
  apQuantity: string;
}
export interface IPurchaserDetailTrendListItem {
  /**
   * 要求类型
   */
  claimType?: 'TREND' | 'CRAFTS';
  /**
   * 采购商id
   */
  purchaserId: string;
  /**
   * 内容
   */
  content: string;
}
export interface IPurchaserDetailCraftsRequirementsListItem {
  /**
   * 要求类型
   */
  claimType?: 'TREND' | 'CRAFTS';
  /**
   * 采购商id
   */
  purchaserId: string;
  /**
   * 内容
   */
  content: string;
}
export interface IPurchaserDetailAttachmentFileListItem {
  /**
   * 文件名称
   */
  fileName?: string;
  /**
   * url
   */
  fileLink: string;
  /**
   * 附件业务id
   */
  attachmentId: string;
}
export interface IPurchaserDetailContactsItem {
  /**
   * qq
   */
  qq?: string;
  /**
   * 联系人手机
   */
  contactMobile: string;
  /**
   * 联系人id,当存在联系人id时需必传，用于修改和新增判断
   */
  contactId: string;
  /**
   * 电子邮箱
   */
  contactEmail: string;
  /**
   * 联系人名称
   */
  contactName: string;
  /**
   * 联系人身份职位
   */
  contactPosition: string;
  /**
   * 自增id
   */
  id: string;
  /**
   * 联系人微信
   */
  contactWeChat: string;
  /**
   * 个人标签
   */
  labels: string[];
  /**
   * 是否启用
   */
  enable: YES_NO_ENUM;
}
/**
 * 采购商基础信息
 */
export interface IPurchaserDetailBaseInfo {
  /**
   * 是否是代理商:0-否,1-是
   */
  isAgency: YES_NO_ENUM;
  /**
   * 是否开通金融钱包
   */
  isWallet?: 'YES' | 'NO';
  /**
   * 城市
   */
  city: string;
  /**
   * worker_id部门id
   */
  departmentId: string;
  /**
   * 创建用户id 对应迁移前 createUser
   */
  creatorId: string;
  /**
   * 大楼
   */
  building: string;
  /**
   * 采购商图片
   */
  pictures: string[];
  /**
   * 采购商编号
   */
  purchaserCode: string;
  /**
   * 绑定业务员所属部门id
   */
  bindWorkerDepartmentId: string;
  /**
   * 省份
   */
  province: string;
  /**
   * 绑定业务员id
   */
  bindWorkerId: string;
  /**
   * 主账号手机
   */
  mainAccountMobile: string;
  /**
   * 创建时间 对应迁移前 createTime
   */
  createdTime: string;
  /**
   * 采购商属性
   */
  attribute: string;
  /**
   * 区域
   */
  area: string;
  /**
   * 公司地址
   */
  address: string;
  /**
   * 商圈
   */
  businessCircle: string;
  /**
   * 公司电话
   */
  telephone: string;
  /**
   * 公司名
   */
  purchaserName: string;
  /**
   * 绑定业务员名称
   */
  bindWorkerName: string;
  bindWorkerCode?: string;
  /**
   * 领取时间
   */
  receiveTime: string;
  /**
   * 采购商id
   */
  purchaserId: string;
  /**
   * 客户状态，1待审核，2通过
   */
  auditStatus: string;
  /**
   * 采购商类型1直销2大客户
   */
  purchaserType: string;
  /**
   * 授信状态
   */
  creditGrantingState: CUSTOMER_CREDIGRANTING_STATE_ENUM;
}
export interface IPurchaserDetailPurchaserDeliveryListItem {
  /**
   * 区域
   */
  area?: string;
  /**
   * 公司地址
   */
  address: string;
  /**
   * 城市
   */
  city: string;
  /**
   * 联系电话
   */
  telephone: string;
  /**
   * 无规则id
   */
  deliveryAddressId: string;
  /**
   * 是否默认：
   * {
   * 0-否 ,1-是
   * }
   */
  isDefault: string;
  /**
   * 采购商id
   */
  purchaserId: string;
  /**
   * 采购商编号
   */
  purchaserCode: string;
  /**
   * 省份
   */
  province: string;
  /**
   * 收件人名称
   */
  recipientName: string;
  /**
   * 寄送名称
   */
  deliveryName: string;
}

/**
 * 响应数据
 */
export type IBomTransientSaveRes = null;

export type ICraftMatchReq = Record<string, string>;
/**
 * 响应数据
 */

export interface ICraftMatchReqItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId: string;
  /**
   * 工艺需求编号
   */
  demandCode: string;
  /**
   * 第三方工艺需求ID(履约)
   */
  thirdPartyCraftDemandId: string;
  /**
   * spuId
   */
  spuId: string;
  /**
   * spu
   */
  spuCode: string;
  /**
   * sku的Id
   */
  skuId: string;
  /**
   * sku的code
   */
  skuCode: string;
  /**
   * 商品型号信息
   */
  specification: string;
  /**
   * 商品阶梯价   productStepPriceList.size()==1 为一口价,其他为阶梯价
   * 可参考履约页面 https://qa1-scm.yunbanfang.cn/#/demand-management/big-craft-demand/detail/6924926639655354368/0
   */
  productStepPriceVoList: ICraftMatchResProductStepPriceVoListItem[];
  /**
   * 比如单位:米,码数  注：商品阶梯价单位取值
   */
  unit: string;
  /**
   * 供应商Id
   */
  supplierId: string;
  /**
   * 供应商名称
   */
  supplierCode: string;
  /**
   * 工艺厂名称
   */
  supplierName: string;
  /**
   * 供应商地址
   */
  supplierAddress: string;
  /**
   * 供应商手机号
   */
  supplierPhone: string;
  /**
   * 是否确认(1:是,0:否)
   */
  isConfirm: string;
  /**
   * 是否有效(1:否,0:否)
   */
  isValid: string;
  /**
   * 回复人名称
   */
  creatorName: string;
  /**
   * 回复时间
   */
  createdTime: string;
}
export type ICraftMatchRes = ICraftMatchReqItem[];

export interface ICraftMatchResProductStepPriceVoListItem {
  /**
   * 工艺需求回复阶梯价Id
   */
  id: string;
  /**
   * 阶梯价等级(1级,2级,3级等等)
   */
  grade: string;
  /**
   * 阶梯价上限
   */
  upperLimit: string;
  /**
   * 阶梯价下限
   */
  lowerLimit: string;
  /**
   * 大货进价
   */
  stepPrice: string;
  /**
   * 供应商报价
   */
  supplierQuotedPrice: string;
}

/**
 * **请求类型**
 * 核算完成
 * @see https://yapi.ibaibu.com/project/1650/interface/api/92028
 *
 * @请求方法: POST
 * @请求地址: /plm-sample-clothes/web/v1/check-count/save
 * @更新时间: 2021-09-10 10:06:33
 */
/**
 * 请求参数对象
 */
export interface ICheckCountSaveReq {
  /**
   * 核算（用量）表ID
   */
  checkCountId: string;
  bomId: string | number;
  /**
   * 唛架图{多张以英文逗号分隔}
   */
  // markFramePictureList: string[];
  clothesId: string;
  /**
   * bom物料列表
   */
  dosageAccountList: ICheckCountSaveDosageAccountListItem[];
}
export interface ICheckCountSaveDosageAccountListItem {
  bomMaterialId: string;
  dosageAccount: string;
  saleUnit: string;
  widthConfirm: string;
}
/**
 * 响应数据
 */
export type ICheckCountSaveRes = null;
