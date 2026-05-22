<template>
  <div
    class="tw-text-[14px] tw-color-[#18181A] tw-font-bold tw-mb-[11px]"
  >
    橡皮
  </div>
  <div
    class="preview-bg tw-h-[105px] tw-my-[12px] tw-w-full tw-bg-[#787A80]
      tw-rounded-[3px] tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="tw-rounded-full tw-flex"
      :style="{
        backgroundColor: eraser.color,
        opacity: 1 - eraser.opacity,
        width: `${eraser.size}px`,
        height: `${eraser.size}px`,
        border: `${eraser.softness === 0 ? '2px solid #fff' : 'none'}`,
        boxShadow: `0px 0px ${eraser.softness}px ${eraser.softness}px ${eraser.color}`,
      }"
    />
  </div>
  <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
    <span>尺寸</span>
    <span>{{ eraser.size }}px</span>
  </div>
  <el-slider
    :show-tooltip="false"
    v-model="eraser.size"
    :min="1"
    :max="50"
  />
  <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
    <span>柔化</span>
    <span>{{ eraser.softness * 10 }}%</span>
  </div>
  <el-slider
    :show-tooltip="false"
    v-model="eraser.softness"
    :min="0"
    :step="0.1"
    :max="10"
  />
  <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
    <span>透明度</span>
    <span>{{ (eraser.opacity * 100).toFixed(0) }}%</span>
  </div>
  <el-slider
    :show-tooltip="false"
    v-model="eraser.opacity"
    :step="0.01"
    :min="0"
    :max="1"
  />
</template>

<script lang="ts" setup>
import { useEditorStore } from '../../store/useEditorStore';
import { ElSlider } from 'element-plus';

const { eraser } = useEditorStore();
</script>

<style lang="scss" scoped>
.preview-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAEpJREFUSEtjbG7t+c9AAvj69QsJqhkYGEctIBReo0FEKIRGUxHBEBoOQVRR1UBSWcTNzUM4XJBUMI5aQCi8RoOIUAgxjAbRCAgiALRiYElCQgOlAAAAAElFTkSuQmCC');
  background-repeat: repeat;
}
</style>
