import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useEditorStore } from './useEditorStore';

/**
 * 消除花型褶皱
 */

export enum FLOWER_LEFT_TOOL_ENUM {
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
}

export const useFlowerRemoveWrinklesToolBarStore = defineStore('flowerRemoveWrinklesToolBarMaskStore', () => {
  const activeTool = ref<FLOWER_LEFT_TOOL_ENUM>(FLOWER_LEFT_TOOL_ENUM.DEFAULT);
  const { brush, eraser, dragging, multipleRect } = useEditorStore();

  watch(activeTool, (tool, oldTool) => {
    dragging.setDragMode(false);
    switch (oldTool) {
      case FLOWER_LEFT_TOOL_ENUM.BRUSH:
        brush.endDrawing();
        break;
      case FLOWER_LEFT_TOOL_ENUM.ERASER:
        eraser.endErasing();
        break;
      case FLOWER_LEFT_TOOL_ENUM.SAM:
      case FLOWER_LEFT_TOOL_ENUM.UNDO_SAM:
        // originImage.endSAM();
        break;
      case FLOWER_LEFT_TOOL_ENUM.RECT:
        multipleRect.endRect();
        break;
      default:
        break;
    }
    switch (tool) {
      case FLOWER_LEFT_TOOL_ENUM.BRUSH:
      case FLOWER_LEFT_TOOL_ENUM.ERASER:
        if (tool === FLOWER_LEFT_TOOL_ENUM.BRUSH) {
          brush.startDrawing();
        } else {
          eraser.startErasing();
        }
        break;
      case FLOWER_LEFT_TOOL_ENUM.SAM:
      case FLOWER_LEFT_TOOL_ENUM.UNDO_SAM:
        // originImage.startSAM(workspace, tool === FLOWER_LEFT_TOOL_ENUM.SAM ? 'SAM' : 'UNDO_SAM');
        break;
      case FLOWER_LEFT_TOOL_ENUM.RECT:
        multipleRect.startRect();
        break;
      default:
        break;
    }
  });

  const $reset = () => {
    activeTool.value = FLOWER_LEFT_TOOL_ENUM.DEFAULT;
  };

  return {
    activeTool,
    $reset,
  };
});
