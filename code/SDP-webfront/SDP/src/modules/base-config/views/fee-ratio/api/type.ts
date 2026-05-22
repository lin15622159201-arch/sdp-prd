export interface IRoomEditionFeePageLogListItem {
  id: string;
  /**
   * 业务ID
   */
  buzId: string;
  /**
   * 操作说明
   */
  content: string;
  /**
   * 业务类型 CLOTHES_PARTS-尺寸部位、CLOTHES_SIZE_HOPPING_RULES-尺码跳码规则、EXTERNAL_FEE-外发版费倍率、EXTERNAL_TIME_PRICE-外发工时价格
   */
  buzType: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 逻辑删除 0 否 1是
   */
  isDeleted: string;
  /**
   * 创建人名称
   */
  creatorName: string;
}

export interface IRoomEditionFeePageListItem {
  id: string;
  /**
   * 版房外发种类 ,1合作版房、2共享版房、3兼职版房
   */
  roomExternalType: string;
  /**
   * 外发纸样倍率
   */
  designExternalRatio: string;
  /**
   * 外发车缝倍率
   */
  makeExternalRatio: string;
  /**
   * 状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabled: string;
  /**
   * 状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabledName: string;
  /**
   * 标签的操作日志信息
   */
  logList: IRoomEditionFeePageLogListItem[];
  /**
   * 最新的一条日志
   */
  logStrFirst: string;

  roomExternalTypes?: string[];
}
export interface IRoomEditionFeePageReq {
  pageNum?: number;
  pageSize?: number;
}
export interface IRoomEditionFeePageRes {
  page: string;
  total: string;
  list: IRoomEditionFeePageListItem[];
}

/**
 * 外发版费倍率对象
 */
export interface IAddFeeReq {
  /**
   * 主键id
   */
  id?: string;
  /**
   * 版房外发种类 ,1合作版房、2共享版房、3兼职版房
   */
  roomExternalTypes: number[] | string[];
  /**
   * 外发纸样倍率
   */
  designExternalRatio: string;
  /**
   * 外发车缝倍率
   */
  makeExternalRatio: string;

}

/**
 * 基础资料 / 外发版费倍率状态修改
 */
export interface IRoomEditionFeeChangeStatusReq {
  /**
   * 尺寸部位状态是否启用 0 否 1是
   */
  enabled: string;
  /**
   * 主键
   */
  ids: number[];
  /**
   * 更新时间
   */
  revisedTime?: string;

}
export type IRoomEditionFeeChangeStatusRes = null;

/**
 * 外发版费倍率对象
 */
export interface IEditFeeReq {
  id: string;
  /**
   * 外发纸样倍率
   */
  designExternalRatio: string;
  /**
   * 外发车缝倍率
   */
  makeExternalRatio: string;

}
export type IExternalRoomEditionFeeRes = null;
