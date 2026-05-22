<template>
  <dl v-if="item.customParams" class="number-dict">
    <dt>
      <number-basis
        ref="numberBasisStartRef"
        v-model:modelValue.number="model[item.customParams.startKey]"
        v-bind="item.props"
        @blur="numberBasisBlur('start')"
        @focus="numberBasisStartFocus"
        @clear="numberBasisStartClear"
      />
    </dt>
    <dd class="separator">
      {{ item.customParams.separator || '至' }}
    </dd>
    <dd>
      <number-basis
        ref="numberBasisEndRef"
        v-model:modelValue.number="model[item.customParams.endKey]"
        v-bind="item.props"
        :disabled="!inputEndAvailable"
        @blur="numberBasisBlur('end')"
        @clear="numberBasisEndClear"
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

    const inputEndAvailable = computed(() => {
      return model.value[_item.value.customParams?.startKey];
    });

    const numberBasisStartFocus = () => {
      model.value[_item.value.customParams?.endKey] = '';
    };
    const numberBasisBlur = (flag: 'start' | 'end') => {
      if (
        flag === 'start'
        && model.value[_item.value.customParams?.startKey]
        && !model.value[_item.value.customParams?.endKey]
      ) {
        numberBasisEndRef.value.activeFocus();
        return;
      }
      if (
        flag === 'end'
        && model.value[_item.value.customParams?.startKey]
        && !model.value[_item.value.customParams?.endKey]
      ) {
        model.value[_item.value.customParams?.startKey] = '';
        return;
      }

      if (+model.value[_item.value.customParams?.startKey] > +model.value[_item.value.customParams?.endKey]) {
        const temp = model.value[_item.value.customParams?.startKey];
        model.value[_item.value.customParams?.startKey] = model.value[_item.value.customParams?.endKey];
        model.value[_item.value.customParams?.endKey] = temp;
      }
    };

    const numberBasisStartClear = () => {
      model.value[_item.value.customParams?.startKey] = '';
      model.value[_item.value.customParams?.endKey] = '';
    };
    const numberBasisEndClear = () => {
      numberBasisEndRef.value.activeFocus();
    };

    return {
      form,
      dictList,
      vm,
      ElementFormRef,
      model,
      UI,
      numberBasisStartRef,
      numberBasisEndRef,
      numberBasisBlur,
      numberBasisStartFocus,
      numberBasisStartClear,
      numberBasisEndClear,
      inputEndAvailable,
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
