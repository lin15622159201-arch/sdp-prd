import { STATUS_ENUM } from '../constant';

/**
 * 付款单列表分页 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4150
 */
export interface IPaymentOrderPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 付款单号
   */
  paymentOrderCode?: string;
  /**
   * 账单编码
   */
  totalBillCode?: string;
  /**
   * 付款状态 (0 = 未付款, 1 = 已付款)
   */
  paymentStatus?: string;
}

export interface IPaymentOrderPageRes {
  pageNum?: number;
  total?: number;
  list: IPaymentOrderPageResListItem[];
}

export interface IPaymentOrderPageResListItem {
  /**
   * 付款单ID
   */
  paymentOrderId?: string;
  /**
   * 付款单号
   */
  paymentOrderCode?: string;
  /**
   * 总账单id
   */
  totalBillId?: string;
  /**
   * 账单编码
   */
  totalBillCode?: string;
  /**
   * 账单类型
   */
  billType?: string;
  /**
   * 供应商
   */
  supplier?: string;
  /**
   * 账单应付
   */
  payableAmount?: string;
  /**
   * 实付金额
   */
  paidAmount?: string;
  /**
   * 申请人
   */
  applicant?: string;
  /**
   * 付款人
   */
  payer?: string;
  /**
   * 付款状态 (0 = 未付款, 1 = 已付款)
   */
  paymentStatus?: number;
  /**
   * 付款主体
   */
  paymentSubject?: string;
  /**
   * 付款时间
   */
  paymentTime?: number;
  /**
   * 银行账号
   */
  bankAccount?: string;
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 开户支行
   */
  branchName?: string;
  /**
   * 创建人ID
   */
  creatorId?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 修改人ID
   */
  reviserId?: string;
  /**
   * 修改人名称
   */
  reviserName?: string;
  /**
   * 修改时间
   */
  revisedTime?: number;
}

// 付款单列表分页 ⬆️

/**
 * 统计状态数量 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4158
 */

export interface IPaymentOrderPaymentStatusSummaryRes {
  pendingCount?: string;
  paidCount?: string;
  totalCount?: string;
}

// 统计状态数量 ⬆️

/**
 * 确认付款 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4162
 */
export interface IPaymentOrderConfirmPaymentReq {
  /**
   * 付款单ID
   */
  paymentOrderId: string;
  /**
   * 实付金额
   */
  paidAmount: string;
}

// 确认付款 ⬆️

/**
 * 付款单详情 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4826
 */
export interface IWebPaymentOrderReq {
  paymentOrderId: string;
}

export interface IWebPaymentOrderRes {
  /**
   * 付款单ID
   */
  paymentOrderId?: string;
  /**
   * 付款单号
   */
  paymentOrderCode?: string;
  /**
   * 总账单id
   */
  totalBillId?: string;
  /**
   * 账单编码
   */
  totalBillCode?: string;
  /**
   * 账单类型
   */
  billType?: string;
  /**
   * 供应商
   */
  supplier?: string;
  /**
   * 账单应付
   */
  payableAmount?: string;
  /**
   * 实付金额
   */
  paidAmount?: string;
  /**
   * 申请人
   */
  applicant?: string;
  /**
   * 付款人
   */
  payer?: string;
  /**
   * 付款状态 (0 = 未付款, 1 = 已付款)
   */
  paymentStatus?: STATUS_ENUM;
  /**
   * 付款主体
   */
  paymentSubject?: string;
  /**
   * 付款时间
   */
  paymentTime?: number;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 银行账号
   */
  bankAccount?: string;
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 开户支行
   */
  branchName?: string;
  /**
   * 总账单详情
   */
  financeTotalBillDetailVo?: IWebPaymentOrderResFinanceTotalBillDetailVo;
}

export interface IWebPaymentOrderResFinanceTotalBillDetailVo {
  /**
   * 账单id
   */
  totalBillId?: string;
  /**
   * 账单编码
   */
  totalBillCode?: string;
  /**
   * 账单月份 格式 2025-01
   */
  totalBillMonth?: string;
  /**
   * 账单月份
   */
  month?: string;
  /**
   * 账单年份
   */
  year?: string;
  /**
   * 账单状态 PENDING_VERIFICATION:待核实,ABNORMAL:异常,  ABNORMAL_CONFIRMING:异常确认中, VERIFIED:已核实'
   */
  billStatus?: string;
  /**
   * 对账金额
   */
  reconciledAmount?: string;
  /**
   * 服务人力成本
   */
  serviceCost?: string;
  /**
   * 仓租费用
   */
  storageCharges?: string;
  /**
   * 补贴金额
   */
  allowanceAmount?: string;
  /**
   * 账单金额（含税）
   */
  inclusiveTaxAmount?: string;
  /**
   * 账单金额（不含税）
   */
  excludingTaxAmount?: string;
  /**
   * 对账状态(1:已对账,0:待对账)
   */
  reconciledStatus?: string;
  /**
   * 付款状态(1:已付款,0:待付款)
   */
  paymentStatus?: string;
  /**
   * 付款单号
   */
  paymentOrderCode?: string;
  /**
   * 核实人
   */
  verifierName?: string;
  /**
   * 核实时间
   */
  verifierTime?: number;
  /**
   * 甲方
   */
  partyA?: string;
  /**
   * 乙方
   */
  partyB?: string;
  /**
   * 甲方确认时间
   */
  partyAConfirmedAt?: number;
  /**
   * 乙方确认时间
   */
  partyBConfirmedAt?: number;
  /**
   * 银行账号
   */
  bankAccount?: string;
  /**
   * 开户行
   */
  bankName?: string;
  /**
   * 开户支行
   */
  branchName?: string;
  /**
   * 平台账单统计集合
   */
  platformBillMap?: IWebPaymentOrderResFinanceTotalBillDetailVoPlatformBillMap;
  /**
   * 类型账单汇总
   */
  billTypeStatisticsVos: IWebPaymentOrderResFinanceTotalBillDetailVoBillTypeStatisticsVosItem[];
}

export interface IWebPaymentOrderResFinanceTotalBillDetailVoPlatformBillMap {
  key: IWebPaymentOrderResFinanceTotalBillDetailVoPlatformBillMapKeyItem[];
}

export interface IWebPaymentOrderResFinanceTotalBillDetailVoPlatformBillMapKeyItem {
  /**
   * 账单类型
   * FABRIC_CUTTING_ORDER:面料剪版
   * THREE_DIMENSIONAL_CUTTING_ORDER:3D剪版
   * ACCESSORIES_ORDER:辅料开发
   * DIGITAL_SKETCH_ORDER:数码描稿
   */
  billType?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 订单计数
   */
  orderCount?: string;
  /**
   * 对账金额
   */
  reconciledAmount?: string;
  /**
   * 补贴金额
   */
  allowanceAmount?: string;
  /**
   * 税点, 单位%
   */
  taxRate?: string;
  /**
   * 账单金额（含税）
   */
  inclusiveTaxAmount?: string;
  /**
   * 账单金额（不含税）
   */
  excludingTaxAmount?: string;
  /**
   * 差异金额
   */
  diffAmount?: string;
}

export interface IWebPaymentOrderResFinanceTotalBillDetailVoBillTypeStatisticsVosItem {
  isSum?: boolean; // 是否统计行
  /**
   * 账单类型
   * FABRIC_CUTTING_ORDER:面料剪版
   * THREE_DIMENSIONAL_CUTTING_ORDER:3D剪版
   * ACCESSORIES_ORDER:辅料开发
   * DIGITAL_SKETCH_ORDER:数码描稿
   */
  billType?: string;
  /**
   * 订单计数
   */
  orderCount?: string;
  /**
   * 账单金额（含税）
   */
  inclusiveTaxAmount?: string;
}

// 付款单详情 ⬆️
