/**
 * **请求类型**
 * 面辅料采购跟进列表
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84334
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/material/purchase/page-list
 * @更新时间: 2021-08-19 18:04:58
 */
export interface PostMaterialPurchasePageListApiReq {
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 采购单号
   */
  purchaseOrderNo?: string;
  /**
   * 物料spu
   */
  materialCode?: string;
  /**
   * 款的生成时间(开始)
   */
  skcCreatedTimeStart?: string;
  /**
   * 款的生成时间(结束)
   */
  skcCreatedTimeEnd?: string;
  /**
   * 设计师【设计师】
   */
  designerNameList?: string[];
  /**
   * 设计师id集合
   */
  designerIdList?: string[];
  /**
   * 设计组
   */
  designerGroupCodeList?: string[];
  /**
   * 所属地区
   */
  regionId?: string;
  /**
   * 物料采购状态   取值来源于供应链履约
   */
  materialPurchaseStatusCodeList?: string[];
  /**
   * 采购申请时间(开始)
   */
  purchaseApplyTimeStart?: string;
  /**
   * 采购申请时间(结束)
   */
  purchaseApplyTimeEnd?: string;
  /**
   * 是否裁前二次工艺
   */
  isCraft?: string;
  /**
   * 状态 1|有效，0|取消
   */
  status?: string;
  /**
   * 剪版单号
   */
  cuttingCode?: string;
  /**
   * 齐套单号
   */
  materialKittingCode?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
}

/**
 * **返回类型**
 * 面辅料采购跟进列表
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84334
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/material/purchase/page-list
 * @更新时间: 2021-08-19 18:04:58
 */
export interface postMaterialPurchasePageListApiResListResItem {
  /**
   * 面辅料标志
   */
  demandType: string;
  /**
   * 主键id
   */
  materialPurchaseFollowId?: number;
  /**
   * 打版信息id
   */
  prototypeId?: number;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 采购单号
   */
  purchaseOrderNo?: string;
  /**
   *平台名称(spu对应灵感任务的店铺所在平台)
   */
  platformName?: string;
  /**
   * 采购需求单号(采购明细唯一编码, 与剪配版单号1:1)
   */
  purchaseRequestCode?: string;
  /**
   * 散剪倍率(面料时才有)
   */
  scatterCutRatio?: string;
  /**
   * 散剪价=足米价*倍率 (面料时才有)
   */
  scatterCutPrice?: string;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 状态（剪版单的状态） 1|有效，0|取消
   */
  status?: number;
  /**
   * 物料类型
   */
  materialCategory?: string;
  /**
   * 剪版单号 当采购申请需求传到供应链履约后，供应链履约返回剪版单号给PLM
   */
  cuttingCode?: string;
  /**
   * 物料spu  开发bom表详情列表中的物料SPU，由供应链履约提供物料SPU
   */
  materialCode?: string;
  /**
   * 物料名称
   */
  materialName?: string;
  /**
   * 色卡图片
   */
  colorCardPictureUrl?: string;
  /**
   * 物料颜色
   */
  materialColor?: string;
  /**
   * 裁前二次工艺
   */
  cuttingProcess?: string;
  /**
   * 采购申请时间
   */
  purchaseApplyTime?: string;
  /**
   * 采购申请原因
   */
  purchaseApplyCause?: string;
  /**
   * 采购数量
   */
  purchaseQuantity?: string;
  /**
   * 采购数量的单位
   */
  purchaseUnit?: string;
  /**
   * 物料采购状态 供应链履约同步每个物料的采购状态
   */
  materialPurchaseStatus?: string;
  /**
   * 匹配物料图片
   */
  matchPicture?: string;
  /**
   * 采购取消时间
   */
  purchaseCancelTime: string;
  /**
   * 采购取消原因
   */
  purchaseCancelReason: string;
  /**
   * 采购取消操作人姓名
   */
  purchaseCancelUserName: string;
  /**
   * 版单取消时间
   */
  cancelTime: string;
  /**
   * 版单取消原因
   */
  cancelReason: string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName: string;
  /**
   * 需求内容
   */
  intentionContent: string;
  /**
   * 原款-skc编码(需求引用款skc编码),自建SPU时无该字段
   */
  quoteDesignCode: string;
  /**
   * 纸样改动大小, 100:无改动;110:小,120:大
   */
  patternChangeSize: string;
  /**
   * 参考款号
   */
  referenceDesignCode: string;
  /**
   * 客户图片
   */
  customerPicture: string;
}
export interface PostMaterialPurchasePageListApiRes {
  page?: number;
  total?: number;
  list?: postMaterialPurchasePageListApiResListResItem[];
}

/**
 * **请求类型**
 * 取消物料
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84336
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/material/purchase/cancel-material
 * @更新时间: 2021-08-21 16:03:04
 */
// export interface postMaterialPurchaseCancelMaterialApiReqMaterialReqListResItem {
//   /**
//    * 采购单号 CG+（后两位）年（两位）月（两位）日+4位流水号，例如：CG2107170001  -- 对应供应履约的剪版单号
//    */
//   purchaseOrderNo: string;
//   /**
//    * 剪版单号
//    */
//   cuttingCode: string;
//   /**
//    * 匹配单号
//    */
//   matchId: number;
// }
export interface PostMaterialPurchaseCancelMaterialApiReq {
  // materialReqList: postMaterialPurchaseCancelMaterialApiReqMaterialReqListResItem[];
  /**
   * 取消原因
   */
  cancelReason: string;
  /**
   * 面辅料采购跟进主键
   */
  materialPurchaseFollowId: string | number;
}

/**
 * **返回类型**
 * 取消物料
 * @see https://yapi.ibaibu.com/project/1404/interface/api/84336
 *
 * @请求方法: POST
 * @请求地址: /plm-design/web/v1/material/purchase/cancel-material
 * @更新时间: 2021-08-19 18:04:58
 */
export type PostMaterialPurchaseCancelMaterialApiRes = null;

export type IPurchaseOrderLogReq = Record<string, unknown>;
export type IPurchaseOrderLogRes = {
  /**
   * 操作说明
   */
  content: string;
  /**
   * 创建时间
   */
  createdTime: string;
  operator?: string;
}[];
