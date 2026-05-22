import http from '@/core/http';
import {
  IPickingStylePageReq,
  IPickingStylePageRes,
  IPickingStyleCountStatusReq,
  IPickingStyleCountStatusRes,
  IPickingStyleConfirmReq,
  IPickingStyleHistoryItem,
  IPickingStyleConfirmBatchReq,
  IPickingStyleImportRes,
  IBatchConfirmReq,
  IBatchConfirmRes,
  PickingStyleBatchConfirmReq,
  PickingStyleBatchConfirmRes,
  PickingStyleDesignTaskRes,
  SmartDevelopStyleDetailRes,
  ByIdRes,
} from './type';
import { exportByBlob } from '@/core/utils/file-download';

/**
 * 选款任务分页查询
 * @see https://yapi.textile-story.com/project/1361/interface/api/100603
 */
export const pickingStylePage = (params: IPickingStylePageReq) => {
  const url = '/sdp-curation/web/v1/picking-style/page';
  return http.post<IPickingStylePageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 查询当前版本选中/未选中数量
 * @see https://yapi.textile-story.com/project/1058/interface/api/78908
 */
export const pickingStyleCountStatus = (params: IPickingStyleCountStatusReq) => {
  const url = '/sdp-curation/web/v1/picking-style/count-status';
  return http.post<IPickingStyleCountStatusRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 确认选款
 * @see https://yapi.textile-story.com/project/1058/interface/api/79556
 */
export const pickingStyleConfirm = (params: IPickingStyleConfirmReq) => {
  const url = '/sdp-curation/web/v1/picking-style/confirm';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 获取选图历史记录
 * @see https://yapi.textile-story.com/project/1058/interface/api/78916
 */
export const pickingStyleHistory = (pickingStyleId: string) => {
  const url = `/sdp-curation/web/v1/picking-style/history/${pickingStyleId}`;
  return http.get<IPickingStyleHistoryItem[]>({
    url,
    loading: true,
  });
};

/**
 * 批量确认选款样式
 * @see https://yapi.textile-story.com/project/1058/interface/api/78820
 */
export const pickingStyleConfirmBatch = (params: IPickingStyleConfirmBatchReq) => {
  const url = '/sdp-curation/web/v1/picking-style/confirm-batch';
  return http.post({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 导入选款列表外部数据
 * @see https://yapi.textile-story.com/project/1058/interface/api/78812
 */
export const pickingStyleImport = (data: FormData) => {
  const url = '/sdp-curation/web/v1/picking-style/import';
  return http.post<IPickingStyleImportRes>({
    url,
    data,
    loading: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};

/**
 * 查询供给落坑数
 * @see https://yapi.tiangong.site/project/39/interface/api/2989
 */
export const batchConfirm = (params: IBatchConfirmReq) => {
  const url = '/sdp-curation/web/v1/picking-style/get/total/supply';
  return http.post<IBatchConfirmRes>({
    url,
    data: params,
    loading: false,
  });
};

/**
 * 导出数据
 */
export const pickingStyleExport = (params: IPickingStylePageReq) => {
  const url = '/sdp-curation/web/v1/picking-style/AIGC/export';
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: true
  });
};

/**
 * 批量确认选款 v4.1
 *
 * @params {Types.PickingStyleBatchConfirmReq} data 批量确认选款 v4.1参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/100615
 * @return {*}
 */
export const pickingStyleBatchConfirmApi = (data: PickingStyleBatchConfirmReq) => {
  const url = '/sdp-curation/web/v1/picking-style/batch-confirm';

  return http.post<PickingStyleBatchConfirmRes>({
    url,
    data,
    loading: true,
  });
};

/**
 * 获取ai任务
 *
 * @params {string} taskId 
 * @see https://yapi.textile-story.com/project/1361/interface/api/100663
 * @return {*}
 */
export const pickingStyleDesignTaskApi = (taskId: string) => {
  const url = `/sdp-curation/web/v1/picking-style/design-task/${taskId}`;

  return http.get<PickingStyleDesignTaskRes>({
    url,
    loading: true,
  });
};

/**
 * 根据ID查询姿势列表详情
 *
 * @params {string} taskId 任务ID
 * @see https://yapi.textile-story.com/project/1359/interface/api/101311
 * @return {*}
 */
export const byIdApi = (taskId: string) => {
  const url = `/inspiration/frontend/web/task/posture-fission-task/detail/by/id/${taskId}`;

  return http.get<ByIdRes>({
    url,
    loading: true,
  });
};

/**
 * admin-智能开款-查询任务详情
 *
 * @params {string} taskCode 任务编号
 * @see https://yapi.textile-story.com/project/1359/interface/api/100675
 * @return {*}
 */
export const smartDevelopStyleDetailApi = (taskCode: string) => {
  const url = `/inspiration/managed/web/task/smart-develop-style/detail/${taskCode}`;

  return http.post<SmartDevelopStyleDetailRes>({
    url,
    loading: true,
  });
};
