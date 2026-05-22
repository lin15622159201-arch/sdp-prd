/** 发起异常所在环节枚举----请求的clothesStep字段枚举 */
export enum CLOTHES_STEP_ENUM {
  /**
   * 版单交接环节
   */
  TAKE_OVER = '100',
  /**
   * 审版工艺单处理环节
   */
  AUDIT_CRAFT_ORDER = '200',
  /**
   * 纸样环节
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
   * 返修环节
   */
  REPAIR = '700',
  /**
   *审版环节
   */
  AUDIT = '800',
}

/* 发起环节 */
export enum LAUNCH_STEP_ENUMS {
  PATTERN_WAIT_ALLOCATE = '200',
  INNER_PATTERN_WAITING = '230',
  INNER_PATTERN_DOING = '250',
  OUTER_PATTERN_WAIT_ACCEPT = '270',
  OUTER_PATTERN_DOING = '290',
  FABRIC_ACCESSORIES_COMPLETED = '300',
  INNER_CAR_CUT_WAIT_ALLOCATE = '400',
  INNER_CAR_CUT_DOING = '410',
  INNER_CAR_CUT_CRAFT = '420',
  INNER_CAR_SEW_WAITING = '430',
  INNER_CAR_SEW_HALF_CRAFT = '440',
  INNER_CAR_SEW_DOING = '460',
  // INNER_CAR_FINISHED_CRAFT='470',
  OUTER_CAR_WAIT_ACCEPT = '500',
  OUTER_CAR_CUT = '510',
  OUTER_CAR_CUT_CRAFT = '520',
  OUTER_CAR_SEW_WAITING = '530',
  OUTER_CAR_SEW_HALF_CRAFT = '540',
  OUTER_CAR_SEW_DOING = '550',
  // OUTER_CAR_FINISHED_CRAFT='560',
  // OUTER_CAR_DELIVERY='570',
  OUTER_CAR_RECEIVING = '580',
  CAR_FINISHED_CRAFT = '590',
  INSP_SAMPLE_QC = '600',
  INSP_SAMPLE_AUDIT = '610',
  INSP_SAMPLE_HANDLE = '615',
  INSP_DESIGN_AUDIT = '620',
  PATTERN_CLOTHES_CONFIRM = '625',
  CHECK_COUNT = '630',
  INNER_CHECK_COUNT = '260',
  OUTER_CHECK_COUNT = '295',
  CHECK_PRICE = '640',
  // SEND_CLOTHES='650',
  INSP_CUSTOMER_AUDIT = '660',
  GRADED = '101',
  PENDINGORDERS = '1',
  PENDING = '3',
  INPROGESS = '4',
  PENDINGORDER = '7',
  REPAIEING = '9',
  TOBERECEIVE = '11',
}

export const LAUNCH_STEP_LIST = [
  { value: LAUNCH_STEP_ENUMS.PATTERN_WAIT_ALLOCATE, label: '纸样待分单' },
  { value: LAUNCH_STEP_ENUMS.INNER_PATTERN_WAITING, label: '内部纸样-待进行' },
  { value: LAUNCH_STEP_ENUMS.INNER_PATTERN_DOING, label: '内部纸样-进行中' },
  { value: LAUNCH_STEP_ENUMS.OUTER_PATTERN_WAIT_ACCEPT, label: '外部纸样-待接单' },
  { value: LAUNCH_STEP_ENUMS.OUTER_PATTERN_DOING, label: '外部纸样-进行中' },
  { value: LAUNCH_STEP_ENUMS.FABRIC_ACCESSORIES_COMPLETED, label: '面辅料齐套' },
  { value: LAUNCH_STEP_ENUMS.INNER_CAR_CUT_WAIT_ALLOCATE, label: '车版待分单' },
  { value: LAUNCH_STEP_ENUMS.INNER_CAR_CUT_DOING, label: '内部车版-裁剪进行中' },
  { value: LAUNCH_STEP_ENUMS.INNER_CAR_CUT_CRAFT, label: '内部车版-裁片二次工艺' },
  { value: LAUNCH_STEP_ENUMS.INNER_CAR_SEW_WAITING, label: '内部车版-车缝待进行' },
  { value: LAUNCH_STEP_ENUMS.INNER_CAR_SEW_HALF_CRAFT, label: '内部车版-车缝-半成品二次工艺' },
  { value: LAUNCH_STEP_ENUMS.INNER_CAR_SEW_DOING, label: '内部车版-车缝进行中' },
  // { value: LAUNCH_STEP_ENUMS.INNER_CAR_FINISHED_CRAFT, label: '内部车版-成品二次工艺' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CAR_WAIT_ACCEPT, label: '外部车版-待接单' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CAR_CUT, label: '外部车版-裁剪' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CAR_CUT_CRAFT, label: '外部车版-裁片二次工艺' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CAR_SEW_WAITING, label: '外部车版-车缝待进行' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CAR_SEW_HALF_CRAFT, label: '外部车版-车缝-半成品二次工艺' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CAR_SEW_DOING, label: '外部车版-车缝进行中' },
  // { value: LAUNCH_STEP_ENUMS.OUTER_CAR_FINISHED_CRAFT, label: '外部车版-成品二次工艺' },
  // { value: LAUNCH_STEP_ENUMS.OUTER_CAR_DELIVERY, label: '外部车版-送货' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CAR_RECEIVING, label: '外部车版-收货' },
  { value: LAUNCH_STEP_ENUMS.CAR_FINISHED_CRAFT, label: '车版-成品二次工艺' },
  { value: LAUNCH_STEP_ENUMS.INSP_SAMPLE_QC, label: '样衣质检' },
  { value: LAUNCH_STEP_ENUMS.INSP_SAMPLE_AUDIT, label: '样衣审版' },
  { value: LAUNCH_STEP_ENUMS.INSP_SAMPLE_HANDLE, label: '样衣处理' },
  { value: LAUNCH_STEP_ENUMS.INSP_DESIGN_AUDIT, label: '设计审版' },
  { value: LAUNCH_STEP_ENUMS.PATTERN_CLOTHES_CONFIRM, label: '纸样确认' },
  { value: LAUNCH_STEP_ENUMS.INNER_CHECK_COUNT, label: '内部-用量核算' },
  { value: LAUNCH_STEP_ENUMS.OUTER_CHECK_COUNT, label: '外部-用量核算' },
  { value: LAUNCH_STEP_ENUMS.CHECK_COUNT, label: '用量核算' },
  { value: LAUNCH_STEP_ENUMS.CHECK_PRICE, label: '样衣核价' },
  // { value: LAUNCH_STEP_ENUMS.SEND_CLOTHES, label: '寄送样衣' },
  { value: LAUNCH_STEP_ENUMS.INSP_CUSTOMER_AUDIT, label: '客户审版' },
  { value: LAUNCH_STEP_ENUMS.GRADED, label: '样衣放码-待放码' },
  { value: LAUNCH_STEP_ENUMS.PENDINGORDERS, label: '返修-待分单' },
  { value: LAUNCH_STEP_ENUMS.PENDING, label: '内部返修-待进行' },
  { value: LAUNCH_STEP_ENUMS.INPROGESS, label: '内部返修-进行中' },
  { value: LAUNCH_STEP_ENUMS.PENDINGORDER, label: '外部返修-待接单' },
  { value: LAUNCH_STEP_ENUMS.REPAIEING, label: '外部返修-进行中' },
  { value: LAUNCH_STEP_ENUMS.TOBERECEIVE, label: '外部返修-待收货' },

];
