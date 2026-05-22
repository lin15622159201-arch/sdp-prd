<template>
  <!-- 底部便捷工具 -->
  <div
    style="box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08)"
    class="tw-flex-center-y tw-absolute tw-left-1/2 -tw-translate-x-1/2
      tw-bg-white tw-rounded-[4px] tw-bottom-[41px] tw-px-[14px] tw-py-[10px]"
  >
    <icon-button
      class="tw-p-[2px] tw-rounded-[4px]"
      :icon="IconHand"
      :active-icon="IconHandActive"
      :active="draging.dragMode"
      @click="handleDrag"
    />
    <!-- 竖线分割线 -->
    <div class="tw-w-[1px] tw-h-[16px] tw-bg-[#D8DBE6] tw-mx-[14px]" />
    <icon-button
      @click="workspace?.zoomIn"
      class="tw-p-[2px]"
      :icon="IconToLarge"
      :active-icon="IconToLargeActive"
    />
    <span class="tw-mx-[14px] tw-color-[#18181A] tw-text-[12px] tw-w-[25px]">{{ zoomRatio }}%</span>
    <icon-button
      @click="workspace?.zoomOut"
      class="tw-p-[2px]"
      :icon="IconToSmall"
      :active-icon="IconToSmallActive"
    />
  </div>
</template>

<script setup lang="ts">
import IconHand from '@/assets/photo-edit/icon_hand.png';
import IconHandActive from '@/assets/photo-edit/icon_hand_active.png';
import IconToLarge from '@/assets/photo-edit/icon_to_large.png';
import IconToLargeActive from '@/assets/photo-edit/icon_to_large_active.png';
import IconToSmall from '@/assets/photo-edit/icon_to_small.png';
import IconToSmallActive from '@/assets/photo-edit/icon_to_small_active.png';
import IconButton from '../icon-button/index.vue';
import { useEditorStore } from '../../store/useEditorStore';
import { computed, watch } from 'vue';
import { useToolBarStore, TOOL_ENUM } from '../../store/useToolBarStore';

const { workspace, draging, getCanvas } = useEditorStore();
const toolbarStore = useToolBarStore();

// 显示缩放百分比
const zoomRatio = computed(() => (workspace.zoomRatio * 100).toFixed(0));

// 点击抓手, 切换抓手模式
const handleDrag = () => {
  draging.dragMode = !draging.dragMode;
};

watch(
  () => draging.dragMode,
  (value) => {
    const isUsingPenciel = toolbarStore.activeTool === TOOL_ENUM.brush || toolbarStore.activeTool === TOOL_ENUM.eraser;
    if (isUsingPenciel) {
      getCanvas().isDrawingMode = !value;
    }
  },
);
</script>
