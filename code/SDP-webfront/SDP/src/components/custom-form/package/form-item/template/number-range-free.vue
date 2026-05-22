<template>
  <dl v-if="item.customParams" class="number-dict">
    <dt>
      <number-basis
        v-model:modelValue.number="startValue"
        v-bind="item.props"
      />
    </dt>
    <dd class="separator">
      {{ item.customParams.separator || '至' }}
    </dd>
    <dd>
      <number-basis
        v-model:modelValue.number="endValue"
        v-bind="item.props"
      />
    </dd>
    <dd v-if="item.customParams" class="dictZh">
      {{ item.customParams.dictZh || '' }}
    </dd>
  </dl>
</template>

<script lang="ts">
import type {
  PropType } from 'vue';
import {
  defineComponent,
  inject,
  ref,
  toRef,
  computed,
} from 'vue';
import type {
  FormContext,
  FormItem } from '@/components/custom-form/';
import {
  formContextDefault,
} from '@/components/custom-form/';
import linkKeyValue from '../extends';
import numberBasis from './basis/number-basis.vue';

export default defineComponent({
  name: 'CuNumberRange',
  components: {
    numberBasis,
  },
  extends: { ...linkKeyValue },
  props: {
    item: {
      required: true,
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup(props) {
    const _item = toRef(props, 'item');
    const { form, dictList, vm, ElementFormRef, model, UI } = inject<FormContext>('form-context', formContextDefault);
    const numberBasisStartRef = ref();
    const numberBasisEndRef = ref();

    const startValue = computed<string>(
      {
        get() {
          return model.value[_item.value.customParams?.startKey];
        },
        set(newValue) {
          model.value[_item.value.customParams?.startKey] = newValue;
        },
      }
    );
    const endValue = computed<string>(
      {
        get() {
          return model.value[_item.value.customParams?.endKey];
        },
        set(newValue) {
          model.value[_item.value.customParams?.endKey] = newValue;
        },
      }
    );

    return {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
      numberBasisStartRef,
      numberBasisEndRef,
      startValue,
      endValue,
    };
  },

});
</script>

<style scoped lang="scss">
@import "../../styles/index.scss";
.hidden-input{
  display: none;
}
</style>
