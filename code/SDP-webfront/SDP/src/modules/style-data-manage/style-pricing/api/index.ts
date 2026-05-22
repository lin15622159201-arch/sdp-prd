import http from '@/core/http';
import * as Types from './types';
import { exportByBlob } from '@/core/utils/file-download';

/**
 * 样衣核价查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2797
 */
export const checkPricePage = (params: Types.ICheckPricePageReq) => {
  const url = '/sdp-sample-clothes/web/v1/check-price/page';
  return http.post<Types.ICheckPricePageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 统计状态数量
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2849
 */
export const estimateCheckPriceCountState = () => {
  const url = '/sdp-sample-clothes/web/v1/estimate-check-price/count-state';
  return http.get<Types.IEstimateCheckPriceCountStateRes>({
    url,
    loading: true
  });
};
/**
 * 统计状态数量
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2849
 */
export const CheckPriceCountState = () => {
  const url = '/sdp-sample-clothes/web/v1/check-price/count-state';
  return http.get<Types.IEstimateCheckPriceCountStateRes>({
    url,
    loading: true
  });
};

/**
 * 样衣核价详情
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2798
 */
export const checkPriceDetail = (params: Types.ICheckPriceDetailReq) => {
  const url = '/sdp-sample-clothes/web/v1/check-price/detail';
  return http.get<Types.ICheckPriceDetailRes>({
    url,
    params,
    loading: true
  });
};

/**
 * 询价
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2800
 */
export const checkPriceInquiryPrice = (params: Types.ICheckPriceInquiryPriceReq) => {
  const url = '/sdp-sample-clothes/web/v1/check-price/inquiry-price';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 核价完成
 * @see yapi地址：https://yapi.tiangong.site/project/37/interface/api/2799
 */
export const checkPriceSave = (params: Types.ICheckPriceSaveReq) => {
  const url = '/sdp-sample-clothes/web/v1/check-price/save';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 导出报价单
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/4014
 */
export const checkPriceExportBill = (params: Types.ICheckPriceExportBillReq) => {
  const url = '/sdp-sample-clothes/web/v1/check-price/export-bill';
  return exportByBlob({
    method: 'get',
    url,
    params,
    loading: false,
  });
};

/**
 * 加工其他费用暂存
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/5302
 */
export const checkPriceSaveTemporarily = (params: Types.ICheckPriceSaveTemporarilyReq) => {
  const url = '/sdp-sample-clothes/web/v1/check-price/save-temporarily';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 通过SPU查询加工其他费用
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/5314
 */
export const checkPriceGetProcessOtherByStyleCode = (
  params: Types.ICheckPriceGetProcessOtherByStyleCodeReq
) => {
  const url = `/sdp-sample-clothes/web/v1/check-price/get-process-other-by-style-code/${params.styleCode}`;
  return http.get<Types.ICheckPriceGetProcessOtherByStyleCodeRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 下载原纸样
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/5394
 */
export const checkPricePatternDownload = (params: Types.ICheckPricePatternDownloadReq) => {
  const url = `/sdp-sample-clothes/web/v1/check-price/pattern-download/${params.styleCode}/${params.designCode}`;
  return http.get<Types.ICheckPricePatternDownloadRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 查询所有的版本
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/5402
 */
export const checkPriceGetVersions = (params: Types.ICheckPriceGetVersionsReq) => {
  const url = `/sdp-sample-clothes/web/v1/check-price/get-versions/${params.designCode}`;
  return http.get<Types.ICheckPriceGetVersionsRes>({
    url,
    data: params,
    loading: true
  });
};
