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
  if (Number.isNaN(num_)) return '';
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
    type: {
      type: String as PropType<'string' | 'number'>,
      default: 'string',
    },
    showAppend: {
      type: Boolean,
      default: false,
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
      const _mValue = +mValue;
      const updateValue = isStr ? `${mValue}` : _mValue;
      const initValue = isStr ? '' : 0;
      const targetValue = !Number.isNaN(_mValue) ? updateValue : initValue;
      if (emptyStrResetTargetValue.value === '') {
        emit('update:modelValue', inputValue === '' ? inputValue : targetValue);
      } else {
        emit('update:modelValue', targetValue === '' ? emptyStrResetTargetValue.value : targetValue);
      }
    };
    /* 默认修正 */
    const blurHandle = (event: FocusEvent) => {
      const input = event.target as HTMLInputElement;
      const { value } = input;
      fixType(value, blurFix(value, precision.value, min.value, max.value));
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
