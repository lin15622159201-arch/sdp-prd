import http from '@/core/http';
import type * as Types from './types';

/* 扫码管理--齐套签收 -- 齐套签收列表查询 */
export const getMaterialSignMaterialList = (designCode: string) => {
  // return Promise.resolve(API2.res38 as any);
  return http.get<Types.IMaterialSignMaterialListRes>({
    url: `/sdp-design/web/v1/order/material/sign-material-list/${designCode}`,
    loading: true,
  });
};

/* 齐套签收 */
export const getOrderMaterialSign = (designCode: string) => {
  return http.get({
    url: `/sdp-design/web/v1/order/material/sign/${designCode}`,
    loading: true,
  });
};

/**
 * 物料齐套跟进列表查询
 */
export const postMaterialOrderListApi = (data: Types.IMaterialPageReq) => {
  return http.post<Types.IMaterialPageRes>({
    url: '/sdp-design/web/v1/order/material/page',
    data,
    loading: true
  });
};

/**
 * 齐套签收
 */
export const getMaterialSignApi = (params: Types.IMaterialPageReq) => {
  return http.get<Types.IMaterialPageRes>({
    url: `/sdp-design/web/v1/order/material/sign/${params.designCode}`,
    params,
    loading: true,
  });
};
