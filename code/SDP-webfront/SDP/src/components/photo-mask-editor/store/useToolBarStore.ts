import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useEditorStore } from './useEditorStore';

export enum TOOL_ENUM {
  DEFAULT = '',
  /**
   * 画笔
   */
  BRUSH = 'BRUSH',
  /**
   * 橡皮
   */
  ERASER = 'ERASER',
  /**
   * SAM选区
   */
  SAM = 'SAM',
  /**
   * 取消SAM选区
   */
  UNDO_SAM = 'UNDO_SAM',
  /**
   * 矩形选区
   */
  RECT = 'RECT',
  /**
   * 细节识别
   */
  DETAIL_DETECTION = 'DETAIL_DETECTION',
}

export const useToolBarStore = defineStore('toolBarMaskStore', () => {
  const activeTool = ref<TOOL_ENUM>(TOOL_ENUM.DEFAULT);
  const { brush, eraser, dragging, workspace, originImage, rect } = useEditorStore();

  watch(activeTool, (tool, oldTool) => {
    dragging.setDragMode(false);
    switch (oldTool) {
      case TOOL_ENUM.BRUSH:
        brush.endDrawing();
        break;
      case TOOL_ENUM.ERASER:
        eraser.endErasing();
        break;
      case TOOL_ENUM.SAM:
      case TOOL_ENUM.UNDO_SAM:
        originImage.endSAM();
        break;
      case TOOL_ENUM.RECT:
        rect.endRect();
        break;
      default:
        break;
    }
    switch (tool) {
      case TOOL_ENUM.BRUSH:
      case TOOL_ENUM.ERASER:
        if (tool === TOOL_ENUM.BRUSH) {
          brush.startDrawing();
        } else {
          eraser.startErasing();
        }
        break;
      case TOOL_ENUM.SAM:
      case TOOL_ENUM.UNDO_SAM:
        originImage.startSAM(workspace, tool === TOOL_ENUM.SAM ? 'SAM' : 'UNDO_SAM');
        break;
      case TOOL_ENUM.RECT:
        rect.startRect();
        break;
      case TOOL_ENUM.DETAIL_DETECTION:
        break;
      default:
        break;
    }
  });

  const $reset = () => {
    activeTool.value = TOOL_ENUM.DEFAULT;
  };

  return {
    activeTool,
    $reset,
  };
});
