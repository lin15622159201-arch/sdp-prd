import http from '@/core/http';
import * as Types from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 内部返修状态数量统计
 */
export const getRepairCountApi = (params: Types.IRepairCountReq) => {
  return http.get<Types.IRepairCountRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/count',
    params,
  });
};

/**
 * 查询全部返修列表（分页）
 */
export const postRepairAllPageApi = (data: Types.IRepairCountReq) => {
  return http.post<Types.IAllPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/all/page',
    data,
  });
};

/**
 * 该skc存在未完成的纸样返修单，请先完成纸样返修单
 * @see https://yapi.ibaibu.com/project/1650/interface/api/166681
 *
 * @请求方法: GET
 * @请求地址: /plm-sample-clothes/web/v1/repair/exist-pattern-unfinished/{clothesId}/{repairId}
 * @更新时间: 2022-06-20 15:42:12
 */
export const checkPossibleAllot = ({ clothesId, repairId }: Types.IRepairExistPatternUnfinishedReq) => {
  return http.get<Types.IRepairExistPatternUnfinishedRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-sample-clothes/web/v1/repair/exist-pattern-unfinished/${clothesId}/${repairId}`,
    loading: true,
  });
};

/**
 * 样衣返修-返修分单
 * 开始分单
 */
export const putRepairAssignApi = (data: Types.IRepairAssignReq) => {
  return http.put<Types.IRepairAssignRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/assign',
    data,
    loading: true,
  });
};

/**
 * 样衣返修-返修分单
 * 撤回分单
 */
export const putRepairRecallApi = (data: Types.IRepairRecallReq) => {
  return http.put<Types.IRepairRecallRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/recall',
    data,
    loading: true,
  });
};

/**
 * 发起异常
 * */
export const postWebV1AnomalySaveApi = (data: Types.PostWebV1AnomalySaveApiReq) => {
  return http.post<Types.PostWebV1AnomalySaveApiRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/exception',
    data,
    loading: true,
  });
};
/**
 * 查询内部返修列表（分页）
 */
export const postRepairInnerPageApi = (data: Types.IInnerPageReq) => {
  return http.post<Types.IInnerPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/inner/page',
    data,
    cancelDuplicateUrl: true,
  });
};

/**
 * 样衣返修-内部返修
 * 开始返修
 */
export const putRepairStartApi = (data: Types.IRepairStartReq) => {
  return http.put<Types.IRepairStartRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/start',
    data,
    loading: true,
  });
};

/**
 * 样衣返修-内部返修
 * 排单变更
 */
export const putRepairChangeApi = (data: Types.IRepairChangeReq) => {
  return http.put<Types.IRepairChangeRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/change',
    data,
    loading: true,
  });
};

/**
 * 样衣返修-内部返修
 * 返修完成
 */
export const putRepairFinishApi = (data: Types.IRepairFinishReq) => {
  return http.put<Types.IRepairFinishRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/finish',
    data,
    loading: true,
  });
};

/**
 * 确认收货
 */
export const putRepairReceiptApi = (data: Types.IRepairReceiptReq) => {
  return http.put<Types.IRepairReceiptRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/receipt',
    data,
    loading: true,
  });
};

/**
 * 查询外部返修列表（分页）
 */
export const postRepairOuterPageApi = (data: Types.IExternalPageReq) => {
  return http.post<Types.IExternalPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/external/page',
    data,
    cancelDuplicateUrl: true,
  });
};

/**
 * 确认实际耗时
 */
export const putRepairConfirmCostTimeApi = (data: Types.ICostTimeReq) => {
  return http.put({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/repair/confirm/cost/time',
    data,
  });
};
