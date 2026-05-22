import http from '@/core/http';
import * as Types from './type';
import { CancelToken } from 'axios';

/**
 * TryOn任务详情
 * @see https://yapi.textile-story.com/project/699/interface/api/80076
 */
export const getWebTryOnTaskDetail = (subtaskId: string, loading = false, cancelToken?: CancelToken) => {
  const url = `/aigc-server/web/try-on-task/${subtaskId}`;
  return http.get<Types.IWebTryOnTaskRes>({
    cancelToken,
    url,
    loading,
  });
};
