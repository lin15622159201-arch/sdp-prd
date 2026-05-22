import http from '@/core/http';
import { IDesignerGroupDataListReq, IDesignerGroupDataListRes, IDesignerListReq, IDesignerListRes } from './types';
import { SYSTEM_ENUM } from '@/core/http/env';

/* 【设计组别】查询列表（非分页接口） */
export const desigGroupDataList = (data: IDesignerGroupDataListReq) => {
  return http.post<IDesignerGroupDataListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/clothes/designer-group/data-list',
    data,
    noCancelDuplicate: true,
  });
};

/* 【设计师】查询列表（非分页接口） */
export const designerUserList = (data: IDesignerListReq) => {
  return http.post<IDesignerListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url: '/sdp-clothing-material/clothes/designer/list',
    data,
    noCancelDuplicate: true,
  });
};
