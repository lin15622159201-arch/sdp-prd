import { PAY_COST_RULE, RECEIVE_COST_RULE, REPAIR_CHARGE_AFFECT } from '@/modules/base-config/constant';

/**
 * 返修责任方-列表
 */
export interface IReworkResponsibilityPageReq {
  dutyId?: string;
  /**
   * 编码
   */
  code?: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty?: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  status?: string;
  /**
   * 创建日期开始。如2021-08-05 00:00:00
   */
  createTimeStart?: string;
  /**
   * 创建日期结束。如2021-08-05 23:59:59
   */
  createTimeEnd?: string;
  createdTime?: string[];
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
 * 响应数据
 */

export interface IReworkResponsibilityPageListItem {
  dutyId: string;
  /**
   * 编码
   */
  code?: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty: string;
  /**
   * 计费规则（1-计费，0-不计费）
   */
  payCostRule: PAY_COST_RULE;
  /**
   * 收费规则（1-计费，0-不计费）
   */
  receiveCostRule: RECEIVE_COST_RULE;
  /**
   * 返修计费影响（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairChargingAffects: REPAIR_CHARGE_AFFECT[];
  /**
   * 返修类型（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairTypes: REPAIR_CHARGE_AFFECT[];
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  /**
   * 更新人name
   */
  reviserName?: string;
}

export interface IReworkResponsibilityPageRes {
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
  list: IReworkResponsibilityPageListItem[];
}

/**
 * 返修责任方-详情
 */
export interface IV1ReworkResponsibilityRes {
  dutyId: string;
  /**
   * 编码
   */
  code: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty: string;
  /**
   * 计费规则（1-计费，0-不计费）
   */
  payCostRule: PAY_COST_RULE;
  /**
   * 收费规则（1-计费，0-不计费）
   */
  receiveCostRule: RECEIVE_COST_RULE;
  /**
   * 返修计费影响（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairChargingAffect: REPAIR_CHARGE_AFFECT;
  /**
   * 返修类型（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairTypes: REPAIR_CHARGE_AFFECT[];
  /**
   * 状态（1-启用，0-停用）
   */
  state: string;
  /**
   * 更新人name
   */
  reviserName: string;
}

/**
 * 返修责任方-新建
 */
export interface IReworkResponsibilitySaveReq {
  dutyId?: string;
  /**
   * 编码
   */
  code?: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty?: string;
  /**
   * 计费规则（1-计费，0-不计费）
   */
  payCostRule?: PAY_COST_RULE;
  /**
   * 收费规则（1-计费，0-不计费）
   */
  receiveCostRule?: RECEIVE_COST_RULE;
  /**
   * 返修计费影响 （1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairChargingAffects?: REPAIR_CHARGE_AFFECT[];
  /**
   * 返修类型（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairTypes?: REPAIR_CHARGE_AFFECT[] ;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  /**
   * 更新人name
   */
  reviserName?: string;
}

/**
 * 返修责任方-修改
 */
export interface IReworkResponsibilityUpdateReq {
  dutyId?: string;
  /**
   * 编码
   */
  code?: string;
  /**
   * 返修/复版责任方
   */
  reworkingDuty?: string;
  /**
   * 计费规则（1-计费，0-不计费）
   */
  payCostRule?: PAY_COST_RULE;
  /**
   * 收费规则（1-计费，0-不计费）
   */
  receiveCostRule?: RECEIVE_COST_RULE;
  /**
   * 返修计费影响 （1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairChargingAffects?: REPAIR_CHARGE_AFFECT[];
  /**
   * 返修类型（1-仅纸样，2-仅车版，3-纸样+车版）
   */
  repairTypes?: REPAIR_CHARGE_AFFECT[] ;
  /**
   * 状态（1-启用，0-停用）
   */
  state?: string;
  /**
   * 更新人name
   */
  reviserName?: string;
}

/**
 * 启用
 */
export type IReworkResponsibilityEnableReq = number[];

/**
 * 禁用
 */
export type IReworkResponsibilityDisEnableReq = number[];
