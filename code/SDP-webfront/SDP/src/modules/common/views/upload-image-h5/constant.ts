/* 推送类型 */
export enum SOCKET_TYPE_ENUM {
  /** 心跳 */
  HEART_BEAT = 0,
  /** 业务数据 */
  BUSINESS = 1,
  /** 业务异常 */
  ERROR = 2,
}
