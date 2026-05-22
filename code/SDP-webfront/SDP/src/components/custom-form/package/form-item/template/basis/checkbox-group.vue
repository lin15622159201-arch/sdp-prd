<template>
  <section>
    <el-checkbox-group
      v-model:modelValue="model[item.key]"
      v-bind="item.props"
      @change="handleChange"
    >
      <!-- 字典 dictCode -->
      <template v-if="dictList[item.dictCode || '']">
        <el-checkbox
          v-for="(opt) in dictList[item.dictCode || '']"
          :key="opt.valueCode"
          :label="opt[item?.customParams?.labelKey || 'value']"
        >
          {{ opt[item?.customParams?.valueKey || 'value'] }}
        </el-checkbox>
      </template>
      <!-- 本地 checkbox -->
      <template v-else-if="item.checkbox">
        <el-checkbox
          v-for="(opt, c) in item.checkbox"
          :key="String(c)"
          :label="(opt as any).value"
        >
          {{ (opt as any).label }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { FormContext, FormItem } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuCheckboxGroup',
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

    /* 事件 */
    const handleChange = (v: (string | number | boolean)[]) => props.item?.change?.(v, form);

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
