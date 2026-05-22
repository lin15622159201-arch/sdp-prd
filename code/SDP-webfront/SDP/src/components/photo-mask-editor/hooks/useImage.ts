import { fabric } from '@/fabric';
import { ref, shallowRef, UnwrapRef } from 'vue';
import { TGetCanvas } from '../types';
import { throttle } from 'lodash-es';
import useSam from './useSam';
import useWorkspace from './useWorkspace';
import { imageToImageData, imageDataToDataUrl } from '@/core/utils/image';
import { BRUSH_COLOR, GRAY_BOUNDARY } from '../config';

interface ImageOptions {
  id: string;
  url?: string;
  erasable?: boolean;
  opacity?: number;
  filters?: fabric.IBaseFilter[];
}
interface ISamMask {
  [key: number]: fabric.Image;
}
// 画布图像
export default function useImage(getCanvas: TGetCanvas, options: ImageOptions) {
  const image = shallowRef<fabric.Image>();
  const imageUrl = ref('');
  const width = ref(0);
  const height = ref(0);
  const isLockRatio = ref(false);
  const activeMask: ISamMask = {};
  let operateType: 'SAM' | 'UNDO_SAM' = 'SAM';
  let inited = false;
  const samHook = useSam();
  // 宽高比
  const ratio = ref(1);

  // 计算宽高和宽高比
  const computedSize = () => {
    width.value = image.value?.getScaledWidth() || 0;
    height.value = image.value?.getScaledHeight() || 0;
    ratio.value = width.value / height.value;
  };

  const addImage = async (url: string) => new Promise((resolve) => {
    fabric.Image.fromURL(
      url,
      (img) => {
        img.set({
          originX: 'center',
          originY: 'center',
          opacity: options.opacity,
          // @ts-ignore
          erasable: options.erasable,
          id: options.id,
          hoverCursor: 'default',
          selectable: false,
        });
        if (options.filters) {
          img.filters = options.filters;
          img.applyFilters();
        }
        image.value = img;
        imageUrl.value = url;
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

  const updateImage = async (url: string) => {
    const canvas = getCanvas();
    if (image.value) {
      canvas.remove(image.value);
    }
    await addImage(url);
  };

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

  const remove = () => {
    if (image.value) {
      getCanvas().remove(image.value);
      getCanvas().renderAll();
    }
  };

  // 删除选取中的内容
  const updateMask = async (
    workspace: UnwrapRef<ReturnType<typeof useWorkspace>>,
    maskPixel: Uint8Array,
    type: 'ADD' | 'REMOVE',
    maskAlphaPixel?: Uint8Array,
  ) => {
    const canvas = getCanvas();
    const objs = canvas.getObjects();
    // 缓存原图&隐藏原图
    const originImg = objs.find((item: any) => item.id === 'originImg')!;
    originImg.set({
      opacity: 0,
    });
    // 缓存缩放比例&设置缩放比例为1
    const cacheZoomRation = workspace.zoomRatio;
    workspace.zoomToPoint(1);
    const { viewportTransform = [] } = canvas;
    const { width: w, height: h } = workspace.spaceRect;
    const { top, left } = workspace.spaceRect.getBoundingRect(true);
    // 获取图片
    const dataURL = canvas.toDataURL({
      width: w!,
      height: h!,
      // -0.5是为了生成图片时，图片偏右下角
      left: left + viewportTransform[4] + 0.5,
      top: top + viewportTransform[5] + 0.5,
      format: 'png',
    });
    // 回复原图
    originImg.set({
      opacity: 1,
    });
    workspace.zoomToPoint(cacheZoomRation);
    // 获取当前mask图片数据
    const imageData = await imageToImageData(dataURL);
    const { data } = imageData;

    const hasAlpha = !!maskAlphaPixel && maskAlphaPixel.length > 0;

    for (let i = 0; i < data.length; i += 4) {
      const pixelValue = maskPixel[i / 4];
      const a = data[i + 3];
      data[i] = BRUSH_COLOR.r;
      data[i + 1] = BRUSH_COLOR.g;
      data[i + 2] = BRUSH_COLOR.b;

      const alphaPixelValue = hasAlpha ? maskAlphaPixel[i / 4] : 0;
      const alpha = hasAlpha && alphaPixelValue < GRAY_BOUNDARY.VALUE
        ? Math.floor((alphaPixelValue * BRUSH_COLOR.a) / 255) : BRUSH_COLOR.a;

      switch (type) {
        case 'ADD':
          // 当前编辑的mask没有透明度 && 当前鼠标悬浮的mask区域为0（0代表不选中，1代表选中）
          if (a === 0 && !pixelValue) {
            data[i + 3] = 0;
          } else {
            // 当前鼠标悬浮的mask区域为1 则 透明度相加 与 配置透明度 中取最小值
            // 当前鼠标悬浮的mask区域为0 则 取当前编辑的mask的透明度
            data[i + 3] = pixelValue ? Math.min(alpha + a, BRUSH_COLOR.a) : a;
          }
          break;
        case 'REMOVE':
          // 当前编辑的mask没有透明度 或 当前鼠标悬浮的mask区域为0，则 透明度不变
          if (a === 0 || !pixelValue) {
            data[i + 3] = a;
            break;
          }
          // 当前编辑的mask透明度 等于 当前鼠标悬浮的mask区域的透明度，则 透明度直接设置为0
          // 或 当前编辑的mask透明度 小于 设置的透明度 则 透明度直接设置为0
          // 否则 鼠标悬浮的mask区域透明度 减 配置透明度 取绝对值（使保留下来的边缘向外渐变，变浅）
          data[i + 3] = (alpha === a || a < BRUSH_COLOR.a) ? 0 : Math.abs(alpha - BRUSH_COLOR.a);
          break;
        default:
          break;
      }
    }
    const newDataURL = imageDataToDataUrl(imageData);
    // 删除其他内容
    objs.forEach((item: any) => {
      if (item.id !== 'workspace' && item.id !== 'originImg') {
        canvas.remove(item);
      }
    });
    fabric.Image.fromURL(newDataURL, (img: any) => {
      img.set({
        originX: 'center',
        originY: 'center',
        hoverCursor: 'default',
        selectable: false,
        addRecord: true,
      });
      canvas.add(img);
    });
    canvas.renderAll();
  };

  // 手动触发更新mask图
  const dispatchUpdateMask = async (
    workspace: UnwrapRef<ReturnType<typeof useWorkspace>>,
    url: string,
    type: 'ADD' | 'REMOVE',
  ) => {
    const imageData = await imageToImageData(url);
    const {
      pixels,
      alphaPixels,
    } = samHook.imageData2Pixels(imageData);
    updateMask(workspace, pixels, type, alphaPixels);
  };

  const initSAM = (workspace: UnwrapRef<ReturnType<typeof useWorkspace>>) => {
    if (!image.value) return;
    let activeIndex = -1;
    let hoverMaskImage: fabric.Image;
    getCanvas().on(
      'mouse:move',
      throttle((event) => {
        const { top, left } = image.value!.getBoundingRect(false, true);
        const zoomRatio = workspace.zoomRatio || 1;
        const x = event.e.offsetX;
        const y = event.e.offsetY;
        // 获取图片偏移
        const absoluteX = (x - left) / zoomRatio;
        const absoluteY = (y - top) / zoomRatio;
        const hoverIndex = samHook.getActiveMask(absoluteX, absoluteY);
        if (hoverIndex === activeIndex) return;
        activeIndex = hoverIndex;
        getCanvas().renderAll();
        // 如果之前有 mask 图，先删除
        getCanvas().remove(hoverMaskImage);
        // 鼠标经过的区域和上次不一样，就更新
        const mask = samHook.getMaskImage(activeIndex);
        fabric.Image.fromURL(mask, (img) => {
          img.set({
            originX: 'center',
            originY: 'center',
            hoverCursor: 'default',
            selectable: false,
          });
          getCanvas().add(img);
          getCanvas().renderAll();
          hoverMaskImage = img;
        });
      }, 200),
    );
    getCanvas().on('mouse:up', async () => {
      if (activeIndex !== -1) {
        if (hoverMaskImage) {
          getCanvas().remove(hoverMaskImage);
        }
        const pixelData = samHook.getMaskPixel(activeIndex);
        const alphaPixelData = samHook.getMaskAlphaPixel(activeIndex);
        if (operateType === 'SAM') {
          if (!activeMask[activeIndex]) {
            updateMask(workspace, pixelData, 'ADD', alphaPixelData);
          }
        } else {
          updateMask(workspace, pixelData, 'REMOVE', alphaPixelData);
          delete activeMask[activeIndex];
        }
        activeIndex = -1;
      }
    });
  };

  // 开始SAM
  const startSAM = (workspace: UnwrapRef<ReturnType<typeof useWorkspace>>, type: 'SAM' | 'UNDO_SAM') => {
    if (!inited) {
      inited = true;
      initSAM(workspace);
    }
    operateType = type;
  };

  // 结束SAM
  const endSAM = () => {
    inited = false;
    getCanvas().off('mouse:move');
    getCanvas().off('mouse:up');
  };

  return {
    samHook,
    startSAM,
    endSAM,
    addImage,
    updateImage,
    remove,
    updateSize,
    computedSize,
    image,
    imageUrl,
    dispatchUpdateMask,
    width,
    height,
    ratio,
    isLockRatio,
  };
}
