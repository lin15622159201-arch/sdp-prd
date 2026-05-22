import http from '@/core/http';
import type * as Types from './types';
/**
 * Bom列表
 */
export const postWebV1BomPageApi = (data: Types.PostWebV1BomPageApiReq) => {
  return http.post<Types.PostWebV1BomPageApiRes>({
    url: '/sdp-design/web/v1/bom/page',
    data,
    loading: true,
  });
};

/**
 * bom详情
 */
export const getWebV1BomDetailApi = (data: Types.GetWebV1BomDetailApiReq) => {
  return http.post<Types.GetWebV1BomDetailApiRes>({
    url: '/sdp-design/web/v1/bom/web-detail',
    data,
    loading: true,
  });
};

/**
 * bom状态数量统计
 * @请求方法: GET
 */
export const getWebV1BomStateStatisticsApi = (params: Types.GetWebV1BomStateStatisticsApiReq) => {
  return http.get<Types.GetWebV1BomStateStatisticsApiRes>({
    url: '/sdp-design/web/v1/bom/state-statistics',
    params,
    loading: true,
  });
};
/**
 * 批量bom打印
 */
export const getWebV1BatchBomPrintApi = (data: Types.IBomBatchPrintReq) => {
  return http.post<Types.IBomBatchPrintRes>({
    url: '/sdp-design/web/v1/bom/batch-print',
    data,
    loading: true,
  });
};

/**
 * 工艺需求匹配信息
 */

export const craftMatch = (params: Types.ICraftMatchReq) => {
  const url = '/sdp-design/web/v1/bom/craft/match';
  return http.get<Types.ICraftMatchRes>({
    url,
    params,
    loading: true,
  });
};

/**
 * 【设计打版操作日志】查询列表（非分页接口）
 * @请求方法: POST
 */

export const postDesignLogListApi = (data: Types.ILogListReq) => {
  return http.post<Types.ILogListRes>({
    url: '/sdp-design/web/v1/design/log/list',
    data,
    loading: true,
  });
};

/* 备注信息 */

/* 【设计打版备注信息】新建 */
export const remarksSave = (data: Types.IRemarksSaveReq) => {
  return http.post<Types.IRemarksSaveRes>({
    url: '/sdp-design/web/v1/design/remarks/save',
    data,
    loading: true,
  });
};
