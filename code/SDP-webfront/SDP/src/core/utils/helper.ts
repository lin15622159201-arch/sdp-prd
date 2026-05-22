export { resizeImgByWidth } from '../plugins/helper';

// 对象排序
export const sortObject = (o: any) => {
  if (o == null || o === '') {
    return '';
  }
  return Object
    .keys(o)
    .sort()
    .reduce<{ [key: string]: any; }>((params, current) => {
    const obj = o[current];
    if (typeof obj === 'object') {
      params[current] = sortObject(obj);
    } else {
      params[current] = obj;
    }
    return params;
  }, {});
};

// 阿里云获取图片信息
export const getImageInfo = (url: string) => {
  const queryIndex = url.indexOf('?');
  if (queryIndex > -1) {
    url = url.substring(0, queryIndex);
  }
  return fetch(`${url}?x-oss-process=image/info`).then(res => res.json());
};

/**
 * 阿里云：根据坐标，图片大小，裁剪指定区域的图片
 * @param v 图片url
 * @param x 裁剪起点x坐标
 * @param y 裁剪起点y坐标
 * @param h 裁减范围高度
 * @param w 裁减范围宽度
 * @returns 阿里云上的图片链接
 */
export const cropImgRangByCoordinate = (v: string, x: number, y: number, w: number, h: number) => {
  const reg = /.(png|jpg|jpeg|webp)$/;
  if (v && reg.test(v)) {
    return `${v}?x-oss-process=image/crop,x_${x},y_${y},w_${w},h_${h}`;
  }
  return v;
};

// eslint-disable-next-line vue/max-len
const watermarkConfig = '?x-oss-process=image/watermark,text_RmFzaGlvbk1pbmQ=,fill_1,padx_240,pady_240,t_30,rotate_315,size_30,color_F2F4FA';
// 添加水印
export const getImgWithWatermark = (v: string) => {
  const reg = /.(png|jpg|jpeg|webp)$/;
  if (reg.test(v)) {
    return `${v}${watermarkConfig}`;
  }
  return v;
};

/**
 * 根据图片下标index, 裁剪图片
 * 用于分割4宫格
 * @param outputImage
 * @param index
 * @param w
 * @param h
 */
export const cropPictureByIndex = (outputImage: string, index: number, w: number, h: number) => {
  const srcW = Number(w);
  const srcH = Number(h);
  const cropW = srcW / 2;
  const cropH = srcH / 2;
  const cropOjb: Record<number, { x: number; y: number; w: number; h: number; }> = {
    1: { x: 0, y: 0, w: cropW, h: cropH },
    2: { x: 0, y: cropH, w: cropW, h: cropH },
    3: { x: cropW, y: 0, w: cropW, h: cropH },
    4: { x: cropW, y: cropH, w: cropW, h: cropH },
  };
  return cropImgRangByCoordinate(outputImage, cropOjb[index].x, cropOjb[index].y, cropOjb[index].w, cropOjb[index].h);
};

/** 判断是否是rgb编码 */
export const checkIsRGBCode = (str: string) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  return reg.test(str);
};

/**
 * 复制文本
 * @description 优先使用clipboard API，失败则降级为execCommand
 */
export const copyText = (text: string) => {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    return navigator.clipboard.writeText(text);
  }
  // 兼容旧浏览器
  return new Promise<void>((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'readonly');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (successful) {
        resolve();
      } else {
        reject(new Error('Copy command was unsuccessful'));
      }
    } catch (err) {
      document.body.removeChild(textarea);
      reject(err);
    }
  });
};
