/**
 * 分页对象
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
export interface ISewingComponentTemplatePageRes {
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
  createdTime: string | number;
}

/**
 * 启用、停用传参
 */
export interface ISwitchStateOpenReq {
  sewingComponentTemplateIds: string[];
}
export interface ISewingComponentTemplateCreateReq {
  /**
   * 工序部件id
   */
  sewingComponentTemplateId?: string;
  /**
   * 车缝工序部件名称
   * isNullAble:0
   */
  componentName?: string;
  /**
   * 区域id
   * isNullAble:0
   */
  regionId?: string;
  /**
   * 区域名
   * isNullAble:0
   */
  regionName?: string;
  /**
   * 引用的车缝工序部件模板id
   * isNullAble:1
   */
  referenceId?: string;
  /**
   * 引用的车缝工序部件名称
   * isNullAble:1
   */
  referenceName?: string;
  /**
   * 车缝工序列表
   */
  sewingProcessList: ISewingComponentTemplateCreateReqSewingProcessListItem[];
}

export interface ISewingComponentTemplateCreateReqSewingProcessListItem {
  /**
   * 金额
   */
  amount?: string;
  /**
   *  分钟工资
   */
  minutelyPay?: string;
  /**
   * 工序id
   */
  sewingProcessId?: string;
  /**
   * 工序名称
   * isNullAble:0
   */
  processName?: string;
  /**
   * 车种编码
   * isNullAble:0
   */
  plmSewingType?: string;
  /**
   * 车种名称
   * isNullAble:0
   */
  plmSewingName?: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture?: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe?: string;
  /**
   * 预计用时
   * isNullAble:0
   */
  estimatedTime?: number | string;
  /**
   * 备注
   * isNullAble:1
   */
  remark?: string;
}

/**
 * 详情响应数据
 */
export interface ISewingComponentTemplateDetailRes {
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
   * 车缝工序列表
   */
  sewingProcessList: ISewingComponentTemplateDetailResSewingProcessListItem[];
}
export interface ISewingComponentTemplateDetailResSewingProcessListItem {
  /**
   * 主键
   * 车缝工序ID
   * isNullAble:0
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
   * isNullAble:0
   */
  plmSewingName: string;
  /**
   * 图片
   * isNullAble:1
   */
  picture: string;
  /**
   * 工序描述
   * isNullAble:0
   */
  processDescribe: string;
  /**
   * 预计用时
   * isNullAble:0
   */
  estimatedTime: number;
  // 分钟工资
  minutelyPay: string;
  // 金额
  amount: string;
  /**
   * 备注
   * isNullAble:1
   */
  remark: string;
  /**
   * 父级ID
   * isNullAble:0
   */
  parentId: string;
  /**
   * 父级类型：0:sewing_component_template_id,1:process_style_template_id
   * isNullAble:1,defaultVal:0
   */
  parentType: string;
}
