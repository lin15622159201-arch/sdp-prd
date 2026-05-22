import http from '@/core/http';
import * as Types from './type';
import { CancelToken } from 'axios';

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

/**
 * 创建
 * @see https://yapi.tiangong.site/project/20/interface/api/563
 */
export const watermarkCreate = (params: Types.IWatermarkCreateReq) => {
  const url = '/butted/picwish/watermark/create';
  return http.post<Types.IWatermarkCreateRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 详情
 * @see https://yapi.tiangong.site/project/20/interface/api/564
 */
export const getPicwishWatermarkDetail = (taskId: string, loading = true, cancelToken?: CancelToken) => {
  const url = `/butted/picwish/watermark/${taskId}`;
  return http.get<Types.IPicwishWatermarkRes>({
    url,
    loading,
    cancelToken,
  });
};
