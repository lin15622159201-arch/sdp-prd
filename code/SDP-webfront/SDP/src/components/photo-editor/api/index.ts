import http from '@/core/http';
import * as Types from './type';

/**
 * 创建分割图
 * @see https://yapi.tiangong.site/project/519/interface/api/28031
 */
export const createSplitTaskApi = (params: Types.IV1CreateSplitTaskReq) => {
  const url = '/aigc-server/web/v1/create-split-task';
  return http.post<Types.IV1CreateSplitTaskRes>({
    url,
    data: params,
    loading: false,
  });
};
