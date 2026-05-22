import { SYSTEM_ENUM } from '@/core/http/env';
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
    domain: SYSTEM_ENUM;
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

/** 提交成功事件 */
export interface ISubmitSuccessEvent {
  type: MESSAGE_EVENT_ENUM.SUBMIT_SUCCESS;
  data: {};
}

/** 返回事件 */
export interface IBackEvent {
  type: MESSAGE_EVENT_ENUM.BACK;
  data: {};
}

export type IMessageEvent = MessageEvent<
IHttpErrorEvent | ILoginEvent | IRouterPushEvent | IUpdateActiveMenuEvent | IBlankOpenEvent
| ISubmitSuccessEvent | IBackEvent>;

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

/** 路由跳转事件 */
export interface IBlankOpenEvent {
  type: MESSAGE_EVENT_ENUM.BLANK_OPEN;
  data: {
    path: string;
    query?: {
      [key: string]: string;
    };
    params?: {
      [key: string]: string;
    };
  };
}

export type ISendMessage = ILoginReq;

export type ComponentEmit = {
  (e: 'router-push', data: any): void;
  (e: 'blank-open', data: any): void;
  (e: 'submit-success', data: any): void;
  (e: 'back', data: any): void;
};
