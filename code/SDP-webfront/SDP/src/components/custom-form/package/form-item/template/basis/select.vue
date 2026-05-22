<template>
  <div class="flex">
    <!-- 远程搜索 -->
    <section v-if="item.fuzzy" style="flex:1">
      <!-- TODO: .value可能有问题 -->
      <el-select
        v-model:modelValue="model[item.key]"
        :placeholder="item.props?.placeholder || `输入搜索 ${item.label}`"
        v-bind="item.props"
        filterable
        remote
        :remote-method="item.fuzzy.fuzzyRemoteMethod"
        :loading="item.fuzzy.fuzzyLoading.value"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="clearHandle"
      >
        <!-- TODO: .value可能有问题 -->
        <el-option
          v-for="it in item.fuzzy.fuzzyResponse.value"
          :key="it.value"
          :label="it.label"
          :value="it.value"
          :disabled="it.disable"
        />
      </el-select>
    </section>
    <!-- option -->
    <section v-else style="flex:1">
      <el-select
        v-model:modelValue="model[item.key]"
        v-bind="item.props"
        :placeholder="item.props?.placeholder || `请选择 ${item.label}`"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="clearHandle"
      >
        <!-- 字典 dictCode -->
        <template v-if="dictList[item.dictCode || '']">
          <el-option
            v-for="(opt) in dictList[item.dictCode || '']"
            :key="opt.valueCode"
            :label="opt[item?.customParams?.labelKey || 'value']"
            :value="
              item?.customParams?.dictValueFormat?.(opt)
                || opt[item?.customParams?.valueKey || 'value']
            "
            :disabled="opt.disable"
          />
        </template>
        <!-- 本地 option -->
        <template v-else-if="item.option">
          <el-option
            v-for="(opt, x) in item.option"
            :key="x"
            :label="opt.label"
            :value="opt.value"
            :disabled="opt.disable"
          />
        </template>
      </el-select>
    </section>
    <p
      v-if="item?.customParams?.append"
      class="margin-left-10"
    >
      {{ item.customParams.append }}
    </p>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject } from 'vue';
import type { FormContext, FormItem } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../../extends';

export default defineComponent({
  name: 'CuSelect',
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
    const handleFocus = (v: (string | number | boolean)) => props.item?.focus?.(v, form);
    const handleBlur = (v: (string | number | boolean)) => props.item?.blur?.(v, form);
    const clearHandle = (v: (string | number | boolean)) => props.item?.clear?.(v, form);

    return {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
      handleChange,
      handleFocus,
      handleBlur,
      clearHandle,
    };
  },
});
</script>
