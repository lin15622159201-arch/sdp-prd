<template>
  <section>
    <el-switch
      v-model:modelValue="model[item.key]"
      v-bind="item.props"
      @change="handleChange"
    />
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { FormContext, FormItem } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuSwitch',
  components: {
  },
  extends: { ...linkKeyValue },
  props: {
    item: { // formItem 对象
      required: true,
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    const {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
    } = inject<FormContext>('form-context', formContextDefault);

    const handleChange = (v: (string | number | boolean)) => props.item?.change?.(v, form);

    return {
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
