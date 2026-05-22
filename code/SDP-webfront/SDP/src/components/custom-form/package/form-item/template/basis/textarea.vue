<template>
  <section>
    <el-input
      v-model:modelValue="model[item.key]"
      type="textarea"
      v-bind="item.props"
      :placeholder="item.props?.placeholder || `请输入`"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { FormContext } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuTextarea',
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
