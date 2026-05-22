<template>
  <number-basis
    v-model="model[item.key]"
    v-bind="item.props"
  />
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { FormContext, FormItem } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';
import numberBasis from './number-basis.vue';

export default defineComponent({
  name: 'CuNumber',
  components: {
    numberBasis,
  },
  extends: { ...linkKeyValue },
  props: {
    item: {
      required: true,
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup() {
    /* form 组件环境 */
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
