import http from '@/core/http';
import type * as Types from './types';

/**
 * 查询列表（分页）
 * @see https://yapi.ibaibu.com/project/1302/interface/api/95898
 *
 * @请求方法: GET
 * @请求地址: /clothing-material/web/v1/technique-group/page
 * @更新时间: 2021-09-24 15:15:51
 */
export const getWebV1TechniqueGroupPageApi = (params: Types.GetWebV1TechniqueGroupPageApiReq) => {
  return http.get<Types.GetWebV1TechniqueGroupPageApiRes>({
    url: '/clothing-material/web/v1/technique-group/page',
    params,
  });
};
