import http from '@/core/http';
import * as Types from './types';

/**
 * 预估样衣核价查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2794
 */
export const estimateCheckPricePage = (params: Types.IEstimateCheckPricePageReq) => {
  const url = '/sdp-sample-clothes/web/v1/estimate-check-price/page';
  return http.post<Types.IEstimateCheckPricePageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 预估样衣核价详情
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2795
 */
export const estimateCheckPriceDetail = (params: Types.IEstimateCheckPriceDetailReq) => {
  const url = '/sdp-sample-clothes/web/v1/estimate-check-price/detail';
  return http.get<Types.IEstimateCheckPriceDetailRes>({
    url,
    params,
    loading: true
  });
};

/**
 * 核价完成
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2796
 */
export const estimateCheckPriceSave = (params: Types.IEstimateCheckPriceSaveReq) => {
  const url = '/sdp-sample-clothes/web/v1/estimate-check-price/save';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 统计状态数量
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2849
 */
export const estimateCheckPriceCountState = (params: Types.IEstimateCheckPricePageReq) => {
  const url = '/sdp-sample-clothes/web/v1/estimate-check-price/count-state';
  return http.get<Types.IEstimateCheckPriceCountStateRes>({
    url,
    loading: true
  });
};

/**
 * 核价完成 现货款
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/4342
 */
export const estimateCheckPriceSaveSpotCheckPrice = (
  params: Types.IEstimateCheckPriceSaveSpotCheckPriceReq
) => {
  const url = '/sdp-sample-clothes/web/v1/estimate-check-price/save-spot-check-price';
  return http.post({
    url,
    data: params,
    loading: true
  });
};
