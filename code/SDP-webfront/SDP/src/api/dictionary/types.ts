import { YES_NO_ENUM, YES_NO_NUMBER_ENUM } from '@/constant';
import { DICTIONARY_STATUS_ENUM } from '@/constant/dictionary';

export interface IDictItem {
  dictNum: string;
  dictName: string;
}

// 获取字典值 - 批量 出参
export interface IDictValuesItem {
  /**
   * 字典值父编号
   */
  valueParentCode: string;
  /**
   * 字典值编号
   */
  valueCode: string;
  /**
   * 来源方 : (open_sender : 公开的来源方)
   */
  senderCode: string;
  /**
   * 字典值
   */
  value: string;
  /**
   * 是否启用
   */
  isEnable: DICTIONARY_STATUS_ENUM;
  children?: IDictValuesItem[];
}
export type IGetDictValueBatchListResItem = {
  /**
   * 字典id
   */
  id: string;
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 字典编号
   */
  dictCode: string;
  /**
   * 排序值
   */
  sorted: string;
  /**
   * 是否启用
   *
   * 0 禁用  1启用
   */
  state: YES_NO_NUMBER_ENUM;
  /**
   * 标签
   */
  labels: string[];
  /**
   * 属性
   */
  attributes: {
    code: string;
    id: string;
    name: string;
    remark: string;
  }[];
  /**
   * 子菜单
   */
  children: IGetDictValueBatchListResItem[];
};

export type IGetDictValueBatchListRes = IGetDictValueBatchListResItem[];

// ⬇️ 字典 - 根据条件参数查询响应体 接口：https://yapi.tiangong.site/project/35/interface/api/2546
export type IDictDictListItem = {
  /**
   * 字典id
   */
  id: string;
  /**
   * 字典名称
   */
  dictName: string;
  /**
   * 字典编号
   */
  dictCode: string;
  /**
   * 排序值
   */
  sorted: string;
  /**
   * 是否启用
   *
   * 0 禁用  1启用
   */
  state: string;
  /**
   * 标签
   */
  labels: Record<string, unknown>[];
  /**
   * 属性
   */
  attributes: Record<string, unknown>[];
  /**
   * 子菜单
   */
  children: IDictDictListItem[];
};
