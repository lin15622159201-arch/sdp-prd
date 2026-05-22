<template>
  <el-input
    ref="inputRef"
    v-model="val"
    v-bind="$attrs"
    @blur="blurHandle($event)"
  >
    <template v-for="(_, name) in $slots" #[name]="props">
      <slot :name="name" v-bind="props" />
    </template>
  </el-input>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, toRefs, ref } from 'vue';
import NP from 'number-precision';

export const blurFix = (
  num: string | number,
  precision: number = 0,
  min: number = -Infinity,
  max: number = Infinity,
) => {
  let num_ = +num;
  /* eslint-disable no-restricted-properties */
  if (window.isNaN(num_)) return '';
  const isControl = (min === 0 || min) && (max === 0 || max) && max >= min;
  if (isControl) {
    num_ < min && (num_ = min);
    num_ > max && (num_ = max);
  }
  return NP.round(num_, precision);
};

export default defineComponent({
  name: 'NumberBasis',
  props: {
    modelValue: {
      type: [Number, String],
      default: '',
    },
    precision: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    type: { /* 输出类型 */
      type: String as PropType<'string' | 'number'>,
      default: 'string',
    },
    emptyStrResetTargetValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'blur'],
  setup(props, { emit }) {
    const { precision, min, max, type, emptyStrResetTargetValue } = toRefs(props);

    const val = computed({
      get() {
        return props.modelValue;
      },
      set(value: string | number) {
        emit('update:modelValue', value);
      },
    });

    const fixType = (inputValue: string, mValue: string | number) => {
      const isStr = type.value === 'string';
      const mValue_ = +mValue;
      const updateValue = isStr ? `${mValue}` : mValue_;
      const initValue = isStr ? '' : 0;
      const targetValue = !window.isNaN(mValue_) ? updateValue : initValue;
      if (emptyStrResetTargetValue.value === '') {
        emit('update:modelValue', inputValue === '' ? inputValue : targetValue);
      } else {
        emit('update:modelValue', targetValue === '' ? emptyStrResetTargetValue.value : targetValue);
      }
    };
    /* 默认修正 */
    // fixType(blurFix(modelValue.value, precision.value, min.value, max.value));
    const blurHandle = (event: FocusEvent) => {
      const input = event.target as HTMLInputElement;
      const { value } = input;
      const value_ = blurFix(value, precision.value, min.value, max.value);
      fixType(value, value_);
      emit('blur');
    };
    const inputRef = ref();
    const activeFocus = () => {
      inputRef.value.focus();
    };
    return {
      val,
      blurHandle,
      inputRef,
      activeFocus,
      emit,
    };
  },
});
</script>
