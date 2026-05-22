import http from '@/core/http';
import { SYSTEM_ENUM } from '@/core/http/env';
import {
  IUserQueryFindPageReq,
  IUserQueryFindPageRes,
} from './type';

/**
 * 分页查询
 * @see https://yapi.tiangong.site/project/26/interface/api/2291
 */
export const userQueryFindPage = (params: IUserQueryFindPageReq) => {
  const url = '/uacs/api/user-query/findPage';
  return http.post<IUserQueryFindPageRes>({
    server: SYSTEM_ENUM.NEST_API,
    url,
    data: params,
    loading: true,
  });
};
