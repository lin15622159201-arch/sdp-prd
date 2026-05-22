/**
 * @description: 数码描稿任务状态
 */
export enum DIGITAL_DRAFT_TASK_STATUS_ENUM {
  ALL = '',
  /**
   * @description: 待下单
   */
  WAIT_ORDER = '0',
  /**
   * @description: 待接单
   */
  WAIT_RECEIVE = '1',
  /**
   * @description: 描稿中
   */
  DRAFTING = '2',
  /**
   * @description: 已寄出
   */
  SEND = '3',
  /**
   * @description: 已驳回
   */
  REJECTED = '4',
  /**
   * @description: 已完成
   */
  COMPLETED = '5',
  /**
   * @description: 已取消
   */
  CANCELLED = '6',
}
// 数码描稿任务状态列表
export const DIGITAL_DRAFT_TASK_STATUS_LIST = [
  {
    label: '全部',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.ALL,
    count: '0',
  },
  {
    label: '待下单',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_ORDER,
    count: '0',
  },
  {
    label: '待接单',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.WAIT_RECEIVE,
    count: '0',
  },
  {
    label: '描稿中',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.DRAFTING,
    count: '0',
  },
  {
    label: '已寄出',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.SEND,
    count: '0',
  },
  {
    label: '已驳回',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.REJECTED,
    count: '0',
  },
  {
    label: '已完成',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.COMPLETED,
    count: '0',
  },
  {
    label: '已取消',
    value: DIGITAL_DRAFT_TASK_STATUS_ENUM.CANCELLED,
    count: '0',
  },
];

// 3D任务状态
export enum THREE_D_TASK_STATUS_ENUM {
  ALL = '',
  /**
   * @description: 待下单
   */
  WAIT_ORDER = '1010',
  /**
   * @description: 待处理
   */
  WAIT_HANDLE = '1030',
  /**
   * @description: 已签收
   */
  SIGNED = '1070',
  /**
   * @description: 取消中
   */
  CANCELLED = '1080',
  /**
   * @description: 已关闭
   */
  CLOSED = '1110',
}
export const THREED_TASK_STATUS_LIST = [
  {
    label: '待开单',
    value: THREE_D_TASK_STATUS_ENUM.WAIT_ORDER,
  },
  {
    label: '待处理',
    value: THREE_D_TASK_STATUS_ENUM.WAIT_HANDLE,
  },
  {
    label: '已签收',
    value: THREE_D_TASK_STATUS_ENUM.SIGNED,
  },
  {
    label: '取消中',
    value: THREE_D_TASK_STATUS_ENUM.CANCELLED,
  },
  {
    label: '已关闭',
    value: THREE_D_TASK_STATUS_ENUM.CLOSED,
  },
];

// 面料剪版任务状态
export enum FABRIC_CUTTING_TASK_STATUS_ENUM {
  COMPLETED = '1100', // （已完成）
}
export const FABRIC_CUTTING_TASK_STATUS_LIST = [
  {
    label: '已完成',
    value: FABRIC_CUTTING_TASK_STATUS_ENUM.COMPLETED,
  },
];
// 辅料任务状态
export enum ACCESSORIES_TASK_TASK_STATUS_ENUM {
  /** 待流转 */
  WAIT_ORDER = '30',

  /** 待开单 */
  WAIT_INVOICE = '90',

  /** 待发货 */
  WAIT_SHIPMENT = '100',

  /** 待拣料 */
  WAIT_PICKING = '105',

  /** 待提货 */
  WAIT_PICKUP = '110',

  /** 待签收 */
  WAIT_RECEIPT = '120',

  /** 已完成 */
  FINISHED = '130',

  /** 已取消 */
  CANCELED = '190',
}
export const ACCESSORIES_TASK_STATUS_LIST = [
  {
    label: '待流转',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.WAIT_ORDER,
  },
  {
    label: '待开单',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.WAIT_INVOICE,
  },
  {
    label: '待发货',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.WAIT_SHIPMENT,
  },
  {
    label: '待拣料',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.WAIT_PICKING,
  },
  {
    label: '待提货',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.WAIT_PICKUP,
  },
  {
    label: '待签收',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.WAIT_RECEIPT,
  },
  {
    label: '已完成',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.FINISHED,
  },
  {
    label: '已取消',
    value: ACCESSORIES_TASK_TASK_STATUS_ENUM.CANCELED,
  },
];

/**
 * @description: 紧急程度
 */
export enum DIGITAL_DRAFT_TASK_URGENCY_ENUM {
  /**
   * @description: 动销加急 = 1
   */
  MOVING_URGENCY = '1',
  /**
   * @description: 常规加急 = 2
   */
  GENERAL_URGENCY = '2',
  /**
   * @description: 普通 = 0
   */
  NORMAL = '0',
}
export const DIGITAL_DRAFT_TASK_URGENCY_LIST = [
  {
    label: '动销加急',
    value: DIGITAL_DRAFT_TASK_URGENCY_ENUM.MOVING_URGENCY,
  },
  {
    label: '常规加急',
    value: DIGITAL_DRAFT_TASK_URGENCY_ENUM.GENERAL_URGENCY,
  },
  {
    label: '普通',
    value: DIGITAL_DRAFT_TASK_URGENCY_ENUM.NORMAL,
  },
];

/**
 * @description: 编码状态
 */
export enum DIGITAL_DRAFT_TASK_CODE_STATUS_ENUM {
  /**
   * @description: 待编码
   */
  WAIT_CODE = '0',
  /**
   * @description: 已编码
   */
  ALREADY_CODE = '1',
}
export const DIGITAL_DRAFT_TASK_CODE_STATUS_LIST = [
  {
    label: '待编码',
    value: DIGITAL_DRAFT_TASK_CODE_STATUS_ENUM.WAIT_CODE,
  },
  {
    label: '已编码',
    value: DIGITAL_DRAFT_TASK_CODE_STATUS_ENUM.ALREADY_CODE,
  },
];

/**
 * @description: 描稿弹窗的操作类型
 */
export enum DIGITAL_DRAFT_DIALOG_OPERATION_TYPE_ENUM {
  /**
   * @description: 新增
   */
  NEW = 'NEW',
  /**
   * @description: 编辑
   */
  EDIT = 'EDIT',
  /**
   * @description: 重新描稿
   */
  REDRAFT = 'REDRAFT',
  /**
   * @description: 审核
   */
  AUDIT = 'AUDIT',
  /**
   * @description: 查看-审核详情
   */
  AUDIT_VIEW = 'AUDIT_VIEW',
}

/**
 * @description: 打版方式
 */
export enum MAKE_TYPE_ENUM {
  /**
   * @description: 动销后打版
   */
  AFTER_MOVING = '2',
  /**
   * @description: 常规打版
   */
  GENERAL = '1',
}
export const MAKE_TYPE_LIST = [
  {
    label: '动销后打版',
    value: MAKE_TYPE_ENUM.AFTER_MOVING,
  },
  {
    label: '常规打版',
    value: MAKE_TYPE_ENUM.GENERAL,
  },
];

export enum EDITION_TYPE_ENUM {
  /**
   * @description: 头版
   */
  HEAD = '1',
  /**
   * @description: 复色
   */
  REPEAT = '2',
}

export const EDITION_TYPE_LIST = [
  {
    label: '头版',
    value: EDITION_TYPE_ENUM.HEAD,
  },
  {
    label: '复色',
    value: EDITION_TYPE_ENUM.REPEAT,
  },
];

/**
 * @description: 审核状态
 */
export enum AUDIT_STATUS_ENUM {
  /**
   * @description: 待审核
   */
  WAIT_AUDIT = '0',
  /**
   * @description: 已驳回
   */
  REJECTED = '2',
  /**
   * @description: 已通过
   */
  PASS = '1',
}
export const AUDIT_STATUS_LIST = [
  {
    label: '待审核',
    value: AUDIT_STATUS_ENUM.WAIT_AUDIT,
  },
  {
    label: '审核驳回',
    value: AUDIT_STATUS_ENUM.REJECTED,
  },
  {
    label: '审核通过',
    value: AUDIT_STATUS_ENUM.PASS,
  },
];

/**
 * @description: 板房类型
 * COOPERATIVE_ROOM :合作板房 SHARED_ROOM :共享板房 PART_TIME_ROOM :兼职板房 SUPPLIER_ROOM :面料供应商
 */
export enum EXTERNAL_ROOM_TYPE_ENUM {
  /** 合作板房 */
  COOPERATIVE_ROOM = 'COOPERATIVE_ROOM',
  /** 共享板房 */
  SHARED_ROOM = 'SHARED_ROOM',
  /** 兼职板房 */
  PART_TIME_ROOM = 'PART_TIME_ROOM',
  /** 面料供应商 */
  SUPPLIER_ROOM = 'SUPPLIER_ROOM',
}
