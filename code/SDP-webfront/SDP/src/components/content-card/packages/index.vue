<template>
  <div :class="{ 'content-card-wrap': divide, 'small-size': small }">
    <!-- 标题 -->
    <div v-if="!noTitle" class="header-title-wrap">
      <div class="title">
        {{ title }}
      </div>
      <slot name="header-right" />
    </div>
    <!-- 内容 -->
    <div class="content-wrap">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContentCard',
  components: {},
  props: {
    title: {
      type: String,
      default: '标题',
    },
    divide: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    noTitle: {
      type: Boolean,
      defalut: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.content-card-wrap {
  border-bottom: 8px solid #f4f6f9;
}
.small-size{
    .header-title-wrap{
      height: 32px;
      border-bottom:none;
    }
    .content-wrap{
      padding: 0 24px 4px;
    }
  }
.header-title-wrap {
  display: flex;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #ebedf5;
  .title {
    position: relative;
    color: #303133;
    font-size: 16px;
    font-weight: bold;
    line-height: 45px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: -5px;
      top: 50%;
      width: 3px;
      height: 18px;
      transform: translateY(-50%);
      background-color: var(--el-color-primary);
    }
  }
}
.content-wrap {
  padding: 0;
}
</style>
