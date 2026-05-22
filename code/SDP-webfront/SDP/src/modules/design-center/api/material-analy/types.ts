/**
 * 设计打版备注信息对象
 */
export interface IBatchListReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCodes: string[];
}
export interface IBatchListItem {
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
