import { SYSTEM_ENUM } from '@/core/http/env';
import * as Types from './type';
import http from '@/core/http';

/**
 * 我的队列
 * @see https://yapi.tiangong.site/project/20/interface/api/668
 */
export const getMyProcessingTaskList = () => {
  const url = '/butted/web/task-queue/myself/processing/list';
  return http.get<Types.IProcessingListRes>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    loading: false,
    showErrorMessage: false,
  });
};

/**
 * 我的完成队列
 * @see https://yapi.tiangong.site/project/20/interface/api/669
 */
export const getMyCompletedTaskList = () => {
  const url = '/butted/web/task-queue/myself/completed/list';
  return http.get<Types.ICompletedListItem[]>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    loading: false,
    showErrorMessage: false,
  });
};
