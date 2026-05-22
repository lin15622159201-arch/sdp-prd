import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

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

/**
 * 业务id日志查询
 * 调用页面: 灵感任务, 数码印花款, 采购齐套管理, 采购申请管理
 */
export const postDesignLogBizListApi = (data: Types.IBizListReq) => {
  return http.post<Types.IBizListRes>({
    url: '/sdp-design/web/v1/design/log/biz/list',
    data,
    loading: true,
  });
};


/**
 * 业务id日志查询
 * 调用页面: 开款任务
 */
export const postDesignLogBizToTypeListApi = (data: Types.DevelopStyleRemarkReq) => {
  return http.post<Types.DevelopStyleRemarkRes>({
    url: '/sdp-curation/web/v1/develop-style/list-opt',
    data,
    loading: true,
  });
};
