import http from '@/core/http';
import type * as Types from './types';
import {
  IBomQuoteSkcRes,
} from './usable-quote-design-code-types';
import {
  IQuoteSkcDetailLatestReq,
  IQuoteSkcDetailLatestRes,
} from './quote-design-code-material-list-types';
/**
 * bom提交V3
 */
export const actionBomSubmit = (data: Types.ISubmitV3Req) => {
  return http.post<Types.ISubmitV3Res>({
    url: '/sdp-design/web/v1/bom/submit',
    data,
    loading: true,
  });
};

/**
 * 查询bom单可引用的skc
 */
export const fetchUsableQuoteDesignCode = (bomId: string) => {
  return http.get<IBomQuoteSkcRes>({
    url: '/sdp-design/web/v1/bom/quote-skc',
    params: {
      bomId,
    },
    loading: true,
  });
};

/**
 * 查询引用款的最新Bom详情
 */
export const fetchQuoteDesignCodeMaterialList = (data: IQuoteSkcDetailLatestReq) => {
  return http.post<IQuoteSkcDetailLatestRes>({
    url: '/sdp-design/web/v1/bom/quote-skc/detail-latest',
    data,
    loading: true,
  });
};
