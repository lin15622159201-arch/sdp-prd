import http from '@/core/http';
import type * as Types from './types';

/**
 * 打版日志
 * @see https://yapi.ibaibu.com/project/1650/interface/api/91892
 *
 * @请求方法: GET
 * @请求地址: /sdp-sample-clothes/web/v1/log/sample-clothes/list
 * @更新时间: 2021-09-08 09:50:30
 */
export const getWebV1LogSampleClothesListApi = (params: {
  clothesId: string;
  bizTypes?: string;
}) => {
  return http.get<Types.ISampleClothesLogListRes>({
    url: '/sdp-sample-clothes/web/v1/log/sample-clothes/list',
    params,
  });
};
