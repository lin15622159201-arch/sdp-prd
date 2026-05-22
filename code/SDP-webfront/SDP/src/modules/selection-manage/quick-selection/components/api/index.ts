import http from '@/core/http';
import * as Types from './type';
import { CancelToken } from 'axios';

/**
 * design-智能开款-列表查询
 * @see https://yapi.tiangong.site/project/18/interface/api/513
 */
export const smartDevelopStylePage = (params: Types.ISmartDevelopStylePageReq) => {
  const url = '/inspiration/frontend/web/task/smart-develop-style/page';
  return http.post<Types.ISmartDevelopStylePageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * design-智能开款-删除按钮
 * @see https://yapi.tiangong.site/project/18/interface/api/516
 */
export const smartDevelopStyleDeleted = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/smart-develop-style/deleted/${taskCode}`;
  return http.post<boolean>({
    url,
    loading: true,
  });
};

/**
 * design-智能开款-重试按钮
 * @see https://yapi.tiangong.site/project/18/interface/api/517
 */
export const smartDevelopStyleRetry = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/smart-develop-style/retry/${taskCode}`;
  return http.post<boolean>({
    url,
    loading: true,
  });
};

/**
 * design-智能开款-中止按钮
 * @see https://yapi.tiangong.site/project/18/interface/api/515
 */
export const smartDevelopStyleAbort = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/smart-develop-style/abort/${taskCode}`;
  return http.post<string>({
    url,
    loading: true,
  });
};

/**
 * design-智能开款-图文生图
 * @see https://yapi.tiangong.site/project/18/interface/api/512
 */
export const createImageTextToImage = (params: Types.ICreateImageTextToImageReq) => {
  const url = '/inspiration/web/smart-develop-style/create';
  return http.post<Types.ICreateImageTextToImageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 创建
 * @see https://yapi.tiangong.site/project/20/interface/api/542
 */
export const smartIdentifyCreate = (params: Types.ISmartIdentifyCreateReq) => {
  const url = '/butted/web/smart-identify/create';
  return http.post<Types.ISmartIdentifyCreateRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 详情
 * @see https://yapi.tiangong.site/project/20/interface/api/543
 */
export const getWebSmartIdentify = (taskId: string, loading = true, cancelToken?: CancelToken) => {
  const url = `/butted/web/smart-identify/${taskId}`;
  return http.get<Types.IWebSmartIdentifyRes>({
    url,
    cancelToken,
    loading,
  });
};

/**
 * design-智能开款-复制页面（回显数据）
 * @see https://yapi.tiangong.site/project/18/interface/api/566
 */
export const getCopyDetail = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/smart-develop-style/copy/detail/${taskCode}`;
  return http.post<Types.ICopyDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 标签查询（根据code查询）
 * @see https://yapi.textile-story.com/project/447/interface/api/83527
 */
export const getConfigByCode = (code: string) => {
  const url = `/bfg/inner/fm/labelInfo/by/value/${code}`;
  return http.get<Types.IByValueRes>({
    url,
    loading: true,
  });
};

/**
 * 图片详情
 * @see https://yapi.tiangong.site/project/18/interface/api/541
 */
export const pictureDetail = (id: string) => {
  const url = `/inspiration/web/v1/ai/picture/detail/${id}`;
  return http.get<Types.IPictureDetailRes>({
    url,
    loading: true,
  });
};

/**
 * design-智能开款-查询任务详情
 * @see https://yapi.tiangong.site/project/18/interface/api/518
 */
export const smartDevelopStyleDetail = (taskCode: string) => {
  const url = `/inspiration/frontend/web/task/smart-develop-style/detail/${taskCode}`;
  return http.post<Types.ISmartDevelopStyleDetailRes>({
    url,
    loading: true,
  });
};

/**
 * design-智能开款-中止按钮(批量)
 * @see https://yapi.tiangong.site/project/18/interface/api/662
 */
export const abortBatch = (params: Types.IAbortBatchReq) => {
  const url = '/inspiration/frontend/web/task/smart-develop-style/abort/batch';
  return http.post<boolean>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * design-智能开款-删除按钮(批量)
 * @see https://yapi.tiangong.site/project/18/interface/api/663
 */
export const deletedBatch = (params: Types.IDeletedBatchReq) => {
  const url = '/inspiration/frontend/web/task/smart-develop-style/deleted/batch';
  return http.post<boolean>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * design-智能开款-重试按钮(批量)
 * @see https://yapi.tiangong.site/project/18/interface/api/664
 */
export const retryBatch = (params: Types.IRetryBatchReq) => {
  const url = '/inspiration/frontend/web/task/smart-develop-style/retry/batch';
  return http.post<boolean>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * AI设计品类列表
 * @see https://yapi.tiangong.site/project/19/interface/api/1276
 */
export const getCategoryList = () => {
  const url = '/bfg/web/fm-label-info/ai/design/category/list';
  return http.get<Types.ICategoryListRes>({
    url,
    loading: false,
  });
};

/**
 * 智能设计-一键推荐面料
 * @see https://yapi.tiangong.site/project/18/interface/api/1398
 */
export const createFabricRecommendTask = (params: Types.IDesignCreateReq) => {
  const url = '/inspiration/web/fabric-recommend/smart/design/create';
  return http.post<string>({
    url,
    data: params,
    loading: false,
  });
};

/**
 * 面料推荐任务详情
 * @see https://yapi.tiangong.site/project/18/interface/api/1399
 */
export const getFabricRecommendTaskDetail = (taskId: string, cancelToken: CancelToken) => {
  const url = `/inspiration/web/fabric-recommend/detail/${taskId}`;
  return http.post<Types.IFabricRecommendDetailRes>({
    url,
    loading: false,
    cancelToken,
  });
};

/*
  design-智能开款-查询任务详情
* @see https://yapi.tiangong.site/project/18/interface/api/518
*/
export const getSmartDevelopStyleDetailById = (taskId: string) => {
  const url = `/inspiration/frontend/web/task/smart-develop-style/detail/by/id/${taskId}`;
  return http.post<Types.ISmartDevelopStyleDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 查看AI设计生图推荐面料结果（传每个分组第一张图片ID）
 * @see https://yapi.tiangong.site/project/18/interface/api/3202
 */
export const getFabricInfo = (params: { pictureId: string; }) => {
  const url = '/inspiration/web/smart-develop-picture/recommend/fabric/info';
  return http.get<Types.IFabricInfoRes>({
    url,
    loading: true,
    params,
  });
};


/**
 * 分页查询应用列表
 * 基础标签查询
 * @see https://yapi.tiangong.site/project/447/interface/api/57106
 */
export const getCategory = (data:any) => {
  return http.get({
    url: '/bfg/web/fm-label-info/ai/design/category/tree/list',
    loading: false,
    data,
  });
};


/**
 * 图片描述-任务详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1363/interface/api/99907
 * @return {*}
 */
export const webPictureCaptionApi = (taskId: string) => {
  const url = `/butted/web/picture-caption/${taskId}`;
  return http.get<Types.WebPictureCaptionRes>({
    url,
    loading: false,
  });
};


/**
 * 新增AI标题
 *
 * @params {Types.AiTitleSaveReq} data 新增AI标题参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/99913
 * @return {*}
 */
export const aiTitleSaveApi = (data: Types.AiTitleSaveReq) => {
  const url = '/inspiration/web/smart-develop-style/ai-title/save';

  return http.post<Types.AiTitleSaveRes>({
    url,
    data,
    loading: false,
  });
};

/**
 * 重试AI标题
 *
 * @params {Types.AiTitleReSaveReq} data 重试AI标题参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/99919
 * @return {*}
 */
export const aiTitleReSaveApi = (data: Types.AiTitleReSaveReq) => {
  const url = '/inspiration/web/smart-develop-style/ai-title/re-save';
  return http.post<Types.AiTitleReSaveRes>({
    url,
    data,
    loading: false,
  });
};


/**
 * 用户对生成图片组评价保存
 *
 * @params {Types.UserEvaluateImageGroupSaveOrUpdateReq} data 用户对生成图片组评价保存参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100036
 * @return {*}
 */
export const userEvaluateImageGroupSaveOrUpdateApi = (data: Types.UserEvaluateImageGroupSaveOrUpdateReq) => {
  const url = '/inspiration/web/user-evaluate-image-group/saveOrUpdate';

  return http.post<Types.UserEvaluateImageGroupSaveOrUpdateRes>({
    url,
    data,
    loading: true,
  });
};


/**
 * 字典值 - 批量查询
 * @see yapi地址：https://yapi.tiangong.site/project/447/interface/api/24584truetrue
 */
export const dictValues = (params: Types.IDictValuesReq) => {
  const url = '/bfg/v1/dict/values';
  return http.post<Types.IValuesRes>({
    url,
    data: params,
    loading: true
  });
};
