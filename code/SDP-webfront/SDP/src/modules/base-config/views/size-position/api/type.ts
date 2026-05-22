export interface IClothesPartsSizePageLogListItem {
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

export interface IClothesPartsSizePagePartsMeasurementVOListItem {
  /**
   * 新增成功后会返回主键的值IdType.AUTO
   */
  clothesPartsMeasurementId: string;
  /**
   * 部位名称
   */
  measuringMethod: string;
  /**
   * 尺寸部位编码
   */
  partsSizeCode: string;
}

export interface IClothesPartsSizePageListItem {
  id: string;
  /**
   * 部位名称
   */
  clothesPartsName: string;
  /**
   * 尺寸部位编码
   */
  partsSizeCode: string;
  /**
   * 尺寸维度   1|X1、2|X2
   */
  sizeDimensions: string;
  /**
   * 允差范（cm）
   */
  errorRange: string;
  /**
   * 标签状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabled: string;
  /**
   * 标签状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabledName: string;
  /**
   * 标签的操作日志信息
   */
  logList: IClothesPartsSizePageLogListItem[];
  /**
   * 最新的一条日志
   */
  logStrFirst: string;

  partsMeasurementVOList: IClothesPartsSizePagePartsMeasurementVOListItem[];
  measuringMethodList?: string[];

}

export interface IClothesPartsSizePageReq {
  /**
   * 部位名称
   */
  clothesPartsName?: string;
  /**
   * 状态是否启用 0 否 1是-看需要冗余添加
   */
  isEnabled?: string;
  /**
   * 创建时间（开始）
   */
  createdTimeBegin?: string | number;
  /**
   * 创建时间（结束）
   */
  createdTimeEnd?: string | number;
  pageNum?: number;
  pageSize?: number;
  createdTime?: string[] | number[];
  status?: string;
}
export interface IClothesPartsSizePageRes {
  page: string;
  total: string;
  list: IClothesPartsSizePageListItem[];
}

/**
 * 尺寸部位对象
 */
export interface IAddSizeReq {
  /**
   * 部位名称(尺寸部位)
   */
  clothesPartsName: string;
  /**
   * 尺寸维度 1|X1、2|X2
   */
  sizeDimensions: string;
  /**
   * 允差范（cm）
   */
  errorRange: string;
  measuringMethodList: string[];

}
export type IClothingMaterialClothesPartsSizeRes = null;

/**
 * 基础资料 / 尺寸部位状态修改
 */
export interface IClothesPartsSizeChangeStatusReq {
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
export type IClothesPartsSizeChangeStatusRes = null;

/**
 * 交期类型表对象
 */
export interface IEditSizeReq {
  id: string;
  /**
   * 部位名称(尺寸部位)
   */
  clothesPartsName: string;
  /**
   * 尺寸维度 1|X1、2|X2
   */
  sizeDimensions: string;
  /**
   * 允差范（cm）
   */
  errorRange: string;

  measuringMethodList: string[];

}
