import { ColProps, ElInput, ElSelect } from 'element-plus';

interface IKeyListConfig {
  labelName: string;
  valueName: string;
}

export type IConfigItem<T extends object = any> = {
  [key in keyof typeof ElInput]?: typeof ElInput[key];
} & {
  [key in keyof typeof ElSelect]?: typeof ElSelect[key];
} & {
  name: string;
  component?: 'input' | 'select' | 'datePicker' | 'keySelect' | 'inputNumber';
  // 日期组件需要传2个value: ['startTime', 'endTime]
  valueName?: keyof T | Array<keyof T>;
  // 日期组件需要传2个placeholder
  placeholder?: string | string[];
  // 下拉组件options
  options?: {
    [key: string]: any;
  }[];

  // 下拉组件options的label的name
  optionLabel?: string;
  // 下拉组件options的value的name
  optionValue?: string;
  // 插槽命名
  slotName?: string;
  // 日期组件不可用日期
  disabledDate?: (time: Date) => boolean;
  // 左侧为下拉框右侧为输入框的组件的左侧下拉框数据的列表
  keyList?: {
    [key: string]: IKeyListConfig['valueName'];
  }[];

  // 左侧为下拉框右侧为输入框的组件的左侧下拉框数据的列表的配置
  keyListConfig?: IKeyListConfig;
  // 是否可清空
  clearable?: boolean;
  // 日期格式，默认为 YYYY-MM-DD HH:mm:ss
  valueFormat?: string;
  // 日期组件-默认时间
  defaultTime?: string[];
  // 是否不展示 默认展示
  isHiden?: boolean;
  cols?: Partial<ColProps>;
};
