/* eslint-disable vue/max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */

import { YES_NO_ENUM } from '@/constant';
import { CLOTHES_STEP_ENUM } from '../constant';

/**
 * **请求类型**
 * 上传纸样
 * @see https://yapi.ibaibu.com/project/1650/interface/api/92062
 *
 * @请求方法: POST
 * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/upload/pattern
 * @更新时间: 2021-09-09 21:58:45
 */
export interface PostWebV1PatternClothesUploadPatternApiReq { }

/**
  * **返回类型**
  * 上传纸样
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92062
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/upload/pattern
  * @更新时间: 2021-09-09 21:58:45
  */
/**
  * 响应数据
  */
export type PostWebV1PatternClothesUploadPatternApiRes = boolean;

/**
  * **请求类型**
  * 删除
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92438
  *
  * @请求方法: DELETE
  * @请求地址: /plm-sample-clothes/web/v1/repair/delete
  * @更新时间: 2021-09-09 15:26:46
  */
export interface DeleteWebV1RepairDeleteApiReq { }

/**
  * **返回类型**
  * 删除
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92438
  *
  * @请求方法: DELETE
  * @请求地址: /plm-sample-clothes/web/v1/repair/delete
  * @更新时间: 2021-09-09 15:26:46
  */
export type DeleteWebV1RepairDeleteApiRes = null;

/**
  * **请求类型**
  * 删除
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92448
  *
  * @请求方法: DELETE
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/delete
  * @更新时间: 2021-09-09 15:26:58
  */
export interface DeleteWebV1AnomalyDeleteApiReq { }

/**
  * **返回类型**
  * 删除
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92448
  *
  * @请求方法: DELETE
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/delete
  * @更新时间: 2021-09-09 15:26:58
  */
export type DeleteWebV1AnomalyDeleteApiRes = null;

/**
  * **请求类型**
  * 尺寸表临时保存
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92070
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/cache
  * @更新时间: 2021-09-09 21:58:46
  */
/**
  * 请求参数
  */
export interface PostWebV1PatternClothesSizeCacheApiReq { }

/**
  * **返回类型**
  * 尺寸表临时保存
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92070
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/cache
  * @更新时间: 2021-09-09 21:58:46
  */
/**
  * 响应数据
  */
export type PostWebV1PatternClothesSizeCacheApiRes = boolean;

/**
  * **请求类型**
  * 开始分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92422
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/assign
  * @更新时间: 2021-09-10 10:21:37
  */
export interface PutWebV1RepairAssignApiReqItem {
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 返修单id
   */
  repairId?: number | string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId?: number | string;
}
export type PutWebV1RepairAssignApiReq = PutWebV1RepairAssignApiReqItem[];

/**
  * **返回类型**
  * 开始分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92422
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/assign
  * @更新时间: 2021-09-10 10:21:37
  */
export type PutWebV1RepairAssignApiRes = null;

/**
  * **请求类型**
  * 开始返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92428
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/start
  * @更新时间: 2021-09-10 10:21:37
  */
export interface PutWebV1RepairStartApiReqItem {
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 返修单id
   */
  repairId?: number | string;
}
/**
 * 请求参数对象
 */
export type PutWebV1RepairStartApiReq = PutWebV1RepairStartApiReqItem[];

/**
  * **返回类型**
  * 开始返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92428
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/start
  * @更新时间: 2021-09-10 10:21:37
  */
export type PutWebV1RepairStartApiRes = null;

/**
  * **请求类型**
  * 排单变更(改变返修人)
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92430
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/change
  * @更新时间: 2021-09-10 10:21:37
  */
export interface PutWebV1RepairChangeApiReqItem {
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 返修单id
   */
  repairId?: number | string;
}
export type PutWebV1RepairChangeApiReq = PutWebV1RepairChangeApiReqItem[];

/**
  * **返回类型**
  * 排单变更(改变返修人)
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92430
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/change
  * @更新时间: 2021-09-10 10:21:37
  */
export type PutWebV1RepairChangeApiRes = null;

/**
  * **请求类型**
  * 撤回分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92424
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/recall
  * @更新时间: 2021-09-10 10:21:37
  */
export interface PutWebV1RepairRecallApiReqItem {
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 返修单id
   */
  repairId?: number | string;
}
export type PutWebV1RepairRecallApiReq = PutWebV1RepairRecallApiReqItem[];

/**
  * **返回类型**
  * 撤回分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92424
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/recall
  * @更新时间: 2021-09-10 10:21:37
  */
export type PutWebV1RepairRecallApiRes = null;

/**
  * **请求类型**
  * 结束返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92432
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/finish
  * @更新时间: 2021-09-10 10:21:38
  */
export interface PutWebV1RepairFinishApiReqItem {
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 返修单id
   */
  repairId?: number | string;
}
/**
 * 请求参数对象
 */
export type PutWebV1RepairFinishApiReq = PutWebV1RepairFinishApiReqItem[];

/**
  * **返回类型**
  * 结束返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92432
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/finish
  * @更新时间: 2021-09-10 10:21:38
  */
export type PutWebV1RepairFinishApiRes = null;

/**
  * **请求类型**
  * 同意结案
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92484
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/agree/close
  * @更新时间: 2021-09-10 11:54:34
  */
export interface PutWebV1AnomalyAgreeCloseApiReqItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 版单id
   */
  closeId?: number | string;
}
/**
 * 请求参数对象
 */
export type PutWebV1AnomalyAgreeCloseApiReq = PutWebV1AnomalyAgreeCloseApiReqItem[];

/**
  * **返回类型**
  * 同意结案
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92484
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/agree/close
  * @更新时间: 2021-09-10 11:54:34
  */
export type PutWebV1AnomalyAgreeCloseApiRes = null;

/**
  * **请求类型**
  * 同意驳回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92476
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/agree/overrule
  * @更新时间: 2021-09-10 11:54:34
  */
export interface PutWebV1AnomalyAgreeOverruleApiReqItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 版单id
   */
  closeId?: number | string;
}
/**
 * 请求参数对象
 */
export type PutWebV1AnomalyAgreeOverruleApiReq = PutWebV1AnomalyAgreeOverruleApiReqItem[];

/**
  * **返回类型**
  * 同意驳回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92476
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/agree/overrule
  * @更新时间: 2021-09-10 11:54:34
  */
export type PutWebV1AnomalyAgreeOverruleApiRes = null;

/**
  * **请求类型**
  * 开始处理异常
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92480
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/start/handling
  * @更新时间: 2021-09-10 11:54:34
  */
export interface PutWebV1AnomalyStartHandlingApiReqItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 版单id
   */
  closeId?: number | string;
  /**
   * 处理人id
   */
  handlerId?: number | string;
  /**
   * 处理人姓名
   */
  handlerName?: string;
}
/**
 * 请求参数对象
 */
export type PutWebV1AnomalyStartHandlingApiReq = PutWebV1AnomalyStartHandlingApiReqItem[];

/**
  * **返回类型**
  * 开始处理异常
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92480
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/start/handling
  * @更新时间: 2021-09-10 11:54:34
  */
export type PutWebV1AnomalyStartHandlingApiRes = null;

/**
  * **请求类型**
  * 拒绝结案
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92486
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/reject/close
  * @更新时间: 2021-09-10 11:54:34
  */
export interface PutWebV1AnomalyRejectCloseApiReqItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 版单id
   */
  closeId?: number | string;
  /**
   * 拒绝驳回原因
   */
  rejectRejectedReason?: string;
}
/**
 * 请求参数对象
 */
export type PutWebV1AnomalyRejectCloseApiReq = PutWebV1AnomalyRejectCloseApiReqItem[];

/**
  * **返回类型**
  * 拒绝结案
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92486
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/reject/close
  * @更新时间: 2021-09-10 11:54:34
  */
export type PutWebV1AnomalyRejectCloseApiRes = null;

/**
  * **请求类型**
  * 拒绝驳回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92478
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/reject/overrule
  * @更新时间: 2021-09-10 11:54:34
  */
export interface PutWebV1AnomalyRejectOverruleApiReqItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 版单id
   */
  closeId?: number | string;
  /**
   * 拒绝驳回原因
   */
  rejectRejectedReason?: string;
}
/**
 * 请求参数对象
 */
export type PutWebV1AnomalyRejectOverruleApiReq = PutWebV1AnomalyRejectOverruleApiReqItem[];

/**
  * **返回类型**
  * 拒绝驳回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92478
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/reject/overrule
  * @更新时间: 2021-09-10 11:54:34
  */
export type PutWebV1AnomalyRejectOverruleApiRes = null;

/**
  * **请求类型**
  * 申请结案
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92482
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/apply/close
  * @更新时间: 2021-09-10 11:54:34
  */
export interface PutWebV1AnomalyApplyCloseApiReqItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 版单id
   */
  closeId?: number | string;
}
/**
 * 请求参数对象
 */
export type PutWebV1AnomalyApplyCloseApiReq = PutWebV1AnomalyApplyCloseApiReqItem[];

/**
  * **返回类型**
  * 申请结案
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92482
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/apply/close
  * @更新时间: 2021-09-10 11:54:34
  */
export type PutWebV1AnomalyApplyCloseApiRes = null;

/**
  * **请求类型**
  * 申请驳回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92474
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/apply/overrule
  * @更新时间: 2021-09-10 11:54:34
  */
export interface PutWebV1AnomalyApplyOverruleApiReqItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 版单id
   */
  closeId?: number | string;
  /**
   * 驳回/取消原因
   */
  rejectedReason?: string;
  /**
   * 状态（1：待处理，2：驳回待审核，3：已驳回，4：处理中，5；结案待审核，6：已结案）
   */
  status?: number | string;
}
/**
 * 请求参数对象
 */
export type PutWebV1AnomalyApplyOverruleApiReq = PutWebV1AnomalyApplyOverruleApiReqItem[];

/**
  * **返回类型**
  * 申请驳回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92474
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/apply/overrule
  * @更新时间: 2021-09-10 11:54:34
  */
export type PutWebV1AnomalyApplyOverruleApiRes = null;

/**
  * **请求类型**
  * 设计搞交接
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91946
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/prototype/take-over
  * @更新时间: 2021-09-08 10:59:19
  */
/**
  * 参数
  */
export interface PostWebV1SampleClothesPrototypeTakeOverApiReq {
  /**
   * 设计款号
   */
  designCode: string;
}

/**
  * **返回类型**
  * 设计搞交接
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91946
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/prototype/take-over
  * @更新时间: 2021-09-08 10:59:19
  */
export type PostWebV1SampleClothesPrototypeTakeOverApiRes = null;

/**
  * **请求类型**
  * 添加备注
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91888
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/remark/add
  * @更新时间: 2021-09-08 09:50:16
  */
/**
  * 参数
  */
export interface PostWebV1RemarkAddApiReq {
  /**
   * 业务id
   * <p>
   * clothesId 样衣打版id <p>
   * anomalyId 异常单id <p>
   * repairId 返修单id <p>
   */
  bizId: number | string;
  /**
   * 业务类型: 1-打版、2-异常、3-返修
   */
  bizType: '1' | '2' | '3';
  /**
   * 备注信息
   */
  remark: string;
}

/**
  * **返回类型**
  * 添加备注
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91888
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/remark/add
  * @更新时间: 2021-09-08 09:50:16
  */
export type PostWebV1RemarkAddApiRes = null;

/**
  * **请求类型**
  * 寄送样衣数据新建
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92022
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/send-clothes/save
  * @更新时间: 2021-09-10 10:06:55
  */
/**
  * 请求参数对象
  */
export interface PostWebV1SendClothesSaveApiReq {
  /**
   * 寄送样衣ID
   */
  sendClothesId?: number | string;
  /**
   * 版单ID
   */
  clothesId?: number | string;
  /**
   * 寄送方式
   */
  sendType?: string;
  /**
   * 寄送时间
   */
  sendTime?: string;
  /**
   * 寄送单号
   */
  sendOrderCode?: string;
  /**
   * 寄送样衣状态 WAIT_SEND 待寄送 SENT 已寄送
   */
  sendClothesState?: 'WAIT_SEND' | 'SENT' | 'UNKNOWN';
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 更新人名字
   */
  reviserName?: string;
}

/**
  * **返回类型**
  * 寄送样衣数据新建
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92022
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/send-clothes/save
  * @更新时间: 2021-09-10 10:06:55
  */
/**
  * 响应数据
  */
export type PostWebV1SendClothesSaveApiRes = null;

/**
  * **请求类型**
  * 开始纸样,撤回,开始纸样,排版变更,样衣车版
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92056
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/process
  * @更新时间: 2021-09-08 18:36:32
  */
/**
  * 进程请求参数
  */
export interface PostWebV1PatternClothesProcessApiReq {
  /**
   * 纸样id
   */
  patternId: number | string;
  /**
   * 纸样进程 1:开始分单,2:撤回,3:开始纸样,4:排版变更,5:样衣车版
   */
  processType: 0 | 1 | 2 | 3 | 4;
}

/**
  * **返回类型**
  * 开始纸样,撤回,开始纸样,排版变更,样衣车版
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92056
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/process
  * @更新时间: 2021-09-08 18:36:32
  */
/**
  * 响应数据
  */
export type PostWebV1PatternClothesProcessApiRes = boolean;

/**
  * **请求类型**
  * 撤回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92602
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/back/{patternId}
  * @更新时间: 2021-09-09 21:58:45
  */
export interface PostWebV1PatternClothesBackPatternIdApiReq {
  /**
   * 纸样Id
   */
  patternId: string;
}

/**
  * **返回类型**
  * 撤回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92602
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/back/{patternId}
  * @更新时间: 2021-09-09 21:58:45
  */
/**
  * 响应数据
  */
export type PostWebV1PatternClothesBackPatternIdApiRes = boolean;

/**
  * **请求类型**
  * 纸样分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92600
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/splitting
  * @更新时间: 2021-09-09 21:58:45
  */
/**
  * 请求参数
  */
export interface PostWebV1PatternClothesSplittingApiReq {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 版房id(内部分单的话 id是1,其他id为外部版房的id)
   */
  roomId?: number | string;
  /**
   * 版房名称
   */
  roomName?: string;
  /**
   * 分单类型 PATTERN:纸样 SEW:车版 PATTERN_AND_SEW:纸样+车版
   */
  allocateType?: string;
  /**
   * 当前登录用户ID
   */
  currentUserId?: number | string;
  /**
   * 当前登录用户名称
   */
  currentUserName?: string;
  /**
   * 当前登录用户Code
   */
  currentUserCode?: string;
}

/**
  * **返回类型**
  * 纸样分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92600
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/splitting
  * @更新时间: 2021-09-09 21:58:45
  */
/**
  * 响应数据
  */
export type PostWebV1PatternClothesSplittingApiRes = boolean;

/**
  * **请求类型**
  * 设计审版_不通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92112
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/no-pass
  * @更新时间: 2021-09-08 19:44:05
  */
/**
  * 请求参数对象
  */
export interface PostWebV1DesignAuditNoPassApiReq {
  /**
   * 复版原因
   */
  redoReason: string;
  /**
   * 复版责任方: 1:版房原因、2:设计师原因、3:客户要求
   */
  responsibleParty: number | string;
  /**
   * 设计审版id
   */
  designAuditId: number | string;
  /**
   * 设计审版意见
   */
  auditComments: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture: string[];
}

/**
  * **返回类型**
  * 设计审版_不通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92112
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/no-pass
  * @更新时间: 2021-09-08 19:44:05
  */
/**
  * 响应数据
  */
export type PostWebV1DesignAuditNoPassApiRes = null;

/**
  * **请求类型**
  * 设计审版_样衣返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92114
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/repair
  * @更新时间: 2021-09-08 19:44:05
  */
/**
  * 请求参数对象
  */
export interface PostWebV1DesignAuditRepairApiReq {
  /**
   * 设计审版id
   */
  designAuditId: number | string;
  /**
   * 设计审版意见
   */
  auditComments: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture: string[];
}

/**
  * **返回类型**
  * 设计审版_样衣返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92114
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/repair
  * @更新时间: 2021-09-08 19:44:05
  */
/**
  * 响应数据
  */
export type PostWebV1DesignAuditRepairApiRes = null;

/**
  * **请求类型**
  * 设计审版_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92110
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/pass
  * @更新时间: 2021-09-08 19:44:05
  */
/**
  * 请求参数对象
  */
export interface PostWebV1DesignAuditPassApiReq {
  /**
   * 设计审版id
   */
  designAuditId: number | string;
  /**
   * 设计审版意见
   */
  auditComments: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture: string[];
}

/**
  * **返回类型**
  * 设计审版_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92110
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/pass
  * @更新时间: 2021-09-08 19:44:05
  */
/**
  * 响应数据
  */
export type PostWebV1DesignAuditPassApiRes = null;

/**
  * **请求类型**
  * 客户审版_样衣返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92122
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/repair
  * @更新时间: 2021-09-08 19:44:12
  */
/**
  * 请求参数对象
  */
export interface PostWebV1CustomerAuditRepairApiReq {
  /**
   * 客户审版id
   */
  customerAuditId: number | string;
  /**
   * 设计审版意见
   */
  auditComments: string;
}

/**
  * **返回类型**
  * 客户审版_样衣返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92122
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/repair
  * @更新时间: 2021-09-08 19:44:12
  */
/**
  * 响应数据
  */
export type PostWebV1CustomerAuditRepairApiRes = null;

/**
  * **请求类型**
  * 客户审版_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92120
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/pass
  * @更新时间: 2021-09-08 19:44:12
  */
/**
  * 请求参数对象
  */
export interface PostWebV1CustomerAuditPassApiReq {
  /**
   * 客户审版id
   */
  customerAuditId: number | string;
  /**
   * 客户审版意见
   */
  auditComments: string;
}

/**
  * **返回类型**
  * 客户审版_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92120
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/pass
  * @更新时间: 2021-09-08 19:44:12
  */
/**
  * 响应数据
  */
export type PostWebV1CustomerAuditPassApiRes = null;

/**
  * **请求类型**
  * 1.选中数据，点击【异常发起】，系统弹出【异常发起】弹框，发起人维护弹框中信息，
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92268
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/raise-rxception/{gradingId}
  * @更新时间: 2021-09-09 17:13:43
  */
export interface PostWebV1GradingClothesRaiseRxceptionGradingIdApiReq {
  gradingId: string;
}

/**
  * **返回类型**
  * 1.选中数据，点击【异常发起】，系统弹出【异常发起】弹框，发起人维护弹框中信息，
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92268
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/raise-rxception/{gradingId}
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 响应数据
  */
export type PostWebV1GradingClothesRaiseRxceptionGradingIdApiRes = null;

/**
  * **请求类型**
  * 尺寸推码完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92264
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/push-code/{gradingId}
  * @更新时间: 2021-09-09 17:13:43
  */
export interface PostWebV1GradingClothesPushCodeGradingIdApiReq {
  /**
   * 主键id
   */
  gradingIdList: (string | number)[];
}

/**
  * **返回类型**
  * 尺寸推码完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92264
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/push-code/{gradingId}
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 响应数据
  */
export type PostWebV1GradingClothesPushCodeGradingIdApiRes = null;

/**
  * **请求类型**
  * 放码取消
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92266
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/cancel-grading
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 设计款号和原因
  */
export interface PostWebV1GradingClothesCancelGradingApiReq {
  /**
   * 设计款号集合
   */
  designCodeList?: string[];
  /**
   * 取消原因
   */
  cancelReason?: string;
}

/**
  * **返回类型**
  * 放码取消
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92266
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/cancel-grading
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 响应数据
  */
export type PostWebV1GradingClothesCancelGradingApiRes = null;

/**
  * **请求类型**
  * 更新纸样文件
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92510
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/update-file
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 更新纸样参数
  */
export interface PostWebV1GradingClothesUpdateFileApiReq {
  /**
   * 样衣放码主键
   */
  gradingId: number | string;
  /**
   * 开发纸样
   */
  developPatternUrl?: string;
  /**
   * 纸样文件
   */
  designFileUrl?: string;
}

/**
  * **返回类型**
  * 更新纸样文件
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92510
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/update-file
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 响应数据
  */
export type PostWebV1GradingClothesUpdateFileApiRes = null;

/**
  * **请求类型**
  * 样衣放码（新增）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92262
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/save
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 设计款号相关参数
  */
export interface PostWebV1GradingClothesSaveApiReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
}

/**
  * **返回类型**
  * 样衣放码（新增）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92262
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/save
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 响应数据
  */
export type PostWebV1GradingClothesSaveApiRes = null;

/**
  * **请求类型**
  * 修改
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92436
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/update
  * @更新时间: 2021-09-09 15:26:46
  */
/**
  * 请求参数对象
  */
export interface PutWebV1RepairUpdateApiReq {
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 返修件数
   */
  repairNum?: number | string;
  /**
   * 发起环节/返修环节
   */
  processStep?: number | string;
  /**
   * 返修原因()
   */
  repairReason?: number | string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty?: number | string;
  /**
   * 返修描述
   */
  describe?: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime?: number | string;
  /**
   * 状态（1:待分单，2:已分单，3:进行中，4:已完成）
   */
  status?: number | string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId?: number | string;
}

/**
  * **返回类型**
  * 修改
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92436
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/repair/update
  * @更新时间: 2021-09-09 15:26:46
  */
export type PutWebV1RepairUpdateApiRes = null;

/**
  * **请求类型**
  * 发起返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92418
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/repair/save
  * @更新时间: 2021-09-10 10:21:37
  */
/**
  * 请求参数对象
  */
export interface PostWebV1RepairSaveApiReq {
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 返修件数
   */
  repairNum?: number | string;
  /**
   * 发起环节
   */
  processStep?: number | string;
  /**
   * 返修原因()
   */
  repairReason?: number | string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty?: number | string;
  /**
   * 返修描述
   */
  describe?: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime?: number | string;
}

/**
  * **返回类型**
  * 发起返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92418
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/repair/save
  * @更新时间: 2021-09-10 10:21:37
  */
export type PostWebV1RepairSaveApiRes = null;

/**
  * **请求类型**
  * 修改
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92446
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/update
  * @更新时间: 2021-09-09 15:26:58
  */
/**
  * 请求参数对象
  */
export interface PutWebV1AnomalyUpdateApiReq {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 异常单号,YC+（两位）年（两位）月（两位）日+3位流水号的异常记录
   */
  anomalyCode?: string;
  /**
   * 版单id
   */
  closeId?: number | string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 异常类型（）
   */
  anomalyType?: number | string;
  /**
   * 异常发起人
   */
  sponsor?: string;
  /**
   * 发起环节
   */
  anomalyLink?: string;
  /**
   * 责任部门
   */
  responsibleDepartment?: string;
  /**
   * 责任人
   */
  responsible?: string;
  /**
   * 处理人
   */
  handler?: string;
  /**
   * 驳回/取消原因
   */
  rejectedReason?: string;
  /**
   * 状态（1：待处理，2：驳回待审核，3：已驳回，4：处理中，5；结案待审核，6：已结案）
   */
  status?: number | string;
  /**
   * 创建人姓名
   */
  createdName?: string;
  /**
   * 更新人姓名
   */
  revisedName?: string;
}

/**
  * **返回类型**
  * 修改
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92446
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/update
  * @更新时间: 2021-09-09 15:26:58
  */
export type PutWebV1AnomalyUpdateApiRes = null;

/**
  * **请求类型**
  * 发起异常
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92444
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/save
  * @更新时间: 2021-09-10 11:54:34
  */
/**
  * 请求参数对象
  */
export interface PostWebV1AnomalySaveApiReq {
  /**
   * 版单id
   */
  clothesId: string;
  /**
   * 异常类型编码
   */
  exceptionTypeCode: string;
  /**
   * 异常类型名称
   */
  exceptionTypeName: string;
  /**
   * 责任人部门
   */
  responsibleDepartment: string;
  /**
   * 责任人部门编码
   */
  responsibleDepartmentCode: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
  /**
   * 异常描述
   */
  exceptionDesc: string;
  /**
   * 异常图片
   */
  exceptionPictureList: string[];
  launchBuzType: CLOTHES_STEP_ENUM | null; // 发起异常类型
  launchBuzId: string | null; // 发起类型业务ID 打版-> clothesId 放码-> gradingId 返修-> repairId
  /**
   * 是否发送到外板房，0-不能，1-能
   */
  canSyncExt?: YES_NO_ENUM;
  /**
   * 发起异常所在环节- 样衣返修下-固定 /**_返修环节/REPAIR(700,"返修环节"),
   */
  clothesStep: CLOTHES_STEP_ENUM;
}

/**
  * **返回类型**
  * 发起异常
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92444
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/save
  * @更新时间: 2021-09-10 11:54:34
  */
export type PostWebV1AnomalySaveApiRes = null;

/**
  * **请求类型**
  * 车版分单-撤回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92526
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/recall/{sewId}
  * @更新时间: 2021-09-09 17:33:54
  */
export interface PatchWebV1SewRecallSewIdApiReq {
  /**
   * 主键
   */
  sewId: string;
}

/**
  * **返回类型**
  * 车版分单-撤回
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92526
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/recall/{sewId}
  * @更新时间: 2021-09-09 17:33:54
  */
export type PatchWebV1SewRecallSewIdApiRes = null;

/**
  * **请求类型**
  * 车版分单-车版分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92524
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/allocate
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 请求参数对象
  */
export interface PatchWebV1SewAllocateApiReq {
  /**
   * 车版id
   */
  sewId: number | string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced: number | string;
  /**
   * 版房id （若不是外发，可为空）
   */
  roomId?: number | string;
  /**
   * 版房名字（若不是外发，可为空）
   */
  roomName?: string;
}

/**
  * **返回类型**
  * 车版分单-车版分单
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92524
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/allocate
  * @更新时间: 2021-09-09 17:33:54
  */
export type PatchWebV1SewAllocateApiRes = null;

/**
  * **请求类型**
  * 车缝-开始车缝
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92530
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/assign-sewer
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 请求参数对象
  */
export interface PatchWebV1SewAssignSewerApiReq {
  /**
   * 车版id
   */
  sewId: number | string;
  /**
   * 人员id
   */
  userId: number | string;
  /**
   * 人员名称
   */
  userName: string;
}

/**
  * **返回类型**
  * 车缝-开始车缝
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92530
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/assign-sewer
  * @更新时间: 2021-09-09 17:33:54
  */
export type PatchWebV1SewAssignSewerApiRes = null;

/**
  * **请求类型**
  * 车缝-排单变更
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92532
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/chg-sewer
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 请求参数对象
  */
export interface PatchWebV1SewChgSewerApiReq {
  /**
   * 车版id
   */
  sewId: number | string;
  /**
   * 人员id
   */
  userId: number | string;
  /**
   * 人员名称
   */
  userName: string;
}

/**
  * **返回类型**
  * 车缝-排单变更
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92532
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/chg-sewer
  * @更新时间: 2021-09-09 17:33:54
  */
export type PatchWebV1SewChgSewerApiRes = null;

/**
  * **请求类型**
  * 车缝-收货
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92536
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/receipt
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 请求参数对象
  */
export interface PatchWebV1SewReceiptApiReq {
  /**
   * 车版收货id
   */
  sewReceiptId: number | string;
  /**
   * 件数
   */
  pieces: number | string;
}

/**
  * **返回类型**
  * 车缝-收货
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92536
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/receipt
  * @更新时间: 2021-09-09 17:33:54
  */
export type PatchWebV1SewReceiptApiRes = null;

/**
  * **请求类型**
  * 车缝-裁剪完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92528
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/assign-cutter
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 请求参数对象
  */
export interface PatchWebV1SewAssignCutterApiReq {
  /**
   * 车版id
   */
  sewId: number | string;
  /**
   * 人员id
   */
  userId: number | string;
  /**
   * 人员名称
   */
  userName: string;
}

/**
  * **返回类型**
  * 车缝-裁剪完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92528
  *
  * @请求方法: PATCH
  * @请求地址: /plm-sample-clothes/web/v1/sew/assign-cutter
  * @更新时间: 2021-09-09 17:33:54
  */
export type PatchWebV1SewAssignCutterApiRes = null;

/**
  * **请求类型**
  * 处理环节字典
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91846
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/process-step/dict
  * @更新时间: 2021-09-08 10:59:19
  */
export interface GetWebV1SampleClothesProcessStepDictApiReq { }

/**
  * **返回类型**
  * 处理环节字典
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91846
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/process-step/dict
  * @更新时间: 2021-09-08 10:59:19
  */
export interface GetWebV1SampleClothesProcessStepDictApiResItem {
  /**
   * 环节code
   */
  code?: number | string;
  /**
   * 环节名称
   */
  desc?: string;
}
export type GetWebV1SampleClothesProcessStepDictApiRes = GetWebV1SampleClothesProcessStepDictApiResItem[];

/**
  * **请求类型**
  * 查询所有外部版房和共享版房的名字和id
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92060
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/room/count
  * @更新时间: 2021-09-09 21:58:45
  */
export interface GetWebV1PatternClothesRoomCountApiReq { }

/**
  * **返回类型**
  * 查询所有外部版房和共享版房的名字和id
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92060
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/room/count
  * @更新时间: 2021-09-09 21:58:45
  */
export interface GetWebV1PatternClothesRoomCountApiResItem {
  /**
   * 版房id
   */
  roomId?: number | string;
  /**
   * 版房名字
   */
  roomName?: string;
}
/**
 * 响应数据
 */
export type GetWebV1PatternClothesRoomCountApiRes = GetWebV1PatternClothesRoomCountApiResItem[];

/**
  * **请求类型**
  * 根据设计款号有相同的【商品末级分类】，取与当前时间相近的20个倒序展示
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92066
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/{skcCode}
  * @更新时间: 2021-09-09 21:58:45
  */
export interface GetWebV1PatternClothesSizeSkcCodeApiReq {
  /**
   * 设计款号
   */
  skcCode: string;
}

/**
  * **返回类型**
  * 根据设计款号有相同的【商品末级分类】，取与当前时间相近的20个倒序展示
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92066
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/{skcCode}
  * @更新时间: 2021-09-09 21:58:45
  */
/**
  * 响应数据
  */
export type GetWebV1PatternClothesSizeSkcCodeApiRes = any[];

/**
  * **请求类型**
  * 车缝-车缝完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92534
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/sew/finish
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 车缝量尺json
  */
export interface putWebV1SewFinishApiReqSewSizeInfoRes {
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList?: {
    /**
     * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
     */
    clothesName?: string;
    value?: string;
  }[];
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}
/**
 * 请求参数对象
 */
export interface PutWebV1SewFinishApiReq {
  /**
   * 车版id
   */
  sewId: number | string;
  /**
   * 车缝量尺json
   */
  sewSizeInfo: putWebV1SewFinishApiReqSewSizeInfoRes;
  /**
   * 样衣图图片
   */
  sewPicture?: string[];
}

/**
  * **返回类型**
  * 车缝-车缝完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92534
  *
  * @请求方法: PUT
  * @请求地址: /plm-sample-clothes/web/v1/sew/finish
  * @更新时间: 2021-09-09 17:33:54
  */
export type PutWebV1SewFinishApiRes = null;

/**
  * **请求类型**
  * 查询历史版本列表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91850
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/history-list/{baseProcessCode}
  * @更新时间: 2021-09-08 10:59:19
  */
export interface GetWebV1SampleClothesHistoryListBaseProcessCodeApiReq {
  /**
   * 原始加工单号
   */
  baseProcessCode: string;
}

/**
  * **返回类型**
  * 查询历史版本列表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91850
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/history-list/{baseProcessCode}
  * @更新时间: 2021-09-08 10:59:19
  */
export interface GetWebV1SampleClothesHistoryListBaseProcessCodeApiResItem {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 当前处理环节
   */
  processStep?: number | string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: number | string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isFinish?: number | string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: number | string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: number | string;
  /**
   * 创建人名称
   */
  creatorName?: string;

  [k: string]: any;
}
export type GetWebV1SampleClothesHistoryListBaseProcessCodeApiRes = GetWebV1SampleClothesHistoryListBaseProcessCodeApiResItem[];

/**
  * **请求类型**
  * 异常日志
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91894
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/log/anomaly/list
  * @更新时间: 2021-09-08 09:50:30
  */
export interface GetWebV1LogAnomalyListApiReq {
  /**
   * 异常单id
   */
  anomalyId: string;
}

/**
  * **返回类型**
  * 异常日志
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91894
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/log/anomaly/list
  * @更新时间: 2021-09-08 09:50:30
  */
export interface GetWebV1LogAnomalyListApiResItem {
  /**
   * 日志id
   */
  logId?: number | string;
  /**
   * 业务id
   */
  bizId?: number | string;
  /**
   * 业务类型
   */
  bizType?: number | string;
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 日志信息
   */
  content?: string;
  /**
   * 操作人id
   */
  creatorId?: number | string;
  /**
   * 操作人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}
export type GetWebV1LogAnomalyListApiRes = GetWebV1LogAnomalyListApiResItem[];

/**
  * **请求类型**
  * 打版日志
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91892
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/log/sample-clothes/list
  * @更新时间: 2021-09-08 09:50:30
  */
export interface GetWebV1LogSampleClothesListApiReq {
  /**
   * 样衣打版id
   */
  clothesId: string;
}

/**
  * **返回类型**
  * 打版日志
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91892
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/log/sample-clothes/list
  * @更新时间: 2021-09-08 09:50:30
  */
export interface GetWebV1LogSampleClothesListApiResItem {
  /**
   * 日志id
   */
  logId?: number | string;
  /**
   * 业务id
   */
  bizId?: number | string;
  /**
   * 业务类型
   */
  bizType?: number | string;
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 日志信息
   */
  content?: string;
  /**
   * 操作人id
   */
  creatorId?: number | string;
  /**
   * 操作人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}
export type GetWebV1LogSampleClothesListApiRes = GetWebV1LogSampleClothesListApiResItem[];

/**
  * **请求类型**
  * 返修日志
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91896
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/log/repair/list
  * @更新时间: 2021-09-08 09:50:30
  */
export interface GetWebV1LogRepairListApiReq {
  /**
   * 返修单id
   */
  repairId: string;
}

/**
  * **返回类型**
  * 返修日志
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91896
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/log/repair/list
  * @更新时间: 2021-09-08 09:50:30
  */
export interface GetWebV1LogRepairListApiResItem {
  /**
   * 日志id
   */
  logId?: number | string;
  /**
   * 业务id
   */
  bizId?: number | string;
  /**
   * 业务类型
   */
  bizType?: number | string;
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 日志信息
   */
  content?: string;
  /**
   * 操作人id
   */
  creatorId?: number | string;
  /**
   * 操作人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}
export type GetWebV1LogRepairListApiRes = GetWebV1LogRepairListApiResItem[];

/**
  * **请求类型**
  * 核算完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92028
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-count/save
  * @更新时间: 2021-09-10 10:06:33
  */
export interface postWebV1CheckCountSaveApiReqBomOrderMaterialListResItem {
  bomMaterialId?: number | string;
  bomId?: number | string;
  trackResultId?: number | string;
  prototypeMaterialName?: string;
  partUse?: string;
  singleDosage?: number | string;
  cuttingMethod?: string;
  dosageAccount?: number | string;
  materialRemarkList?: {
    designRemarksId?: number | string;
    remark?: string;
    creatorId?: number | string;
    createdName?: string;
    createdTime?: string;
  }[];
  bingPurchaseState?: number | string;
  demandId?: number | string;
  demandType?: number | string;
  matchId?: number | string;
  matchCode?: string;
  commodityType?: string;
  commodityName?: string;
  commodityId?: number | string;
  matchPictureList?: string[];
  commodityCode?: string;
  commodityNumber?: string;
  material?: string;
  skuCode?: string;
  matchSalePrice?: string;
  matchPurchaseUnitName?: string;
  packNumber?: number | string;
  packNumberUnit?: string;
  skuAttrs?: string;
  widthLow?: string;
  widthHigh?: string;
  widthUnit?: string;
  saleUnit?: string;
  weightLow?: string;
  weightHigh?: string;
  weightUnit?: string;
  colorName?: string;
  colorNumber?: string;
  matchSampleGuidePrice?: string;
  matchSampleUnit?: string;
  matchGuidePrice?: string;
  matchCostPriceUnit?: string;
  matchPurchaseGap?: string;
  matchSource?: number | string;
  matcherName?: string;
  matchRemark?: string;
  unfinishedReason?: string;
  colorCardPicture?: string;
  isConfirm?: number | string;
  craftDemandInfoList?: {
    craftDemandId?: number | string;
    bomId?: number | string;
    bomMaterialId?: number | string;
    prototypeId?: number | string;
    designCode?: string;
    category1?: string;
    category2?: string;
    category3?: string;
    craftsRequire?: number | string;
    undertakeType?: string;
    innerFactoryId?: number | string;
    factoryName?: string;
    contactName?: string;
    contactPhone?: string;
    contactProvince?: string;
    contactCity?: string;
    contactRegion?: string;
    contactDetailAddress?: string;
    pictureList?: string[];
    positionRequirement?: string;
    sizeRequirement?: string;
    colorRequirement?: string;
    weightRequirement?: string;
    otherRequirement?: string;
    creatorId?: number | string;
    createdTime?: string;
    creatorName?: string;
  }[];
}
/**
 * 请求参数对象
 */
export interface PostWebV1CheckCountSaveApiReq {
  /**
   * 核算（用量）表ID
   */
  checkCountId?: number | string;
  /**
   * 唛架图{多张以英文逗号分隔}
   */
  markFramePictureList?: string[];
  clothesId?: number | string;
  /**
   * bom物料列表
   */
  bomOrderMaterialList?: postWebV1CheckCountSaveApiReqBomOrderMaterialListResItem[];
}

/**
  * **返回类型**
  * 核算完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92028
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-count/save
  * @更新时间: 2021-09-10 10:06:33
  */
/**
  * 响应数据
  */
export type PostWebV1CheckCountSaveApiRes = null;

/**
  * **请求类型**
  * 核价完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92034
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-price/save
  * @更新时间: 2021-09-10 10:06:44
  */
export interface postWebV1CheckPriceSaveApiReqProcessCostInfoListResItem {
  /**
   * 工序环节
   */
  processStep?: string;
  /**
   * 工序名称
   */
  processName?: string;
  /**
   * 工价
   */
  price?: number | string;
}
/**
 * 请求参数对象
 */
export interface PostWebV1CheckPriceSaveApiReq {
  /**
   * 核价表ID
   */
  checkPriceId?: number | string;
  /**
   * clothId
   */
  clothesId?: number | string;
  /**
   * 工序费用
   */
  processCostInfoList?: postWebV1CheckPriceSaveApiReqProcessCostInfoListResItem[];
}

/**
  * **返回类型**
  * 核价完成
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92034
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-price/save
  * @更新时间: 2021-09-10 10:06:44
  */
/**
  * 响应数据
  */
export type PostWebV1CheckPriceSaveApiRes = null;

/**
  * **请求类型**
  * 尺寸表提交
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92072
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/commit
  * @更新时间: 2021-09-09 21:58:46
  */
export interface postWebV1PatternClothesSizeCommitApiReqCustomerSizeListResItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}
/**
 * 请求参数
 */
export interface PostWebV1PatternClothesSizeCommitApiReq {
  /**
   * 尺寸表id
   */
  patternSizeId?: number | string;
  /**
   * 纸样主表id
   */
  patternId?: number | string;
  /**
   * 加工单号
   */
  processCode?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 商品类型
   */
  commodityType?: string;
  /**
   * 客户尺寸信息
   */
  customerSizeList?: postWebV1PatternClothesSizeCommitApiReqCustomerSizeListResItem[];
  /**
   * 尺寸版本
   */
  sizeVersion?: number | string;
  /**
   * 保存状态 0:临时保存 |1:提交
   */
  saveType?: number | string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 更新人名字
   */
  reviserName?: string;
}

/**
  * **返回类型**
  * 尺寸表提交
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92072
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/commit
  * @更新时间: 2021-09-09 21:58:46
  */
/**
  * 响应数据
  */
export type PostWebV1PatternClothesSizeCommitApiRes = boolean;

/**
  * **请求类型**
  * 样衣质检_返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92094
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/repair
  * @更新时间: 2021-09-09 15:46:31
  */
/**
  * 返修信息对象
  */
export interface postWebV1SampleQcRepairApiReqRepairInfoRes {
  /**
   * 返修原因
   */
  repairReason: number | string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty: number | string;
  /**
   * 返修描述
   */
  describe: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime: number | string;
  /**
   * 返修件数
   */
  repairNum: number | string;
}
export interface postWebV1SampleQcRepairApiReqSizeInfoListResItem {
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList?: {
    /**
     * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
     */
    clothesName?: string;
    value?: string;
  }[];
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}
/**
 * 请求参数对象
 */
export interface PostWebV1SampleQcRepairApiReq {
  /**
   * 返修信息对象
   */
  repairInfo?: postWebV1SampleQcRepairApiReqRepairInfoRes;
  /**
   * 样衣质检单id
   */
  sampleQcId: number | string;
  /**
   * 问题类型
   */
  questionType: string;
  /**
   * 问题描述
   */
  questionDescription: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture: string[];
  /**
   * 质检尺寸数据集合
   */
  sizeInfoList: postWebV1SampleQcRepairApiReqSizeInfoListResItem[];
}

/**
  * **返回类型**
  * 样衣质检_返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92094
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/repair
  * @更新时间: 2021-09-09 15:46:31
  */
/**
  * 响应数据
  */
export type PostWebV1SampleQcRepairApiRes = null;

/**
  * **请求类型**
  * 样衣质检_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92092
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/pass
  * @更新时间: 2021-09-09 15:46:31
  */
export interface postWebV1SampleQcPassApiReqSizeInfoListResItem {
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList?: {
    /**
     * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
     */
    clothesName?: string;
    value?: string;
  }[];
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}
/**
 * 请求参数对象
 */
export interface PostWebV1SampleQcPassApiReq {
  /**
   * 样衣质检单id
   */
  sampleQcId: number | string;
  /**
   * 问题类型
   */
  questionType: string;
  /**
   * 问题描述
   */
  questionDescription: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture: string[];
  /**
   * 质检尺寸数据集合
   */
  sizeInfoList: postWebV1SampleQcPassApiReqSizeInfoListResItem[];
}

/**
  * **返回类型**
  * 样衣质检_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92092
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/pass
  * @更新时间: 2021-09-09 15:46:31
  */
/**
  * 响应数据
  */
export type PostWebV1SampleQcPassApiRes = null;

/**
  * **请求类型**
  * 样衣审版_不通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92102
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/no-pass
  * @更新时间: 2021-09-08 19:43:58
  */
export interface postWebV1SampleAuditNoPassApiReqAuditCommentListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 序号(排序用)
   */
  serialNumber: number | string;
  /**
   * 审版评语
   */
  auditComment: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}
/**
 * 请求参数对象
 */
export interface PostWebV1SampleAuditNoPassApiReq {
  /**
   * 复版原因
   */
  redoReason: string;
  /**
   * 复版责任方: 1:版房原因、2:设计师原因、3:客户要求
   */
  responsibleParty: number | string;
  /**
   * 样衣审版id
   */
  sampleAuditId: number | string;
  /**
   * 样衣审版评语集合
   */
  auditCommentList: postWebV1SampleAuditNoPassApiReqAuditCommentListResItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   * 当版本为1时,样衣图取样衣质检环节的【样衣图】字段
   */
  sampleClothPicture: string[];
}

/**
  * **返回类型**
  * 样衣审版_不通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92102
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/no-pass
  * @更新时间: 2021-09-08 19:43:58
  */
/**
  * 响应数据
  */
export type PostWebV1SampleAuditNoPassApiRes = null;

/**
  * **请求类型**
  * 样衣审版_返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92104
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/repair
  * @更新时间: 2021-09-08 19:43:58
  */
/**
  * 返修信息对象
  */
export interface postWebV1SampleAuditRepairApiReqRepairInfoRes {
  /**
   * 返修原因
   */
  repairReason: number | string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty: number | string;
  /**
   * 返修描述
   */
  describe: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime: number | string;
  /**
   * 返修件数
   */
  repairNum: number | string;
}
export interface postWebV1SampleAuditRepairApiReqAuditCommentListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 序号(排序用)
   */
  serialNumber: number | string;
  /**
   * 审版评语
   */
  auditComment: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}
/**
 * 请求参数对象
 */
export interface PostWebV1SampleAuditRepairApiReq {
  /**
   * 返修信息对象
   */
  repairInfo?: postWebV1SampleAuditRepairApiReqRepairInfoRes;
  /**
   * 样衣审版id
   */
  sampleAuditId: number | string;
  /**
   * 样衣审版评语集合
   */
  auditCommentList: postWebV1SampleAuditRepairApiReqAuditCommentListResItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   * 当版本为1时,样衣图取样衣质检环节的【样衣图】字段
   */
  sampleClothPicture: string[];
}

/**
  * **返回类型**
  * 样衣审版_返修
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92104
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/repair
  * @更新时间: 2021-09-08 19:43:58
  */
/**
  * 响应数据
  */
export type PostWebV1SampleAuditRepairApiRes = null;

/**
  * **请求类型**
  * 样衣审版_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92100
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/pass
  * @更新时间: 2021-09-08 19:43:58
  */
export interface postWebV1SampleAuditPassApiReqAuditCommentListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 序号(排序用)
   */
  serialNumber: number | string;
  /**
   * 审版评语
   */
  auditComment: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}
/**
 * 请求参数对象
 */
export interface PostWebV1SampleAuditPassApiReq {
  /**
   * 样衣审版id
   */
  sampleAuditId: number | string;
  /**
   * 样衣审版评语集合
   */
  auditCommentList: postWebV1SampleAuditPassApiReqAuditCommentListResItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   * 当版本为1时,样衣图取样衣质检环节的【样衣图】字段
   */
  sampleClothPicture: string[];
}

/**
  * **返回类型**
  * 样衣审版_通过
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92100
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/pass
  * @更新时间: 2021-09-08 19:43:58
  */
/**
  * 响应数据
  */
export type PostWebV1SampleAuditPassApiRes = null;

/**
  * **请求类型**
  * 复制引用的设计款号信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92258
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo/copy-designcodeinfo/{designCode}
  * @更新时间: 2021-09-09 10:33:05
  */
export interface GetWebV1LargeCargoCopyDesigncodeinfoDesignCodeApiReq {
  /**
   * 设计款号编码
   */
  designCode: string;
}

/**
  * **返回类型**
  * 复制引用的设计款号信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92258
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo/copy-designcodeinfo/{designCode}
  * @更新时间: 2021-09-09 10:33:05
  */
export interface GetWebV1LargeCargoCopyDesigncodeinfoDesignCodeApiResItem {
  /**
   * 主键
   */
  sizeId?: number | string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 样衣放码id
   */
  gradingId?: number | string;
  /**
   * 商品类型名称
   */
  productCategoryName?: string;
  /**
   * 商品类型编码
   */
  productCategory?: string;
  /**
   * 部位
   */
  position?: string;
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension?: number | string;
  /**
   * 量法
   */
  measureWay?: string;
  /**
   * 客户要求尺寸
   */
  customerRequestSize?: number | string;
  /**
   * 客户要求尺寸基码
   */
  customerRequestBaseYardage?: string;
  /**
   * 样衣尺寸
   */
  sampleSize?: number | string;
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage?: string;
  /**
   * 纸样尺寸
   */
  designSize?: number | string;
  /**
   * 纸样尺寸基码
   */
  designBaseYardage?: string;
  /**
   * 跳码系数json [{"data":"11","size":"XXS-M"},{"data":"11","size":"XXS-M"}]
   */
  skipSizeQuotietyJson?: string;
  /**
   * 尺寸数据json [{"data":"11","size":"S"},{"data":"11","size":"XS"}]
   */
  sizeJson?: string;
  /**
   * 允差范围 CM
   */
  deviationRange?: number | string;
}
/**
 * 响应数据
 */
export type GetWebV1LargeCargoCopyDesigncodeinfoDesignCodeApiRes = GetWebV1LargeCargoCopyDesigncodeinfoDesignCodeApiResItem[];

/**
  * **请求类型**
  * 大货尺寸表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92252
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo/bulk-size
  * @更新时间: 2021-09-09 10:33:04
  */
/**
  * 查询参数
  */
export interface PostWebV1LargeCargoBulkSizeApiReq {
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 版单id
   */
  clothesId: number | string;
}

/**
  * **返回类型**
  * 大货尺寸表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92252
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo/bulk-size
  * @更新时间: 2021-09-09 10:33:04
  */
export interface PostWebV1LargeCargoBulkSizeApiResItem {
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 主键
   */
  sizeId?: number | string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 样衣放码id
   */
  gradingId?: number | string;
  /**
 * 商品末级分类名称
 */
  productCategory3Name: string;

  /**
   * 商品末级分类编码
   */
  productCategory3: string;
  /**
   * 商品类型名称
   */
  productCategory2Name?: string;
  /**
   * 商品类型编码
   */
  productCategory2?: string;
  /**
   * 部位
   */
  position?: string;
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension?: number | string;
  /**
   * 量法
   */
  measureWay?: string;
  /**
   * 客户要求尺寸
   */
  customerRequestSize?: number | string;
  /**
   * 客户要求尺寸基码
   */
  customerRequestBaseYardage?: string;
  /**
   * 样衣尺寸
   */
  sampleSize?: number | string;
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage?: string;
  /**
   * 纸样尺寸
   */
  designSize?: number | string;
  /**
   * 纸样尺寸基码
   */
  designBaseYardage?: string;
  /**
   * 跳码系数json [{"data":"11","size":"XXS-M"},{"data":"11","size":"XXS-M"}]
   */
  skipSizeQuotietyJson?: string;
  /**
   * 尺寸数据json [{"data":"11","size":"S"},{"data":"11","size":"XS"}]
   */
  sizeJson?: string;
  /**
   * 允差范围 CM
   */
  deviationRange?: number | string;
}
/**
 * 响应数据
 */
export type PostWebV1LargeCargoBulkSizeApiRes = PostWebV1LargeCargoBulkSizeApiResItem[];

/**
  * **请求类型**
  * 大货尺寸表新增
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92256
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo
  * @更新时间: 2021-09-09 10:33:05
  */
export interface postWebV1LargeCargoApiReqGradingLargeCargoSizeListResItem {
  /**
   * 主键
   */
  sizeId?: number | string;
  /**
   * 样衣放码id
   */
  gradingId?: number | string;
  /**
   * 商品类型名称
   */
  productCategoryName?: string;
  /**
   * 商品类型编码
   */
  productCategory?: string;
  /**
   * 部位
   */
  position: string;
  /**
   * 尺寸维度 1-X1、2-X2
   */
  sizeDimension?: number | string;
  /**
   * 量法
   */
  measureWay: string;
  /**
   * 客户要求尺寸
   */
  customerRequestSize?: number | string;
  /**
   * 客户要求尺寸基码
   */
  customerRequestBaseYardage?: string;
  /**
   * 样衣尺寸
   */
  sampleSize?: number | string;
  /**
   * 样衣尺寸基码
   */
  sampleBaseYardage?: string;
  /**
   * 纸样尺寸
   */
  designSize?: number | string;
  /**
   * 纸样尺寸基码
   */
  designBaseYardage?: string;
  /**
   * 跳码系数json [{"data":"11","size":"XXS-M"},{"data":"11","size":"XXS-M"}]
   */
  skipSizeQuotietyJson?: string;
  /**
   * 尺寸数据json [{"data":"11","size":"S"},{"data":"11","size":"XS"}]
   */
  sizeJson?: string;
  /**
   * 允差范围 CM
   */
  deviationRange?: number | string;
}
/**
 * 新增的数据参数
 */
export interface PostWebV1LargeCargoApiReq {
  /**
   * 尺寸表信息不
   */
  gradingLargeCargoSizeList: postWebV1LargeCargoApiReqGradingLargeCargoSizeListResItem[];
  /**
   * 引用设计款号
   */
  quoteDesignCode?: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 商品类型编码
   */
  productCategory2: string;
  /**
   * 商品类型名称
   */
  productCategory2Name?: string;
  /**
   * 商品末级分类名称
   */
  productCategory3Name?: string;
  /**
   * 商品末级分类编码
   */
  productCategory3: string;
}

/**
  * **返回类型**
  * 大货尺寸表新增
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92256
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo
  * @更新时间: 2021-09-09 10:33:05
  */
/**
  * 响应数据
  */
export type PostWebV1LargeCargoApiRes = null;

/**
  * **请求类型**
  * 根据设计款号查询物料清单信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92254
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo/bom-list/{designCode}
  * @更新时间: 2021-09-09 10:33:04
  */
export interface GetWebV1LargeCargoBomListDesignCodeApiReq {
  /**
   * 设计款号编码
   */
  designCode: string;
}

/**
  * **返回类型**
  * 根据设计款号查询物料清单信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92254
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/large-cargo/bom-list/{designCode}
  * @更新时间: 2021-09-09 10:33:04
  */
export interface GetWebV1LargeCargoBomListDesignCodeApiResItem {
  /**
   * bom物料ID
   */
  bomMaterialId?: number | string;
  /**
   * bomID
   */
  bomId?: number | string;
  /**
   * 物料确认结果ID
   */
  trackResultId?: number | string;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName?: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 单件用量
   */
  singleDosage?: number | string;
  /**
   * 裁剪方式
   */
  cuttingMethod?: string;
  /**
   * 用量核算
   */
  dosageAccount?: number | string;
  /**
   * bom物料备注列表
   */
  materialRemarkList?: {
    /**
     * 备注ID
     */
    designRemarksId?: number | string;
    /**
     * 备注信息
     */
    remark?: string;
    /**
     * 操作人id
     */
    creatorId?: number | string;
    /**
     * 操作人名称
     */
    createdName?: string;
    /**
     * 创建时间
     */
    createdTime?: string;
  }[];
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState?: number | string;
  /**
   * 需求单id
   */
  demandId?: number | string;
  /**
   * 需求类型: 1, 面料; 2, 辅料;
   */
  demandType?: number | string;
  /**
   * 需求匹配单id
   */
  matchId?: number | string;
  /**
   * 需求匹配单编码
   */
  matchCode?: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 辅料
   */
  commodityType?: string;
  /**
   * 商品名称(品名)
   */
  commodityName?: string;
  /**
   * 商品id
   */
  commodityId?: number | string;
  /**
   * 匹配物料图片
   */
  matchPictureList?: string[];
  /**
   * 匹配物料SPU编码: 商品编码
   */
  commodityCode?: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber?: string;
  /**
   * 成分; json, 会有多种成分比例
   */
  material?: string;
  /**
   * SKU编码(辅料)
   */
  skuCode?: string;
  /**
   * 销售价格(辅料)
   */
  matchSalePrice?: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName?: string;
  /**
   * 包装数量(辅料)
   */
  packNumber?: number | string;
  /**
   * 包装数量单位(辅料)
   */
  packNumberUnit?: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs?: string;
  /**
   * 幅宽最低值
   */
  widthLow?: string;
  /**
   * 幅宽最高值
   */
  widthHigh?: string;
  /**
   * 幅宽单位
   */
  widthUnit?: string;
  /**
   * 销售单位
   */
  saleUnit?: string;
  /**
   * 克重最低值
   */
  weightLow?: string;
  /**
   * 克重最高值
   */
  weightHigh?: string;
  /**
   * 克重单位
   */
  weightUnit?: string;
  /**
   * 色系
   */
  colorName?: string;
  /**
   * 色号
   */
  colorNumber?: string;
  /**
   * 剪版销价
   */
  matchSampleGuidePrice?: string;
  /**
   * 剪版销价单位
   */
  matchSampleUnit?: string;
  /**
   * 大货销价
   */
  matchGuidePrice?: string;
  /**
   * 大货销价单位
   */
  matchCostPriceUnit?: string;
  /**
   * 销售空差
   */
  matchPurchaseGap?: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource?: number | string;
  /**
   * 回复人员
   */
  matcherName?: string;
  /**
   * 匹配反馈备注
   */
  matchRemark?: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason?: string;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPicture?: string;
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm?: number | string;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList?: {
    /**
     * 主键id
     */
    craftDemandId?: number | string;
    /**
     * bomID
     */
    bomId?: number | string;
    /**
     * bom详情ID
     */
    bomMaterialId?: number | string;
    /**
     * 版单id
     */
    prototypeId?: number | string;
    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    designCode?: string;
    /**
     * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
     */
    category1?: string;
    /**
     * 材料类型 二级分类
     */
    category2?: string;
    /**
     * 材料类型 三级分类
     */
    category3?: string;
    /**
     * 工艺要求:  100:裁版前工艺 110:裁版后工艺
     */
    craftsRequire?: number | string;
    /**
     * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
     */
    undertakeType?: string;
    /**
     * 内部工艺厂ID
     */
    innerFactoryId?: number | string;
    /**
     * 工艺厂名,外部独有
     */
    factoryName?: string;
    /**
     * 工艺承接者-联系人
     */
    contactName?: string;
    /**
     * 工艺承接者-工厂联系电话
     */
    contactPhone?: string;
    /**
     * 工艺承接者-所在省份
     */
    contactProvince?: string;
    /**
     * 工艺承接者-所在城市
     */
    contactCity?: string;
    /**
     * 工艺承接者-所在区/县
     */
    contactRegion?: string;
    /**
     * 工艺承接者-详细地址
     */
    contactDetailAddress?: string;
    /**
     * 工艺图片，最多9张
     */
    pictureList?: string[];
    /**
     * 位置要求
     */
    positionRequirement?: string;
    /**
     * 尺寸要求
     */
    sizeRequirement?: string;
    /**
     * 颜色要求
     */
    colorRequirement?: string;
    /**
     * 克重要求
     */
    weightRequirement?: string;
    /**
     * 其他工艺要求
     */
    otherRequirement?: string;
    /**
     * 创建人id
     */
    creatorId?: number | string;
    /**
     * 创建时间
     */
    createdTime?: string;
    /**
     * 创建人名称
     */
    creatorName?: string;
  }[];
}
/**
 * 响应数据
 */
export type GetWebV1LargeCargoBomListDesignCodeApiRes = GetWebV1LargeCargoBomListDesignCodeApiResItem[];

/**
  * **请求类型**
  * 不同状态的数量统计
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92512
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/statistics
  * @更新时间: 2021-09-09 17:13:43
  */
export interface GetWebV1GradingClothesStatisticsApiReq { }

/**
  * **返回类型**
  * 不同状态的数量统计
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92512
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/statistics
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 响应数据
  */
export interface GetWebV1GradingClothesStatisticsApiRes {
  /**
   * 待放码
   */
  graded?: number | string;
  /**
   * 已放码
   */
  grading?: number | string;
  /**
   * 已取消
   */
  cancelled?: number | string;
}

/**
  * **请求类型**
  * 查询历史列表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92522
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sew/sew-history-list
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 分页对象
  */
export interface PostWebV1SewSewHistoryListApiReq {
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
}

/**
  * **返回类型**
  * 查询历史列表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92522
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sew/sew-history-list
  * @更新时间: 2021-09-09 17:33:54
  */
export interface PostWebV1SewSewHistoryListApiResItem {
  /**
   * 车版id
   */
  sewId?: number | string;
  /**
   * 车版收货id
   */
  sewReceiptId?: number | string;
  /**
   * 车版分单/供应商（版房名字）
   */
  roomName?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 纸样url
   */
  patternUrl?: string;
  /**
   * 纸样版本状态数量
   */
  patternVersion?: number | string;
  /**
   * 车缝量尺
   */
  sewSizeInfo?: {
    /**
     * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
     */
    clothesTrimSizeList?: {
      /**
       * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
       */
      clothesName?: string;
      value?: string;
    }[];
    /**
     * 部位编码
     */
    positionCode?: string;
    /**
     * 部位编码名字
     */
    positionName?: string;
    /**
     * 尺寸维度
     */
    dimension?: string;
    /**
     * 量法
     */
    measuringMethod?: string;
    /**
     * 客户尺寸
     */
    size?: string;
    /**
     * 样衣尺寸
     */
    sampleClothesSize?: string;
    /**
     * 纸样尺寸
     */
    patternSize?: string;
    /**
     * 允差范围
     */
    tolerance?: string;
  };
  /**
   * 收货件数
   */
  receiptNumber?: number | string;
  /**
   * 样衣图图片
   */
  sewPictureList?: string[];
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
export type PostWebV1SewSewHistoryListApiRes = PostWebV1SewSewHistoryListApiResItem[];

/**
  * **请求类型**
  * 根据设计款号查询最新的尺寸表信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92068
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/new/{skcCode}
  * @更新时间: 2021-09-09 21:58:45
  */
export interface GetWebV1PatternClothesSizeNewSkcCodeApiReq {
  /**
   * 引用skc款号
   */
  skcCode: string;
}

/**
  * **返回类型**
  * 根据设计款号查询最新的尺寸表信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92068
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/new/{skcCode}
  * @更新时间: 2021-09-09 21:58:45
  */
/**
  * 响应数据
  */
export interface GetWebV1PatternClothesSizeNewSkcCodeApiRes {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}

/**
  * **请求类型**
  * 二次工艺汇总列表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92388
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/second-craft/list
  * @更新时间: 2021-09-09 14:44:37
  */
export interface PostWebV1SecondCraftListApiReq {
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 面料工艺类型 ---最后一级
   */
  fabricCategory?: string;
  /**
   * 辅料工艺类型 ---最后一级
   */
  accessoriesCategory?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 当前环节
   */
  craftState?: string;
  /**
   * 工艺环节
   */
  craftsProcess?: string;
  /**
   * 样衣版本
   */
  clothesVersion?: number | string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否工艺补充(1-已补充、0-待补充)
   */
  isCraftSupplement?: number | string;
}

/**
  * **返回类型**
  * 二次工艺汇总列表
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92388
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/second-craft/list
  * @更新时间: 2021-09-09 14:44:37
  */
/**
  * 响应数据
  */
export interface PostWebV1SecondCraftListApiRes {
  /**
   * 二次工艺主键id
   */
  secondCraftId?: number | string;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 当前环节
   */
  craftState?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: number | string;
  /**
   * 工艺环节,字典code
   */
  craftsProcess?: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 工艺图片列表
   */
  craftPictureList?: string[];
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺需求创建时间
   */
  craftCreatedTime?: string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片列表
   */
  customerPictureList?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
}

/**
  * **请求类型**
  * 查询异常详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92442
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/{id}
  * @更新时间: 2021-09-10 11:54:34
  */
export interface GetWebV1AnomalyIdApiReq {
  /**
   * 主键
   */
  id: string;
}

/**
  * **返回类型**
  * 查询异常详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92442
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/{id}
  * @更新时间: 2021-09-10 11:54:34
  */
export interface GetWebV1AnomalyIdApiRes {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 异常单号,YC+（两位）年（两位）月（两位）日+3位流水号的异常记录
   */
  anomalyCode?: string;
  /**
   * 版单id
   */
  closeId?: number | string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 异常类型（）
   */
  anomalyType?: number | string;
  /**
   * 异常发起人id
   */
  sponsorId?: number | string;
  /**
   * 异常发起人姓名
   */
  sponsorName?: string;
  /**
   * 发起环节： 200: 纸样待分单、 230: 内部纸样-待进行、 250: 内部纸样-进行中、
   *  270: 外部纸样-待接单、 290: 外部纸样-进行中、 300: 面辅料齐套、 400: 车版待分单、
   *  410: 内部车版-裁剪进行中、 420: 内部车版-裁片二次工艺、 430: 内部车版-车缝待进行、
   * 440: 内部车版-车缝-半成品二次工艺、 460: 内部车版-车缝进行中、 470: 内部车版-成品二次工艺、
   *  500: 外部车版-待接单、 510: 外部车版-裁剪、 520: 外部车版-裁片二次工艺、
   * 530: 外部车版-车缝待进行、 540: 外部车版-车缝-半成品二次工艺、 550: 外部车版-车缝进行中、
   * 560: 外部车版-成品二次工艺、 570: 外部车版-送货、 580: 外部车版-收货、 600: 样衣质检、
   * 610: 样衣审版、 620: 设计审版、 630: 用量维护、 640: 样衣核价、 650: 寄送样衣、 660: 客户审版
   */
  processStep?: string;
  /**
   * 责任部门
   */
  responsibleDepartment?: string;
  /**
   * 责任人id
   */
  responsibleId?: number | string;
  /**
   * 责任人姓名
   */
  responsibleName?: string;
  /**
   * 异常图片
   */
  picture?: string;
  /**
   * 异常描述
   */
  description?: string;
  /**
   * 处理人id
   */
  handlerId?: number | string;
  /**
   * 处理人姓名
   */
  handlerName?: string;
  /**
   * 驳回/取消原因
   */
  rejectedReason?: string;
  /**
   * 状态（1：待处理，2：驳回待审核，3：已驳回，4：处理中，5；结案待审核，6：已结案）
   */
  status?: number | string;
  /**
   * 处理完成时间
   */
  completeTime?: string;
  /**
   * 创建人姓名
   */
  createdName?: string;
  /**
   * 更新人姓名
   */
  revisedName?: string;
}

/**
  * **请求类型**
  * 加工单详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91852
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/detail/{clothesId}
  * @更新时间: 2021-09-08 10:59:20
  */
export interface GetWebV1SampleClothesDetailClothesIdApiReq {
  /**
   * 样衣打版id
   */
  clothesId: string;
}

/**
  * **返回类型**
  * 加工单详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91852
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/detail/{clothesId}
  * @更新时间: 2021-09-08 10:59:20
  */
/**
  * 加工单基本信息
  */
export interface getWebV1SampleClothesDetailClothesIdApiResClothesRes {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 当前处理环节
   */
  processStep?: number | string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: number | string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isFinish?: number | string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: number | string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: number | string;
  /**
   * 创建人名称
   */
  creatorName?: string;
}
/**
 * 加工单明细
 */
export interface getWebV1SampleClothesDetailClothesIdApiResDetailRes {
  /**
   * 版单详细表id
   */
  detailId?: number | string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 设计图片
   */
  designPictureList?: string[];
  /**
   * 复色款号
   */
  makeSameDesignCode?: string;
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime?: string;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: string;
  /**
   * 齐套签收时间
   */
  materialSignTime?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
  /**
   * 核算师id
   */
  checkerId?: number | string;
  /**
   * 核算师名称
   */
  checkerName?: string;
  /**
   * 核价师id
   */
  pricerId?: number | string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 寄送员id
   */
  senderId?: number | string;
  /**
   * 寄送员名称
   */
  senderName?: string;
  /**
   * 完成时间
   */
  finishTime?: string;
  /**
   * 版单取消时间
   */
  cancelTime?: string;
  /**
   * 版单取消原因
   */
  cancelReason?: string;
  /**
   * 取消版单操作人id
   */
  cancelUserId?: number | string;
  /**
   * 版单取消操作人姓名
   */
  cancelUserName?: string;
  /**
   * 版单取消备注
   */
  cancelRemark?: string;
  /**
   * 备注记录
   */
  remark?: string;
}
export interface GetWebV1SampleClothesDetailClothesIdApiRes {
  /**
   * 加工单基本信息
   */
  clothes?: getWebV1SampleClothesDetailClothesIdApiResClothesRes;
  /**
   * 加工单明细
   */
  detail?: getWebV1SampleClothesDetailClothesIdApiResDetailRes;
}

/**
  * **请求类型**
  * 统计待进行,进行中,已完成状态
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92058
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/count
  * @更新时间: 2021-09-09 21:58:45
  */
export interface GetWebV1PatternClothesCountApiReq { }

/**
  * **返回类型**
  * 统计待进行,进行中,已完成状态
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92058
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/count
  * @更新时间: 2021-09-09 21:58:45
  */
export interface getWebV1PatternClothesCountApiResPatternStateCountListResItem {
  /**
   * 状态编码
   */
  state?: number | string;
  /**
   * 上传状态枚举 PENDING:待进行,PROGRESS:进行中,COMPLETED:已完成
   */
  patternStateEnum?: string;
  /**
   * 状态名字
   */
  stateName?: string;
  /**
   * 数量
   */
  stateCount?: number | string;
}
/**
 * 响应数据
 */
export interface GetWebV1PatternClothesCountApiRes {
  /**
   * 总数
   */
  total?: number | string;
  /**
   * 数据状态
   */
  patternStateCountList?: getWebV1PatternClothesCountApiResPatternStateCountListResItem[];
}

/**
  * **请求类型**
  * 查询列表（全部、已完成、已取消页面）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91848
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/page
  * @更新时间: 2021-09-08 10:59:19
  */
/**
  * 分页对象
  */
export interface PostWebV1SampleClothesPageApiReq {
  /**
   * 当前处理环节code （参考 当前环节字典列表api）
   */
  processStep?: number | string;
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessTypeEnum?: 'OVERDUE' | 'NOT_EXPIRED';
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: number | string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: number | string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  pageNum?: number | string;
  pageSize?: number | string;
}

/**
  * **返回类型**
  * 查询列表（全部、已完成、已取消页面）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91848
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-clothes/page
  * @更新时间: 2021-09-08 10:59:19
  */
export interface postWebV1SampleClothesPageApiResListResItem {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 当前处理环节
   */
  processStep?: number | string;
  /**
   * 当前处理环节名称
   */
  processStepDesc?: number | string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 是否完成 0-进行中、1-已完成
   */
  isFinish?: number | string;
  /**
   * 是否取消 0-否、1-是
   */
  isCancel?: number | string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: number | string;
  /**
   * 创建人名称
   */
  creatorName?: string;
}
export interface PostWebV1SampleClothesPageApiRes {
  page?: number | string;
  total?: number | string;
  list?: postWebV1SampleClothesPageApiResListResItem[];
}

/**
  * **请求类型**
  * 批量查询备注
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91890
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/remark/batch/list
  * @更新时间: 2021-09-08 09:50:16
  */
/**
  * 查询条件
  */
export interface PostWebV1RemarkBatchListApiReq {
  /**
   * 业务类型
   */
  bizType: number | string;
  /**
   * 业务ids
   */
  bizIdList?: (string | number)[];
}

/**
  * **返回类型**
  * 批量查询备注
  * @see https://yapi.ibaibu.com/project/1650/interface/api/91890
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/remark/batch/list
  * @更新时间: 2021-09-08 09:50:16
  */
export interface postWebV1RemarkBatchListApiResResItem {
  /**
   * 自增id
   */
  remarkId?: number | string;
  /**
   * 业务id
   */
  bizId?: number | string;
  /**
   * 业务类型: 1-打版、2-异常、3-返修
   */
  bizType?: 'SAMPLE_CLOTHES' | 'ANOMALY' | 'REPAIR' | string;
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 操作人id
   */
  creatorId?: number | string;
  /**
   * 操作人名称
   */
  createdName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}
export type PostWebV1RemarkBatchListApiRes = Record<string, postWebV1RemarkBatchListApiResResItem[]>;

/**
  * **请求类型**
  * 用量核算列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92024
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-count/page
  * @更新时间: 2021-09-10 10:06:31
  */
/**
  * 分页对象
  */
export interface PostWebV1CheckCountPageApiReq {
  /**
   * 用量核算状态 WAIT_CALCULATE 待核算 CALCULATED 已核算
   */
  checkCountState?: 'WAIT_CALCULATE' | 'CALCULATED' | 'UNKNOWN';
  /**
   * 核算师ID
   */
  checkerId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType:
  | 'NORMAL_PATTERN_MAKING'
  | 'COMPOUND_COLORS_MAKING'
  | 'MORE_PATTERN_MAKING'
  | 'LARGE_CARGO_MAKING';
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: 'OVERDUE' | 'NOT_EXPIRED';
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: number | string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: number | string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 当前查询的页码
   */
  pageNum?: number & string;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number & string;
}

/**
  * **返回类型**
  * 用量核算列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92024
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-count/page
  * @更新时间: 2021-09-10 10:06:31
  */
export interface postWebV1CheckCountPageApiResListResItem {
  /**
   * 核算（用量）表ID
   */
  checkCountId?: number | string;
  /**
   * 最新BOM ID
   */
  bomId?: number | string;
  /**
   * 纸样版本
   */
  patternVersion?: number | string;
  /**
   * 纸样师ID
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 用量师ID
   */
  checkerId?: number | string;
  /**
   * 用量师名称
   */
  checkerName?: string;
  /**
   * 用量核算状态 WAIT_CALCULATE 待核算 CALCULATED 已核算
   */
  checkCountState?: 'WAIT_CALCULATE' | 'CALCULATED' | 'UNKNOWN';
  /**
   * 唛架图
   */
  markFramePictureList?: string[];
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
/**
 * 响应数据
 */
export interface PostWebV1CheckCountPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: postWebV1CheckCountPageApiResListResItem[];
}

/**
  * **请求类型**
  * 用量核算详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92026
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/check-count/detail
  * @更新时间: 2021-09-10 10:06:32
  */
export interface GetWebV1CheckCountDetailApiReq {
  /**
   * 主键
   */
  checkCountId: string;
}

/**
  * **返回类型**
  * 用量核算详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92026
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/check-count/detail
  * @更新时间: 2021-09-10 10:06:32
  */
export interface getWebV1CheckCountDetailApiResBomOrderMaterialListResItem {
  bomMaterialId?: number | string;
  bomId?: number | string;
  trackResultId?: number | string;
  prototypeMaterialName?: string;
  partUse?: string;
  singleDosage?: number | string;
  cuttingMethod?: string;
  dosageAccount?: number | string;
  materialRemarkList?: {
    designRemarksId?: number | string;
    remark?: string;
    creatorId?: number | string;
    createdName?: string;
    createdTime?: string;
  }[];
  bingPurchaseState?: number | string;
  demandId?: number | string;
  demandType?: number | string;
  matchId?: number | string;
  matchCode?: string;
  commodityType?: string;
  commodityName?: string;
  commodityId?: number | string;
  matchPictureList?: string[];
  commodityCode?: string;
  commodityNumber?: string;
  material?: string;
  skuCode?: string;
  matchSalePrice?: string;
  matchPurchaseUnitName?: string;
  packNumber?: number | string;
  packNumberUnit?: string;
  skuAttrs?: string;
  widthLow?: string;
  widthHigh?: string;
  widthUnit?: string;
  saleUnit?: string;
  weightLow?: string;
  weightHigh?: string;
  weightUnit?: string;
  colorName?: string;
  colorNumber?: string;
  matchSampleGuidePrice?: string;
  matchSampleUnit?: string;
  matchGuidePrice?: string;
  matchCostPriceUnit?: string;
  matchPurchaseGap?: string;
  matchSource?: number | string;
  matcherName?: string;
  matchRemark?: string;
  unfinishedReason?: string;
  colorCardPicture?: string;
  isConfirm?: number | string;
  craftDemandInfoList?: {
    craftDemandId?: number | string;
    bomId?: number | string;
    bomMaterialId?: number | string;
    prototypeId?: number | string;
    designCode?: string;
    category1?: string;
    category2?: string;
    category3?: string;
    craftsRequire?: number | string;
    undertakeType?: string;
    innerFactoryId?: number | string;
    factoryName?: string;
    contactName?: string;
    contactPhone?: string;
    contactProvince?: string;
    contactCity?: string;
    contactRegion?: string;
    contactDetailAddress?: string;
    pictureList?: string[];
    positionRequirement?: string;
    sizeRequirement?: string;
    colorRequirement?: string;
    weightRequirement?: string;
    otherRequirement?: string;
    creatorId?: number | string;
    createdTime?: string;
    creatorName?: string;
  }[];
}
/**
 * 响应数据
 */
export interface GetWebV1CheckCountDetailApiRes {
  /**
   * 核算（用量）表ID
   */
  checkCountId?: number | string;
  /**
   * 版单ID
   */
  clothesId?: number | string;
  /**
   * 最新BOM ID
   */
  bomId?: number | string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 纸样版本数量
   */
  patternVersion?: number | string;
  /**
   * 设计师id【设计师】
   */
  designerId?: number | string;
  /**
   * 设计师编号【设计师】
   */
  designerCode?: string;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 纸样师ID
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 用量师ID
   */
  checkerId?: number | string;
  /**
   * 用量师名称
   */
  checkerName?: string;
  /**
   * 用量核算状态 WAIT_CALCULATE 待核算 CALCULATED 已核算
   */
  checkCountState?: 'WAIT_CALCULATE' | 'CALCULATED' | 'UNKNOWN';
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: boolean;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: boolean;
  /**
   * 唛架图
   */
  markFramePictureList?: string[];
  /**
   * 客户图片列表
   */
  customerPictureList?: string[];
  designerPictureList?: string[];
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * bom物料列表
   */
  bomOrderMaterialList?: getWebV1CheckCountDetailApiResBomOrderMaterialListResItem[];
}

/**
  * **请求类型**
  * 样衣核价查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92030
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-price/page
  * @更新时间: 2021-09-10 10:06:44
  */
/**
  * 分页对象
  */
export interface PostWebV1CheckPricePageApiReq {
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  checkPriceState?: 'WAIT_CHECK_PRICE' | 'HAD_CHECK_PRICE' | 'UNKNOWN';
  /**
   * 核价师ID
   */
  pricerId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType:
  | 'NORMAL_PATTERN_MAKING'
  | 'COMPOUND_COLORS_MAKING'
  | 'MORE_PATTERN_MAKING'
  | 'LARGE_CARGO_MAKING';
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: 'OVERDUE' | 'NOT_EXPIRED';
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: number | string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: number | string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 当前查询的页码
   */
  pageNum?: number & string;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number & string;
}

/**
  * **返回类型**
  * 样衣核价查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92030
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/check-price/page
  * @更新时间: 2021-09-10 10:06:44
  */
export interface postWebV1CheckPricePageApiResListResItem {
  /**
   * 核价表ID
   */
  checkPriceId?: number | string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  checkPriceState?: 'WAIT_CHECK_PRICE' | 'HAD_CHECK_PRICE' | 'UNKNOWN';
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 纸样师ID
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 核价师ID
   */
  pricerId?: number | string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
/**
 * 响应数据
 */
export interface PostWebV1CheckPricePageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: postWebV1CheckPricePageApiResListResItem[];
}

/**
  * **请求类型**
  * 样衣核价详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92032
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/check-price/detail
  * @更新时间: 2021-09-10 10:06:44
  */
export interface GetWebV1CheckPriceDetailApiReq {
  /**
   * 主键
   */
  checkPriceId: string;
}

/**
  * **返回类型**
  * 样衣核价详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92032
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/check-price/detail
  * @更新时间: 2021-09-10 10:06:44
  */
export interface getWebV1CheckPriceDetailApiResProcessCostInfoListResItem {
  /**
   * 工序环节
   */
  processStep?: string;
  /**
   * 工序名称
   */
  processName?: string;
  /**
   * 工价
   */
  price?: number | string;
}
/**
 * 响应数据
 */
export interface GetWebV1CheckPriceDetailApiRes {
  /**
   * 核价表ID
   */
  checkPriceId?: number | string;
  /**
   * 版单ID
   */
  clothesId?: number | string;
  /**
   * 样衣核价状态 WAIT_CHECK_PRICE 待核价 HAD_CHECK_PRICE 已核价
   */
  checkPriceState?: 'WAIT_CHECK_PRICE' | 'HAD_CHECK_PRICE' | 'UNKNOWN';
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 设计师id【设计师】
   */
  designerId?: number | string;
  /**
   * 设计师编号【设计师】
   */
  designerCode?: string;
  /**
   * 设计师名称【设计师】
   */
  designerName?: string;
  /**
   * 纸样师ID
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 核价师ID
   */
  pricerId?: number | string;
  /**
   * 核价师名称
   */
  pricerName?: string;
  /**
   * 客户图片列表
   */
  customerPictureList?: string[];
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: boolean;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: boolean;
  /**
   * 核价信息
   */
  processCostInfoList?: getWebV1CheckPriceDetailApiResProcessCostInfoListResItem[];
}

/**
  * **请求类型**
  * 寄送样衣查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92020
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/send-clothes/page
  * @更新时间: 2021-09-10 10:06:55
  */
/**
  * 分页对象
  */
export interface PostWebV1SendClothesPageApiReq {
  /**
   * 寄送人ID
   */
  senderId?: number | string;
  /**
   * 寄送单号
   */
  sendOrderCode?: string;
  /**
   * 寄送方式
   */
  sendType?: string;
  /**
   * 寄送时间开始
   */
  sendTimeStart?: string;
  /**
   * 寄送时间结束
   */
  sendTimeEnd?: string;
  /**
   * 寄送样衣状态 WAIT_SEND 待寄送 SENT 已寄送
   */
  sendClothesState?: 'WAIT_SEND' | 'SENT' | 'UNKNOWN';
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType:
  | 'NORMAL_PATTERN_MAKING'
  | 'COMPOUND_COLORS_MAKING'
  | 'MORE_PATTERN_MAKING'
  | 'LARGE_CARGO_MAKING';
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: 'OVERDUE' | 'NOT_EXPIRED';
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: number | string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: number | string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 当前查询的页码
   */
  pageNum?: number & string;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number & string;
}

/**
  * **返回类型**
  * 寄送样衣查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92020
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/send-clothes/page
  * @更新时间: 2021-09-10 10:06:55
  */
export interface postWebV1SendClothesPageApiResListResItem {
  // 升序降序
  timeConsumingSort?: 'descending' | 'ascending' | '';
  /**
   * 寄送样衣ID
   */
  sendClothesId?: number | string;
  /**
   * 寄送方式
   *  HOME_DELIVERY,POST,CUSTOMER_PICK_UP,RUN_ERRANDS
   */
  sendType?: 'HOME_DELIVERY' | 'POST' | 'CUSTOMER_PICK_UP' | 'RUN_ERRANDS';
  /**
   * 寄送关键信息【送样人，快递单号，取件人，跑腿方式】
   */
  sendContent?: string;
  /**
   * 寄送时间
   */
  sendTime?: string;
  /**
   * 寄送单号
   */
  sendOrderCode?: string;
  /**
   * 寄送样衣状态 WAIT_SEND 待寄送 SENT 已寄送
   */
  sendClothesState?: 'WAIT_SEND' | 'SENT' | 'UNKNOWN';
  /**
   * 收货件数
   */
  receiptNumber?: number | string;
  /**
   * 寄送人ID
   */
  senderId?: number | string;
  /**
   * 寄送人名称
   */
  senderName?: string;
  /**
   * 版单id
   */
  clothesId: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  pageNum: number;
  pageSize: number;
}
/**
 * 响应数据
 */
export interface PostWebV1SendClothesPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: postWebV1SendClothesPageApiResListResItem[];
}

/**
  * **请求类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92052
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/page
  * @更新时间: 2021-09-08 18:34:04
  */
export interface GetWebV1PatternClothesPageApiReq {
  /**
   * 纸样id
   */
  patternId?: string;
  /**
   * 版单表id
   */
  clothesId?: string;
  /**
   * 尺寸id
   */
  patternSizeId?: string;
  /**
   * 版房id(0:未分,1:内部, >1外部版房)
   */
  roomId?: string;
  /**
   * 版房名字
   */
  roomName?: string;
  /**
   * 分单员id
   */
  allocateeId?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: string;
  /**
   * 尺寸版本数量统计 0:新建| >0纸样尺寸版本
   */
  sizeVersion?: string;
  /**
   * 纸样版本状态数量 0:待上传 | >0上传版本
   */
  patternVersion?: string;
  /**
   * 纸样url
   */
  patternUrl?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 纸样状态 0:待进行 |1进行中 |2已完成
   */
  patternState?: string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: string;
  /**
   * 纸样开始时间
   */
  patternStartTime?: string;
  /**
   * 纸样完成时间
   */
  patternFinishTime?: string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 更新人名字
   */
  reviserName?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: string | number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92052
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/page
  * @更新时间: 2021-09-08 18:34:04
  */
export interface getWebV1PatternClothesPageApiResListResItem {
  /**
   * 纸样id
   */
  patternId?: string;
  /**
   * 版单表id
   */
  clothesId?: string;
  /**
   * 尺寸id
   */
  patternSizeId?: string;
  /**
   * 版房id(0:未分,1:内部, >1外部版房)
   */
  roomId?: string;
  /**
   * 版房名字
   */
  roomName?: string;
  /**
   * 分单员id
   */
  allocateeId?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: number | string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: number | string;
  /**
   * 尺寸版本数量统计 0:新建| >0纸样尺寸版本
   */
  sizeVersion?: number | string;
  /**
   * 纸样版本状态数量 0:待上传 | >0上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样url
   */
  patternUrl?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 纸样状态 0:待进行 |1进行中 |2已完成
   */
  patternState?: number | string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: string;
  /**
   * 纸样开始时间
   */
  patternStartTime?: string;
  /**
   * 纸样完成时间
   */
  patternFinishTime?: string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 更新人名字
   */
  reviserName?: string;

  [k: string]: any;
}
/**
 * 响应数据
 */
export interface GetWebV1PatternClothesPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: getWebV1PatternClothesPageApiResListResItem[];
}

/**
  * **请求类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92598
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/page
  * @更新时间: 2021-09-09 21:58:45
  */
/**
  * 分页对象
  */
export interface PostWebV1PatternClothesPageApiReq {
  /**
   * 纸样是否已分单(1:是,0:不是)
   */
  isAllocated: number | string;
  /**
   * 纸样是否外发(1:是,0:不是)
   */
  isOutsourced: number | string;
  /**
   * 纸样分单id(外部分单,内部分单)
   */
  roomIdList?: number[];
  /**
   * 纸样分单状态。（0:未流转 1:内部纸样 2:外发纸样）
   */
  allocateState?: number | string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是(此字段前段不传,由后台处理这个字段的值)
   */
  isLatest?: number | string;
  /**
   * 分单员id
   */
  allocateeIdList?: number[];
  /**
   * 纸样状态 0:待进行 |1进行中 |2已完成
   * (如果纸样为未分单状态,此值不传,已分单状态则必须传值)
   */
  patternState?: number | string;
  /**
   * 创建开始时间
   */
  patternCreatedTimeStart?: string;
  /**
   * 创建结束时间
   */
  patternCreatedTimeEnd?: string;
  /**
   * 当前耗时排序
   */
  timeConsumingSort?: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: 0 | 1 | 2 | 3;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: string;
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: number | string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: number | string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 当前查询的页码
   */
  pageNum?: number & string;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number & string;
}

/**
  * **返回类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92598
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/page
  * @更新时间: 2021-09-09 21:58:45
  */
export interface postWebV1PatternClothesPageApiResListResItem {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 尺寸id
   */
  patternSizeId?: number | string;
  /**
   * 纸样分单状态。（0:未流转 1:待分单 2:已分单）
   */
  allocateState?: number | string;
  /**
   * 版房id(1:内部,其他外部版房id)
   */
  roomId?: number | string;
  /**
   * 版房名字
   */
  roomName?: string;
  /**
   * 分单员id
   */
  allocateeId?: number | string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: number | string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: number | string;
  /**
   * 尺寸版本数量统计 0:新建| >0纸样尺寸版本
   */
  sizeVersion?: number | string;
  /**
   * 纸样版本状态数量 0:待上传 | >0上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样url
   */
  patternUrl?: string;
  /**
   * 纸样状态 0:待进行 |1进行中 |2已完成
   */
  patternState?: number | string;
  /**
   * 分单状态 1:纸样,2:车版,3:纸样加车版
   */
  allocateType?: number | string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: string;
  /**
   * 纸样开始时间
   */
  patternStartTime?: string;
  /**
   * 纸样完成时间
   */
  patternFinishTime?: string;
  /**
   * 创建人id
   */
  creatorId?: number | string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 更新人id
   */
  reviserId?: number | string;
  /**
   * 更新人名字
   */
  reviserName?: string;
  /**
   * 更新时间
   */
  revisedTime?: string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 销售bdid
   */
  bdId?: number | string;
  /**
   * 销售bd编号
   */
  bdCode?: string;
  /**
   * 销售bd名字
   */
  bdName?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: number | string;
  /**
   * 版单详细表id
   */
  detailId?: number | string;
  /**
   * 复色款号
   */
  makeSameDesignCode?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 版型要求
   */
  layoutRequirement?: string;
  /**
   * 销售群体
   */
  saleGroup?: string;
  /**
   * 客户款号
   */
  customerStyleCode?: string;
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime?: string;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: string;
  /**
   * 齐套签收时间
   */
  materialSignTime?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 旧版本集合
   */
  oldPatternList?: {
    /**
     * 纸样id
     */
    patternId?: number | string;
    /**
     * 尺寸id
     */
    patternSizeId?: number | string;
    /**
     * 纸样分单状态。（0:未流转 1:待分单 2:已分单）
     */
    allocateState?: number | string;
    /**
     * 版房id(1:内部,其他外部版房id)
     */
    roomId?: number | string;
    /**
     * 版房名字
     */
    roomName?: string;
    /**
     * 分单员id
     */
    allocateeId?: number | string;
    /**
     * 分单员名字
     */
    allocateeName?: string;
    /**
     * 是否外发(1:是,0:不是)
     */
    isOutsourced?: number | string;
    /**
     * 是否已分单(1:是,0:不是)
     */
    isAllocated?: number | string;
    /**
     * 尺寸版本数量统计 0:新建| >0纸样尺寸版本
     */
    sizeVersion?: number | string;
    /**
     * 纸样版本状态数量 0:待上传 | >0上传版本
     */
    patternVersion?: number | string;
    /**
     * 纸样url
     */
    patternUrl?: string;
    /**
     * 纸样状态 0:待进行 |1进行中 |2已完成
     */
    patternState?: number | string;
    /**
     * 分单状态 1:纸样,2:车版,3:纸样加车版
     */
    allocateType?: number | string;
    /**
     * 分单开始时间
     */
    seperateStartTime?: string;
    /**
     * 分单完成时间
     */
    seperateFinishTime?: string;
    /**
     * 纸样开始时间
     */
    patternStartTime?: string;
    /**
     * 纸样完成时间
     */
    patternFinishTime?: string;
    /**
     * 创建人id
     */
    creatorId?: number | string;
    /**
     * 创建人名字
     */
    creatorName?: string;
    /**
     * 创建时间
     */
    createdTime?: string;
    /**
     * 更新人id
     */
    reviserId?: number | string;
    /**
     * 更新人名字
     */
    reviserName?: string;
    /**
     * 更新时间
     */
    revisedTime?: string;
    /**
     * 设计版单id
     */
    prototypeId?: number | string;
    /**
     * 销售bdid
     */
    bdId?: number | string;
    /**
     * 销售bd编号
     */
    bdCode?: string;
    /**
     * 销售bd名字
     */
    bdName?: string;
    /**
     * 是否最新(同一加工单号最新的条) 0-否、1-是
     */
    isLatest?: number | string;
    /**
     * 版单详细表id
     */
    detailId?: number | string;
    /**
     * 复色款号
     */
    makeSameDesignCode?: string;
    /**
     * 尺码标准
     */
    sizeStandard?: string;
    /**
     * 样衣尺码
     */
    sampleSize?: string;
    /**
     * 版型要求
     */
    layoutRequirement?: string;
    /**
     * 销售群体
     */
    saleGroup?: string;
    /**
     * 客户款号
     */
    customerStyleCode?: string;
    /**
     * SKC（款）生成时间
     */
    skcCreatedTime?: string;
    /**
     * SPU生成时间
     */
    spuCreatedTime?: string;
    /**
     * 齐套签收时间
     */
    materialSignTime?: string;
    /**
     * 设计组code
     */
    designerGroupCode?: string;
    /**
     * 设计组
     */
    designerGroup?: string;
    /**
     * 设计师id
     */
    designerId?: number | string;
    /**
     * 设计师名称
     */
    designerName?: string;
    /**
     * 纸样师id
     */
    patternMakerId?: number | string;
    /**
     * 纸样师名称
     */
    patternMakerName?: string;
    /**
     * 版单id
     */
    clothesId?: number | string;
    /**
     * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
     */
    sampleType?: number | string;
    /**
     * 版本号
     */
    versionNum?: number | string;
    /**
     * 加工单号（原始加工单号+版本号）
     */
    processCode?: string;
    /**
     * 原始加工单号
     */
    baseProcessCode?: string;
    /**
     * 客户图片
     */
    customerPictureList?: string[];
    /**
     * 打版件数
     */
    sampleAmount?: number | string;
    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    designCode?: string;
    /**
     * 成衣SPU(款式SPU)。SPU+年份+6位流水号
     */
    styleCode?: string;
    /**
     * 客户id
     */
    purchaserId?: number | string;
    /**
     * 客户编号
     */
    purchaserCode?: string;
    /**
     * 客户名称
     */
    purchaserName?: string;
    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    category?: string;
    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    categoryName?: string;
    /**
     * 区域id
     */
    regionId?: number | string;
    /**
     * 区域名
     */
    regionName?: string;
    /**
     * 是否紧急(1-是、0-否)
     */
    isUrgent?: number | string;
    /**
     * 是否异常(1-是、0-否)
     */
    isAbnormal?: number | string;
    /**
     * 是否返修(1-是、0-否)
     */
    isRepair?: number | string;
    /**
     * 是否补料款(1-是、0-否)
     */
    isAddMaterial?: number | string;
    /**
     * 是否二次工艺(1:是,0:不是)
     */
    isCraft?: number | string;
    /**
     * 面辅料齐套状态(1-已齐套、0-未齐套)
     */
    materialState?: number | string;
    /**
     * 交期类型编码
     */
    deliveryTypeCode?: string;
    /**
     * 交期类型名称
     */
    deliveryTypeName?: string;
    /**
     * 开发交付日期
     */
    deliveryTime?: string;
    /**
     * 开发交付周期。如：T+3，此值就是3
     */
    deliveryPeriod?: string;
    /**
     * 期望交期
     */
    planDeliveryTime?: string;
    /**
     * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
     */
    processingStepCreatedTime?: string;
    /**
     * 当前时间
     */
    currentTime?: string;
    /**
     * 二次工艺
     */
    craftList?: string[];
    /**
     * 裁剪方法
     */
    cuttingMethod?: string;
  }[];
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
/**
 * 响应数据
 */
export interface PostWebV1PatternClothesPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: postWebV1PatternClothesPageApiResListResItem[];
}

/**
  * **请求类型**
  * 获取尺寸信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92064
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/{patternId}
  * @更新时间: 2021-09-09 21:58:45
  */
export interface GetWebV1PatternClothesSizePatternIdApiReq {
  /**
   * 纸样id
   */
  patternId: string;
}

/**
  * **返回类型**
  * 获取尺寸信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92064
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/size/{patternId}
  * @更新时间: 2021-09-09 21:58:45
  */
export interface getWebV1PatternClothesSizePatternIdApiResCustomerSizeListResItem {
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1PatternClothesSizePatternIdApiRes {
  /**
   * 尺寸表id
   */
  patternSizeId: string;
  /**
   * 纸样主表id
   */
  patternId: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 客户要求尺寸样衣尺码
   */
  sampleSize: string;
  /**
   * 尺寸信息
   */
  customerSizeList: IPatternClothesSizeCustomerSizeListItem[];
  /**
   * 尺寸版本
   */
  sizeVersion: string;
  /**
   * 纸样师id
   */
  designerId: string;
  /**
   * 纸样师名字
   */
  designerName: string;
  /**
   * 设计师id
   */
  patternMakerId: string;
  /**
   * 设计师名字
   */
  patternMakerName: string;
  /**
   * 保存状态 0:临时保存 |1:提交
   */
  saveType: string;
  /**
   * 创建人名字
   */
  creatorName: string;
  /**
   * 更新人名字
   */
  reviserName: string;
  [k: string]: any;
}

/**
  * **请求类型**
  * 详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92054
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/pattern-clothes/{patternId}
  * @更新时间: 2021-09-09 21:58:45
  */
export interface GetWebV1PatternClothesPatternIdApiReq {
  /**
   * 纸样id
   */
  patternId: string;
}

export interface IPatternClothesSizeCustomerSizeListItem {
  /**
   * 部位编码
   */
  positionCode: string;
  /**
   * 部位编码名字
   */
  positionName: string;
  /**
   * 尺寸维度
   */
  dimension: string;
  /**
   * 量法
   */
  measuringMethod: string;
  /**
   * 客户尺寸
   */
  size: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize: string;
  /**
   * 纸样尺寸
   */
  patternSize: string;
  /**
   * 允差范围
   */
  tolerance: string;
}
/**
 * 响应数据
 */
export interface GetWebV1PatternClothesPatternIdApiRes {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 尺寸id
   */
  patternSizeId?: number | string;
  /**
   * 纸样分单状态。（0:未流转 1:待分单 2:已分单）
   */
  allocateState?: number | string;
  /**
   * 版房id(1:内部,其他外部版房id)
   */
  roomId?: number | string;
  /**
   * 版房名字
   */
  roomName?: string;
  /**
   * 分单员id
   */
  allocateeId?: number | string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced?: number | string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated?: number | string;
  /**
   * 尺寸版本数量统计 0:新建| >0纸样尺寸版本
   */
  sizeVersion?: number | string;
  /**
   * 纸样版本状态数量 0:待上传 | >0上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样url
   */
  patternUrl?: string;
  /**
   * 纸样状态 0:待进行 |1进行中 |2已完成
   */
  patternState?: number | string;
  /**
   * 分单状态 1:纸样,2:车版,3:纸样加车版
   */
  allocateType?: number | string;
  /**
   * 分单开始时间
   */
  seperateStartTime?: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime?: string;
  /**
   * 纸样开始时间
   */
  patternStartTime?: string;
  /**
   * 纸样完成时间
   */
  patternFinishTime?: string;
  /**
   * 创建人id
   */
  creatorId?: number | string;
  /**
   * 创建人名字
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 更新人id
   */
  reviserId?: number | string;
  /**
   * 更新人名字
   */
  reviserName?: string;
  /**
   * 更新时间
   */
  revisedTime?: string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 销售bdid
   */
  bdId?: number | string;
  /**
   * 销售bd编号
   */
  bdCode?: string;
  /**
   * 销售bd名字
   */
  bdName?: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest?: number | string;
  /**
   * 版单详细表id
   */
  detailId?: number | string;
  /**
   * 复色款号
   */
  makeSameDesignCode?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 版型要求
   */
  layoutRequirement?: string;
  /**
   * 销售群体
   */
  saleGroup?: string;
  /**
   * 客户款号
   */
  customerStyleCode?: string;
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime?: string;
  /**
   * SPU生成时间
   */
  spuCreatedTime?: string;
  /**
   * 齐套签收时间
   */
  materialSignTime?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 旧版本集合
   */
  // oldPatternList?: getWebV1PatternClothesPatternIdApiResOldPatternListResItem[];
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}

/**
  * **请求类型**
  * 样衣质检_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92088
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/page
  * @更新时间: 2021-09-09 15:46:31
  */
export interface GetWebV1SampleQcPageApiReq {
  /**
   * 主键: 样衣质检id
   */
  sampleQcId?: string;
  /**
   * 质检版本号
   */
  versionNum?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 样衣质检状态: 0, 待质检; 1, 已质检;
   */
  qcStatus?: string;
  /**
   * 质检结果: 1,通过; 2,返修;
   */
  qcResult?: string;
  /**
   * 质检时间
   */
  qcTime?: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   * 0 :正常打版
   * 1 :复色打版
   * 2 :补做打版
   * 3 :大货打版
   */
  sampleType: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  'designerIdList[0]'?: string;
  /**
   * 设计组编号
   */
  'designerGroupCodeList[0]'?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: string;
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: string | number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 样衣质检_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92088
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/page
  * @更新时间: 2021-09-09 15:46:31
  */
export interface getWebV1SampleQcPageApiResListResItem {
  /**
   * 样衣质检id
   */
  sampleQcId?: number | string;
  /**
   * 样衣质检状态: 0, 待质检; 1, 已质检;
   */
  qcStatus?: number | string;
  /**
   * 质检结果: 1,通过; 2,返修;
   */
  qcResult?: number | string;
  /**
   * 质检时间
   */
  qcTime?: string;
  /**
   * 收货件数
   * 车版中数据
   */
  receiptNumber?: number | string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1SampleQcPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: getWebV1SampleQcPageApiResListResItem[];
}

/**
  * **请求类型**
  * 样衣质检_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92090
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/base-info/{id}
  * @更新时间: 2021-09-08 19:43:52
  */
export interface GetWebV1SampleQcBaseInfoIdApiReq {
  /**
   * 主键
   */
  id: string;
}

/**
  * **返回类型**
  * 样衣质检_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92090
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/base-info/{id}
  * @更新时间: 2021-09-08 19:43:52
  */
/**
  * 款号基本信息
  */
export interface getWebV1SampleQcBaseInfoIdApiResClothesBaseInfoRes {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
}
/**
 * 车缝纸样信息
 */
export interface getWebV1SampleQcBaseInfoIdApiResPatternBaseInfoRes {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 纸样版本: 0:待上传 | 大于0,上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
}
export interface getWebV1SampleQcBaseInfoIdApiResSizeInfoListResItem {
  /**
   * 商品类型
   */
  commodityType?: string;
  /**
   * 各部位尺寸信息
   */
  sizeList?: {
    /**
     * 尺寸表id
     */
    patternSizeId?: number | string;
    /**
     * 商品类型
     */
    commodityType?: string;
    /**
     * 部位
     */
    position?: string;
    /**
     * 尺寸维度 1-X1、2-X2
     */
    sizeDimension?: number | string;
    /**
     * 量法
     */
    measureWay?: string;
    /**
     * 客户要求尺寸
     */
    customerRequestSize?: number | string;
    /**
     * 纸样尺寸
     */
    designSize?: number | string;
    /**
     * 样衣尺寸
     */
    sampleSize?: number | string;
    /**
     * 实测尺寸数据json [{"patternSizeId":"11","patternNum":"1","size":"52"},
     * {"patternSizeId":"12","patternNum":"1","size":"53"}]
     */
    sizeJson?: string;
    /**
     * 允差范围 CM
     */
    deviationRange?: number | string;
  }[];
}
/**
 * 响应数据
 */
export interface GetWebV1SampleQcBaseInfoIdApiRes {
  /**
   * 质检版本号
   */
  versionNum?: number | string;
  /**
   * 开发bom单id(开发bom-标签页)
   */
  bomOrderId?: number | string;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: getWebV1SampleQcBaseInfoIdApiResClothesBaseInfoRes;
  /**
   * 车缝纸样信息
   */
  patternBaseInfo?: getWebV1SampleQcBaseInfoIdApiResPatternBaseInfoRes;
  /**
   * 样衣尺寸信息集合
   * 车缝完成时维护的尺寸信息
   */
  sizeInfoList?: getWebV1SampleQcBaseInfoIdApiResSizeInfoListResItem[];
  /**
   * 设计款详情id
   */
  sampleQcDetailId?: number | string;
  /**
   * 样衣质检id
   */
  sampleQcId?: number | string;
  /**
   * 问题类型
   */
  questionType?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
}

/**
  * **请求类型**
  * 样衣质检_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92472
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/base-info
  * @更新时间: 2021-09-09 15:46:31
  */
export interface PostWebV1SampleQcBaseInfoApiReq {
  /**
   * 样衣质检单id
   */
  sampleQcId: number | string;
  /**
   * 样衣质检状态: 0, 待质检; 1, 已质检;
   */
  qcStatus: number | string;
}

/**
  * **返回类型**
  * 样衣质检_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92472
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-qc/base-info
  * @更新时间: 2021-09-09 15:46:31
  */
/**
  * 款号基本信息
  */
export interface postWebV1SampleQcBaseInfoApiResClothesBaseInfoRes {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
}
/**
 * 车缝纸样信息
 */
export interface postWebV1SampleQcBaseInfoApiResPatternBaseInfoRes {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 纸样版本: 0:待上传 | 大于0,上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
}
export interface postWebV1SampleQcBaseInfoApiResSizeInfoListResItem {
  /**
   * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
   */
  clothesTrimSizeList?: {
    /**
     * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
     */
    clothesName?: string;
    value?: string;
  }[];
  /**
   * 部位编码
   */
  positionCode?: string;
  /**
   * 部位编码名字
   */
  positionName?: string;
  /**
   * 尺寸维度
   */
  dimension?: string;
  /**
   * 量法
   */
  measuringMethod?: string;
  /**
   * 客户尺寸
   */
  size?: string;
  /**
   * 样衣尺寸
   */
  sampleClothesSize?: string;
  /**
   * 纸样尺寸
   */
  patternSize?: string;
  /**
   * 允差范围
   */
  tolerance?: string;
}
/**
 * 响应数据
 */
export interface PostWebV1SampleQcBaseInfoApiRes {
  /**
   * 质检版本号
   */
  versionNum?: number | string;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: postWebV1SampleQcBaseInfoApiResClothesBaseInfoRes;
  /**
   * 车缝纸样信息
   */
  patternBaseInfo?: postWebV1SampleQcBaseInfoApiResPatternBaseInfoRes;
  /**
   * 样衣质检详情id
   */
  sampleQcDetailId?: number | string;
  /**
   * 样衣质检id
   */
  sampleQcId?: number | string;
  /**
   * 问题类型
   */
  questionType?: string;
  /**
   * 问题描述
   */
  questionDescription?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture?: string;
  /**
   * 质检尺寸数据集合
   */
  sizeInfoList?: postWebV1SampleQcBaseInfoApiResSizeInfoListResItem[];
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
}

/**
  * **请求类型**
  * 样衣审版_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92096
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/page
  * @更新时间: 2021-09-08 20:05:13
  */
export interface GetWebV1SampleAuditPageApiReq {
  /**
   * 主键: 样衣审版id
   */
  sampleAuditId?: string;
  /**
   * 样衣审版版本号
   */
  versionNum?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: string;
  /**
   * 样衣审版状态: 0, 待审版; 1,已审版; 2, 待处理;
   */
  auditStatus?: string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: string;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  'designerIdList[0]'?: string;
  /**
   * 设计组编号
   */
  'designerGroupCodeList[0]'?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: string;
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: string | number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 样衣审版_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92096
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/page
  * @更新时间: 2021-09-08 20:05:13
  */
export interface getWebV1SampleAuditPageApiResListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 开发bom单id
   */
  bomOrderId?: number | string;
  /**
   * 纸样单id
   */
  sampleOrderId?: number | string;
  /**
   * 车版单id
   */
  makeSampleOrderId?: number | string;
  /**
   * 样衣质检单id
   */
  sampleQcId?: number | string;
  /**
   * 样衣审版状态: 0, 待审版; 1,已审版; 2, 待处理;
   */
  auditStatus?: number | string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: number | string;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 收货件数
   * 车版中数据
   */
  receiptNumber?: number | string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1SampleAuditPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: getWebV1SampleAuditPageApiResListResItem[];
}

/**
  * **请求类型**
  * 样衣审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92098
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/base-info/{id}
  * @更新时间: 2021-09-08 19:43:58
  */
export interface GetWebV1SampleAuditBaseInfoIdApiReq {
  /**
   * 主键
   */
  id: string;
}

/**
  * **返回类型**
  * 样衣审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92098
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/base-info/{id}
  * @更新时间: 2021-09-08 19:43:58
  */
/**
  * 车缝纸样信息
  */
export interface getWebV1SampleAuditBaseInfoIdApiResPatternBaseInfoRes {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 纸样版本: 0:待上传 | 大于0,上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
}
/**
 * 款号基本信息
 */
export interface getWebV1SampleAuditBaseInfoIdApiResClothesBaseInfoRes {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
}
export interface getWebV1SampleAuditBaseInfoIdApiResAuditCommentListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 序号(排序用)
   */
  serialNumber?: number | string;
  /**
   * 审版评语
   */
  auditComment?: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1SampleAuditBaseInfoIdApiRes {
  /**
   * 样衣审版版本号
   */
  versionNum?: number | string;
  /**
   * 开发bom单id(开发bom-标签页)
   */
  bomOrderId?: number | string;
  /**
   * 纸样单id(开发尺寸表-标签页)
   */
  sampleOrderId?: number | string;
  /**
   * 样衣质检单id(质检单-标签页)
   */
  sampleQcId?: number | string;
  /**
   * 车缝纸样信息
   */
  patternBaseInfo?: getWebV1SampleAuditBaseInfoIdApiResPatternBaseInfoRes;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: getWebV1SampleAuditBaseInfoIdApiResClothesBaseInfoRes;
  /**
   * 样衣审版详情id
   */
  sampleAuditDetailId?: number | string;
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 样衣审版评语集合
   */
  auditCommentList?: getWebV1SampleAuditBaseInfoIdApiResAuditCommentListResItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture?: string;
}

/**
  * **请求类型**
  * 样衣审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92612
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/base-info
  * @更新时间: 2021-09-10 09:57:17
  */
export interface PostWebV1SampleAuditBaseInfoApiReq {
  /**
   * 样衣审版id
   */
  sampleAuditId: number | string;
  /**
   * 样衣审版状态: 0, 待审版; 1,已审版; 2, 待处理;
   */
  auditStatus: number | string;
}

/**
  * **返回类型**
  * 样衣审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92612
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sample-audit/base-info
  * @更新时间: 2021-09-10 09:57:17
  */
/**
  * 车缝纸样信息
  */
export interface postWebV1SampleAuditBaseInfoApiResPatternBaseInfoRes {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 纸样版本: 0:待上传 | 大于0,上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
}
/**
 * 款号基本信息
 */
export interface postWebV1SampleAuditBaseInfoApiResClothesBaseInfoRes {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
}
export interface postWebV1SampleAuditBaseInfoApiResAuditCommentListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 序号(排序用)
   */
  serialNumber?: number | string;
  /**
   * 审版评语
   */
  auditComment?: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}
/**
 * 响应数据
 */
export interface PostWebV1SampleAuditBaseInfoApiRes {
  /**
   * 样衣审版版本号
   */
  versionNum?: number | string;
  /**
   * 纸样单id(开发尺寸表-标签页)
   */
  patternId?: number | string;
  /**
   * 样衣质检单id(质检单-标签页)
   */
  sampleQcId?: number | string;
  /**
   * 车缝纸样信息
   */
  patternBaseInfo?: postWebV1SampleAuditBaseInfoApiResPatternBaseInfoRes;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: postWebV1SampleAuditBaseInfoApiResClothesBaseInfoRes;
  /**
   * 样衣审版详情id
   */
  sampleAuditDetailId?: number | string;
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 样衣审版评语集合
   */
  auditCommentList?: postWebV1SampleAuditBaseInfoApiResAuditCommentListResItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture?: string;
}

/**
  * **请求类型**
  * 设计审版_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92106
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/page
  * @更新时间: 2021-09-08 19:44:05
  */
export interface GetWebV1DesignAuditPageApiReq {
  /**
   * 主键: 设计审版id
   */
  designAuditId?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: string;
  /**
   * 设计审版状态: 0, 待审版; 1, 已审版
   */
  auditStatus?: string;
  /**
   * 是否样衣返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: string;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  'designerIdList[0]'?: string;
  /**
   * 设计组编号
   */
  'designerGroupCodeList[0]'?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: string;
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: string | number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 设计审版_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92106
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/page
  * @更新时间: 2021-09-08 19:44:05
  */
export interface getWebV1DesignAuditPageApiResListResItem {
  /**
   * 设计审版id
   */
  designAuditId?: number | string;
  /**
   * 开发bom单id
   */
  bomOrderId?: number | string;
  /**
   * 纸样单id
   */
  sampleOrderId?: number | string;
  /**
   * 车版单id
   */
  makeSampleOrderId?: number | string;
  /**
   * 样衣质检单id
   */
  sampleQcId?: number | string;
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 设计审版状态: 0, 待审版; 1, 已审版
   */
  auditStatus?: number | string;
  /**
   * 是否样衣返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: number | string;
  /**
   * 收货件数
   * 车版中数据
   */
  receiptNumber?: number | string;
  /**
   * 审核时间
   */
  auditTime?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1DesignAuditPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: getWebV1DesignAuditPageApiResListResItem[];
}

/**
  * **请求类型**
  * 设计审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92108
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/base-info/{id}
  * @更新时间: 2021-09-08 19:44:05
  */
export interface GetWebV1DesignAuditBaseInfoIdApiReq {
  /**
   * 主键
   */
  id: string;
}

/**
  * **返回类型**
  * 设计审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92108
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/design-audit/base-info/{id}
  * @更新时间: 2021-09-08 19:44:05
  */
/**
  * 车缝纸样信息
  */
export interface getWebV1DesignAuditBaseInfoIdApiResPatternBaseInfoRes {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 纸样版本: 0:待上传 | 大于0,上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
}
/**
 * 款号基本信息
 */
export interface getWebV1DesignAuditBaseInfoIdApiResClothesBaseInfoRes {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
}
export interface getWebV1DesignAuditBaseInfoIdApiResAuditCommentListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 序号(排序用)
   */
  serialNumber?: number | string;
  /**
   * 审版评语
   */
  auditComment?: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1DesignAuditBaseInfoIdApiRes {
  /**
   * 设计审版版本号
   */
  versionNum?: number | string;
  /**
   * 开发bom单id(开发bom-标签页)
   */
  bomOrderId?: number | string;
  /**
   * 纸样单id(开发尺寸表-标签页)
   */
  sampleOrderId?: number | string;
  /**
   * 样衣质检单id(质检单-标签页)
   */
  sampleQcId?: number | string;
  /**
   * 车缝纸样信息
   */
  patternBaseInfo?: getWebV1DesignAuditBaseInfoIdApiResPatternBaseInfoRes;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: getWebV1DesignAuditBaseInfoIdApiResClothesBaseInfoRes;
  /**
   * 设计审版详情id
   */
  designAuditDetailId?: number | string;
  /**
   * 设计审版id
   */
  designAuditId?: number | string;
  /**
   * 样衣审版评语集合
   */
  auditCommentList?: getWebV1DesignAuditBaseInfoIdApiResAuditCommentListResItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture?: string;
  /**
   * 设计审版意见
   */
  auditComments?: string;
}

/**
  * **请求类型**
  * 客户审版_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92116
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/page
  * @更新时间: 2021-09-08 19:44:11
  */
export interface GetWebV1CustomerAuditPageApiReq {
  /**
   * 主键: 客户审版id
   */
  customerAuditId?: string;
  /**
   * 客户审版状态: 0, 待审版; 1, 已审版
   */
  auditStatus?: string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  'designerIdList[0]'?: string;
  /**
   * 设计组编号
   */
  'designerGroupCodeList[0]'?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: string;
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: string | number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 客户审版_查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92116
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/page
  * @更新时间: 2021-09-08 19:44:11
  */
export interface getWebV1CustomerAuditPageApiResListResItem {
  /**
   * 客户审版id
   */
  customerAuditId?: number | string;
  /**
   * 开发bom单id
   */
  bomOrderId?: number | string;
  /**
   * 纸样单id
   */
  sampleOrderId?: number | string;
  /**
   * 车版单id
   */
  makeSampleOrderId?: number | string;
  /**
   * 样衣质检单id
   */
  sampleQcId?: number | string;
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 设计审版id
   */
  designAuditId?: number | string;
  /**
   * 客户审版状态: 0, 待审版; 1, 已审版
   */
  auditStatus?: number | string;
  /**
   * 是否样衣返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 审版结果: 0,不通过; 1,通过; 2,返修;
   */
  auditResult?: number | string;
  /**
   * 审版时间
   */
  auditTime?: string;
  /**
   * 客户审版意见
   */
  auditComments?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * bdid【销售BD】
   */
  bdId?: number | string;
  /**
   * bd编号【销售BD】
   */
  bdCode?: string;
  /**
   * bd名称【销售BD】
   */
  bdName?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 更新人名称
   */
  reviserName?: string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1CustomerAuditPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: getWebV1CustomerAuditPageApiResListResItem[];
}

/**
  * **请求类型**
  * 客户审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92118
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/base-info/{id}
  * @更新时间: 2021-09-08 19:44:11
  */
export interface GetWebV1CustomerAuditBaseInfoIdApiReq {
  /**
   * 主键
   */
  id: string;
}

/**
  * **返回类型**
  * 客户审版_详情-基础信息
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92118
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/customer-audit/base-info/{id}
  * @更新时间: 2021-09-08 19:44:11
  */
/**
  * 车缝纸样信息
  */
export interface getWebV1CustomerAuditBaseInfoIdApiResPatternBaseInfoRes {
  /**
   * 纸样id
   */
  patternId?: number | string;
  /**
   * 纸样版本: 0:待上传 | 大于0,上传版本
   */
  patternVersion?: number | string;
  /**
   * 纸样文件url
   */
  patternUrl?: string;
}
/**
 * 款号基本信息
 */
export interface getWebV1CustomerAuditBaseInfoIdApiResClothesBaseInfoRes {
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 设计图片{多张以英文逗号分隔}
   */
  designPicture?: string;
  /**
   * 尺码标准
   */
  sizeStandard?: string;
  /**
   * 样衣尺码
   */
  sampleSize?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 设计组code
   */
  designerGroupCode?: string;
  /**
   * 设计组
   */
  designerGroup?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 裁剪师id
   */
  cutterId?: number | string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 质检师id
   */
  qualityCheckerId?: number | string;
  /**
   * 质检师名称
   */
  qualityCheckerName?: string;
  /**
   * 审版师id
   */
  editionReviewerId?: number | string;
  /**
   * 审版师名称
   */
  editionReviewerName?: string;
  /**
   * 设计审版师id
   */
  designReviewerId?: number | string;
  /**
   * 设计审版师名称
   */
  designReviewerName?: string;
}
export interface getWebV1CustomerAuditBaseInfoIdApiResAuditCommentListResItem {
  /**
   * 样衣审版id
   */
  sampleAuditId?: number | string;
  /**
   * 序号(排序用)
   */
  serialNumber?: number | string;
  /**
   * 审版评语
   */
  auditComment?: string;
  /**
   * 纸样修改意见
   */
  patternOpinion?: string;
  /**
   * 样衣修改意见
   */
  sampleOpinion?: string;
}
/**
 * 响应数据
 */
export interface GetWebV1CustomerAuditBaseInfoIdApiRes {
  /**
   * 客户审版版本号
   */
  versionNum?: number | string;
  /**
   * 开发bom单id(开发bom-标签页)
   */
  bomOrderId?: number | string;
  /**
   * 纸样单id(开发尺寸表-标签页)
   */
  sampleOrderId?: number | string;
  /**
   * 样衣质检单id(质检单-标签页)
   */
  sampleQcId?: number | string;
  /**
   * 客户审版意见
   */
  auditComments?: string;
  /**
   * 车缝纸样信息
   */
  patternBaseInfo?: getWebV1CustomerAuditBaseInfoIdApiResPatternBaseInfoRes;
  /**
   * 款号基本信息
   */
  clothesBaseInfo?: getWebV1CustomerAuditBaseInfoIdApiResClothesBaseInfoRes;
  /**
   * 客户审版id
   */
  customerAuditId?: number | string;
  /**
   * 样衣审版评语集合
   */
  auditCommentList?: getWebV1CustomerAuditBaseInfoIdApiResAuditCommentListResItem[];
  /**
   * 其他审版意见
   */
  otherAuditComments?: string;
  /**
   * 样衣图(多张以英文逗号分隔,最多4张)
   */
  sampleClothPicture?: string;
}

/**
  * **请求类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92260
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/page
  * @更新时间: 2021-09-09 17:13:43
  */
/**
  * 分页对象
  */
export interface PostWebV1GradingClothesPageApiReq {
  /**
   * 主键id
   */
  gradingId?: number | string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 设计版单id
   */
  prototypeId?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 状态 1|已提交，0|待提交
   */
  sizeStatus?: number | string;
  /**
   * 提交次数
   */
  commits?: number | string;
  /**
   * 剪裁方法
   */
  tailoringMethod?: string;
  /**
   * 二次工艺--先冗余，后面修改
   */
  secondaryProcess?: string;
  /**
   * 状态 1001|待放码，1002|已放码，1003|已取消
   */
  status: '1001' | '1002' | '1003';
  /**
   * 是否异常，0|否，1|是
   */
  isAbnormal?: '0' | '1' | '';
  /**
   * 是否紧急，0|否，1|是
   */
  isUrgent?: '0' | '1' | '';
  /**
   * 纸样状态 1001|待上传，1002|已上传
   */
  designFileStatus?: '1001' | '1002' | '';
  /**
   * 推码完成时间(开始)
   */
  finishTimeStart?: string;
  /**
   * 推码完成时间（结束）
   */
  finishTimeEnd?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 创建时间(开始)
   */
  createdTimeStart?: string;
  /**
   * 创建时间（结束）
   */
  createdTimeEnd?: string;
  /**
   * 纸样师
   */
  patternMakerId?: number | string;
  /**
   * 设计师
   */
  designerId?: number | string;
  /**
   * 设计师组别
   */
  designerGroupCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: number | string;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number | string;
}

/**
  * **返回类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92260
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/grading-clothes/page
  * @更新时间: 2021-09-09 17:13:43
  */
export interface postWebV1GradingClothesPageApiResListResItem {
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  /**
   * 开发的纸样文件版本
   */
  developPatternVersion: string;
  /**
   * 开发的纸样文件
   */
  developPatternUrl: string;
  /**
   * 大货纸样文件版本
   */
  designFileVersion: string;
  /**
   * 大货纸样文件
   */
  designFileUrl: string;
  /**
   * 主键id
   */
  gradingId?: number | string;
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 状态 1|已提交，0|待提交
   */
  sizeStatus?: number | string;
  /**
   * 提交次数
   */
  commits?: number | string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常，0|否，1|是
   */
  isAbnormal?: number | string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 设计师id
   */
  designerId?: number | string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 打版类型: 1-产前样 2-正常打版 3-复色打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 推码完成时间
   */
  finishTime?: string;
  /**
   * 1、 如果 finishTime为空 创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应：生成时间）
   * 2、 如果 finishTime不为空 创建时间（用于计算当前耗时【finishTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 放码师id
   */
  gradingDivisionId?: number | string;
  /**
   * 放码师
   */
  gradingDivisionName?: number | string;
  /**
   * 二次工艺&裁剪方法
   */
  SecondCraftDemandList?: {
    /**
     * 工艺状态 100:已提交 190:已关闭
     */
    state?: number | string;
    /**
     * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
     */
    category1?: string;
    /**
     * 材料类型 二级分类
     */
    category2?: string;
    /**
     * 材料类型 三级分类
     */
    category3?: string;
    /**
     * 工艺要求:  100:裁版前工艺 110:裁版后工艺
     */
    craftsRequire?: number | string;
    /**
     * 工艺环节,字典code
     */
    craftsProcess?: string;
    /**
     * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
     */
    undertakeType?: string;
  }[];
}
/**
 * 响应数据
 */
export interface PostWebV1GradingClothesPageApiRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page?: number & string;
  /**
   * 总数据量
   */
  total?: number & string;
  /**
   * 分页数据
   */
  list?: postWebV1GradingClothesPageApiResListResItem[];
}

/**
  * **请求类型**
  * 查询全部返修列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92420
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/repair/all/page
  * @更新时间: 2021-09-10 10:21:37
  */
export interface GetWebV1RepairAllPageApiReq {
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 发起环节
   */
  processStep?: string;
  /**
   * 返修环节（当前返修状态）状态（0/不传: 全部，1:待分单，2:已分单，3:进行中，4，已取消 5:已完成）
   */
  status?: string;
  /**
   * 返修原因()
   */
  repairReason?: string;
  /**
   * 版本号
   */
  versionNum?: string;
  /**
   * 预估耗时最小（单位：h）
   */
  estimatedTimeMin?: string;
  /**
   * 预估耗时最大（单位：h）
   */
  estimatedTimeMax?: string;
  /**
   * 期望交期开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期结束时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期开始时间
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效最小天数
   */
  devTimeMin?: string;
  /**
   * 开发时效最大天数
   */
  devTimeMax?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师
   */
  patternMakerName?: string;
  /**
   * 车缝师
   */
  sewerName?: string;
  pageNum?: string | number;
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 查询全部返修列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92420
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/repair/all/page
  * @更新时间: 2021-09-10 10:21:37
  */
export interface getWebV1RepairAllPageApiResListResItem {
  /**
   * 返修单id
   */
  repairId?: number | string;
  /**
   * 返修单号,F+（后两位）年（两位）月（两位）日+3位流水号-版本号的返修记录
   */
  repairCode?: string;
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 返修件数
   */
  repairNum?: number | string;
  /**
   * 发起环节/返修环节
   */
  processStep?: number | string;
  /**
   * 分单员id
   */
  allocateeId?: number | string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 返修原因()
   */
  repairReason?: number | string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty?: number | string;
  /**
   * 返修描述
   */
  describe?: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime?: number | string;
  /**
   * 状态（1:待分单，2:已分单，3:进行中，4:已完成）
   */
  status?: number | string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 操作记录
   */
  remarkVos?: {
    /**
     * 自增id
     */
    remarkId?: number | string;
    /**
     * 业务id
     */
    bizId?: number | string;
    /**
     * 业务类型: 1-打版、2-异常、3-返修
     */
    bizType?: 'SAMPLE_CLOTHES' | 'ANOMALY' | 'REPAIR';
    /**
     * 备注信息
     */
    remark?: string;
    /**
     * 操作人id
     */
    creatorId?: number | string;
    /**
     * 操作人名称
     */
    createdName?: string;
    /**
     * 创建时间
     */
    createdTime?: string;
  }[];
}
export interface GetWebV1RepairAllPageApiRes {
  page?: number | string;
  total?: number | string;
  list?: getWebV1RepairAllPageApiResListResItem[];
}

/**
  * **请求类型**
  * 查询内部样衣返修列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92426
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/repair/inner/page
  * @更新时间: 2021-09-10 10:21:37
  */
export interface GetWebV1RepairInnerPageApiReq {
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 发起环节
   */
  processStep?: string;
  /**
   * 返修原因()
   */
  repairReason?: string;
  /**
   * 预估耗时最小（单位：h）
   */
  estimatedTimeMin?: string;
  /**
   * 预估耗时最大（单位：h）
   */
  estimatedTimeMax?: string;
  /**
   * 期望交期开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期结束时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 创建开始时间
   */
  createdTimeStart?: string;
  /**
   * 创建结束时间
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期开始时间
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效最小天数
   */
  devTimeMin?: string;
  /**
   * 开发时效最大天数
   */
  devTimeMax?: string;
  /**
   * 纸样师
   */
  patternMakerName?: string;
  /**
   * 返修人姓名
   */
  allocateeName?: string;
  pageNum?: string | number;
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 查询内部样衣返修列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92426
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/repair/inner/page
  * @更新时间: 2021-09-10 10:21:37
  */
export interface getWebV1RepairInnerPageApiResListResItem {
  /**
   * 返修单id
   */
  repairId?: number | string;
  /**
   * 返修单号,F+（后两位）年（两位）月（两位）日+3位流水号-版本号的返修记录
   */
  repairCode?: string;
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 返修件数
   */
  repairNum?: number | string;
  /**
   * 发起环节/返修环节
   */
  processStep?: number | string;
  /**
   * 分单员id
   */
  allocateeId?: number | string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 返修原因()
   */
  repairReason?: number | string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty?: number | string;
  /**
   * 返修描述
   */
  describe?: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime?: number | string;
  /**
   * 状态（1:待分单，2:已分单，3:进行中，4:已完成）
   */
  status?: number | string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 操作记录
   */
  remarkVos?: {
    /**
     * 自增id
     */
    remarkId?: number | string;
    /**
     * 业务id
     */
    bizId?: number | string;
    /**
     * 业务类型: 1-打版、2-异常、3-返修
     */
    bizType?: 'SAMPLE_CLOTHES' | 'ANOMALY' | 'REPAIR';
    /**
     * 备注信息
     */
    remark?: string;
    /**
     * 操作人id
     */
    creatorId?: number | string;
    /**
     * 操作人名称
     */
    createdName?: string;
    /**
     * 创建时间
     */
    createdTime?: string;
  }[];
}
export interface GetWebV1RepairInnerPageApiRes {
  page?: number | string;
  total?: number | string;
  list?: getWebV1RepairInnerPageApiResListResItem[];
}

/**
  * **请求类型**
  * 详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92434
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/repair/{id}
  * @更新时间: 2021-09-10 10:21:38
  */
export interface GetWebV1RepairIdApiReq {
  /**
   * 主键
   */
  id: string;
}

/**
  * **返回类型**
  * 详情
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92434
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/repair/{id}
  * @更新时间: 2021-09-10 10:21:38
  */
export interface getWebV1RepairIdApiResRemarkVosResItem {
  /**
   * 自增id
   */
  remarkId?: number | string;
  /**
   * 业务id
   */
  bizId?: number | string;
  /**
   * 业务类型: 1-打版、2-异常、3-返修
   */
  bizType?: 'SAMPLE_CLOTHES' | 'ANOMALY' | 'REPAIR';
  /**
   * 备注信息
   */
  remark?: string;
  /**
   * 操作人id
   */
  creatorId?: number | string;
  /**
   * 操作人名称
   */
  createdName?: string;
  /**
   * 创建时间
   */
  createdTime?: string;
}
export interface GetWebV1RepairIdApiRes {
  /**
   * 返修单id
   */
  repairId?: number | string;
  /**
   * 返修单号,F+（后两位）年（两位）月（两位）日+3位流水号-版本号的返修记录
   */
  repairCode?: string;
  /**
   * 样衣打版id
   */
  clothesId?: number | string;
  /**
   * 设计款号, skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 返修件数
   */
  repairNum?: number | string;
  /**
   * 发起环节/返修环节
   */
  processStep?: number | string;
  /**
   * 分单员id
   */
  allocateeId?: number | string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 返修原因()
   */
  repairReason?: number | string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty?: number | string;
  /**
   * 返修描述
   */
  describe?: string;
  /**
   * 预估耗时（单位：h）
   */
  estimatedTime?: number | string;
  /**
   * 状态（1:待分单，2:已分单，3:进行中，4:已完成）
   */
  status?: number | string;
  /**
   * 版房id（外部版房id，内部：1）
   */
  roomId?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 客户图片{多张以英文逗号分隔}
   */
  customerPicture?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 车缝师id
   */
  sewerId?: number | string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 操作记录
   */
  remarkVos?: getWebV1RepairIdApiResRemarkVosResItem[];
}

/**
  * **请求类型**
  * 查询异常列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92440
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/page
  * @更新时间: 2021-09-10 11:54:34
  */
export interface GetWebV1AnomalyPageApiReq {
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 异常类型（）
   */
  anomalyType?: string;
  /**
   * 发起人姓名
   */
  sponsorName?: string;
  /**
   * 发起环节： 200: 纸样待分单、 230: 内部纸样-待进行、 250: 内部纸样-进行中、 270: 外部纸样-待接单、 290: 外部纸样-进行中、 300: 面辅料齐套、 400: 车版待分单、 410: 内部车版-裁剪进行中、 420: 内部车版-裁片二次工艺、 430: 内部车版-车缝待进行、 440: 内部车版-车缝-半成品二次工艺、 460: 内部车版-车缝进行中、 470: 内部车版-成品二次工艺、 500: 外部车版-待接单、 510: 外部车版-裁剪、 520: 外部车版-裁片二次工艺、 530: 外部车版-车缝待进行、 540: 外部车版-车缝-半成品二次工艺、 550: 外部车版-车缝进行中、 560: 外部车版-成品二次工艺、 570: 外部车版-送货、 580: 外部车版-收货、 600: 样衣质检、 610: 样衣审版、 620: 设计审版、 630: 用量维护、 640: 样衣核价、 650: 寄送样衣、 660: 客户审版
   */
  processStep?: string;
  /**
   * 设计师名称【设计师】
   */
  'designerNameList[0]'?: string;
  /**
   * 设计组别
   */
  'designerGroupList[0]'?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: string;
  /**
   * 责任部门
   */
  responsibleDepartment?: string;
  /**
   * 责任人姓名
   */
  responsibleName?: string;
  /**
   * 处理人姓名
   */
  handlerName?: string;
  /**
   * 状态（1：待处理，2：驳回待审核，3：已驳回，4：处理中，5；结案待审核，6：已结案）
   */
  status?: string;
  pageNum?: string | number;
  pageSize?: string | number;
}

/**
  * **返回类型**
  * 查询异常列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92440
  *
  * @请求方法: GET
  * @请求地址: /plm-sample-clothes/web/v1/anomaly/page
  * @更新时间: 2021-09-10 11:54:34
  */
export interface getWebV1AnomalyPageApiResListResItem {
  /**
   * 异常单id
   */
  anomalyId?: number | string;
  /**
   * 异常单号,YC+（两位）年（两位）月（两位）日+3位流水号的异常记录
   */
  anomalyCode?: string;
  /**
   * 版单id
   */
  closeId?: number | string;
  /**
   * 设计款号
   */
  designCode?: string;
  /**
   * 异常类型（）
   */
  anomalyType?: number | string;
  /**
   * 异常发起人id
   */
  sponsorId?: number | string;
  /**
   * 异常发起人姓名
   */
  sponsorName?: string;
  /**
   * 发起环节： 200: 纸样待分单、 230: 内部纸样-待进行、 250: 内部纸样-进行中、 270: 外部纸样-待接单、 290: 外部纸样-进行中、 300: 面辅料齐套、 400: 车版待分单、 410: 内部车版-裁剪进行中、 420: 内部车版-裁片二次工艺、 430: 内部车版-车缝待进行、 440: 内部车版-车缝-半成品二次工艺、 460: 内部车版-车缝进行中、 470: 内部车版-成品二次工艺、 500: 外部车版-待接单、 510: 外部车版-裁剪、 520: 外部车版-裁片二次工艺、 530: 外部车版-车缝待进行、 540: 外部车版-车缝-半成品二次工艺、 550: 外部车版-车缝进行中、 560: 外部车版-成品二次工艺、 570: 外部车版-送货、 580: 外部车版-收货、 600: 样衣质检、 610: 样衣审版、 620: 设计审版、 630: 用量维护、 640: 样衣核价、 650: 寄送样衣、 660: 客户审版
   */
  processStep?: string;
  /**
   * 责任部门
   */
  responsibleDepartment?: string;
  /**
   * 责任人id
   */
  responsibleId?: number | string;
  /**
   * 责任人姓名
   */
  responsibleName?: string;
  /**
   * 异常图片
   */
  picture?: string;
  /**
   * 异常描述
   */
  description?: string;
  /**
   * 处理人id
   */
  handlerId?: number | string;
  /**
   * 处理人姓名
   */
  handlerName?: string;
  /**
   * 驳回/取消原因
   */
  rejectedReason?: string;
  /**
   * 状态（1：待处理，2：驳回待审核，3：已驳回，4：处理中，5；结案待审核，6：已结案）
   */
  status?: number | string;
  /**
   * 处理完成时间
   */
  completeTime?: string;
  /**
   * 创建人姓名
   */
  createdName?: string;
  /**
   * 更新人姓名
   */
  revisedName?: string;
}
export interface GetWebV1AnomalyPageApiRes {
  page?: number | string;
  total?: number | string;
  list?: getWebV1AnomalyPageApiResListResItem[];
}

/**
  * **请求类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92520
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sew/page
  * @更新时间: 2021-09-09 17:33:54
  */
/**
  * 分页对象
  */
export interface PostWebV1SewPageApiReq {
  /**
   * 查询车版列表枚举类。必传
   */
  sewQueryListType:
  | 'ALLOCATE'
  | 'CUT'
  | 'SLICE_CRAFT'
  | 'SEW_PENDING'
  | 'SEW_SEMI_FINISH_CRAFT'
  | 'SEW_PROCESS'
  | 'SEW_FINISH'
  | 'ALLOCATE_EXT'
  | 'CUT_EXT'
  | 'SLICE_CRAFT_EXT'
  | 'SEW_PENDING_EXT'
  | 'SEW_SEMI_FINISH_CRAFT_EXT'
  | 'SEW_PROCESS_EXT'
  | 'SEW_FINISH_EXT'
  | 'SEW_RECEIPT_EXT';
  /**
   * 分单员id
   */
  allocateeId?: number | string;
  /**
   * 车版分单：1:外部车版  0:内部车版
   */
  isOutsourced?: number | string;
  /**
   * 车版分单状态。（1:待分单 2:已分单）
   */
  allocateState?: number | string;
  /**
   * 裁剪状态。（1:裁剪中 2:已裁剪）
   */
  cutState?: number | string;
  /**
   * 裁片二次工艺状态。（1:进行中 2:已完成）
   */
  sliceCraftState?: number | string;
  /**
   * 车缝状态。（1:待进行  3:进行中 4:已完成）
   */
  sewState?: number | string;
  /**
   * 半成品二次工艺状态。（1:进行中 2:已完成）
   */
  semiFinishCraftState?: number | string;
  /**
   * 外部接单状态。（1:待接单 2:已接单）
   */
  pickExtState?: number | string;
  /**
   * 成品二次工艺状态。（1:进行中 2:已完成）
   */
  finishCraftState?: number | string;
  /**
   * 车缝师id
   */
  sewerIdList?: number[];
  /**
   * 裁剪师id
   */
  cutterIdList?: number[];
  /**
   * 供应商
   */
  roomIdList?: number[];
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType:
  | 'NORMAL_PATTERN_MAKING'
  | 'COMPOUND_COLORS_MAKING'
  | 'MORE_PATTERN_MAKING'
  | 'LARGE_CARGO_MAKING';
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 技术组别
   */
  techniqueGroup?: string;
  /**
   * 纸样师id
   */
  patternMakerId?: number | string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeStart?: string;
  /**
   * 期望交期:开始时间
   */
  planDeliveryTimeEnd?: string;
  /**
   * 设计师id【设计师】
   */
  designerIdList?: number[];
  /**
   * 设计组编号
   */
  designerGroupCodeList?: string[];
  /**
   * 款生成时间（创建时间）
   */
  createdTimeStart?: string;
  /**
   * 款生成时间（创建时间）
   */
  createdTimeEnd?: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 开发交付日期：
   */
  deliveryTimeStart?: string;
  /**
   * 开发交付日期:结束时间
   */
  deliveryTimeEnd?: string;
  /**
   * 开发时效（如果默认是开发时效，前端不需要传数据）
   */
  effectivenessType?: 'OVERDUE' | 'NOT_EXPIRED';
  /**
   * 开发时效-开始天数（传数值）
   */
  effectivenessTimeStart?: number | string;
  /**
   * 开发时效-结束天数（传数值）
   */
  effectivenessTimeEnd?: number | string;
  /**
   * 当前耗时-开始（精确到小时）
   */
  timeConsumingStart?: number | string;
  /**
   * 当前耗时-结束（精确到小时）
   */
  timeConsumingEnd?: number | string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  pageNum?: number | string;
  pageSize?: number | string;
}

/**
  * **返回类型**
  * 查询列表（分页）
  * @see https://yapi.ibaibu.com/project/1650/interface/api/92520
  *
  * @请求方法: POST
  * @请求地址: /plm-sample-clothes/web/v1/sew/page
  * @更新时间: 2021-09-09 17:33:54
  */
export interface postWebV1SewPageApiResListResItem {
  /**
   * 车版id
   */
  sewId?: number | string;
  /**
   * 车版收货id
   */
  sewReceiptId?: number | string;
  /**
   * 车版分单/供应商（版房名字）
   */
  roomName?: string;
  /**
   * 纸样师名称
   */
  patternMakerName?: string;
  /**
   * 分单员名字
   */
  allocateeName?: string;
  /**
   * 裁剪师名称
   */
  cutterName?: string;
  /**
   * 设计师名称
   */
  designerName?: string;
  /**
   * 车缝师名称
   */
  sewerName?: string;
  /**
   * 纸样url
   */
  patternUrl?: string;
  /**
   * 纸样版本状态数量
   */
  patternVersion?: number | string;
  /**
   * 车缝量尺
   */
  sewSizeInfo?: {
    /**
     * 实测样衣（如：实测样衣1尺寸、实测样衣2尺寸）
     */
    clothesTrimSizeList?: {
      /**
       * 保存是"1、2"。前端拼接： 实测样衣1尺寸、实测样衣2尺寸
       */
      clothesName?: string;
      value?: string;
    }[];
    /**
     * 部位编码
     */
    positionCode?: string;
    /**
     * 部位编码名字
     */
    positionName?: string;
    /**
     * 尺寸维度
     */
    dimension?: string;
    /**
     * 量法
     */
    measuringMethod?: string;
    /**
     * 客户尺寸
     */
    size?: string;
    /**
     * 样衣尺寸
     */
    sampleClothesSize?: string;
    /**
     * 纸样尺寸
     */
    patternSize?: string;
    /**
     * 允差范围
     */
    tolerance?: string;
  };
  /**
   * 收货件数
   */
  receiptNumber?: number | string;
  /**
   * 样衣图图片
   */
  sewPictureList?: string[];
  /**
   * 版单id
   */
  clothesId?: number | string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType?: number | string;
  /**
   * 版本号
   */
  versionNum?: number | string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode?: string;
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 客户图片
   */
  customerPictureList?: string[];
  /**
   * 打版件数
   */
  sampleAmount?: number | string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode?: string;
  /**
   * 成衣SPU(款式SPU)。SPU+年份+6位流水号
   */
  styleCode?: string;
  /**
   * 客户id
   */
  purchaserId?: number | string;
  /**
   * 客户编号
   */
  purchaserCode?: string;
  /**
   * 客户名称
   */
  purchaserName?: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category?: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName?: string;
  /**
   * 区域id
   */
  regionId?: number | string;
  /**
   * 区域名
   */
  regionName?: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent?: number | string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal?: number | string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair?: number | string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial?: number | string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft?: number | string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState?: number | string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode?: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName?: string;
  /**
   * 开发交付日期
   */
  deliveryTime?: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod?: string;
  /**
   * 期望交期
   */
  planDeliveryTime?: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）（对应拆版的：款生成时间）
   */
  processingStepCreatedTime?: string;
  /**
   * 当前时间
   */
  currentTime?: string;
  /**
   * 二次工艺
   */
  craftList?: string[];
  /**
   * 裁剪方法
   */
  cuttingMethod?: string;
}
export interface PostWebV1SewPageApiRes {
  page?: number | string;
  total?: number | string;
  list?: postWebV1SewPageApiResListResItem[];
}

export type IPatternClothesCraftReq = Record<string, unknown>;
/**
 * 响应数据
 */
export interface IPatternClothesCraftRes {
  /**
   * 纸样id
   */
  patternId: string;
  /**
   * 版单id
   */
  clothesId: string;
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode: string;
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  /**
   * bomId
   */
  bomId: string;
  /**
   * 二次工艺维护
   */
  patternSecondCraftList: IPatternClothesCraftPatternSecondCraftListItem[];
}
export interface IPatternClothesCraftPatternSecondCraftListItem {
  /**
   * 二次工艺主键id
   */
  craftDemandId: string;
  /**
   * bomID
   */
  bomId: string;
  /**
   * 设计款号。 skc+年月日+4位流水号
   */
  designCode: string;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1: string;
  /**
   * 材料类型 二级分类
   */
  category2: string;
  /**
   * 材料类型 三级分类
   */
  category3: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire: string;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId: string;
  /**
   * 工艺厂名,外部独有
   */
  factoryName: string;
  /**
   * 工艺承接者-联系人
   */
  contactName: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList: string[];
  /**
   * 位置要求
   */
  positionRequirement: string;
  /**
   * 尺寸要求
   */
  sizeRequirement: string;
  /**
   * 颜色要求
   */
  colorRequirement: string;
  /**
   * 克重要求
   */
  weightRequirement: string;
  /**
   * 其他工艺要求
   */
  otherRequirement: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 创建人名称
   */
  creatorName: string;
}
/**
 * **返回类型**
 * 获取bom详情信息
 * @see https://yapi.ibaibu.com/project/1650/interface/api/93540
 *
 * @请求方法: GET
 * @请求地址: /plm-sample-clothes/web/v1/design-common/bom/{designCode}
 * @更新时间: 2021-09-13 17:18:05
 */
export interface GetWebV1DesignCommonBomDesignCodeApiResItem {
  /**
   * bom物料ID
   */
  bomMaterialId?: number;
  /**
   * bomID
   */
  bomId?: number;
  /**
   * 物料确认结果ID
   */
  trackResultId?: number;
  /**
   * 设计款物料项目名
   */
  prototypeMaterialName?: string;
  /**
   * 使用部位,字典code
   */
  partUse?: string;
  /**
   * 单件用量
   */
  singleDosage?: number;
  /**
   * 裁剪方式
   */
  cuttingMethod?: string;
  /**
   * 用量核算
   */
  dosageAccount?: number;
  /**
   * bom物料备注列表
   */
  materialRemarkList?: {
    /**
     * 备注ID
     */
    designRemarksId?: number;
    /**
     * 备注信息
     */
    remark?: string;
    /**
     * 操作人id
     */
    creatorId?: number;
    /**
     * 操作人名称
     */
    createdName?: string;
    /**
     * 创建时间
     */
    createdTime?: string;
  }[];
  /**
   * 绑定采购状态 100-待绑定 110-已绑定
   */
  bingPurchaseState?: number;
  /**
   * 需求单id
   */
  demandId?: number;
  /**
   * 需求类型: 1, 面料; 2, 辅料;
   */
  demandType?: number;
  /**
   * 需求匹配单id
   */
  matchId?: number;
  /**
   * 需求匹配单编码
   */
  matchCode?: string;
  /**
   * 商品类型: PURE净色 FLOWER花型 ACCESSORIES : 辅料
   */
  commodityType?: string;
  /**
   * 商品名称(品名)
   */
  commodityName?: string;
  /**
   * 商品id
   */
  commodityId?: number;
  /**
   * 匹配物料图片
   */
  matchPictureList?: string[];
  /**
   * 匹配物料SPU编码: 商品编码
   */
  commodityCode?: string;
  /**
   * 货号: 商品货号
   */
  commodityNumber?: string;
  /**
   * 成分; json, 会有多种成分比例
   */
  material?: string;
  /**
   * SKU编码(辅料)
   */
  skuCode?: string;
  /**
   * 销售价格(辅料)
   */
  matchSalePrice?: string;
  /**
   * 销售单位(辅料)
   */
  matchPurchaseUnitName?: string;
  /**
   * 包装数量(辅料)
   */
  packNumber?: number;
  /**
   * 包装数量单位(辅料)
   */
  packNumberUnit?: string;
  /**
   * 辅料属性集合(json数据)_用户选择的
   */
  skuAttrs?: string;
  /**
   * 幅宽最低值
   */
  widthLow?: string;
  /**
   * 幅宽最高值
   */
  widthHigh?: string;
  /**
   * 幅宽单位
   */
  widthUnit?: string;
  /**
   * 销售单位
   */
  saleUnit?: string;
  /**
   * 克重最低值
   */
  weightLow?: string;
  /**
   * 克重最高值
   */
  weightHigh?: string;
  /**
   * 克重单位
   */
  weightUnit?: string;
  /**
   * 色系
   */
  colorName?: string;
  /**
   * 色号
   */
  colorNumber?: string;
  /**
   * 剪版销价
   */
  matchSampleGuidePrice?: string;
  /**
   * 剪版销价单位
   */
  matchSampleUnit?: string;
  /**
   * 大货销价
   */
  matchGuidePrice?: string;
  /**
   * 大货销价单位
   */
  matchCostPriceUnit?: string;
  /**
   * 销售空差
   */
  matchPurchaseGap?: string;
  /**
   * 回复方式(匹配来源，（外匹配1 内匹配2 复用匹配3 设计师匹配4 指定供应商匹配5）)
   */
  matchSource?: number;
  /**
   * 回复人员
   */
  matcherName?: string;
  /**
   * 匹配反馈备注
   */
  matchRemark?: string;
  /**
   * 匹配未完成原因
   */
  unfinishedReason?: string;
  /**
   * 色卡图片: 设计师上传的色卡图片
   */
  colorCardPicture?: string;
  /**
   * 匹配是否确认，0 否，是1
   */
  isConfirm?: number;
  /**
   * 二次工艺信息列表
   */
  craftDemandInfoList?: craftDemandListItem[];
}

export interface craftDemandListItem {
  /**
   * 工艺需求主键id
   */
  craftDemandId?: number;
  /**
   * bomID
   */
  bomId?: number;
  /**
   * bom详情ID
   */
  bomMaterialId?: number;
  /**
   * 材料类型 一级分类 FABRIC:面料 ACCESSORIES:辅料
   */
  category1?: string;
  /**
   * 材料类型 二级分类
   */
  category2?: string;
  /**
   * 材料类型 三级分类
   */
  category3?: string;
  /**
   * 工艺要求:  100:裁版前工艺 110:裁版后工艺
   */
  craftsRequire?: number;
  /**
   * 承接方式,{CRAFT_GROUP:工艺组,CUSTOMER:客户}
   */
  undertakeType?: string;
  /**
   * 内部工艺厂ID
   */
  innerFactoryId?: number;
  /**
   * 工艺厂名,外部独有
   */
  factoryName?: string;
  /**
   * 工艺承接者-联系人
   */
  contactName?: string;
  /**
   * 工艺承接者-工厂联系电话
   */
  contactPhone?: string;
  /**
   * 工艺承接者-所在省份
   */
  contactProvince?: string;
  /**
   * 工艺承接者-所在城市
   */
  contactCity?: string;
  /**
   * 工艺承接者-所在区/县
   */
  contactRegion?: string;
  /**
   * 工艺承接者-详细地址
   */
  contactDetailAddress?: string;
  /**
   * 工艺图片，最多9张
   */
  pictureList?: string[];
  /**
   * 位置要求
   */
  positionRequirement?: string;
  /**
   * 尺寸要求
   */
  sizeRequirement?: string;
  /**
   * 颜色要求
   */
  colorRequirement?: string;
  /**
   * 克重要求
   */
  weightRequirement?: string;
  /**
   * 其他工艺要求
   */
  otherRequirement?: string;
  /**
   * 创建人id
   */
  creatorId?: number;
  /**
   * 创建时间
   */
  createdTime?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
}
/**
 * 响应数据
 */
export type GetWebV1DesignCommonBomDesignCodeApiRes = GetWebV1DesignCommonBomDesignCodeApiResItem[];

/**
 * 请求参数
 */
export interface IPatternClothesOldReq {
  /**
   * 原始加工单号
   */
  baseProcessCode?: string;
  /**
   * 设计款号
   */
  designCode?: string;
}
/**
 * 响应数据
 */
export type IPatternClothesOldRes = {
  /**
   * 纸样id
   */
  patternId: string;
  /**
   * 尺寸id
   */
  patternSizeId: string;
  /**
   * 纸样分单状态。（0:未流转 1:待分单 2:已分单）
   */
  allocateState: string;
  /**
   * 版房id(1:内部,其他外部版房id)
   */
  roomId: string;
  /**
   * 版房名字
   */
  roomName: string;
  /**
   * 分单员id
   */
  allocateeId: string;
  /**
   * 分单员名字
   */
  allocateeName: string;
  /**
   * 是否外发(1:是,0:不是)
   */
  isOutsourced: string;
  /**
   * 是否已分单(1:是,0:不是)
   */
  isAllocated: string;
  /**
   * 尺寸版本数量统计 0:新建| >0纸样尺寸版本
   */
  sizeVersion: string;
  /**
   * 纸样版本状态数量 0:待上传 | >0上传版本
   */
  patternVersion: string;
  /**
   * 纸样url
   */
  patternUrl: string;
  /**
   * 纸样状态 0:待进行 |1进行中 |2已完成
   */
  patternState: string;
  /**
   * 分单状态 1:纸样,2:车版,3:纸样加车版
   */
  allocateType: string;
  /**
   * 分单开始时间
   */
  seperateStartTime: string;
  /**
   * 分单完成时间
   */
  seperateFinishTime: string;
  /**
   * 纸样开始时间
   */
  patternStartTime: string;
  /**
   * 纸样完成时间
   */
  patternFinishTime: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名字
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 更新人id
   */
  reviserId: string;
  /**
   * 更新人名字
   */
  reviserName: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 设计版单id
   */
  prototypeId: string;
  /**
   * 销售bdid
   */
  bdId: string;
  /**
   * 销售bd编号
   */
  bdCode: string;
  /**
   * 销售bd名字
   */
  bdName: string;
  /**
   * 是否最新(同一加工单号最新的条) 0-否、1-是
   */
  isLatest: string;
  /**
   * 版单详细表id
   */
  detailId: string;
  /**
   * 复色款号
   */
  makeSameDesignCode: string;
  /**
   * 尺码标准
   */
  sizeStandard: string;
  /**
   * 样衣尺码
   */
  sampleSize: string;
  /**
   * 版型要求
   */
  layoutRequirement: string;
  /**
   * 销售群体
   */
  saleGroup: string;
  /**
   * 客户款号
   */
  customerStyleCode: string;
  /**
   * SKC（款）生成时间
   */
  skcCreatedTime: string;
  /**
   * SPU生成时间
   */
  spuCreatedTime: string;
  /**
   * 齐套签收时间
   */
  materialSignTime: string;
  /**
   * 设计组code
   */
  designerGroupCode: string;
  /**
   * 设计组
   */
  designerGroup: string;
  /**
   * 复版原因
   */
  redoReason: string;
  /**
   * 版单id
   */
  clothesId: string;
  /**
   * 打版类型: 1-正常打版 2-复色打版 3-补做打版 4-大货打版
   */
  sampleType: string;
  /**
   * 版本号
   */
  versionNum: string;
  /**
   * 加工单号（原始加工单号+版本号）
   */
  processCode: string;
  /**
   * 原始加工单号
   */
  baseProcessCode: string;
  /**
   * 客户图片
   */
  customerPictureList: string[];
  /**
   * 打版件数
   */
  sampleAmount: string;
  /**
   * 设计款号
   */
  designCode: string;
  /**
   * 成衣SPU(款式SPU)
   */
  styleCode: string;
  /**
   * 客户id
   */
  purchaserId: string;
  /**
   * 客户编号
   */
  purchaserCode: string;
  /**
   * 客户名称
   */
  purchaserName: string;
  /**
   * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
   */
  category: string;
  /**
   * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
   */
  categoryName: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 是否紧急(1-是、0-否)
   */
  isUrgent: string;
  /**
   * 是否异常(1-是、0-否)
   */
  isAbnormal: string;
  /**
   * 是否返修(1-是、0-否)
   */
  isRepair: string;
  /**
   * 是否补料款(1-是、0-否)
   */
  isAddMaterial: string;
  /**
   * 是否二次工艺(1:是,0:不是)
   */
  isCraft: string;
  /**
   * 面辅料齐套状态(1-已齐套、0-未齐套)
   */
  materialState: string;
  /**
   * 交期类型编码
   */
  deliveryTypeCode: string;
  /**
   * 交期类型名称
   */
  deliveryTypeName: string;
  /**
   * 开发交付日期
   */
  deliveryTime: string;
  /**
   * 开发交付周期。如：T+3，此值就是3
   */
  deliveryPeriod: string;
  /**
   * 期望交期
   */
  planDeliveryTime: string;
  /**
   * 设计师id
   */
  designerId: string;
  /**
   * 设计师名称
   */
  designerName: string;
  /**
   * 纸样师id
   */
  patternMakerId: string;
  /**
   * 纸样师名称
   */
  patternMakerName: string;
  /**
   * 环节创建时间（用于计算当前耗时【currentTime-processingStepCreatedTime】）
   */
  processingStepCreatedTime: string;
  /**
   * 当前时间
   */
  currentTime: string;
  /**
   * 二次工艺
   */
  craftList: string[];
  /**
   * 裁剪方法编码
   */
  cuttingMethodCode: string;
  /**
   * 裁剪方法
   */
  cuttingMethod: string;
  anomaly: IPatternClothesOldAnomaly;
  repair: IPatternClothesOldRepair;
}[];

/**
 * 异常信息
 */
export interface IPatternClothesOldAnomaly {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 异常单号
   */
  anomalyCode: string;
  /**
   * 异常类型
   */
  typeDescription: string;
  /**
   * 异常描述
   */
  description: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
}
/**
 * 返修信息
 */
export interface IPatternClothesOldRepair {
  /**
   * 样衣打版id
   */
  clothesId: string;
  /**
   * 返修责任方(1:版房原因、2:设计师原因、3:客户要求)
   */
  responsibleParty: string;
  /**
   * 返修描述
   */
  describe: string;
  /**
   * 返修时间
   */
  createdTime: string;
}

export type IResponsibleDepartmentPageReq = Record<string, unknown>;
export interface IResponsibleDepartmentPageRes {
  page: string;
  total: string;
  list: IResponsibleDepartmentPageListItem[];
}
export interface IResponsibleDepartmentPageListItem {
  /**
   * 责任部门id
   */
  departmentId: string;
  /**
   * 责任部门编码
   */
  departmentCode: string;
  /**
   * 责任部门名称
   */
  departmentName: string;
  /**
   * 责任人id
   */
  responsibleId: string;
  /**
   * 责任人姓名
   */
  responsibleName: string;
  /**
   * 状态: 0-停用 、1-启用
   */
  isEnabled: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 修改人id
   */
  reviserId: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 修改时间
   */
  revisedTime: string;
}
