<template>
  <section>
    <date-picker
      v-model:modelValue="model[item.key]"
      v-bind="item.props"
      type="date"
      :placeholder="item.props?.placeholder || '请选择 日期'"
      value-format="x"
      :disabled-date="disabledDate"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import type { FormContext } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuDate',
  components: {
  },
  extends: { ...linkKeyValue },
  setup(props) {
    const {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
    } = inject<FormContext>('form-context', formContextDefault);
    // 修复使用 date-picker 默认问题
    const disabledDate = computed(() => {
      const fn = () => false;
      return props.item.props?.disabledDate || fn;
    });

    return {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
      disabledDate,
    };
  },
});
</script>
