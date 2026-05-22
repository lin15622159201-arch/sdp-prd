import http from '@/core/http';
import * as Types from './type';
/**
 * 品类列表查询
 * @see https://yapi.textile-story.com/project/1361/interface/api/106252
 */
export const fetchTemuCategoryList = () => {
  return http.get<Types.ITemuCategoryListRes>({
    url: '/sdp-curation/web/v1/temu/category/list',
    loading: true,
  });
};

/**
 * 模板列表查询
 *
 * @params {string} templateId 模板 ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/106273
 * @return {*}
 */
export const temuPropertyApi = (templateId: string) => {
  const url = `/sdp-curation/web/v1/temu/property/${templateId}`;

  return http.get<Types.TemuPropertyRes>({
    url,
    loading: true,
  });
};

/**
 * 颜色列表查询
 *
 * @params {string} templateId 模板 ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/106258
 * @return {*}
 */
export const temuColorApi = (templateId: string) => {
  const url = `/sdp-curation/web/v1/temu/color/${templateId}`;

  return http.get<Types.TemuColorRes>({
    url,
    loading: true,
  });
};
/**
 * 运费模板列表查询
 *
 * @params {Types.TemuLogisticsTemplateReq} data 运费模板列表查询参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106858
 * @return {*}
 */
export const temuLogisticsTemplateApi = (data: Types.TemuLogisticsTemplateReq) => {
  const url = '/sdp-curation/web/v1/temu/logistics-template';

  return http.post<Types.TemuLogisticsTemplateRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 尺码列表查询
 *
 * @params {string} templateId 模板 ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/106261
 * @return {*}
 */
export const temuSizeApi = (templateId: string) => {
  const url = `/sdp-curation/web/v1/temu/size/${templateId}`;

  return http.get<Types.TemuSizeRes>({
    url,
    loading: true,
  });
};
/**
 * 部位列表查询
 *
 * @params {string} templateId 模板 ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/106318
 * @return {*}
 */
export const temuPartApi = (templateId: string) => {
  const url = `/sdp-curation/web/v1/temu/part/${templateId}`;

  return http.get<Types.TemuPartRes>({
    url,
    loading: true,
  });
};
/**
 * 引用模板分页
 *
 * @params {Types.SizeTempPageReq} data 分页参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/106477
 * @return {*}
 */
export const sizeTempPageApi = (data: Types.SizeTempPageReq) => {
  const url = '/sdp-curation/web/v1/size-temp/page';

  return http.post<Types.SizeTempPageRes>({
    url,
    data,
  });
};

/**
 * 部位列表查询
 * @param catId 品类 ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/106318
 */
export const fetchTemuPart = (catId: string | number) => {
  return http.get<Types.ITemuPartRes>({
    url: `/sdp-curation/web/v1/temu/part/${catId}`,
    loading: true,
  });
};
/**
 * 查询款审核信息
 *
 * @params {string} styleId 款式 ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/107083
 * @return {*}
 */
export const productReviewApi = (styleId: string) => {
  const url = `/sdp-curation/web/v1/product/review/${styleId}`;

  return http.get<Types.ProductReviewRes>({
    url,
    loading: true,
  });
};

/**
 * 查询详情信息
 *
 * @params {string} productId 商品 ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/108280
 * @return {*}
 */
export const productDetailApi = (productId: string) => {
  const url = `/sdp-curation/web/v1/product/detail/${productId}`;

  return http.get<Types.ProductDetailRes>({
    url,
    loading: true,
  });
};
