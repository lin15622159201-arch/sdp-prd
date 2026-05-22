import http from '@/core/http';
import type * as Types from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 异常管理列表
 */
export const postExceptionPageApi = (data: Types.IExceptionPageReq) => {
  return http.post<Types.IExceptionPageRes>({
    url: '/sdp-sample-clothes/web/v1/exception/page',
    data,
  });
};

/**
 * 异常管理--按状态统计
 */
export const postExceptionStateCountApi = (data: Types.IExceptionStateCountReq) => {
  return http.post<Types.IExceptionStateCountRes>({
    url: '/sdp-sample-clothes/web/v1/exception/stateCount',
    data,
  });
};

/**
 * 异常管理-待处理-驳回
 * @see https://yapi.tiangong.site/project/38/interface/api/3165
 */
export const postExceptionRejectApi = (data: Types.IExceptionRejectReq) => {
  return http.post<Types.IExceptionRejectRes>({
    url: '/sdp-sample-clothes/web/v1/exception/apply-reject',
    data,
    loading: true,
  });
};

/**
 * 异常管理-待处理-开始处理
 */
export const postExceptionHandleApi = (data: Types.IExceptionHandleReq) => {
  return http.post<Types.IExceptionHandleRes>({
    url: '/sdp-sample-clothes/web/v1/exception/handle',
    data,
    loading: true,
  });
};

/**
 * 异常管理-处理中-申请结案
 */
export const putExceptionHandleApi = (data: Types.IApplyCloseReq) => {
  return http.post<Types.IApplyCloseRes>({
    url: '/sdp-sample-clothes/web/v1/exception/apply-finish',
    server: SYSTEM_ENUM.OLA_API,
    data,
    loading: true,
  });
};

/**
 * 异常管理-驳回待审核-同意驳回
 */
export const putExceptionRejectApi = (data: Types.IAgreeOverruleReq) => {
  return http.post<Types.IAgreeOverruleRes>({
    url: '/sdp-sample-clothes/web/v1/exception/confirm-reject',
    data,
    loading: true,
  });
};

/**
 * 异常管理-驳回待审核-拒绝驳回
 *  @see https://yapi.tiangong.site/project/38/interface/api/3167
 */
export const patchExceptionRejectApi = (data: Types.IRejectOverruleReq) => {
  return http.post<Types.IRejectOverruleRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/exception/rollback-reject',
    data,
    loading: true,
  });
};

/**
 * 异常管理-结案待审核-同意结案
 */
export const patchExceptionHandleApi = (data: Types.IAgreeCloseReq) => {
  return http.post<Types.IAgreeCloseRes>({
    url: '/sdp-sample-clothes/web/v1/exception/confirm-finish',
    data,
    loading: true,
  });
};

/**
 * 异常管理-结案待审核-拒绝结案
 * @see https://yapi.tiangong.site/project/38/interface/api/3164
 */
export const deleteExceptionHandleApi = (data: Types.IRejectCloseReq) => {
  return http.post<Types.IRejectCloseRes>({
    url: '/sdp-sample-clothes/web/v1/exception/rollback-finish',
    data,
    loading: true,
  });
};

/**
 * 异常处理-阶段枚举
 * @returns
 */
export const getExceptionStep = () => {
  return http.get<Types.IExceptionExceptionStepRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/exception/exception-step',
  });
};

/**
 * 查询环节节点状态字典
 * @see https://yapi.tiangong.site/project/38/interface/api/2889
 */
export const stepNodeStateDict = () => {
  const url = '/sdp-sample-clothes/web/v1/design-common/step-node-state/dict';
  return http.post<Types.IStepNodeStateDictItem[]>({
    url,
  });
};

/**
 * 添加备注
 */

export const postRemarkAddApi = (data: Types.IRemarkAddReq) => {
  return http.post<Types.IRemarkAddRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/remark/add',
    data,
    loading: true,
  });
};

/**
 * 批量查询备注
 */
export const postRemarkBatchApi = (data: Types.IBatchListReq) => {
  return http.post<Record<string, Types.IBatchList0Item> & any>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/remark/batch/list',
    data,
    noCancelDuplicate: true,
  });
};

/**
 * 【操作日志】查询列表（非分页接口）- 日志详情
 */

export const postExceptionLogApi = (data: Types.ILogListReq) => {
  return http.post<Types.ILogListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-sample-clothes/web/v1/log/list',
    data,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 批量查询备注(大货资料)
 * @see yapi地址：https://yapi.tiangong.site/project/48/interface/api/3101
 */
export const bigBatchListApi = (params: Types.IBigBatchListReq) => {
  const url = '/sdp-order-info/web/v1/orderInfoRemark/batch/list';
  return http.post<Types.IBigBatchListRes>({
    url,
    data: params,
    loading: true,
    noCancelDuplicate: true,
  });
};
