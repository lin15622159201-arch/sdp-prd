<template>
  <dl v-if="item.customParams" class="number-range-dict">
    <dt>
      <number-basis
        v-model:modelValue.number="model[item.customParams.startKey]"
        v-bind="item.props"
      />
    </dt>
    <dd class="separator">
      {{ item.customParams.separator || '至' }}
    </dd>
    <dd>
      <number-basis
        v-model:modelValue.number="model[item.customParams.endKey]"
        v-bind="item.props"
      />
    </dd>
    <dd>
      <cu-select :item="item" />
    </dd>
  </dl>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { FormContext } from '@/components/custom-form';
import { formContextDefault } from '@/components/custom-form';
import linkKeyValue from '../extends';
import cuSelect from './basis/select.vue';
import numberBasis from './basis/number-basis.vue';

export default defineComponent({
  name: 'CuNumberRange',
  components: {
    cuSelect,
    numberBasis,
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

<style scoped lang="scss">
@import "../../styles/index.scss";
</style>
