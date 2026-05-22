import { fabric } from '@/fabric';
import { ref, shallowRef } from 'vue';
import { TGetCanvas } from '../types';

// 画布图像
export default function useImage(getCanvas: TGetCanvas, id: string) {
  const image = shallowRef<fabric.Image>();
  const width = ref(0);
  const height = ref(0);
  const isLockRatio = ref(false);
  // 宽高比
  const ratio = ref(1);

  // 计算宽高和宽高比
  const computedSize = () => {
    width.value = image.value?.getScaledWidth() || 0;
    height.value = image.value?.getScaledHeight() || 0;
    ratio.value = width.value / height.value;
  };

  const addImage = async (url: string, erasable = true, opacity = 1) => new Promise((resolve) => {
    fabric.Image.fromURL(
      url,
      (img) => {
        img.set({
          originX: 'center',
          originY: 'center',
          opacity,
          // @ts-ignore
          erasable,
          id,
          hoverCursor: 'default',
          selectable: false,
          hasControls: false,
          hasBorders: false,
        });
        image.value = img;
        getCanvas().add(img);
        getCanvas().renderAll();
        computedSize();
        resolve(img);
      },
      {
        crossOrigin: 'anonymous',
      },
    );
  });

  // 更新画布
  // 注意：此处有巨坑，直接对元素width、height赋值，只有小于图片原始尺寸才能生效，所以这里用scaleX来缩放
  // 另外,scaleToWidth这个API只能等比缩放，不适用这里的非等比场景
  const updateSize = (newWidth: number, newHeight: number) => {
    if (image.value) {
      const { width: w = -1, height: h = -1 } = image.value;
      image.value.scaleX = Number(newWidth) / w;
      image.value.scaleY = Number(newHeight) / h;
    }
    getCanvas().renderAll();
    computedSize();
  };

  return {
    addImage,
    updateSize,
    computedSize,
    image,
    width,
    height,
    ratio,
    isLockRatio,
  };
}

export type TImage = ReturnType<typeof useImage>;
