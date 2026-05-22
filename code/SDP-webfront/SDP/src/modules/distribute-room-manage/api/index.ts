import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 外发版房列表
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/93480
 */
export const getOutCloudRoomList = (data: Types.IClothingRoomListReq) => {
  return http.get<Types.IClothingRoomListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-customer/web/clothing-room/list',
    params: data,
    cancelDuplicateUrl: true,
  });
};

/**
 * 外发版房信息修改
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/93460
 */
export const updateOutCloudRoomList = (data: Types.IWebClothingRoomReq) => {
  return http.put<null>({
    url: '/sdp-customer/web/clothing-room',
    data,
    loading: true,
    cancelDuplicateUrl: true,
  });
};

/**
 * 外发版房详情
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/93462
 */
export const getOutCloudRoomDetail = (roomId: string) => {
  return http.get<Types.IClothingRoomDetailRes>({
    // url: `/cloud-room/v1/web/clothing-room/detail/${id}`,
    url: `/sdp-customer/web/clothing-room/detail/${roomId}`,
    server: SYSTEM_ENUM.OLA_API,
    cancelDuplicateUrl: true,
    loading: true,
  });
};

/**
 * 新增外发版房信息
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/93458
 */
export const addOutCloudRoom = (data: Types.IWebClothingRoomReq) => {
  return http.post<null>({
    url: '/sdp-customer/web/clothing-room',
    data,
    loading: true,
    cancelDuplicateUrl: true,
  });
};

/**
 * 校验外发版房手机号是否存在，查重外发版房
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/93470
 */
export const validatorRoomPhone = (roomContactPhone: string) => {
  return http.get<Types.IClothingRoomListListItem>({
    url: `/sdp-customer/web/clothing-room/list/phone/${roomContactPhone}`,
  });
};

/**
 * 更新版房启用状态
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/93472
 */
export const updateEnable = (roomId: string) => {
  return http.put<null>({
    url: `/sdp-customer/web/clothing-room/update-enable?roomId=${roomId}`,
    loading: true,
  });
};

/**
 * 重置 队员 密码
 * @param data
 * @returns
 * see https://yapi.baibu.la/project/1008/interface/api/73530
 */
export const resetPlayerPassword = (data: { usersId: string[]; }) => {
  return http.post<null>({
    url: '/tenant-user/web/v1/user/resetPassword',
    data,
    loading: true,
  });
};

/**
 * 重置 版房 密码 - 批量
 * @param data
 * @returns
 * see https://yapi.baibu.la/project/1008/interface/api/73600
 */
export const resetRoomPasswordBatch = (data: { roomsCode: string[]; }) => {
  return http.post<null>({
    url: '/tenant-user/web/v1/user/resetRoomPassword',
    data,
    loading: true,
  });
};

/**
 * 添加/更新 版房队员信息
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/97284
 */
export const addOrUpdateRoomTeam = (data: Types.IClothingRoomAddOrUpdateRoomTeamReq) => {
  return http.post<null>({
    url: '/sdp-customer/web/clothing-room/addOrUpdateRoomTeam',
    data,
    loading: true,
  });
};

/**
 * 通过版房id查询版房团队信息
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/97286
 */
export const getRoomTeam = (roomId: string) => {
  return http.get<Types.IClothingRoomRoomTeamItem[]>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-customer/web/clothing-room/roomTeam/${roomId}`,
    loading: true,
  });
};

/**
 * 重置 版房 密码 - 批量-sso
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1584/interface/api/98674
 */
export const batchResetRoomPwd = (data: { roomIds: string[]; }) => {
  return http.post<null>({
    url: '/sdp-customer/web/clothing-room/batchResetRoomPwd',
    data,
    loading: true,
  });
};

/**
 * 查询系统下的所有租户，带分页
 * @param data
 * @returns
 * see https://yapi.ibaibu.com/project/1656/interface/api/97452
 */
export const getCompanyPage = (data: Types.ICompanyPageReq) => {
  return http.post<Types.ICompanyPageRes>({
    server: SYSTEM_ENUM.ARSENAL_API,
    url: '/sso-center/company/page',
    data,
    loading: true,
  });
};

// 请求系统角色编码（systemCode入参为外协系统的CODE）
export const queryRoles = (data: Types.IClothingRoomQueryRolesReq) => {
  return http.post<Types.IClothingRoomQueryRolesRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-customer/web/clothing-room/queryRoles',
    data,
    loading: true,
  });
};

// 添加 版房队员信息
export const addRoomUser = (data: Types.IClothingRoomAddRoomUserReq) => {
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-customer/web/clothing-room/addRoomUser',
    data,
    loading: true,
  });
};

// 更新 版房队员信息
export const updateRoomUser = (data: Types.IClothingRoomUpdateRoomUserReq) => {
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-customer/web/clothing-room/updateRoomUser',
    data,
    loading: true,
  });
};

// 删除 版房队员信息
export const deleteRoomUser = (userId: string) => {
  return http.get<null>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-customer/web/clothing-room/deleteRoomUser/${userId}`,
    loading: true,
  });
};

// 重置队员密码
export const resetMenberPwd = (userId: string) => {
  return http.get<null>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-customer/web/clothing-room/resetPwd/${userId}`,
    loading: true,
  });
};

// 变更 版房队员信息状态 启用/停用
export const changeUserEnableState = (userId: string) => {
  return http.get<null>({
    server: SYSTEM_ENUM.OLA_API,
    url: `/sdp-customer/web/clothing-room/changeUserEnableState/${userId}`,
    loading: true,
  });
};
