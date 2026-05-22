import { fabric } from '@/fabric';
import { ref } from 'vue';
import { TGetCanvas } from '../types';
import useHistory from './useHistory';
import { debounce } from 'lodash-es';
import { BRUSH_COLOR } from '../config';
import { IRectOptions } from '@/fabric/fabric-impl';

export default function useBrush(getCanvas: TGetCanvas, history: ReturnType<typeof useHistory>) {
  // 尺寸
  const width = ref(200);
  const height = ref(200);

  let rectInstance: fabric.Rect | null = null;

  // 选中矩形框，如果有
  const startRect = () => {
    const canvas = getCanvas();
    let startX = 0;
    let startY = 0;
    let ax = 0;
    let ay = 0;
    canvas.on('mouse:down:before', (e) => {
      startX = e.pointer?.x || 0;
      startY = e.pointer?.y || 0;
      // 记录矩形起始位置
      ax = e.absolutePointer?.x || 0;
      ay = e.absolutePointer?.y || 0;
    });
    canvas.on('mouse:up:before', (e) => {
      const endX = e.pointer?.x || 0;
      const endY = e.pointer?.y || 0;
      const diffX = endX - startX;
      const diffY = endY - startY;
      if (!rectInstance) {
        const zoom = canvas.getZoom();
        width.value = Math.floor(Math.abs(diffX) / zoom);
        height.value = Math.floor(Math.abs(diffY) / zoom);
        addRect(ax, ay);
      }
    });
    if (rectInstance) {
      canvas.setActiveObject(rectInstance);
      rectInstance.selectable = true;
      canvas.renderAll();
    }
  };

  // 取消矩形框，如果有
  const endRect = () => {
    const canvas = getCanvas();
    if (rectInstance) {
      rectInstance.selectable = false;
      canvas.discardActiveObject();
      canvas.renderAll();
    }
    canvas.off('mouse:down:before');
    canvas.off('mouse:up:before');
  };

  const updateRect = () => {
    if (!rectInstance) return;
    // 拿出缩放
    const { scaleX, scaleY } = rectInstance;
    rectInstance.set({
      width: Number(width.value) / (scaleX || 1),
      height: Number(height.value) / (scaleY || 1),
      fill: `rgba(${BRUSH_COLOR.r}, ${BRUSH_COLOR.g}, ${BRUSH_COLOR.b}, ${BRUSH_COLOR.a / 255})`,
      // scaleY: 1,
      // scaleX: 1,
    });
    const canvas = getCanvas();
    canvas.renderAll();
    history.addRecord();
  };

  const deleteRect = () => {
    if (!rectInstance) return;
    const canvas = getCanvas();
    rectInstance.off('scaling');
    rectInstance.off('removed');
    canvas.remove(rectInstance);
    rectInstance = null;
    canvas.renderAll();
  };
  const setRect = (instance: fabric.Rect) => {
    if (rectInstance) return;
    rectInstance = instance;
    rectInstance.on('scaling', debounce((e) => {
      if (!e.transform || !e.transform.target) return;
      const { width: w, height: h, scaleX, scaleY } = e.transform.target;
      width.value = w! * scaleX!;
      height.value = h! * scaleY!;
      history.addRecord();
    }, 500));
    rectInstance.on('moving', debounce(() => {
      history.addRecord();
    }, 500));
    rectInstance.on('rotating', debounce(() => {
      history.addRecord();
    }, 500));
    rectInstance.on('removed', () => {
      deleteRect();
    });
    getCanvas().setActiveObject(instance);
  };
  const addRect = (sx: number, sy: number) => {
    if (rectInstance) {
      updateRect();
    } else {
      const instance = new fabric.Rect({
        fill: `rgba(${BRUSH_COLOR.r}, ${BRUSH_COLOR.g}, ${BRUSH_COLOR.b}, ${BRUSH_COLOR.a / 255})`,
        width: Number(width.value),
        height: Number(height.value),
        objectCaching: false,
        addRecord: true,
        id: 'rect',
      } as any);
      const position = {} as IRectOptions;
      if (sx && sy) {
        position.left = sx;
        position.top = sy;
      } else {
        position.originX = 'center';
        position.originY = 'center';
      }
      instance.set({
        ...position,
      });

      const canvas = getCanvas();
      canvas.add(instance);
      setRect(instance);
      canvas.renderAll();
    }
  };

  return {
    width,
    height,
    addRect,
    deleteRect,
    startRect,
    endRect,
    setRect,
  };
}
