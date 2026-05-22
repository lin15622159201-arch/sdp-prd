/* eslint-disable no-restricted-syntax */
/* eslint-disable no-labels */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
import type { Ref, ComponentInternalInstance } from 'vue';
import { ref, markRaw } from 'vue';
import type { IElCol } from '@/types';
import type { FuzzyRes } from '../hooks/use-fuzzy/index';
import type { ElForm } from 'element-plus';
import type { UseFormatState, Format } from '@/components/custom-form/hooks/use-uploader-format/types';
import type { CustomObj } from './types';
import * as _ from 'lodash-es';
import type { IdictValuesItem } from '@/api/dict/types';
import type { IdictValuesItemNode } from '../hooks/use-dict/utils';

export interface Rule extends CustomObj {
  required?: boolean;
  message?: string;
  trigger?: 'blur' | 'change' | string;
  validator?: (rule: any, value: any, callback: (res?: any) => any) => void;
}

/* cascader Tree 兼容ops格式 */
export interface CascaderNode extends CustomObj {
  value?: string; // 中文值
  valueCode?: string; // code
  children?: CascaderNode[];
}
export type CascaderTree = CascaderNode[];

/*
  kebab-case
  参考element控件名称
*/
export type FormItemType =
  '' | 'text' | 'number'
  | 'input' | 'select' | 'switch' | 'textarea' // el-基础控件
  | 'date' | 'datetime' | 'daterange'
  | 'time-picker' | 'timerange'
  | 'datetimerange'
  | 'checkbox-group' | 'radio-group'
  | 'address' // 业务控件
  | 'uploader'
  | 'uploader-file'
  | 'number-dict' | 'number-range' | 'number-range-free'
  | 'cascader'
  | 'number-range-dict'
  | 'radio-checkbox';

export const formItemTypeArray = [
  'text', 'number',
  'input', 'select', 'switch', 'textarea',
  'date', 'datetime', 'daterange',
  'time-picker', 'timerange',
  'datetimerange',
  'checkbox-group', 'radio-group',
  'address',
  'uploader',
  'uploader-file',
  'number-dict', 'number-range', 'number-range-free',
  'cascader',
  'number-range-dict',
  'radio-checkbox',
];

export interface Option extends CustomObj {
  label: string; // 中文
  value: any; // 选中值
}
/* 表单 栅格区 */
export interface FormScope {
  key?: string; // 名称
  show?: boolean | Ref<boolean>;
  width?: string; // 100%  100px
  col?: Partial<IElCol>;
  items: FormItem[];
}

/* 表单 item */
export interface FormItem extends CustomObj {
  slot?: string;
  key: string;
  label?: string;
  labelWidth?: string | number; // 若为 0 则不体现 label
  required?: boolean;
  rules?: Rule | Rule[] | boolean;
  type?: FormItemType;
  props?: {
    placeholder?: string;
    multiple?: boolean;
  } & CustomObj;
  option?: Option[];
  radio?: Option[];
  checkbox?: Option[];
  tree?: Ref<CascaderTree>; // 级联数据
  cascaderLayer?: number; // 级联数据层级
  // 组件功能
  stay?: boolean; // 停留（不受折叠影响）
  // 字典code (优先级高于本地传入的 option、radio、checkbox)
  dictCode?: string;
  // 模糊搜索hook返回
  fuzzy?: FuzzyRes;
  // 上传组件hook返回
  upload?: UseFormatState;
  uploadOutputFormat?: Format; // 上传组件提交输出格式
  // 事件
  change?: (
    value: any, // 当前值
    form: CustomFormClass, // CustomFormClass 实例
    item?: FormItem, // form-item 对象
    FormScope?: FormScope,
  ) => void;
  enter?: (
    value: any, // 当前值
    form: CustomFormClass, // CustomFormClass 实例
    item?: FormItem, // form-item 对象
    FormScope?: FormScope,
  ) => void;
  focus?: (
    value: any, // 当前值
    form: CustomFormClass, // CustomFormClass 实例
    item?: FormItem, // form-item 对象
    FormScope?: FormScope,
  ) => void;
  clear?: (
    value: any, // 当前值
    form: CustomFormClass, // CustomFormClass 实例
    item?: FormItem, // form-item 对象
    FormScope?: FormScope,
  ) => void;
  // 个性模板-自定义参数
  customParams?: CustomObj & {
    province?: string;
    city?: string;
    area?: string;
    initChange?: boolean; // 初始化 执行1次 change
    labelKey?: string; // 字典数据 label Key (default: value)
    valueKey?: string; // 字典数据 value Key (default: value)
    dictValueFormat?: (dict: IdictValuesItem) => string; // 字典选项值 格式化
    cascaderFormat?: (node: IdictValuesItemNode[]) => IdictValuesItemNode[]; // cascader 级联 tree 格式化
    paper?: string; // 查看提示按钮文案
    tooltip?: string;// tooltip 提示内容
    warning?: string; // 警告文案
  };
  remoteOption?: () => Promise<Option[]>; // select 远程 option
}

export type FormUI = FormScope[];
/* el 表单类 */
export interface ElformOption {
  model: CustomObj; // form 数据对象
  UI: FormScope[]; // form 视图对象
  change?: (prop: string, value: any) => void; // form值改变
}

// custom-form 组件方法
export interface CustomFormMethods {
  validate: () => Promise<boolean>;
  submitForm: (temporary?: boolean) => Promise<CustomObj>;
  resetForm: () => void;
}

export interface FormAPI {
  checkValidate: () => Promise<boolean | Error>;
  submit: (temporary?: boolean) => Promise<CustomObj | Error>;
  reset: () => Promise<boolean | Error>;
}

export type CustomFormVM =
  ComponentInternalInstance
  & CustomFormMethods
  & {
    components?: CustomObj<ComponentInternalInstance>;
  }
  & CustomObj;

export type FormVm = Partial<CustomFormVM> | Element | null;

export type FormContextKey = 'form-context';
export interface FormContext {
  form: CustomFormClass; // CustomFormClass 实例
  dictList: Ref<CustomObj>; // 字典集合
  vm: FormVm; // custom-form 组件实例
  ElementFormRef: Ref<InstanceType<typeof ElForm> | null>; // el-form 组件实例
  model: CustomObj; // form 数据对象
  UI: Ref<FormScope[]>; // form 视图对象
}
export const formContextDefault = {
  form: {} as CustomFormClass,
  dictList: ref(),
  vm: {} as FormVm,
  ElementFormRef: ref(),
  model: {},
  UI: ref([]),
};

/*
  custom-form 表单类
*/
export default class CustomFormClass implements FormAPI {
  vm: FormVm; // custom-form 组件实例

  model: CustomObj; // 数据对象

  UI: Ref<FormScope[]>; // 视图对象

  [propName: string]: any;

  public get _ctx(): FormVm {
    if (this.vm) return this.vm;
    throw new Error(CustomFormClass.unbounded);
  }

  private static readonly unbounded = 'Component <custom-form/> need prop: "form", by CustomFormClass instance provide';

  public constructor(options: ElformOption) {
    const {
      model,
      UI,
      change,
    } = options;
    this.vm = null;
    this.UI = ref(UI) as Ref<FormScope[]>;
    this.model_ = ref(model); // 原始 model
    this.model = this.proxy();// 代理 model
    this.error = ref(false);
    this.disabled = ref(undefined);
    this.change = change?.bind(this) || null;
    markRaw(this);

    console.warn('custom-form 已不再维护，请停止使用!!!');
  }

  proxy() {
    return new Proxy(
      Object.defineProperty({}, '_proxy_model', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: true,
      }),
      {
        get: (target, prop) => {
          return _.get(this.model_.value, prop);
        },
        set: (target, prop, value) => {
          _.set(this.model_.value, prop, value);
          this.change && this.change(prop, value);
          return true;
        },
      },
    );
  }

  private logWarn(e: Error | string | any) {
    console.warn(e?.message || e);
  }

  /**
   * 获取 form-scope 表单栅格区
   * @param key
   * @returns
   */
  public async getScope(key: string): Promise<FormScope> {
    const scope: FormScope | undefined = this.UI.value.find(item => item.key === key);
    if (scope) return Promise.resolve(scope);
    return Promise.reject(null);
  }

  /**
   * 获取 form-scope 表单栅格区数组
   * @param keys
   * @returns
   */
  public async getScopesByKey(keys: string[]): Promise<FormScope[]> {
    const scopes: FormScope[] = this.UI.value.filter(scope => keys.includes(scope.key as string));
    return Promise.resolve(scopes);
  }

  /**
   * 获取 form-item 对象
   * @param key
   * @returns
   */
  public async getItem(key: string): Promise<FormItem> {
    let item: FormItem | null = null;
    formScopeLoop:
    for (const scope of this.UI.value) {
      for (const it of scope.items) {
        if (it.key === key) {
          item = it;
          break formScopeLoop;
        }
      }
    }
    if (item) return Promise.resolve(item);
    return Promise.reject(null);
  }

  /**
   * 获取 form-item 对象
   * @param id
   * @returns
   */
  public async getItemById(id: string): Promise<FormItem> {
    let item: FormItem | null = null;
    formScopeLoop:
    for (const scope of this.UI.value) {
      for (const it of scope.items) {
        if (it.id === id) {
          item = it;
          break formScopeLoop;
        }
      }
    }
    if (item) return Promise.resolve(item);
    return Promise.reject(null);
  }

  /**
   * 根据 key 获取 form-item 数组
   * @param key
   * @returns
   */
  public async getItemsByKey(keys: string | string[]): Promise<FormItem[]> {
    const items: FormItem[] = this.UI.value.reduce((resArr, scope) => {
      const list = typeof keys === 'string' ? [keys] : keys;
      const targets = scope.items.filter(it => list.includes(it.key));
      return resArr.concat(targets);
    }, [] as FormItem[]);
    return Promise.resolve(items);
  }

  /**
   * 根据 type 获取 form-item 数组
   * @param type
   * @returns
   */
  public async getItemsByType(types: string | string[]): Promise<FormItem[]> {
    const items: FormItem[] = this.UI.value.reduce((resArr, scope) => {
      const list = typeof types === 'string' ? [types] : types;
      const targets = scope.items.filter(it => list.includes(it.type as string));
      return resArr.concat(targets);
    }, [] as FormItem[]);
    return Promise.resolve(items);
  }

  /**
   * 根据 keys 设置 scopes 隐藏
   * @param keys { 若是 boolean 则设置全部}
   * @param isShow
   */
  public async setScopesShowByKey(keys: string | string[] | boolean, isShow?: boolean) {
    if (typeof keys === 'boolean') {
      for (const scope of this.UI.value) {
        scope.show = keys;
      }
      return;
    }
    const scopes = await this.getScopesByKey(typeof keys === 'string' ? [keys] : keys);
    scopes.forEach((scope) => { scope.show = isShow; });
  }

  /**
   * 根据 keys 设置 items 隐藏
   * @param keys { 若是 boolean 则设置全部}
   * @param isShow
   */
  public async setItemsShowByKey(keys: string | string[] | boolean, isShow?: boolean) {
    if (typeof keys === 'boolean') {
      for (const scope of this.UI.value) {
        for (const it of scope.items) {
          it.show = keys;
        }
      }
      return;
    }
    const items = await this.getItemsByKey(typeof keys === 'string' ? [keys] : keys);
    items.forEach((item) => { item.show = isShow; });
  }

  public async checkValidate() {
    try {
      await (this._ctx as CustomFormVM).validate();
      this.error.value = false;
      // eslint-disable-next-line @typescript-eslint/return-await
      return Promise.resolve(true);
    } catch (e) {
      this.error.value = true;
      return Promise.reject(e);
    }
  }

  public async submit(temporary = false) {
    try {
      const data = await (this._ctx as CustomFormVM).submitForm(temporary);
      this.error.value = false;
      // eslint-disable-next-line @typescript-eslint/return-await
      return Promise.resolve(data);
    } catch (e) {
      this.error.value = true;
      this.logWarn(e);
      return Promise.reject(e);
    }
  }

  public async reset() {
    try {
      (this._ctx as CustomFormVM).resetForm();
      this.error.value = false;
      // eslint-disable-next-line @typescript-eslint/return-await
      return Promise.resolve(true);
    } catch (e) {
      this.logWarn(e);
      return Promise.reject(e);
    }
  }
}
