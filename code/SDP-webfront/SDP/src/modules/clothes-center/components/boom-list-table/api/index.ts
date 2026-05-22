import http from '@/core/http';
import * as Types from './types';
/**
 * 获取Spu下正常款的最新bom详情信息
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/5282
 */
export const bomSpuNormalSkc = (params: Types.IBomSpuNormalSkcReq) => {
  const url = `/sdp-sample-clothes/web/v1/design-common/bom/spu-normal-skc/${params.styleCode}`;
  return http.get<Types.IBomSpuNormalSkcRes>({
    url,
    loading: true
  });
};
