<template>
  <section>
    <el-time-picker
      v-model:modelValue="model[item.key]"
      v-bind="item.props"
      :placeholder="item.props?.placeholder || '请选择 时间'"
      value-format="x"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { FormContext } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuTimePicker',
  components: {
  },
  extends: { ...linkKeyValue },
  setup() {
    const {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
    } = inject<FormContext>('form-context', formContextDefault);

    return {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
    };
  },
});
</script>
