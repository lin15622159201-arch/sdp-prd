<script lang="tsx">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import { defaultProps } from './props';
import type { IDatePickerType } from 'element-plus/es/components/date-picker/src/date-picker.type';

export default defineComponent({
  name: 'DatePicker',
  props: {
    ...defaultProps,
    type: {
      type: String as PropType<IDatePickerType>,
      default: 'daterange',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    function canTransformToDate<T>(val: T) {
      if (!val) return false;

      return typeof val === 'string' || typeof val === 'number' || Array.isArray(val);
    }

    function transformToDate(value: number | string | Date | (number | string | Date)[]) {
      const getVal = (_val: number | string | Date) => {
        if (_val instanceof Date) {
          return _val;
        }

        return new Date(Number(_val) ? Number(_val) : _val);
      };

      if (Array.isArray(value)) {
        return value.map((val) => {
          if (Number(val)) {
            return new Date(val);
          }
          return val;
        });
      }
      return getVal(value);
    }

    const value = computed({
      get() {
        const val = canTransformToDate(props.modelValue)
          ? transformToDate(props.modelValue)
          : props.modelValue;
        return val as Date;
      },
      set(val: number | string | Date | Date[]) {
        emit('update:modelValue', val);
      },
    });

    const opts = computed(() => {
      const _opts = Object.assign({}, props, attrs);
      function delKeys<T>(data: Record<string, T>, keys: string[]) {
        keys.forEach((key) => {
          if (Reflect.has(data, key)) {
            Reflect.deleteProperty(data, key);
          }
        });
      }

      const isRange = ['datetimerange', 'daterange', 'monthrange'].includes(_opts.type);
      const keys = ['modelValue'];

      if (!isRange && Array.isArray(_opts.defaultTime)) {
        keys.push('defaultTime');
      }

      delKeys(_opts, keys);
      return _opts;
    });

    return {
      value,
      opts,
    };
  },
  render() {
    return (
      <el-date-picker
        {
          ...this.opts
        }
        style='width: 100%'
        v-model={this.value}
      />
    );
  },
});
</script>
