<template>
  <section>
    <date-picker
      v-model:modelValue="model[item.key]"
      v-bind="item.props"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="defaultTime"
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
  name: 'CuDatetimerange',
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

    // '00:00:00', '23:59:59'
    const defaultTime = [
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 2, 1, 23, 59, 59),
    ];

    // 修复使用 date-picker 默认问题
    const disabledDate = computed(() => {
      const fn = () => false;
      return props.item.props?.disabledDate || fn;
    });

    return {
      defaultTime,
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
