import http from '@/core/http';
import type {
  IBatchListReq,
  IBatchListItem,
  IBizListReq,
  IBizList0Item,
} from './types';

/* 【设计打版备注信息】批量查询 */
export const remarksBatchList = (data: IBatchListReq) => {
  return http.post<Record<string, IBatchListItem> & any>({
    url: '/sdp-design/web/v1/design/remarks/batch/list',
    data,
  });
};

/* 【设计打版备注信息】 批量查询 根据业务主键进行查询 */
export const remarksBatchBizList = (data: IBizListReq) => {
  return http.post<Record<string, IBizList0Item> & any>({
    url: '/sdp-design/web/v1/design/remarks/batch/biz/list',
    data,
  });
};

/* 【开款备注信息】 批量查询 根据业务主键进行查询 */
export const remarksBatchBizToTypeList = (data: string[]) => {
  return http.post<Record<string, IBizList0Item> & any>({
    url: '/sdp-curation/web/v1/develop-style/list-remark',
    data,
  });
};
