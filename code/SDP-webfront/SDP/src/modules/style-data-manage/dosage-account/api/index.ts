import http from '@/core/http';
import type * as Types from './types';

/** 获取用量核算列表 */
export const getDosageList = (data: Types.IGetDosageListReq) => {
  return http.post<Types.IGetDosageListRes>({
    url: '/sdp-sample-clothes/web/v1/check-count/page',
    loading: true,
    data,
  });
};
/**
 * 查询所有的版本
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/5398truetrue
 */
export const checkCountGetVersions = (params: Types.ICheckCountGetVersionsReq) => {
  const url = `/sdp-sample-clothes/web/v1/check-count/get-versions/${params.designCode}`;
  return http.get<Types.ICheckCountGetVersionsRes>({
    url,
    loading: true,
  });
};

/** 用量核算详情 */
export const getDosageInfo = (params: Types.IGetDosageInfoReq) => {
  return http.get<Types.IGetDosageInfoRes>({
    url: '/sdp-sample-clothes/web/v1/check-count/detail',
    loading: true,
    params,
  });
};
/** 用量核算详情 最新的数据 */
export const getDosageLatestInfo = (params: Types.IGetDosageInfoReq) => {
  return http.get<Types.IGetDosageInfoRes>({
    url: '/sdp-sample-clothes/web/v1/check-count/checkbutton',
    loading: true,
    params,
  });
};
/** 更新用量核算详情 */
export const updateDosageInfo = (data: Types.IUpdateDosageInfoReq) => {
  return http.post<Types.IUpdateDosageInfoRes>({
    url: '/sdp-sample-clothes/web/v1/check-count/save',
    loading: true,
    data,
  });
};
/** 获取版房列表 */
export const getMakeRooms = (data: Types.IGetMakeRoomsReq) => {
  return http.post<Types.IGetMakeRoomsRes>({
    url: '/sdp-sample-clothes/web/v1/check-count/maker-room',
    loading: true,
    data,
  });
};
/** 获取特殊辅料列表 */
export const getSpecialAccessories = (data: Types.IGetSpecialAccessoriesReq) => {
  return http.post<Types.IGetSpecialAccessoriesRes>({
    url: '/sdp-design/web/v1/special-accessories/product/page',
    loading: true,
    data,
  });
};
/** 用量核算分单 */
export const checkCountSplitting = (data: Types.ICheckCountSplittingReq) => {
  return http.post<Types.IGetMakeRoomsRes>({
    url: '/sdp-sample-clothes/web/v1/check-count/splitting',
    loading: true,
    data,
  });
};
/**
 * 撤回
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2806falsefalse
 */
export const checkCountBack = (ids: string[]) => {
  const url = '/sdp-sample-clothes/web/v1/check-count/back';
  return http.post({
    url,
    data: ids,
    loading: true,
  });
};

/** 用量核算状态统计 */
export const getCheckCountStatistics = () => {
  return http.get<Types.IGetCheckCountStatisticsRes>({
    url: '/sdp-sample-clothes/web/v1/check-count/statistics',
    loading: true,
  });
};

/**
 * 下载原纸样
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/3157truetrue
 */
export const patternClothesDownload = (params: Types.IPatternClothesDownloadReq) => {
  const url = `/sdp-sample-clothes/web/v1/pattern-clothes/download/${params.styleCode}/${params.designCode}`;
  return http.get<Types.IPatternClothesDownloadRes>({
    url,
    loading: true,
  });
};
