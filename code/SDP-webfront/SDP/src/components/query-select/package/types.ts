export interface IOptionsItem {
  value: string;
  label: string;
  disabled?: boolean;
  row: any;
}

export interface IRequestConfig {
  /** label对应的key */
  labelKey?: string;
  /** value对应的key */
  valueKey?: string;
  /** keyword对应的查询条件的key */
  keywordQueryKey?: string;
  /** modelValue对应的查询条件的key */
  valueQueryKey?: string;
  /** 解析列表的key */
  dataKey?: string;
  /** 单次查询数据条数 */
  pageSize?: number;
  /** 编码对应的key */
  codeKey?: string;
  /** 是否展示编码值 */
  showCode?: boolean;
}
