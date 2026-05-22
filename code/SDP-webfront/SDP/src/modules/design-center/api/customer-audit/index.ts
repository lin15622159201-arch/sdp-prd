import http from '@/core/http';
import type * as Types from './types';

/**
 * 寄送客户审版管理列表（分页）
 * @see https://yapi.ibaibu.com/project/1650/interface/api/155961
 */
export const getExpressCustomerAuditList = (data: Types.IPageSendAuditReq) => {
  return http.post<Types.IPageSendAuditRes>({
    url: '/sdp-sample-clothes/web/v1/send-clothes/page/send-audit',
    data,
  });
};

/**
 * 寄送客户审版管理 批量打印 详情
 * @see https://yapi.ibaibu.com/project/1650/interface/api/159873
 */
export const getExpressCustomerAuditBatchPrintDetail = (data: Types.IPrintDetailsReq) => {
  return http.post<Types.IPrintDetailsItem[]>({
    url: '/sdp-sample-clothes/web/v1/design-common/print/details',
    data,
    loading: true,
  });
};
