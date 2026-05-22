import http from '@/core/http';
import type * as Types from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 *返修责任方-查询列表（分页）
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1302/interface/api/107772
*/
export const getReworkResponsibilityPage = (data: Types.IReworkResponsibilityPageReq) => {
  const url = '/sdp-clothing-material/web/v1/reworkResponsibility/page';
  return http.post<Types.IReworkResponsibilityPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

/**
 *返修责任方-详情
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1302/interface/api/107774
*/
export const getReworkResponsibilityDetail = (id: string) => {
  const url = `/sdp-clothing-material/web/v1/reworkResponsibility/${id}`;
  return http.get<Types.IV1ReworkResponsibilityRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params: {},
  });
};

/**
 *返修责任方-新建
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1302/interface/api/107776
*/
export const saveReworkResponsibility = (data: Types.IReworkResponsibilitySaveReq) => {
  const url = '/sdp-clothing-material/web/v1/reworkResponsibility/save';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

/**
 *返修责任方-修改
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1302/interface/api/107778
*/
export const updateReworkResponsibility = (data: Types.IReworkResponsibilityUpdateReq) => {
  const url = '/sdp-clothing-material/web/v1/reworkResponsibility/update';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

/**
 *返修责任方-启用
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1302/interface/api/107786
*/
export const enableResponsibility = (data: Types.IReworkResponsibilityEnableReq) => {
  const url = '/sdp-clothing-material/web/v1/reworkResponsibility/enable';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

/**
 *返修责任方-禁用
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1302/interface/api/107786
*/
export const disableResponsibility = (data: Types.IReworkResponsibilityDisEnableReq) => {
  const url = '/sdp-clothing-material/web/v1/reworkResponsibility/dis-enable';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
