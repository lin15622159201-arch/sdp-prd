import type { Ref, ComputedRef } from 'vue';

export interface LabelListItem<T = string> {
  value: T;
  label: string;
}
export type CustomObj<T = any> = Record<string, T>;

export type Format = 'name-code' | 'name-mobile' | 'time' | 'enum' | 'date'; // 使用内置转换
export interface MapValueObj {
  label: string;
  formatter?: (...arg: any[]) => any;
  type?: Format;
  code?: string;
  mobile?: string;
  enum?: LabelListItem[];
}

export type KeyMap = CustomObj<string | MapValueObj>;

export interface Desc {
  label: string;
  key: string; // 来源数据的key
  text: string | boolean | number | null; // 基础类型
  value: CustomObj; // 引用类型
}

export interface Ioption {
  data: Ref<CustomObj>; // 对象信息
  keyMap: CustomObj<string>; // 需要呈现的（key : 中文）
}

export interface DescRes {
  descList: ComputedRef<Desc[]>; // 描述列表
}
