<template>
  <!-- 左侧面板 -->
  <div class="tw-bg-white tw-px-[7px] tw-mr-[1px]">
    <icon-button
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[64px]"
      :icon="IconCut"
      :active-icon="IconCutActive"
      text="裁剪"
      :active="toolbarStore.activeTool === TOOL_ENUM.croping"
      @click="toolbarStore.activeTool = TOOL_ENUM.croping"
    />
    <!--    <icon-button
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[64px]"
      :icon="IconRotate"
      :active-icon="IconRotateActive"
      text="旋转"
      :active="toolbarStore.activeTool === TOOL_ENUM.rotate"
      @click="toolbarStore.activeTool = TOOL_ENUM.rotate"
    />
    <icon-button
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[64px]"
      :icon="IconBrush"
      :active-icon="IconBrushActive"
      text="画笔"
      :active="toolbarStore.activeTool === TOOL_ENUM.brush"
      @click="toolbarStore.activeTool = TOOL_ENUM.brush"
    />
    <icon-button
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[64px]"
      :icon="IconEraser"
      :active-icon="IconEraserActive"
      text="橡皮"
      :active="toolbarStore.activeTool === TOOL_ENUM.eraser"
      @click="toolbarStore.activeTool = TOOL_ENUM.eraser"
    />
    <icon-button
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[64px]"
      :icon="IconReset"
      :active-icon="IconResetActive"
      text="重置"
      :active="toolbarStore.activeTool === TOOL_ENUM.reset"
      @click="toolbarStore.activeTool = TOOL_ENUM.reset"
    />
    <icon-button
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[64px]"
      :icon="IconCanvas"
      :active-icon="IconCanvas"
      text="画布"
      :active="toolbarStore.activeTool === TOOL_ENUM.canvas"
      @click="toolbarStore.activeTool = TOOL_ENUM.canvas"
    />-->
    <icon-button
      v-if="editorStore.blurImage.image"
      class="tw-my-[16px] tw-py-[6px] tw-w-[64px] tw-h-[64px]"
      :icon="IconBlur"
      :active-icon="IconCanvas"
      text="背景虚化"
      :active="toolbarStore.activeTool === TOOL_ENUM.blur"
      @click="
        () => {
          toolbarStore.activeTool = TOOL_ENUM.blur;
          editorStore.blur.applyBlur();
        }
      "
    />
  </div>
  <!-- 属性面板 -->
  <div class="tw-w-[256px] tw-bg-white tw-p-[14px] tw-mr-[1px] tw-relative" v-show="toolbarStore.activeTool">
    <cropping-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.croping" />
    <brush-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.brush" />
    <eraser-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.eraser" />
    <rotate-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.rotate" />
    <reset-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.reset" />
    <canvas-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.canvas" />
    <blur-config-panel v-if="toolbarStore.activeTool === TOOL_ENUM.blur" />
  </div>
</template>

<script setup lang="ts">
import croppingConfigPanel from '../cropping-config-panel/index.vue';
import brushConfigPanel from '../brush-config-panel/index.vue';
import eraserConfigPanel from '../eraser-config-panel/index.vue';
import rotateConfigPanel from '../rotate-config-panel/index.vue';
import resetConfigPanel from '../reset-config-panel/index.vue';
import canvasConfigPanel from '../canvas-config-panel/index.vue';
import blurConfigPanel from '../blur-config-panel/index.vue';
import IconCut from '@/assets/photo-edit/icon_cut.png';
import IconCutActive from '@/assets/photo-edit/icon_cut_active.png';
// import IconRotate from '@/assets/photo-edit/icon_rotate.png';
// import IconRotateActive from '@/assets/photo-edit/icon_rotate_active.png';
// import IconReset from '@/assets/photo-edit/icon_reset.png';
// import IconResetActive from '@/assets/photo-edit/icon_reset_active.png';
import IconCanvas from '@/assets/photo-edit/icon_canvas.png';
import IconBlur from '@/assets/photo-edit/icon_blur.png';
import IconButton from '../icon-button/index.vue';
// import IconEraser from '@/assets/photo-edit/icon_eraser.png';
// import IconEraserActive from '@/assets/photo-edit/icon_eraser_active.png';
// import IconBrush from '@/assets/photo-edit/icon_brush.png';
// import IconBrushActive from '@/assets/photo-edit/icon_brush_active.png';
import { useToolBarStore, TOOL_ENUM } from '../../store/useToolBarStore';
import { useEditorStore } from '../../store/useEditorStore';

const toolbarStore = useToolBarStore();
const editorStore = useEditorStore();
</script>
