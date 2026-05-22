import http from '@/core/http';
import type {
  IDesignerGroupDataListReq,
  IDesignerGroupDataListRes,
  IDesignerGroupDeleteRes,
  IDesignerGroupSaveReq,
  IDesignerGroupUpdateReq,
  IDesignerGroupUpdateRes,
  IDesignerPageReq,
  IDesignerPageRes,
  IDesignerSaveReq,
  IDesignerDeleteRes,
  IDesignerTransferReq,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

export const saveGroup = (data: IDesignerGroupSaveReq) => {
  const url = '/sdp-clothing-material/clothes/designer-group/save';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const deleteGroup = (data: { id: string; }) => {
  const url = '/sdp-clothing-material/clothes/designer-group/delete';
  return http.delete<IDesignerGroupDeleteRes>({
    url,
    params: data,
    loading: true,
  });
};

export const updateGroup = (data: IDesignerGroupUpdateReq) => {
  const url = '/sdp-clothing-material/clothes/designer-group/update';
  return http.post<IDesignerGroupUpdateRes>({
    url,
    data,
    loading: true,
  });
};

export const getGroupList = (data: IDesignerGroupDataListReq) => {
  const url = '/sdp-clothing-material/clothes/designer-group/data-list';
  return http.post<IDesignerGroupDataListRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const getDesignerList = (data: IDesignerPageReq) => {
  const url = '/sdp-clothing-material/clothes/designer/page';
  return http.post<IDesignerPageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const designerSave = (data: IDesignerSaveReq) => {
  const url = '/sdp-clothing-material/clothes/designer/save';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const designerDelete = (data: { id: string; }) => {
  const url = '/sdp-clothing-material/clothes/designer/delete';
  return http.delete<IDesignerDeleteRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    params: data,
  });
};

export const designerTransfer = (data: IDesignerTransferReq) => {
  const url = '/sdp-clothing-material/clothes/designer/transfer';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};
