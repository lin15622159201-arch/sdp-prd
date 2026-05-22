import http from '@/core/http';
import * as Types from './type';



/**
 * 保存
 *
 * @params {Types.ImageGroupProblemFeedbackSaveReq} data 保存参数
 * @see https://yapi.textile-story.com/project/1359/interface/api/100048
 * @return {*}
 */
export const imageGroupProblemFeedbackSaveApi = (data: Types.ImageGroupProblemFeedbackSaveReq) => {
  const url = '/sdp-curation/web/v1/picking-style/image-group-problem-feedback/add';

  return http.post<Types.ImageGroupProblemFeedbackSaveRes>({
    url,
    data,
    loading: true,
  });
};
