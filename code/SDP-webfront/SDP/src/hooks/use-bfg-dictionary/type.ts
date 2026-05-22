export interface IDictValuesReq {
  /** 内部字典传 `1000`  */
  dictType?: string;
  /**
   * 是否启用：{0-否 ,1-是}
   */
  enable?: string;
  /**
   * 字典编号集合
   */
  dictCodes: string[];
  /**
   * 升序的
   */
  ascending?: boolean;
}
/**
 * 客户字典值 - 批量查询
 * yapi地址：https://yapi.tiangong.site/project/447/interface/api/24593
 */
export interface ICustomerValuesReq extends IDictValuesReq {
  /**
   * 客户id
   */
  customerId: string;
  /**
   * 升序的
   */
  ascending?: boolean;
}

export type IValuesRes = IDictResItem[];
export interface IDictResItem {
  /**
   * 字典Id
   */
  dictId?: string;
  /**
   * 字典编号
   */
  dictCode?: string;
  /**
   * 字典名称
   */
  dictName?: string;
  /**
   * 字典值
   */
  values: IValuesResItemValuesItem[];
}

export interface IValuesResItemValuesItem {
  /**
   * 字典值id
   */
  valueId?: string;
  /**
   * 字典值编号
   */
  valueCode?: string;
  /**
   * 字典值父编号
   */
  valueParentCode?: string;
  /**
   * 字典值
   */
  dictValue?: string;
  /**
   * 扩展值1
   */
  extValue1?: string;
  /**
   * 扩展值2
   */
  extValue2?: string;
  /**
   * 扩展值3
   */
  extValue3?: string;
  /**
   * 扩展值4
   */
  extValue4?: string;
  /**
   * 扩展值5
   */
  extValue5?: string;
  /**
   * 扩展值6
   */
  extValue6?: string;
  /**
   * 排序
   */
  valueSort?: string;
  /**
   * 是否启用：{0-否 ,1-是},默认1
   */
  enable?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 层级
   */
  level?: number;
  /*
  * 子字典值
  *  */
  children?: IValuesResItemValuesItem[];
  /*
  * 是否禁用
  *  */
  disabled?: boolean;
  /**
   * 字典值
   */
  label: string;
  /**
   * 字典值编号
   */
  value: string;
}

export interface IDictValueMapData {
  [key: string]: IValuesResItemValuesItem[];
}

export interface ITaskQueue {
  system: Map<string, Array<(val: IValuesResItemValuesItem[]) => void>>;
  [key: string]: Map<string, Array<(val: IValuesResItemValuesItem[]) => void>>;
}
