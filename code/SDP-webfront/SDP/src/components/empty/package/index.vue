<template>
  <div
    :class="[
      'tw-flex',
      'tw-flex-col',
      'tw-items-center',
      'tw-justify-center',
      'tw-text-[14px]',
      'tw-text-[#b4b4b4]'
    ]"
  >
    <img
      :src="IconNoData"
      class="tw-w-[120px] tw-h-[120px]"
    />
    <div class="tw-pb-[20px]" v-if="description !== ''">{{ description }}</div>
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconNoData from '@/assets/icon_nodata.png';

export default defineComponent({
  name: 'empty',
  props: {
    description: {
      type: String,
      default: '暂无数据',
    },
  },

  setup() {
    return {
      IconNoData,
    };
  },
});
</script>
