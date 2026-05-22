import { fabric } from '@/fabric';
import { TGetCanvas } from '../types';
import { throttle } from 'lodash-es';
import useSam from '@/components/photo-mask-editor/hooks/useSam';
import useWorkspace from './useWorkspace';
import { imageToImageData, imageDataToDataUrl } from '@/core/utils/image';
import { BRUSH_COLOR, GRAY_BOUNDARY } from '../config';

interface IProps {
  getCanvas: TGetCanvas;
  change: (imageData: ImageData) => void;
}

interface ISamMask {
  [key: number]: fabric.Image;
}
// 画布图像
export default function useImage({ getCanvas, change }: IProps) {
  const activeMask: ISamMask = {};
  let inited = false;
  const samHook = useSam();
  let image = null as fabric.Image | null;

  const addImage = async (url: string) => new Promise((resolve) => {
    fabric.Image.fromURL(
      url,
      (img: any) => {
        img.set({
          originX: 'center',
          originY: 'center',
          opacity: 0,
          id: 'maskImg',
          hoverCursor: 'default',
          selectable: false,
        });
        image = img;
        getCanvas().add(img);
        getCanvas().renderAll();
        resolve(null);
      },
      {
        crossOrigin: 'anonymous',
      },
    );
  });
  // 删除选取中的内容
  const updateMask = async (
    workspace: ReturnType<typeof useWorkspace>,
    maskPixel: Uint8Array,
    activePoint: { x: number; y: number; },
    maskAlphaPixel: Uint8Array,
  ) => {
    const canvas = getCanvas();
    const objs = canvas.getObjects();
    // 隐藏图片
    objs.forEach((item: any) => {
      if (item.id !== 'editMask') {
        item.set({
          opacity: 0,
        });
      }
    });

    // 缓存缩放比例&设置缩放比例为1
    const cacheZoomRation = workspace.zoomRatio.value;
    workspace.zoomToPoint(1);
    const { viewportTransform = [] } = canvas;
    const { width: w, height: h } = workspace.spaceRect.value;
    const { top, left } = workspace.spaceRect.value.getBoundingRect(true);
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
    objs.forEach((item: any) => {
      if (item.id !== 'editMask' && item.id !== 'maskImg') {
        item.set({
          opacity: 1,
        });
      }
    });
    workspace.zoomToPoint(cacheZoomRation);
    // 获取当前mask图片数据
    const imageData = await imageToImageData(dataURL);
    const { data } = imageData;

    const index = Math.floor(activePoint.y) * w! + Math.floor(activePoint.x);
    const activePointAlphaPixelValue = maskAlphaPixel[index];
    const activePointAlpha = data[index * 4 + 3];
    const activePointAlphaPixelValue2 = activePointAlphaPixelValue < GRAY_BOUNDARY.VALUE
      ? Math.floor((activePointAlphaPixelValue * BRUSH_COLOR.a) / 255) : BRUSH_COLOR.a;

    const isRemove = activePointAlphaPixelValue2 === activePointAlpha && Boolean(activePointAlphaPixelValue);

    for (let i = 0; i < data.length; i += 4) {
      const pixelValue = maskPixel[i / 4];
      const a = data[i + 3];
      data[i] = BRUSH_COLOR.r;
      data[i + 1] = BRUSH_COLOR.g;
      data[i + 2] = BRUSH_COLOR.b;

      const alphaPixelValue = maskAlphaPixel[i / 4];
      const alpha = alphaPixelValue < GRAY_BOUNDARY.VALUE
        ? Math.floor((alphaPixelValue * BRUSH_COLOR.a) / 255) : BRUSH_COLOR.a;
      if (isRemove) {
        // 当前编辑的mask没有透明度 或 当前鼠标悬浮的mask区域为0，则 透明度不变
        if (a === 0 || !pixelValue) {
          data[i + 3] = a;
        } else {
          // 当前编辑的mask透明度 等于 当前鼠标悬浮的mask区域的透明度，则 透明度直接设置为0
          // 或 当前编辑的mask透明度 小于 设置的透明度 则 透明度直接设置为0
          // 否则 鼠标悬浮的mask区域透明度 减 配置透明度 取绝对值（使保留下来的边缘向外渐变，变浅）
          data[i + 3] = (alpha === a || a < BRUSH_COLOR.a) ? 0 : Math.abs(alpha - BRUSH_COLOR.a);
        }
      } else {
        // 当前编辑的mask没有透明度 && 当前鼠标悬浮的mask区域为0（0代表不选中，1代表选中）
        // eslint-disable-next-line no-lonely-if
        if (a === 0 && !pixelValue) {
          data[i + 3] = 0;
        } else {
          // 当前鼠标悬浮的mask区域为1 则 透明度相加 与 配置透明度 中取最小值
          // 当前鼠标悬浮的mask区域为0 则 取当前编辑的mask的透明度
          data[i + 3] = pixelValue ? Math.min(alpha + a, BRUSH_COLOR.a) : a;
        }
      }
    }

    const newDataURL = imageDataToDataUrl(imageData);
    // 触发通知
    change(imageData);

    // 删除其他内容
    objs.forEach((item: any) => {
      if (item.id === 'editMask') {
        canvas.remove(item);
      }
    });
    fabric.Image.fromURL(newDataURL, (img: any) => {
      img.set({
        originX: 'center',
        originY: 'center',
        hoverCursor: 'default',
        id: 'editMask',
        selectable: false,
      });
      canvas.add(img);
    });
    canvas.renderAll();
  };

  const initSAM = (workspace: ReturnType<typeof useWorkspace>) => {
    if (!image) return;
    let activeIndex = -1;
    let hoverMaskImage: fabric.Image;
    let absoluteX = 0;
    let absoluteY = 0;
    getCanvas().on(
      'mouse:move',
      throttle((event) => {
        const { top, left } = image!.getBoundingRect(false, true);
        // const { top, left } = { top: 0, left: 0 };
        const zoomRatio = workspace.zoomRatio.value || 1;
        const x = event.e.offsetX;
        const y = event.e.offsetY;
        // 获取图片偏移
        absoluteX = (x - left) / zoomRatio;
        absoluteY = (y - top) / zoomRatio;

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
        if (!activeMask[activeIndex]) {
          updateMask(
            workspace,
            pixelData,
            { x: absoluteX, y: absoluteY },
            alphaPixelData
          );
          delete activeMask[activeIndex];
        }

        activeIndex = -1;
      }
    });
  };

  // 开始SAM
  const startSAM = (workspace: ReturnType<typeof useWorkspace>) => {
    if (!inited) {
      inited = true;
      initSAM(workspace);
    }
  };

  // 结束SAM
  const endSAM = () => {
    inited = false;
    getCanvas().off('mouse:move');
    getCanvas().off('mouse:up');
  };

  return {
    addImage,
    samHook,
    startSAM,
    endSAM,
  };
}
