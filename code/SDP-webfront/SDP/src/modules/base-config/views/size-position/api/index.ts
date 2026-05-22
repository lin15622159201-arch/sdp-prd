import http from '@/core/http';
import type {
  IClothesPartsSizePageReq,
  IClothesPartsSizePageRes,
  IAddSizeReq,
  IEditSizeReq,
  IClothesPartsSizeChangeStatusReq,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

export const getClothesPartSize = (data: IClothesPartsSizePageReq) => {
  const url = '/sdp-clothing-material/clothes-parts-size/page';
  return http.post<IClothesPartsSizePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const addClotheSize = (data: IAddSizeReq) => {
  const url = '/sdp-clothing-material/clothes-parts-size';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const editClotheSize = (data: IEditSizeReq) => {
  const url = '/sdp-clothing-material/clothes-parts-size';
  return http.put<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const changeStatus = (data: IClothesPartsSizeChangeStatusReq) => {
  const url = '/sdp-clothing-material/clothes-parts-size/change-status';
  return http.put({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
