import { COMMODITY_TYPE_ENUM } from '@/modules/design-center/inspiration-demand/constant';
import { CLOTHES_CHECK_PRICESTATE_ENUM, BELONG_AREA_ENUM } from '../../constant';
import { YES_NO_ENUM } from '@/constant';

/**
 * 预估样衣核价查询列表（分页）⬇️
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2794
 */
export interface IEstimateCheckPricePageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 创建开始时间
   */
  countCreatedTimeStart?: string;
  /**
   * 创建结束时间
   */
  countCreatedTimeEnd?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList: string[];
  /**
   * 设计组编号
   */
  designerGroupCodeList: string[];
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 核价开始时间
   */
  finishTimeStart?: string;
  /**
   * 核价结束时间
   */
  finishTimeEnd?: string;
  /**
   * SPU下审版是否通过 0否 1是
   */
  auditPass?: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  clothesCheckPriceState: CLOTHES_CHECK_PRICESTATE_ENUM;
  /**
   * 样衣核价状态 100待核价 110已核价
   */
  checkPriceState?: string;
  /**
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 创建开始时间
   */
  priceCreatedTimeStart?: string;
  /**
   * 创建结束时间
   */
  priceCreatedTimeEnd?: string;
  /**
   * 核价单号
   */
  priceOrderCode?: string;
  /**
   * 款式类型(1:设计款 2. 现货款)
   */
  styleType?: string;
  /**
   * 定价类型 1.按返单定价 2.按不返单定价
   */
  priceType?: string;
  /**
   * 供应商ID
   */
  supplierId?: string;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  /**
   * 供应商款号
   */
  supplierSku?: string;
  supplierStyle?: string;
  /**
   * 完成耗时开始时间 天
   */
  timeConsumingStartDay?: string;
  /**
   * 完成耗时结束时间 天
   */
  timeConsumingEndDay?: string;
  /**
   * 完成耗时开始时间 时
   */
  timeConsumingStartHour?: string;
  /**
   * 完成耗时结束时间 时
   */
  timeConsumingEndHour?: string;
  /**
   * 完成耗时开始时间 分
   */
  timeConsumingStartMinute?: string;
  /**
   * 完成耗时结束时间 分
   */
  timeConsumingEndMinute?: string;
  /**
   * '现货款 开发人id'
   */
  developer?: string;
  /**
   * '现货款 开发人名称''
   */
  developerName?: string;
}

export interface IEstimateCheckPricePageRes {
  page?: number;
  total?: number;
  list: IEstimateCheckPricePageResListItem[];
}

export interface IEstimateCheckPricePageResListItem {
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 上架图
   */
  shelvePicture?: {
    /**
     * 样衣打版id
     */
    clothesId?: string;
    /**
     * spu上架图片
     */
    spuShelvePictureList: string[];
    /**
     * skc上架图片
     */
    skcShelvePictureList: string[];
  };
  /**
   * 款式类型(1:正常款,2:复色款)
   */
  skcType?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 设计师id
   */
  designerId?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 二次工艺
   */
  craftList: IEstimateCheckPricePageResListItemCraftListItem[];
  state?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * SPU下审版是否通过 0否 1是
   */
  auditPass?: string;
  /**
   * 预估核价表ID
   */
  estimateCheckPriceId?: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价 REJECTION 已驳回 REVIEW_PASSED  复核通过
   */
  checkPriceState?: CLOTHES_CHECK_PRICESTATE_ENUM;
  /**
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 首次创建时间
   */
  firstCreatedTime?: number;
  /**
   * 首次提交时间
   */
  firstFinishTime?: number;
  /**
   * 是否最新数据(1-是、0-否), 用来避免分组查询
   */
  isLatest?: string;
  /**
   * 核价单号（原始核价单号+版本号）
   */
  priceOrderCode?: string;
  remark?: string;
  /**
   * 款式类型(1:设计款 2. 现货款)
   */
  styleType?: string;
  /**
   * 定价类型 1.按返单定价 2.按不返单定价
   */
  priceType?: string;
  /**
   * '现货款 开发人id'
   */
  developer?: string;
  /**
   * '现货款 开发人名称''
   */
  developerName?: string;
  /**
   * 供应商信息
   */
  supplierInfo?: string;
  /**
   * 供应商信息
   */
  supplierInfos: IEstimateCheckPricePageResListItemSupplierInfosItem[];
  /**
   * 总价不加成
   */
  totalCost?: string;
  /**
   * 驳回原因
   */
  disapprovalReason?: string;
  /**
   * 是否复核通过
   */
  isReview?: string;
}

export interface IEstimateCheckPricePageResListItemSupplierInfosItem {
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  supplierSku?: string;
  supplierStyle?: string;
  /**
   * 采购价
   */
  purchasePrice?: string;
}

export interface IEstimateCheckPricePageResListItemCraftListItem {
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: string;
  /**
   * 工艺环节名称
   * 如果有工艺环节，优先展示工艺环节
   * 没有工艺环节直接显示工艺要求
   */
  craftsProcessName?: string;
  /**
   * 第三方工艺需求ID(对应覆约的需求ID，BOM添加了工艺就会在覆约端生成对应的任务)
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 二次工艺所属类目名称
   */
  nameList: string[];
}

/** 预估样衣核价查询列表（分页）⬆️ */

/**
 * 预估样衣核价详情
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2795
 */
export interface IEstimateCheckPriceDetailReq {
  /**
   * 主键
   */
  estimateCheckPriceId: string;
  /**
   * 获取详情目的 VISIT :查看
   * INIT_CHECK :初次核算
   * RE_CHECK :核算更新
   */
  detailAimEnum: string;
}

export interface IEstimateCheckPriceDetailRes {
  /**
   * 预估核价表ID
   */
  estimateCheckPriceId?: string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  checkPriceState?: CLOTHES_CHECK_PRICESTATE_ENUM;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
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
   * 核价师ID
   */
  pricerId?: string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 客户图片列表
   */
  customerPictureList: string[];
  /**
   * 设计图片
   */
  designPictureList: string[];
  /**
   * 核价时间
   */
  finishTime?: number;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 是否最新数据(1-是、0-否), 用来避免分组查询
   */
  isLatest?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 客户款号
   */
  customerStyleCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 核价单号（原始核价单号+版本号）
   */
  priceOrderCode?: string;
  bomId?: string;
  /**
   * 物料费用明细
   */
  materialCostInfoList: IEstimateCheckPriceDetailResMaterialCostInfoListItem[];
  /**
   * 二次工艺费用明细
   */
  craftDemandCostInfoList: IEstimateCheckPriceDetailResCraftDemandCostInfoListItem[];
  /**
   * 物料总价（元）
   */
  materialCost?: string;
  /**
   * 二次工艺总价（元）
   */
  craftDemandCost?: string;
  /**
   * 加工总价（元）
   */
  processCost?: string;
  /**
   * 其他费用
   */
  otherCost?: string;
  /**
   * 利润点（%）（小数点两位）
   * 毛利率
   */
  profit?: string;
  /**
   * 利润成本
   */
  profitCost?: string;
  /**
   * 加成点
   */
  taxationRatio?: string;
  /**
   * 加成费用
   */
  taxationCost?: string;
  /**
   * 总价成本（不算损耗）
   */
  pureTotalCost?: string;
  /**
   * 总价（元）（不加成）
   */
  totalCost?: string;
  /**
   * 总加加成
   */
  totalCostExt?: string;
  /**
   * skc&spu基础信息
   */
  skcInfoVo?: {
    /**
     * 成衣SPU(款式SPU)
     */
    styleCode?: string;
    /**
     * 设计款号
     */
    designCode?: string;
    /**
     * 设计图-首图
     */
    designPicture?: string;
    /**
     * 设计图
     */
    designPictureList: string[];
    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    category?: string;
    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    categoryName?: string;
    /**
     * 颜色
     */
    color?: string;
    /**
     * 款类型: 1--正常款 2-复色款
     */
    skcType?: string;
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
     * 设计组code
     */
    designerGroupCode?: string;
    /**
     * 供给方式-OPS
     */
    supplyModeName?: string;
    /**
     * 供给方式编码
     */
    supplyModeCode?: string;
    /**
     * 商品类型
     */
    productType?: string;
    /**
     * 货盘类型名称
     */
    palletTypeName?: string;
    /**
     * 货盘类型编码
     */
    palletTypeCode?: string;
    /**
     * 品质等级
     */
    qualityLevel?: string;
    /**
     * 品质等级编号
     */
    qualityLevelCode?: string;
    /**
     * 织造方式code
     */
    weaveModeCode?: string;
    /**
     * 织造方式
     */
    weaveMode?: string;
    /**
     * 建议售价
     */
    suggestedSellingPrice?: string;
    /**
     * 波段编码
     */
    waveBandCode?: string;
    /**
     * 波段名称
     */
    waveBandName?: string;
    /**
     * 款式风格名称
     */
    clothingStyleName?: string;
    /**
     * 款式风格编码
     */
    clothingStyleCode?: string;
  };
}

export interface IEstimateCheckPriceDetailResMaterialCostInfoListItem {
  /**
   * bom物料ID
   */
  bomMaterialId?: string;
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
  prototypeMaterialName?: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 使用部位,字典值 多值以逗号隔开 ---自选物料0.1
   */
  partUseName?: string;
  /**
   * 裁剪方式code
   */
  cuttingMethod?: string;
  /**
   * 裁剪方式名  ---自选物料0.1
   */
  cuttingMethodName?: string;
  /**
   * 用量核算
   */
  dosageAccount?: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: IEstimateCheckPriceDetailResMaterialCostInfoListItemMaterialRemarkListItem[];
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
  demandType?: '1' | '2' | '3' | '4';
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
   * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号(面料)
   */
  colorType?: string;
  /**
   * 齐料仓信息
   */
  warehouseColorInfo?: IEstimateCheckPriceDetailResMaterialCostInfoListItemWarehouseColorInfo;
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
   * 二次工艺信息列表
   */
  craftDemandInfoList: IEstimateCheckPriceDetailResMaterialCostInfoListItemCraftDemandInfoListItem[];
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
  isNoCraft?: string;
  /**
   * 好料网-是否启用：{0-否 ,1-是}
   */
  enableState?: string;
  /**
   * 好料网-上架状态：{0-否 ,1-是}
   */
  onShelfState?: string;
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
  colorMatchMaterialId?: string;
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
  isPlanning?: string;
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
   * 损耗
   */
  waste?: string;
  /**
   * 单价
   */
  price?: string;
  /**
   * 大货进价
   */
  bulkPrice?: string;
  /**
   * 上一版本大货进价
   */
  lastBulkPrice?: string;
  /**
   * 价格单位
   */
  unit?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 上一版本用量核算
   */
  lastDosageAccount?: string;
  /**
   * 类目code(分类以"-"隔开)（如：ACCESSORIES-21-211）
   */
  demandCategoryCode?: string;
  /**
   * 类目名(分类以"-"隔开)（如：辅料-扣件-对勾（勾扣））
   */
  demandCategoryName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 价格更新时间
   */
  priceRevisedTime?: number;
  /**
   * 价格有效期时间开始
   */
  validityStartTime?: number;
  /**
   * 价格有效期时间结束
   */
  validityEndTime?: number;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单损耗
   */
  smallOrderWaste?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  lastSmallOrderSumOfMoney?: string;
}

export interface IEstimateCheckPriceDetailResMaterialCostInfoListItemCraftDemandInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
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
  state?: '100' | '190' | '9999';
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
  pictureList: string[];
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
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
}

export interface IEstimateCheckPriceDetailResMaterialCostInfoListItemWarehouseColorInfo {
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
  belongArea?: BELONG_AREA_ENUM;
  /**
   * 供应商所属区域
   */
  supplierRegion?: string;
  /**
   * 仓库区域ID
   */
  regionId?: string;
}

export interface IEstimateCheckPriceDetailResMaterialCostInfoListItemMaterialRemarkListItem {
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
  createdTime?: number;
}

export interface IEstimateCheckPriceDetailResCraftDemandCostInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
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
  state?: '100' | '190' | '9999';
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
  pictureList: string[];
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
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
  /**
   * 需求匹配单id
   */
  matchId?: string;
  /**
   * 单件用量
   */
  singleDosage?: string;
  /**
   * 损耗（单位%）
   */
  waste?: string;
  /**
   * 上一版大货工艺进货价
   */
  lastBulkPrice?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 二次工艺次序编号
   */
  craftsProcessCode?: string;
  /**
   * 二次工艺次序名称
   */
  craftsProcessName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 工艺用量核算
   */
  craftDosageAccount?: string;
  /**
   * 工艺用量核算单位
   */
  craftDosageAccountUnit?: string;
  /**
   * 上一版本的用量核算
   */
  lastCraftDosageAccount?: string;
  /**
   * 设计款物料项目名（关联物料）
   */
  prototypeMaterialName?: string;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
  // 确认价格
  confirmPrice?: string;
}

/**
 * 核价完成
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2796
 */
export interface IEstimateCheckPriceSaveReq {
  /**
   * 预估核价表ID
   */
  estimateCheckPriceId: string;
  /**
   * bomId
   */
  bomId: string;
  /**
   * 物料费用明细
   */
  materialCostInfoList: IEstimateCheckPriceSaveReqMaterialCostInfoListItem[];
  /**
   * 二次工艺费用明细
   */
  craftDemandCostInfoList: IEstimateCheckPriceSaveReqCraftDemandCostInfoListItem[];
  /**
   * 其他费用（元）
   */
  otherCost?: string;
  /**
   * 物料总价（元）
   */
  materialCost?: string;
  /**
   * 加工总价（元）
   */
  processCost?: string;
  /**
   * 二次工艺总价（元）
   */
  craftDemandCost?: string;
  /**
   * 总价不加成（元）
   */
  totalCost: string;
  /**
   * 利润点（%）（小数点两位） 毛利率
   */
  profit: string;
  /**
   * 加成点
   */
  taxationRatio: string;
  /**
   * 总加加成
   */
  totalCostExt: string;
  /**
   * 总成本（不算损耗）
   */
  pureTotalCost: string;
  /**
   * 利润(成本)
   */
  profitCost: string;
  /**
   * 加成费用
   */
  taxationCost: string;
}

export interface IEstimateCheckPriceSaveReqMaterialCostInfoListItem {
  /**
   * bom物料ID
   */
  bomMaterialId?: string;
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
  prototypeMaterialName?: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 使用部位,字典值 多值以逗号隔开 ---自选物料0.1
   */
  partUseName?: string;
  /**
   * 裁剪方式code
   */
  cuttingMethod?: string;
  /**
   * 裁剪方式名  ---自选物料0.1
   */
  cuttingMethodName?: string;
  /**
   * 用量核算
   */
  dosageAccount?: string;
  /**
   * bom物料备注列表
   */
  materialRemarkList: IEstimateCheckPriceSaveReqMaterialCostInfoListItemMaterialRemarkListItem[];
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
  demandType?: '1' | '2' | '3' | '4';
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
   * 色号类别: 0,非齐料仓色号; 1, 齐料仓色号(面料)
   */
  colorType?: string;
  /**
   * 齐料仓信息
   */
  warehouseColorInfo?: IEstimateCheckPriceSaveReqMaterialCostInfoListItemWarehouseColorInfo;
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
  priceReplyTime?: string;
  /**
   * 履约面辅料价格失效时间 ---1018-优化v3.3
   */
  priceInvalidTime?: string;
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
   * 二次工艺信息列表
   */
  craftDemandInfoList: IEstimateCheckPriceSaveReqMaterialCostInfoListItemCraftDemandInfoListItem[];
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
  isNoCraft?: string;
  /**
   * 好料网-是否启用：{0-否 ,1-是}
   */
  enableState?: string;
  /**
   * 好料网-上架状态：{0-否 ,1-是}
   */
  onShelfState?: string;
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
  colorMatchMaterialId?: string;
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
  isPlanning?: string;
  /**
   * 波段时间   -- v4.19.1
   */
  bandDate?: string;
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
   * 损耗
   */
  waste?: string;
  /**
   * 单价
   */
  price?: string;
  /**
   * 大货进价
   */
  bulkPrice?: string;
  /**
   * 上一版本大货进价
   */
  lastBulkPrice?: string;
  /**
   * 价格单位
   */
  unit?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 上一版本用量核算
   */
  lastDosageAccount?: string;
  /**
   * 类目code(分类以"-"隔开)（如：ACCESSORIES-21-211）
   */
  demandCategoryCode?: string;
  /**
   * 类目名(分类以"-"隔开)（如：辅料-扣件-对勾（勾扣））
   */
  demandCategoryName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 价格更新时间
   */
  priceRevisedTime?: string;
  /**
   * 价格有效期时间开始
   */
  validityStartTime?: string;
  /**
   * 价格有效期时间结束
   */
  validityEndTime?: string;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单损耗
   */
  smallOrderWaste?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  lastSmallOrderSumOfMoney?: string;
}

export interface IEstimateCheckPriceSaveReqMaterialCostInfoListItemCraftDemandInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
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
  state?: '100' | '190' | '9999';
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
  pictureList: string[];
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
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
}

export interface IEstimateCheckPriceSaveReqMaterialCostInfoListItemWarehouseColorInfo {
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
  belongArea?: BELONG_AREA_ENUM;
  /**
   * 供应商所属区域
   */
  supplierRegion?: string;
  /**
   * 仓库区域ID
   */
  regionId?: string;
}

export interface IEstimateCheckPriceSaveReqMaterialCostInfoListItemMaterialRemarkListItem {
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

export interface IEstimateCheckPriceSaveReqCraftDemandCostInfoListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
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
  state?: '100' | '190' | '9999';
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
  pictureList: string[];
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
   * 工艺关联面料、辅料需求ID
   */
  relationDemandId?: string;
  /**
   * 第三方工艺需求ID
   */
  thirdPartyCraftDemandId?: string;
  /**
   * 第三方工艺需求编号 ---220421-v1.8.4
   */
  thirdPartyCraftDemandCode?: string;
  /**
   * 样衣工艺周期,单位默认天  -- v3.20.3
   */
  sampleCraftCycle?: string;
  /**
   * 样衣工艺周期单位,单位默认天  -- v3.20.3
   */
  sampleCraftCycleUnit?: string;
  /**
   * 大货工艺周期,单位默认天  -- v3.20.3
   */
  bulkCraftCycle?: string;
  /**
   * 大货工艺周期单位,单位默认天  -- v3.20.3
   */
  bulkCraftCycleUnit?: string;
  /**
   * 打版价单位
   */
  sampleUnit?: string;
  /**
   * 打版价
   */
  samplePrice?: string;
  /**
   * 大货价单位
   */
  bulkUnit?: string;
  /**
   * 大货价
   */
  bulkPrice?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 物料需求id
   */
  materialDemandId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 工艺单位
   */
  craftUnit?: string;
  /**
   * 是否临时保存 0:否 1:是
   */
  isTransient?: string;
  /**
   * 需求匹配单id
   */
  matchId?: string;
  /**
   * 单件用量
   */
  singleDosage?: string;
  /**
   * 损耗（单位%）
   */
  waste?: string;
  /**
   * 上一版大货工艺进货价
   */
  lastBulkPrice?: string;
  /**
   * 上一版本的金额（损耗金额）
   */
  lastSumOfMoney?: string;
  /**
   * 金额（损耗金额）
   */
  sumOfMoney?: string;
  /**
   * 上一版本的总金额
   */
  lastTotalAmount?: string;
  /**
   * 总金额
   */
  totalAmount?: string;
  /**
   * 二次工艺次序编号
   */
  craftsProcessCode?: string;
  /**
   * 二次工艺次序名称
   */
  craftsProcessName?: string;
  /**
   * 询价状态 1:询价中  2:已询价
   */
  inquiryState?: string;
  /**
   * 询价-报价价格
   */
  quotedPrice?: string;
  /**
   * 询价-报价价格单位
   */
  quotedUnit?: string;
  /**
   * 工艺用量核算
   */
  craftDosageAccount?: string;
  /**
   * 工艺用量核算单位
   */
  craftDosageAccountUnit?: string;
  /**
   * 上一版本的用量核算
   */
  lastCraftDosageAccount?: string;
  /**
   * 设计款物料项目名（关联物料）
   */
  prototypeMaterialName?: string;
  /**
   * 小单倍率
   */
  smallOrderRate?: string;
  /**
   * 小单含损 金额（损耗金额）
   */
  smallOrderSumOfMoney?: string;
}

/**
 * 统计状态数量
 * yapi地址：https://yapi.tiangong.site/project/37/interface/api/2849
 */

export type IEstimateCheckPriceCountStateRes = IEstimateCheckPriceCountStateResItem[];
export interface IEstimateCheckPriceCountStateResItem {
  /**
   * 状态
   */
  state?: string;
  /**
   * 状态数量
   */
  count?: string;
  /**
   * 状态数量
   */
  checkPriceStateEnum?: 'WAIT_CHECK_PRICE' | 'HAD_CHECK_PRICE' | 'REVIEW_PASSED' | 'REJECTION' | 'UNKNOWN';
}

/**
 * 核价完成 现货款
 * yapi地址：https://yapi.tiangong.site/project/38/interface/api/4342
 */
export interface IEstimateCheckPriceSaveSpotCheckPriceReq {
  /**
   * 预估核价表ID
   */
  estimateCheckPriceId: string;
  /**
   * 总价不加成（元）
   */
  totalCost: string;
}
