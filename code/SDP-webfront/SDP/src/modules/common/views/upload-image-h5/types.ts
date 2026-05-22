import { SOCKET_TYPE_ENUM } from './constant';

interface IErrorRes {
  msgType: SOCKET_TYPE_ENUM.ERROR;
  /**
   * 业务处理异常信息（当msgType=2时，会返回异常信息）
   */
  error: string;
}
interface IHeartBeatRes {
  msgType: SOCKET_TYPE_ENUM.HEART_BEAT;
}
export type ISocketRes = IErrorRes | IHeartBeatRes;

interface IPushFilesRes {
  msgType: SOCKET_TYPE_ENUM.BUSINESS;
  /**
   * 消息体
   */
  data: {
    fileUrlList: string[];
  };
}
interface IHeartBeatReq {
  msgType: SOCKET_TYPE_ENUM.HEART_BEAT;
}

export type ISocketReq = IHeartBeatReq | IPushFilesRes;
