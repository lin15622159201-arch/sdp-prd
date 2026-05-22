import http from '@/core/http';
import type {
  IRoomEditionFeePageReq,
  IRoomEditionFeePageRes,
  IAddFeeReq,
  IEditFeeReq,
  IRoomEditionFeeChangeStatusReq,
} from './type';
import { SYSTEM_ENUM } from '@/core/http/env';

export const getEditionFee = (data: IRoomEditionFeePageReq) => {
  const url = '/sdp-clothing-material/external/room-edition-fee/page';
  return http.post<IRoomEditionFeePageRes>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
  });
};

export const addEditionFee = (data: IAddFeeReq) => {
  const url = '/sdp-clothing-material/external/room-edition-fee';
  return http.post<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const editEditionFee = (data: IEditFeeReq) => {
  const url = '/sdp-clothing-material/external/room-edition-fee';
  return http.put<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};

export const changeEditionFeeState = (data: IRoomEditionFeeChangeStatusReq) => {
  const url = '/sdp-clothing-material/external/room-edition-fee/change-status';
  return http.put<null>({
    server: SYSTEM_ENUM.OLA_API,
    url,
    data,
    loading: true,
  });
};
