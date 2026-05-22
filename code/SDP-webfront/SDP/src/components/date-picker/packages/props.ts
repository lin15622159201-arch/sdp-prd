import type { PropType } from 'vue';

export const isValidComponentSize = (val: string) => ['', 'large', 'medium', 'small', 'mini'].includes(val);

export const defaultProps = {
  name: {
    type: [Array, String],
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
  format: {
    type: String,
  },
  valueFormat: {
    type: String as PropType<string>,
    default: 'YYYY-MM-DD HH:mm:ss',
  },
  type: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: String,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<'' | 'large' | 'medium' | 'small' | 'mini'>,
    validator: isValidComponentSize,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  // popperOptions: {
  //   type: Object as PropType<Options>,
  //   default: () => ({}),
  // },
  modelValue: {
    type: [Date, Array, String, Number] as PropType<string | number | Date | Date[]>,
    default: '',
  },
  rangeSeparator: {
    type: String,
    default: '至',
  },
  startPlaceholder: {
    type: String,
    default: '开始日期',
  },
  endPlaceholder: {
    type: String,
    default: '结束日期',
  },
  defaultValue: {
    type: [Date, Array] as PropType<Date | Date[]>,
  },
  defaultTime: {
    type: [Date, Array] as PropType<Date | Date[]>,
    default: () => ([new Date(2000, 0, 0, 0, 0, 0), new Date(2000, 0, 0, 23, 59, 59)]),
  },
  isRange: {
    type: Boolean,
    default: false,
  },
  disabledHours: {
    type: Function,
  },
  disabledMinutes: {
    type: Function,
  },
  disabledSeconds: {
    type: Function,
  },
  disabledDate: {
    type: Function,
    default(time: Date) {
      return time.getTime() > Date.now();
    },
  },
  cellClassName: {
    type: Function,
  },
  shortcuts: {
    type: Array,
    default: () => ([]),
  },
  arrowControl: {
    type: Boolean,
    default: false,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  unlinkPanels: Boolean,
};
