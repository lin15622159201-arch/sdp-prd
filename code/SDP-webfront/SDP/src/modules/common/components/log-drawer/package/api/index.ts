import http from '@/core/http';
import * as Types from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

// 操作日志查询 - 需求任务日志查询
export const getDemandTaskLogs = (params: Types.IDemandEventLogListReq) => {
  return http.get<Types.IDemandEventLogListItem[]>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-demand/web/v1/demand-event-log/list',
    params,
  });
};

// 操作日志查询 - 生产资料日志查询
export const getStyleLogs = (params: Types.IStyleInfoLogsReq) => {
  return http.get<Types.IStyleInfoLogsItem[]>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-demand/web/v1/style-info/logs',
    params,
  });
};

/**
 * 操作日志查询 -推款- 生产资料日志查询
 * @see https://yapi.ibaibu.com/project/2712/interface/api/206473
 */
export const getStyleLogsForTuikuan = (params: Types.IStyleInfoLogsForTuikuanReq) => {
  return http.get<Types.IStyleInfoLogsForTuikuanItem[]>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-order-info/web/v1/orderInfoLog/prod-logs',
    params,
  });
};

/**
 * 获取标签日志
 * @param data
 * @returns
 */
export const getTagLogs = (data: Types.IGetTagLogs) => {
  const url = '/sdp-clothing-material/operation-log/list';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

/**
 * 通过id查询日志记录
 * @see https://yapi.ibaibu.com/project/1560/interface/api/93578
 *
 * @请求方法: GET
 */
export const getBuzLog = (billId: string) => {
  return http.get<Types.IBillGetPaymentLogFromBillRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-fee/web/v1/bill/get_payment_log_from_bill/${billId}`,
    loading: true,
  });
};
