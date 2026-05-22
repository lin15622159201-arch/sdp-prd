import http from '@/core/http';
import * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 获取当前用户基本信息
 * @see yapi地址：https://yapi.tiangong.site/project/26/interface/api/1449
 */
export const userMe = () => {
  const url = '/uacs/api/user/me';
  return http.get<Types.IUserMeRes>({
    server: SYSTEM_ENUM.NEST_API,
    url,
    loading: true
  });
};

/**
 * 获取当前用户菜单树
 * @see yapi地址：https://yapi.tiangong.site/project/26/interface/api/1450
 */
export const userFindMenuTree = (params: string[]) => {
  const url = '/uacs/api/user/findMenuTree';
  return http.post<Types.IUserFindMenuTreeRes>({
    server: SYSTEM_ENUM.NEST_API,
    url,
    data: params,
    loading: true
  });
};

/**
 * 修改密码
 * @see yapi地址：https://yapi.tiangong.site/project/26/interface/api/1490
 */
export const userChangePassword = (params: Types.IUserChangePasswordReq) => {
  const url = '/uacs/api/user/changePassword';
  return http.post({
    server: SYSTEM_ENUM.NEST_API,
    url,
    data: params,
    loading: true
  });
};

/**
 * 获取当前用户 sso token
 * @see yapi地址：https://yapi.tiangong.site/project/26/interface/api/2247
 */
export const userSsoToken = () => {
  const url = '/uacs/api/user/ssoToken';
  return http.get<{ ssoToken: string; }>({
    server: SYSTEM_ENUM.NEST_API,
    url,
    loading: true
  });
};

export const userQuery = (params: Types.IUserQueryReq) => {
  const url = '/uacs/api/user-query/findPage';
  return http.post<Types.IUserQueryRes>({
    server: SYSTEM_ENUM.NEST_API,
    url,
    data: params,
    loading: false
  });
};
