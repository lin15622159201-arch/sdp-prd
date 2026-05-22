import http from '@/core/http';
import * as Types from './types';

/**
 * 佐糖图片识别分割
 * @see yapi地址：https://yapi.tiangong.site/project/20/interface/api/656
 */
export const segmentationTaskCreate = (params: Types.ISegmentationTaskCreateReq) => {
  const url = '/butted/picwish/segmentation-task/create';
  return http.post<string>({
    url,
    data: params,
    // loading: true,
  });
};

/**
 * 佐糖图片识别任务详情
 * @see yapi地址：https://yapi.tiangong.site/project/20/interface/api/675
 */
export const segmentationTaskDetail = (params: Types.ISegmentationTaskDetailReq) => {
  const url = `/butted/picwish/segmentation-task/detail/${params.taskId}`;
  return http.get<Types.ISegmentationTaskDetailRes>({
    url,
    data: params,
    // loading: true,
  });
};
