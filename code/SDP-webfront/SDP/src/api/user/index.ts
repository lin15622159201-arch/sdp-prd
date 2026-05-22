import http from '@/core/http';
// import { DOMAIN_SYSTEM_ENUM } from '@/core/http/type';
import type {
  IUsersQueryUserReq,
  IUsersQueryUserRes,
  IUserQueryFindPageReq,
  IUserQueryFindPageRes,
} from './index.d';
import { SYSTEM_ENUM } from '@/core/http/env';

// // 根据关键字检索用户
// export const fuzzyQueryUser_old = (params: { keyword: string; }) => {
//   const url = `/authManage/user/${params.keyword}`;
//   return http.get<{ users: UserItem[]; }>({
//     server: DOMAIN_SYSTEM_ENUM.baibu, // 测试
//     url,
//   });
// };

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
    server: SYSTEM_ENUM.NEST_API,
    url,
    data,
  });
};

// 查用户的手机号码，另外调sso接口
// https://yapi.ibaibu.com/project/1656/interface/api/97892
export const queryUserMobile = (data: IUsersQueryUserReq) => {
  // data.companyId = accountStore.account?.tenant?.id || '';
  const url = '/sso-center/admin/users/query-user';
  return http.post<IUsersQueryUserRes>({
    server: SYSTEM_ENUM.ARSENAL_API,
    url,
    data,
  });
};
