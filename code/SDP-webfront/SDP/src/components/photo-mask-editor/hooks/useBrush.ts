import { fabric } from '@/fabric';
import { ref, watch } from 'vue';
import { hex, rgb } from 'color-convert';
import { useMagicKeys } from '@vueuse/core';
import { TGetCanvas } from '../types';
import { BRUSH_COLOR } from '../config';

export default function useBrush(getCanvas: TGetCanvas) {
  // 尺寸
  const size = ref(30);
  // 显示画笔的尺寸
  const cursorSize = ref(30);
  // 柔化
  const softness = ref(0);
  // 透明度
  const opacity = ref(0.5);
  // 颜色
  const color = ref(rgb.hex([BRUSH_COLOR.r, BRUSH_COLOR.g, BRUSH_COLOR.b]));

  // 更新笔刷配置
  const updateBrush = () => {
    const canvas = getCanvas();
    const { freeDrawingBrush } = canvas;
    const zoom = canvas.getZoom();
    cursorSize.value = (size.value * zoom) * 2;
    if (freeDrawingBrush) {
      const RGB = hex.rgb(color.value);
      freeDrawingBrush.width = size.value;
      freeDrawingBrush.color = `rgb(${RGB[0]},${RGB[1]},${RGB[2]},${1 - opacity.value})`;
      freeDrawingBrush.shadow = new fabric.Shadow({
        color: `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${1 - opacity.value})`,
        blur: softness.value,
      });
      canvas.freeDrawingCursor = `url(${getDrawCursor()}) ${cursorSize.value / 2} ${cursorSize.value / 2}, crosshair`;
    }
  };

  // 开始绘画
  const startDrawing = () => {
    const canvas = getCanvas();
    canvas.isDrawingMode = true;
    const pencilBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush = pencilBrush;
    updateBrush();
    canvas.on('after:render', () => {
      updateBrush();
    });
  };

  // 结束绘画
  const endDrawing = () => {
    const canvas = getCanvas();
    canvas.isDrawingMode = false;
    getCanvas().off('after:render');
  };

  const getDrawCursor = () => {
    const circle = `
      <svg
        height="${cursorSize.value}"
        width="${cursorSize.value}"
        fill="#C0C3CC"
        viewBox="0 0 ${cursorSize.value * 2} ${cursorSize.value * 2}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="${cursorSize.value}"
          cy="${cursorSize.value}"
          r="${cursorSize.value / 2}"
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
  };
}
