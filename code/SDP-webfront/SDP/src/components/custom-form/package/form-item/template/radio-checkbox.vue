<template>
  <el-checkbox-group v-model="value" @change="(e: any) => handleChange(e)">
    <el-checkbox
      v-for="_item of item.checkbox"
      :key="(_item as any).value"
      :label="(_item as any).value"
    >
      {{ (_item as any).label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject, toRef, computed } from 'vue';
import type { FormItem, FormContext } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../extends';

export default defineComponent({
  name: 'CuRadioCheckbox',
  extends: { ...linkKeyValue },
  props: {
    item: { // formItem 对象
      required: true,
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    const item_ = toRef(props, 'item');

    const {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
    } = inject<FormContext>('form-context', formContextDefault);

    const value = computed({
      get: () => {
        return [model.value[item_.value.key]];
      },
      set: (newVal: string[]) => {
        const checkedValue = newVal.find(v => v !== model.value[item_.value.key]) ?? '';
        model.value[item_.value.key] = checkedValue;
      },
    });

    const handleChange = (v: string | number | boolean) => props.item?.change?.(v, form);

    return {
      value,
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-checkbox) {
  margin-right: 20px;
}
</style>
