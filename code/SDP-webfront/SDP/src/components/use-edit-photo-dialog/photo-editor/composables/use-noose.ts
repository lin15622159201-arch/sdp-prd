import { fabric } from '@/fabric';
import { ref, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';
// eslint-disable-next-line import/no-cycle
import { TGetCanvas } from '../types';
import { RECT_COLOR } from '../config';

export default function useNoose(getCanvas: TGetCanvas, initColor = '#fff') {
  // 尺寸
  const size = ref(4);
  // 柔化
  const softness = ref(0);
  // 透明度
  const opacity = ref(0);
  // 颜色
  const color = ref(initColor);
  let isStop = true;
  // 绘制的路径
  // const drawPaths = shallowRef<BaseFabricObject[]>([]);

  // 更新笔刷配置
  const updateBrush = () => {
    const { freeDrawingBrush } = getCanvas();
    if (freeDrawingBrush) {
      const RGB = RECT_COLOR;
      freeDrawingBrush.width = size.value;
      freeDrawingBrush.color = `rgb(${RGB.r},${RGB.g},${RGB.b},${RGB.a})`;
      freeDrawingBrush.shadow = new fabric.Shadow({
        color: `rgb(${RGB.r},${RGB.g},${RGB.b},${RGB.a})`,
        blur: softness.value,
      });
      getCanvas().freeDrawingCursor = `url(${getDrawCursor()}) ${size.value / 2} ${size.value / 2}, crosshair`;
    }
  };

  // 开始绘画
  const startDrawing = () => {
    const canvas = getCanvas();
    canvas.isDrawingMode = true;
    const pencilBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush = pencilBrush;
    isStop = false;
    updateBrush();
  };

  // 结束绘画
  const endDrawing = () => {
    const canvas = getCanvas();
    canvas.isDrawingMode = false;
    isStop = true;
  };

  const getDrawCursor = () => {
    const circle = `
      <svg
        height="${size.value}"
        width="${size.value}"
        fill="#C0C3CC"
        viewBox="0 0 ${size.value * 2} ${size.value * 2}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="${size.value}"
          cy="${size.value}"
          r="${size.value / 2}"
          stroke="white"
          stroke-width="3"
        />
      </svg>
    `;
    return `data:image/svg+xml;base64,${window.btoa(circle)}`;
  };

  const getPaths = () => getCanvas()
    .getObjects()
    .filter(item => item.type === 'path');

  watch([size, softness, opacity, color], () => {
    updateBrush();
  });

  // 增加尺寸
  const plus = (step = 1) => {
    size.value += step;
  };
  // 减小尺寸
  const minus = (step = 1) => {
    size.value -= step;
  };

  const { Minus, Equal } = useMagicKeys();
  watch(Equal, () => {
    plus();
  });
  watch(Minus, () => {
    minus();
  });

  // 闭合路径函数
  function pathToString(path: string[][]) {
    return `${path.map(point => point.join(' ')).join(' ')} z`;
  }

  const init = () => {
    getCanvas().on('path:created', (event) => {
      if (isStop) return;
      const canvas = getCanvas();
      const { path } = event as any; // event类型定义有问题，先用any重置
      path.set({
        selectable: false,
      });

      const pathStr = pathToString(path.path);

      const newPath = new fabric.Path(pathStr);

      newPath.set({
        fill: `rgb(${RECT_COLOR.r},${RECT_COLOR.g},${RECT_COLOR.b},${RECT_COLOR.a})`,
        opacity: RECT_COLOR.a,
        selectable: false,
      });

      canvas.add(newPath);

      canvas.remove(path);

      canvas.renderAll();
    });
  };

  return {
    size,
    softness,
    opacity,
    color,
    startDrawing,
    endDrawing,
    plus,
    minus,
    getPaths,
    init,
  };
}

export type TNoose = ReturnType<typeof useNoose>;
