import http from '@/core/http';
import * as ITypes from './types';

/**
 * 查询开款任务列表
 */
export const getTaskList = (data: ITypes.DevelopStylePageReq) => {
  return http.post<ITypes.DevelopStylePageRes>({
    url: '/sdp-curation/web/v1/develop-style/page',
    data,
    loading: true,
  });
};

/**
 * 创建任务
 *
 * @params {Types.DevelopStyleBatchCreateReq} data 创建任务参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103381
 * @return {*}
 */
export const developStyleBatchCreateApi = (data: ITypes.DevelopStyleBatchCreateReq) => {
  const url = '/sdp-curation/web/v1/develop-style/batch-create';

  return http.post<ITypes.DevelopStyleBatchCreateRes>({
    url,
    data,
    loading: true,
  });
};


/**
 * 导入Excel
 */
export const importExcelImportExcel = (data: FormData) => {
  return http.post({
    url: '/sdp-curation/web/v1/develop-style/import-excel',
    data,
    loading: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};

/**
 * 审核任务
 *
 * @params {Types.DevelopStyleBatchCheckReq} data 审核任务参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103387
 * @return {*}
 */
export const developStyleBatchCheckApi = (data: ITypes.DevelopStyleBatchCheckReq) => {
  const url = '/sdp-curation/web/v1/develop-style/batch-check';

  return http.put<ITypes.DevelopStyleBatchCheckRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 批量删除
 *
 * @params {Types.DevelopStyleBatchCreateReq} data 创建任务参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103381
 * @return {*}
 */
export const developStyleBatchDeletedApi = (data: string[]) => {
  const url = '/sdp-curation/web/v1/develop-style/deleted/batch';

  return http.post({
    url,
    data,
    loading: true,
  });
};

/**
 * 批量识别
 *
 * @params {Types.DevelopStyleBatchCreateReq} data 创建任务参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103381
 * @return {*}
 */
export const developStyleBatchbatchIdentifyApi = (data: string[]) => {
  const url = '/sdp-curation/web/v1/develop-style/batch-identify';

  return http.post({
    url,
    data,
    loading: true,
  });
};

/**
 * 查询任务总数
 *
 * @params {Types.DevelopStyleStateTotalReq} data 查询任务总数参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103447
 * @return {*}
 */
export const developStyleStateTotalApi = (data: ITypes.DevelopStyleStateTotalReq) => {
  const url = '/sdp-curation/web/v1/develop-style/state-total';

  return http.post<ITypes.DevelopStyleStateTotalRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 开款
 *
 * @params {Types.DevelopStyleBatchDevelopReq} data 开款参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103432
 * @return {*}
 */
export const developStyleBatchDevelopApi = (data: ITypes.DevelopStyleBatchDevelopReq) => {
  const url = '/sdp-curation/web/v1/develop-style/batch-develop';

  return http.put<ITypes.DevelopStyleBatchDevelopRes>({
    url,
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

/**
 * 查询同款列表
 */
export const getListSameSkc = (ids: string[]) => {
  return http.post({
    url: '/sdp-curation/web/v1/develop-style/list-same-skc',
    data: ids,
    loading: true,
  });
};
