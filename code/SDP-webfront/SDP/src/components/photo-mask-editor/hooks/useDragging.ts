import { fabric } from '@/fabric';
import { ShallowRef, ref, watch } from 'vue';
import dragImg from '@/assets/photo-edit/icon_drag.png';
import draggingImg from '@/assets/photo-edit/icon_draging.png';

export default function useDragging(canvas: ShallowRef<fabric.Canvas | undefined>) {
  const dragCursor = new Image();
  const draggingCursor = new Image();
  dragCursor.src = dragImg;
  draggingCursor.src = draggingImg;
  const getCanvas = () => {
    if (canvas.value) {
      return canvas.value;
    }
    throw new Error('canvas is not defined');
  };

  const dragMode = ref(false);

  let lastPosX = 0;
  let lastPosY = 0;
  let isDragging = false;

  const setDragMode = (value: boolean) => {
    dragMode.value = value;
  };

  // 模式切换时，切换鼠标样式
  watch(dragMode, (value) => {
    const cas = getCanvas();
    if (!value) {
      cas.defaultCursor = 'default';
    } else {
      cas.defaultCursor = `url(${dragCursor.src}), auto`;
    }
    cas.requestRenderAll();
  });

  watch(canvas, (value) => {
    if (value) {
      value.on('mouse:down', (opt) => {
        if (dragMode.value) {
          isDragging = true;
          const cas = getCanvas();
          cas.discardActiveObject();
          const { clientX, clientY } = opt.e as MouseEvent;
          lastPosX = clientX;
          lastPosY = clientY;
          cas.setCursor(`url(${draggingCursor.src}), auto`);
          cas.requestRenderAll();
        }
      });

      value.on('mouse:move', (opt) => {
        if (isDragging) {
          const cas = getCanvas();
          const { viewportTransform = [] } = cas;
          const { clientX, clientY } = opt.e as MouseEvent;
          viewportTransform[4] += clientX - lastPosX;
          viewportTransform[5] += clientY - lastPosY;
          lastPosX = clientX;
          lastPosY = clientY;
          cas.requestRenderAll();
        }
      });

      value.on('mouse:up', () => {
        isDragging = false;
        if (dragMode.value) {
          value.setCursor(`url(${dragCursor.src}), auto`);
          value.requestRenderAll();
        }
      });
    }
  });

  return {
    dragMode,
    setDragMode,
  };
}
