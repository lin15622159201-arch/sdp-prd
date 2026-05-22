import { imageDataUrlToOssUrl } from '@/core/utils/image';
import { ref } from 'vue';

export const useRectMask = () => {
  // 模特图框选区域映射
  const urlRectMap = ref<Record<string, { x: number; y: number; width: number; height: number; } | null>>({});
  // 是否正在转换
  const isExchanging = ref(false);

  /**
   *  根据 框选区域rect 获取 mask 图片
   * @param originImgUrl
   * @returns
   */
  const exchangeMaskRectToUrl = async (originImgUrl: string) => {
    const rect = urlRectMap.value[originImgUrl];
    if (!rect) return '';
    const { x, y, width, height } = rect;
    if (!width || !height) return '';
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = originImgUrl;
    const canvas = document.createElement('canvas');
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        resolve();
      };
      img.onerror = () => reject('图片加载失败');
    });

    const ctx = canvas.getContext('2d')!;
    // 填满黑色背景
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 把 rect 区域填成白色
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);

    const url = canvas.toDataURL('image/png');
    return imageDataUrlToOssUrl(url);
  };

  /**
   * 根据 mask 图片获取 框选区域rect
   * @param maskUrl
   * @returns
   */
  const exchangeMaskUrlToRect = async (maskUrl: string) => {
    isExchanging.value = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = maskUrl;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve();
      };
      img.onerror = () => reject('mask 加载失败');
    });

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imgData;

    let minX = Infinity; let
      minY = Infinity;
    let maxX = -1; let
      maxY = -1;

    // 找白色区域（白色即 255,255,255）
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // 白色区域
        if (r === 255 && g === 255 && b === 255) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < 0) {
      isExchanging.value = false;
      return null; // 无白色区域
    }

    isExchanging.value = false;
    return {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    };
  };
  return {
    isExchanging,
    urlRectMap,
    exchangeMaskRectToUrl,
    exchangeMaskUrlToRect,
  };
};
