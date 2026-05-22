<template>
  <div
    class="tw-flex tw-flex-col tw-cursor-pointer tw-items-center tw-justify-between tw-rounded-[4px]"
    :class="{
      'tw-text-[#18181A] tw-bg-[#F2F4FA]': props.active || isHovering,
      'tw-text-[#787A80]': !props.active && !isHovering,
    }"
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <span
      class="tw-inline-block tw-w-[21px] tw-h-[21px] tw-p-2 tw-bg-contain tw-bg-no-repeat"
      :style="{ backgroundImage: `url(${active || isHovering ? activeIcon : props.icon})` }"
    />
    <div v-show="props.text" class="tw-text-[14px] tw-mt-[5px] tw-select-none">{{ props.text }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 接受图标路径和文字
const props = defineProps<{
  icon: string;
  activeIcon?: string;
  text?: string;
  active?: boolean;
}>();

const isHovering = ref(false);
</script>
