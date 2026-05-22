import { DOMAIN_SYSTEM_ENUM } from '@toy/utils';
import { MESSAGE_EVENT_ENUM } from './constant';

/** Http错误事件 */
export interface IHttpErrorEvent {
  type: MESSAGE_EVENT_ENUM.HTTP_ERROR;
  data: {
    code: string;
    message: string;
  };
}

/** 登陆事件 */
export interface ILoginEvent {
  type: MESSAGE_EVENT_ENUM.LOGIN;
}

/** 路由跳转事件 */
export interface IRouterPushEvent {
  type: MESSAGE_EVENT_ENUM.ROUTER_PUSH;
  data: {
    path: string;
    domain: DOMAIN_SYSTEM_ENUM;
    query?: {
      [key: string]: string;
    };
    params?: {
      [key: string]: string;
    };
  };
}

/** 更新激活路由事件 */
export interface IUpdateActiveMenuEvent {
  type: MESSAGE_EVENT_ENUM.UPDATE_ACTIVE_MENU;
  data: {
    path: string;
  };
}
/** 路由跳转事件 */
export interface IBlankOpenEvent {
  type: MESSAGE_EVENT_ENUM.BLANK_OPEN;
  data: {
    query: any;
    path: string;
    domain: string;
    activeMenu?: string;
    isNoBlank?: boolean;
  };
}

export type IMessageEvent = MessageEvent<
IHttpErrorEvent | ILoginEvent | IRouterPushEvent | IUpdateActiveMenuEvent | IBlankOpenEvent>;

/** 登录事件请求体 */
export interface ILoginReq {
  type: MESSAGE_EVENT_ENUM.LOGIN;
  data: {
    ssoToken: string;
    /** 业务系统token */
    saasToken: string;
    /** 租户id */
    tenantId: string;
    /** 系统编码 */
    systemCode: string;
    /** 按钮权限 */
    authButtonList: string;
    /*
    * 租户信息列表
    * */
    companyInfoList: string;
    /** 用户id */
    userId: string;
    /** 用户名 */
    username: string;
  };
}

export type ISendMessage = ILoginReq;
