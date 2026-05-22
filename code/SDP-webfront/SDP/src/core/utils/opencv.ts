import cv from '@techstark/opencv-js';
import { base64ToBlob, url2ImageSync } from '@/core/utils/image';

/**
 * @description 图片url转mat
 * @param url
 */
export const imageUrl2Mat = async (url: string) => {
  const imageData = await url2ImageSync(url);
  return cv.imread(imageData);
};

/**
 * 裁剪Mat数据
 */
export const cropMat = (mat: cv.Mat, x: number, y: number, width: number, height: number) => {
  return mat.roi(new cv.Rect(x, y, width, height));
};

/**
 * mat转File
 * @param mat
 */
export const matToFile = (mat: cv.Mat): File => {
  // 创建一个 canvas 元素并显示图像
  const canvas = document.createElement('canvas');
  cv.imshow(canvas, mat);
  // 将 canvas 转换为 base64 图像数据 (默认为 PNG 格式)
  const dataURL = canvas.toDataURL('image/png');
  // 将 base64 图像数据转换为 Blob 对象
  const blob = base64ToBlob(dataURL);
  return new File([blob], 'output.png', { type: 'image/png' });
};
