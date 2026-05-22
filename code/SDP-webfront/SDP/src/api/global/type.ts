import { DIALOG_STATE_ENUM, RULE_TYPE_ENUM } from '@/constant';

// 获取客户信息
export interface IGetCustomerInfo {
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 客户编码
   */
  customerCode?: string;
  /**
   * 客户全称
   */
  customerName?: string;
  /**
   * 注册地址
   */
  registrationAddress?: string;
  /**
   * 注册地址-省份
   */
  registrationProvince?: string;
  /**
   * 注册地址-城市
   */
  registrationCity?: string;
  /**
   * 注册地址-区/县
   */
  registrationRegion?: string;
  /**
   * 客户状态
   */
  customerState?: string;
  /**
   * 客户状态名称
   */
  customerStateName?: string;
  /**
   * 客户线索id
   */
  trackId?: string;
  /**
   * 创建人名称
   */
  creatorName?: string;
  /**
   * 创建时间
   */
  createdTime?: number;
  /**
   * 是否启用，1--启用，0--禁用
   */
  enable?: string;
  /**
   * 联系人信息
   */
  contacts: WebInfoResContactsItem[];
  /**
   * 资料文件
   */
  files: WebInfoResFilesItem[];
  /**
   * 资料文件
   */
  models: WebInfoResModelsItem[];
  /**
   * 员工信息
   */
  employees: WebInfoResEmployeesItem[];
}

export interface WebInfoResModelsItem {
  /**
   * 模特尺码id
   */
  modelSizeId?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 尺码名称
   */
  sizeName?: string;
  /**
   * 尺码编号
   */
  sizeCode?: string;
  /**
   * 尺码值
   */
  sizeValues: WebInfoResModelsItemSizeValuesItem[];
  /**
   * 部位列表
   */
  parts: WebInfoResModelsItemPartsItem[];
}

export interface WebInfoResModelsItemPartsItem {
  /**
   * 模特部位id
   */
  modelPartsId?: string;
  /**
   * 模特尺码id
   */
  modelSizeId?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 部位名称
   */
  partsName?: string;
  /**
   * 尺寸维度
   */
  dimensions?: string;
  /**
   * 量法
   */
  measurementMethod?: string;
  /**
   * 部位值
   */
  partsValues: WebInfoResModelsItemPartsItemPartsValuesItem[];
}

export interface WebInfoResModelsItemPartsItemPartsValuesItem {
  /**
   * key
   */
  key: string;
  /**
   * 值
   */
  value: string;
  /**
   * 名
   */
  name: string;
}

export interface WebInfoResModelsItemSizeValuesItem {
  /**
   * key
   */
  key: string;
  /**
   * 值
   */
  val: string;
}

export interface WebInfoResEmployeesItem {
  /**
   * 用户名称
   */
  username: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 状态:1-启用 0-停用
   */
  status?: string;
  /**
   * 用户编码
   */
  userCode?: string;
  /**
   * 角色
   */
  roles: WebInfoResEmployeesItemRolesItem[];
}

export interface WebInfoResEmployeesItemRolesItem {
  /**
   * key
   */
  key: string;
  /**
   * 值
   */
  val: string;
}

export interface WebInfoResFilesItem {
  /**
   * 上传的文件名
   */
  fileName: string;
  /**
   * 文件格式
   */
  fileFormat: string;
  /**
   * 文件类型
   */
  fileType?: string;
  /**
   * 文件url
   */
  fileUrl: string;
  /**
   * 文件主键ID
   */
  fileId?: string;
  /**
   * 客户id
   */
  customerId?: string;
}

export interface WebInfoResContactsItem {
  /**
   * 联系人id
   */
  contactId?: string;
  /**
   * 客户id
   */
  customerId?: string;
  /**
   * 联系人名字
   */
  contactName?: string;
  /**
   * 职务
   */
  position?: string;
  /**
   * 电话
   */
  phone?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 微信
   */
  wechat?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否启用，1--启用，0--禁用
   */
  enable?: string;
}

export type IGetNoticeDialogListRes = {
  configId: string;
  /** 状态 */
  state: DIALOG_STATE_ENUM;
  /** 标题 */
  title: string;
  /** 优先级，优先级，1,2,3 */
  priority: '1' | '2' | '3';
  /** 重复规则，1：仅一次，2：重复 */
  ruleType: RULE_TYPE_ENUM;
  /** 重复时间间隔，单位：天 */
  ruleTimeInterval: string;
  /** 内部说明 */
  instructions: string;
  /** 展示路径 */
  triggerPath: string;
  /** 弹框内容 */
  content: string;
  /** 曝光次数 */
  exposureTimes: string;
  /** 有效期 */
  expirationDate: string;
  /** 创建人名称 */
  creatorName: string;
  /** 创建时间 */
  createdTime: string;
  /** 修改人名称 */
  reviserName: string;
  /** 更新时间 */
  revisedTime: string;
}[];
