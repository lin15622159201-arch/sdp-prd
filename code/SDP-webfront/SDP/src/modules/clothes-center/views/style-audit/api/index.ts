import http from '@/core/http';
import * as Types from './types';

/**
 * 款式审版_查询列表（分页）
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2532
 */
export const sampleAuditPage = (params: Types.ISampleAuditPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-audit/page';
  return http.post<Types.ISampleAuditPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 联合审版_详情-基础信息
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2101
 */
export const sampleAuditBaseInfo = (params: Types.ISampleAuditBaseInfoReq) => {
  const url = `/sdp-sample-clothes/web/v1/sample-audit/base-info/${params.sampleAuditId}`;
  return http.get<Types.ISampleAuditBaseInfoRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 根据样衣质检单id-获取质检单标签页信息
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2111
 */
export const qcLableInfo = (params: Types.IQcLableInfoReq) => {
  const url = `/sdp-sample-clothes/web/v1/design-common/qc/lable-info/${params.sampleQcId}`;
  return http.get<Types.IQcLableInfoRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 联合审版_通过
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2103
 */
export const sampleAuditPass = (params: Types.ISampleAuditPassReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-audit/pass';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 联合审版_不通过(复版)
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2098
 */
export const sampleAuditNoPass = (params: Types.ISampleAuditNoPassReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-audit/no-pass';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 联合审版_返修
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2102
 */
export const sampleAuditRepair = (params: Types.ISampleAuditRepairReq) => {
  const url = '/sdp-sample-clothes/web/v1/sample-audit/repair';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 根据版单id-获取开发尺寸表标签页信息
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2639
 */
export const patternSize = (params: Types.IPatternSizeReq) => {
  const url = `/sdp-sample-clothes/web/v1/design-common/pattern/size/${params.clothesId}`;
  return http.get<Types.IPatternSizeRes>({
    url,
    data: params,
    loading: true
  });
};
