import http from '@/core/http';
import * as ITypes from './types';

/**
 * 列表查询
 *
 * @params {Types.PostureFissionTaskPageReq} data 列表查询参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101251
 * @return {*}
 */
export const postureFissionTaskPageApi = (data: ITypes.PostureFissionTaskPageReq) => {
  const url = '/inspiration/frontend/web/task/posture-fission-task/page';

  return http.post<ITypes.PostureFissionTaskPageRes>({
    url,
    data,
    loading: true,
  });
};



/**
 * 批量创建
 * @see https://yapi.textile-story.com/project/1359/interface/api/103444
 */
export const postureFissionTaskBatchCreateApi = (data: { list: ITypes.PostureFissionTaskCreateReq[]; }) => {
  const url = '/inspiration/frontend/web/task/posture-fission-task/batch/create';

  return http.post<boolean>({
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
export const postureFissionTaskCreateApi = (data: ITypes.PostureFissionTaskCreateReq) => {
  const url = '/inspiration/frontend/web/task/posture-fission-task/create';

  return http.post<ITypes.PostureFissionTaskCreateRes>({
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
export const styleGenAbortApi = (data: { taskCodes: string[]; }) => {
  const url = '/inspiration/frontend/web/task/posture-fission-task/abort/batch';

  return http.post<ITypes.AbortBatchRes>({
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
export const styleGenDeletedApi = (data: { taskCodes: string[]; }) => {
  const url = '/inspiration/frontend/web/task/posture-fission-task/deleted/batch';

  return http.post<ITypes.DeletedBatchRes>({
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
export const styleGenRetryApi = (data: { taskCodes: string[]; }) => {
  const url = '/inspiration/frontend/web/task/posture-fission-task/retry/batch';

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
  const url = `/inspiration/frontend/web/task/posture-fission-task/detail/by/id/${taskId}`;

  return http.get<ITypes.ByIdRes>({
    url,
    loading: true,
  });
};


/**
 * 根据业务id和来源查询
 *
 * @params {Types.UserEvaluateImageGroupGetByBusIdReq} data 根据业务id和来源查询参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101269
 * @return {*}
 */
export const userEvaluateImageGroupGetByBusIdApi = (data: ITypes.UserEvaluateImageGroupGetByBusIdReq) => {
  const url = '/inspiration/web/user-evaluate-image-group/get-by-busId';

  return http.post<ITypes.UserEvaluateImageGroupGetByBusIdRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 用户对生成图片组评价保存
 *
 * @params {Types.UserEvaluateImageGroupSaveOrUpdateReq} data 用户对生成图片组评价保存参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100036
 * @return {*}
 */
export const userEvaluateImageGroupSaveOrUpdateApi = (data: ITypes.UserEvaluateImageGroupSaveOrUpdateReq) => {
  const url = '/inspiration/web/user-evaluate-image-group/saveOrUpdate';
  return http.post<ITypes.UserEvaluateImageGroupSaveOrUpdateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 新增下载记录
 * @see https://yapi.tiangong.site/project/18/interface/api/3400
 */
export const imageDownloadLog = (params: ITypes.IImageDownloadLogReq) => {
  const url = '/inspiration/web/image-download/log';
  return http.post<ITypes.IImageDownloadLogRes>({
    url,
    data: params,
    loading: false,
  });
};

/**
 * 任务详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101155
 * @return {*}
 */
export const webStyleGenApiByDerive = (taskId: string) => {
  const url = `/inspiration/web/v1/style-gen/${taskId}`;

  return http.get<ITypes.WebStyleGenRes>({
    url,
    loading: true,
  });
};
/**
 * 风格模型-详情
 *
 * @params {string} styleModelId
 * @see https://yapi.textile-story.com/project/1359/interface/api/101068
 * @return {*}
 */
export const styleModelDetailApi = (styleModelId: string) => {
  const url = `/inspiration/web/style-model/detail/${styleModelId}`;

  return http.get<ITypes.StyleModelDetailRes>({
    url,
    loading: true,
  });
};



/**
 * 虚拟换衣任务详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101155
 * @return {*}
 */
export const webVirtuaApi = (taskId: string) => {
  const url = `/inspiration/web/v1/virtual-tryon/${taskId}`;

  return http.get<ITypes.WebVirtualTryonRes>({
    url,
    loading: true,
  });
};

/**
 * 详情
 * @param taskId
 * @see https://yapi.textile-story.com/project/1359/interface/api/101467
 */
export const fetchFloralPatternApplyTaskDetail = (
  taskId: string | number,
) => {
  return http.get<ITypes.IFloralPatternApplyTaskDetailRes>({
    url: `/inspiration/web/floral-pattern-apply-task/detail/${taskId}`,
    loading: true,
  });
};
