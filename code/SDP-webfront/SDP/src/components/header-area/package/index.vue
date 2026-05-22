<!-- 该组件是为了header部分的左边筛选条件与右侧按钮布局五五分 -->
<template>
  <!-- 如果右侧没有按钮，则占一整行 -->
  <div class="tw-flex tw-items-center tw-relative">
    <div class="tw-flex-[1_1_auto]">
      <slot />
    </div>
    <div class="tw-flex tw-items-end">
      <slot name="button" />
    </div>
    <div class="tw-absolute tw-top-[50%] tw-right-0 tw-translate-y-[-50%]">
      <slot name="fixed" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderArea',
});
</script>
