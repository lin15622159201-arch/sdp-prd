import http from '@/core/http';
import { IImageUpdateDetailRes, IImageUpdateEditReq, IImageUpdatePageReq, IImageUpdatePageRes, IImageUpdateStateTotalReq, IImageUpdateStateTotalRes, IImageUpdateBatchCreateReq, IImageUpdateBatchUploadReq, IImageUpdateBatchCheckReq, IImageUpdateListBySpuReq, IImageUpdateListBySpuRes } from './type';

/**
 * 查询任务列表
 * @see https://yapi.textile-story.com/project/1361/interface/api/103456
 */
export const fetchImageUpdatePage = (params: IImageUpdatePageReq) => {
  return http.post<IImageUpdatePageRes>({
    url: '/sdp-curation/web/v1/image-update/page',
    data: params,
    loading: true,
  });
};

/**
 * 任务详情
 * @param taskId 任务ID
 * @see https://yapi.textile-story.com/project/1361/interface/api/103480
 */
export const fetchImageUpdateDetail = (taskId: string | number) => {
  return http.get<IImageUpdateDetailRes>({
    url: `/sdp-curation/web/v1/image-update/detail/${taskId}`,
    loading: true,
  });
};

/**
 * 查询任务总数
 * @see https://yapi.textile-story.com/project/1361/interface/api/103459
 */
export const fetchImageUpdateStateTotal = (
  params: IImageUpdateStateTotalReq,
) => {
  return http.post<IImageUpdateStateTotalRes>({
    url: '/sdp-curation/web/v1/image-update/state-total',
    data: params,
    loading: true,
  });
};

/**
 * 创建任务
 * @see https://yapi.textile-story.com/project/1361/interface/api/103462
 */
export const fetchImageUpdateBatchCreate = (data: IImageUpdateBatchCreateReq) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/image-update/batch-create',
    loading: true,
    data
  });
};

/**
 * 编辑任务
 * @see https://yapi.textile-story.com/project/1361/interface/api/103465
 */
export const fetchImageUpdateEdit = (data: IImageUpdateEditReq[]) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/image-update/edit',
    loading: true,
    data,
  });
};

/**
 * 上传图片/视频
 * @see https://yapi.textile-story.com/project/1361/interface/api/103588
 */
export const fetchImageUpdateBatchUpload = (data: IImageUpdateBatchUploadReq) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/image-update/batch-upload',
    loading: true,
    data
  });
};

/**
 * 审核任务
 * @see https://yapi.textile-story.com/project/1361/interface/api/103591
 */
export const fetchImageUpdateBatchCheck = (data: IImageUpdateBatchCheckReq) => {
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/image-update/batch-check',
    loading: true,
    data
  });
};

/**
 * 图片更新任务-取消任务
 * @see https://yapi.textile-story.com/project/1361/interface/api/103477
 */
/**
 * 取消图片更新任务的API接口函数
 * @param taskIds - 需要取消的图片更新任务ID数组
 * @returns 返回一个Promise，解析为boolean类型，表示操作是否成功
 */
export const fetchImageUpdateCancel = (taskIds: string[]) => { // 定义取消图片更新任务的导出函数
  return http.post<boolean>({
    url: '/sdp-curation/web/v1/image-update/cancel',
    data: taskIds,
    loading: true,
  });
};

/**
 * 根据spu查找信息
 * @see https://yapi.textile-story.com/project/1361/interface/api/103624
 */
export const fetchImageUpdateListBySpu = (
  params: IImageUpdateListBySpuReq,
) => {
  return http.post<IImageUpdateListBySpuRes>({
    url: '/sdp-curation/web/v1/image-update/select-by-spu',
    data: params,
    loading: true,
  });
};
