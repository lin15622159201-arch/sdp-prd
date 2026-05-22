import { fabric } from 'fabric';
import { ref, watch } from 'vue';
import { hex } from 'color-convert';
import { useMagicKeys } from '@vueuse/core';
// eslint-disable-next-line import/no-cycle
import { TGetCanvas } from '../types';

export default function useBrush(getCanvas: TGetCanvas, initColor = '#fff') {
  // 尺寸
  const size = ref(30);
  // 柔化
  const softness = ref(0);
  // 透明度
  const opacity = ref(0);
  // 颜色
  const color = ref(initColor);
  // 绘制的路径
  // const drawPaths = shallowRef<BaseFabricObject[]>([]);

  // 更新笔刷配置
  const updateBrush = () => {
    const { freeDrawingBrush } = getCanvas();
    if (freeDrawingBrush) {
      const RGB = hex.rgb(color.value);
      freeDrawingBrush.width = size.value;
      freeDrawingBrush.color = `rgb(${RGB[0]},${RGB[1]},${RGB[2]},${1 - opacity.value})`;
      freeDrawingBrush.shadow = new fabric.Shadow({
        color: `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${1 - opacity.value})`,
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
    updateBrush();
  };

  // 结束绘画
  const endDrawing = () => {
    const canvas = getCanvas();
    canvas.isDrawingMode = false;
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

  const init = () => {
    getCanvas().on('path:created', (event) => {
      const { path } = event as any; // event类型定义有问题，先用any重置
      path.set({
        selectable: false,
      });
      getCanvas().renderAll();
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

export type TBrush = ReturnType<typeof useBrush>;
