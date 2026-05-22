import http from '@/core/http';
import type * as Types from './types';
/**
 * 面辅料采购跟进列表
 */
export const postMaterialPurchasePageListApi = (data: Types.PostMaterialPurchasePageListApiReq) => {
  return http.post<Types.PostMaterialPurchasePageListApiRes>({
    url: '/sdp-design/web/v1/material/purchase/page-list',
    data,
    loading: true,
  });
};

/**
 * 取消物料
 */
export const postMaterialPurchaseCancelMaterialApi = (data: Types.PostMaterialPurchaseCancelMaterialApiReq) => {
  return http.post<Types.PostMaterialPurchaseCancelMaterialApiRes>({
    url: '/sdp-design/web/v1/material/purchase/cancel-material',
    data,
    loading: true,
  });
};

/**
 * 根据物料确认结果ID 获取采购记录信息 -面料/辅料
 */
export const getPurchaseOrderLog = (params: Types.IPurchaseOrderLogReq) => {
  return http.get<Types.IPurchaseOrderLogRes>({
    url: `/sdp-design/web/v1/purchase/apply/purchase-order/log/${params.demandType}/${params.orderCode}`,
    loading: true,
  });
};
