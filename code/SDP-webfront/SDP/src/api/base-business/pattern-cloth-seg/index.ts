import http from '@/core/http';
import type { IPatternClothSegCreateReq, IPatternClothSegCreateRes, IPatternClothSegDetailRes } from './type';

/**
 * 花型服装分割任务-创建
 * @see https://yapi.textile-story.com/project/1363/interface/api/103138
 */
export const fetchPatternClothSegCreate = (
  params: IPatternClothSegCreateReq,
) => {
  return http.post<IPatternClothSegCreateRes>({
    url: '/butted/web/pattern-cloth-seg/create',
    data: params,
    loading: false,
  });
};

/**
 * 花型服装分割任务-详情
 * @param taskId 任务ID
 * @see https://yapi.textile-story.com/project/1363/interface/api/103135
 */
export const fetchPatternClothSegDetail = (taskId: string | number) => {
  return http.get<IPatternClothSegDetailRes>({
    url: `/butted/web/pattern-cloth-seg/${taskId}`,
    loading: false,
  });
};
