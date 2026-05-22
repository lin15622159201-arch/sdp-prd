import http from '@/core/http';
import * as ITypes from './types';

/**
 * 查询任务列表
 *
 * @params {Types.StyleGenPageReq} data 查询任务列表参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101131
 * @return {*}
 */
export const styleGenPageApi = (data: ITypes.StyleGenPageReq) => {
  const url = '/inspiration/web/v1/style-gen/page';

  return http.post<ITypes.StyleGenPageRes>({
    url,
    data,
    loading: true,
  });
};



/**
 * 创建图片解析
 *
 * @params {Types.PictureCaptionCreateReq} data 创建图片解析参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/100057
 * @return {*}
 */
export const pictureCaptionCreateApi = (data: ITypes.PictureCaptionCreateReq) => {
  const url = '/butted/web/picture-caption/create';

  return http.post<ITypes.PictureCaptionCreateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 图片描述-任务详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1363/interface/api/101218
 * @return {*}
 */
export const webPictureCaptionApi = (taskId: string) => {
  const url = `/butted/web/picture-caption/${taskId}`;

  return http.get<ITypes.WebPictureCaptionRes>({
    url,
    loading: true,
  });
};

/**
 * 创建任务
 *
 * @params {Types.StyleGenCreateReq} data 创建任务参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/101128
 * @return {*}
 */
export const styleGenCreateApi = (data: ITypes.StyleGenCreateReq) => {
  const url = '/inspiration/web/v1/style-gen/create';

  return http.post<ITypes.StyleGenCreateRes>({
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
  const url = '/inspiration/web/v1/style-gen/abort/batch';

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
  const url = '/inspiration/web/v1/style-gen/deleted/batch';

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
  const url = '/inspiration/web/v1/style-gen/retry/batch';

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
