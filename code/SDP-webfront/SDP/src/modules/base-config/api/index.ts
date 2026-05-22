import http from '@/core/http';
import type { IOperationLog } from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

export const getOperationLog = (data: IOperationLog) => {
  const url = '/sdp-clothing-material/dataOperationLog/data-list';
  return http.post({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};
