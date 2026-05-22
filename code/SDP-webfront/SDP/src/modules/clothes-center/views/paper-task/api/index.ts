import http from '@/core/http';
import * as Types from './types';

/**
 * 查询分单列表
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2486
 */
export const allocatePage = (params: Types.IAllocatePageReq) => {
  const url = '/sdp-sample-clothes/web/v1/pattern-clothes/allocate/page';
  return http.post<Types.IAllocatePageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 纸样分单
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2487
 */
export const patternClothesAllocate = (params: Types.IPatternClothesAllocateReq) => {
  const url = '/sdp-sample-clothes/web/v1/pattern-clothes/allocate';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 撤回分单（纸样
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2840
 */
export const patternClothesWithdraw = (params: Types.IPatternClothesWithdrawReq) => {
  const url = '/sdp-sample-clothes/web/v1/pattern-clothes/withdraw';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 任务转交（排班变更）
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2491
 */
export const patternClothesChangeMaker = (params: Types.IPatternClothesChangeMakerReq) => {
  const url = '/sdp-sample-clothes/web/v1/pattern-clothes/change-maker';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 获取样衣打版弹窗二次工艺信息维护信息
 * @see yapi地址：hthttps://yapi.tiangong.site/project/38/interface/api/3041
 */
export const patternClothesCraft = (params: Types.IPatternClothesCraftReq) => {
  const url = `/sdp-sample-clothes/web/v1/pattern-clothes/get-undetermined-craft/${params.patternId}`;
  return http.get<Types.IPatternClothesCraftRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 提交纸样
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2492
 */
export const patternClothesConfirm = (params: Types.IPatternClothesConfirmReq) => {
  const url = '/sdp-sample-clothes/web/v1/pattern-clothes/confirm';
  return http.post({
    url,
    data: params,
    loading: true
  });
};

/**
 * 查询纸样列表
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2820
 */
export const patternClothesQueryByPage = (params: Types.IPatternClothesQueryByPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/pattern-clothes/query-by-page';
  return http.post<Types.IPatternClothesQueryByPageRes>({
    url,
    data: params,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 根据纸样ID查询纸样详情
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2856
 */
export const patternClothesDetail = (params: Types.IPatternClothesDetailReq) => {
  const url = `/sdp-sample-clothes/web/v1/pattern-clothes/detail/${params.patternId}`;
  return http.get<Types.IPatternClothesDetailRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 根据款式编码查询最新审版通过的纸样详情
 * @see https://yapi.tiangong.site/project/38/interface/api/3130
 */
export const patternClothesGetLatestPassAuditPatternByStyleCode = (
  styleCode: string
) => {
  const url = `/sdp-sample-clothes/web/v1/pattern-clothes/get-latest-pass-audit-pattern-by-style-code/${styleCode}`;
  return http.get<Types.IPatternClothesGetLatestPassAuditPatternByStyleCodeRes>({
    url,
    loading: true,
  });
};
