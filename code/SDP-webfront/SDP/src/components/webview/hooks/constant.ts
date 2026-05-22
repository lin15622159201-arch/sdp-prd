/** 消息类型 */
export enum MESSAGE_EVENT_ENUM {
  /** Http错误 */
  HTTP_ERROR = 'HTTP_ERROR',
  /** 登录 */
  LOGIN = 'LOGIN',
  /** 路由跳转 */
  ROUTER_PUSH = 'ROUTER_PUSH',
  /** 激活菜单更新 */
  UPDATE_ACTIVE_MENU = 'UPDATE_ACTIVE_MENU',
  /**  */
  BLANK_OPEN = 'BLANK_OPEN',
  /** 提交成功 */
  SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
  /** 返回上一页 */
  BACK = 'BACK',
}
