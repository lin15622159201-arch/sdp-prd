import { defineStore } from 'pinia';
import { fabric } from '@/fabric';
import { ref, shallowRef, watch } from 'vue';
import useWorkspace from '../composables/useWorkspace';
import useBrush from '../composables/useBrush';
import useEraser from '../composables/useEraser';
import useBlur from '../composables/useBlur';
import useCrop from '../composables/useCrop';
import useRotate from '../composables/useRotate';
import useDraging from '../composables/useDraging';
import useHistory from '../composables/useHistory';
import useImage from '../composables/useImage';
import useExport from '../composables/useExport';
import useRect from '../composables/useRect';
import { useLoopClearWater } from '../composables/use-loop-clear-water';
import useNoose from '../composables/use-noose';

export const useEditorStore = defineStore('editorStore', () => {
  const getCanvas = () => {
    if (canvas.value) {
      return canvas.value;
    }
    throw new Error('canvas is not defined');
  };

  const canvas = shallowRef<fabric.Canvas>();
  const history = useHistory(getCanvas);
  const workspace = useWorkspace(getCanvas);
  const originImage = useImage(getCanvas, 'originImg');
  const blurImage = useImage(getCanvas, 'blurImage');
  const brush = useBrush(getCanvas);
  const noose = useNoose(getCanvas);
  const eraser = useEraser(getCanvas);
  const blur = useBlur(getCanvas);
  blur.setImage(blurImage);
  const crop = useCrop({ workspace, getCanvas, history, imageHook: originImage });
  const rotate = useRotate(workspace, getCanvas);
  const draging = useDraging(canvas);
  const rect = useRect(getCanvas, history);
  const exportHook = useExport(originImage, workspace, getCanvas);

  const clearWater = useLoopClearWater({
    handleSuccess: (data) => {
      console.log('handleSuccess', data);
      originImage.addImage(data.resImg);
      const c = getCanvas();
      c.getObjects().forEach((obj) => {
        if ((obj as any).id !== 'workspace' && (obj as any).id !== 'originImg') {
          c.remove(obj);
        }
      });
    },
    handleError: (taskStatus) => {
      console.log('handleError', taskStatus);
    },
  });

  const init = async (fabricCanvas: fabric.Canvas, worksSpaceEl: HTMLElement) => {
    canvas.value = fabricCanvas;
    workspace.bindMouseWheel();
    await workspace.initResizeObserve(worksSpaceEl);
    brush.init();
    noose.init();
  };

  const $reset = () => {
    blur.blur.value = 0;
    history.reset();
    workspace?.destroyResizeObserve();
    rect.deleteRect();
    return canvas.value?.dispose();
  };

  let toolRenderCallback: Function[] = [];
  const resetToolRenderCallback = () => {
    toolRenderCallback = [];
  };
  const handleSetToolRenderCallback = (callback: Function) => {
    toolRenderCallback.push(callback);
  };
  const handleClearToolRenderCallback = (callback: Function) => {
    const index = toolRenderCallback.indexOf(callback);
    if (index !== -1) {
      toolRenderCallback.splice(index, 1);
    }
  };

  history.renderCallback.value = () => {
    // 重新设置关联对象，否则响应性会丢失
    getCanvas()
      .getObjects()
      .forEach((obj) => {
        // TODO 类型问题待优化
        const item = obj as any;
        if (item.id === 'workspace') {
          workspace.spaceRect.value = item;
        }
        if (item.id === 'originImg') {
          originImage.image.value = item;
          originImage.computedSize();
        }
        if (item.id === 'blurImage') {
          blurImage.image.value = item;
          blurImage.computedSize();
          blur.setImage(blurImage);
        }
      });

    toolRenderCallback.forEach((callback) => {
      callback();
    });
  };

  watch(canvas, () => {
    if (canvas.value) {
      canvas.value.on('path:created', () => {
        history.addRecord();
      });
    }
  });

  return {
    workspace,
    brush,
    blur,
    eraser,
    crop,
    rotate,
    draging,
    history,
    originImage,
    blurImage,
    exportHook,
    init,
    getCanvas,
    $reset,
    handleSetToolRenderCallback,
    rect,
    clearWater,
    noose,
    handleClearToolRenderCallback,
    resetToolRenderCallback,
  };
});
