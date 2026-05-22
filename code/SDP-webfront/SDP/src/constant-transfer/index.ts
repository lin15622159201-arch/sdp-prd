/** fob 核价 - 对客、对厂核价 */
export enum QUOTE_FOB_PRICING_TYPE_ENUM {
  /** fob 对客核价 */
  TO_CUSTOMER = '1',
  /** fob 对厂核价 */
  TO_FACTORY = '2',
}

/** 核价管理 - 对客、对厂核价 */
export enum QUOTE_PRICING_TYPE_ENUM {
  /** 对客核价 */
  TO_CUSTOMER = '1',
  /** 对厂核价 */
  TO_FACTORY = '2',
}

/* 查看角色 */
// 所有look-role类型都要在这里
export enum LOOK_ROLE_TYPE_ENUM {
  ALL = 'ALL',
  MY = 'MY',
  // DESIGN_GROUP = 'DESIGN_GROUP', // 设计模块里的小组（设计组别)
  UNKNOWN = 'UNKNOWN',
}

// 用于设计管理模块
export const LOOK_ROLE_TYPE_DESIGN_LIST = [
  {
    label: '全部',
    value: LOOK_ROLE_TYPE_ENUM.ALL,
  },
  // {
  //   label: '小组',
  //   value: LOOK_ROLE_TYPE_ENUM.DESIGN_GROUP,
  // },
  {
    label: '我的',
    value: LOOK_ROLE_TYPE_ENUM.MY,
  },
];
// 用于默认
export const LOOK_ROLE_TYPE_LIST = [
  {
    label: '全部',
    value: LOOK_ROLE_TYPE_ENUM.ALL,
  },
  {
    label: '我的',
    value: LOOK_ROLE_TYPE_ENUM.MY,
  },
];
/**
 * pinia id
 */
export enum STORE_NAMESPACE_ENUM {
  /**
   * 核价使用
   */
  PRICING = 'pricing-store',
  /**
   * 打版模块所属人
   */
  LOOK = 'look-store',
  /**
   * shared-params
   */
  SHARED_PARAMS = 'shared-params-store',
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

/* 状态 */
export enum EFFECTIVE_STATUS_ENUM {
  EFFECTIVE = '1',
  CANCELED = '0',
}
export const EFFECTIVE_STATUS_LIST = [
  { value: EFFECTIVE_STATUS_ENUM.EFFECTIVE, label: '有效' },
  { value: EFFECTIVE_STATUS_ENUM.CANCELED, label: '取消' },
];
