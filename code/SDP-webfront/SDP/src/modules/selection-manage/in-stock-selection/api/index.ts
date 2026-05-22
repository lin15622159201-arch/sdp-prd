import http from '@/core/http';
import { IImportBatchReq, IImportBatchRes, ISelectionCancelReq, ISelectionConfirmReq,
  ISelectionDeleteReq, ISelectionDetailRes, ISelectionImportRes, ISelectionPageReq, ISelectionPageRes,
  ISelectionQuoteReq, ISelectionRemarkAddReq,
  ISelectionRemarkCountRes,
  ISelectionRemarkItem, ISelectionSelectingReq,
  ISelectionSelectReq } from './type';
import { IMPORT_TYPE_ENUM } from '../constant';
import { exportByBlob } from '@/core/utils/file-download';
import dayjs from 'dayjs';
import { SYSTEM_ENUM } from '@/core/http/env';

/**
 * 现货选款-导出选款
 * @see https://yapi.tiangong.site/project/93/interface/api/4638
 */
export const selectionExport = (params: ISelectionPageReq) => {
  const url = '/inspiration/web/style-selection/export';
  return exportByBlob({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    method: 'post',
    url,
    filename: `选款数据 ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-分页查询
 * @see https://yapi.tiangong.site/project/93/interface/api/4590
 */
export const selectionPage = (params: ISelectionPageReq) => {
  const url = '/inspiration/web/style-selection/page';
  return http.post<ISelectionPageRes>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-导入选款
 * @see https://yapi.tiangong.site/project/93/interface/api/4586
 */
export const selectionImport = (params: FormData, type:IMPORT_TYPE_ENUM) => {
  const url = `/inspiration/web/style-selection/import/${type}`;
  return http.post<ISelectionImportRes>({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    data: params,
    loading: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * 现货选款-选款中
 * @see https://yapi.tiangong.site/project/93/interface/api/4594
 */
export const selectionPicking = (params:ISelectionSelectingReq) => {
  const url = '/inspiration/web/style-selection/selecting';
  return http.post({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-重新选款
 */
export const selectionRePicking = (params:ISelectionSelectingReq) => {
  const url = '/inspiration/web/style-selection/re-selecting';
  return http.post({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-取消
 * @see https://yapi.tiangong.site/project/93/interface/api/4598
 */
export const selectionCancel = (params:ISelectionCancelReq) => {
  const url = '/inspiration/web/style-selection/cancel';
  return http.post({
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    url,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-选款
 * @see https://yapi.tiangong.site/project/93/interface/api/4602
 */
export const selectionSelect = (params:ISelectionSelectReq) => {
  const url = '/inspiration/web/style-selection/selection';
  return http.post({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-报价
 * @see https://yapi.tiangong.site/project/93/interface/api/4606
 */
export const selectionQuote = (params:ISelectionQuoteReq) => {
  const url = '/inspiration/web/style-selection/quote';
  return http.post({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-确认
 * @see https://yapi.tiangong.site/project/93/interface/api/4610
 */
export const selectionConfirm = (params:ISelectionConfirmReq) => {
  const url = '/inspiration/web/style-selection/confirm';
  return http.post({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    data: params,
    loading: true,
  });
};

/**
 * 现货选款-删除
 * @see https://yapi.tiangong.site/project/93/interface/api/4614
 */
export const selectionDelete = (params:ISelectionDeleteReq) => {
  const url = '/inspiration/web/style-selection/remove';
  return http.post({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    data: params,
  });
};

/**
 * 现货选款-选款详情
 * @see https://yapi.tiangong.site/project/93/interface/api/4622
 */
export const selectionDetail = (styleSelectionId:string) => {
  const url = `/inspiration/web/style-selection/${styleSelectionId}`;
  return http.get<ISelectionDetailRes>({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    loading: true,
  });
};

/**
 * 选款备注-查询
 * @see https://yapi.tiangong.site/project/93/interface/api/4626
 */
export const selectionRemarkList = (styleSelectionId:string) => {
  const url = `/inspiration/web/style-selection/remark/${styleSelectionId}`;
  return http.get<ISelectionRemarkItem[]>({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    loading: true,
  });
};

/**
 * 选款备注-新增
 * @see https://yapi.tiangong.site/project/93/interface/api/4630
 */
export const selectionRemarkAdd = (params:ISelectionRemarkAddReq) => {
  const url = '/inspiration/web/style-selection/remark';
  return http.post({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    loading: true,
    data: params,
  });
};

/**
 * 选款备注-删除
 */
export const selectionRemarkDelete = (data:{ ids:string[]; }) => {
  const url = '/inspiration/web/style-selection/remark-remove';
  return http.post({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    loading: true,
    data,
  });
};

/**
 * 选款备注-选款总数
 */
export const selectionRemarkCount = (params: ISelectionPageReq) => {
  const url = '/inspiration/web/style-selection/total';
  return http.post<ISelectionRemarkCountRes>({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    loading: true,
    data: params,
  });
};

/**
 * 批量导入选款
 * @see https://yapi.tiangong.site/project/93/interface/api/5210
 */
export const importBatch = (params: IImportBatchReq) => {
  const url = '/inspiration/web/style-selection/import/batch';
  return http.post<IImportBatchRes>({
    url,
    server: SYSTEM_ENUM.FASHION_DESIGN_API,
    data: params,
    loading: false,
  });
};
