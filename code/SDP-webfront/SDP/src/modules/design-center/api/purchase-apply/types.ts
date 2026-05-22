import { DESIGN_MATERIAL_TYPE_ENUM } from '../../develop-bom/constant';

/**
 * 采购的物料参数
 */
export interface IApplyMaterialPurchaseBatchReq {
  /**
   * 打版信息id
   */
  prototypeId: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom版本
   */
  bomVersionNum?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 采购id
   */
  purchaseApplyFollowId?: string;
  /**
   * 采购单号  （前端不用传）
   */
  purchaseOrderNo?: string;
  /**
   * 采购申请原因
   */
  purchaseApplyCause: string;
  /**
   * 是否自动下采购单   默认为否
   */
  orderAuto?: boolean;
  /**
   * 采购人名称
   */
  creatorName?: string;
  /**
     * 期望采购完成日期
     * @NotNull(message = "期望采购完成日期不能为空") v2.1.2 物料采购去除期望采购完成日期
     */
  purchaseApplyList: IApplyMaterialPurchaseBatchPurchaseApplyListItem[];
}
export interface IApplyMaterialPurchaseBatchPurchaseApplyListItem {
  /**
   * skuId
   */
  skuId: string;
  /**
   * skuCode
   */
  skuCode?: string;
  /**
   * 裁前二次工艺。 设计师在开发bom表中维护的物料类型内容; 多个用英文逗号分割
   */
  cuttingProcess?: string;
  /**
   * 采购数量
   */
  purchaseQuantity: string;
  /**
   * 采购方式 注：推款自选物料版本之后，采购方式只有是否是自选物料的方式，如果否，则前端不用传
   */
  cutMethod?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 裁剪方法
   */
  cuttingMethodName?: string;
  /**
     * 使用部位,字典code
     */
  partUse: string;
  /**
     * 使用部位,字典code
     */
  partUseName: string;
  /**
   * 单位
   */
  purchaseUnit: string;
  /**
   * 物料spu  供应链履约提供物料id，面料取SPU（匹配物料SPU编码: 商品编码commodityCode） ，辅料取SKU
   */
  materialCode?: string;
  /**
   * 物料类型
   */
  materialCategory: string;
  /**
   * 物料名称  == commodityName 商品名称(品名)
   */
  materialName?: string;
  /**
   * 物料颜色
   */
  materialColor?: string;
  /**
   * 物料色号  开发bom表详情列表中的物料SPU，由供应链履约提供物料SPU
   */
  materialColorNo?: string;
  /**
   * 色卡图片
   */
  colorCardPictureUrl?: string;
  /**
   * 匹配物料图片 === 对应字段 materialPicture(自选物料之后)
   */
  matchPicture?: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料
   */
  demandType: string;
  /**
   * 辅料属性集合(json数据)
   */
  skuAttrs?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 仓库区域ID (齐料仓)
   */
  regionId?: string;
  /**
   * 二次工艺
   */
  craftDemandInfoList: IApplyMaterialPurchaseBatchCraftDemandInfoListItem[];
  /**
   * 物料快照唯一id
   */
  materialSnapshotId: string;
  /**
   * bom物料清单主键
   */
  bomMaterialId: string;
  /**
   * 采购跟进id(前端不用传)
   */
  materialPurchaseFollowId?: string;
}
export interface IApplyMaterialPurchaseBatchCraftDemandInfoListItem {
  /**
   * 主键id
   */
  craftDemandId?: string;
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom详情ID
   */
  bomMaterialId?: string;
  /**
   * 工艺状态 100:已提交 190:已关闭
   */
  state?: string;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 客户昌否提供工艺厂 PROVIDE 客户提供工艺厂信息 , NO_PROVIDE 客户不提供工艺厂信息
   */
  customerSupplyFactory?: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 工艺图片，最多9张
   */
  picture?: string;
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 工艺关联面料,辅料需求ID(第三方)
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
  matchId?: string;
  oldCraftDemandId?: string;
  /**
   * 默认不是要删除的工艺
   */
  isDel?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 是否版单取消 0-否 1-是
   */
  isPrototypeCancel?: string;
  /**
   * 物料快照主键id
   */
  materialSnapshotId?: string;
  /**
   * 修改人id
   */
  reviserId?: string;
  /**
   * 更新时间
   */
  revisedTime?: string;
  /**
   * 是否删除：0否 1 是
   */
  isDeleted?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}
export type IApplyMaterialPurchaseBatchRes = null;

/**
 * 根据设计款号查询最新已提交(已核算)的Bom详情
 * @see https://yapi.ibaibu.com/project/1404/interface/api/194169
 *
 * @请求方法: GET
 * @请求地址: /plm-design/web/v1/bom/detail/latest
 * @更新时间: 2022-08-11 15:25:38
 */
export interface IDetailLatestReq {
  designCode: string;
}
export interface IDetailLatestRes {
  /**
   * 版单id
   */
  prototypeId?: string;
  /**
   * 成衣SPU
   */
  styleCode?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
     * bom物料列表
     */
  bomOrderMaterialList: IDetailLatestBomOrderMaterialListItem[];
}
export interface IDetailLatestBomOrderMaterialListItem {
  // /**
  //    * 1：异常   2：正常  默认为 2  (查询面料色号不一致或辅料属性不一致的物料信息)
  //    */
  // matchColorSkuAttr: string;
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
     * 使用部位,字典code
     */
  partUseName: string;
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
   * 裁剪方法
   */
  cuttingMethodName: string;
  /**
     * 用量核算
     */
  dosageAccount: string;
  /**
     * bom物料备注列表
     */
  materialRemarkList: IDetailLatestMaterialRemarkListItem[];
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
  demandType: DESIGN_MATERIAL_TYPE_ENUM;
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
  warehouseColorInfo: IDetailLatestWarehouseColorInfo;
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
  craftDemandInfoList: IDetailLatestCraftDemandInfoListItem[];
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
}
export interface IDetailLatestMaterialRemarkListItem {
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
/**
   * 齐料仓信息
   */
export interface IDetailLatestWarehouseColorInfo {
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
  belongArea: 'NATIONWIDE' | 'GUANGZHOU' | 'HANGZHOU';
  /**
     * 供应商所属区域
     */
  supplierRegion: string;
  /**
     * 仓库区域ID
     */
  regionId: string;
}
export interface IDetailLatestCraftDemandInfoListItem {
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
