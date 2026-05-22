import http from '@/core/http';
import * as Types from './types';

/**
 * 查询列表
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2481
 */
export const takeOverPage = (params: Types.ITakeOverPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/take-over/page';
  return http.post<Types.ITakeOverPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 版单交接
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2482
 */
export const takeOverSampleClothes = (params: Types.ITakeOverSampleClothesReq) => {
  const url = '/sdp-sample-clothes/web/v1/take-over/sample-clothes';
  return http.post({
    url,
    data: params,
    loading: true
  });
};
