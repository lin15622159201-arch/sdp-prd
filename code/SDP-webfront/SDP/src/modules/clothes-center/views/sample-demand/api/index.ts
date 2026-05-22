import http from '@/core/http';
import * as Types from './types';

/**
 * 打版需求汇总-状态统计
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2477
 */
export const stateCount = (params: Types.IRequirementSummaryPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/requirement-summary/state/count';
  return http.post<Types.IStateCountRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 打版需求汇总-分页查询
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2478
 */
export const requirementSummaryPage = (params: Types.IRequirementSummaryPageReq) => {
  const url = '/sdp-sample-clothes/web/v1/requirement-summary/page';
  return http.post<Types.IRequirementSummaryPageRes>({
    url,
    data: params,
    loading: true
  });
};

/**
 * 取消打版需求汇总
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/3661truefalse
 */
export const requirementSummaryCancelSampleClothes = (
  data: Types.IRequirementSummaryCancelSampleClothesReq
) => {
  const url = '/sdp-sample-clothes/web/v1/requirement-summary/cancel-sample-clothes';
  return http.post({
    url,
    data,
    loading: true
  });
};

/**
 * 打版需求汇总各个环节数据数量统计
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/3742falsetrue
 */
export const requirementSummaryStepCount = () => {
  const url = '/sdp-sample-clothes/web/v1/requirement-summary/step-count';
  return http.post<Types.IRequirementSummaryStepCountRes>({
    url,
    loading: true,
    noCancelDuplicate: true,
  });
};

/**
 * 打版需求汇总-获取编辑内容
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2479
 */
export const requirementSummaryOpenEdit = (params: Types.IRequirementSummaryOpenEditReq) => {
  const url = `/sdp-sample-clothes/web/v1/requirement-summary/open-edit/${params.sampleClothesId}`;
  return http.get<Types.IRequirementSummaryOpenEditRes>({
    url,
    loading: true
  });
};

/**
 * 打版需求汇总-编辑需求
 * @see yapi地址：https://yapi.tiangong.site/project/38/interface/api/2480
 */
export const requirementSummaryEdit = (params: Types.IRequirementSummaryEditReq) => {
  const url = '/sdp-sample-clothes/web/v1/requirement-summary/edit';
  return http.post({
    url,
    data: params,
    loading: true
  });
};
