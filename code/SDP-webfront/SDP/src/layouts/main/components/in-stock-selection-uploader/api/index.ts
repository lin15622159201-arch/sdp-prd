import { SYSTEM_ENUM } from '@/core/http/env';

import http from '@/core/http';
import * as Types from './type';

/**
 * 选款批次列表查询
 * @see https://yapi.tiangong.site/project/93/interface/api/5206
 */
export const batchPage = (params: Types.IBatchPageReq) => {
  const url = '/inspiration/web/style-selection/batch/page';
  return http.post<Types.IBatchPageRes>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    data: params,
    loading: false,
  });
};
