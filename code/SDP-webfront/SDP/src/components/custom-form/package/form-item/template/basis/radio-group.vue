<template>
  <section>
    <el-radio-group
      v-model:modelValue="model[item.key]"
      v-bind="item.props"
      @change="(val: any) => handleChange(val)"
    >
      <!-- 字典 dictCode -->
      <template v-if="dictList[item.dictCode || '']">
        <el-radio
          v-for="(opt) in dictList[item.dictCode || '']"
          :key="opt.valueCode"
          :label="opt[item?.customParams?.labelKey || 'value']"
        >
          {{ opt[item?.customParams?.valueKey || 'value'] }}
        </el-radio>
      </template>
      <!-- 本地 radio -->
      <template v-else-if="item.radio">
        <el-radio
          v-for="(opt, r) in item.radio"
          :key="String(r)"
          :label="opt.value"
        >
          {{ opt.label }}
        </el-radio>
      </template>
    </el-radio-group>
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { FormContext, FormItem } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuRadioGroup',
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
