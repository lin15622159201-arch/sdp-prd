import http from '@/core/http';
import type * as Types from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

// 纸样组别
export const getGroupPage = (data: Types.IGroupPageReq) => {
  const url = '/sdp-clothing-material/web/v1/group/page';
  return http.post<Types.IGroupPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const saveGroup = (data: Types.IGroupAddReq) => {
  const url = '/sdp-clothing-material/web/v1/group/add';
  return http.post<Types.IGroupAddRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const updateGroup = (data: Types.IGroupModifyReq) => {
  const url = '/sdp-clothing-material/web/v1/group/modify';
  return http.post<Types.IGroupModifyRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const deleteGroup = (data: Types.IGroupRemoveReq) => {
  const url = `/sdp-clothing-material/web/v1/group/remove/${data.id}`;
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

// 纸样分组成员
export const getGroupUserList = (data: Types.IGroupUserPageReq) => {
  const url = '/sdp-clothing-material/web/v1/group-user/page';
  return http.post<Types.IGroupUserAddRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const groupUserAdd = (data: Types.IGroupUserAddReq) => {
  const url = '/sdp-clothing-material/web/v1/group-user/add';
  return http.post<Types.IGroupUserAddRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const groupUserTransfer = (data: Types.IGroupUserResetReq) => {
  const url = '/sdp-clothing-material/web/v1/group-user/reset';
  return http.post<Types.IGroupUserResetRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const groupUserDelete = (data: { id: string; }) => {
  const url = `/sdp-clothing-material/web/v1/group-user/remove/${data.id}`;
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};
