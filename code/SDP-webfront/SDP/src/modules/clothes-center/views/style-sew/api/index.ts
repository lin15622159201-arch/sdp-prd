import http from '@/core/http';
import * as Types from './types';

/**
 * 查询列表（全部、已完成、已取消页面）
 * @see https://yapi.ibaibu.com/project/1650/interface/api/91848
 * @请求方法: POST
 * @请求地址: /sdp-sample-clothes/web/v1/sample-clothes/page
 */
export const postWebV1SampleClothesPageApi = (data: Types.PostWebV1SampleClothesPageApiReq) => {
  return http.post<Types.PostWebV1SampleClothesPageApiRes>({
    url: '/sdp-sample-clothes/web/v1/sample-clothes/page',
    data,
  });
};

/**
 * 样衣质检_查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2394
 */
export const sampleQcPage = (params: Types.ISampleQcPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-qc/page';
  return http.post<Types.ISampleQcPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 样衣质检_详情-基础信息
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2396
 */
export const sampleQcBaseInfo = (params: Types.ISampleQcBaseInfoReq) => {
  const url = `/sdp-sample-clothes/web/v1/sample-qc/base-info/${params.sampleQcId}`;
  return http.get<Types.ISampleQcBaseInfoRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 样衣质检_通过
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2397
 */
export const sampleQcPass = (params: Types.ISampleQcPassReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-qc/pass';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 样衣质检_返修
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2398
 */
export const sampleQcRepair = (params: Types.ISampleQcRepairReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-qc/repair';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 分页查询
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2544
 */
export const sewQueryByPage = (params: Types.ISewQueryByPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/query-by-page';
  return http.post<Types.ISewQueryByPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 车版分单
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2459
 */
export const sewAllocate = (params: Types.ISewAllocateReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/allocate';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 查询版房订单数量（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/3082
 */
export const sewMakerRoom = (params: Types.ISewMakerRoomReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/maker-room';
  return http.post<Types.ISewMakerRoomRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 车版分单撤回
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/3129
 */
export const sewWithdraw = (params: Types.ISewWithdrawReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/withdraw';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 外部处理-确认收货
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2475
 */
export const sewReceipt = (params: Types.ISewReceiptReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/receipt';
  return http.post({
    url,
    data: params,
    loading: true
  });
};
