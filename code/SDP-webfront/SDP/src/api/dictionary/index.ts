import http from '@/core/http';
import { IGetDictValueBatchListRes } from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

// 获取字典值 - 批量
export const getDictValueBatchList = (data: string[], loading = false) => {
  const url = '/sys-admin/web/dict/tree-list';
  return http.post<IGetDictValueBatchListRes>({
    server: SYSTEM_ENUM.NEST_API,
    url,
    data: { dictCodes: data, consumerCode: 'SDP' },
    loading
  });
};
