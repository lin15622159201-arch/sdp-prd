import http from '@/core/http';
import * as Types from './type';

/**
 * 新增或者更新场景库
 * @see https://yapi.tiangong.site/project/18/interface/api/1574
 */
export const fmSceneSave = (params: Types.IFmSceneSaveReq) => {
  const url = '/inspiration/web/smart-develop-style/fm-scene/save';
  return http.post<boolean>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * ai素材用 新增或者更新场景库
 * @see https://yapi.tiangong.site/project/18/interface/api/1574
 */
export const aiSceneSave = (params: Types.IFmSceneSaveReq) => {
  const url = '/inspiration/web/design-material/fm-scene/save';
  return http.post<boolean>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 场景图选择列表
 * @see https://yapi.tiangong.site/project/19/interface/api/1305
 */
export const getScenePicList = (sceneId: string) => {
  const url = '/bfg/web/scene-picture/checked/list';
  return http.get<Types.IPicListRes>({
    url,
    loading: true,
    params: {
      sceneId
    },
  });
};

/**
 * 场景下拉选择列表
 * @see https://yapi.tiangong.site/project/19/interface/api/1302
 */
export const getSceneList = () => {
  const url = '/bfg/web/fm-scene/checked/list';
  return http.post<Types.ISceneListRes>({
    url,
    loading: true,
  });
};

/**
 * AI设计任务选择模特素材分页查询（给AI设计任务选中使用）
 * @see https://yapi.tiangong.site/project/19/interface/api/3554
 */
export const modelMaterialPage = (params: Types.IModelMaterialPageReq) => {
  const url = '/bfg/web/fm-model-material/checked/smart-design/page';
  return http.post<Types.IModelMaterialPageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 新增模特素材
 * @see https://yapi.tiangong.site/project/18/interface/api/3566
 */
export const fmModelMaterialSave = (params: Types.IFmModelMaterialSaveReq) => {
  const url = '/inspiration/web/smart-develop-style/fm-model-material/save';
  return http.post<Types.IFmModelMaterialSaveRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * AI素材-模特素材选择列表
 * @see https://yapi.tiangong.site/project/19/interface/api/4530
 */
export const designMaterialPage = (params: Types.IModelMaterialPageReq) => {
  const url = '/bfg/web/fm-model-material/checked/design-material/page';
  return http.post<Types.IModelMaterialPageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 智能AI设计-场景选择列表
 * @see https://yapi.tiangong.site/project/19/interface/api/4470
 */
export const getSmartDesignSceneList = (params: Types.ISmartDesignListReq) => {
  const url = '/bfg/web/scene/checked/smart-design/list';
  return http.post<Types.ISceneListRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * AI素材-场景选择列表
 * @see https://yapi.tiangong.site/project/19/interface/api/4482
 */
export const getDesignMaterialSceneList = (params: Types.ISmartDesignListReq) => {
  const url = '/bfg/web/scene/checked/design-material/list';
  return http.post<Types.ISceneListRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 推荐列表
 *
 * @params {Types.RecommendPageReq} data 推荐列表参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/99961
 * @return {*}
 */
export const recommendPageApi = (data: Types.RecommendPageReq) => {
  const url = '/inspiration/web/model-material-library/recommend/page';

  return http.post<Types.RecommendPageRes>({
    url,
    data,
    loading: true,
  });
};


/**
 * 款式标签
 */
export const getCategoryList = (params: any) => {
  const url = '/bfg/web/fm/category/page';
  return http.post<any>({
    url,
    data: params,
    loading: false,
  });
};

/**
 * 虚拟换装模特Mark创建
 *
 * @params {Types.TryOnMarkCreateReq} data 虚拟换装模特Mark创建参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/99865
 * @return {*}
 */
export const tryOnMarkCreateApi = (data: Types.TryOnMarkCreateReq) => {
  // const url = `/butted/web/picture-mark/model/try-on-mark/create`;
  const url = '/butted/web/multipose-seg/create';

  return http.post<Types.TryOnMarkCreateRes>({
    url,
    data,
    loading: false,
  });
};

/**
 * 详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1363/interface/api/99871
 * @return {*}
 */
export const webPictureMarkApi = (taskId: string) => {
  // const url = `/butted/web/picture-mark/${taskId}`;
  const url = `/butted/web/multipose-seg/${taskId}`;

  return http.get<Types.WebPictureMarkRes>({
    url,
    loading: false,
  });
};


/**
 * 素材保存
 *
 * @params {Types.UserUploadMaterialSaveReq} data 素材保存参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100015
 * @return {*}
 */
export const userUploadMaterialSaveApi = (data: Types.UserUploadMaterialSaveReq) => {
  const url = '/inspiration/web/user-upload-material/save';

  return http.post<Types.UserUploadMaterialSaveRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 素材分页列表
 *
 * @params {Types.UserUploadMaterialPageReq} data 素材分页列表参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100021
 * @return {*}
 */
export const userUploadMaterialPageApi = (data: Types.UserUploadMaterialPageReq) => {
  const url = '/inspiration/web/user-upload-material/page';

  return http.post<Types.UserUploadMaterialPageRes>({
    url,
    data,
    loading: true,
  });
};


/**
 * 素材批量删除
 *
 * @params {Types.UserUploadMaterialBatchDeleteReq} data 素材批量删除参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100087
 * @return {*}
 */
export const userUploadMaterialBatchDeleteApi = (data: Types.UserUploadMaterialBatchDeleteReq) => {
  const url = '/inspiration/web/user-upload-material/batch-delete';

  return http.delete<Types.UserUploadMaterialBatchDeleteRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 素材更新
 *
 * @params {Types.UserUploadMaterialUpdateReq} data 素材更新参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100018
 * @return {*}
 */
export const userUploadMaterialUpdateApi = (data: Types.UserUploadMaterialUpdateReq) => {
  const url = '/inspiration/web/user-upload-material/update';

  return http.post<Types.UserUploadMaterialUpdateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 风格化衍生任务选择模特素材分页查询（给AI设计任务选中使用）
 * @see https://yapi.tiangong.site/project/19/interface/api/3554
 */
export const modelstyleGenPage = (params: Types.IModelMaterialPageReq) => {
  const url = '/bfg/web/fm-model-material/checked/style-gen/page';
  return http.post<Types.IModelMaterialPageRes>({
    url,
    data: params,
    loading: true,
  });
};
/**
 * AI素材-场景选择列表
 * @see https://yapi.tiangong.site/project/19/interface/api/4482
 */
export const getStyleGenList = (params: Types.ISmartDesignListReq) => {
  const url = '/bfg/web/scene/checked/style-gen/list';
  return http.post<Types.ISceneListRes>({
    url,
    data: params,
    loading: true,
  });
};
