import http from '@/core/http';
import {
  IResultPageReq,
  IResultPageRes,
  IResultDetailRes,
  IResultExportReq,
  ResultExportImageReq,
  ResultExportImageRes,
} from './type';
import { exportByBlob } from '@/core/utils/file-download';

/**
 * 选款结果-分页查询
 * @see https://yapi.tiangong.site/project/39/interface/api/2608
 */
export const resultPage = (params: IResultPageReq) => {
  const url = '/sdp-curation/web/v1/picking-style/result/page';
  return http.post<IResultPageRes>({
    url,
    data: params,
    loading: true,
  });
};

/**
 * 选款结果-详情
 * @see https://yapi.tiangong.site/project/39/interface/api/2609
 */
export const resultDetail = (pickingResultId: string) => {
  const url = `/sdp-curation/web/v1/picking-style/result/detail/${pickingResultId}`;
  return http.post<IResultDetailRes>({
    url,
    loading: true,
  });
};

/**
 * 导出修图数据
 * @see https://yapi.tiangong.site/project/39/interface/api/3142
 */
export const resultExport = (params: IResultExportReq) => {
  const url = '/sdp-curation/web/v1/picking-style/result/export';
  return exportByBlob({
    method: 'post',
    url,
    data: params,
    loading: false,
  });
};


/**
 * 导出选款结果图片
 *
 * @params {Types.ResultExportImageReq} data 导出选款结果图片参数
 * @see https://yapi.textile-story.com/project/1361/interface/api/100639
 * @return {*}
 */
export const resultExportImageApi = (data: ResultExportImageReq) => {
  const url = '/sdp-curation/web/v1/picking-style/result/export-image';

  return http.post<ResultExportImageRes>({
    url,
    data,
    loading: true,
  });
};
