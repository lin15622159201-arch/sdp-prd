<template>
  <el-image
    class="custom-image"
    preview-teleported
    v-bind="$attrs"
    :fit="fit"
    :src="src || undefined"
  >
    <template #error v-if="$slots.error">
      <div class="error">
        <slot name="error" />
      </div>
    </template>
    <template #error v-else-if="isEmpty($attrs.src)">
      <div class="error">
        暂无图片
      </div>
    </template>
  </el-image>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { isEmpty } from '@toy/utils';
import type { ImageProps } from 'element-plus';

export default defineComponent({
  name: 'CustomImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    fit: {
      type: String as PropType<ImageProps['fit']>,
      default: '',
    }
  },
  setup() {
    return {
      isEmpty
    };
  },
});

</script>
<style lang="scss" scoped>
.custom-image {
  .error {
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-bg-color);
    color: #999;
    font-size: 12px;
  }
}
</style>
