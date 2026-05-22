// 服务类型
export const SERVICETYPEMAP = {
  1: '国内',
  2: '国外(跨境)',
  3: '电商',
  4: '批发',
  5: '品牌',
};

export enum EXTERNAL_ROOM_ENUM {
  COOPERATIVE_ROOM = 'COOPERATIVE_ROOM',
  SHARED_ROOM = 'SHARED_ROOM',
  PART_TIME_ROOM = 'PART_TIME_ROOM',
  SUPPLIER_ROOM = 'SUPPLIER_ROOM',
}

// 根据路由名称匹配
export const EXTERNAL_ROOM_MAPS = {
  'cooperation-room-list': EXTERNAL_ROOM_ENUM.COOPERATIVE_ROOM,
  'share-room-list': EXTERNAL_ROOM_ENUM.SHARED_ROOM,
  'part-time-room-list': EXTERNAL_ROOM_ENUM.PART_TIME_ROOM,
};

// 根据路由名称匹配
export const EXTERNAL_ROOM_DETAIL_MAPS = {
  'cooperation-room-detail': EXTERNAL_ROOM_ENUM.COOPERATIVE_ROOM,
  'share-room-detail': EXTERNAL_ROOM_ENUM.SHARED_ROOM,
  'part-time-room-detail': EXTERNAL_ROOM_ENUM.PART_TIME_ROOM,
  'cooperation-room-add': EXTERNAL_ROOM_ENUM.COOPERATIVE_ROOM,
  'share-room-add': EXTERNAL_ROOM_ENUM.SHARED_ROOM,
  'part-time-room-add': EXTERNAL_ROOM_ENUM.PART_TIME_ROOM,
  'cooperation-room-edit': EXTERNAL_ROOM_ENUM.COOPERATIVE_ROOM,
  'share-room-edit': EXTERNAL_ROOM_ENUM.SHARED_ROOM,
  'part-time-room-edit': EXTERNAL_ROOM_ENUM.PART_TIME_ROOM,
};

// 根据路由名称跳转详情页面
export const EXTERNAL_ROOM_DETAIL_LISTS = {
  detail: {
    'cooperation-room-list': 'DistributeRoomManageCooperationRoomDetail',
    'share-room-list': 'DistributeRoomManageShareRoomDetail',
    'part-time-room-list': 'DistributeRoomManagePartTimeRoomDetail',
  },
  edit: {
    'cooperation-room-list': 'DistributeRoomManageCooperationRoomEdit',
    'share-room-list': 'DistributeRoomManageShareRoomEdit',
    'part-time-room-list': 'DistributeRoomManagePartTimeRoomEdit',
  },
  add: {
    'cooperation-room-list': 'DistributeRoomManageCooperationRoomAdd',
    'share-room-list': 'DistributeRoomManageShareRoomAdd',
    'part-time-room-list': 'DistributeRoomManagePartTimeRoomAdd',
  },

};

// 业务归属
export enum USER_MANAGEMENT_ROOM_REGION_ENUM {
  GUANGZHOU = '4',
  HANGZHOU = '8',
}
export const USER_MANAGEMENT_ROOM_REGION_LIST = [
  { value: USER_MANAGEMENT_ROOM_REGION_ENUM.GUANGZHOU, label: '广州' },
  { value: USER_MANAGEMENT_ROOM_REGION_ENUM.HANGZHOU, label: '杭州' },
];

// 启用状态
export enum USER_MANAGEMENT_ROOM_ENABLE_ENUM {
  YES = 'YES',
  NO = 'NO',
}
export const ROOM_ENABLE_LIST = [
  { value: USER_MANAGEMENT_ROOM_ENABLE_ENUM.YES, label: '已启用' },
  { value: USER_MANAGEMENT_ROOM_ENABLE_ENUM.NO, label: '已停用' },
];
export const USER_MANAGEMENT_ROOM_ENABLE_LIST = [
  { value: USER_MANAGEMENT_ROOM_ENABLE_ENUM.YES, label: '是' },
  { value: USER_MANAGEMENT_ROOM_ENABLE_ENUM.NO, label: '否' },
];

// 角色选择 管理员 纸样师 | 车版师 | 纸样师 + 车版师
export enum USER_MANAGEMENT_ROOM_ROLE_ENUM {
  /* 管理员 */
  TEAM_ADMIN = 'TEAM_ADMIN',
  /* 纸样师 */
  SAMPLE = 'SAMPLE',
  /* 车版师 */
  MAKE_SAMPLE = 'MAKE_SAMPLE',
  /* 纸样师+车版师 */
  // SAMPLE_MAKE_SAMPLE = 'SAMPLE_MAKE_SAMPLE',
}
// 管理员
export const USER_MANAGEMENT_ROOM_ADMIN_ROLE_LIST = [
  { value: USER_MANAGEMENT_ROOM_ROLE_ENUM.TEAM_ADMIN, label: '管理员' },
];
// 队员
export const USER_MANAGEMENT_ROOM_ROLE_LIST = [
  { value: USER_MANAGEMENT_ROOM_ROLE_ENUM.SAMPLE, label: '纸样师' },
  { value: USER_MANAGEMENT_ROOM_ROLE_ENUM.MAKE_SAMPLE, label: '车版师' },
  // { value: USER_MANAGEMENT_ROOM_ROLE_ENUM.SAMPLE_MAKE_SAMPLE, label: '纸样师+车版师' },
];

// 版房类型
// COOPERATIVE_ROOM :合作版房
// SHARED_ROOM :共享版房
// PART_TIME_ROOM :兼职版房
// SUPPLIER_ROOM :面料供应商
export enum USER_MANAGEMENT_ROOM_TYPE_ENUM {
  COOPERATIVE_ROOM = 'COOPERATIVE_ROOM',
  SHARED_ROOM = 'SHARED_ROOM',
  PART_TIME_ROOM = 'PART_TIME_ROOM',
  SUPPLIER_ROOM = 'SUPPLIER_ROOM',
}

export const ROOM_CODE_MAPS = {
  [USER_MANAGEMENT_ROOM_TYPE_ENUM.COOPERATIVE_ROOM]: '1',
  [USER_MANAGEMENT_ROOM_TYPE_ENUM.SHARED_ROOM]: '2',
  [USER_MANAGEMENT_ROOM_TYPE_ENUM.PART_TIME_ROOM]: '3',
};

export enum ACCOUNT_TYPE_ENUM {
  PRIVATE = '1',
  OPEN = '2',
  ALIPAY = '3',
}

// 管理员(本地定义)纸样师车版师
export enum BUSINESS_TYPE_ENUM {
  // TEAM_ADMIN ='TEAM_ADMIN'
  PATTERN_MAKER = 'PATTERN_MAKER',
  SEWER = 'SEWER',
}

export const BUSINESS_TYPE_LIST = [
  {
    value: BUSINESS_TYPE_ENUM.PATTERN_MAKER,
    label: '纸样师',
  },
  {
    value: BUSINESS_TYPE_ENUM.SEWER,
    label: '车版师',
  },
];

/** 付款渠道 */
export enum PAYMENT_CHANNEL_ENUM {
  /** 平台支付 */
  PLATFORM_PAY = '1',
  /** 版房账户 */
  ROOM_PAY = '2',
}
export const PAYMENT_CHANNEL_LIST = [
  { value: PAYMENT_CHANNEL_ENUM.PLATFORM_PAY, label: '平台支付' },
  { value: PAYMENT_CHANNEL_ENUM.ROOM_PAY, label: '版房账户' },
];

export enum OPERATION_TYPE_ENUM {
  /** 净色 */
  PLAN = '1',
  /** 花型 */
  FLOWER = '2',
  /** 净色&花型 */
  ALL = '3',
}

// 经营类型
export const OPERATION_TYPE_LIST = [
  {
    value: OPERATION_TYPE_ENUM.PLAN,
    label: '净色',
  },
  {
    value: OPERATION_TYPE_ENUM.FLOWER,
    label: '花型',
  },
  {
    value: OPERATION_TYPE_ENUM.ALL,
    label: '净色&花型',
  },
];
