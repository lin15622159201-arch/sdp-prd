<template>
  <div class="key-select-search tw-flex tw-items-center tw-w-full">
    <el-select
      placeholder="请选择"
      v-model="keyValue"
      :style="{ width: keyWidth }"
      class="tw-flex-shrink-0 key-select"
    >
      <el-option
        v-for="item in keyList"
        :key="item[keyListConfig.valueName]"
        :label="item[keyListConfig.labelName]"
        :value="item[keyListConfig.valueName]"
      />
    </el-select>
    <div class="key-select-value">
      <slot class="input-slot" :keyValue="keyValue">
        <el-input
          :placeholder="placeholder || '请输入'"
          v-model="inputValue"
          clearable
          @input="handleInput"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch, useSlots } from 'vue';

interface IKeyListConfig {
  labelName: string;
  valueName: string;
}

export default defineComponent({
  props: {
    // input框的v-model
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    /** 下拉宽度 */
    keyWidth: {
      type: String,
      default: '96px',
    },
    // 左侧下拉options
    keyList: {
      type: Array as PropType<
      {
        [key: string]: IKeyListConfig['valueName'];
      }[]
      >,

      default: () => [],
    },

    // 左侧下拉options的配置
    keyListConfig: {
      type: Object as PropType<IKeyListConfig>,
      default: () => ({
        labelName: 'label',
        valueName: 'value',
      }),
    },

    placeholder: {
      type: String,
    },

    /** 是否自动去除首尾空格 */
    trim: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const { keyList, keyListConfig, modelValue, trim } = toRefs(props);
    const inputValue = ref('');
    // 设置左侧下拉默认为第一项
    const keyValue = ref(keyList.value[0]?.[keyListConfig.value.valueName]);
    const slots = useSlots();

    // 清空所有字段并更新当前字段的值
    const updateModelValue = (key: string, value: any) => {
      // 先把全部字段置空
      const newModelValue: Record<string, any> = { ...modelValue.value };
      keyList.value.forEach((item) => {
        newModelValue[item[keyListConfig.value.valueName]] = '';
      });
      // 设置当前字段的值
      newModelValue[key] = value;

      emit('update:modelValue', newModelValue);
      emit('change', newModelValue);
    };

    // 处理输入事件，根据 trim prop 决定是否去除首尾空格
    const handleInput = (value: string) => {
      if (trim.value) {
        inputValue.value = value.trim();
      }
    };

    // 监听 keyValue 变化，切换时清空输入
    watch(keyValue, () => {
      inputValue.value = '';
      updateModelValue(keyValue.value, '');
    });

    // 监听 inputValue 变化
    watch(inputValue, () => {
      updateModelValue(keyValue.value, inputValue.value);
    });

    // 只有使用了插槽时，才监听 modelValue 中当前 keyValue 对应字段的变化
    if (slots.default) {
      watch(
        () => modelValue.value[keyValue.value],
        (newVal) => {
          // 如果值变化了，且不等于 inputValue（避免重复触发）
          if (newVal !== inputValue.value) {
            updateModelValue(keyValue.value, newVal);
          }
        },
      );
    }

    // 重置后select默认选中第一项，输入框清空
    const reset = () => {
      inputValue.value = '';
      keyValue.value = keyList.value[0][keyListConfig.value.valueName];
    };
    return {
      inputValue,
      keyValue,
      reset,
      handleInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.key-select-search {
  > .key-select {
    :deep(.el-select__wrapper) {
      background-color: var(--el-fill-color-light);
      // 将左侧选择框的右侧圆角去掉，使得其和右侧的输入框衔接
      border-radius: var(--el-border-radius-base) 0 0 var(--el-border-radius-base);
      margin-right: -1px;
    }
  }
  > .key-select-value {
    width: 100%;
    line-height: 0; // 消除 inline-block 元素产生的额外空间
    // 将插槽内的 el-select 左侧圆角去掉，使得其和左侧的选择框衔接
    :deep(.el-select__wrapper) {
      border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base) 0;
    }
  }
}
</style>
