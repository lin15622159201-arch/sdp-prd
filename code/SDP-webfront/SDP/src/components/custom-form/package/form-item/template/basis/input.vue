<template>
  <el-input
    v-model="model[item.key]"
    v-bind="item.props"
    :placeholder="item.props?.placeholder || `请输入 ${item.label}`"
    @keyup.enter="() => handleEnter(model[item.key])"
  >
    <template v-if="item.customParams?.prefix" #prefix>
      {{ item.customParams?.prefix }}
    </template>
    <template v-if="item.customParams?.suffix" #suffix>
      {{ item.customParams?.suffix }}
    </template>
    <template v-if="item.customParams?.prepend" #prepend>
      {{ item.customParams?.prepend }}
    </template>
    <template v-if="item.customParams?.append" #append>
      {{ item.customParams?.append }}
    </template>
  </el-input>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { FormContext, FormItem } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuInput',
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

    const handleEnter = (v: (string | number | boolean)) => props.item?.enter?.(v, form);

    return {
      handleEnter,
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
