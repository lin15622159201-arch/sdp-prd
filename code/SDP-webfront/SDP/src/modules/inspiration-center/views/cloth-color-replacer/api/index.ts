import http from '@/core/http';
import { IReplaceColorTaskDetailRes, IReplaceColorTaskPageReq, IReplaceColorTaskPageRes, IReplaceColorTaskSaveBatchReq, InspirationListByIdsRes } from './type';

/**
 * 服装换色-批量保存
 * @see https://yapi.textile-story.com/project/1359/interface/api/103696
 */
export const fetchReplaceColorTaskSaveBatch = (
  params: IReplaceColorTaskSaveBatchReq,
) => {
  return http.post<null>({
    url: '/inspiration/web/replace-color-task/save-batch',
    data: params,
    loading: true,
  });
};

/**
 * 服装换色-详情
 * @param id
 * @see https://yapi.textile-story.com/project/1359/interface/api/103699
 */
export const fetchReplaceColorTaskDetail = (
  id: string | number,
) => {
  return http.get<IReplaceColorTaskDetailRes>({
    url: `/inspiration/web/replace-color-task/detail/${id}`,
    loading: true,
  });
};

/**
 * 服装换色-分页
 * @see https://yapi.textile-story.com/project/1359/interface/api/103702
 */
export const fetchReplaceColorTaskPage = (
  params: IReplaceColorTaskPageReq,
) => {
  return http.post<IReplaceColorTaskPageRes>({
    url: '/inspiration/web/replace-color-task/page',
    data: params,
    loading: true,
  });
};


/**
 * 服装换色-批量删除
 * @see https://yapi.textile-story.com/project/1359/interface/api/103705
 */
export const fetchReplaceColorTaskDeleteBatch = (taskIds: string[]) => {
  return http.post<boolean>({
    url: '/inspiration/web/replace-color-task/delete-batch',
    loading: true,
    data: taskIds
  });
};

/**
 * 服装换色-批量终止
 * @see https://yapi.textile-story.com/project/1359/interface/api/103708
 */
export const fetchReplaceColorTaskStopBatch = (taskIds: string[]) => {
  return http.post<boolean>({
    url: '/inspiration/web/replace-color-task/stop-batch',
    loading: true,
    data: taskIds
  });
};

/**
 * 服装换色-批量重试
 * @see https://yapi.textile-story.com/project/1359/interface/api/103711
 */
export const fetchReplaceColorTaskRetryBatch = (taskIds: string[]) => {
  return http.post<boolean>({
    url: '/inspiration/web/replace-color-task/retry-batch',
    loading: true,
    data: taskIds
  });
};

/**
 * 批量查询
 *
 * @params {string} inspirationIds 灵感Id集合
 * @see https://yapi.textile-story.com/project/1361/interface/api/105697
 * @return {*}
 */
export const inspirationListByIdsApi = (inspirationIds: string[]) => {
  const url = '/sdp-curation/web/v1/inspiration/list-by-ids';

  return http.post<InspirationListByIdsRes>({
    url,
    loading: true,
    data: inspirationIds
  });
};
