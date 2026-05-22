import http from '@/core/http';
import type {
  IBatchListReq,
  IBatchListItem,
  IRemarksSaveReq,
  IRemarksSaveRes,
} from './types';

/* 备注信息 */

/* 【设计打版备注信息】新建 */
export const remarksSave = (data: IRemarksSaveReq) => {
  return http.post<IRemarksSaveRes>({
    url: '/sdp-design/web/v1/design/remarks/save',
    data,
    loading: true,
  });
};

/* 【设计打版备注信息】批量查询 */
export const remarksBatchList = (data: IBatchListReq) => {
  return http.post<Record<string, IBatchListItem> & any>({
    url: '/sdp-design/web/v1/design/remarks/batch/list',
    data,
  });
};
