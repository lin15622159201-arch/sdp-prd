/* 打版信息状态: */
export enum DESIGN_ORDER_INFO_ENUM {
  /** 待拆版 */
  WAIT = 1,
  /** 已拆版 */
  ALREADY = 2,
}
export const ORDER_INFO_STATE_LIST = [
  { value: DESIGN_ORDER_INFO_ENUM.WAIT, label: '未提交' },
  { value: DESIGN_ORDER_INFO_ENUM.ALREADY, label: '已提交' },
];

/** 打版信息状态 */
export enum PROTOTYPE_STATUS_ENUM {
  /** 待拆版 */
  WAITING = '1',
  /** 已拆版 */
  DONE = '2',
}
export const PROTOTYPE_STATUS_LIST = [
  { value: PROTOTYPE_STATUS_ENUM.WAITING, label: '未提交' },
  { value: PROTOTYPE_STATUS_ENUM.DONE, label: '已提交' },
];
/** 核价状态 */
export enum CHECK_PRICE_STATE_ENUM {
  /** 未核价 */
  NOT_CHECK = '0',
  /** 核价中 */
  CHECKING = '1',
  /** 已核价 */
  ALREADY_CHECK = '2',
}
export const CHECK_PRICE_STATE_LIST = [
  { value: CHECK_PRICE_STATE_ENUM.ALREADY_CHECK, label: '未核价' },
  { value: CHECK_PRICE_STATE_ENUM.CHECKING, label: '核价中' },
  { value: CHECK_PRICE_STATE_ENUM.NOT_CHECK, label: '已核价' },
];

/** 订单类型 */
export enum DEMAND_TASK_TYPE_ENUM {
  /** 打版订单 */
  PATTERN = '1',
  /** 设计订单 */
  DESIGN = '2',
  /** 加工订单 */
  PROCESS = '3',
}

/** 款类型 */
export enum SKC_TYPE_ENUM {
  /** 正常款 */
  NORMAL = 1,
  /** 复色款 */
  MULTICOLOR = 2
}

export const SKC_TYPE_LIST = [
  { value: SKC_TYPE_ENUM.NORMAL, label: '正常款' },
  { value: SKC_TYPE_ENUM.MULTICOLOR, label: '复色款' },
];

/** 核价类型 */
export enum CHECK_PRICE_TYPE_ENUM {
  /** 预估核价 */
  ESTIMATED = '1',
  /** 生产核价 */
  PRODUCTION = '2'
}

export const CHECK_PRICE_TYPE_LIST = [
  { value: CHECK_PRICE_TYPE_ENUM.ESTIMATED, label: '预估', color: 'primary' },
  { value: CHECK_PRICE_TYPE_ENUM.PRODUCTION, label: '精准', color: 'success' }
];

/** 打版方式 */
export enum MAKE_CLOTHES_TYPE_ENUM {
  /** 仅纸样 */
  PAPER = '0',
  /** 实物样 */
  ACTUAL = '1',
  /** 3D样 */
  THREE = '2',
  /** 3D+实物样 */
  THREE_AND_ACTUAL = '3',
}

export const MAKE_CLOTHES_TYPE_LIST = [
  { value: MAKE_CLOTHES_TYPE_ENUM.PAPER, label: '仅纸样' },
  { value: MAKE_CLOTHES_TYPE_ENUM.ACTUAL, label: '实物样' },
  { value: MAKE_CLOTHES_TYPE_ENUM.THREE, label: '3D样' },
  { value: MAKE_CLOTHES_TYPE_ENUM.THREE_AND_ACTUAL, label: '3D+实物样' }
];

/** 款式状态 */
export enum STYLE_STATUS_ENUM {
  /** 待提交 */
  WAIT_SUBMIT = '1',
  /** 已提交 */
  SUBMIT = '2'
}

/** 款式来源 */
export enum SOURCE_TYPE_ENUM {
  /** 自建款 */
  SELF = '130',
  /** 灵感设计需求 */
  INSPIRATION = '170',
  /** 数码印花款 */
  DIGITAL = '180'
}
/* 修图任务 */
export enum IMAGE_UPDATE_STATUS {
  /** 未创建 */
  NOTCREATED = -1,
  /** 待处理 */
  WAIT = 0,
  /** 待审核 */
  ALREADY = 10,
  /** 待返修 */
  COMPLETED = 20,
  /** 已完成 */
  COMPLETE = 30,
  /** 已取消 */
  CANCEL = 50,
}
export const IMAGE_UPDATE_STATUS_LIST = [
  { value: IMAGE_UPDATE_STATUS.NOTCREATED, label: '未创建' },
  { value: IMAGE_UPDATE_STATUS.WAIT, label: '待处理' },
  { value: IMAGE_UPDATE_STATUS.ALREADY, label: '待审核' },
  { value: IMAGE_UPDATE_STATUS.COMPLETED, label: '待返修' },
  { value: IMAGE_UPDATE_STATUS.COMPLETE, label: '已完成' },
  { value: IMAGE_UPDATE_STATUS.CANCEL, label: '已取消' },
];

/* 上架状态 */
export enum LISTING_STATUS {
  /** 待推送 */
  PENDING_PUSH = 0,
  /** 待上架 */
  PENDING_LISTING = 1,
  /** 已上架 */
  LISTED = 2,
  /** 下架 */
  UNLISTED = 3,
  /** 上架失败 */
  NOLISTED = 4,
}
export const LISTING_STATUS_LIST = [
  { value: LISTING_STATUS.PENDING_PUSH, label: '待推送' },
  { value: LISTING_STATUS.PENDING_LISTING, label: '待发布' },
  { value: LISTING_STATUS.LISTED, label: '已发布' },
  { value: LISTING_STATUS.UNLISTED, label: '下架' },
  { value: LISTING_STATUS.NOLISTED, label: '发布失败' },
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

/* 推送PLM状态 */
export enum PLM_STATUS {
  /** 待推送 */
  PENDING_PUSH = 0,
  /** 已推送 */
  LISTED = 1,
  /** 推送失败 */
  PUSHFAILED = 2,
  /** 取消 */
  CANCEL = 3,
}
export const PLM_STATUS_LIST = [
  { value: PLM_STATUS.PENDING_PUSH, label: '待推送' },
  { value: PLM_STATUS.LISTED, label: '已推送' },
  { value: PLM_STATUS.PUSHFAILED, label: '推送失败' },
  { value: PLM_STATUS.CANCEL, label: '取消' },
];
