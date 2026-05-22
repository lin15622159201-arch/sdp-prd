<template>
  <div class="content-card">
    <detail-title show-line :title="title" />
    <sc-responsive-row
      v-if="responsiveRow"
      :col="col"
    >
      <slot />
    </sc-responsive-row>
    <slot v-else />
  </div>
</template>

<script setup lang='ts'>
import { DEFAULT_COLS } from '../constant';

defineProps({
  title: {
    type: String,
    default: ''
  },
  responsiveRow: {
    type: Boolean,
    default: false
  },
  col: {
    type: Object,
    default: () => DEFAULT_COLS
  }
});
</script>
<style scoped lang='scss'>
.content-card {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 14px;
  .skc_ul {
    padding: 20px 15px;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    .skc_item {
      border-bottom: 1px solid var(--el-border-color);
      margin-bottom: 20px;
      &:last-of-type {
        border-bottom: 0;
        margin-bottom: 0;
      }
    }
  }
}
</style>
