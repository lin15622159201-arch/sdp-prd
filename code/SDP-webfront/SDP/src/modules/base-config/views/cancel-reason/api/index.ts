import http from '@/core/http';
import type {
  ICancelReasonPageReq,
  ICancelReasonPageRes,
  ICancelReasonChangeStatusReq,
  ICancelReasonAddReq,
  ICancelReasonUpdateReq,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';
/**
 * 取消原因，查询列表（分页）
 * @see https://yapi.ibaibu.com/project/1302/interface/api/127918
 *
 * @请求方法: POST
 * @请求地址: /clothing-material/web/v1/cancel/reason/page
 */
export const getCancelReason = (data: ICancelReasonPageReq) => {
  // return Promise.resolve(Mock.data as any);
  const url = '/sdp-clothing-material/web/v1/cancel/reason/page';
  return http.post<ICancelReasonPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};
/**
 * 取消原因，启用/停用
 * @see https://yapi.ibaibu.com/project/1302/interface/api/127916
 *
 * @请求方法: PUT
 * @请求地址: /clothing-material/web/v1/cancel/reason/change-status
 */
export const changeCancelStatus = (data: ICancelReasonChangeStatusReq) => {
  const url = '/sdp-clothing-material/web/v1/cancel/reason/change-status';
  return http.put({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
/**
 * 取消原因，修改
 * @see https://yapi.ibaibu.com/project/1302/interface/api/127914
 *
 * @请求方法: POST
 * @请求地址: /clothing-material/web/v1/cancel/reason/update
 */
export const updateCancelReason = (data: ICancelReasonUpdateReq) => {
  const url = '/sdp-clothing-material/web/v1/cancel/reason/update';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
/**
 * 取消原因，新建
 * @see https://yapi.ibaibu.com/project/1302/interface/api/127912
 *
 * @请求方法: POST
 * @请求地址: /clothing-material/web/v1/cancel/reason/save
 */
export const addCancelReason = (data: ICancelReasonAddReq) => {
  const url = '/sdp-clothing-material/web/v1/cancel/reason/save';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
