import http from '@/core/http';
import * as ITypes from './types';

/**
 * 查询灵感设计任务列表
 */
export const getTaskList = (data: ITypes.IGetTaskListReq) => {
  return http.post<ITypes.IGetTaskListRes>({
    url: '/sdp-design/web/v1/design-demand/page',
    data,
    loading: true,
  });
};
/**
 * 查询灵感设计任务详情
 */
export const getTaskInfo = (data: ITypes.IGetTaskInfoReq) => {
  return http.get<ITypes.IGetTaskInfoRes>({
    url: `/sdp-design/web/v1/design-demand/detail/${data.designDemandId}`,
    loading: true,
  });
};
/**
 * 查询推荐面料
 */
export const getSuggestFabric = (data: ITypes.IGetSuggestFabricReq) => {
  return http.get<ITypes.IGetSuggestFabricRes>({
    url: `/sdp-design/web/v1/design-demand/suggest-material/${data.designDemandId}`,
    loading: true,
  });
};

/**
 * 开款
 */
export const createSpu = (data: ITypes.ICreateSpuReq) => {
  return http.post({
    url: '/sdp-design/web/v1/design-demand/create-spu',
    loading: true,
    data
  });
};

/**
 * 淘汰灵感
 */
export const passInspiration = (data: ITypes.IPassInspirationReq) => {
  return http.post({
    url: '/sdp-design/web/v1/design-demand/no-pass',
    loading: true,
    data
  });
};

/**
 * 任务分配/变更
 */
export const dispatchTask = (data: ITypes.IDispatchTaskReq) => {
  return http.post({
    url: '/sdp-design/web/v1/design-demand/allocate',
    data,
    loading: true,
  });
};
/**
 * 任务分配/变更
 */
export const reDispatchTask = (data: ITypes.IReDispatchTaskReq) => {
  return http.post({
    url: '/sdp-design/web/v1/design-demand/re-allocate',
    data,
    loading: true,
  });
};
