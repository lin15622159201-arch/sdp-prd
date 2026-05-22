import http from '@/core/http';
import * as Types from './types';

/**
 * 二次工艺汇总列表
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2400
 */
export const secondCraftList = (params:Types.ISecondCraftListReq) => {
  const url = '/sdp-sample-clothes/web/v1/second-craft/list';
  return http.post<Types.ISecondCraftListRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 二次工艺状态数量统计
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2402
 */
export const secondCraftStateStatistics = (params: Types.ISecondCraftListReq) => {
  const url = '/sdp-sample-clothes/web/v1/second-craft/state-statistics';
  return http.post<Types.ISecondCraftStateStatisticsRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 补充工艺
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2401
 */
export const secondCraftSupplement = (params: Types.ISecondCraftSupplementReq) => {
  const url = '/sdp-sample-clothes/web/v1/second-craft/supplement';
  return http.post({
    url,
    data: params,
    loading: true
  });
};
