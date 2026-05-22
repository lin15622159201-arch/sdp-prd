import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useEditorStore } from './useEditorStore';

export enum TOOL_ENUM {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  defalut = '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  croping = 'croping',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  rotate = 'rotate',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  brush = 'brush',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  eraser = 'eraser',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  reset = 'reset',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  canvas = 'canvas',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  blur = 'blur',
}

export const useToolBarStore = defineStore('toolBarStore', () => {
  const activeTool = ref<TOOL_ENUM>(TOOL_ENUM.defalut);
  const { brush, eraser, crop, draging } = useEditorStore();

  // TODO 优化策略
  watch(activeTool, (tool) => {
    tool === TOOL_ENUM.croping ? crop.startCrop() : crop.endCrop();
    if (tool === TOOL_ENUM.brush) {
      draging.dragMode = false;
      brush.startDrawing();
    }
    if (tool === TOOL_ENUM.eraser) {
      draging.dragMode = false;
      eraser.startErasing();
    }
    if (tool !== TOOL_ENUM.brush && tool !== TOOL_ENUM.eraser) {
      brush.endDrawing();
      eraser.endErasing();
    }
  });

  const $reset = () => {
    activeTool.value = TOOL_ENUM.defalut;
  };

  return {
    activeTool,
    $reset,
  };
});
