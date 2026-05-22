<template>
  <div class="main-wrap">
    <slot v-if="$slots?.label" name="label" />
    <div
      v-else
      :class="{
        [`align-${align}`]: !!align,
        'is-bold': bold,
        'label-wrap': true,
      }"
      :style="{
        width,
      }"
    >
      {{ label }}
      {{ labelSuffix }}
    </div>
    <el-checkbox-group
      v-model="value"
      class="checkbox-wrap"
    >
      <el-checkbox
        v-for="item of list"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';

interface IListItem {
  label: string;
  value: string | number;
  disabled: boolean;
}

export default defineComponent({
  name: 'RadioCheckbox',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array as PropType<IListItem[]>,
      default: () => [],
    },
    label: {
      type: [String, Number],
      default: '',
    },
    labelSuffix: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: [String, Number],
      default: '',
    },
    bold: Boolean,
    align: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: '',
    },
    /**
     * 必选
     * 是否可取消选项
     */
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const list = computed(() => props.options);
    const value = computed({
      get: () => {
        return [props.modelValue];
      },
      set: (newVal: IListItem['value'][]) => {
        const checkedValue = newVal.find(v => v !== props.modelValue) ?? '';

        if (props.required && !checkedValue) return;

        emit('update:modelValue', checkedValue);
        emit('change', checkedValue);
      },
    });

    const width = computed(() => {
      return typeof props.labelWidth === 'number'
        ? `${props.labelWidth}px`
        : props.labelWidth;
    });
    return {
      list,
      value,
      width,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-wrap {
  display: flex;
  flex-wrap: wrap;
  margin-right: 20px;
  .align-left {
    text-align: left;
  }
  .align-right {
    text-align: right;
  }
  .align-center {
    text-align: center;
  }
  .is-bold {
    font-weight: bold;
  }
  .label-wrap {
    line-height: 24px;
    margin-right: 5px;
  }
  .checkbox-wrap {
    display: inline-block;
  }
}
:deep(.el-checkbox) {
  margin-right: 20px;
}
</style>
