<template>
  <div>
    <div
      class="tw-text-[14px] tw-color-[#18181A] tw-font-bold tw-mb-[11px]"
    >
      涂抹添加
    </div>
    <div
      class="preview-bg tw-h-[105px] tw-my-[12px] tw-w-full
        tw-bg-[#787A80] tw-rounded-[3px] tw-flex tw-items-center tw-justify-center"
    >
      <div
        class="tw-rounded-full tw-flex"
        :style="{
          backgroundColor: brush.color,
          opacity: 1 - brush.opacity,
          width: `${brush.size}px`,
          height: `${brush.size}px`,
          border: `${brush.softness === 0 ? '2px solid #fff' : 'none'}`,
          boxShadow: `0px 0px ${brush.softness}px ${brush.softness}px ${brush.color}`,
        }"
      />
    </div>
    <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
      <span>尺寸</span>
      <span>{{ brush.size }}px</span>
    </div>
    <el-slider
      :show-tooltip="false"
      v-model="brush.size"
      :min="1"
      :max="100"
    />
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '../../store/useEditorStore';
import { ElSlider } from 'element-plus';

const { brush } = useEditorStore();
</script>

<style lang="scss" scoped>
.preview-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAEpJREFUSEtjbG7t+c9AAvj69QsJqhkYGEctIBReo0FEKIRGUxHBEBoOQVRR1UBSWcTNzUM4XJBUMI5aQCi8RoOIUAgxjAbRCAgiALRiYElCQgOlAAAAAElFTkSuQmCC');
  background-repeat: repeat;
}
</style>
