<!--
 * @Descripttion: 字典表select
 * @Author: weitongxue
-->
<template>
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    class="select-full"
    @change="handleSelect"
    v-bind="$attrs"
  >
    <el-option
      v-for="item in JOB_OPTIONS"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]!"
      :disabled="disabledList.includes(item.value) || item.disabled"
    />
  </el-select>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useDictionary } from '@/hooks/use-dictionary';
import { IDictionaryItem } from '@/hooks/use-dictionary/types';

export default defineComponent({
  name: 'DictionarySelect',
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: [String, Array],
      default: '',
      required: true,
    },
    labelKey: {
      type: String as PropType<Exclude<keyof IDictionaryItem, 'children' | 'disabled' | 'attributes'>>,
      default: 'label'
    },
    valueKey: {
      type: String as PropType<Exclude<keyof IDictionaryItem, 'children' | 'disabled' | 'attributes'>>,
      default: 'value'
    },

    dictionary: {
      type: String,
      default: '',
      required: true,
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    clearable: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: '请选择',
    },

    disabledOption: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    level: {
      type: Number,
      default: 0,
    },
  },

  setup(props, { emit }) {
    const { getDictionaryOptions } = useDictionary();
    // 选项
    const JOB_OPTIONS = computed(() => getDictionaryOptions(props.dictionary, props.level));

    const handleSelect = (val: string) => {
      const item = JOB_OPTIONS.value.find(v => v.value === val);
      emit('update:modelValue', val);
      emit('change', val, item);
    };

    const disabledList = computed(() => props.disabledOption);

    return {
      JOB_OPTIONS,
      disabledList,

      handleSelect,
    };
  },
});
</script>
