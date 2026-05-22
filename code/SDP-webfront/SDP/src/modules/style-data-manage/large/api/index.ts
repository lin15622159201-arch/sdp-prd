import http from '@/core/http';
import type * as Types from './types';

// 跳码规则，不分页,
export const getHoppingRulesApi = (data: Types.ISizeHoppingRulesListReq) => {
  const url = '/sdp-clothing-material/size-hopping-rules/list';
  return http.post<Types.ISizeHoppingRulesListRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 生产资料列表
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2788
 */
export const styleInfoPage = (params: Types.IStyleInfoPageReq) => {
  const url = '/sdp-order-info/web/v1/style-info/page';
  return http.post<Types.IStyleInfoPageRes>({
    url,
    data: params,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 大货资料分单
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2789
 */
export const styleInfoSplitting = (params: Types.IStyleInfoSplittingReq) => {
  const url = '/sdp-order-info/web/v1/style-info/splitting';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 撤回
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2790
 */
export const styleInfoBack = (data: string[]) => {
  const url = '/sdp-order-info/web/v1/style-info/back';
  return http.post({
    url,
    data,
    loading: true
  });
};

/**
 * 查询核算师或版房订单数量（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2793
 */
export const styleInfoMakerRoom = (params: Types.IStyleInfoMakerRoomReq) => {
  const url = '/sdp-order-info/web/v1/style-info/maker-room';
  return http.post<Types.IStyleInfoMakerRoomRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 款式提交
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2792
 */
export const styleInfoSubmit = (params: Types.IStyleInfoSubmitReq) => {
  const url = '/sdp-order-info/web/v1/style-info/submit';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 生产资料-详情
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2791
 */
export const styleInfoDetail = (params: { styleInfoId: string; }) => {
  const url = `/sdp-order-info/web/v1/style-info/detail/${params.styleInfoId}`;
  return http.get<Types.IStyleInfoDetailRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 统计核算各个状态的数量
 * @see yapi地址：https://yapi.tiangong.site/project/48/interface/api/2902
 */
export const styleInfoStatistics = () => {
  const url = '/sdp-order-info/web/v1/style-info/statistics';
  return http.get<Types.IStyleInfoStatisticsRes>({
    url,
    loading: true
  });
};

/**
 * 查询所有(无分页)品类尺码
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2904
 */
export const sizeCategoryList = (params: Types.ISizeCategoryListReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/list';
  return http.post<Types.ISizeCategoryListRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/2903
 */
export const sizeCategoryPage = (params: Types.ISizeCategoryPageReq) => {
  const url = '/sdp-clothing-material/web/v1/size-category/page';
  return http.post<Types.ISizeCategoryPageRes>({
    url,
    data: params,
    loading: true
  });
};

/*
 * 添加备注
 * @see yapi地址：https://yapi.tiangong.site/project/48/interface/api/3100
 */
export const orderInfoRemarkAdd = (params: Types.IOrderInfoRemarkAddReq) => {
  const url = '/sdp-order-info/web/v1/orderInfoRemark/add';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 查询生产资料日志
 * @see yapi地址：https://yapi.tiangong.site/project/48/interface/api/3103
 */
export const orderInfoLogProdLogs = (params: Types.IOrderInfoLogProdLogsReq) => {
  const url = '/sdp-order-info/web/v1/orderInfoLog/prod-logs';
  return http.get<Types.IOrderInfoLogProdLogsRes>({
    url,
    params,
    loading: true
  });
};

/**
 * 查询生产资料日志
 * @see yapi地址：https://yapi.tiangong.site/project/48/interface/api/3214
 */
export const orderInfoLogProdLogsByCode = (params: Types.IOrderInfoLogProdLogsByCodeReq) => {
  const url = '/sdp-order-info/web/v1/orderInfoLog/prod-logs-by-code';
  return http.get<Types.IOrderInfoLogProdLogsByCodeRes>({
    url,
    params,
    loading: true
  });
};

/**
* 根据设计款号styleCode（SPU）查询审版工艺单详情
* @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2990
*/
export const auditCraftOrderDetailByStyleCode = (params: Types.IAuditCraftOrderDetailByStyleCodeReq) => {
  const url = `/sdp-sample-clothes/web/v1/audit-craft-order/detail-by-style-code/${params.styleCode}`;
  return http.get<Types.IAuditCraftOrderDetailByStyleCodeRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 获取号型给大货资料用
 * @see https://yapi.tiangong.site/project/43/interface/api/3140
 */
export const getSizeCategoryFindSizeCategory = (
  params: Types.ISizeCategoryFindSizeCategoryReq
) => {
  const url = '/sdp-clothing-material/web/v1/size-category/find-size-category';
  return http.post<Types.ISizeCategoryFindSizeCategoryRes>({
    url,
    data: params,
  });
};

/**
 * 根据ids查询车缝信息
 * @see yapi地址：https://yapi.tiangong.site/project/43/interface/api/3193
 */
export const sewingProcessListByIds = (params: Types.ISewingProcessListByIdsReq) => {
  const url = '/sdp-clothing-material/web/v1/sewingProcess/list-by-ids';
  return http.post<Types.ISewingProcessListByIdsRes>({
    url,
    data: params,
    loading: true
  });
};
