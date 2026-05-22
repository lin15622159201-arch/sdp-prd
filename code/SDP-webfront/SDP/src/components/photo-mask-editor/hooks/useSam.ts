import { BRUSH_COLOR, GRAY_BOUNDARY } from '../config';
import { batchImageToImageData } from '@/core/utils/image';
import { ImageData } from '@techstark/opencv-js';

interface ISegmentation {
  size: number[];
  counts: number[];
}

export interface ISam {
  segmentation: ISegmentation;
  [key: string]: any;
}

export default function useSam() {
  let maskPixels: Uint8Array[] = [];
  let maskAlphaPixels: Uint8Array[] = [];
  let width = 0;
  let height = 0;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  let centroids: { x: number; y: number; }[] = [];
  let maskImages: ReturnType<typeof canvas.toDataURL>[] = [];

  function getSamSize(samItem: ISam) {
    const { size } = samItem.segmentation;
    return { width: size[1], height: size[0] };
  }

  /**
   * 计算mask中心点坐标
   */
  function computeCentroids(masks: Uint8Array[], w: number, h: number) {
    const centroidList: { x: number; y: number; }[] = [];
    for (let i = 0; i < masks.length; i++) {
      let sumX = 0;
      let sumY = 0;
      let count = 0;
      for (let j = 0; j < masks[i].length; j++) {
        if (masks[i][j]) {
          const x = j % w;
          const y = Math.floor(j / h);
          sumX += x;
          sumY += y;
          count += 1;
        }
      }
      centroidList.push({ x: sumX / count, y: sumY / count });
    }
    return centroidList;
  }

  /**
   * 解码RLE编码的mask
   */
  function decodeRLE(segmentation: ISegmentation) {
    const { size, counts } = segmentation;
    // 注意这里交换了宽度和高度
    const w = size[0];
    const h = size[1];
    const pixels = new Uint8Array(w * h);

    let pixelIndex = 0;
    for (let i = 0; i < counts.length; i += 2) {
      const zeros = counts[i];
      const ones = counts[i + 1];
      pixelIndex += zeros;
      for (let j = 0; j < ones; j++) {
        pixels[pixelIndex + j] = 1;
      }
      pixelIndex += ones;
    }
    return pixels;
  }

  /**
   * 绘制mask
   */
  function drawSegmentation(maskPixel: Uint8Array, maskAlphaPixel?: Uint8Array) {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const imageDataData = imageData.data;
    const hasAlpha = !!maskAlphaPixel && maskAlphaPixel.length > 0;
    for (let i = 0; i < maskPixel.length; i++) {
      const pixelValue = maskPixel[i] * 255;
      if (pixelValue) {
        imageDataData[i * 4] = BRUSH_COLOR.r; // Red
        imageDataData[i * 4 + 1] = BRUSH_COLOR.g; // Green
        imageDataData[i * 4 + 2] = BRUSH_COLOR.b; // Blue
        // 没有透明度配置 || 有透明度配置，并且mask像素值大于灰度阈值
        if (!hasAlpha || maskAlphaPixel[i] >= GRAY_BOUNDARY.VALUE) {
          imageDataData[i * 4 + 3] = BRUSH_COLOR.a;
        } else {
          // 有透明度配置，并且mask像素值小于灰度阈值，设置透明度
          imageDataData[i * 4 + 3] = (BRUSH_COLOR.a * maskAlphaPixel[i]) / 255;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  // 获取鼠标重叠的mask
  function getActiveMask(x: number, y: number) {
    if (x < 0 || x > width || y < 0 || y > height) return -1;
    const index = Math.floor(y) * width + Math.floor(x);
    let nearestMaskIndex = -1;
    let minDistance = Infinity;
    // 寻找最近的mask
    for (let i = 0; i < maskPixels.length; i++) {
      if (maskPixels[i][index]) {
        const dx = x - centroids[i].x;
        const dy = y - centroids[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
          minDistance = distance;
          nearestMaskIndex = i;
        }
      }
    }
    return nearestMaskIndex;
  }

  const initSam = (samData: ISam[]) => {
    maskPixels = samData.map(item => decodeRLE(item.segmentation));
    const rect = getSamSize(samData[0]);
    width = rect.width;
    height = rect.height;
    canvas.width = width;
    canvas.height = height;
    centroids = computeCentroids(maskPixels, width, height);
    maskImages = maskPixels.map(item => drawSegmentation(item));
  };

  const setSamData = (data: ISam[]) => {
    maskAlphaPixels = [];
    initSam(data);
  };

  // imageData 转成 maskPixels数据
  const imageData2Pixels = (imageData: ImageData) => {
    const { width: w, height: h } = imageData;
    const pixels = new Uint8Array(w * h);
    const alphaPixels = new Uint8Array(w * h);
    const data = imageData.data as Uint8ClampedArray;
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        const index = (j * w + i) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        // 黑色，表示非选中区域
        if (r === 0 && g === 0 && b === 0) {
          pixels[i + j * w] = 0;
        } else {
          pixels[i + j * w] = 1;
        }
        alphaPixels[i + j * w] = Math.floor((r + g + b) / 3); // 计算透明度
      }
    }
    return {
      pixels,
      alphaPixels,
    };
  };

  // 图片数据处理成maskPixels数据，
  const setImageData = async (urlList: string[]) => {
    const imageDataList = await batchImageToImageData(urlList);
    const pixelsData = imageDataList.map(item => imageData2Pixels(item));
    maskPixels = pixelsData.map(item => item.pixels);
    maskAlphaPixels = pixelsData.map(item => item.alphaPixels);

    const { width: w, height: h } = imageDataList[0];
    width = w;
    height = h;
    canvas.width = w;
    canvas.height = h;
    centroids = computeCentroids(maskPixels, width, height);
    maskImages = maskPixels.map((item, index) => drawSegmentation(item, maskAlphaPixels[index]));
  };

  // 追加图片数据
  const pushImageData = async (urlList: string[]) => {
    const imageDataList = await batchImageToImageData(urlList);
    const pixelsData = imageDataList.map(item => imageData2Pixels(item));
    const pushMaskPixels = pixelsData.map(item => item.pixels);
    const pushMaskAlphaPixels = pixelsData.map(item => item.alphaPixels);
    maskPixels.push(...pushMaskPixels);
    maskAlphaPixels.push(...pushMaskAlphaPixels);

    const pushCentroids = computeCentroids(pushMaskPixels, width, height);
    centroids.push(...pushCentroids);
    const pushMaskImages = pushMaskPixels.map((item, index) => drawSegmentation(item, pushMaskAlphaPixels[index]));
    maskImages.push(...pushMaskImages);
  };

  const getMaskImage = (index: number) => {
    return maskImages[index];
  };

  const getMaskPixel = (index: number) => {
    return maskPixels[index];
  };

  const getMaskAlphaPixel = (index: number) => {
    return maskAlphaPixels[index];
  };

  return {
    getActiveMask,
    getMaskImage,
    getMaskPixel,
    getMaskAlphaPixel,
    setSamData,
    setImageData,
    pushImageData,
    imageData2Pixels,
  };
}
