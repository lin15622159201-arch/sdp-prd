<template>
  <div class="tools">
    <div
      v-for="item in TOOLS_LIST"
      :key="item.value"
      :class="{
        item: true,
        active: modelValue === item.value,
      }"
      @click="handleChangeTool(item.value)"
    >
      <span
        :class="`icon ${item.icon}`"
      />
      <div class="txt">{{item.label}}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { BOXES_TYPE_ENUM, TOOLS_LIST } from './constant';

const emits = defineEmits(['change']);
defineProps({
  modelValue: {
    type: [Number, String] as PropType<BOXES_TYPE_ENUM | ''>,
    required: true,
  },
});
const handleChangeTool = (val: BOXES_TYPE_ENUM) => {
  emits('change', val);
};
</script>
<style lang="scss" scoped>
.tools {
  display: flex;
  flex-direction: column;
  width: 100px;
  background: #fff;
  border-top: 1px solid var(--el-border-color);
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 68px;
    align-items: center;
    color: var(--el-text-color);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: var(--el-color-primary);
    }
    &.active {
      color: var(--el-color-primary);
      background-color: #f0f0f0;
    }
    .icon {
      font-size: 16px;
    }
    .txt {
      padding-top: 10px;
      font-size: 13px;
    }
  }
}
</style>
