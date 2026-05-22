import { BILLTYPE_ENUM, TOTALBILL_STATUS_ENUM } from '../../constant';
import { YES_NO_NUMBER_ENUM } from '@/constant';

/**
 * 对账列表分页 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/3746
 */
export interface IFinanceTotalBillPageReq {
  pageNum?: number;
  pageSize?: number;
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
   * 账单状态 账单状态 PENDING_VERIFICATION:待核实,ABNORMAL:异常,  ABNORMAL_CONFIRMING:异常确认中, VERIFIED:已核实'
   */
  totalBillStatus?: string;
  /**
   * 对账状态(1:已对账,0:待对账)
   */
  reconciledStatus?: string;
  /**
   * 付款状态(1:已付款,0:待付款)
   */
  paymentStatus?: string;
}

export interface IFinanceTotalBillPageRes {
  pageNum?: number;
  total?: number;
  list: IFinanceTotalBillPageResListItem[];
}

export interface IFinanceTotalBillPageResListItem {
  /**
   * 账单id(totalBillId)
   */
  billId?: string;
  hasChildren: boolean;
  /**
   * 账单id
  */
  totalBillId?: string;
  /**
  * 账单编码
 */
  totalBillCode?: string;
  billCode?: string;
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
   * 账单状态 账单状态 PENDING_VERIFICATION:待核实,ABNORMAL:异常,  ABNORMAL_CONFIRMING:异常确认中, VERIFIED:已核实'
   */
  billStatus?: TOTALBILL_STATUS_ENUM;
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
  reconciledStatus?: YES_NO_NUMBER_ENUM;
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
  children: IFinanceBillFinanceBillByTotalBillIdResItem[];
  /**
   * 税点, 单位%
   */
  taxRate?: string;
  /**
   * 账单类型
   * FABRIC_CUTTING_ORDER:面料剪版
   * THREE_DIMENSIONAL_CUTTING_ORDER:3D剪版
   * ACCESSORIES_ORDER:辅料开发
   * DIGITAL_SKETCH_ORDER:数码描稿
   */
  billType?: string;
  /**
   * 补贴费用列表
   */
  billSubsidyList: IFinanceTotalBillPageResListItemBillSubsidyListItem[];
}

export interface IFinanceTotalBillPageResListItemBillSubsidyListItem {
  /**
   * 补贴费用字典code（配置在ops）
   */
  subsidyCode?: string;
  /**
   * 补贴费用字典名（配置在ops）
   */
  subsidyName?: string;
  /**
   * 费用金额
   */
  subsidyAmount?: string;
}

/** 对账列表分页 ⬆️ */

/**
 * 根据总账单id查找子帐单 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/3754
 */
export interface IFinanceBillFinanceBillByTotalBillIdReq {
  totalBillId: string;
}

export type IFinanceBillFinanceBillByTotalBillIdRes = IFinanceBillFinanceBillByTotalBillIdResItem[];
export interface IFinanceBillFinanceBillByTotalBillIdResItem {
  hasChildren?: boolean;
  /**
   * 账单id
   */
  billId?: string;
  /**
   * 总账单ID
   */
  totalBillId?: string;
  /**
   * 总账单编码
   */
  totalBillCode?: string;
  /**
   * 账单编码
   */
  billCode?: string;
  /**
   * 账单月份 格式 2025-01
   */
  billMonth?: string;
  /**
   * 账单类型
   * FABRIC_CUTTING_ORDER:面料剪版
   * THREE_DIMENSIONAL_CUTTING_ORDER:3D剪版
   * ACCESSORIES_ORDER:辅料开发
   * DIGITAL_SKETCH_ORDER:数码描稿
   */
  billType?: string;
  /**
   * 账单月份
   */
  month?: string;
  /**
   * 账单年份
   */
  year?: string;
  /**
   * 账单状态
   * PENDING_VERIFICATION:待核实
   * ABNORMAL:异常
   * ABNORMAL_CONFIRMING:异常确认中
   * VERIFIED:已核实
   */
  billStatus?: string;
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

/** 根据总账单id查找子帐单 ⬆️ */

/**
 * 子帐单统计详细 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/3774
 */
export interface IFinanceBillBillDetailByBillIdReq {
  billId: string;
}

export interface IFinanceBillBillDetailByBillIdRes {
  /**
   * 账单id
   */
  billId?: string;
  /**
   * 总账单ID
   */
  totalBillId?: string;
  /**
   * 总账单编码
   */
  totalBillCode?: string;
  /**
   * 账单编码
   */
  billCode?: string;
  /**
   * 账单月份 格式 2025-01
   */
  billMonth?: string;
  /**
   * 账单类型
   * FABRIC_CUTTING_ORDER:面料剪版
   * THREE_DIMENSIONAL_CUTTING_ORDER:3D剪版
   * ACCESSORIES_ORDER:辅料开发
   * DIGITAL_SKETCH_ORDER:数码描稿
   */
  billType?: BILLTYPE_ENUM;
  /**
   * 账单月份
   */
  month?: string;
  /**
   * 账单年份
   */
  year?: string;
  /**
   * 账单状态
   * PENDING_VERIFICATION:待核实
   * ABNORMAL:异常
   * ABNORMAL_CONFIRMING:异常确认中
   * VERIFIED:已核实
   */
  billStatus?: string;
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
  /**
   * 统计集合
   */
  statisticsVos?: IFinanceBillBillDetailByBillIdResStatisticsVosItem[];
  /**
   * 辅料开发占比
   */
  percentage?: string;
  /**
   * 辅料补贴金额
   */
  subsidyAmount?: string;
}

export interface IFinanceBillBillDetailByBillIdResStatisticsVosItem {
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

/** 子帐单统计详细 ⬆️ */

/**
 * 面料剪版列表分页 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/3802
 */
export interface IFinanceBillFabricCuttingPageReq {
  pageNum?: number;
  pageSize?: number;

  /**
   * 账单ID
   */
  billId?: string;
  /**
   * 采购需求单号
   */
  purchaseOrderNo?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * spu编码
   */
  spuCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 业务渠道 zj:1 、jv:2
   */
  bizChannel?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 剪版单号
   */
  cuttingOrderCode?: string;
  /**
   * 剪版方式：1-需要剪版 2-使用现货 3-无需剪版 4-数码印花 5-客户供料 6-自有余料 7-物料仓
   */
  cuttingWay?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}

export interface IFinanceBillFabricCuttingPageRes {
  pageNum?: number;
  total?: number;
  list: IFinanceBillFabricCuttingPageResListItem[];
}

export interface IFinanceBillFabricCuttingPageResListItem {
  /**
   * 明细ID
   */
  detailId: string;
  /**
   * 账单ID
   */
  billId?: string;
  /**
   * 采购需求单号
   */
  purchaseOrderNo?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * spu编码
   */
  spuCode?: string;
  /**
   * 客户款号
   */
  customerItemNo?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 业务渠道 zj:1 、jv:2
   */
  bizChannel?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 剪版单号
   */
  cuttingOrderCode?: string;
  /**
   * 剪版方式：1-需要剪版 2-使用现货 3-无需剪版 4-数码印花 5-客户供料 6-自有余料 7-物料仓
   */
  cuttingWay?: string;
  /**
   * 物料名称
   */
  materialsName?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * 尺寸
   */
  size?: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * 需求数量
   */
  demandQuantity?: string;
  /**
   * 实际采购数量
   */
  actualQuantity?: string;
  /**
   * 散剪价
   */
  scatteredCuttingAmount?: string;
  /**
   * 采购金额
   */
  purchaserAmount?: string;
  /**
   * 差异金额
   */
  diffAmount?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: number;
  /**
   * 异常原因
   */
  abnormalReason?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: number;
  /**
   * 任务状态
   */
  orderStatus?: string;
}

/** 面料剪版列表分页 ⬆️ */

/**
 * 数码描稿列表分页 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/3806
 */
export interface IFinanceBillDigitalCuttingPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 账单ID
   */
  billId?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * spu编码
   */
  spuCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 数码描稿单号
   */
  orderCode?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}

export interface IFinanceBillDigitalCuttingPageRes {
  pageNum?: number;
  total?: number;
  list: IFinanceBillDigitalCuttingPageResListItem[];
}

export interface IFinanceBillDigitalCuttingPageResListItem {
  /**
   * 明细ID
   */
  detailId: string;
  /**
   * 账单ID
   */
  billId?: string;
  /**
   * 数码描稿单号
   */
  orderCode?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * 任务状态
   */
  orderStatus?: string;
  /**
   * 描稿类型
   */
  orderType?: string;
  orderTypeName?: string;
  /**
   * 描稿版次
   */
  orderBatch?: string;
  /**
   * 花型编号
   */
  patternNumber?: string;
  /**
   * 设计师
   */
  designer?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 供应商 id
   */
  supplierId?: string;
  /**
   * 供应商编码
   */
  supplierCode?: string;
  /**
   * 供应商名称
   */
  supplierName?: string;
  /**
   * 客户款号
   */
  customerItemNo?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 业务渠道 zj:1 、jv:2
   */
  bizChannel?: string;
  /**
   * 结算费用
   */
  settlementPrice?: string;
  /**
   * 差异金额
   */
  diffAmount?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: number;
  /**
   * 异常原因
   */
  abnormalReason?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: number;
}

/** 数码描稿列表分页 ⬆️ */

/**
 * 3D剪版账单分页 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/3810
 */
export interface IFinanceBillThreeDCuttingPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * spuCode
   */
  spuCode?: string;
  commodityCode?: string;
  /**
   * 账单ID
   */
  billId?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 3D任务编号
   */
  orderCode?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}

export interface IFinanceBillThreeDCuttingPageRes {
  pageNum?: number;
  total?: number;
  list: IFinanceBillThreeDCuttingPageResListItem[];
}

export interface IFinanceBillThreeDCuttingPageResListItem {
  detailId: string;
  /**
   * 账单ID
   */
  billId?: string;
  /**
   * 采购需求单号
   */
  purchaseOrderNo?: string;
  /**
   * 3D任务编号
   */
  orderCode?: string;
  /**
   * 订单状态
   */
  orderStatus?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * 商品编号（SPU）
   */
  commodityCode?: string;
  /**
   * 客户款号
   */
  customerItemNo?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 剪版单号
   */
  cuttingOrderCode?: string;
  /**
   * 物料名称
   */
  materialsName?: string;
  /**
   * 色号
   */
  colorNumber?: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * 业务渠道 zj:1 、jv:2
   */
  bizChannel?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 需求数量
   */
  demandQuantity?: string;
  /**
   * 实际采购数量
   */
  actualQuantity?: string;
  /**
   * 散剪价
   */
  scatteredCuttingAmount?: string;
  /**
   * 采购金额
   */
  purchaserAmount?: string;
  /**
   * 差异金额
   */
  diffAmount?: string;
  /**
   * 完成时间
   */
  finishTime?: number;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: number;
  /**
   * 异常原因
   */
  abnormalReason?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: number;
}

/** 3D剪版账单分页 ⬆️ */

/**
 * 辅料账单分页 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/3814
 */
export interface IFinanceBillAccessoriesPageReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * spu编码
   */
  spuCode?: string;
  /**
   * 账单ID
   */
  billId?: string;
  /**
   * 采购需求单号
   */
  purchaseOrderNo?: string;
  /**
   * 配版单号
   */
  orderCode?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}

export interface IFinanceBillAccessoriesPageRes {
  pageNum?: number;
  total?: number;
  list: IFinanceBillAccessoriesPageResListItem[];
}

export interface IFinanceBillAccessoriesPageResListItem {
  detailId: string;
  /**
   * 父账单ID
   */
  billId?: string;
  /**
   * 采购需求单号
   */
  purchaseOrderNo?: string;
  /**
   * 配版单号
   */
  orderCode?: string;
  /**
   * 配版类型 0-普通样衣;1-大货样衣;2-小单动销
   */
  orderType?: string;
  /**
   * 齐套单号
   */
  materialOrderCode?: string;
  /**
   * 配板类型
   */
  matchPlateModeName?: string;
  /**
   * 齐套单状态 MatchPlateStateEnum（不确定）
   */
  materialOrderStatus?: string;
  /**
   * spuCode
   */
  spuCode?: string;
  /**
   * 辅料配版单上的skcCode
   */
  skcCode?: string;
  /**
   * 颜色
   */
  color?: string;
  /**
   * sku色号（人工录入）
   */
  colorNumber?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编号
   */
  designerCode?: string;
  /**
   * 辅料类目
   */
  commodityCategory?: string;
  /**
   * 需求数量
   */
  matchPlateNum?: string;
  /**
   * 单位
   */
  matchPlateUnit?: string;
  /**
   * 单价
   */
  salePrice?: string;
  /**
   * 采购金额
   */
  purchasePrice?: string;
  /**
   * 补贴金额
   */
  allowanceAmount?: string;
  /**
   * 实际采购金额
   */
  actualPurchasePrice?: string;
  /**
   * 差异金额
   */
  diffAmount?: string;
  /**
   * 齐套单完成时间
   */
  materialOrderFinishTime?: number;
  /**
   * 订单完成时间
   */
  accessoriesOrderFinishTime?: number;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: number;
  /**
   * 异常原因
   */
  abnormalReason?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: number;
}

/** 辅料账单分页 ⬆️ */

/**
 * 核实账单 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4126
 */
export interface IFinanceBillSubmitVerifyBillReq {
  /**
   * 总账单id
   */
  totalBillId: string;
  /**
   * 子账单ID
   */
  billId: string;
  /**
   * 账单类型
   * FABRIC_CUTTING_ORDER:面料剪版
   * THREE_DIMENSIONAL_CUTTING_ORDER:3D剪版
   * ACCESSORIES_ORDER:辅料开发
   * DIGITAL_SKETCH_ORDER:数码描稿
   */
  billType: string;
  /**
   * 异常数据--》 明细id和异常原因
   */
  abnormalBill?: IFinanceBillSubmitVerifyBillReqAbnormalBill;
}

export interface IFinanceBillSubmitVerifyBillReqAbnormalBill {
  [key: string]: string;
}

// 核实账单 ⬆️

/**
 * 保存账单 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4130
 */
export interface IFinanceBillSaveVerifyBillReq {
  /**
   * 总账单id
   */
  totalBillId: string;
  /**
   * 子账单ID
   */
  billId: string;
  /**
   * 账单类型
   * FABRIC_CUTTING_ORDER:面料剪版
   * THREE_DIMENSIONAL_CUTTING_ORDER:3D剪版
   * ACCESSORIES_ORDER:辅料开发
   * DIGITAL_SKETCH_ORDER:数码描稿
   */
  billType: string;
  /**
   * 异常数据--》 明细id和异常原因
   */
  abnormalBill?: IFinanceBillSaveVerifyBillReqAbnormalBill;
}

export interface IFinanceBillSaveVerifyBillReqAbnormalBill {
  [key: string]: string;
}

// 保存账单 ⬆️

/**
 * 统计状态
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4146
 */

export interface IFinanceTotalBillReconciledStatusSummaryRes {
  pendingCount?: string;
  reconciledCount?: string;
  totalCount?: string;
}

/**
 * 核实账单 （总账单）⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4142
 */
export interface IFinanceTotalBillVerifyBillReq {
  totalBillId: string;
}

/**
 * 总账单详情 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4842
 */
export interface IWebFinanceTotalBillReq {
  totalBillId: string;
}

export interface IWebFinanceTotalBillRes {
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
  reconciledStatus?: YES_NO_NUMBER_ENUM;
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
  platformBillMap?: IWebFinanceTotalBillResPlatformBillMap;
  /**
   * 类型账单汇总
   */
  billTypeStatisticsVos?: IWebFinanceTotalBillResBillTypeStatisticsVosItem[];
  /**
   * 补贴费用列表
   */
  billSubsidyList?: IWebFinanceTotalBillResBillSubsidyListItem[];
}

export interface IWebFinanceTotalBillResBillSubsidyListItem {
  /**
   * 补贴费用字典code（配置在ops）
   */
  subsidyCode?: string;
  /**
   * 补贴费用字典名（配置在ops）
   */
  subsidyName?: string;
  /**
   * 费用金额
   */
  subsidyAmount?: string;
}

export interface IWebFinanceTotalBillResPlatformBillMap {
  key: IWebFinanceTotalBillResPlatformBillMapKeyItem[];
}

export interface IWebFinanceTotalBillResPlatformBillMapKeyItem {
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

export interface IWebFinanceTotalBillResBillTypeStatisticsVosItem {
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
  isSum?: boolean;
  /**
   * 账单ID
   */
  billId?: string;
}

// 总账单详情 ⬆️

/**
 * 确认账单 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4846
 */
export interface IFinanceTotalBillConfirmBillReq {
  totalBillId: string;
}

// 确认账单 ⬆️

/**
 * 日志查询 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/4870
 */
export interface IFinroyalLogPageReq {
  /**
   * 业务类型  1.对账单
   */
  bizType: string;
  bizId: string;
}

export type IFinroyalLogPageRes = IFinroyalLogPageResItem[];
export interface IFinroyalLogPageResItem {
  logId?: string;
  bizId?: string;
  bizType?: string;
  content?: string;
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
}

// 日志查询 ⬆️

/**
 * 总账单导出
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/5086
 */
export interface IFinanceTotalBillExportReq {
  totalBillId: string;
}

/**
 * 面料剪版明细导出 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/5066
 */
export interface IFinanceBillFabricCuttingExportReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 账单ID
   */
  billId: string;
  /**
   * 采购需求单号
   */
  purchaseOrderNo?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * spu编码
   */
  spuCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 业务渠道 zj:1 、jv:2
   */
  bizChannel?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 剪版单号
   */
  cuttingOrderCode?: string;
  /**
   * 剪版方式：1-需要剪版 2-使用现货 3-无需剪版 4-数码印花 5-客户供料 6-自有余料 7-物料仓
   */
  cuttingWay?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}

// 面料剪版明细导出 ⬆️

/**
 * 数码描稿明细导出 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/5070
 */
export interface IFinanceBillDigitalCuttingExportReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 账单ID
   */
  billId: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * spu编码
   */
  spuCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 数码描稿单号
   */
  orderCode?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}

// 数码描稿明细导出 ⬆️

/**
 * 3D剪版明细导出 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/5074
 */
export interface IFinanceBillThreeDCuttingExportReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 账单ID
   */
  billId: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 3D任务编号
   */
  orderCode?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}

// 3D剪版明细导出 ⬆️

/**
 * 辅料账单明细导出 ⬇️
 * yapi地址：https://yapi.tiangong.site/project/66/interface/api/5078
 */
export interface IFinanceBillAccessoriesExportReq {
  pageNum?: number;
  pageSize?: number;
  /**
   * 账单ID
   */
  billId: string;
  /**
   * 采购需求单号
   */
  purchaseOrderNo?: string;
  /**
   * 配版单号
   */
  orderCode?: string;
  /**
   * 配版类型 0-普通样衣;1-大货样衣;2-小单动销
   */
  orderType?: string;
  /**
   * skc编码
   */
  skcCode?: string;
  /**
   * spuCode
   */
  spuCode?: string;
  /**
   * 平台
   */
  platform?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 设计师编码
   */
  designerCode?: string;
  /**
   * 是否异常：0 否 1 是
   */
  abnormalFlag?: string;
  /**
   * 异常是否已处理：0 否 1 是
   */
  handleAbnormal?: string;
  /**
   * 是否按照差异金额排序：1降序 2 升序
   */
  diffAmountOrderBy?: string;
}
// 辅料账单明细导出 ⬆️

export interface SortInfo {
  column: Record<string, unknown>;
  // ascending:升序,descending:降序
  order: 'ascending' | 'descending' | '';
  prop: string;
  [propsName: string]: any;
}
