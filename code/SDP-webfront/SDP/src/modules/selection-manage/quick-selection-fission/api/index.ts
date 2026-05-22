import http from '@/core/http';
import { IFloralPatternApplyTaskDetailRes, WebVirtualTryonRes } from './type';

/**
 * 详情
 * @param taskId
 * @see https://yapi.textile-story.com/project/1359/interface/api/101467
 */
export const fetchFloralPatternApplyTaskDetail = (
  taskId: string | number,
) => {
  return http.get<IFloralPatternApplyTaskDetailRes>({
    url: `/inspiration/web/floral-pattern-apply-task/detail/${taskId}`,
    loading: true,
  });
};

/**
 * 任务详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101155
 * @return {*}
 */
export const webStyleGenApi = (taskId: string) => {
  const url = `/inspiration/web/v1/virtual-tryon/${taskId}`;

  return http.get<WebVirtualTryonRes>({
    url,
    loading: true,
  });
};
