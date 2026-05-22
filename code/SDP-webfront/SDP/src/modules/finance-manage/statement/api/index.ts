import http from '@/core/http';
import type * as Types from './types';
import { exportByBlob } from '@/core/utils/file-download';

/**
 * 列表分页（总账单）
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/3746
 */
export const financeTotalBillPage = (params: Types.IFinanceTotalBillPageReq) => {
  const url = '/sdp-finroyal/web/finance-total-bill/page';
  return http.post<Types.IFinanceTotalBillPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 统计状态（总账单）
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4146
 */
export const financeTotalBillReconciledStatusSummary = () => {
  const url = '/sdp-finroyal/web/finance-total-bill/reconciled-status-summary';
  return http.get<Types.IFinanceTotalBillReconciledStatusSummaryRes>({
    url,
    loading: true
  });
};

/**
 * 核实账单 （总账单）
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4142
 */
export const financeTotalBillVerifyBill = (params: Types.IFinanceTotalBillVerifyBillReq) => {
  const url = `/sdp-finroyal/web/finance-total-bill/verify-bill/${params.totalBillId}`;
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 总账单详情（总账单）
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4842
 */
export const financeTotalBillDetail = (params: Types.IWebFinanceTotalBillReq) => {
  const url = `/sdp-finroyal/web/finance-total-bill/${params.totalBillId}`;
  return http.get<Types.IWebFinanceTotalBillRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 确认账单（总账单）
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4846
 */
export const financeTotalBillConfirmBill = (params: Types.IFinanceTotalBillConfirmBillReq) => {
  const url = `/sdp-finroyal/web/finance-total-bill/confirmBill/${params.totalBillId}`;
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 根据总账单id查找子帐单
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/3754
 */
export const financeBillFinanceBillByTotalBillId = (
  params: Types.IFinanceBillFinanceBillByTotalBillIdReq
) => {
  const url = `/sdp-finroyal/web/finance-bill/finance-bill-by-totalBillId/${params.totalBillId}`;
  return http.get<Types.IFinanceBillFinanceBillByTotalBillIdRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 子帐单统计详细
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/3774
 */
export const financeBillBillDetailByBillId = (params: Types.IFinanceBillBillDetailByBillIdReq) => {
  const url = `/sdp-finroyal/web/finance-bill/bill-detail-by-bill-Id/${params.billId}`;
  return http.get<Types.IFinanceBillBillDetailByBillIdRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 面料剪版列表分页
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/3778
 */
export const financeBillPage = (params: Types.IFinanceBillFabricCuttingPageReq) => {
  const url = '/sdp-finroyal/web/finance-bill/fabric-cutting-page';
  return http.post<Types.IFinanceBillFabricCuttingPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 数码描稿列表分页
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/3806
 */
export const financeBillDigitalCuttingPage = (params: Types.IFinanceBillDigitalCuttingPageReq) => {
  const url = '/sdp-finroyal/web/finance-bill/digital-cutting-page';
  return http.post<Types.IFinanceBillDigitalCuttingPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 3D剪版账单分页
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/3810
 */
export const financeBillThreeDCuttingPage = (params: Types.IFinanceBillThreeDCuttingPageReq) => {
  const url = '/sdp-finroyal/web/finance-bill/three-d-cutting-page';
  return http.post<Types.IFinanceBillThreeDCuttingPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 辅料账单分页
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/3814
 */
export const financeBillAccessoriesPage = (params: Types.IFinanceBillAccessoriesPageReq) => {
  const url = '/sdp-finroyal/web/finance-bill/accessories-page';
  return http.post<Types.IFinanceBillAccessoriesPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 核实账单（子账单）
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4126
 */
export const financeBillSubmitVerifyBill = (params: Types.IFinanceBillSubmitVerifyBillReq) => {
  const url = '/sdp-finroyal/web/finance-bill/submit-verify-bill';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 保存账单（子账单）
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4130
 */
export const financeBillSaveVerifyBill = (params: Types.IFinanceBillSaveVerifyBillReq) => {
  const url = '/sdp-finroyal/web/finance-bill/save-verify-bill';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 日志查询
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/4870
 */
export const finroyalLogPage = (params: Types.IFinroyalLogPageReq) => {
  const url = '/sdp-finroyal/web/finroyal-log/page';
  return http.post<Types.IFinroyalLogPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 总账单导出
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/5086
 */
export const financeTotalBillExport = (params: Types.IFinanceTotalBillExportReq) => {
  const url = `/sdp-finroyal/web/finance-total-bill/export/${params.totalBillId}`;
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: true
  });
};

/**
 * 面料剪版明细导出
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/5066
 */
export const financeBillFabricCuttingExport = (params: Types.IFinanceBillFabricCuttingExportReq) => {
  const url = '/sdp-finroyal/web/finance-bill/fabric-cutting-export';
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: true
  });
};

/**
 * 数码描稿明细导出
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/5070
 */
export const financeBillDigitalCuttingExport = (params: Types.IFinanceBillDigitalCuttingExportReq) => {
  const url = '/sdp-finroyal/web/finance-bill/digital-cutting-export';
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: true
  });
};

/**
 * 3D剪版明细导出
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/5074
 */
export const financeBillThreeDCuttingExport = (params: Types.IFinanceBillThreeDCuttingExportReq) => {
  const url = '/sdp-finroyal/web/finance-bill/three-d-cutting-export';
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: true
  });
};

/**
 * 辅料账单明细导出
 * @see yapi地址：https://yapi.tiangong.site/project/66/interface/api/5078
 */
export const financeBillAccessoriesExport = (params: Types.IFinanceBillAccessoriesExportReq) => {
  const url = '/sdp-finroyal/web/finance-bill/accessories-export';
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: true
  });
};
