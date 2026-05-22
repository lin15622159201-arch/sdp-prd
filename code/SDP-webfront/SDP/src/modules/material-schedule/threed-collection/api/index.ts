import http from '@/core/http';
import type * as Types from './types';

/**
 * 分页查询同步的3D采集任务
 * @see https://yapi.tiangong.site/project/37/interface/api/3798
 */
export const dimensionGleanQueryByPage = (
  params: Types.IDimensionGleanQueryByPageReq
) => {
  const url = '/sdp-design/web/v1/dimension-glean/queryByPage';
  return http.post<Types.IDimensionGleanQueryByPageRes>({
    url,
    data: params,
    noCancelDuplicate: true,
  });
};

/**
 * 按采集任务状态统计3D采集任务数量
 * @see https://yapi.tiangong.site/project/37/interface/api/3910
 */
export const dimensionGleanCountByState = () => {
  const url = '/sdp-design/web/v1/dimension-glean/count-by-state';
  return http.post<Types.IDimensionGleanCountByStateItem[]>({
    url,
    noCancelDuplicate: true,
  });
};
