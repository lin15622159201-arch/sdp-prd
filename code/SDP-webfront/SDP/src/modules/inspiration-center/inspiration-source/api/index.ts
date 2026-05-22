import http from '@/core/http';
import {
  IInspirationPageReq,
  IInspirationPageRes,
  IInspirationExportReq,
  IImageImportReq,
  ITaskSubmitReq,
  IInspirationDetailRes,
  IReSubmitDetailRes,
  IInspirationImportRes,
  ICategoryListRes,
  InspirationReIdentificationReq,
  ICategoryItem,
  InspirationEditImageReq,
  InspirationEditImageRes,
  IDictValuesReq,
  IValuesRes,
  PictureCaptionCreateReq,
  PictureCaptionCreateRes,
  StyleModelDetailRes,
  InspirationEditCategoryReq,
  InspirationEditCategoryRes,
} from './type';
import { exportByBlob } from '@/core/utils/file-download';

/**
 * 列表分页
 * @see https://yapi.tiangong.site/project/39/interface/api/2866
 */
export const inspirationPage = (params: IInspirationPageReq) => {
  const url = '/sdp-curation/web/v1/inspiration/page';
  return http.post<IInspirationPageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 导出
 * @see https://yapi.tiangong.site/project/39/interface/api/2867
 */
export const inspirationExport = (params: IInspirationExportReq) => {
  const url = '/sdp-curation/web/v1/inspiration/export';
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: false,
  });
};

/**
 * Excel导入
 * @see https://yapi.tiangong.site/project/39/interface/api/2868
 */
export const inspirationImport = (data: FormData) => {
  const url = '/sdp-curation/web/v1/inspiration/import';
  return http.post<IInspirationImportRes>({
    url,
    data,
    loading: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};

/**
 * 图片导入
 * @see https://yapi.tiangong.site/project/39/interface/api/2869
 */
export const imageImport = (params: IImageImportReq) => {
  const url = '/sdp-curation/web/v1/inspiration/image/import';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 提交任务
 * @see https://yapi.tiangong.site/project/39/interface/api/2871
 */
export const taskSubmit = (params: ITaskSubmitReq) => {
  const url = '/sdp-curation/web/v1/inspiration/task/submit';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 详情
 * @see https://yapi.tiangong.site/project/39/interface/api/2870
 */
export const inspirationDetail = (inspirationId: string) => {
  const url = `/sdp-curation/web/v1/inspiration/detail/${inspirationId}`;
  return http.post<IInspirationDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 重新提交
 * @see https://yapi.tiangong.site/project/39/interface/api/2872
 */
export const taskReSubmit = (businessId: string) => {
  const url = `/sdp-curation/web/v1/inspiration/task/re-submit/${businessId}`;
  return http.post({
    url,
    loading: true,
  });
};

/**
 * 重新提交-页面回显
 * @see https://yapi.tiangong.site/project/39/interface/api/2909
 */
export const reSubmitDetail = (businessId: string) => {
  const url = `/sdp-curation/web/v1/inspiration/task/re-submit/detail/${businessId}`;
  return http.post<IReSubmitDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 删除 v3.10.1
 * @see https://yapi.tiangong.site/project/57/interface/api/5230
 */
export const inspirationRemove = (params: string[]) => {
  const url = '/sdp-curation/web/v1/inspiration/remove';
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
  return http.get<ICategoryListRes>({
    url,
    loading: false,
  });
};

/**
 * 分页查询应用列表
 * 基础标签查询
 * @see https://yapi.tiangong.site/project/447/interface/api/57106
 */
export const getCategory = (data:any) => {
  return http.get<ICategoryItem[]>({
    url: '/bfg/web/fm-label-info/ai/design/category/tree/list',
    loading: false,
    data,
  });
};


/**
 * 重新识别
 * @see https://yapi.textile-story.com/project/1361/interface/api/99709
 */
export const reIdentification = (params: InspirationReIdentificationReq) => {
  const url = '/sdp-curation/web/v1/inspiration/reIdentification';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 编辑图片
 *
 * @params {Types.InspirationEditImageReq} data 编辑图片参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/100171
 * @return {*}
 */
export const inspirationEditImageApi = (data: InspirationEditImageReq) => {
  const url = '/sdp-curation/web/v1/inspiration/edit-image';

  return http.put<InspirationEditImageRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 字典值 - 批量查询
 * @see yapi地址：https://yapi.tiangong.site/project/447/interface/api/24584truetrue
 */
export const dictValues = (params: IDictValuesReq) => {
  const url = '/bfg/v1/dict/values';
  return http.post<IValuesRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 创建图片解析
 *
 * @params {Types.PictureCaptionCreateReq} data 创建图片解析参数
 * @see https://yapi.textile-story.com/project/1363/interface/api/100057
 * @return {*}
 */
export const pictureCaptionCreateApi = (data: PictureCaptionCreateReq) => {
  const url = '/butted/web/picture-caption/create';

  return http.post<PictureCaptionCreateRes>({
    url,
    data,
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

  return http.get<StyleModelDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 编辑品类
 *
 * @params {Types.InspirationEditCategoryReq} data 编辑品类参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103315
 * @return {*}
 */
export const inspirationEditCategoryApi = (data: InspirationEditCategoryReq) => {
  const url = '/sdp-curation/web/v1/inspiration/edit-category';

  return http.put<InspirationEditCategoryRes>({
    url,
    data,
    loading: true,
  });
};
