import http from '@/core/http';
import * as Types from './types';

/**
 * 3D列表查询
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/1963
 */
export const dimensionPage = (params: Types.IDimensionPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/dimension/query-by-page';
  return http.post<Types.IDimensionPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 撤回分单
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/1967
 */
export const dimensionRecall = (params: Types.IDimensionRecallReq) => {
  const url = '/sdp-sample-clothes/web/v1/dimension/recall';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 任务编辑
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/1964
 */
export const dimensionEdit = (params: Types.IDimensionEditReq) => {
  const url = '/sdp-sample-clothes/web/v1/dimension/edit';
  return http.post<Types.IDimensionEditRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 3D任务详情
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/1962
 */
export const dimensionDetail = (params: Types.IDimensionDetailReq) => {
  const url = `/sdp-sample-clothes/web/v1/dimension/detail/${params.dimensionId}`;
  return http.get<Types.IDimensionDetailRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 任务转交
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/1965
 */
export const dimensionTaskTransfer = (params: Types.IDimensionTaskTransferReq) => {
  const url = '/sdp-sample-clothes/web/v1/dimension/task-transfer';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 开始分单
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/1966
 */
export const dimensionAssign = (params: Types.IDimensionAssignReq) => {
  const url = '/sdp-sample-clothes/web/v1/dimension/assign';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 查询3D版师订单数量（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2850
 */
export const dimensionDesignerRoom = (params: Types.IDimensionDesignerRoomReq) => {
  const url = '/sdp-sample-clothes/web/v1/dimension/designer-room';
  return http.post<Types.IDimensionDesignerRoomRes>({
    url,
    data: params,
    loading: true
  });
};
