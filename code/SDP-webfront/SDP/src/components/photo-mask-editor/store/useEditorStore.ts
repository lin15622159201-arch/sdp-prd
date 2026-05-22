import { defineStore } from 'pinia';
import { fabric } from '@/fabric';
import { shallowRef, watch } from 'vue';
import useWorkspace from '../hooks/useWorkspace';
import useBrush from '../hooks/useBrush';
import useEraser from '../hooks/useEraser';
import useDragging from '../hooks/useDragging';
import useHistory from '../hooks/useHistory';
import useImage from '../hooks/useImage';
import useExport from '../hooks/useExport';
import useFilter from '../hooks/useFilter';
import useRect from '../hooks/useRect';
import useMultipleRect from '../hooks/useMultipleRect';

export const useEditorStore = defineStore('editorMaskStore', () => {
  const getCanvas = () => {
    if (canvas.value) {
      return canvas.value;
    }
    throw new Error('canvas is not defined');
  };

  const canvas = shallowRef<fabric.Canvas>();
  const history = useHistory(getCanvas);
  const imageFilters = useFilter();
  const workspace = useWorkspace(getCanvas);
  const originImage = useImage(getCanvas, { id: 'originImg' });
  const maskImage = useImage(getCanvas, {
    id: 'maskImg',
    filters: [imageFilters.createMaskFilter()],
    erasable: true,
  });
  const brush = useBrush(getCanvas);
  const eraser = useEraser(getCanvas);
  const dragging = useDragging(canvas);
  const exportHook = useExport(originImage, workspace, getCanvas);
  const rect = useRect(getCanvas, history);
  /** 多个矩形选区 */
  const multipleRect = useMultipleRect(getCanvas, history);

  const init = (fabricCanvas: fabric.Canvas, worksSpaceEl: HTMLElement) => {
    canvas.value = fabricCanvas;
    workspace.bindMouseWheel();
    workspace.initResizeObserve(worksSpaceEl);
  };

  const $reset = () => {
    history.reset();
    rect.deleteRect();
    return canvas.value?.dispose();
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
      });
  };

  watch(canvas, () => {
    if (canvas.value) {
      canvas.value.on('path:created', (e: any) => {
        e.path.selectable = false;
        history.addRecord();
      });
      canvas.value.on('object:added', (e: any) => {
        // 返回上一步时，如果有矩形，设置矩形对象实例信息。
        if (e.target.id === 'rect') {
          rect.setRect(e.target);
        }
        // 返回上一步时，如果有矩形，设置矩形对象实例信息。
        if (e.target.id?.includes('flower-rect')) {
          multipleRect.setRect(e.target);
        }
        if (e.target?.addRecord) {
          history.addRecord();
        }
      });
    }
  });

  return {
    workspace,
    brush,
    eraser,
    dragging,
    history,
    originImage,
    maskImage,
    exportHook,
    init,
    getCanvas,
    $reset,
    rect,
    multipleRect,
  };
});
