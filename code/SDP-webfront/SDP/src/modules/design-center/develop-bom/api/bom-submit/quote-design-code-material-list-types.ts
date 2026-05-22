import { YES_NO_ENUM } from '@/constant';
import { DESIGN_MATERIAL_TYPE_ENUM } from '../../constant';
import { GetWebV1BomDetailApiRes } from '../types';

/**
 * 入参
 */
export interface IQuoteSkcDetailLatestReq {
  /**
    * 引用设计款号。 skc+年月日+4位流水号
    */
  quoteDesignCode: string;
  /**
    * bom引用类型: 1-套版款; 2-衍生款; 3-复色款; 4-CRM改款; 5-设计改款;(普通引用不用传)
    * {@link BomQuoteTypeEnum}
    */
  bomQuoteType?: string;
}
/**
  * 响应数据
  */
export interface IQuoteSkcDetailLatestRes extends GetWebV1BomDetailApiRes {}
export interface IQuoteSkcDetailLatestBomOrderMaterialListItem {
  /**
   * bom物料ID
   */
  bomMaterialId: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom物料类型: 1-面料; 2-辅料
   */
  bomMaterialType?: string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 使用部位,字典值 多值以逗号隔开 ---自选物料0.1
   */
  partUseName?: string;
  /**
   * 单件用量
   * 「已废弃」
   */
  singleDosage?: string;
  /**
   * 裁剪方式code
   */
  cuttingMethod: string;
  /**
   * 裁剪方式名  ---自选物料0.1
   */
  cuttingMethodName?: string;
  /**
   * 用量核算
   */
  dosageAccount?: string;
  /**
   * 需求单id
   * 「已废弃」
   */
  demandId?: string;
  /**
   * 需求单编号
   * 「已废弃」
   */
  demandCode?: string;
  /**
   * 需求序号
   * 「已废弃」
   */
  demandTag?: string;
  /**
   * 辅料关联的面料tag
   * 「已废弃」
   */
  fabricDemandTag?: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料; 4:辅料找料 ---V.3.11(添加4类型)
   */
  demandType: DESIGN_MATERIAL_TYPE_ENUM;
  /**
   * 需求匹配单id
   * 「已废弃」
   */
  matchId?: string;
  /**
   * 需求匹配单编码
   * 「已废弃」
   */
  matchCode?: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 特殊辅料：SPECIAL_ACCESSORIES   ---0421-V.1.8.4
   */
  commodityType?: string;
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
   * 类目code(分类以"[-]"隔开)（如：ACCESSORIES[-]21[-]211）
   */
  categoryCode?: string;
  /**
   * 类目名(分类以"[-]"隔开)（如：辅料[-]扣件[-]对勾（勾扣））
   */
  categoryName?: string;
  /**
   * skuId
   */
  skuId: string;
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
   * 销售价格(辅料)
   */
  matchSalePrice?: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName?: string;
  /**
   * 包装数量(辅料)
   */
  packNumber?: string;
  /**
   * 包装数量单位(辅料)-废弃
   * 「已废弃」
   */
  packNumberUnit?: string;
  /**
   * 辅料主单位(对应履约-包装计价单位名称)  ---211208-v1.1
   */
  packUnitName?: string;
  /**
   * 辅料副单位(对应履约-包装计价副单位名称)  ---211208-v1.1
   */
  packAssistantUnitName?: string;
  /**
   * 辅料最小价格  ---211208-v1.1
   */
  minPrice?: string;
  /**
   * 辅料最小单位  ---211208-v1.1
   */
  minPriceUnit?: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs?: string;
  /**
   * 门幅最低值(面料), 作废, 使用widthStrFormat展示
   * 「已废弃」
   */
  widthLow?: string;
  /**
   * 门幅最高值(面料), 作废, 使用widthStrFormat展示
   * 「已废弃」
   */
  widthHigh?: string;
  /**
   * 门幅单位(面料), 作废, 使用widthStrFormat展示
   * 「已废弃」
   */
  widthUnit?: string;
  /**
   * 幅宽; 格式如: '120-130CM'或'125±5CM'  --v5.11
   */
  widthStrFormat?: string;
  /**
   * 销售单位
   */
  saleUnit?: string;
  /**
   * 克重最低值(面料), 作废, 使用weightStrFormat展示
   * 「已废弃」
   */
  weightLow?: string;
  /**
   * 克重最高值(面料), 作废, 使用weightStrFormat展示
   * 「已废弃」
   */
  weightHigh?: string;
  /**
   * 克重单位(面料), 作废, 使用weightStrFormat展示
   * 「已废弃」
   */
  weightUnit?: string;
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
   * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号(面料)
   */
  colorType?: string;
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
   * 销售空差(面料)    ---设计打版2.1-0615
   */
  matchPurchaseGap?: string;
  /**
   * 足米价(面料)  --211208-v1.1
   */
  meterPrice?: string;
  /**
   * 足米价单位(面料)   ---211208-v1.1
   */
  meterPriceUnit?: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource?: string;
  /**
   * 回复人员
   */
  matcherName?: string;
  /**
   * 匹配反馈备注
   */
  matchRemark?: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason?: string;
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
  isConfirm?: string;
  /**
   * bom物料排序
   */
  sort?: string;
  /**
   * 用量核算-幅宽确认值 ---1222-v1.2
   */
  widthConfirm?: string;
  /**
   * 供应商ID  ---0923-推款优化v0.1
   */
  supplierId?: string;
  /**
   * 供应商编号  ---0923-推款优化v0.1
   */
  supplierCode?: string;
  /**
   * 供应商名称  ---0923-推款优化v0.1
   */
  supplierName?: string;
  /**
   * 开票状态(合作关系)-对应OPS字典invoice_dict的编码值  ---0923-推款优化v0.1
   */
  invoiceState?: string;
  /**
   * 履约面辅料价格回复时间 ---1018-优化v3.3
   */
  priceReplyTime?: number;
  /**
   * 履约面辅料价格失效时间 ---1018-优化v3.3
   */
  priceInvalidTime?: number;
  /**
   * 商品进货价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  purchasePrice?: string;
  /**
   * 商品销售价 单位元    commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  skuPrice?: string;
  /**
   * 特殊辅料标识ID，用于区分上下版本关系   commodityType= "SPECIAL_ACCESSORIES" 特殊辅料独有 ---0421-V.1.8.4
   */
  accessoriesFlagId?: string;
  /**
   * 采购次数
   */
  purchaseApplyFollowCount?: string;
  /**
   * 用量核算单位    ---设计打版2.1-0615
   */
  dosageAccountUnit?: string;
  /**
   * 损耗率   ---设计打版2.1-0615
   */
  attritionRate?: string;
  /**
   * 大货进价 单位元   ---设计打版2.1-0615
   * 面料: 足米价; 辅料: 最小价格;
   */
  bulkPurchasePrice?: string;
  /**
   * 大货进价单位，指 米 或 千克  ---设计打版2.1-0615
   * 面料: 足米价单位; 辅料: 最小价格单位;
   */
  bulkPurchasePriceUnit?: string;
  /**
   * 物料快照id  ---自选物料0.1
   */
  materialSnapshotId?: string;
  /**
   * bom物料上下文ID，用于关联上下版本关系    ---自选物料0.1
   */
  materialContextId?: string;
  /**
   * 是否无工艺 1-是  0-否
   */
  isNoCraft?: YES_NO_ENUM;
  /**
   * 好料网-是否启用：{0-否 ,1-是}
   */
  enableState?: YES_NO_ENUM;
  /**
   * 好料网-上架状态：{0-否 ,1-是}
   */
  onShelfState?: YES_NO_ENUM;
  /**
   * 供应链物料是否存在: 0-不存在; 1-存在; -- 3.20.2 (该字段用于bom引用的场景)
   */
  supplyExistState?: string;
  /**
   * bom物料ID(复制, 前端处理引用物料使用)
   */
  bomMaterialIdCopy?: string;
  /**
   * 辅料类型code【字典 pims_accessory_material_type】 ---自选物料0.1
   */
  materialTypeCode?: string;
  /**
   * 辅料类型name     ---自选物料0.1
   */
  materialType?: string;
  /**
   * bom物料需求id --v3.11
   */
  bomMaterialDemandId?: string;
  /**
   * 对色/包料状态: 0-无; 1-对色; 2-包料; (默认0) --v3.11
   */
  colorMatchMaterialState?: string;
  /**
   * 对色/包料对应物料名 --v3.11
   */
  colorMatchMaterialName?: string;
  /**
   * 对色/包料对应物料id --v3.11
   */
  colorMatchMaterialId: string;
  /**
   * 物料状态:100-正常; 190-已关闭; 200-找料中 --v3.11
   */
  materialState?: string;
  /**
   * 被替换的bom物料id --v3.11
   */
  replaceBomMaterialId?: string;
  /**
   * 样衣采购周期,单位默认天  -- v3.20.3
   */
  samplePurchasingCycle?: string;
  /**
   * 样衣采购周期单位,单位默认天  -- v3.20.3
   */
  samplePurchasingCycleUnit?: string;
  /**
   * 大货采购周期,单位默认天  -- v3.20.3
   */
  bulkPurchasingCycle?: string;
  /**
   * 大货采购周期单位,单位默认天  -- v3.20.3
   */
  bulkPurchasingCycleUnit?: string;
  /**
   * 是否为企划料   -- v4.19.1
   * 1：是
   * 0：否
   * null：否
   */
  isPlanning?: YES_NO_ENUM;
  /**
   * 波段时间   -- v4.19.1
   */
  bandDate?: number;
  /**
   * JV 面料识别物料id
   */
  identifyMaterialId?: string;
  /**
   * 商品编码 - 混淆加密
   * - 对接淘系
   */
  encryptionCommodityCode?: string;
  /**
   * skuCode - 混淆加密
   *  - 对接淘系
   */
  encryptionSkuCode?: string;
  /**
   * 品名 - 混淆加密
   *  - 对接淘系
   */
  encryptionCommodityName?: string;
  /**
   * 识别选中
   *  - 对接淘系
   */
  identifySelection?: boolean;
  /**
   * 物料图,多值以逗号隔开
   *  - 对接淘系
   */
  materialImg?: string;
  /**
    * bom物料备注列表
    */
  materialRemarkList: IQuoteSkcDetailLatestMaterialRemarkListItem[];
  warehouseColorInfo: IQuoteSkcDetailLatestWarehouseColorInfo;
  /**
    * 二次工艺信息列表
    */
  craftDemandInfoList: IQuoteSkcDetailLatestCraftDemandInfoListItem[];
}
export interface IQuoteSkcDetailLatestMaterialRemarkListItem {
  /**
   * 备注ID
   */
  designRemarksId?: string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 暂存状态: 0:非暂存; 1,暂存; (默认0)
   */
  transientState?: string;
  /**
   * 操作人id
   */
  creatorId?: string;
  /**
   * 操作人名称
   */
  createdName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}
/**
  * 齐料仓信息
  */
export interface IQuoteSkcDetailLatestWarehouseColorInfo {
  /**
   * sku信息的id
   */
  skuId?: string;
  /**
   * 色号
   */
  colorNumber?: string;
  /**
   * sku编号
   */
  skuCode?: string;
  /**
   * 可用数量 实际-冻结-已出
   */
  remainingQuantity?: string;
  /**
   * sku颜色描述
   */
  colorNumberDesc?: string;
  /**
   * sku色系
   */
  colorSystem?: string;
  /**
   * 所在仓库
   */
  warehouseName?: string;
  /**
   * 所属区域
   */
  belongArea?: string;
  /**
   * 供应商所属区域
   */
  supplierRegion?: string;
  /**
   * 仓库区域ID
   */
  regionId?: string;
}
export interface IQuoteSkcDetailLatestCraftDemandInfoListItem {
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
  state?: '0' | '1' | '2';
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
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit: string;
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
  /**
   * 工艺单位
   */
  craftUnit: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient: string;
}
