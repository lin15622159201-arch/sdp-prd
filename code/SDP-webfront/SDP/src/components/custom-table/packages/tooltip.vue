<template>
  <div
    ref="tooltipRef"
    class="tooltip"
    @mouseenter="isArea = true"
  >
    <slot v-if="!isArea" />
    <el-tooltip
      v-else
      :placement="placement"
      :effect="effect"
      :content="content"
    >
      <div>
        <slot />
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { xssFilter } from '@/core/utils/xss-util';
import { Placement } from 'element-plus';
import { defineComponent, ref, onUpdated, PropType } from 'vue';

export default defineComponent({
  name: 'CustomTooltip',
  props: {
    effect: {
      type: String,
      default: 'dark',
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top-start',
    },
  },
  setup() {
    const isArea = ref(false);
    const tooltipRef = ref<HTMLElement>();
    const content = ref('');

    onUpdated(() => {
      requestAnimationFrame(() => {
        if (isArea.value) {
          content.value = xssFilter.process(tooltipRef.value?.innerText || tooltipRef.value?.textContent || '');
        }
      });
    });

    return {
      isArea,
      tooltipRef,
      content,
    };
  },
});
</script>

<style scoped lang="scss">
.tooltip {
  width: 100%;
  white-space: nowrap;
}
</style>
