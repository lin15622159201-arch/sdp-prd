import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 开发纸样库
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1752/interface/api/97542
 */
export const getPatternClothes = (data: Types.IClothesPageReq) => {
  const url = '/sdp-clothing-material/web/v1/pattern/clothes/page';
  return http.post<Types.IClothesPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};
export const getPatternClothesSubItem = (params: { parentId: string; }) => {
  const url = '/sdp-clothing-material/web/v1/pattern/clothes';
  return http.get<Types.IClothesPageRes['list']>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params,
  });
};

/**
 * 开发尺寸库列表
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1752/interface/api/97544
 */
export const getPatternClothesSize = (data: Types.IPatternClothesSizePageReq) => {
  const url = '/sdp-clothing-material/web/v1/patternClothesSize/page';
  return http.post<Types.IPatternClothesSizePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};
export const getPatternClothesSizeSubItem = (params: { parentId: string; }) => {
  const url = '/sdp-clothing-material/web/v1/patternClothesSize';
  return http.get<Types.IPatternClothesSizePageRes['list']>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params,
  });
};

/**
 * 开发BOM库
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1752/interface/api/97540
 */
export const getBomOrderPage = (data: Types.IOrderPageReq) => {
  const url = '/sdp-clothing-material/web/v1/bom/order/page';
  return http.post<Types.IOrderPageRes>({
    url,
    data,
  });
};
export const getBomOrderPageSubItem = (params: { parentId: string; }) => {
  const url = '/sdp-clothing-material/web/v1/bom/order';
  return http.get<Types.IOrderPageRes['list']>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params,
  });
};

/**
 * 样衣排料列表
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1752/interface/api/97404
 */
export const getSampleMaterialPlan = (data: Types.ISampleMaterialPlanPageReq) => {
  const url = '/sdp-clothing-material/web/v1/sample-material-plan/page';
  return http.post<Types.ISampleMaterialPlanPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
export const getSampleMaterialPlanSubItem = (params: { parentId: string; }) => {
  const url = '/sdp-clothing-material/web/v1/sample-material-plan';
  return http.get<Types.ISampleMaterialPlanPageRes['list']>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params,
  });
};

/**
 * 大货纸样列表
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1752/interface/api/97444
 */
export const getProdDesignFile = (data: Types.IProdDesignFilePageReq) => {
  const url = '/sdp-clothing-material/web/v1/prod-design-file/page';
  return http.post<Types.IProdDesignFilePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
export const getProdDesignFileSubItem = (params: { parentId: string; }) => {
  const url = '/sdp-clothing-material/web/v1/prod-design-file';
  return http.get<Types.IProdDesignFilePageRes['list']>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params,
  });
};

/**
 * 大货尺寸列表
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1752/interface/api/97446
 */
export const getProdDesignSize = (data: Types.IProdDesignSizePageReq) => {
  const url = '/sdp-clothing-material/web/v1/prod-design-size/page';
  return http.post<Types.IProdDesignSizePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const getProdDesignSizeSubItem = (params: { parentId: string; }) => {
  const url = '/sdp-clothing-material/web/v1/prod-design-size';
  return http.get<Types.IProdDesignSizePageRes['list']>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params,
  });
};

/**
 * 获取特殊要求枚举列表接口
 * @see https://yapi.ibaibu.com/project/1788/interface/api/101292
 * @请求方法: GET
 * @请求地址: /cutting-order/web/enum/v1/special-requirement/list
 * @更新时间: 2021-11-15 14:02:12
 */
export const getWebV1SpecialApi = (params: Types.ISpecialRequirementListReq) => {
  return http.get<Types.ISpecialRequirementListRes>({
    url: '/sdp-cutting-order/web/enum/v1/special-requirement/list',
    params,
  });
};

// 获取客户详情
export const getCustomerDetail = (purchaserId: string) => {
  return http.get<Types.IPurchaserDetailRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-crm-customer/web/purchaser/detail/${purchaserId}`,
  });
};
