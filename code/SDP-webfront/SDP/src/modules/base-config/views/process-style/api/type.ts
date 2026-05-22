/**
 * 分页对象
 */
export interface IStyleTemplatePageReq {
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 款式名称
   */
  styleName?: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state?: number;
  /**
   * 创建开始时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createStartTime?: string;
  /**
   * 创建结束时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createEndTime?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
}

/**
 * 响应数据
 */
export interface IStyleTemplatePageRes {
  /**
   * 当前页码, 主要给 web 端做分页校验
   */
  page: number;
  /**
   * 总数据量
   */
  total: number;
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
  isDeleted?: string;
  /**
   * 创建人id
   */
  creatorId?: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 创建时间
   */
  createdTime: string | number;
}

/**
 * 启用、停用请求参数
 */
export interface IStyleTemplateSwitchStateReq {
  /**
   * 款式id必传
   */
  processStyleTemplateIds: string[];
  /**
   * 状态（1-启用，0-停用）
   */
  state: number;
}

/**
 * 尺寸表模板操作日志数据结构
 */
export interface ISizeTemplatePageLogListItem {
  /**
   * 日志id
   */
  id: string;
  /**
   * 业务id(选中的业务)
   */
  buzId: string;
  /**
   * 业务类型
   */
  buzType: string;
  /**
   * 操作说明
   */
  content: string;
  /**
   * 创建时间
   */
  createdTime: string;
  /**
   * 创建人id
   */
  creatorId: string;
  /**
   * 创建人名称
   */
  creatorName: string;
  /**
   * 是否删除 0 否  1 是
   */
  isDeleted: string;
}

/**
 * 新建
 */
export interface IStyleTemplateCreateReq {
  /**
   * 款式id
   */
  processStyleTemplateId?: string;
  /**
   * 款式名称
   * isNullAble:0
   */
  styleName?: string;
  /**
   * 区域id
   * isNullAble:0
   */
  regionId: string;
  /**
   * 区域名
   * isNullAble:0
   */
  regionName?: string;
  /**
   * 引用的款式名称模板id
   * isNullAble:1
   */
  referenceId?: string;
  /**
   * 引用的款式名称名称
   * isNullAble:1
   */
  referenceName?: string;
  /**
   * 车缝信息
   */
  processStyleSewings?: IStyleTemplateCreateReqProcessStyleSwingsItem[];
  /**
   * 其他部件信息
   */
  processStyleAnotherProcess?: IStyleTemplateCreateReqProcessStyleAnotherProcessItem[];
}
export interface IStyleTemplateCreateReqProcessStyleSwingsItem {
  /**
   * 金额
   */
  amount?: string;
  /**
   *  分钟工资
   */
  minutelyPay?: string;
  // 工序环节
  processStepCode?: string;
  // 工序环节名称
  processStepName?: string;
  /**
   * 车缝工序id
   */
  sewingProcessId?: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName?: string;
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
  picture?: string;
  /**
   * 工序描述
   */
  processDescribe?: string;
  /**
   * 预计用时
   */
  estimatedTime?: number | string;
  /**
   * 备注
   */
  remark?: string;
}
export interface IStyleTemplateCreateReqProcessStyleAnotherProcessItem {
  /**
   * 工序id
   */
  anotherProcessId?: string;
  /**
   * 工序环节编号
   * isNullAble:0
   */
  processStepCode?: string;
  /**
   * 工序环节名称
   * isNullAble:0
   */
  processStepName?: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe?: string;
  /**
   * 用量
   * isNullAble:1
   */
  dosage?: number | string;
  /**
   * 单位
   * isNullAble:1
   */
  unit?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 单价
   */
  price?: number | string;
}

/**
 * 按工序名搜索工序款式传参
 */
export interface IStyleTemplateInfoByNameReq {
  name: string;
}

/**
 * 响应数据
 */
export interface IStyleTemplateInfoByNameRes {
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
}

/**
 * 搜素工序部件库分页传参
 */
export interface ISewingComponentTemplatePageReq {
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 工序名称
   */
  processName?: string;
  /**
   * parentType
   */
  parentType?: number;
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
}

/**
 * 响应体
 */
export interface ISewingComponentTemplatePageRes {
  page: number;
  total: number;
  list: ISewingComponentTemplateItem[];
}

export interface ISewingComponentTemplateItem {
  /**
   * 车缝工序id
   */
  sewingProcessId: string;
  /**
   * 车缝工序部件名称
   */
  componentName: string;
  /**
   * 工序名称
   */
  processName: string;
  /**
   * 车种编码
   */
  plmSewingType: string;
  /**
   * 车种名称
   */
  plmSewingName: string;
  /**
   * 图片
   */
  picture: string;
  /**
   * 工序描述
   */
  processDescribe: string;
  /**
   * 预计用时
   */
  estimatedTime: number;
  /**
   * 金额
   */
  amount?: string;
  /**
    * 分钟工资
    */
  minutelyPay?: string;
  /**
   * 备注
   */
  remark: string;
}
/**
 * 明细响应数据
 */
export interface IStyleTemplateDetailRes {
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
  // 工序环节
  processStepCode?: string;
  // 工序环节名称
  processStepName?: string;
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
  estimatedTime: number;
  // 分钟工资
  minutelyPay: string;
  // 金额
  amount: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 款式库引用时独有的字段，对应引用时候的的sewingProcessId
   */
  referenceSewingProcessId: string;
}
export interface IStyleTemplateDetailResProcessStyleAnotherProcessItem {
  /**
   * 其他工序id
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
  dosage: number;
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
  price: number;
}
/**
 * 分页对象
 */
export interface ISewingComponentTemplatePageOptionsReq {
  /**
   * 区域id
   */
  regionId?: string;
  /**
   * 车缝工序部件名称
   */
  componentName?: string;
  /**
   * 状态（1-启用，0-停用）
   * isNullAble:0
   */
  state?: number;
  /**
   * 创建开始时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createStartTime?: string;
  /**
   * 创建结束时间 格式：yyyy-MM-dd HH:mm:ss
   */
  createEndTime?: string;
  /**
   * 当前查询的页码
   */
  pageNum?: number;
  /**
   * 当前查询单页的数据量
   */
  pageSize?: number;
}

/**
 * 响应数据
 */
export interface ISewingComponentTemplateOptionsPageRes {
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
  list: ISewingComponentTemplatePageResListItem[];
}
export interface ISewingComponentTemplatePageResListItem {
  /**
   * 主键
   * 车缝工序部件模板ID
   */
  sewingComponentTemplateId: string;
  /**
   * 车缝工序部件名称
   */
  componentName: string;
  /**
   * 区域id
   */
  regionId: string;
  /**
   * 区域名
   */
  regionName: string;
  /**
   * 状态（1-启用，0-停用）
   */
  state: string;
  /**
   * 修改人名称
   */
  reviserName: string;
  /**
   * 更新时间
   */
  revisedTime: string;
  /**
   * 创建时间
   */
  createdTime: string;
}
