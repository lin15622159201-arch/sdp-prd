<template>
  <div
    class="tw-flex tw-flex-col tw-cursor-pointer tw-items-center tw-justify-between tw-rounded-[4px]"
    :class="{
      'tw-text-[#18181A] tw-bg-[#F2F4FA]': active || isHovering,
      'tw-text-[#787A80]': !active && !isHovering,
    }"
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
    @click="emit('click')"
  >
    <span
      :class="`tw-text-18px ${iconClass}`"
      :style="{ color: `${active || isHovering ? activeColor : defaultColor}` }"
    />
    <template v-if="$slots.text">
      <slot name="text" />
    </template>
    <div
      v-else
      v-show="text"
      class="tw-text-[14px]"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits<{
  (event: 'click'): void;
}>();

defineProps({
  active: {
    type: Boolean,
    required: true,
  },
  iconClass: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: '',
  },
  activeColor: {
    type: String,
    default: 'var(--el-color-primary)',
  },
  defaultColor: {
    type: String,
    default: 'var(--el-color-info)',
  },
});

const isHovering = ref(false);
</script>
