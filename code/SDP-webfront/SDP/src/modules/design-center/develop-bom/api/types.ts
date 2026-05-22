import type { YES_NO_ENUM } from '@/constant';
import type { BOM_ORDER_STATUS_ENUMS, DESIGN_MATERIAL_TYPE_ENUM } from '../constant';
import { SKC_TYPE_ENUM } from '../../style-manage/constant';
import {
  IRequirementSummaryPageResListItemCraftListItem
} from '@/modules/clothes-center/views/sample-demand/api/types';

export interface IBomPageChildBomOrderListItem {
  /**
   * bomId
   */
  bomId?: string;
  /**
   * bom表单编号
   */
  bomCode?: string;
  /**
   * bom版本号
   */
  bomVersionNum?: string;
  /**
   * bom订单状态  WAIT_SUBMIT:待提交 SUBMITTED:已提交 CALCULATED:已核算 CLOSED:已关闭
   */
  bomOrderState?: BOM_ORDER_STATUS_ENUMS;
  /**
   * bom创建时间
   */
  bomCreatedTime?: number;
  /**
   * Bom提交时间
   */
  bomSubmitTime?: number;
  /**
   * 是否显示修改Bom按钮
   */
  isDisplayUpdateBomButton?: boolean;
  /**
   * 设计图片列表
   */
  designPictureList: string[];
  /**
   * 成衣spu编码
   */
  styleCode?: string;
  /**
   * 设计款skc_id
   */
  prototypeId?: string;
  /**
   * 设计款skc_code
   */
  designCode?: string;
  /**
   * 是否动销: 0-否; 1-是;  (款式开发)
   */
  isOnSale?: boolean;
  /**
   * 最新颜色 skc当前最新提交的设计款信息中颜色
   */
  latestColor?: string;
  /**
   * 颜色编码
   */
  colorCode?: string;
  /**
   * 是否补做 false 否 true是
   */
  isMakeMore?: boolean;
  /**
   * 是否紧急(1:紧急,0:不紧急)
   */
  isUrgent?: boolean;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled?: boolean;
  /**
   * 版单取消原因
   */
  cancelReason?: string;
  /**
   * 版单取消时间
   */
  cancelTime?: number;
  /**
   * 取消版单操作人id
   */
  cancelUserId?: string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName?: string;
  /**
   * 版单取消备注
   */
  cancelRemark?: string;
  /**
   * 版单取消环节
   */
  processingStep?: string;
  /**
   * 款类型: 1-正常款; 2-复色款;
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
   * 商品末级分类(款式品类(打版品类的第三个下拉框))
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计款生成时间
   */
  skcCreatedTime?: number;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: number;
  /**
   * bom子集列表
   */
  childBomOrderList: object[];
  /**
   * 暂存状态: 0:否; 1,是 (默认0) --v3.5.1
   */
  transientState?: string;
  /**
   * 暂存次数, 默认0  --v3.5.1
   */
  transientCount?: string;
  /**
   * 找料状态: 0-否; 1-是 (默认0) --v3.11
   */
  materialSearchState?: string;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
  /**
   * 季节
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
}

/**
 * **请求类型**
 * Bom列表
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84170
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/bom/page
 * @更新时间: 2021-08-19 12:01:56
 */
/**
 * 分页对象
 */
export interface PostWebV1BomPageApiReq {
  /**
   * bom订单状态 WAIT_SUBMIT:待提交 SUBMITTED:已提交 WAIT_CALCULATED:待核算 CALCULATED:已核算 CLOSED:已关闭
   */
  bomOrderState: BOM_ORDER_STATUS_ENUMS | '';
  /**
   * bom编号
   */
  bomCode?: string;
  /**
   * 是否紧急(1:紧急,0:不紧急)
   */
  isUrgent?: YES_NO_ENUM;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled?: YES_NO_ENUM;
  /**
   * 暂存状态: 0:否; 1,是
   */
  transientState?: YES_NO_ENUM;
  /**
   * 找料状态: 0-否; 1-是
   */
  materialSearchState?: YES_NO_ENUM;
  /**
   * 季节
   */
  styleSeasonList?: string[];
  /**
   * 设计款号
   */
  designCode?: string;
  designCodeList?: string[];
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
  styleCodeList?: string[];
  /**
   * 设计师名称【设计师】
   */
  designerNameList?: string[];
  /**
   * 设计师id集合  (多选)
   */
  designerIdList?: string[];
  /**
   * 设计组  (多选)
   */
  designerGroupCodeList?: string[];
  /**
   * 款类型: 1--正常款 2-复色款
   */
  skcType?: SKC_TYPE_ENUM;
  /**
   * 商品末级分类(中文) 完整的分类组装格式: 女装-T恤-圆领T恤
   */
  categoryNameList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  skcCreatedTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  skcCreatedTimeEnd?: string;
  /**
   * SPU生成时间
   */
  spuCreatedTimeStart?: string;
  /**
   * SPU生成时间
   */
  spuCreatedTimeEnd?: string;
  /**
   * 是否动销: 0-否; 1-是; 默认0
   */
  isOnSale?: YES_NO_ENUM;
  /**
   * 设计小组组别 1 == 选择了设计小组组别 ， 0 == 没有选择设计小组组别，默认就是为 0
   */
  clothesDesigner?: string;
  /**
   * 商品类型 (多选)
   */
  productTypeList?: string[];
  /**
   * 供给方式编码 (多选)
   */
  supplyModeCodeList?: string[];
  /**
   * 国家站点id集合 (多选)
   */
  countrySiteCodeList?: string[];
  /**
   * 波段编码-OPS: plm_clothing_band  (多选)
   */
  waveBandCodeList?: string[];
  /**
   * 店铺id集合   (多选)
   */
  storeIdList?: string[];
  /**
   * 当前查询单页的数据量
   */
  pageSize: number;
  /**
   * 当前查询的页码
   */
  pageNum: number;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
}

/**
 * **返回类型**
 * Bom列表
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84170
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/bom/page
 * @更新时间: 2021-08-19 12:01:56
 */
export interface postWebV1BomPageApiResListResItem {
  /**
   * bomId
   */
  bomId: string;
  /**
   * bom表单编号
   */
  bomCode?: string;
  /**
   * bom版本号
   */
  bomVersionNum?: string;
  /**
   * bom订单状态  WAIT_SUBMIT:待提交 SUBMITTED:已提交 CALCULATED:已核算 CLOSED:已关闭
   */
  bomOrderState: BOM_ORDER_STATUS_ENUMS;
  /**
   * bom创建时间
   */
  bomCreatedTime?: number;
  /**
   * Bom提交时间
   */
  bomSubmitTime?: number;
  /**
   * 是否显示修改Bom按钮
   */
  isDisplayUpdateBomButton: boolean;
  /**
   * 设计图片列表
   */
  designPictureList: string[];
  /**
   * 成衣spu编码
   */
  styleCode?: string;
  /**
   * 设计款skc_id
   */
  prototypeId?: string;
  /**
   * 设计款skc_code
   */
  designCode: string;
  /**
   * 是否动销: 0-否; 1-是;  (款式开发)
   */
  isOnSale?: boolean;
  /**
   * 最新颜色 skc当前最新提交的设计款信息中颜色
   */
  latestColor?: string;
  /**
   * 颜色编码
   */
  colorCode?: string;
  /**
   * 是否补做 false 否 true是
   */
  isMakeMore?: boolean;
  /**
   * 是否紧急(1:紧急,0:不紧急)
   */
  isUrgent?: boolean;
  /**
   * 是否取消 0 否 1是
   */
  isCanceled?: boolean;
  /**
   * 版单取消原因
   */
  cancelReason?: string;
  /**
   * 版单取消时间
   */
  cancelTime?: number;
  /**
   * 取消版单操作人id
   */
  cancelUserId?: string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName?: string;
  /**
   * 版单取消备注
   */
  cancelRemark?: string;
  /**
   * 版单取消环节
   */
  processingStep?: string;
  /**
   * 款类型: 1-正常款; 2-复色款;
   */
  skcType?: SKC_TYPE_ENUM;
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
   * 商品末级分类(款式品类(打版品类的第三个下拉框))
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计款生成时间
   */
  skcCreatedTime?: number;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: number;
  /**
   * bom子集列表
   */
  childBomOrderList: IBomPageChildBomOrderListItem[];
  /**
   * 暂存状态: 0:否; 1,是 (默认0) --v3.5.1
   */
  transientState?: YES_NO_ENUM;
  /**
   * 暂存次数, 默认0  --v3.5.1
   */
  transientCount?: string;
  /**
   * 找料状态: 0-否; 1-是 (默认0) --v3.11
   */
  materialSearchState?: YES_NO_ENUM;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
  /**
   * 季节
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
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
     * 裁前裁后工艺Map:
     *      key: 数值; (工艺要求:  100:裁版前工艺 110:裁版后工艺)
     *      value: 数组; (String[], ["染色","熨烫"]
     */
  categoryMap: {
    [key: string]: string[];
  };
}

/**
 * 响应数据
 */
export interface PostWebV1BomPageApiRes {
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 分页数据
   */
  list?: postWebV1BomPageApiResListResItem[];
}

/**
 * **请求类型**
 * bom打印
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84178
 *
 * @请求方法: GET
 * @请求地址: /plm-design/web/v1/bom/print
 * @更新时间: 2021-08-19 12:01:57
 */
export interface GetWebV1BomPrintApiReq {
  bomId: string;
}

/**
 * **返回类型**
 * bom打印
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84178
 *
 * @请求方法: GET
 * @请求地址: /plm-design/web/v1/bom/print
 * @更新时间: 2021-08-19 12:01:57
 */
export interface getWebV1BomPrintApiResBomOrderDetailListResItem {
  /**
   * 色系
   */
  colorName?: string;
  /**
   * 色号
   */
  colorNumber?: string;
  /**
   * 参考出米数最高值
   */
  referMeterNumHigh?: number;
  /**
   * 幅宽单位
   */
  widthUnit?: string;
  /**
   * 大货销价(分)
   */
  matchGuidePrice?: number;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPicture?: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource?: number;
  /**
   * 剪版销价(分)
   */
  matchSampleGuidePrice?: number;
  /**
   * 规格(辅料)
   */
  craftSpecification?: string;
  /**
   * 销售价格(辅料)
   */
  matchSalePrice?: number;
  /**
   * 需求类型: 1, 面料; 2, 辅料;
   */
  demandType?: number;
  /**
   * 需求单id
   */
  demandId?: number;
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm?: number;
  /**
   * 匹配物料图片
   */
  matchPictureList?: string[];
  /**
   * 匹配物料SPU编码: 商品编码
   */
  commodityCode?: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber?: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName?: string;
  /**
   * 参考出米数单位
   */
  referMeterNumUnit?: string;
  /**
   * 参考出米数最低值
   */
  referMeterNumLow?: number;
  /**
   * 克重最高值
   */
  weightHigh?: string;
  /**
   * 匹配反馈备注
   */
  matchRemark?: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 销售空差
   */
  matchPurchaseGap?: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 辅料
   */
  commodityType?: number;
  /**
   * 剪版销价单位
   */
  matchSampleUnit?: string;
  /**
   * SKU编码(辅料)
   */
  skuCode?: string;
  /**
   * 克重单位
   */
  weightUnit?: string;
  /**
   * 大货销价单位
   */
  matchCostPriceUnit?: string;
  /**
   * 需求匹配单编码
   */
  matchCode?: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason?: string;
  /**
   * 颜色(辅料规格)
   */
  attrColor?: string;
  /**
   * 回复人员
   */
  matcherName?: string;
  /**
   * 剪版方式,字典code
   */
  cuttingMethod?: string;
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState?: number;
  /**
   * 需求匹配单id
   */
  matchId?: number;
  /**
   * 包装数量(辅料)
   */
  packNumber?: number;
  /**
   * 幅宽最高值
   */
  widthHigh?: string;
  /**
   * bomID
   */
  bomId?: number;
  /**
   * 材质(辅料规格)
   */
  attrMaterial?: string;
  /**
   * 商品id
   */
  commodityId?: number;
  /**
   * bom物料ID
   */
  bomMaterialId?: number;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList: IBomPrintCraftDemandInfoListItem[];
  /**
   * 成分; json, 会有多种成分比例
   */
  material?: string;
  /**
   * 物料确认结果ID
   */
  trackResultId?: number;
  /**
   * 克重最低值
   */
  weightLow?: string;
  /**
   * 商品名称(品名)
   */
  commodityName?: string;
  /**
   * 幅宽最低值
   */
  widthLow?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1BomPrintApiRes {
  /**
   * 设计师id【设计师】
   */
  designerId?: string;
  /**
   * bom表单编号
   */
  bomCode?: number;
  /**
   * bomID
   */
  bomId?: number;
  /**
   * 交货日期
   */
  deliveryTime?: string;
  /**
   * bom详细列表
   */
  bomOrderDetailList?: getWebV1BomPrintApiResBomOrderDetailListResItem[];
  /**
   * 外发版房编号
   */
  roomCode?: number;
  /**
   * 设计师编号【设计师】
   */
  designerCode?: string;
  /**
   * 外发版房ID
   */
  roomId?: number;
  /**
   * 外发版房名
   */
  roomName?: number;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 外发日期
   */
  outsourceTime?: string;
  /**
   * 商品末级分类(款式品类(打版品类的第三个下拉框))
   */
  category?: string;
}

/**
 * **请求类型**
 * bom详情
 */
export interface GetWebV1BomDetailApiReq {
  bomId: string;
  detailType: string;
}

/**
 * **返回类型**
 * bom详情
 * @请求方法: GET
 */
export interface CreftItem extends IBomPrintCraftDemandInfoListItem {}

/**
 * 齐料仓信息
 */
export interface IBomDetailWarehouseColorInfo {
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
export interface IBomDetailMaterialRemarkListItem {
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
export interface getWebV1BomDetailApiResBomOrderMaterialListResItem {
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
  materialRemarkList: IBomDetailMaterialRemarkListItem[];
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
  demandType?: DESIGN_MATERIAL_TYPE_ENUM;
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
  warehouseColorInfo?: IBomDetailWarehouseColorInfo;
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
  craftDemandInfoList: IBomPrintCraftDemandInfoListItem[];
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
  bomOrderState: BOM_ORDER_STATUS_ENUMS;
  /**
   * 版单id
   */
  prototypeId?: string;
}
/**
 * 响应数据
 */
export interface IBomWebDetailResMaterialDemandListItem {
  /**
   * bom物料需求id-主键
   */
  bomMaterialDemandId: string;
  /**
   * bomId
   */
  bomId?: string;
  /**
   * 物料项目名
   */
  prototypeMaterialName?: string;
  /**
   * 需求数量(保留两位小数)
   */
  demandNum?: string;
  /**
   * 需求数量单位(编码)
   */
  demandNumUnit?: string;
  /**
   * 需求数量单位名称
   */
  demandNumUnitName?: string;
  /**
   * 物料类型: 1:面料  2:辅料; (默认2)
   */
  materialDemandType?: string;
  /**
   * 需求图片
   */
  demandPictureList: string[];
  /**
   * 对色/包料状态: 0-无; 1-对色; 2-包料; (默认0)
   */
  colorMatchMaterialState?: string;
  /**
   * 对色/包料对应物料名
   */
  colorMatchMaterialName?: string;
  /**
   * 对色/包料对应物料id
   */
  colorMatchMaterialId?: string;
  /**
   * 需求备注
   */
  demandRemark?: string;
  /**
   * 履约需求id
   */
  supplyChainDemandId?: string;
  /**
   * 履约需求编号
   */
  supplyChainDemandCode?: string;
  /**
   * 履约需求创建时间(暂存时为空, 提交成功后才有)
   */
  demandCreatedTime?: number;
  /**
   * 需求处理人名称(提交到履约, 并分配后才有值) 调履约接口查
   */
  demandHandlerName?: string;
  /**
   * 需求状态 0:初始化; 100:已提交; 120:履约关闭; 190:删除;  200: PLM关闭
   */
  demandState?: string;
  /**
   * 找料状态: 0,否; 1,是(找料中)
   */
  materialSearchState?: string;
  /**
   * 匹配数量
   */
  materialMatchNum?: string;
  /**
   * 最新bom物料id
   */
  latestBomMaterialId?: string;
  /**
   * 履约关闭时间
   */
  supplyCloseTime?: number;
  /**
   * 履约关闭原因
   */
  supplyCloseReason?: string;
  /**
   * 备注
   */
  remark?: string;
  bomOrderMaterial: getWebV1BomDetailApiResBomOrderMaterialListResItem;
}
export interface GetWebV1BomDetailApiRes {
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 款来源
   * {@link DesignStyleSourceTypeEnum}
   */
  sourceType?: string;
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
   * SPU生成时间
   */
  spuCreatedTime?: number;
  /**
   * SPU创建人名称
   */
  spuCreatorName?: string;
  /**
   * 商品末级分类(款式品类(打版品类的第三个下拉框))
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 供给方式-OPS
   */
  supplyModeName?: string;
  /**
   * 供给方式编码
   */
  supplyModeCode?: string;
  /**
   * 波段编码-OPS
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
  /**
   * 版单id
   */
  prototypeId?: string;
  /**
   * 最新版单id
   */
  latestPrototypeId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 设计图片列表
   */
  designPictureList: string[];
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime?: number;
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
   * 版单是否取消 0 否 1是
   */
  isCanceled?: boolean;
  /**
   * 是否动销: 0-否; 1-是;  (款式开发)
   */
  isOnSale?: boolean;
  /**
   * 最新颜色 skc当前最新提交的设计款信息中颜色
   */
  latestColor?: string;
  /**
   * 颜色编码
   */
  colorCode?: string;
  /**
   * 复色款号
   */
  makeSameDesignCode?: string;
  /**
   * bomId
   */
  bomId?: string;
  /**
   * bom表单编号
   */
  bomCode?: string;
  /**
   * bom版本号
   */
  bomVersionNum: string;
  /**
   * Bom历史版本   ---PLM-设计2.0
   */
  bomOrderHistoryVersionList: IBomDetailBomOrderHistoryVersionListItem[];
  /**
   * bom订单状态 WAIT_SUBMIT:待提交 SUBMITTED:已提交 WAIT_CALCULATED:待核算 CALCULATED:已核算 CLOSED:已关闭
   */
  bomOrderState: string;
  /**
   * 是否显示修改Bom按钮
   */
  isDisplayUpdateBomButton?: boolean;
  /**
   * 是否有暂时保存 true：点击Bom修改按钮，调用这api"/bom/transient-save/detail" 查看暂存信息   ---plm-设计需求-v1.3
   */
  isTransientSave?: boolean;
  /**
   * bom物料列表
   */
  bomOrderMaterialList: IBomBatchPrintResMaterialItem[];
  /**
   * bom物料需求列表 --v3.11
   */
  materialDemandList: IBomWebDetailResMaterialDemandListItem[];
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建人ID
   */
  creatorId?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * Bom提交时间
   */
  bomSubmitTime?: number;
  /**
   * 引用设计款号(改款需求)
   */
  quoteDesignCode?: string;
  /**
   * 暂存状态: 0:否; 1,是(默认0)  --v3.5.1
   */
  transientState?: YES_NO_ENUM;
  /**
   * 暂存次数, 默认0  --v3.5.1
   */
  transientCount?: string;
  /**
   * 找料状态: 0-否; 1-是 (默认0) --v3.11
   */
  materialSearchState?: YES_NO_ENUM;
  /**
   * 推荐面料spuSkuId集合 (款式开发)
   * bom编辑查询, 待提交状态会查询对应设计需求单选中的物料信息
   */
  fabricSpuSkuList?: {
    /**
     * spuId
     */
    spuId: string;
    /**
     * skuId
     */
    skuId: string;
  }[];
  /**
   * 平台名称(spu对应灵感任务的店铺所在平台)
   */
  platformName?: string;
}

/**
 * **请求类型**
 * bom状态数量统计
 * @see https://yapi.ibaibu.com/project/1404/interface/api/86858
 *
 * @请求方法: GET
 * @请求地址: /plm-design/web/v1/bom/state-statistics
 * @更新时间: 2021-08-25 14:27:49
 */
export interface GetWebV1BomStateStatisticsApiReq {
  designerId?: string;
  clothesDesigner?: string;
}

/**
 * **返回类型**
 * bom状态数量统计
 * @see https://yapi.ibaibu.com/project/1404/interface/api/86858
 *
 * @请求方法: GET
 * @请求地址: /plm-design/web/v1/bom/state-statistics
 * @更新时间: 2021-08-25 14:27:49
 */
export interface GetWebV1BomStateStatisticsApiResItem {
  /**
   * 数量
   */
  quantity: string;
  /**
   * bom订单状态
   */
  bomOrderState: BOM_ORDER_STATUS_ENUMS;
}
/**
 * 响应数据
 */
export type GetWebV1BomStateStatisticsApiRes = GetWebV1BomStateStatisticsApiResItem[];

export interface IBomBatchPrintReq {
  /**
   * BomID
   */
  bomIds: string[];
  /**
   * 是否是履约 true 是，false 否  默认为否  v2.1.2
   */
  isPerformance?: boolean;
  /**
   * 设计款号 v2.1.2
   */
  designCodeList?: string[];
}

export interface IBomPrintCraftDemandInfoListItem {
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
export type ICraftMatchReq = {
  /**
   * 工艺需求ID
   */
  craftDemandId: string;
};
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
   * 工艺任务处理登记大货进价
   */
  taskCostPrice: string;
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
 * 查询对象
 */
export interface ILogListReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
}

/**
 * **返回类型**
 * 【设计打版操作日志】查询列表（非分页接口）
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84350
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/design/log/data-list
 * @更新时间: 2021-08-17 09:51:32
 */
export interface ILogListResItem {
  /**
   * 自增id
   */
  id: string;
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型
   */
  bizType: string;
  /**
   * 打版信息id
   */
  prototypeId: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 版本号
   */
  versionNum: string;
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
}
export type ILogListRes = ILogListResItem[];

/**
 * 设计打版备注信息对象
 */
export interface IRemarksSaveReq {
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型  MATERIAL_PURCHASE：采购申请、BOM_ORDER：开发bom、MATERIAL_CONFIRM：物料确认、DESIGN_PROTOTYPE：设计拆版、CANCELLED：已取消
   */
  bizType: string;
  /**
   * 备注信息
   */
  remark: string;
}
/**
 * 响应数据
 */
export interface IRemarksSaveRes {
  /**
   * 自增id
   */
  designRemarksId: string;
  /**
   * 业务id
   */
  bizId: string;
  /**
   * 业务类型
   */
  bizType: string;
  /**
   * 打版信息id
   */
  prototypeId: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 业务版本号
   */
  bizVersionNum: string;
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

interface IBomBatchPrintResMaterialItem {
  demandId?: string;
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
  // singleDosage?: string;
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
   * bom物料备注列表
   */
  materialRemarkList: IBomDetailMaterialRemarkListItem[];
  /**
   * 需求单id
   * 「已废弃」
   */
  // demandId?: string;
  /**
   * 需求单编号
   * 「已废弃」
   */
  // demandCode?: string;
  /**
   * 需求序号
   * 「已废弃」
   */
  // demandTag?: string;
  /**
   * 辅料关联的面料tag
   * 「已废弃」
   */
  // fabricDemandTag?: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料; 3:特殊辅料; 4:辅料找料 ---V.3.11(添加4类型)
   */
  demandType: DESIGN_MATERIAL_TYPE_ENUM;
  /**
   * 需求匹配单id
   * 「已废弃」
   */
  // matchId?: string;
  /**
   * 需求匹配单编码
   * 「已废弃」
   */
  // matchCode?: string;
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
  // packNumberUnit?: string;
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
  // widthLow?: string;
  /**
   * 门幅最高值(面料), 作废, 使用widthStrFormat展示
   * 「已废弃」
   */
  // widthHigh?: string;
  /**
   * 门幅单位(面料), 作废, 使用widthStrFormat展示
   * 「已废弃」
   */
  // widthUnit?: string;
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
  // weightLow?: string;
  /**
   * 克重最高值(面料), 作废, 使用weightStrFormat展示
   * 「已废弃」
   */
  // weightHigh?: string;
  /**
   * 克重单位(面料), 作废, 使用weightStrFormat展示
   * 「已废弃」
   */
  // weightUnit?: string;
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
  warehouseColorInfo: IBomDetailWarehouseColorInfo;
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
  craftDemandInfoList: IBomPrintCraftDemandInfoListItem[];
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
   * 物料图,多值以逗号隔开
   *  - 对接淘系
   */
  materialImg?: string;
}

export type IBomBatchPrintRes = {
  /**
   * bomID
   */
  bomId?: string;
  /**
   * bom表单编号
   */
  bomCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
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
   * 设计图(款式开发)
   */
  designPicture?: string;
  /**
   * 商品末级分类(款式品类(打版品类的第三个下拉框))
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 外发版房ID
   */
  roomId?: string;
  /**
   * 外发版房编号
   */
  roomCode?: string;
  /**
   * 外发版房名
   */
  roomName?: string;
  /**
   * 外发日期
   */
  outsourceTime?: number;
  /**
   * 交货日期
   */
  deliveryTime?: number;
  /**
   * 款类型: 1-正常款; 2-复色款;
   */
  skcType?: SKC_TYPE_ENUM;
  /**
   * 齐套单库位号 ---项目V0.4
   */
  storageLocation?: string;
  /**
   * bom详细列表
   */
  bomOrderMaterialList: IBomBatchPrintResMaterialItem[];
  /**
   * 是否拼接 0 否 1是 v2.1.2
   */
  isSplicing?: boolean;
  /**
   * BOM单提交时间  v2.1.2
   */
  bomOrderSubmitTime?: number;
  /**
   * 找料状态: 0-否; 1-是 (默认0) --v3.11
   */
  materialSearchState?: YES_NO_ENUM;
}[];
