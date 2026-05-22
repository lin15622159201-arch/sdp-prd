import http from '@/core/http';
import { SYSTEM_ENUM } from '@/core/http/env';
import * as Types from './type';
import { CancelToken } from 'axios';
/**
 * 记录下载日志
 * @see https://yapi.tiangong.site/project/519/interface/api/48346
 */
export const aigcTaskImgLog = (
  params: Types.IAigcTaskAddImgDownloadLogReq
) => {
  const url = '/tg-aigc-server/web/v1/aigcTask/addImgDownloadLog';
  return http.post<Types.IAigcTaskAddImgDownloadLogRes>({
    server: SYSTEM_ENUM.TG_FASHION_DESIGN_API,
    url,
    data: params,
  });
};

/**
 * 创建FgClip任务
 * @see https://yapi.tiangong.site/project/699/interface/api/58370
 */
export const fgClipTask = (params: Types.IFgClipTaskReq) => {
  const url = '/tg-aigc-server/web/v1/create/fg-clip/task';
  return http.post<Types.IFgClipTaskRes>({
    server: SYSTEM_ENUM.TG_FASHION_DESIGN_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 查询FgClip任务
 * @see https://yapi.tiangong.site/project/699/interface/api/58354
 */
export const checkFgClipTask = (params: Types.IFgTaskReq) => {
  const url = '/tg-aigc-server/web/v1/list/fg-clip/task';
  return http.post<Types.IFgTaskRes>({
    server: SYSTEM_ENUM.TG_FASHION_DESIGN_API,
    url,
    data: params,
  });
};

/**
 * 第三级标签信息
 * @see https://yapi.tiangong.site/project/447/interface/api/68331
 */
export const fmThirdLabel = (code: string) => {
  const url = `/bfg/web/v1/fm/third-label/${code}`;
  return http.get<Types.IFmThirdLabelRes>({
    url,
    loading: true,
  });
};

/**
 * 三级品类 - 查询
 */
export const getThirdCategoryList = () => {
  const url = '/bfg/web/v1/fm/third-label/list';
  return http.post<Types.IThirdLabelListRes>({
    url,
    loading: true,
  });
};

/**
 * 批量导入
 * @see https://yapi.tiangong.site/project/18/interface/api/446
 */
export const batchImport = (formData: FormData) => {
  const url = '/inspiration/web/v1/ai/picture/batch/import';
  return http.post<string[]>({
    url,
    data: formData,
    loading: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};

/**
 * 查询启用的场景库列表
 * @see https://yapi.textile-story.com/project/447/interface/api/79436
 */
export const modelTemplateLibraryEnableList = (
  params: Types.IModelTemplateLibraryEnableListReq
) => {
  const url = '/bfg/web/fm/model-template-library/enableList';
  return http.post<Types.IModelTemplateLibraryEnableListRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 基础标签查询
 * @see https://yapi.tiangong.site/project/447/interface/api/57106
 */
export const getLabel = (data: Types.IGetLabelParams) => {
  return http.post<Types.ILabel[]>({
    url: '/bfg/web/v1/fm/base-label/list',
    data,
    loading: true,
  });
};

/**
 * 标签 - 查询
 * @see https://yapi.tiangong.site/project/447/interface/api/57162
 */
export const baseLabelList = (params: Types.IBaseLabelListReq, loading = true) => {
  const url = '/bfg/v1/fm/base-label/list';
  return http.post<Types.IBaseLabelListRes>({
    url,
    data: params,
    loading,
  });
};

/**
 * 获取4K高清图
 * @see https://yapi.tiangong.site/project/20/interface/api/655
 */
export const ultraHdObtain = (params: Types.IUltraHdObtainReq, loading = true, cancel: CancelToken) => {
  const url = '/butted/web/ultra-hd/obtain';
  return http.post<Types.IUltraHdObtainRes>({
    url,
    data: params,
    loading,
    cancelToken: cancel,
  });
};

/**
 * 记录下载日志(批量)
 * @see https://yapi.tiangong.site/project/21/interface/api/674
 */
export const addImgDownloadLogBatch = (params: Types.IAigcTaskAddImgDownloadLogReq[]) => {
  const url = '/tg-aigc-server/web/v1/aigcTask/addImgDownloadLog/batch';
  return http.post<null>({
    server: SYSTEM_ENUM.TG_FASHION_DESIGN_API,
    url,
    data: params,
  });
};

/**
 * 标签查询（根据code查询）
 * @see https://yapi.textile-story.com/project/447/interface/api/83527
 */
export const getConfigByCode = (code: string) => {
  const url = `/bfg/inner/fm/labelInfo/by/value/${code}`;
  return http.get<any>({
    url,
    loading: true,
  });
};
