import http from '@/core/http';
import * as Types from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 查询列表（分页）
 * @see https://yapi.tiangong.site/project/1302/interface/api/25934
 */
export const sizeCategoryPage = (params: Types.ISizeCategoryPageReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/page';
  return http.post<Types.ISizeCategoryPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
  });
};

/**
 * 配置查询--维护的型号配置列表
 * @see https://yapi.tiangong.site/project/1302/interface/api/25862
 */
export const getSizeConfigList = (params: Types.ISizeConfigListReq) => {
  const url = '/sdp-clothing-material/web/v1/size-config/list';
  return http.post<Types.ISizeConfigListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
    loading: false,
  });
};

/**
 * 提交
 * @see https://yapi.tiangong.site/project/1302/interface/api/25871
 */
export const sizeConfigSubmit = (params: Types.ISizeConfigSubmitReq) => {
  const url = '/sdp-clothing-material/web/v1/size-config/submit';
  return http.post<boolean>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 批量详情查询
 * @see https://yapi.tiangong.site/project/1302/interface/api/26096
 */
export const sizeCategoryDetailList = (params: Types.ISizeCategoryDetailListReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/detail-list';
  return http.post<Types.ISizeCategoryDetailItem[]>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 批量删除
 * @see https://yapi.tiangong.site/project/1302/interface/api/25979
 */
export const sizeCategoryDelete = (params: Types.ISizeCategoryDeleteReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/delete';
  return http.post<boolean>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 新增
 * @see https://yapi.tiangong.site/project/1302/interface/api/25952
 */
export const sizeCategorySave = (params: Types.ISizeCategorySaveReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/save';
  return http.post<boolean>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 编辑
 * @see https://yapi.tiangong.site/project/1302/interface/api/25961
 */
export const sizeCategoryUpdate = (params: Types.ISizeCategoryUpdateReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/update';
  return http.post<boolean>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 查询所有(无分页)
 * @see https://yapi.tiangong.site/project/1302/interface/api/25943
 */
export const sizeCategoryList = (params: Types.ISizeCategoryListReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/list';
  return http.post<Types.ISizeCategoryItem[]>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data: params,
    noCancelDuplicate: true,
    loading: true,
  });
};
