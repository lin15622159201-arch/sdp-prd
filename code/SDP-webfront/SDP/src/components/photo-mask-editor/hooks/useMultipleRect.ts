import { fabric } from '@/fabric';
import { TGetCanvas } from '../types';
import useHistory from './useHistory';
import { debounce } from 'lodash-es';
import { BRUSH_COLOR } from '../config';
import { IRectOptions } from '@/fabric/fabric-impl';
import { ref } from 'vue';

export default function useBrush(getCanvas: TGetCanvas, history: ReturnType<typeof useHistory>) {
  const RECT_WIDTH = 200;
  const RECT_HEIGHT = 200;
  /** 当前选中的矩形选区 */
  let activeRectInstance: fabric.Rect | null = null;

  // 尺寸
  const width = ref(RECT_WIDTH);
  const height = ref(RECT_HEIGHT);

  /** 删除 */
  const deleteRect = () => {
    if (!activeRectInstance) return;
    const canvas = getCanvas();
    activeRectInstance.off('scaling');
    activeRectInstance.off('removed');
    canvas.remove(activeRectInstance);
    activeRectInstance = null;
    canvas.renderAll();
  };

  const setRect = (instance: fabric.Rect) => {
    instance.on('scaling', debounce((e) => {
      const { width: w, height: h } = e.transform.target.getBoundingRect(false, true);
      width.value = w!;
      height.value = h!;
      history.addRecord();
    }, 500));
    instance.on('moving', debounce(() => {
      history.addRecord();
    }, 500));
    instance.on('rotating', debounce(() => {
      history.addRecord();
    }, 500));
    instance.on('removed', () => {
      deleteRect();
    });
    activeRectInstance = instance;
    getCanvas().setActiveObject(instance);
  };

  /**
   * 创建矩形选区
   * @param sx 左上角x坐标
   * @param sy 左上角y坐标
   * @param w 宽
   * @param h 高
   * @returns
   */
  const newRect = (sx?: number, sy?: number, w?: number, h?: number) => {
    const position = {} as IRectOptions;
    const nowTiem = new Date().getTime();
    const instance = new fabric.Rect({
      fill: `rgba(${BRUSH_COLOR.r}, ${BRUSH_COLOR.g}, ${BRUSH_COLOR.b}, ${BRUSH_COLOR.a})`,
      width: w ?? RECT_WIDTH,
      height: h ?? RECT_HEIGHT,
      objectCaching: false,
      addRecord: true,
      selectable: true,
      id: `flower-rect-${nowTiem}`,
    } as any);
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
  };

  // 选中矩形框，如果有
  const startRect = () => {
    const canvas = getCanvas();
    let startX = 0;
    let startY = 0;
    let ax = 0;
    let ay = 0;
    canvas.on('mouse:down', (e) => {
      startX = e.pointer?.x || 0;
      startY = e.pointer?.y || 0;
      // 记录矩形起始位置
      ax = e.absolutePointer?.x || 0;
      ay = e.absolutePointer?.y || 0;
    });
    canvas.on('mouse:up', (e) => {
      if (canvas.getActiveObject()) return;
      const endX = e.pointer?.x || 0;
      const endY = e.pointer?.y || 0;
      const diffX = endX - startX;
      const diffY = endY - startY;

      if (diffX > 10 && diffY > 10) {
        const zoom = canvas.getZoom();
        const w = Math.floor(Math.abs(diffX) / zoom);
        const h = Math.floor(Math.abs(diffY) / zoom);
        newRect(ax, ay, w, h);
      }
    });
    canvas.on('selection:created', () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeRectInstance = activeObject;
        width.value = activeRectInstance.width ?? RECT_WIDTH;
        height.value = activeRectInstance.height ?? RECT_HEIGHT;
      } else {
        console.log('No rectangle created');
      }
    });

    canvas.on('selection:updated', () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeRectInstance = activeObject;
        width.value = activeRectInstance.width ?? RECT_WIDTH;
        height.value = activeRectInstance.height ?? RECT_HEIGHT;
      } else {
        console.log('No rectangle selected');
      }
    });

    // 监听取消选择
    canvas.on('selection:cleared', () => {
      width.value = RECT_WIDTH;
      height.value = RECT_HEIGHT;
    });
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Backspace' && activeRectInstance) {
        deleteRect();
      }
    });
  };

  // 取消矩形框，如果有
  const endRect = () => {
    const canvas = getCanvas();
    canvas.off('mouse:down');
    canvas.off('mouse:up');
  };

  const updateRect = () => {
    if (!activeRectInstance) return;
    // 拿出缩放
    const { scaleX, scaleY } = activeRectInstance;
    activeRectInstance.set({
      width: Number(width.value) / (scaleX || 1),
      height: Number(height.value) / (scaleY || 1),
      fill: `rgba(${BRUSH_COLOR.r}, ${BRUSH_COLOR.g}, ${BRUSH_COLOR.b}, ${BRUSH_COLOR.a})`,
      // scaleY: 1,
      // scaleX: 1,
    });
    const canvas = getCanvas();
    canvas.renderAll();
    history.addRecord();
  };

  /**
   *   获取画布上所有矩形选区
   * @returns
   */
  const getAllRectangles = () => {
    const canvas = getCanvas();
    const objects = canvas.getObjects();
    const rectangles = objects.filter((obj) => {
      return obj.type === 'rect' && obj.id?.includes('flower-rect');
    });

    // 返回矩形对象的数组
    return rectangles;
  };

  /**
   * 创建矩形选区
   * @param sx 左上角x坐标
   * @param sy 左上角y坐标
   * @param w 宽
   * @param h 高
   * @returns
   * 已经点击确定按钮创建过一个矩形，则再次点击不能再创建
   */
  const addRect = (sx?: number, sy?: number, w?: number, h?: number) => {
    const rects = getAllRectangles();
    const isHasCenterRect = rects.some(n => n.originX === 'center');
    if (!isHasCenterRect) {
      newRect(sx, sy, w, h);
    } else {
      updateRect();
    }
  };

  /**
   * 清除所有的矩形选区
   */
  const reset = () => {
    if (!activeRectInstance) return;
    const canvas = getCanvas();
    canvas.remove(...getAllRectangles());
    activeRectInstance = null;
    canvas.renderAll();
  };

  return {
    width,
    height,
    addRect,
    deleteRect,
    startRect,
    endRect,
    setRect,
    reset,
  };
}
