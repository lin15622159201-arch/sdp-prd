import qs from 'qs';
import http from '@/core/http';
import { SYSTEM_ENUM } from '@/core/http/env';
import {
  IGetUserResourceItemRes,
  ILoginByDesignReq,
  ILoginByDesignRes,
  IGetUserTenantsReq,
  IGetUserTenantsRes,
  IGetDesignUserInfoRes,
} from '@/api/account/type';

/**
 * 获取用户拥有的权限（菜单、按钮等）
 */
export function getUserResource() {
  return http.get<IGetUserResourceItemRes>({
    url: '/user-profile/menu/tree/user',
    loading: true,
  });
}

/**
 * 获取当前用户的客户信息
 */
export const loginByDesign = (data: ILoginByDesignReq) => {
  const url = '/user-profile/web/login';
  return http.post<ILoginByDesignRes>({
    url,
    loading: true,
    data
  });
};
/**
 * 获取当前用户的客户信息
 */
export const getDesignUserInfo = () => {
  const url = '/user-profile/frontend/web/sys-tenant-user/customer';
  return http.get<IGetDesignUserInfoRes>({
    url,
    loading: true,
  });
};

/**
 * 获取当前用户租户列表
 */
export const getUserTenants = (params: IGetUserTenantsReq) => {
  const url = '/user-profile/sys-user/tenant/options';
  return http.get<IGetUserTenantsRes>({
    url,
    loading: true,
    params
  });
};
