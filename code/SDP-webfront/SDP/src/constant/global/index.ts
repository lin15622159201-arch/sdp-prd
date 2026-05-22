import { systemCode } from '@root/package.json';

/** 角色归属 */
export enum ROLE_TYPE_ENUM {
  /** 外部 */
  OUTER = '1000',
  /** 内部 */
  INNER = '2000',
}

/** 客户端编码 */
export const CURRENT_CLIENT_CODE = systemCode;
// eslint-disable-next-line vue/max-len
export const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZPckRpzEb7PhFMQ+4bXLkUETtCfP+yEFfMYjfGt9DlqW7Rq7zQi0fvEb3dSzuGQxa3MG7D1drx7geSWZwS6EKhWQzT6BStMgd8TsVP7KpHPV8b33dfAk4tCa7Ih3ftLCjPJBGAgp2Fz4qE5k9yjTMqeOGXQjLYjNxCAAApdPkHQIDAQAB';

/** SSO系统编码 */
export const SSO_SYSTEM_CODE = 'SDP';

/*
 * SSO url 返回授权code 字段名称
 * */
export const SSO_AUTHORIZATION_CODE = 'code';

/**
 * 外部系统跳转携带 token 和 tenantId
 */
export const SSO_TOKEN = 'ssoToken';
export const TENANT_ID = 'tenantId';

/**
 * yes / no
 */
export enum YES_NO_ENUM {
  YES = '1',
  NO = '0',
}

export enum YES_NO_NUMBER_ENUM {
  YES = 1,
  NO = 0,
  ALL = -1,
}

export enum YES_NO_STRING_ENUM {
  YES = 'YES',
  NO = 'NO',
}

export const YES_NO_LIST = [
  { value: YES_NO_ENUM.YES, label: '是' },
  { value: YES_NO_ENUM.NO, label: '否' },
];

export const YES_NO_STRING_LIST = [
  { value: YES_NO_STRING_ENUM.YES, label: '是' },
  { value: YES_NO_STRING_ENUM.NO, label: '否' },
];

export const ENABLE_DISABLE_LIST = [
  { value: YES_NO_ENUM.YES, label: '启用' },
  { value: YES_NO_ENUM.NO, label: '禁用' },
];
export const ENABLE_DISABLE_COLOR_LIST = [
  { value: YES_NO_ENUM.YES, label: '启用', color: 'success' },
  { value: YES_NO_ENUM.NO, label: '禁用', color: 'danger' },
];
export const ENABLE_DISABLE_NUMBER_LIST = [
  { value: YES_NO_NUMBER_ENUM.YES, label: '启用', color: 'success' },
  { value: YES_NO_NUMBER_ENUM.NO, label: '禁用', color: 'danger' },
];
export const YES_OR_NO_NUMBER_LIST = [
  { value: YES_NO_NUMBER_ENUM.YES, label: '是' },
  { value: YES_NO_NUMBER_ENUM.NO, label: '否' },
];

export const ENABLE_DISABLE_REVERT_LIST = [
  { value: YES_NO_ENUM.YES, label: '禁用' },
  { value: YES_NO_ENUM.NO, label: '启用' },
];

export const OPEN_CLOSE_LIST = [
  { value: YES_NO_ENUM.YES, label: '已开通' },
  { value: YES_NO_ENUM.NO, label: '未开通' },
];

// 排序枚举
export enum SORT_ORDER_ENUM {
  ASC = 'asc',
  DESC = 'desc'
}

/** 协议CMS */
export enum CMS_KEY_ENUM {
  /** 商品发布规则协议 */
  GOODS_PUBLISH_POLICY = 'fashion_goods_publish_policy',
}

/** 系统弹窗状态 */
export enum DIALOG_STATE_ENUM {
  /** 待发布 */
  UN_PUBLISH = '1',
  /** 已发布 */
  PUBLISH = '2',
  /** 草稿 */
  DRAFT = '0'
}

/** 系统弹窗重复规则 */
export enum RULE_TYPE_ENUM {
  /** 仅一次 */
  ONLY_ONE = '1',
  /** 重复 */
  REPEAT = '2'
}

export const BOOLEAN_LIST = [
  { value: true, label: '是' },
  { value: false, label: '否' },
];

/** 业务类型 */
export enum REMARK_BIZ_TYPE_ENUM {
  /** 采购申请 */
  MATERIAL_PURCHASE = 'MATERIAL_PURCHASE',
  /** 开发bom */
  BOM_ORDER = 'BOM_ORDER',
  /** 物料确认 */
  MATERIAL_CONFIRM = 'MATERIAL_CONFIRM',
  /** 设计拆版 */
  DESIGN_PROTOTYPE = 'DESIGN_PROTOTYPE',
  /** 已取消 */
  CANCELLED = 'CANCELLED',
  /** 物料齐套 */
  ORDER_MATERIAL_FOLLOW = 'ORDER_MATERIAL_FOLLOW',
  /**
   * 7 灵感设计需求
   */
  DESIGN_DEMAND = 'DESIGN_DEMAND',
  /**
   * 8 数码印花
   */
  DIGITAL_PRINTING = 'DIGITAL_PRINTING'
}

/** 暂定城市：广州、杭州 */
export enum REGION_ENUM {
  GUANGZHOU = '4',
  HANGZHOU = '8',
}
export const REGION_LIST = [
  { value: REGION_ENUM.GUANGZHOU, label: '广州' },
  { value: REGION_ENUM.HANGZHOU, label: '杭州' },
];

/**
 * 排序方式枚举 枚举备注: ASC :升序 DESC :降序
 */
export enum SORT_ENUM {
  /** ASC :升序 */
  ASC = 'ASC',
  /**  DESC :降序 */
  DESC = 'DESC',
}

export enum TIME_CONSUMING_TYPE_ENUM {
  MIN = '1',
  HOUR = '2',
  DAY = '3',
}

// 耗时单位选项
export const TIME_CONSUMING_TYPE_LIST = [
  { label: '分钟', value: TIME_CONSUMING_TYPE_ENUM.MIN },
  { label: '小时', value: TIME_CONSUMING_TYPE_ENUM.HOUR },
  { label: '天', value: TIME_CONSUMING_TYPE_ENUM.DAY },
];

/**
 * @description 日期开始的默认时分秒 00:00:00
 */
export const DEFAULT_DATE_TIME_START = '00:00:00';
/**
 * @description 日期结束的默认时分秒 23:59:59
 */
export const DEFAULT_DATE_TIME_END = '23:59:59';
