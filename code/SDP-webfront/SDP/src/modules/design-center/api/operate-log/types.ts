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
 * 设计打版操作日志对象
 */
export interface IBizListReq {
  /**
   * 业务id
   */
  bizId: string;
}
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
   * 业务类型   MATERIAL_PURCHASE("4", "采购申请")
   * BOM_ORDER("3", "开发bom") MATERIAL_CONFIRM("2", "物料确认")
   * DESIGN_PROTOTYPE("1", "设计拆版")
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
}[];

/**
 * 备注 请求参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103411
 */
export interface DevelopStyleRemarkReq {
  /** 任务id */
  taskId: number;
  /** 备注信息 */
  remark: string;
}

/**
 * 备注 响应体
 * @see https://yapi.textile-story.com/project/1361/interface/api/103411
 */
export interface DevelopStyleRemarkRes {
}
