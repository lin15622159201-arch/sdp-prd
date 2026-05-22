<template>
  <el-input
    :model-value="inputValue"
    @blur="onBlur"
    @keydown.enter="onBlur"
    @input="onInput"
    :disabled="disabled"
    :placeholder="placeholder"
  >
    <template
      #prepend
      v-if="$slots.prepend"
    >
      <slot name="prepend" />
    </template>
    <template
      #append
      v-if="$slots.append"
    >
      <slot name="append" />
    </template>
    <template
      #suffix
      v-if="$slots.suffix"
    >
      <slot name="suffix" />
    </template>
    <template
      #prefix
      v-if="$slots.prefix"
    >
      <slot name="prefix" />
    </template>
  </el-input>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';

import { defineComponent, ref, toRefs, watch } from 'vue';
import { isEmpty } from '@toy/utils';

export default defineComponent({
  name: 'inputNumber',
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },

    /**
     * 最大值
     */
    min: {
      type: Number,
      default: -Infinity,
    },

    /**
     * 最大值
     */
    max: {
      type: Number,
      default: Infinity,
    },

    /**
     * 小数点位数
     */
    precision: {
      type: Number,
      default: Infinity,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const { min, max, precision, modelValue } = toRefs(props);
    const inputValue = ref<number | string>('');
    const onInput = (val: string) => {
      const newVal = String(val).trim();
      inputValue.value = newVal;
      emit('update:modelValue', newVal);
    };
    const onChange = async (val: number | string) => {
      let newVal: number | string = String(val);
      if (inputValue.value !== '' && !Number.isNaN(Number(newVal))) {
        newVal = Number(newVal);
        if (+newVal > max.value) {
          newVal = max.value;
        } else if (+newVal < min.value) {
          newVal = min.value;
        }
        if (String(newVal).indexOf('.') !== -1) {
          const arr = String(newVal).split('.');
          const percentCount = arr[1];
          // 取整数 或者输入的是1.
          if (precision.value === 0 || !percentCount) {
            newVal = String(arr[0]);
          } else if (percentCount.length > precision.value) {
            newVal = String(`${arr[0]}.${arr[1].substring(0, precision.value)}`);
          }
        }
        inputValue.value = newVal;
      } else {
        // 内容不为空且格式错误时
        if (!isEmpty(inputValue.value)) {
          ElMessage.warning('内容格式必须为数字');
        }
        inputValue.value = '';
        newVal = '';
      }
      emit('update:modelValue', newVal);
      emit('change', newVal);
    };
    const onBlur = () => {
      onChange(String(inputValue.value));
    };
    watch(
      () => modelValue.value,
      (val) => {
        if (val !== inputValue.value) {
          inputValue.value = val;
        }
      },
      {
        immediate: true,
      },
    );

    return {
      onInput,
      inputValue,
      onChange,
      onBlur
    };
  },
});
</script>
