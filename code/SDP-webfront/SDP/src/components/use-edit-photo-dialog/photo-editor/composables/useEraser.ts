import { useMagicKeys } from '@vueuse/core';
import { fabric } from '@/fabric';
import { ref, watch } from 'vue';
import { TGetCanvas } from '../types';
import { hex } from 'color-convert';

export default function useEraser(getCanvas: TGetCanvas) {
  // 尺寸
  const size = ref(30);
  // 柔化
  const softness = ref(0);
  // 透明度
  const opacity = ref(0);
  const color = ref('#000');
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

  // 开始擦除
  const startErasing = () => {
    const canvas = getCanvas();
    canvas.isDrawingMode = true;
    // @ts-ignore
    const pencilBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush = pencilBrush;
    canvas.freeDrawingBrush.width = size.value;
  };

  // 结束擦除
  const endErasing = () => {
    getCanvas().isDrawingMode = false;
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

  watch([size, softness, opacity], () => {
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

  return {
    size,
    softness,
    opacity,
    color,
    startErasing,
    endErasing,
    plus,
    minus,
  };
}

export type TEraser = ReturnType<typeof useEraser>;
