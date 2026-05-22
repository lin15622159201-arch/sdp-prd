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
  /**
   * 取消水印
   */
  UN_WATERMARK = 'UN_WATERMARK',
}

export const useToolBarStore = defineStore('toolBarStore', () => {
  const activeTool = ref<TOOL_ENUM>(TOOL_ENUM.defalut);
  const {
    brush, eraser, crop, draging,
    handleSetToolRenderCallback, handleClearToolRenderCallback } = useEditorStore();

  const renderTool = (tool: TOOL_ENUM) => {
    console.log('render', tool);
    tool === TOOL_ENUM.croping ? crop.startCrop() : crop.endCrop();
  };

  const render = () => renderTool(activeTool.value);

  handleSetToolRenderCallback(render);

  // TODO 优化策略
  watch(activeTool, (tool) => {
    renderTool(tool);
  });

  const $reset = () => {
    activeTool.value = TOOL_ENUM.defalut;
    handleClearToolRenderCallback(render);
    handleSetToolRenderCallback(render);
  };

  return {
    activeTool,
    $reset,
  };
});
