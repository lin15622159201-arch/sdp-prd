<template>
  <div class="tw-flex tw-items-center">
    <input-number
      :modelValue="rangeStart"
      :min="min"
      :max="max"
      :precision="precision"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="handleStartValueChange"
    >
      <template
        #prefix
        v-if="$slots.prefix"
      >
        <slot name="prefix" />
      </template>
      <template
        #suffix
        v-if="$slots.suffix"
      >
        <slot name="suffix" />
      </template>
      <template
        #prepend
        v-if="$slots.prepend"
      >
        <slot name="prepend" />
      </template>
      <template
        #append
        v-if="$slots.append"
      >
        <slot name="append" />
      </template>
    </input-number>
    <div class="tw-px-6px">-</div>
    <input-number
      :modelValue="rangeEnd"
      :min="min"
      :max="max"
      :precision="precision"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="handleEndValueChange"
    >
      <template
        #prefix
        v-if="$slots.prefix"
      >
        <slot name="prefix" />
      </template>
      <template
        #suffix
        v-if="$slots.suffix"
      >
        <slot name="suffix" />
      </template>
      <template
        #prepend
        v-if="$slots.prepend"
      >
        <slot name="prepend" />
      </template>
      <template
        #append
        v-if="$slots.append"
      >
        <slot name="append" />
      </template>
    </input-number>
  </div>
</template>
<script lang="ts">
import { isEmpty } from '@toy/utils';
import { defineComponent, nextTick } from 'vue';

export default defineComponent({
  name: 'InputNumberRanger',
  emits: ['update:rangeStart', 'update:rangeEnd'],
  props: {
    rangeStart: {
      type: [String, Number],
    },

    rangeEnd: {
      type: [String, Number],
    },

    placeholder: {
      type: String,
      default: '',
    },

    max: {
      type: Number,
      default: Infinity,
    },

    min: {
      type: Number,
      default: -Infinity,
    },

    precision: {
      type: Number,
      default: Infinity,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const handleStartValueChange = async (val: number) => {
      const { rangeEnd } = props;
      emit('update:rangeStart', val);
      await nextTick();
      if (isEmpty(rangeEnd)) {
        emit('update:rangeStart', val);
      } else if (isEmpty(val) === false && Number(rangeEnd) < Number(val)) {
        emit('update:rangeStart', rangeEnd);
      } else {
        emit('update:rangeStart', val);
      }
    };
    const handleEndValueChange = async (val: number) => {
      const { rangeStart } = props;
      emit('update:rangeEnd', val);
      await nextTick();
      if (isEmpty(rangeStart)) {
        emit('update:rangeEnd', val);
      } else if (isEmpty(val) === false && Number(rangeStart)! > Number(val)) {
        emit('update:rangeEnd', rangeStart);
      } else {
        emit('update:rangeEnd', val);
      }
    };
    return {
      handleStartValueChange,
      handleEndValueChange,
    };
  },
});
</script>
