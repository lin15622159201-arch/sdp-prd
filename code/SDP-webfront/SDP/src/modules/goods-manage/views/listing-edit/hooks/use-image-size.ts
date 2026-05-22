import { reactive } from 'vue';

/**
 * 获取图片尺寸的 Hook
 */
export const useImageSize = () => {
  // 存储图片尺寸信息的响应式对象
  const imageSizeMap = reactive<Record<string, { width: number; height: number; }>>({});

  // 降级方案：使用 Image 对象获取图片尺寸
  const fallbackToImage = (url: string): Promise<{ width: number; height: number; } | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          const dimensions = {
            width: img.naturalWidth,
            height: img.naturalHeight,
          };
          imageSizeMap[url] = dimensions;
          resolve(dimensions);
        } else {
          resolve(null);
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${url}`);
        resolve(null);
      };
      img.src = url;
    });
  };

  // 获取图片原始尺寸
  const getImageSize = async (url: string) => {
    if (!url) return null;

    // 如果已经有缓存，直接返回
    if (imageSizeMap[url]) {
      return imageSizeMap[url];
    }

    try {
      // 先用 OSS 图片信息接口获取尺寸（适用于阿里云 OSS 图片）
      const infoUrl = `${url}?x-oss-process=image/info`;
      const response = await fetch(infoUrl);
      const info = await response.json();

      if (info.ImageWidth && info.ImageHeight) {
        const dimensions = {
          width: info.ImageWidth.value,
          height: info.ImageHeight.value,
        };
        imageSizeMap[url] = dimensions;
        return dimensions;
      }

      // 如果无法获取到尺寸，使用降级方案
      return await fallbackToImage(url);
    } catch (error) {
      console.warn(`Failed to get image dimensions: ${url}`, error);
      return await fallbackToImage(url);
    }
  };

  return {
    imageSizeMap,
    getImageSize,
  };
};
