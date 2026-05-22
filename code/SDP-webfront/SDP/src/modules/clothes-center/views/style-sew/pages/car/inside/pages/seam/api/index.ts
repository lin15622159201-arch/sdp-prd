import http from '@/core/http';
import * as Types from './types';

/**
 * 内部处理-车缝-车缝完成
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2468
 */
export const sewFinish = (params: Types.ISewFinishReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/finish';
  return http.put({
    url,
    data: params,
    loading: true
  });
};

/**
 * 内部处理-车缝-开始车缝(关联车缝师)
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2465
 */
export const sewAssignSewer = (params: Types.ISewAssignSewerReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/assign-sewer';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 内部处理-车缝-排单变更
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2466
 */
export const sewChgSewer = (params: Types.ISewChgSewerReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/chg-sewer';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 内部处理-车缝详情
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2467
 */
export const v1Sew = (params: Types.IV1SewReq) => {
  const url = `/sdp-sample-clothes/web/v1/sew/${params.sewId}`;
  return http.get<Types.IV1SewRes>({
    url,
    data: params,
    loading: true
  });
};
