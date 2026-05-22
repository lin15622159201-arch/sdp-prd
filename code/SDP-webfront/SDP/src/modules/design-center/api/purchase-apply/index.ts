import http from '@/core/http';
import type * as Types from './types';

/** 自选物料v0.1新增采购申请相关接口 */
/**
 * 根据设计款号查询最新已提交(已核算)的Bom详情
 */
export const fetchMatchMaterialDetailLatest = (params: Types.IDetailLatestReq) => {
  return http.get<Types.IDetailLatestRes>({
    url: '/sdp-design/web/v1/bom/latest/purchase-list',
    params,
    loading: true,
  });
};

/**
 * 批量物料采购 （自选物料v0.1）
 */
export const actionPurchaseApplyBatch = (data: Types.IApplyMaterialPurchaseBatchReq) => {
  return http.post<Types.IApplyMaterialPurchaseBatchReq>({
    url: '/sdp-design/web/v1/purchase/apply/material-purchase-batch',
    data,
    loading: true,
  });
};
