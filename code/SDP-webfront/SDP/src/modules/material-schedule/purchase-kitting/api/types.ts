import { MATERIAL_KITTING_STATE_ENUM } from '../constant';

export type IMaterialSignMaterialListRes = IMaterialSignMaterialListItem[];
export interface IMaterialSignMaterialListItem {
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
   * 采购单号
   */
  purchaseOrderNo: string;
  /**
   * 剪版单号 当采购申请需求传到供应链履约后，供应链履约返回剪版单号给PLM
   */
  cuttingCode: string;
  /**
   * 物料spu  .供应链履约提供物料id
   * 面料取SPU，辅料取SKU
   */
  materialCode: string;
  /**
   * 物料类型
   */
  materialCategory: string;
  /**
   * 物料名称
   */
  materialName: string;
  /**
   * 物料颜色
   */
  materialColor: string;
  /**
   * 物料采购状态
   */
  materialPurchaseStatus: string;
  /**
   * 物料采购状态code
   */
  materialPurchaseStatusCode: string;
  /**
   * 采购数量
   */
  purchaseQuantity: string;
  /**
   * 单位
   */
  purchaseUnit: string;
  /**
   * 物料是否取消的状态 1|有效，0|取消
   */
  status: string;
  /**
   * 裁前二次工艺
   */
  cuttingProcess: string;
  /**
   * 期望采购完成日期
   */
  purchaseApplyTime: string;
  /**
   * 采购申请原因
   */
  purchaseApplyCause: string;
  /**
   * 物料色号  开发bom表详情列表中的物料SPU，由供应链履约提供物料SPU
   */
  materialColorNo: string;
  /**
   * 色卡图片
   */
  colorCardPictureUrl: string;
  /**
   * 剪版方法
   */
  cutMethod: string;
  /**
   * 裁剪方法  -- 对应供应履约的特殊要求
   */
  cuttingMethod: string;
  /**
   * 物料确认结果ID
   */
  trackResultId: string;
  /**
   * 匹配物料图片
   */
  matchPicture: string;
  /**
   * 需求匹配单id
   */
  matchId: string;
  /**
   * 需求id
   */
  demandId: string;
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState: string;
  /**
   * 物料id（设计款号的物料id）
   */
  prototypeMaterialId: string;
  /**
   * bom物料清单主键
   */
  bomMaterialId: string;
  /**
   * 需求类型: 1, 面料; 2, 辅料
   */
  demandType: string;
  /**
   * 齐料单编号
   */
  materialKittingCode: string;
  /**
   * @deprecated 门幅最低值(面料), 作废, 使用widthStrFormat展示
「已废弃」
   */
  widthLow: string;
  /**
   * @deprecated 幅宽最高值
   */
  widthHigh: string;
  /**
   * @deprecated 幅宽单位
   */
  widthUnit: string;
  /**
   * 幅宽; 格式如: '120-130CM'或'125±5CM'  --v5.11
   */
  widthStrFormat: string;
  /**
   * 使用部位,字典code
   */
  partUse: string;
  /**
   * 二次工艺
   */
  craftDemandInfo: string;
  /**
   * 物料明细备注
   */
  materialRemark: string;
}

/**
 * 物料齐套跟进查询参数
 */
export interface IMaterialPageReq {
  /**
   * 是否裁前二次工艺
   */
  isCraft?: string;
  /**
   * 齐套单号
   */
  materialKittingCode?: string;
  /**
   * 齐套状态 100:待齐套 110:待发货 120:待签收 130:已签收 140:已关闭
   */
  materialStateList?: string[];
  /**
   * 齐套签收时间(开始)
   */
  signingTimeStart?: string;
  /**
   * 齐套签收时间(结束)
   */
  signingTimeEnd?: string;
  /**
   * 齐套签收时间(排序)
   */
  signingTimeSort?: string;
  /**
   * 创建时间开始
   */
  createdTimeStart?: string;
  /**
   * 创建时间结束
   */
  createdTimeEnd?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode?: string;
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
  skcType?: string;
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
  isOnSale?: string;
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
   * 当前查询的页码
   */
  pageNum: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize: number;
}
export interface IMaterialPageListItem {
  /**
   * 主键id
   */
  orderMaterialFollowId?: string;
  /**
   * 打版信息id
   */
  prototypeId?: string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 加工单编号
   */
  processCode?: string;
  /**
   * 裁前二次工艺,冗余信息
   */
  cuttingProcess?: string;
  /**
   * 齐套状态 100:待齐套 110:待发货 120:待签收 130:已签收 140:已关闭
   */
  materialState?: MATERIAL_KITTING_STATE_ENUM;
  /**
   * 齐料单编号
   */
  materialCode?: string;
  /**
   * 齐套签收时间
   */
  signingTime?: number;
  /**
   * 齐套签收人id
   */
  signerId?: string;
  /**
   * 齐套签收人名称
   */
  signer?: string;
  /**
   * 款类型: 1--正常款 2-复色款
   */
  skcType?: string;
  /**
   * 设计图片
   */
  designPicture?: string;
  /**
   * 设计师
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 设计组别
   */
  designerGroupCode?: string;
  /**
   * 设计组别编码
   */
  designerGroup?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 参考款号
   */
  referenceDesignCode?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
}

/**
 * 响应数据
 */
export interface IMaterialPageRes {
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
  list: IMaterialPageListItem[];
}
