import { YES_NO_ENUM, YES_NO_NUMBER_ENUM } from '@/constant';
import { QUOTE_FOB_PRICING_TYPE_ENUM, QUOTE_PRICING_TYPE_ENUM } from '@/constant-transfer';

export interface IdictValueList {
  dictValueId: number | string; // 字典值id
  dictCode: string; // 字典code。关联dict_info表
  valueCode: string; // 字典值编号
  value: string; // 字典值
  sort: number | string; // 排序
  channel: number | string; // 渠道。 1云版房
  remark: string; // 备注
  creatorId: number | string; // 创建人id
  createdTime: string; // 创建时间
  reviserId: number | string; // 更新人id
  revisedTime: string; // 更新时间
  isDeleted: number | string; // 逻辑删除 0 否 1是
  isEnabled: number | string; // 是否启用 0 否 1是
  pageNum: number | string; //
  pageSize: number | string; //

}

export interface IdictValuesItem {
  // channel?: number | string; // 渠道。 1云版房
  // creatorId: number | string; // 创建人id
  // creatorName: string; // 创建人名称
  valueParentCode: string; // 父节点 code
  valueCode: string; // 字典值编号
  remark?: string; // 备注
  // sort: number | string; // 排序
  // reviserName: string; // 更新人名称
  dictValueId?: number | string; // 字典值id
  // isDeleted: number | string; // 逻辑删除 0 否 1是
  dictCode?: string; // 字典编码。关联dict_info表
  // reviserId: number | string; // 更新人id
  isEnabled: YES_NO_NUMBER_ENUM; // 是否启用 0 否 1是
  // createdTime: string; // 创建时间
  value: string; // 字典值
  // revisedTime: string; // 更新时间
  isEnable: YES_NO_NUMBER_ENUM; // 是否启用 0 否 1是
  /**
   * 属性
   */
  attributes: {
    code: string;
    id: string;
    name: string;
    remark: string;
  }[];
  [k: string]: any;
}

export interface IdictValueListItem {
  channel?: number | string; // 渠道。 1云版房
  creatorId?: number | string; // 创建人id
  creatorName?: string; // 创建人名称
  valueCode?: string; // 字典值编号
  remark?: string; // 备注
  sort?: number | string; // 排序
  reviserName?: string; // 更新人名称
  dictValueId?: number | string; // 字典值id
  isDeleted?: number | string; // 逻辑删除 0 否 1是
  dictCode?: string; // 字典编码。关联dict_info表
  reviserId?: number | string; // 更新人id
  isEnabled?: number | string; // 是否启用 0 否 1是
  isEnable?: number | string;
  createdTime?: string; // 创建时间
  value?: string; // 字典值
  revisedTime?: string; // 更新时间
}

export interface IbatchDictValuesRes {
  dictCode: string; // 字典编码
  dictName: string;
  dictValues: IdictValuesItem[]; // 字典值列表
}

// 云工厂字典纸
export interface ICommonGetDictReq {
  /**
   * 字典编码集合
   */
  dictCodes?: string[];
}
export interface ICommonGetDictItem {
  /**
   * 字典类型
   */
  dictCode: string;
  /**
   * 字典数据数据集合
   */
  dictList: ICommonGetDictDictListItem[];
}

export interface ICommonGetDictDictListItem {
  /**
   * 字典数据编号
   */
  dictNum?: string;
  /**
   * 字典数据名称
   */
  dictName: string;
  /**
   * 字典数据父编号
   */
  valueParentCode: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  isEnable: string;
}
/**
 * 检查当前在process的sewingProcess在对应的component的state
 * 响应数据
 */
export interface ISewingProcessCheckComponentStateItem {
  /**
   * 车缝工序ID
   */
  sewingProcessId: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state: YES_NO_ENUM;
}

// ⬇️ 工序款式库明细信息响应体 接口：https://yapi.tiangong.site/project/1302/interface/api/8303
/**
 * 响应数据
 */
export interface IStyleTemplateDetailRes {
  // 状态
  state: YES_NO_ENUM;
  /**
   * 款式id
   */
  processStyleTemplateId: string;
  /**
   * 款式名称
   * isNullAble:0
   */
  styleName: string;
  /**
   * 区域id
   * isNullAble:0
   */
  regionId: string;
  /**
   * 区域名
   * isNullAble:0
   */
  regionName: string;
  /**
   * 引用的款式名称模板id
   * isNullAble:1
   */
  referenceId: string;
  /**
   * 引用的款式名称名称
   * isNullAble:1
   */
  referenceName: string;
  /**
   * 车缝信息
   */
  processStyleSewings: IStyleTemplateDetailResProcessStyleSewingsItem[];
  /**
   * 其他部件信息
   */
  processStyleAnotherProcess: IStyleTemplateDetailResProcessStyleAnotherProcessItem[];
}
export interface IStyleTemplateDetailResProcessStyleSewingsItem {
  /**
   * 车缝工序id
   */
  sewingProcessId: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType: string;
  /**
   * 车种名称
   * isNullAble:1
   */
  plmSewingName: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture: string;
  /**
   * 工序描述
   */
  processDescribe: string;
  /**
   * 预计用时
   */
  estimatedTime: string;
  /**
   * 备注
   */
  remark: string;
}
export interface IStyleTemplateDetailResProcessStyleAnotherProcessItem {
  /**
   * 其他 工序id
   */
  anotherProcessId: string;
  /**
   * 工序环节编号
   * isNullAble:0
   */
  processStepCode: string;
  /**
   * 工序环节名称
   * isNullAble:0
   */
  processStepName: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe: string;
  /**
   * 用量
   * isNullAble:1
   */
  dosage: string;
  /**
   * 单位
   * isNullAble:1
   */
  unit: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 单价
   */
  price: string;
}
// ⬆️ 工序款式库明细信息响应体

/**
 * 工序款式库 查询参数
 */
export interface IStyleTemplateParams {
  /**
   * 所属区域
   */
  regionId?: string;
  /**
   * 款式名称
   */
  styleName?: string;
  /**
   * 状态 1启用 0停用
   */
  state?: YES_NO_ENUM;
  /**
   * 创建开始时间 yyyy-MM-dd HH:mm:ss
   */
  createStartTime?: string;
  /**
   * 创建结束时间 yyyy-MM-dd HH:mm:ss
   */
  createEndTime?: string;
  /**
   * 页码
   */
  pageNum?: number;
  /**
   * 单页数据量
   */
  pageSize?: number;
}

// ⬇️ 工序款式库 查询列表（分页）响应体 接口：https://yapi.tiangong.site/project/1302/interface/api/8304
/**
 * 响应数据
 */
export interface IStyleTemplatePageRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page: string;
  /**
   * 总数据量
   */
  total: string;
  /**
   * 分页数据
   */
  list: IStyleTemplatePageResListItem[];
}
export interface IStyleTemplatePageResListItem {
  /**
   * 款式id
   */
  processStyleTemplateId: string;
  /**
   * 款式名称
   * isNullAble:0
   */
  styleName: string;
  /**
   * 区域id
   * isNullAble:0
   */
  regionId: string;
  /**
   * 区域名
   * isNullAble:0
   */
  regionName: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state: string;
  /**
   * 是否删除：0否 1 是
   */
  isDeleted: string;
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
}
// ⬆️ 查询列表（分页）响应体
