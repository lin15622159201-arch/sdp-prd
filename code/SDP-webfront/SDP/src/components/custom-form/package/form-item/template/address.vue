<template>
  <address-picker
    v-if="item.customParams"
    v-model:province="model[item.customParams?.province || 'province']"
    v-model:city="model[item.customParams?.city || 'city']"
    v-model:area="model[item.customParams?.area || 'area']"
    v-bind="item.props"
  />
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { FormItem, FormContext } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../extends';

export default defineComponent({
  name: 'CuAddress',
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

    const { province, city, area } = props.item.customParams || {};
    const keys = [province, city, area];
    const addressHandle = (arr: string[]) => {
      arr.forEach((value: string, i: number) => {
        const isSet = value && keys[i];
        if (isSet) model.value[keys[i]!] = value;
      });
      return arr;
    };

    return {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
      addressHandle,
    };
  },
});
</script>
