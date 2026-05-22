<template>
  <div>
    <div
      class="tw-text-[14px] tw-color-[#18181A] tw-font-bold tw-mb-[11px]"
    >
      画笔
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
      :max="50"
    />
    <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
      <span>柔化</span>
      <span>{{ brush.softness * 10 }}%</span>
    </div>
    <el-slider
      :show-tooltip="false"
      v-model="brush.softness"
      :min="0"
      :step="0.1"
      :max="10"
    />
    <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
      <span>透明度</span>
      <span>{{ (brush.opacity * 100).toFixed(0) }}%</span>
    </div>
    <el-slider
      :show-tooltip="false"
      v-model="brush.opacity"
      :step="0.01"
      :min="0"
      :max="1"
    />
    <div class="tw-text-[14px] tw-mt-[21px] tw-mb-[11px] tw-color-[#18181A] tw-flex tw-justify-between">
      <span>颜色</span>
    </div>
    <color-picker
      v-model:pureColor="brush.color"
      :is-widget="true"
      :disable-alpha="true"
      picker-type="chrome"
      :round-history="true"
      :disable-history="true"
      format="hex"
    />
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '../../store/useEditorStore';
import { ElSlider } from 'element-plus';
import { ColorPicker } from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

const { brush } = useEditorStore();
</script>

<!-- 重写颜色组件样式 -->
<style lang="scss">
.vc-colorpicker--container {
  padding: 0 !important;
}
.vc-colorpicker {
  width: 100% !important;
  box-shadow: none !important;
}
.vc-input-toggle {
  display: none;
}
.chrome-sliders {
  margin-left: 0 !important;
}
.vc-saturation__chrome,
.vc-saturation__white,
.vc-saturation__black {
  border-radius: 5px;
}
.vc-color-input input {
  border: 1px solid #d8dbe6 !important;
  border-radius: 2px !important;
  color: #18181a !important;
  background-color: #fff !important;
}
.vc-display .color-cube {
  border: 1px solid #d8dbe6 !important;
}
.vc-display .vc-current-color {
  box-shadow: none !important;
}
</style>

<style lang="scss" scoped>
.preview-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAEpJREFUSEtjbG7t+c9AAvj69QsJqhkYGEctIBReo0FEKIRGUxHBEBoOQVRR1UBSWcTNzUM4XJBUMI5aQCi8RoOIUAgxjAbRCAgiALRiYElCQgOlAAAAAElFTkSuQmCC');
  background-repeat: repeat;
}
</style>
