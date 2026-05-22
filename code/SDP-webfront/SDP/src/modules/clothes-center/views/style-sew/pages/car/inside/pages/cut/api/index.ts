import http from '@/core/http';
import * as Types from './types';

/**
 * 内部处理-裁剪完成(关联裁剪师)
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2462
 */
export const sewAssignCutter = (params: Types.ISewAssignCutterReq) => {
  const url = '/sdp-sample-clothes/web/v1/sew/assign-cutter';
  return http.post({
    url,
    data: params,
    loading: true
  });
};
