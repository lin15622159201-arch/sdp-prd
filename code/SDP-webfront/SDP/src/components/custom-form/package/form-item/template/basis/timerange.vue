<template>
  <section>
    <el-time-picker
      v-model:modelValue="model[item.key]"
      is-range
      v-bind="item.props"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :placeholder="item.props?.placeholder || '请选择 时间范围'"
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
  name: 'CuTimerange',
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
