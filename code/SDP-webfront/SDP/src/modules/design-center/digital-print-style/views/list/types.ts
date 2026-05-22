import { IGetDigitalPrintStyleListReq, IGetDigitalPrintStyleListRes } from '../../api/types';

export type IListItem = IGetDigitalPrintStyleListRes['list'][0] & {
  remark?: string;
};
export type IParams = IGetDigitalPrintStyleListReq;
