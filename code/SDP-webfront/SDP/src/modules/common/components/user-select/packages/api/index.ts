import http from '@/core/http';
import { SYSTEM_ENUM } from '@/core/http/env';
import { IUserQueryFindPageReq, IUserQueryFindPageRes } from '@/api/user/index.d';

// SSO-根据关键字检索用户(根据用户名和公司ID查询用户的编码、ID和username)
export const fuzzyQueryUser = (data: IUserQueryFindPageReq & { keyword?: string; }) => {
  // const url = '/sso-center/admin/users/query-user-by-username-and-companyId';
  const url = '/uacs/api/user-query/findPage';
  data.pageNum = 1;
  data.pageSize = 10000;
  data.filters = {
    ...data.filters,
    name: data.keyword,
  };
  delete data.keyword;
  return http.post<IUserQueryFindPageRes>({
    url,
    data,
    server: SYSTEM_ENUM.NEST_API,
  });
};
