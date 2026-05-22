import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 发起异常
 * @see https://yapi.ibaibu.com/project/1650/interface/api/92444
 *
 * @请求方法: POST
 * @更新时间: 2021-09-10 11:54:34
 */
export const postWebV1AnomalySaveApi = (data: Types.PostWebV1AnomalySaveApiReq) => {
  return http.post<Types.PostWebV1AnomalySaveApiRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/exception',
    data,
    loading: true,
  });
};

/* 异常责任部门-查询分页 */
export const getResponsibleDepartment = (params: Types.IResponsibleDepartmentPageReq) => {
  return http.get<Types.IResponsibleDepartmentPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/web/v1/responsible-department/page',
    params,
    noCancelDuplicate: true,
    // loading: true,
  });
};
