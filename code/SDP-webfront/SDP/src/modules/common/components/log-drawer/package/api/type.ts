/**
 * 生产资料和合同管理等备注，日志的业务类型
 */
export enum LOG_REMARK_BIZTYPE_ENUM {
  CONTRACT = 1, // 合同管理
  STYLE_INFO = 2, // 生产资料
  FOB_DEMAND = 3, // FOB需求
  FOB_CUSTOMER_PRICE = 4, // FOB客户价格
  FOB_ARCHIVES = 5, // FOB生产资料
  FOB_CMT_BOM = 6, // FOB、CMT BOM列表
}

// 日志查询 - 需求任务日志查询
export interface IDemandEventLogListReq {
  busId: string;
  busType: string | number;
}
export interface IDemandEventLogListItem {
  /**
   * 日志id
   */
  logId?: string;
  /**
   * 业务id
   */
  busId: string;
  /**
   * 业务类型。1生产需求  |2打版需求  |3核价单日志 |4生产资料
   */
  busType: 'PROD_DEMAND' | 'SAMPLE_DEMAND' | 'PRICING_ORDER' | 'STYLE_INFO' | 'CONTRACT';
  /**
   * 日志类型
   */
  logType: string;
  /**
   * 日志内容
   */
  logContent: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 修改人名称
   */
  creatorName: string;
  content: string;
}

// 日志查询 - 生产资料日志查询
export interface IStyleInfoLogsReq {
  styleId: string;
}
// 日志查询 - 推款生产资料日志查询
export interface IStyleInfoLogsForTuikuanReq {
  bizId: string;
  bizType: LOG_REMARK_BIZTYPE_ENUM;
}
/**
 * 生产资料日志响应数据
 */
export interface IStyleInfoLogsItem {
  /**
   * 业务id
   */
  busId?: string;
  /**
   * 日志类型
   */
  logType: string;
  /**
   * 日志内容
   */
  logContent: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 修改人名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 日志id
   */
  logId: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 业务类型。1生产需求  |2打版需求  |3核价单日志 |4生产资料
   */
  busType: 0 | 1 | 2 | 3 | 4 | 5;
}

/**
 * 推款-生产资料日志响应数据
 */
export interface IStyleInfoLogsForTuikuanItem {
  logId: string;
  bizId: string;
  bizType: string;
  content: string;
  creatorId: string;
  creatorName: string;
  createdTime: string;
}

/**
  PROD_DEMAND(1, "生产需求"),
  SAMPLE_DEMAND(2,"打版需求"),
  PRICING_ORDER(3,"核价单"),
  STYLE_INFO(4,"生产资料"),
  CONTRACT(5,"合同资料"),
  DEMAND_TASK(6,"需求任务"),
 */
export enum REMARK_TYPE_ENUM {
  /** 生产需求 */
  PROD_DEMAND = 1,
  /** 打版需求 */
  SAMPLE_DEMAND = 2,
  /** 核价单 */
  PRICING_ORDER = 3,
  /** 生产资料 */
  STYLE_INFO = 4,
  /** 合同资料 */
  CONTRACT = 5,
  /** 需求任务 */
  DEMAND_TASK = 6,
}

export interface IGetTagLogs {
  buzId?: string;
  buzType?: string;
}
export interface IFileDownlog extends IGetTagLogs {
  content?: string;
}

// 获取日志
export interface IBillGetPaymentLogItem {
  /**
   * 日志id
   */
  logId: string;
  /**
   * 版费付款id
   */
  paymentId: string;
  /**
   * 结算单号
   */
  settleCode: string;
  /**
   * 付款申请编号
   */
  payApplyNumber: string;
  /**
   * 操作内容
   */
  logContent: string;
  /**
   * 操作内容desc
   */
  logContentDesc: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 操作人id
   */
  creatorId: string;
  /**
   * 操作时间
   */
  createdTime: string;
  /**
   * 操作人名称
   */
  creatorName: string;
}
export type IBillGetPaymentLogFromBillRes = IBillGetPaymentLogItem[];
