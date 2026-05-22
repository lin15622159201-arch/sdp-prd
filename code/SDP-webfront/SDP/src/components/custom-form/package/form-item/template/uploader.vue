<template>
  <section v-if="item_.upload">
    <!-- @vue-ignore -->
    <Uploader
      v-model:modelValue="item_.upload.files"
      v-bind="item.props"
    />
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, inject, toRef } from 'vue';
import type { FormItem, FormContext } from '@/components/custom-form/';
import { formContextDefault } from '@/components/custom-form/';
import linkKeyValue from '../extends';

export default defineComponent({
  name: 'CuUploader',
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
    const item_ = toRef(props, 'item');
    const {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
    } = inject<FormContext>('form-context', formContextDefault);

    return {
      item_,
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
