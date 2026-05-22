import { YES_NO_ENUM } from '@/constant';

/* 套版款：1 衍生款：2 */
export enum SAMPLE_REFER_TYPE_ENUM {
  REFER = '1',
  DERI = '2',
}
export const SAMPLE_REFER_TYPE_LIST = [
  { value: SAMPLE_REFER_TYPE_ENUM.REFER, label: '套版' },
  { value: SAMPLE_REFER_TYPE_ENUM.DERI, label: '衍生' },
];

// 开发尺寸表类型
export enum SIZE_TABLE_TYPE_ENUM {
  /** 有 */
  YES = '1',
  /** 无 */
  NO = '0',
  /** 附件 */
  FILES = '2'
}

export const SIZE_TABLE_TYPE_LIST = [
  { value: SIZE_TABLE_TYPE_ENUM.YES, label: '有' },
  { value: SIZE_TABLE_TYPE_ENUM.NO, label: '无' },
  { value: SIZE_TABLE_TYPE_ENUM.FILES, label: '附件' },
];

/* 返修类型: 1,仅纸样; 2,仅车版; 3,纸样+车版; */
export enum SAMPLE_REFER_NUMTYPE_ENUM {
  PAPER = '1',
  CAR = '2',
  /** 3D */
  THREE_DIMENSION = '3',
}
export const SAMPLE_REFER_NUMTYPE_LIST = [
  { value: SAMPLE_REFER_NUMTYPE_ENUM.PAPER, label: '纸样' },
  { value: SAMPLE_REFER_NUMTYPE_ENUM.CAR, label: '车版' },
  { value: SAMPLE_REFER_NUMTYPE_ENUM.THREE_DIMENSION, label: '3D' },
];

// 提交状态
export enum SUBMIT_STATUS_ENUM {
  /** 待分单 */
  WAIT = '1',
  /** 已分单 */
  DONE = '0',
}

// 图片方向
export enum PICTURE_ORIENTATION_ENUM {
  BACK = 'back',
  FRONT = 'front',
  SIDE = 'side',
  OTHER = 'other',
  DETAIL = 'detail',
}

export enum SAMPLE_PAGE_TYPE_ENUM {
  /** 任务分单页面  */
  ORDER = '1',
  /** 任务待接单 */
  WAIT_DISPATCH = '2',
  /** 任务待提交 */
  WAIT = '3',
  /** 任务已提交 */
  SUBMIT = '4',
}

/** 打版类型 */
export enum SAMPLE_TYPE_ENUM {
  // 2-正常打版 3-复色打版 4-补做打版
  NORMAL = '2',
  MULTICOLOR = '3',
  SUPPLEMENT = '4',
}

export const SAMPLE_TYPE_LIST = [
  { value: SAMPLE_TYPE_ENUM.NORMAL, label: '正常打版' },
  { value: SAMPLE_TYPE_ENUM.MULTICOLOR, label: '复色打版' },
  { value: SAMPLE_TYPE_ENUM.SUPPLEMENT, label: '补做打版' },
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

export enum SAMPLE_DEVELOP_STEP_STATE_ENMU {
  WORKING = '1',
  FINISHED = '2',
}

export enum DIMENSION_STATE {
  /** 待分单 */
  WAIT = '0',
  /** 进行中 */
  WORKING = '1',
  /** 已分单 */
  DONE = '2',
}

// 提交状态
export const SUBMIT_STATUS_LIST = [
  { value: SAMPLE_DEVELOP_STEP_STATE_ENMU.WORKING, label: '待提交' },
  { value: SAMPLE_DEVELOP_STEP_STATE_ENMU.FINISHED, label: '已提交' },
];

// 分单状态
export const DIMENSION_STATE_LIST = [
  { value: DIMENSION_STATE.WAIT, label: '待分单' },
  { value: DIMENSION_STATE.DONE, label: '已分单' },
];

// 分单状态
export const ORDER_SEPERATE_STATE_LIST = [
  { value: YES_NO_ENUM.NO, label: '待分单' },
  { value: YES_NO_ENUM.YES, label: '已分单' },
];
// 裁剪状态
export const TASK_STATE_LIST = [
  { value: SAMPLE_DEVELOP_STEP_STATE_ENMU.WORKING, label: '进行中' },
  { value: SAMPLE_DEVELOP_STEP_STATE_ENMU.FINISHED, label: '已完成' },
];
// 外部收货状态
export const DELIVERY_STATE_LIST = [
  { value: SAMPLE_DEVELOP_STEP_STATE_ENMU.WORKING, label: '待收货' },
  { value: SAMPLE_DEVELOP_STEP_STATE_ENMU.FINISHED, label: '已收货' },
];

// 签收状态
export const MATERIAL_STATE_LIST = [
  { value: YES_NO_ENUM.NO, label: '待签收' },
  { value: YES_NO_ENUM.YES, label: '已签收' },
];
/* 工艺要求:  100:裁版前工艺 110:裁版后工艺 */
export enum QC_CRAFT_ENMU {
  /** 裁版前工艺 */
  BEFORE = '100',
  /** 裁版后工艺 */
  AFTER = '110',
}
export const QC_CRAFT_LIST = [
  { value: QC_CRAFT_ENMU.BEFORE, label: '裁前' },
  { value: QC_CRAFT_ENMU.AFTER, label: '裁后' },
];

/* 样衣质检状态: 0, 待质检; 1, 已质检; */
export enum QC_STATUS_ENMU {
  /** 待质检 */
  PENDING = '0',
  /** 已质检 */
  OVER = '1',
}
export const QC_STATUS_LIST = [
  { value: QC_STATUS_ENMU.PENDING, label: '待质检' },
  { value: QC_STATUS_ENMU.OVER, label: '已质检' },
];

/* 质检结果: 1,通过; 2,返修; */
export enum QC_RES_ENMU {
  /** 通过 */
  PASS = '1',
  /** 返修 */
  BACK = '2',
}
export const QC_RES_LIST = [
  { value: QC_RES_ENMU.PASS, label: '通过' },
  { value: QC_RES_ENMU.BACK, label: '返修' },
];

/**
 * 环节节点枚举值
 */
export enum PROCESSNODE_ENUM {
  /**
   * 版单交接
   */
  TAKE_OVER = 'TAKE_OVER',
  /**
   * 审版工艺单处理
   */
  AUDIT_CRAFT_ORDER_PROCESS = 'AUDIT_CRAFT_ORDER_PROCESS',
  /**
   * 纸样-分单
   */
  PATTERN_ALLOCATE = 'PATTERN_ALLOCATE',
  /**
   * 纸样-内部处理
   */
  PATTERN_INNER_PROCESS = 'PATTERN_INNER_PROCESS',
  /**
   * 纸样-外部接单
   */
  PATTERN_OUTER_ACCEPT = 'PATTERN_OUTER_ACCEPT',
  /**
   * 纸样-外部处理
   */
  PATTERN_OUTER_PROCESS = 'PATTERN_OUTER_PROCESS',
  /**
   * 车缝-面辅料齐套签收
   */
  SEW_FABRIC_ACCESSORIES_SIGN_IN = 'SEW_FABRIC_ACCESSORIES_SIGN_IN',
  /**
   * 车缝-分单
   */
  SEW_ALLOCATE = 'SEW_ALLOCATE',
  /**
   * 车缝-内部处理-裁剪
   */
  SEW_INNER_PROCESS_CUTTING = 'SEW_INNER_PROCESS_CUTTING',
  /**
   * 车缝-内部处理-裁片二次工艺
   */
  SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT = 'SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT',
  /**
   * 车缝-内部处理
   */
  SEW_INNER_PROCESS = 'SEW_INNER_PROCESS',
  /**
   * 车缝-内部处理-半成品二次工艺
   */
  SEW_INNER_PROCESS_HALF_SECOND_CRAFT = 'SEW_INNER_PROCESS_HALF_SECOND_CRAFT',
  /**
   * 车缝-外部处理-外部接单
   */
  SEW_OUTER_PROCESS_ACCEPT = 'SEW_OUTER_PROCESS_ACCEPT',
  /**
   * 车缝-外部处理-裁剪
   */
  SEW_OUTER_PROCESS_CUTTING = 'SEW_OUTER_PROCESS_CUTTING',
  /**
   * 车缝-外部处理-裁片二次工艺
   */
  SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT = 'SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT',
  /**
   * 车缝-外部处理
   */
  SEW_OUTER_PROCESS = 'SEW_OUTER_PROCESS',
  /**
   * 车缝-外部处理-半成品二次工艺
   */
  SEW_OUTER_PROCESS_HALF_SECOND_CRAFT = 'SEW_OUTER_PROCESS_HALF_SECOND_CRAFT',
  /**
   * 车缝-外部处理-收货
   */
  SEW_OUTER_PROCESS_RECEIVING = 'SEW_OUTER_PROCESS_RECEIVING',
  /**
   * 车缝-成品二次工艺
   */
  SEW_PRODUCT_SECOND_CRAFT = 'SEW_PRODUCT_SECOND_CRAFT',
  /**
   * 3D打版-分单
   */
  DIMENSION_ALLOCATE = 'DIMENSION_ALLOCATE',
  /**
   * 3D打版-内部处理
   */
  DIMENSION_INNER_PROCESS = 'DIMENSION_INNER_PROCESS',
  /**
   * 3D打版-外部处理-接单
   */
  DIMENSION_OUTER_ACCEPT = 'DIMENSION_OUTER_ACCEPT',
  /**
   * 3D打版-外部处理
   */
  DIMENSION_OUTER_PROCESS = 'DIMENSION_OUTER_PROCESS',
  /**
   * 样衣质检
   */
  SAMPLE_QC = 'SAMPLE_QC',
  /**
   * 联合审版
   */
  SAMPLE_AUDIT = 'SAMPLE_AUDIT',
  /**
   * 返修-分单
   */
  REPAIR_ALLOCATE = 'REPAIR_ALLOCATE',
  /**
   * 返修-内部处理
   */
  REPAIR_INNER = 'REPAIR_INNER',
  /**
   * 返修-外部处理-接单
   */
  REPAIR_OUTER_PROCESS_ACCEPT = 'REPAIR_OUTER_PROCESS_ACCEPT',
  /**
   * 返修-外部处理
   */
  REPAIR_OUTER_PROCESS = 'REPAIR_OUTER_PROCESS',
  /**
   * 返修-外部处理-收货
   */
  REPAIR_OUTER_RECEIVE = 'REPAIR_OUTER_RECEIVE',
  /**
   * 返修-外部处理-确认耗时
   */
  REPAIR_OUTER_CONFIRM_USED_TIME = 'REPAIR_OUTER_CONFIRM_USED_TIME'
}
/**
 * 环节节点枚举值
 */
export enum PROCESS_NODE_CODE_ENUM {
  /**
   * 版单交接
   */
  TAKE_OVER = '101',
  /**
   * 审版工艺单处理
   */
  AUDIT_CRAFT_ORDER_PROCESS = '201',
  /**
   * 纸样-分单
   */
  PATTERN_ALLOCATE = '301',
  /**
   * 纸样-内部处理
   */
  PATTERN_INNER_PROCESS = '302',
  /**
   * 纸样-外部接单
   */
  PATTERN_OUTER_ACCEPT = '303',
  /**
   * 纸样-外部处理
   */
  PATTERN_OUTER_PROCESS = '304',
  /**
   * 车缝-面辅料齐套签收
   */
  SEW_FABRIC_ACCESSORIES_SIGN_IN = '401',
  /**
   * 车缝-分单
   */
  SEW_ALLOCATE = '402',
  /**
   * 车缝-内部处理-裁剪
   */
  SEW_INNER_PROCESS_CUTTING = '403',
  /**
   * 车缝-内部处理-裁片二次工艺
   */
  SEW_INNER_PROCESS_CUTTING_SECOND_CRAFT = '404',
  /**
   * 车缝-内部处理
   */
  SEW_INNER_PROCESS = '405',
  /**
   * 车缝-内部处理-半成品二次工艺
   */
  SEW_INNER_PROCESS_HALF_SECOND_CRAFT = '406',
  /**
   * 车缝-外部处理-外部接单
   */
  SEW_OUTER_PROCESS_ACCEPT = '407',
  /**
   * 车缝-外部处理-裁剪
   */
  SEW_OUTER_PROCESS_CUTTING = '408',
  /**
   * 车缝-外部处理-裁片二次工艺
   */
  SEW_OUTER_PROCESS_CUTTING_SECOND_CRAFT = '409',
  /**
   * 车缝-外部处理
   */
  SEW_OUTER_PROCESS = '410',
  /**
   * 车缝-外部处理-半成品二次工艺
   */
  SEW_OUTER_PROCESS_HALF_SECOND_CRAFT = '411',
  /**
   * 车缝-外部处理-收货
   */
  SEW_OUTER_PROCESS_RECEIVING = '412',
  /**
   * 车缝-成品二次工艺
   */
  SEW_PRODUCT_SECOND_CRAFT = '413',
  /**
   * 3D打版-分单
   */
  DIMENSION_ALLOCATE = '501',
  /**
   * 3D打版-内部处理
   */
  DIMENSION_INNER_PROCESS = '502',
  /**
   * 3D打版-外部处理-接单
   */
  DIMENSION_OUTER_ACCEPT = '503',
  /**
   * 3D打版-外部处理
   */
  DIMENSION_OUTER_PROCESS = '504',
  /**
   * 样衣质检
   */
  SAMPLE_QC = '601',
  /**
   * 联合审版
   */
  SAMPLE_AUDIT = '801',
  /**
   * 返修-分单
   */
  REPAIR_ALLOCATE = '701',
  /**
   * 返修-内部处理
   */
  REPAIR_INNER = '702',
  /**
   * 返修-外部处理-接单
   */
  REPAIR_OUTER_PROCESS_ACCEPT = '703',
  /**
   * 返修-外部处理
   */
  REPAIR_OUTER_PROCESS = '704',
  /**
   * 返修-外部处理-收货
   */
  REPAIR_OUTER_RECEIVE = '705',
  /**
   * 返修-外部处理-确认耗时
   */
  REPAIR_OUTER_CONFIRM_USED_TIME = '706'
}
/**
 * 环节枚举值
 */
export enum PROCESSSTEP_ENUM {
  /**
   * 版单交接
   */
  TAKE_OVER = 'TAKE_OVER',
  /**
   * 审版工艺单处理
   */
  AUDIT_CRAFT_ORDER = 'AUDIT_CRAFT_ORDER',
  /**
   * 纸样打版环节
   */
  PATTERN = 'PATTERN',
  /**
   * 车版环节
   */
  SEW = 'SEW',
  /**
   * 3D打版环节
   */
  DIMENSION = 'DIMENSION',
  /**
   * 质检环节
   */
  QC = 'QC',
  /**
   * 审版环节
   */
  AUDIT = 'AUDIT',
  /**
   * 返修环节
   */
  REPAIR = 'REPAIR'
}
/**
 * 环节枚举值
 */
export enum PROCESS_STEP_CODE_ENUM {
  /**
   * 版单交接
   */
  TAKE_OVER = '100',
  /**
   * 审版工艺单处理
   */
  AUDIT_CRAFT_ORDER = '200',
  /**
   * 纸样打版环节
   */
  PATTERN = '300',
  /**
   * 车版环节
   */
  SEW = '400',
  /**
   * 3D打版环节
   */
  DIMENSION = '500',
  /**
   * 质检环节
   */
  QC = '600',
  /**
   * 审版环节
   */
  AUDIT = '800',
  /**
   * 返修环节
   */
  REPAIR = '700'
}

/* 备注的业务类型 */
export enum REMARK_BIZ_TYPE_ENUMS {
  SAMPLE_CLOTHES = '1',
  ANOMALY = '2',
  REPAIR = '3',
  SECOND_CRAFT = '4',
  STYLE = '5', // 样衣放码
  DOSAGE_ACCOUNT = '6', // 用量核算
  LARGE = '7', // 生产资料
  STYLE_PEICING = '8', // 精准核价
  ESTIMATE_PEICING = '9', // 估价核价
}
export const REMARK_BIZ_TYPE_LIST = [
  { value: REMARK_BIZ_TYPE_ENUMS.SAMPLE_CLOTHES, label: '打版' },
  { value: REMARK_BIZ_TYPE_ENUMS.ANOMALY, label: '异常' },
  { value: REMARK_BIZ_TYPE_ENUMS.REPAIR, label: '返修' },
  { value: REMARK_BIZ_TYPE_ENUMS.SECOND_CRAFT, label: '二次工艺' },
];

/* 操作记录的业务类型 */
export enum LOG_BIZ_TYPE_ENUMS {
  /**
   * 异常
   */
  ANOMALY = '1',
  /**
   * 返修
   */
  REPAIR = '2',
  /**
 * 打版
 */
  SAMPLE_CLOTHES = '3',
  /**
   * 纸样
   */
  PATTERN = '4',
  /**
   * 二次工艺
   */
  SECOND_CRAFT = '5',
  /**
 * 3D任务
 */
  DIMENSION = '6',
  /**
 * 车版
 */
  SEW = '10',
  /**
 * 车版收货
 */
  SEW_RECEIPT = '11',
  /**
 * 样衣质检
 */
  SAMPLE_QC = '15',
  /**
 * 联合审版
 */
  SAMPLE_AUDIT = '16',
  /**
 * 样衣处理
 */
  SAMPLE_HANDLE = '17',
  /**
 * 设计审版
 */
  DESIGN_AUDIT = '18',
  /**
 * 用量核算
 */
  CHECK_COUNT = '20',
  /**
 * 样衣核价
 */
  CHECK_PRICE = '25',
  /**
 * 样衣寄送
 */
  SEND_CLOTHES = '30',
  /**
 * 样衣放码
 */
  GRADING_CLOTHES = '31',
  /**
 * 客户审版
 */
  CUSTOMER_AUDIT = '32',

  /**
 * 纸样确认
 */
  PATTERN_CONFIRM = '33',
  /**
 * 下大货管理
 */
  SWAP_PROD = '34',
  /**
 * 修改用量
 */
  DOSAGE_CHANGE = '35',

  /**
 * 款式生产资料
 */
  STYLE_INFO = '36',
  /**
 * 需求汇总
 */
  REQUIREMENT_SUMMARY = '37',
  /**
 * 版单交接
 */
  TAKE_OVER_SAMPLE_CLOTHES = '38',
  /**
 * 审版工艺单
 */
  AUDIT_CRAFT_ORDER = '39',
  /**
   * 估价核价
   */
  ESTIMATE_CHECK_PRICE = '41',
}
export const LOG_BIZ_TYPE_LIST = [
  { value: LOG_BIZ_TYPE_ENUMS.ANOMALY, label: '异常' },
  { value: LOG_BIZ_TYPE_ENUMS.REPAIR, label: '返修' },
  { value: LOG_BIZ_TYPE_ENUMS.SECOND_CRAFT, label: '二次工艺' },
];

/* 纸样分单状态。（0:未流转 1:内部纸样 2:外发纸样） */
export enum PAPER_ORDER_STATUS_ENMU {
  /** 未流转 */
  PENDING = '0',
  /** 内部纸样 */
  INSIDE = '1',
  /* 外发纸样 */
  OUTSIDE = '2',
}
export const PAPER_ORDER_STATUS_LIST = [
  { value: PAPER_ORDER_STATUS_ENMU.PENDING, label: '未流转' },
  { value: PAPER_ORDER_STATUS_ENMU.INSIDE, label: '内部纸样' },
  { value: PAPER_ORDER_STATUS_ENMU.OUTSIDE, label: '外发纸样' },
];

// 裁剪要求默认值
// eslint-disable-next-line vue/max-len
export const cuttingRequireDefault = '1、根据实际面料与销售图效果来裁\n2、普通面料需高温缩水松布24小时，针织面料需高温缩水松布48小时以上方可开裁。\n3、开裁前所有面料具备合格的检测报告，认真核对款号，纸样，样衣三者是否一致，面料配比，缸号批次，裁片要分方向。\n4、注意面料的色差/经纬斜要正。\n5、刀口深度不超过0.2cm，有点位位置不能用钻孔机，需手工定位。\n6、如有不清楚处请及时联系我司跟单人员。';
// 尾部要求默认值
// eslint-disable-next-line vue/max-len
export const tailRequireDefault = '1、线头要清理干净，扣位要准确无误且牢固。成衣要干净整洁，不能有污渍、疵点；\n2、成品尽量反面熨烫或垫布烫，不可反光，起镜，显骨位烫痕现象，各部位熨烫平服，整洁，无烫黄；\n3、包装要分款，分色分码，用我司LOGO胶袋，大小按衣服而定，包装好成品要平服，美观；\n4、吊牌有款号条码一面朝上（折叠衣服内要放拷贝纸和防潮珠）。';

/**
 * @description 服装工程中心缓存的搜索条件的key
 *
 */
export const CLOTHES_CENTER_SEARCH_KEY = 'ClothesCenter';
