import http from '@/core/http';
import * as ITypes from './types';

/**
 * 列表查询
 *
 * @params {Types.PostureFissionTaskPageReq} data 列表查询参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101251
 * @return {*}
 */
export const postureFissionTaskPageApi = (data: ITypes.ImageRepairPageReq) => {
  const url = '/inspiration/web/v1/image-repair/page';

  return http.post<ITypes.ImageRepairPageRes>({
    url,
    data,
    loading: true,
  });
};



/**
 * 创建
 *
 * @params {Types.PostureFissionTaskCreateReq} data 创建参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101431
 * @return {*}
 */
export const postureFissionTaskCreateApi = (data: ITypes.ImageRepairCreateReq) => {
  const url = '/inspiration/web/v1/image-repair/create';

  return http.post<ITypes.ImageRepairCreateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 中止
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101137
 * @return {*}
 */
export const styleGenAbortApi = (data: string[]) => {
  const url = '/inspiration/web/v1/image-repair/abort/batch';

  return http.post({
    url,
    data,
    loading: true,
  });
};

/**
 * 删除
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101143
 * @return {*}
 */
export const styleGenDeletedApi = (data: string[]) => {
  const url = '/inspiration/web/v1/image-repair/deleted/batch';

  return http.post({
    url,
    data,
    loading: true,
  });
};

/**
 * 重试
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101149
 * @return {*}
 */
export const styleGenRetryApi = (data: string[]) => {
  const url = '/inspiration/web/v1/image-repair/retry/batch';

  return http.post({
    url,
    data,
    loading: true,
  });
};
/**
 * 任务详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101155
 * @return {*}
 */
export const webStyleGenApi = (taskId: string) => {
  const url = `/inspiration/web/v1/image-repair/${taskId}`;

  return http.get<ITypes.WebImageRepairRes>({
    url,
    loading: true,
  });
};

/**
 * 任务详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101155
 * @return {*}
 */
export const webPostureGenApi = (taskId: string) => {
  const url = `/inspiration/frontend/web/task/posture-fission-task/detail/by/id/${taskId}`;

  return http.get<ITypes.ByIdRes>({
    url,
    loading: true,
  });
};
