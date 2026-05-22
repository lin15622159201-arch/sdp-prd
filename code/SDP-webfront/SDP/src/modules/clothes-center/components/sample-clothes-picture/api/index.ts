import http from '@/core/http';
import type * as Types from './types';

/**
   * 发起 样衣部位规范识别请求任务
   * @see https://yapi.tiangong.site/project/1650/interface/api/9699
   */
export const apiLaunchValidateTask = (params: Types.IReqBodyPoseCheckReq) => {
  const url = '/sdp-sample-clothes/web/v1/ai/req/body_pose_check';
  return http.post<Types.IReqBodyPoseCheckRes>({
    url,
    data: params,
  });
};

/**
   * 获取 样衣部位规范识别结果
   * @see https://yapi.tiangong.site/project/1650/interface/api/9700
   */
export const apiCheckValidateTaskResult = (params: Types.IRespBodyPoseCheckReq) => {
  const url = '/sdp-sample-clothes/web/v1/ai/resp/body_pose_check';
  return http.post<Types.IRespBodyPoseCheckRes>({
    url,
    data: params,
  });
};
