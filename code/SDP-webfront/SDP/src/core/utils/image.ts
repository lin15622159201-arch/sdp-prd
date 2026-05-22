import md5 from 'md5';
import { uploadFile } from '@/api/open';

const CANVAS = document.createElement('canvas');
const CTX = CANVAS.getContext('2d');

export const url2ImageSync = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = `${url}`;
  });
};

const image2Canvas = (image: HTMLImageElement) => {
  if (!CTX) {
    throw new Error('找不到canvas的ctx');
  }
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  CANVAS.width = image.width;
  CANVAS.height = image.height;

  CTX.drawImage(image, 0, 0, CANVAS.width, CANVAS.height);
};

export const imageCompressToDataUrl = async (url: string, quality = 0.8, type = 'image/jpeg') => {
  const image = await url2ImageSync(url);
  image2Canvas(image);
  return CANVAS.toDataURL(type, quality);
};

// url转file
export const urlToFile: (url: string) => Promise<File> = (url: string) => {
  const imageName = url.substring(url.lastIndexOf('/') + 1);
  // 截取图片后缀名
  const suffixName = imageName.split('.')[1];
  return new Promise((resolve, reject) => {
    let blob: any = null;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Accept', 'image/jpeg');
    xhr.responseType = 'blob';
    xhr.onload = () => {
      blob = xhr.response;
      const imgFile = new File([blob], imageName, { type: `image/${suffixName}` });
      resolve(imgFile);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    xhr.send();
  });
};

// url转Base64
export const urlToBase64: (url: string) => Promise<string> = async (url: string) => {
  const file: File = await urlToFile(url);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (v) => {
      resolve((v.target?.result as string) || '');
    };
  });
};

export const urlToMd5 = async (url: string) => {
  const base64 = await urlToBase64(url);
  return md5(base64);
};

// 获取图片宽高
export const getImageSize = async (url: string) => {
  const img = await url2ImageSync(url);
  return {
    width: img.width,
    height: img.height,
  };
};

export const base64ToBlob = (base64: string) => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

/**
 * 将图片转化成ImageData数据
 */
export const imageToImageData = async (url: string) => {
  if (!CTX) {
    throw new Error('找不到canvas的ctx');
  }
  const image = await url2ImageSync(url);
  image2Canvas(image);
  return CTX.getImageData(0, 0, CANVAS.width, CANVAS.height);
};

export const imageDataToDataUrl = (imageData: ImageData) => {
  if (!CTX) {
    throw new Error('找不到canvas的ctx');
  }
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  CANVAS.width = imageData.width;
  CANVAS.height = imageData.height;
  CTX.putImageData(imageData, 0, 0);
  return CANVAS.toDataURL('image/png');
};

/**
 * 图片转ImageData — 不使用 CANVAS 这个元素，需要异步批量操作
 * @param imageData
 */
export const imageDataToDataUrl2 = (imageData: ImageData) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
};
/**
 * ImageData 转图片地址
 */
export const imageDataToUrl = async (imageData: ImageData) => {
  const dataUrl = await imageDataToDataUrl2(imageData);
  return baseUrlToHttpUrl(dataUrl);
};
/**
 * ImageData 转图片地址
 */
export const baseUrlToHttpUrl = async (dataUrl: string, type = 'image/png') => {
  const blob = base64ToBlob(dataUrl);
  const file = new File([blob], 'output.png', { type });
  const formData = new FormData();
  formData.append('files', file);
  const data = await uploadFile(formData);
  return data.data?.[0].url || '';
};
/**
 * 图片转ImageData — 不使用 CANVAS 这个元素，需要异步批量操作
 * @param url
 */
const imageToImageData2 = async (url: string) => {
  const image = await url2ImageSync(url);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

/**
 * DataUrl转oss图片地址
 * @param dataUrl
 */
export const imageDataUrlToOssUrl = async (dataUrl: string, name = 'output.png') => {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) return dataUrl; // 如果不是DataUrl地址，直接返回
  const blob = base64ToBlob(dataUrl);
  const file = new File([blob], name, { type: blob.type });
  const formData = new FormData();
  formData.append('files', file);
  const data = await uploadFile(formData);
  return data.data?.[0].url || '';
};

/**
 * 批量图片转ImageData
 * @param urls
 */
export const batchImageToImageData = async (urls: string[]) => {
  const promises = urls.map(url => imageToImageData2(url));
  return Promise.all(promises);
};

/**
 * 根据宽高、颜色，生成ImageData
 * @param width
 * @param height
 * @param rgbColor
 */
export const createImageData = (
  width: number,
  height: number,
  rgbColor?: { r: number; g: number; b: number; }
) => {
  const imageData = new ImageData(width, height);
  const { data } = imageData;
  const dataLength = data.length;
  for (let i = 0; i < dataLength; i += 4) {
    if (rgbColor) {
      data[i] = rgbColor.r;
      data[i + 1] = rgbColor.g;
      data[i + 2] = rgbColor.b;
    }
    data[i + 3] = 255;
  }
  return imageData;
};

/**
 * 根据宽高、指定坐标，生成mask图
 */
export const generateMaskImageData = async (url: string, width: number, height: number, x: number, y: number) => {
  // 根据预览图宽高，创建mask图
  const resImageData = createImageData(width, height);
  const resData = resImageData.data;
  const urlImageData = await imageToImageData(url);

  const { width: detailWidth, height: detailHeight } = urlImageData;
  const urlData = urlImageData.data;
  // 遍历细节图 插入生成的mask图中
  for (let i = 0; i < detailWidth; i++) {
    for (let j = 0; j < detailHeight; j++) {
      const index = (i + j * detailWidth) * 4;
      const maskIndex = ((i + x) + (j + y) * width) * 4;
      resData[maskIndex] = urlData[index];
      resData[maskIndex + 1] = urlData[index + 1];
      resData[maskIndex + 2] = urlData[index + 2];
      resData[maskIndex + 3] = urlData[index + 3];
    }
  }
  return resImageData;
};

export const generateMaskImageUrl = async (url: string, width: number, height: number, x: number, y: number) => {
  const imageData = await generateMaskImageData(url, width, height, x, y);
  const imageUrl = await imageDataToUrl(imageData);
  return imageUrl;
};

// 获取图片名字
export const getImgName = (v: string) => {
  if (v) {
    const arr = v.split('/');
    const names = arr[arr.length - 1].split('.');
    return `${names[0]}`;
  }
  return '';
};
