import http from '@/core/http';
import * as Types from './types';

/**
 * 列表分页
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4150
 */
export const paymentOrderPage = (params: Types.IPaymentOrderPageReq) => {
  const url = '/sdp-finroyal/web/payment-order/page';
  return http.post<Types.IPaymentOrderPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 统计状态数量
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4158
 */
export const paymentOrderPaymentStatusSummary = () => {
  const url = '/sdp-finroyal/web/payment-order/payment-status-summary';
  return http.get<Types.IPaymentOrderPaymentStatusSummaryRes>({
    url,
    loading: true
  });
};

/**
 * 确认付款
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4162
 */
export const paymentOrderConfirmPayment = (params: Types.IPaymentOrderConfirmPaymentReq) => {
  const url = '/sdp-finroyal/web/payment-order/confirm-payment';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 付款单详情
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4826
 */
export const paymentOrderDetail = (params: Types.IWebPaymentOrderReq) => {
  const url = `/sdp-finroyal/web/payment-order/${params.paymentOrderId}`;
  return http.get<Types.IWebPaymentOrderRes>({
    url,
    data: params,
    loading: true
  });
};
