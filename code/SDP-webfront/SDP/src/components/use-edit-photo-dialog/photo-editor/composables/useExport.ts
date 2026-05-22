import { TGetCanvas } from '../types';
import { TImage } from './useImage';
import { TWorkspace } from './useWorkspace';
import { uploadFile } from '@/api/open';
import { base64ToBlob } from '../utils';

interface IColor {
  r: number;
  g: number;
  b: number;
}

// 图片导出相关逻辑
export default function useExport(originImage: TImage, workspace: TWorkspace, getCanvas: TGetCanvas) {
  // 获取原图base64
  const getOriginData = async () => {
    const originImg = originImage.image;
    if (!originImg.value) throw new Error('原图加载失败');
    const dataURL = generateImage();
    return dataURL;
  };

  // 获取截图
  const generateImage = () => {
    const canvas = getCanvas();
    const cacheZoomRation = workspace.zoomRatio.value;
    // 把图像返回到原来比例，否则生成图像素会是缩放后的
    workspace.zoomToPoint(1);
    const objs = canvas.getObjects();
    objs.forEach((o) => {
      console.log('generate', o);

      if ((o as any).id === 'workspace' || (o as any).id === 'originImg') return;
      o.visible = false;
    });
    canvas.renderAll();

    const { viewportTransform = [], clipPath } = canvas;
    const obj = clipPath || workspace.spaceRect.value; // 是否有裁剪，如果没有就用画布的尺寸
    // 这里宽高用obj而不是getBoundingRect的，是因为getBoundingRect会对像素进行四舍五入，导致生成的图像尺寸不准确
    const { width, height } = obj;
    const { top, left } = obj.getBoundingRect(true);
    const dataURL = canvas.toDataURL({
      format: 'jpeg',
      quality: 1,
      width,
      height,
      left: left + viewportTransform[4],
      top: top + viewportTransform[5],
    });
    workspace.zoomToPoint(cacheZoomRation);
    objs.forEach((o) => {
      o.visible = true;
    });
    canvas.renderAll();
    return dataURL;
  };

  // 下载图片
  const download = (imageData: string) => {
    const link = document.createElement('a');
    link.download = 'image.jpeg';
    link.href = imageData;
    link.click();
  };

  const uploadOss = async (imageData: string, type = 'jpeg') => {
    const blob = base64ToBlob(imageData);
    const file = new File([blob], `image.${type}`, { type: `image/${type}` });
    const formData = new FormData();
    formData.append('files', file);
    const data = await uploadFile(formData, false);
    return data.data?.[0].url;
  };

  const getOriginUrl = async () => {
    const dataURL = await getOriginData();
    const url = await uploadOss(dataURL);
    return url;
  };

  const downloadOrigin = async () => {
    const dataURL = await getOriginData();
    download(dataURL);
  };

  const replaceColor = (data: Uint8ClampedArray, targetColor: IColor) => {
    for (let i = 0; i < data.length; i += 4) {
      // 检查像素不为白色，转为黑色
      if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
        // 改成黑色
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
      } else {
        // 其他颜色改成白色
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }
  };

  // 把数据转为RLE格式
  const encodeRLE = (data: Uint8ClampedArray) => {
    const result: number[] = [];
    let currentPixel = data[0];
    let count = 1;
    for (let i = 4; i < data.length; i += 4) {
      // 由于是黑白图片，我们只需要检查R通道（或G、B通道，因为它们的值是相同的）
      const pixel = data[i];
      if (pixel === currentPixel) {
        count += 1;
      } else {
        // 将当前像素值和计数器添加到结果数组中
        result.push(currentPixel, count);
        currentPixel = pixel;
        count = 1;
      }
    }
    // 添加最后一个像素和计数器
    result.push(currentPixel, count);
    return result;
  };

  // 把base64非白色区域改为目标颜色
  const maskFormat = (
    base64Image: string,
    targetColor: IColor,
  ) => new Promise<{ base64: string; rle: number[]; }>((resolve) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const { width, height } = img;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, width, height);
      const { data } = imageData;
      replaceColor(data, targetColor);
      ctx.putImageData(imageData, 0, 0);
      const rle = encodeRLE(data);
      const pureColorBase64 = canvas.toDataURL('image/png');
      resolve({ base64: pureColorBase64, rle });
    };
    img.src = base64Image;
  });

  // 获取截图
  const snapshot = () => {
    const canvas = getCanvas();
    const cacheZoomRation = workspace.zoomRatio.value;
    // 把图像返回到原来比例，否则生成图像素会是缩放后的
    workspace.zoomToPoint(1);
    canvas.renderAll();
    const { viewportTransform = [], clipPath } = canvas;
    const obj = clipPath || workspace.spaceRect.value; // 是否有裁剪，如果没有就用画布的尺寸
    // 这里宽高用obj而不是getBoundingRect的，是因为getBoundingRect会对像素进行四舍五入，导致生成的图像尺寸不准确
    const { width, height } = obj;
    const { top, left } = obj.getBoundingRect(true);
    const dataURL = canvas.toDataURL({
      width,
      height,
      left: left + viewportTransform[4] + 0.5,
      top: top + viewportTransform[5] + 0.5,
    });
    workspace.zoomToPoint(cacheZoomRation);
    return dataURL;
  };

  // 导出mask图
  const getMaskData = async () => {
    // 截图先隐藏原图
    originImage.image.value?.set({ opacity: 0 });
    const c = getCanvas();

    const originImageObj: any[] = [];
    c.getObjects().forEach((obj) => {
      if ((obj as any).id === 'originImg') {
        obj.set({ opacity: 0 });
        originImageObj.push(obj);
      }
    });
    const snapshotMask = snapshot();
    originImage.image.value?.set({ opacity: 1 });
    originImageObj.forEach((obj) => {
      obj.set({ opacity: 1 });
    });
    getCanvas().renderAll();
    const { base64 } = await maskFormat(snapshotMask, { r: 0, g: 0, b: 0 });
    return base64;
  };

  const getMaskUrl = async () => {
    const dataURL = await getMaskData();
    const url = await uploadOss(dataURL, 'png');
    return url;
  };

  const downloadMask = async () => {
    const dataURL = await getMaskData();
    download(dataURL);
  };

  return {
    getOriginData,
    getOriginUrl,
    downloadOrigin,
    downloadMask,
    getMaskUrl,
  };
}
