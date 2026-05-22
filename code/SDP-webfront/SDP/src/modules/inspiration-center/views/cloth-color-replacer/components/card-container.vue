<template>
  <div class="card-container">
    <div v-if="title" class="title">
      <el-icon v-if="icon">
        <component :is="icon" />
      </el-icon>
      {{ title }}
      <slot name="header-extra" />
    </div>
    <div class="card-container-content tw-flex-1 tw-overflow-auto" :style="{ padding }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue';

defineProps({
  title: String,
  icon: {
    type: Object,
    default: () => Picture
  },
  padding: {
    type: String,
    default: '16px'
  }
});
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  border: var(--el-border);
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  flex-direction: column;
  .title {
    display: flex;
    padding: 6px 10px;
    font-size: 16px;
    gap: 8px;
    align-items: center;
    border-bottom: var(--el-border);
  }
}
</style>
