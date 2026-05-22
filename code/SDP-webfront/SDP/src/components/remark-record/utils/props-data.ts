import { filters } from '@/core/plugins/filter';
import type { TriggerEvent, CreateApi, HandleParams, HandleCreate } from '../types';
import type { PropType } from 'vue';

export const defaultPropsValue = Object.freeze({
  triggerEvent: 'hover',
  modelValue: [],
  width: 320,
  nameKey: 'name',
  timeKey: 'time',
  descKey: 'desc',
  maxlength: 100,
  timeFormatter: filters.formatTime,
  row: null,
  handleParams: null,
  handleCreate: null,
  inputDisabled: false,
  CreateApi: null,
  disabled: false,
});

export default {
  modelValue: {
    type: [Array, String] as PropType<Record<string, string>[] | string>,
    default: () => [],
  },
  triggerEvent: {
    type: String as PropType<TriggerEvent>,
    default: 'hover',
  },
  // 弹框宽度
  width: {
    type: [String, Number] as PropType<string | number>,
    // eg:  string: '320px'  number: 320
    default: 320,
  },
  nameKey: {
    type: String as PropType<string>,
    default: 'name',
  },
  timeKey: {
    type: String as PropType<string>,
    default: 'time',
  },
  descKey: {
    type: String as PropType<string>,
    default: 'desc',
  },
  // 最大输入长度
  maxlength: {
    type: [String, Number] as PropType<string | number>,
    default: 100,
  },
  timeFormatter: {
    type: Function as PropType<(timeValue: string | number) => string>,
    default: filters.formatTime,
  },
  /* 当前表格 row 对象 */
  row: {
    type: Object,
    default: null,
  },
  /* 添加备注 api */
  createApi: {
    type: Function as PropType<CreateApi>,
    default: null,
  },
  /* 添加备注 api 请求前参数处理 */
  handleParams: {
    type: Function as PropType<HandleParams>,
    default: null,
  },
  inputDisabled: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /**
   * 自定义处理 提交备注 方法
   * 若 return false 则不会关闭弹窗
   */
  handleCreate: {
    type: Function as PropType<HandleCreate>,
    default: null,
  },
};
