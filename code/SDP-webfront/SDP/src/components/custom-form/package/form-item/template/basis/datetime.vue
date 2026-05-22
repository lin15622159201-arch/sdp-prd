<template>
  <section>
    <date-picker
      v-model="model[item.key]"
      v-bind="item.props"
      type="datetime"
      :placeholder="item.props?.placeholder || '请选择 日期时间'"
      value-format="x"
      :disabled-date="disabledDate"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import type { FormContext } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuDatetime',

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
