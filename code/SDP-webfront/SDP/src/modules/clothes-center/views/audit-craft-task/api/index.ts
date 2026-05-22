import http from '@/core/http';
import * as Types from './types';

/**
 * 分页查询审版工艺单
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2483
 */
export const auditCraftOrderPage = (params: Types.IAuditCraftOrderPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/audit-craft-order/page';
  return http.post<Types.IAuditCraftOrderPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 根据审版工艺单ID查询详情
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2485
 */
export const auditCraftOrderDetail = (params: Types.IAuditCraftOrderDetailReq) => {
  const url = `/sdp-sample-clothes/web/v1/audit-craft-order/detail/${params.auditCraftOrderId}`;
  return http.get<Types.IAuditCraftOrderDetailRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 保存审版工艺单
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2484
 */
export const auditCraftOrderSave = (params: Types.IAuditCraftOrderSaveReq) => {
  const url = '/sdp-sample-clothes/web/v1/audit-craft-order/save';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 状态统计数量
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2977
 */
export const auditCraftOrderStateCount = (params: Types.IAuditCraftOrderPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/audit-craft-order/state-count';
  return http.post<Types.IAuditCraftOrderStateCountRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 指派审版工艺师
 * @see https://yapi.tiangong.site/project/38/interface/api/4030
 */
export const auditCraftOrderAssignReviewCraftsman = (
  params: Types.IAuditCraftOrderAssignReviewCraftsmanReq
) => {
  const url = '/sdp-sample-clothes/web/v1/audit-craft-order/assign-review-craftsman';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 根据SPU查询最新SPU信息
 * @see https://yapi.tiangong.site/project/38/interface/api/4022
 */
export const designCommonLatestSubmitWithSpu = (styleCode: string) => {
  const url = `/sdp-sample-clothes/web/v1/design-common/latest-submit-with-spu/${styleCode}`;
  return http.get<Types.IDesignCommonLatestSubmitWithSpuRes>({
    url,
  });
};
