import { TGetCanvas } from '../types';
import { TImage } from './useImage';
import { TWorkspace } from './useWorkspace';
import { uploadFile } from '@/api/open';
import { base64ToBlob } from '../utils';

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
    return dataURL;
  };

  // 下载图片
  const download = (imageData: string) => {
    const link = document.createElement('a');
    link.download = 'image.jpeg';
    link.href = imageData;
    link.click();
  };

  const uploadOss = async (imageData: string) => {
    const blob = base64ToBlob(imageData);
    const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' });
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

  return {
    getOriginData,
    getOriginUrl,
    downloadOrigin,
  };
}
