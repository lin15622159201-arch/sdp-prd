import http from '@/core/http';
import type * as Types from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/* 数码印花款列表 */
export const getDigitalPrintStyleList = (data: Types.IGetDigitalPrintStyleListReq) => {
  return http.post<Types.IGetDigitalPrintStyleListRes>({
    url: '/sdp-design/web/v1/digital-printing/page',
    loading: true,
    data
  });
};
/* 数码印花款详情 */
export const getDigitalPrintStyleInfo = (data: Types.IGetDigitalPrintStyleInfoReq) => {
  return http.get<Types.IGetDigitalPrintStyleInfoRes>({
    url: `/sdp-design/web/v1/digital-printing/detail/${data.printingPrototypeId}`,
    loading: true,
  });
};

/* 数码印花款失败款重推 */
export const digitalPrintStyleRePush = () => {
  return http.post({
    url: '/sdp-design/web/v1/digital-printing/re-push',
    loading: true,
  });
};
