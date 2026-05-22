import type { VNode } from 'vue';
import type { LabelListItem } from '@/core/plugins/filter';

import type Table from './packages/table.vue';
import { FormItemRule } from 'element-plus';

type IStyleObj = Record<string, any>;

type TStyle = string | IStyleObj;

export interface Pagination {
  pageNum: number;
  pageSize: number;
}

export type TableInstanceRef = InstanceType<typeof Table>;

export interface IImageConfig {
  /**
   * 显示的图片数量（数组的情况），默认是1
   */
  showNum?: number;
  /**
   * 显示key，默认是 url
   */
  propKey?: string;
  /**
   * 样式
   */
  style?: TStyle | TStyle[];
  /**
   * 其他对应  的配制，这里就不说明了
   * @see https://element-plus.gitee.io/#/zh-CN/component/image
   */
  [k: string]: any;
}

interface IRenderData<T = any> {
  row: T;
  index: number;
  // eslint-disable-next-line no-use-before-define
  column: IColumnProp;
}

export interface TRender <T = any> {
  (scoped: IRenderData<T>): JSX.Element | VNode | null | string | number;
}

export interface IColumnProp<T = any, U = any> {
  /**
   * 是否显示该column
   *
   * 注意：必须要有prop
   */
  hidden?: boolean;
  selectable?: (row: T, index: number) => boolean;
  render?: TRender<T>;
  /**
   * header slot
   */
  headerRender?: TRender<T>;
  /**
   * 该字段要是不用设置其他的参数，可参考下面的说明:
   * 假如字段是 string，则为true即可
   * 假如字段是 string[]，那么设置 { showNum: number }，要是只显示一张也是为true即可
   * 假如是对象数组，那么设置{ propKey: string }, showNum看情况，默认 1；若对象中，图片的key为url，那也可以不设置 propKey
   */
  imageConfig?: boolean | IImageConfig;
  /**
   * 需要根据枚举列表显示
   */
  enum?: LabelListItem<U>[];
  /**
   * 是否是时间
   */
  isTime?: boolean | string;
  /**
   * slot的key
   * 在 Column 中，解析优先级次于render
   */
  slotKey?: string;
  children?: IColumnProp[];
  // 下面是 el-table-column props，其他有需要再补充
  label?: string;
  prop?: keyof T extends infer E ? E extends string ? E : string : string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: string | boolean;
  type?: 'index' | 'selection' | 'expand';
  reserveSelection?: boolean;

  /**
   * type = index，并且存在 pagination.pageNum、pagination.pageSize 时可用
   * 表示在分页时，index 会根据前面而累计
   */
  accumulation?: boolean;
  [k: string]: any;
  rules?: FormItemRule | FormItemRule[];
}
