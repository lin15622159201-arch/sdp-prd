import http from '@/core/http';
import * as Types from './types';

/**
 * 确认签收
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2496
 */
export const materialSign = (params: Types.IMaterialSignReq) => {
  const url = `/sdp-design/web/v1/order/material/sign/${params.designCode}`;
  return http.get({
    url,
    loading: true
  });
};

/**
 * 分页查询齐套签收列表
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2494
 */
export const materialPage = (params: Types.IMaterialPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/material/query-by-page';
  return http.post<Types.IMaterialPageRes>({
    url,
    data: params,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 检查面辅料是否齐套
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2495
 */
export const materialCheckMaterial = (params: Types.IMaterialCheckMaterialReq) => {
  const url = `/sdp-sample-clothes/web/v1/material/check-material/${params.designCode}`;
  return http.get({
    url,
    data: params,
    loading: true
  });
};

/**
 * 扫码管理--齐套签收  -- 齐套签收列表查询
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2322
 */
export const materialSignMaterialList = (params: Types.IMaterialSignMaterialListReq) => {
  const url = `/sdp-design/web/v1/order/material/sign-material-list/${params.designCode}`;
  return http.get<Types.IMaterialSignMaterialListRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 强制确认签收
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/3189
 */
export const forceSign = (params: Types.IForceSignReq) => {
  const url = '/sdp-sample-clothes/web/v1/material/force/sign';
  return http.post({
    url,
    data: params,
    loading: true
  });
};
