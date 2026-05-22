import { fabric } from '@/fabric';
import { ref } from 'vue';
import { TGetCanvas } from '../types';
import useHistory from './useHistory';
import { debounce } from 'lodash-es';
import { RECT_COLOR } from '../config';
import { IRectOptions } from '@/fabric/fabric-impl';

export default function useRect(getCanvas: TGetCanvas, history: ReturnType<typeof useHistory>) {
  // 尺寸
  const width = ref(200);
  const height = ref(200);

  let rectList: fabric.Rect[] = [];

  let rectInstance: fabric.Rect | null = null;

  let isNotAdd = false;

  const getAllRect = () => {
    return rectList;
  };

  const clear = () => {
    const canvas = getCanvas();
    rectList.forEach((rect) => {
      console.log(rect);
      canvas.remove(rect);
    });

    rectList = [];
    rectInstance = null;

    canvas.off('mouse:down:before');
    canvas.off('mouse:up:before');
  };

  // 取消矩形框，如果有
  const endRect = () => {
    const canvas = getCanvas();

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
      fill: `rgba(${RECT_COLOR.r}, ${RECT_COLOR.g}, ${RECT_COLOR.b}, ${RECT_COLOR.a})`,
      // scaleY: 1,
      // scaleX: 1,
    });
    const canvas = getCanvas();
    canvas.renderAll();
    history.addRecord();
  };

  const deleteRect = () => {
    if (!rectInstance) return;
    rectList.splice(rectList.indexOf(rectInstance), 1);
    const canvas = getCanvas();
    rectInstance.off('scaling');
    rectInstance.off('removed');
    canvas.remove(rectInstance);
    rectInstance = null;
    canvas.renderAll();
  };

  const movingRecord = debounce(() => {
    history.addRecord();
  }, 500);

  const instanceScaling = debounce((e) => {
    if (!e.transform || !e.transform.target) return;
    const { width: w, height: h, scaleX, scaleY } = e.transform.target;
    width.value = w! * scaleX!;
    height.value = h! * scaleY!;
    history.addRecord();
  }, 500);

  const setRect = (instance: fabric.Rect) => {
    // if (rectInstance) return;
    rectInstance = instance;
    rectInstance.on('mousedown', (e) => {
      rectInstance = instance;
    });
    rectInstance.on('scaling', (e) => {
      isNotAdd = true;
      instanceScaling(e);
    });
    rectInstance.on('moving', () => {
      console.log('moving');
      isNotAdd = true;
      movingRecord();
    });
    rectInstance.on('rotating', debounce(() => {
      history.addRecord();
    }, 500));
    rectInstance.on('removed', () => {
      deleteRect();
    });
    getCanvas().setActiveObject(instance);
  };
  const addRect = (sx: number, sy: number) => {
    const instance = new fabric.Rect({
      fill: `rgba(${RECT_COLOR.r}, ${RECT_COLOR.g}, ${RECT_COLOR.b}, ${RECT_COLOR.a})`,
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
    rectList.push(instance);
    setRect(instance);
    canvas.renderAll();
  };

  // 选中矩形框，如果有
  const startRect = () => {
    const canvas = getCanvas();
    let startX = 0;
    let startY = 0;
    let ax = 0;
    let ay = 0;
    rectList = [];
    rectInstance = null;
    canvas.on('mouse:down:before', (e) => {
      startX = e.pointer?.x || 0;
      startY = e.pointer?.y || 0;
      // 记录矩形起始位置
      ax = e.absolutePointer?.x || 0;
      ay = e.absolutePointer?.y || 0;

      console.log('start', startX, startY);
    });
    canvas.on('mouse:up:before', (e) => {
      const endX = e.pointer?.x || 0;
      const endY = e.pointer?.y || 0;
      const diffX = endX - startX;
      const diffY = endY - startY;
      const zoom = canvas.getZoom();
      if (diffX === 0 || diffY === 0) {
        return;
      }
      if (isNotAdd) {
        isNotAdd = false;
        return;
      }
      width.value = Math.floor(Math.abs(diffX) / zoom);
      height.value = Math.floor(Math.abs(diffY) / zoom);
      addRect(ax, ay);
      console.log('end', endX, endY);
      // if (!rectInstance) {

      // }
    });
  };

  return {
    width,
    height,
    addRect,
    deleteRect,
    startRect,
    endRect,
    setRect,
    getAllRect,
    clear,
  };
}
