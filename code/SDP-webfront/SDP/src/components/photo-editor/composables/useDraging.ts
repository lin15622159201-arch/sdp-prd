import { fabric } from 'fabric';
import { ShallowRef, ref, watch } from 'vue';
import dragImg from '@/assets/photo-edit/icon_drag.png';
import dragingImg from '@/assets/photo-edit/icon_draging.png';

export default function useDraging(canvas: ShallowRef<fabric.Canvas | undefined>) {
  const dragCursor = new Image();
  const dragingCursor = new Image();
  dragCursor.src = dragImg;
  dragingCursor.src = dragingImg;
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

  // 模式切换时，切换鼠标样式
  watch(dragMode, (value) => {
    const cvs = getCanvas();
    if (!value) {
      cvs.defaultCursor = 'default';
    } else {
      cvs.defaultCursor = `url(${dragCursor.src}), auto`;
    }
    cvs.requestRenderAll();
  });

  watch(canvas, (watchCanvas) => {
    if (watchCanvas) {
      watchCanvas.on('mouse:down', (opt) => {
        if (dragMode.value) {
          isDragging = true;
          const cvs = getCanvas();
          cvs.discardActiveObject();
          const { clientX, clientY } = opt.e as MouseEvent;
          lastPosX = clientX;
          lastPosY = clientY;
          cvs.setCursor(`url(${dragingCursor.src}), auto`);
          cvs.requestRenderAll();
        }
      });

      watchCanvas.on('mouse:move', (opt) => {
        if (isDragging) {
          const cvs = getCanvas();
          const { viewportTransform = [] } = cvs;
          const { clientX, clientY } = opt.e as MouseEvent;
          viewportTransform[4] += clientX - lastPosX;
          viewportTransform[5] += clientY - lastPosY;
          lastPosX = clientX;
          lastPosY = clientY;
          cvs.requestRenderAll();
        }
      });

      watchCanvas.on('mouse:up', () => {
        isDragging = false;
        if (dragMode.value) {
          watchCanvas.setCursor(`url(${dragCursor.src}), auto`);
          watchCanvas.requestRenderAll();
        }
      });
    }
  });

  return {
    dragMode,
  };
}
