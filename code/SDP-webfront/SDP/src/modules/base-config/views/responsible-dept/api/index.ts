import http from '@/core/http';
import type * as Types from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

export const getResponsibleDepartment = (data: Types.IResponsibleDepartmentPageReq) => {
  const url = '/sdp-clothing-material/web/v1/responsible-department/page';
  return http.get<Types.IResponsibleDepartmentPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params: data,
  });
};

export const addResponsibleDepartment = (data: Types.IResponsibleDepartmentSaveReq) => {
  const url = '/sdp-clothing-material/web/v1/responsible-department/save';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const editResponsibleDepartment = (data: Types.IResponsibleDepartmentUpdateReq) => {
  const url = '/sdp-clothing-material/web/v1/responsible-department/update';
  return http.put<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const changeStatus = (data: Types.IResponsibleDepartmentStatusReq) => {
  const url = '/sdp-clothing-material/web/v1/responsible-department/status';
  return http.put({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
